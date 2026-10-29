import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  LoginPayload,
  LoginResponse,
  AuthUser,
  SignUpPayload,
  SignUpResponse,
} from "../../features/auth/types";
import { login, signUp } from "../../features/auth/authApi";

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  status: "idle",
  error: null,
};

export const loginThunk = createAsyncThunk<
  LoginResponse,
  LoginPayload,
  { rejectValue: string }
>("user/login", async (credentials, { rejectWithValue }) => {
  try {
    const res = await login(credentials);
    return res;
  } catch (err) {
    return rejectWithValue(
      err instanceof Error ? err.message : "Something went wrong"
    );
  }
});

export const signupThunk = createAsyncThunk<
  SignUpResponse,
  SignUpPayload,
  { rejectValue: string }
>("user/signup", async (credentials, { rejectWithValue }) => {
  try {
    const res = await signUp(credentials);
    return res;
  } catch (err) {
    return rejectWithValue(
      err instanceof Error ? err.message : "Something went wrong"
    );
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      ((state.user = null),
        (state.accessToken = null),
        (state.status = "idle"));
    },
    cleanError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ---------- LOGIN ----------
      .addCase(loginThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Login failed.";
      })

      // ---------- SIGNUP ----------
      .addCase(signupThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signupThunk.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(signupThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Signup failed.";
      });
  },
});

export const { logout, cleanError } = authSlice.actions;
export default authSlice.reducer;
