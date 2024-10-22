import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axios.config";
import { IError, ILoginResponseFulfilled, ILoginResponseRejected } from "../../interfaces/auth/loginReponseType";
import { AxiosError } from "axios";
import { ICustomAxiosError, transformAxiosError } from "../../helper/handleAxiosError";

export interface IUserState {
  loading: boolean;
  data: ILoginResponseFulfilled | null;
  error: IError | null; // For error handling
}

const initialState: IUserState = {
  loading: false, /// Pending
  data: null, /// Success => fulfilled
  error: null /// Error => rejected
}


export const userLogin = createAsyncThunk<ILoginResponseFulfilled, { identifier: string; password: string }>
  ("login/userLogin", async (credentials, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const { data } = await axiosInstance.post<ILoginResponseFulfilled>("/api/auth/local", credentials);
      return data;
    }
    catch (error: any) {
      const axiosError = error as AxiosError;
      const customError: ICustomAxiosError = transformAxiosError(axiosError);
      return rejectWithValue(customError); // Return the custom error object
    }
  })


const loginSlice = createSlice({
  initialState: initialState,
  name: "login",
  reducers: {}, // for action
  extraReducers: (builder) => { // for middleware to handle request-response lifecycle
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
    }).addCase(userLogin.fulfilled, (state, action: PayloadAction<ILoginResponseFulfilled>) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    }).addCase(userLogin.rejected, (state, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.payload as IError;
    })
  }
});

export const selectLogin = (state: { login: IUserState }) => state.login;
export default loginSlice.reducer;