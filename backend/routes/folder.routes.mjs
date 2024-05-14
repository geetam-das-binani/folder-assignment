import express from "express";
import {isAuthenticatedUser} from '../middlewares/auth.middleware.mjs'
import { handleAddFolder,getAllFolders,getSingleFolderDetails,addImageToFolder,handleSearch } from "../controllers/fodler.controllers.mjs";
import {upload} from '../multer/multer.mjs'
const router=express.Router()

router.post("/create-folder",isAuthenticatedUser,handleAddFolder)
router.get("/my-folders",isAuthenticatedUser,getAllFolders)
router.get("/folder-details/:id",isAuthenticatedUser,getSingleFolderDetails)
router.post("/folder/add-image/:id",isAuthenticatedUser,upload.single("image"),addImageToFolder)
router.get("/folder/search",isAuthenticatedUser,handleSearch)







export {router as folderRoutes}