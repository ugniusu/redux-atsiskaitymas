import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/goals";

export const fetchGoals = createAsyncThunk(
  "goals/fetchGoals",
  async (_, thunkAPI) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }

    const response = await axios.get(BASE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const createGoal = createAsyncThunk(
  "goals/createGoal",
  async (goal, thunkAPI) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }

    const response = await axios.post(BASE_URL, goal, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const deleteGoal = createAsyncThunk(
  "goals/deleteGoal",
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

const goalSlice = createSlice({
  name: "goals",
  initialState: { items: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoals.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.items = state.items.filter((goal) => goal._id !== action.payload);
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchGoals.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default goalSlice.reducer;
