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
import { FaImage } from "react-icons/fa";

const AddImagesModal = ({
  openModal,
  closeModal,
  isOpen,
  imageName,
  handleAddImage,
  handleNameChange,
  handleFileChange,
}) => {
  return (
    <>
      <Button sx={{ gap: "10px" }} colorScheme="blue" onClick={openModal}>
        <FaImage /> Add an Image
      </Button>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            sx={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            Add Image <FaImage />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody sx={{ display: "flex", flexDirection: "column",gap:"10px" }}>
            <Input
              value={imageName}
              onChange={handleNameChange}
              placeholder="Enter Image Name"
              required
            />
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
              }}
            >
              Choose an Image <FaImage />
              <Input
                onChange={(e) => handleFileChange(e)}
                placeholder="Choose and image"
                type="file"
                required
                hidden
              />
            </label>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={closeModal}>
              Close
            </Button>
            <Button onClick={handleAddImage} colorScheme="blue">
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddImagesModal;
