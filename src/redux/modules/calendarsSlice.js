import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  calendars: [],
  isLoading: false,
  error: null,
};

export const __getcalendars = createAsyncThunk(
  "calendars/get",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get("http://localhost:3001/calendars");
      console.log(data.data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __postcalendars = createAsyncThunk(
  "calendars/post",
  async (payload, thunkAPI) => {
    // console.log(payload)
    try {
      await axios.post("http://localhost:3009/calendars", payload);
      return thunkAPI.fulfillWithValue();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __delcalendars = createAsyncThunk(
  "calendars/delete",
  async (payload, thunkAPI) => {
    try {
      await axios.delete(`http://localhost:3009/calendars/${payload}`);
      return thunkAPI.fulfillWithValue();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const calendarsSlice = createSlice({
  name: "calendars",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(__getcalendars.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(__getcalendars.fulfilled, (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.calendars = action.payload;
    });
    builder.addCase(__getcalendars.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(__postcalendars.fulfilled, (state, action) => {
      state.calendars = action.payload;
    });
    // builder.addCase(__delcalendars.fulfilled, (state, action) => {
    //   state.calendars = state.calendars.filter((a) => a.id !== action.payload)
    // })
  },
});

export default calendarsSlice.reducer;
