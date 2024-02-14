import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    reloadUser: false,
  },
  reducers: {
    setUser: (state, actions) => {
      state.user = actions.payload;
    },
    reloadUserData: (state, actions) => {
      state.reloadUser = actions.payload;
    },
  },
});

export const { setUser, reloadUserData } = userSlice.actions;
