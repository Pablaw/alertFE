import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  calendars: [],
  isLoading: false,
  error: null,
}

export const __getcalendars = createAsyncThunk(
  "calendars/get",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get("http://localhost:3001/calendars" );
      console.log(data)
      return thunkAPI.fulfillWithValue(data.data)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const __postcalendars = createAsyncThunk(
  "calenadars/post",
  async (payload, thunkAPI) => {
    try {
      await axios.post("http://localhost:3001/calendars", payload.calendars)
      return thunkAPI.fulfillWithValue("success");
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
)

export const calendarsSlice = createSlice({
  name: "calendars",
  initialState,
  reducers: {},
  extraReducers: {
    [__getcalendars.pending]: (state) => {
        state.isLoading = true // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__getcalendars.fulfilled]: (state, action) => {
        state.isLoading = false // 네트워크 요청이 끝났으니, false로 변경합니다.
        state.calendars = action.payload // Store에 있는 contents에 서버에서 가져온 contents를 넣습니다.
    },
    [__getcalendars.rejected]: (state, action) => {
        state.isLoading = false // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
        state.error = action.payload // catch 된 error 객체를 state.error에 넣습니다.
    },
  }
})
export const {} = calendarsSlice.actions;
export default calendarsSlice.reducer;