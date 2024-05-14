import { createSlice } from "@reduxjs/toolkit";
import { useReducer } from "react";

const initialState = {
  user: null,
  
  isAuthenticatedUser:false
};

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticatedUser=true
    },
    loginUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticatedUser=true
    },

    logoutUser: (state, action) => {
      state.user = null;
      state.isAuthenticatedUser=false
    },

   
    loadAuthUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticatedUser=true
  },
}
});


export const {registerUser,loginUser,logoutUser,loadAuthUser} =userReducer.actions
export default userReducer