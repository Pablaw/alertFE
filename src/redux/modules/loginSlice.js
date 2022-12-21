// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const initialState = {
//   calendars: [],
//   isLoading: false,
//   error: null,
// };

// export const __gettoken = createAsyncThunk(
//   "/auth/login",
//   async (payload, thunkAPI) => {
//     try {
//       const data = await axios.get("http://localhost:3001/auth/login");
//       console.log(data);
//       return thunkAPI.fulfillWithValue(data.data);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

// export const {} = loginSlice.actions;
// export default loginSlice.reducer;
