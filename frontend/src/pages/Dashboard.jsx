import "./modal.css";
import "./dashboard.css";
import CreateFolderModal from "../components/CreateFolderModal";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { createFolder, getMyFolders } from "../actions/folderActions";
import FolderCard from "../components/FolderCard";
import { useDisclosure } from "@chakra-ui/react";
import toast from "react-hot-toast";
const Dashboard = () => {
  const { onClose, isOpen, onOpen } = useDisclosure();
  const [folderName, setFolderName] = useState("");
  const [fetchAgain, setFetchAgain] = useState(false);
  const [folders, setFolders] = useState([]);
  const [loading,setLoading]=useState(false)

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
      const response = await createFolder(folderName);
      if (response) {
        setFetchAgain(!fetchAgain);
        closeModal();
        setFolderName("");
        toast.success("Folder created successfully");
      }
    } catch (error) {
      toast.error(error.message);
    }
    finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    getMyFolders()
      .then((data) => setFolders(data))
      .catch((error) => console.log(error));
  }, [fetchAgain]);
  return (
    <div>
      <Navbar />
      <div className="modal__div">
        <CreateFolderModal
        title="Add Folder"
          folderName={folderName}
          setFolderName={setFolderName}
          handleAddFolder={handleAddFolder}
          openModal={openModal}
          closeModal={closeModal}
          isOpen={isOpen}
          loading={loading}
        />
      </div>

      {folders.length > 0 ? (
        <div>
          <h1 className="folder__heading">Your Folders</h1>
          <div className="folder__container">
            {folders.map((folder) => (
              <FolderCard key={folder._id} folder={folder} />
            ))}
          </div>
        </div>
      ) : (
        <p className="no__folders__div">No folders created yet</p>
      )}
    </div>
  );
};

export default Dashboard;
