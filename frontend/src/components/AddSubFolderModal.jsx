import { useDisclosure } from "@chakra-ui/react";
import CreateFolderModal from "./CreateFolderModal"
import { useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { createFolder } from "../actions/folderActions";


const AddSubFolderModal = ({fetchagain,setFetchAgain,loading,setLoading}) => {
    const { id } = useParams();
    const { onClose, isOpen, onOpen } = useDisclosure();
  const [folderName, setFolderName] = useState("");
  const openModal = () => onOpen();
  const closeModal = () => onClose();
  const handleAddFolder = async () => {
    if (!folderName) {
      toast.error("Please enter a folder name", {
        icon: "❌",
      });
      closeModal()
      return;
    }

    try {
      setLoading(true)
      const response = await createFolder(folderName,id);
      if (response) {
        setFetchAgain(!fetchagain);
        closeModal();
        setFolderName("");
        toast.success("Sub Folder created successfully");
      }
    } catch (error) {
      toast.error(error.message);
    }finally{
      setLoading(false)
    }
  };
  return (
    <CreateFolderModal
    title="Add Sub Folder"
    folderName={folderName}
    setFolderName={setFolderName}
    handleAddFolder={handleAddFolder}
    openModal={openModal}
    closeModal={closeModal}
    isOpen={isOpen}
    loading={loading}
  />
  )
}

export default AddSubFolderModal
