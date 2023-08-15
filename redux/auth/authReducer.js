import { createSlice } from "@reduxjs/toolkit";

const state = {
  userId: null,
  email: null,
  password: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: state,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
        ...state,
        userId: payload.userId,
        login: payload.login,
    })
  },
});


