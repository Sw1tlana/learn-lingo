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
import { instance } from '../services/authServices';

export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
           console.log('Registering with data:', userData);
      const response = await registerUser(userData);
      console.log('Response from registration:', response);
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
       console.log('Fetching current user...');
      const firebaseUser = await requestGetTeachers();

      console.log('Firebase user:', firebaseUser);

      const token = await firebaseUser.getIdToken(true);
      setToken(token); 
       console.log('User fetched:', firebaseUser);

      return { uid: firebaseUser.uid, token };
    } catch (err) {
      console.error('Error fetching current user:', err.message);
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
      console.log('Logout thunk started.');
      console.log('instance:', instance);
      await logOutUser();
      console.log('User signed out from Firebase.');
      console.log('Token after logout:', instance.defaults.headers.common.Authorization);

      clearToken();
      
      return {};
    } catch (error) {
      console.error('Error during logout:', error);
      return thunkAPI.rejectWithValue(error.message);
    }
    });