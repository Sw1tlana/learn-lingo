import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    registerUserAndSave,
    requestSignIn,
    requestGetCurrentUser,
    requestLogOut,
    setToken,
    clearToken
} from "../services/authServices";

export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
           console.log('Registering with data:', userData);
      const response = await registerUserAndSave(userData);
      return response;
    } catch (error) {
      console.error("Registration error:", error);
      return thunkAPI.rejectWithValue(error.message || "Failed to register");
    }
  }
);

export const login = createAsyncThunk(
    "auth/login",
    async (formData, thunkAPI) => {
      try {
          const response = await requestSignIn(formData);
          console.log('Login response:', response);
           const { uid, token } = response; 
            return { uid, token };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    });

export const fetchCurrentUser = createAsyncThunk(
  "auth/refreshCurrentUser",
  async (_, thunkAPI) => {
    try {
       console.log('Fetching current user...');
      const firebaseUser = await requestGetCurrentUser();

      console.log('Firebase user:', firebaseUser);

      const token = await firebaseUser.getIdToken(true);
      setToken(token); 
       console.log('User fetched:', firebaseUser);

      return { uid: user.uid, token };
    } catch (err) {
      console.error('Error fetching current user:', err.message);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const logout = createAsyncThunk(
   "auth/logout",
  async (_, thunkAPI) => {
    try {
      console.log('Logout thunk started.');
      await requestLogOut();
      console.log('User signed out from Firebase.');
      clearToken();
       console.log('Token after logout:', instance.defaults.headers.common.Authorization);
      return {};
    } catch (error) {
      console.error('Error during logout:', error);
      return thunkAPI.rejectWithValue(error.message);
    }
    });