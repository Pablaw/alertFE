import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Cookies, useCookies } from "react-cookie";

// const instance = axios.create({
//     baseURL: "http://alertservice.shop:8080/auth/login",
//     timeout: 1000,
//     headers: {}
// })

const initialState = {
  calendars: [],
  isLoading: false,
  error: null,
};

const cookies = new Cookies();

export const setCookies = ("myToken", "토큰 값을 입력");
export const getCookie = cookies.get("myToken");
console.log(getCookie);

export const __gettoken = createAsyncThunk(
  "/auth/login", // ! 액션 벨류
  async (payload, thunkAPI) => {
    // ! thunk 함수
    // const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
    try {
      await axios.post("http://alertservice.shop:8080/auth/login", payload);
      // .then((res) => console.log(res.headers.get("Authorization")));

      //   setCookie("accessToken", "이곳에토큰값입력");
      //   console.log(cookies);

      return thunkAPI.fulfillWithValue();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// ! 1Aa!1Aa!
export const logInSlice = createSlice({
  name: "loginToken",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.gettoken(__gettoken.fulfilled, () => {
      //   console.log(data);
    });
    builder.gettoken(__gettoken.rejected, (state, action) => {
      console.log(action.payload);
    });
  },
});

export default logInSlice.reducer;
