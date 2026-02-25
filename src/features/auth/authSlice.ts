import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { loginApi } from "./api";
import type { LoginPayload, LoginResponse } from "./types";

interface AuthState {
  user: LoginResponse["user"] | null;
  token: string | null;
  loading: boolean;
}
const storeToken = localStorage.getItem("token");
const storeUser = localStorage.getItem("user")
const initialState: AuthState = {
  user: storeUser? JSON.parse(storeUser): null,
  token: storeToken,
  loading: false,
};

/**
 * Async Login Thunk
 */
export const login = createAsyncThunk<
  LoginResponse,
  LoginPayload
>("auth/login", async (data, { rejectWithValue }) => {
  try {
    const response = await loginApi(data);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || "Login failed");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
          localStorage.setItem("token", action.payload.token);
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        }
      )
      .addCase(login.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { logout } = authSlice.actions;

/**
 * Named export reducer (recommended for large apps)
 */
export const authReducer = authSlice.reducer;
