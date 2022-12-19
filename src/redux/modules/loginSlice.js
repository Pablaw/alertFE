import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  calendars: [],
  isLoading: false,
  error: null,
};

export const __gettoken = createAsyncThunk(
  "/auth/login",
  async (payload, thunkAPI) => {
    // console.log(payload)
    try {
      console.log(payload);
      await axios.post("http://alertservice.shop:8080/auth/login", payload);
      return thunkAPI.fulfillWithValue();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logInSlice = createSlice({
  name: "calendars",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(__gettoken.fulfilled, (state, action) => {
      state.calendars = action.payload;
    });
  },
});

export default logInSlice.reducer;
