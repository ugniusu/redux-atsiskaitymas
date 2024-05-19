import { configureStore } from "@reduxjs/toolkit";
import goalReducer from "../features/goalSlice";
import authSlice from "../features/authSlice";
import userSlice from "../features/userSlice";

const store = configureStore({
  reducer: {
    users: userSlice,
    goals: goalReducer,
    auth: authSlice,
  },
});

export default store;
