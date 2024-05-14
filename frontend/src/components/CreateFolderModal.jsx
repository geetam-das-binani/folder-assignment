import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
} from "@chakra-ui/react";
import { FaFolder } from "react-icons/fa";
const CreateFolderModal = ({
  folderName,
  setFolderName,
  handleAddFolder,
  closeModal,
  openModal,
  isOpen,
  title
}) => {
  return (
    <>
      {" "}
      <Button sx={{ gap: "10px" }} colorScheme="blue" onClick={openModal}>
        <FaFolder /> 
        {title}
      </Button>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            sx={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
              {title} <FaFolder />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              placeholder="Enter Folder Name"
              required
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={closeModal}>
              Close
            </Button>
            <Button onClick={handleAddFolder} colorScheme="blue">
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateFolderModal;
