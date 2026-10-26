import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  LoginPayload,
  LoginResponse,
  AuthUser,
} from "../../features/auth/types";
import {
login
} from "../../features/auth/authApi";

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  refrestToken:string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error:
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refrestToken: null,
  status: "idle",
  error: null,
};


export const loginThunk = createAsyncThunk<LoginResponse,LoginPayload,{rejectValue:string}>('user/login',async(credentials,{rejectWithValue})=>{
  try{
    const res = await login(credentials)
    return res 
  } catch(err){
    return rejectWithValue(err instanceof Error ? err.message : "Something went wrong")  
  }
})


const authSlice = createSlice({
  name:"auth",
  initialState,
  reducers:{
    logout:(state)=>{
    state.user = null,
    state.accessToken=null,
     state.status="idle" 
    },
    cleanError:(state)=>{
      state.error = null
    }
  },
  extraReducers:(builder)=>{
      builder.addCase(loginThunk.pending,(state)=>{
        state.status='loading'
        state.error=null
      }).addCase(loginThunk.fulfilled,(state,action)=>{
        state.status="succeeded",
        state.user = action.payload.user,
        state.accessToken = action.payload.accessToken,
        state.refrestToken = action.payload.refreshToken,
      }).addCase(loginThunk.rejected,(state,action)=>{
        state.status="failed",
        state.error = action.payload ?? "Login failed."
      })
  }
})

export const { logout, cleanError } = authSlice.actions;
export default authSlice.reducer;
