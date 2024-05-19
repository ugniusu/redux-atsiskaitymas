import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  isAdmin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload;
      state.isAuthenticated = true;
      state.isAdmin = action.payload.role === "admin";
    },
    logout(state) {
      state.token = null;
      state.isAuthenticated = false;
      state.isAdmin = false;
    },
    setAdmin(state, action) {
      state.isAdmin = action.payload;
    },
  },
});

export const { login, logout, setAdmin } = authSlice.actions;
export default authSlice.reducer;
