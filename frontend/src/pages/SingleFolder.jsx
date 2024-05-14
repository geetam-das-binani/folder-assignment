import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import {
  addImageToFolder,
  getSingleFolderDetails,
} from "../actions/folderActions";
import "./singlefolder.css";
import { useDisclosure } from "@chakra-ui/react";
import AddImagesModal from "../components/AddImagesModal";
import { Spinner } from "@chakra-ui/react";
import toast from "react-hot-toast";
import AddSubFolderModal from "../components/AddSubFolderModal";
import FolderCard from "../components/FolderCard";
const SingleFolder = () => {
  const { onClose, isOpen, onOpen } = useDisclosure();
  const [loading, setLoading] = useState(true);
  const [fetchagain, setFetchAgain] = useState(false);
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const [imageName, setImageName] = useState("");
  const [imageFile, setImageFile] = useState("");
  const openModal = () => onOpen();
  const closeModal = () => onClose();
  const handleNameChange = (e) => {
    setImageName(e.target.value);
  };
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleAddImage = async () => {
    if (!imageName || !imageFile) {
      toast.error("Please fill all the fields");
      onClose();
      return;
    }
    const formData = new FormData();
    formData.append("name", imageName);
    formData.append("image", imageFile);
    try {
      await addImageToFolder(id, formData);
      setFetchAgain(!fetchagain);
      setImageName("");
      setImageFile("");
      onClose();
      toast.success("Image added successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getSingleFolderDetails(id)
      .then((data) => {
        setDetails(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id, fetchagain]);
 
  return (
    <div>
      <Navbar />
      <h1 className="folder__name">Current Folder: {details?.name}</h1>
      <div className="add__image__modal">
        <AddImagesModal
          openModal={openModal}
          closeModal={closeModal}
          isOpen={isOpen}
          imageName={imageName}
          handleAddImage={handleAddImage}
          handleNameChange={handleNameChange}
          handleFileChange={handleFileChange}
        />
        <AddSubFolderModal
          setFetchAgain={setFetchAgain}
          fetchagain={fetchagain}
        />
      </div>
      {details?.subfolders?.length > 0 ? (
        <div>
          <h1 style={{
            marginTop:"1rem",
            fontSize:"2vmax"
          }} className="folder__heading">Your Sub Folders</h1>
          <div className="folder__container">
            {details?.subfolders?.map((folder) => (
              <FolderCard key={folder._id} folder={folder} />
            ))}
          </div>
        </div>
      ) : null}
      {loading && (
        <div
          style={{
            textAlign: "center",
            margin: "5rem 0",
          }}
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </div>
      )}

      {!loading && details?.images?.length > 0 && (
        <div className="folder__images">
          {details?.images?.map((image) => (
            <img key={image?._id} src={image?.url} alt={image?.name} />
          ))}
        </div>
      )}
      {!loading && !details?.images?.length && (
        <h3
          style={{
            textAlign: "center",
            margin: "5rem 0",
            fontSize: "2.5vmax",
            color: "red",
            fontWeight: "bolder",
          }}
        >
          No images found
        </h3>
      )}
    </div>
  );
};

export default SingleFolder;
