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
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    });

export const fetchCurrentUser = createAsyncThunk(
    "auth/refreshCurrentUser",
    async (_, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const token = state.auth.token;
            if (!token) {
                throw new Error("No token available");
            }
            const response = await requestGetCurrentUser();
            return response;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const logout = createAsyncThunk(
   "auth/logout",
    async (_, thunkAPI) => {
        try {
        await requestLogOut();
            clearToken();
            return {};
        } catch(error) {
        return thunkAPI.rejectWithValue(error.message);
        }
    });