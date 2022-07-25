import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};



export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logout: (state) => {
      storage.removeItem('persist:root')
      state.currentUser = null;
      state.loading = false;
      state.error = false;
   
    },
    subscription: (state, action) => {
      if (state?.currentUser?.subscribedUser?.includes(action.payload)) {
        state?.currentUser?.subscribedUser?.splice(
          state.currentUser?.subscribedUser?.findIndex(
            (channelId) => channelId === action.payload
          ),
          1
        );
      } else {
        state?.currentUser?.subscribedUser?.push(action.payload);
      }
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, subscription } =
  userSlice.actions;

export default userSlice.reducer;
