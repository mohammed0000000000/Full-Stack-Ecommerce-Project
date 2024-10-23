import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILoginResponseFulfilled } from "../../interfaces/auth/loginReponseType";
import { axiosInstance } from "../../api/axios.config";
import { AxiosError } from "axios";
import { ICustomAxiosError, transformAxiosError } from "../../helper/handleAxiosError";
import { createStandaloneToast } from "@chakra-ui/react";

const { toast } = createStandaloneToast();

export interface IUserState {
  loading: boolean;
  data: ILoginResponseFulfilled | null;
  error: ICustomAxiosError | null; // For error handling
}

const initialState: IUserState = {
  loading: false, /// Pending
  data: null, /// Success => fulfilled
  error: null /// Error => rejected
}

export const userRegister = createAsyncThunk<ILoginResponseFulfilled, { username: string, email: string, password: string }>(
  "/register/userRegister", async (credentials, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const { data } = await axiosInstance.post<ILoginResponseFulfilled>("/api/auth/local/register", credentials);
      return data;
    }
    catch (error: any) {
      console.log(error);
      const axiosError = error as AxiosError;
      const customError: ICustomAxiosError = transformAxiosError(axiosError);
      return rejectWithValue(customError); // Return the custom error object
    }
  }
)

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers: (builder) => { // for middleware to handle request-response lifecycle
    builder.addCase(userRegister.pending, (state) => {
      state.loading = true;
    }).addCase(userRegister.fulfilled, (state, action: PayloadAction<ILoginResponseFulfilled>) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      toast({
        title: "Register Successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }).addCase(userRegister.rejected, (state, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.payload as ICustomAxiosError;
      toast({
        title: (action?.payload?.response?.data?.error?.message) ?? "InValid Register",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    })
  }
})

export const selectRegister = (state: { register: IUserState }) => state.register;
export default registerSlice.reducer;