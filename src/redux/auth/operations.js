import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    registerUserAndSave,
    requestSignIn,
    requestGetCurrentUser,
    requestLogOut,
    setToken,
    clearToken
} from "../services/authServices";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../firebase/config";

export const register = createAsyncThunk(
    "auth/register",
    async (formData, thunkAPI) => {
        try {
            const response = await registerUserAndSave(formData);
            
         if (response?.firebaseUser) {
            const token = await response.firebaseUser.getIdToken();
            setToken(token);
            console.log("Token set:", token);

        return {
            name: response.firebaseUser.displayName || formData.name,
            email: formData.email,
            token: token
        };
    }
            
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
             console.log('Login response:', response); 
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    });

export const fetchCurrentUser = createAsyncThunk(
  "auth/refreshCurrentUser",
  async (_, thunkAPI) => {
    try {
      const firebaseUser = await requestGetCurrentUser();

      const userDoc = await getDoc(doc(firestore, 'users', firebaseUser.uid));
      const firestoreUserData = userDoc.data();

      if (!firestoreUserData) {
        throw new Error("User data not found in Firestore");
      }
      return {
        name: firebaseUser.name,
        email: firebaseUser.email,
        ...firestoreUserData 
      };
    } catch (err) {
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