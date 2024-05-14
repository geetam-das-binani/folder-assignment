import {
  loadAuthUser,
  registerUser,
  loginUser,
  logoutUser,
} from "../store/user/userSlice";
import axios from "axios";
const API_BASE_URL = "http://localhost:8000/api/v1";
export const loadUser = async (dispatch) => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/me`, {
      withCredentials: true,
    });

    dispatch(loadAuthUser(data));
  } catch (error) {
    dispatch(userFail(error.response.data.message));
  }
};

export const handleRegisterUser = async (user, dispatch) => {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/register`, user, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch(registerUser(data.userWithoutPassword));
    return true;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const handleLoginUser = async (user, dispatch) => {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/login`, user, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch(loginUser(data.userWithoutPassword));
    return true;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const logUserOut = async (dispatch) => {
  await axios.get(`${API_BASE_URL}/logout`, {
    withCredentials: true,
  });
  dispatch(logoutUser());
  return true;
};
