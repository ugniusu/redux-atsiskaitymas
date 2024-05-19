import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  allUsers: [],
  status: "idle",
  error: null,
};

const BASE_URL = "http://localhost:5000/api/users";

export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      console.log(token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, thunkAPI) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }

    try {
      await axios.delete(`${BASE_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.status = "idle";
        state.allUsers = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.allUsers = state.allUsers.filter(
          (user) => user.id !== action.payload
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
