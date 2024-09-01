import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    requestSignUp,
    requestSignIn,
    requestGetCurrentUser,
    requestLogOut,
    setToken,
    clearToken
} from "../services/authServices";

export const register = createAsyncThunk(
    "auth/register",
    async (formData, thunkAPI) => {
        try {
            const response = await requestSignUp(formData);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    });

export const login = createAsyncThunk(
    "auth/login",
    async (formData, thunkAPI) => {
        try {
            const response = await requestSignIn(formData);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    });


export const fetchCurrentUser = createAsyncThunk( 
    "auth/refreshUser",
    async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    setToken(token);
    try {
      const response = await requestGetCurrentUser();
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
  {
    condition: (_, thunkAPI) => {
      const state = thunkAPI.getState();
      const token = state.auth.token;

      if(!token) return false;
      return true;
    }
  }
);

export const logout = createAsyncThunk(
   "auth/logout",
    async (_, thunkAPI) => {
        try {
        await requestLogOut();
        clearToken();
        } catch(error) {
        return thunkAPI.rejectWithValue(error.message);
        }
    });