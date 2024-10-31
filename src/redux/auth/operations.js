import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    requestSignIn,
    registerUser,
    logOutUser,
    setToken,
    clearToken,
} from "../services/authServices.js";
import { requestGetTeachers } from '../services/teacherService';
import toast from 'react-hot-toast';

export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const response = await registerUser(userData);
      toast.success("Registration successful!");
      return response;

    } catch (error) {
      toast.error(error.message || "Failed to register.");
      return thunkAPI.rejectWithValue(error.message || "Failed to register");
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (formData, thunkAPI) => {
    try {
      const response = await requestSignIn(formData);
      const { uid, token } = response;
      setToken(token);
      toast.success("Login successful!");

      return { uid, token };
    } catch (error) {
      toast.error(error.message || "Failed to log in.");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "auth/refreshCurrentUser",
  async (_, thunkAPI) => {
    try {
      const firebaseUser = await requestGetTeachers();

      const token = await firebaseUser.getIdToken(true);
      setToken(token); 

      return { uid: firebaseUser.uid, token };
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
      await logOutUser(); 
           
      clearToken();
      
      return {};
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
});