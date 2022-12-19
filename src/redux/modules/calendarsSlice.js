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
      const data = await axios.get("http://alertservice.shop:8080/calendars");
      // console.log(data)
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __postcalendars = createAsyncThunk(
  "calendars/post",
  async (payload, thunkAPI) => {
    // console.log(payload)
    try {
      await axios.post("http://alertservice.shop:8080/calendars", payload);
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
      await axios.delete(`http://alertservice.shop:8080/calendars/${payload}`);
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
