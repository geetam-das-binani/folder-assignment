import { catchAsyncErrors } from "../utils/catchAsyncErrors.mjs";
import { ErrorHandler } from "../utils/error.mjs";
import { Folder } from "../models/folder.mjs";
import { Image } from "../models/images.mjs";
export const handleAddFolder = catchAsyncErrors(async (req, res, next) => {
  const { name, parentFolderId } = req.body;

  let parentFolder;

  if (parentFolderId) {
    parentFolder = await Folder.findById(parentFolderId);
    if (!parentFolder) {
      return next(new ErrorHandler("Parent folder not found", 404));
    }
  }
  const newFolder = new Folder({
    name,
    userId: req.user._id,
  });

  if (!newFolder) {
    return next(new ErrorHandler("Folder not created", 400));
  }

  if (parentFolder) {
    newFolder.parentFolder = parentFolderId;
    parentFolder.subfolders.push(newFolder._id);
    await parentFolder.save();
  }

  await newFolder.save();

  return res.status(201).json({ success: true });
});

export const getAllFolders = catchAsyncErrors(async (req, res, next) => {
  const folders = await Folder.find({
    userId: req.user._id,
    parentFolder: {
      $exists: false,
    },
  });

  return res.status(200).json({ success: true, folders });
});

export const getSingleFolderDetails = catchAsyncErrors(
  async (req, res, next) => {
    const folder = await Folder.findOne({
      _id: req.params.id,
      userId: req.user._id,
    })
      .populate("images")
      .populate("subfolders");

    if (!folder) {
      return next(new ErrorHandler("Folder not found", 404));
    }
    return res.status(200).json({ success: true, folder });
  }
);

export const addImageToFolder = catchAsyncErrors(async (req, res, next) => {
  const folder = await Folder.findById(req.params.id);
  const photo = req?.file;
  const b64 = Buffer.from(photo.buffer).toString("base64");
  let dataURI = `data:${photo.mimetype};base64,${b64}`;
  const newImage = await Image.create({
    folder: folder._id,
    url: dataURI,
    name: req.body.name,
    userId: req.user._id,
  });

  if (!newImage) {
    return next(new ErrorHandler("Image not added", 400));
  }
  folder.images.push(newImage._id);
  await folder.save();

  return res.status(201).json({ success: true });
});

export const handleSearch = catchAsyncErrors(async (req, res, next) => {
  const keyword = req.query.keyword || undefined;
  const searchQuery = keyword
    ? {
        userId: req.user._id,
        name: {
          $regex: keyword,
          $options: "i",
        },
      }
    : {};
  const images = await Image.find(searchQuery);
  if (!images.length) {
    return next(new ErrorHandler("Images not found", 404));
  }

  return res.status(200).json({ success: true, images });
});
