import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  calendars: [
    {
      calendarId: "Long",
      content: "String",
      currentTimeMillis: "Long",
      endTimeMillis: "Long",
      startTime: "String",
      endTime: "String",
      done: "Boolean",
    },
  ],
  isLoading: false,
  error: null,
};
//  "http://localhost:3001/calendars"
//  "http://13.209.41.128:8080/calendars"
export const __getcalendars = createAsyncThunk(
  "calendars/calendarList/get",

  async (payload, thunkAPI) => {
    console.log(payload.Authorization);
    try {
      const { data } = await axios.get("http://13.209.41.128:8080/calendars", {
        headers: {
          "Content-Type": "application/json",
          Authorization: payload.Authorization,
        },
      });
      console.log({ data });
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __postcalendars = createAsyncThunk(
  "calendars/post",
  async (payload, thunkAPI) => {
    try {
      await axios.post("http://13.209.41.128:8080/calendars", payload[0], {
        headers: {
          "Content-Type": "application/json",
          Authorization: payload[1].Authorization,
        },
      });
      return thunkAPI.fulfillWithValue();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __patchcalendars = createAsyncThunk(
  "calendars/patch",
  async (payload, thunkAPI) => {
    console.log(payload, thunkAPI);
    try {
      const data = await axios.patch(
        `http://13.209.41.128:8080/calendars/${payload.calId}`,
        { content: payload.content, endTime: payload.endTime },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: payload[1].Authorization,
          },
        }
      );
      console.log(data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __delcalendars = createAsyncThunk(
  "calendars/delete",
  async (payload, thunkAPI) => {
    try {
      await axios.delete(`http://13.209.41.128:8080/calendars/${payload}`);
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
    // builder.addCase(__getcalendars.pending, (state) => {
    //   state.isLoading = true;
    // });
    builder.addCase(__getcalendars.fulfilled, (state, action) => {
      state.isLoading = false;
      state.calendars = action.payload.calendarList;
    });
    // builder.addCase(__getcalendars.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // });
    builder.addCase(__postcalendars.fulfilled, (state, action) => {
      state.calendars = action.payload;
    });
    builder.addCase(__delcalendars.fulfilled, (state, action) => {
      state.calendars = state.calendars.filter((a) => a.id !== action.payload);
    });
    builder.addCase(__patchcalendars.fulfilled, (state, action) => {
      state.isLoading = false;
      state.calendars = action.payload;
    });
  },
});

export default calendarsSlice.reducer;
