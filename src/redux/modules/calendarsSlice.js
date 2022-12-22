import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  calendars: [
    {
      calendarId: "Long",
      content: "프로젝트 S.A 작성 및 기획 회의",
      currentTimeMillis: "Long",
      endTimeMillis: "Long",
      startTime: "String",
      endTime: "String",
      done: "Boolean",
    },
    {
      calendarId: "Long",
      content: "서버 배포, api 통신",
      currentTimeMillis: "Long",
      endTimeMillis: "Long",
      startTime: "String",
      endTime: "String",
      done: "Boolean",
    },
    {
      calendarId: "Long",
      content: "미니 프로젝트 발표자료 준비",
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
export const __getcalendars = createAsyncThunk( // setTimeout(() => {}, 밀리세컨);
  "calendars/get",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.get("https://kekeke.gq:8080/calendars", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Authorization: payload.Authorization,
        },
      });
      console.log("response", data);
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
      await axios.post("https://kekeke.gq:8080/calendars", payload[0], {
        headers: {
          "Access-Control-Allow-Origin": "*",
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
    try {
      const data = await axios.patch(
        `https://kekeke.gq:8080/calendars/${payload[0].calendarId}`,
        { content: payload[0].content, endTime: payload[0].endTime },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization: payload[1].Authorization,
          },
        }
      );
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
      await axios.delete(`https://kekeke.gq:8080/calendars/${payload[0]}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Authorization: payload[1].Authorization,
        },
      });
      return thunkAPI.fulfillWithValue(payload[0]);
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
      state.calendars = action.payload.calendarList;
    });
    builder.addCase(__getcalendars.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(__postcalendars.fulfilled, (state, action) => {
      state.calendars = action.payload;
    });
    builder.addCase(__delcalendars.fulfilled, (state, action) => {
      state.calendars.calendarList = state.calendars.calendarList.filter(
        (a) => a.calendarId !== action.payload
      );
    });
    builder.addCase(__patchcalendars.fulfilled, (state, action) => {
      state.isLoading = false;
      state.calendars.calendarList = action.payload;
    });
  },
});

export default calendarsSlice.reducer;
