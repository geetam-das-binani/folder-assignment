import axios from "axios";
const API_BASE_URL = "http://localhost:8000/api/v1";
export const createFolder = async (folderName, parentFolderId = "") => {
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/create-folder`,
      { name: folderName, parentFolderId },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (data.success) return true;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getMyFolders = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/my-folders`, {
    withCredentials: true,
  });

  return data.folders;
};

export const getSingleFolderDetails = async (id) => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/folder-details/${id}`, {
      withCredentials: true,
    });

    return data.folder;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const addImageToFolder = async (id, formData) => {
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/folder/add-image/${id}`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return data.folder;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const handleSearch = async (query) => {
  try {
    const { data } = await axios.get(
      `${API_BASE_URL}/folder/search?keyword=${query}`,

      {
        withCredentials: true,
      }
    );
    return data.images
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
