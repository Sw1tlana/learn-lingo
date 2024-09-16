import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    requestAddTeachers,
    requestDeleteTeachers,
    requestGetTeachers
} from "../services/authServices";
 
export const fetchTeachers = createAsyncThunk(
    "contacts/fetchTeachers",
    async (_, thunkAPI) => {
        try {
            const response = await requestGetTeachers();
            return response;
        } catch(error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    });
   
    export const addTeachers = createAsyncThunk(
    "contacts/addTeachers",
    async (addTeachers, thunkAPI) => {
        try {
            const response = await requestAddTeachers(addTeachers);
            return response;
        } catch(error) {
            return thunkAPI.rejectWithValue(error.message);
        }
        });
    
        export const deleteTeachers = createAsyncThunk( 
        "contacts/deleteTeachers",
        async (teachersId, thunkAPI) => {
            try {
                const response = await requestDeleteTeachers(teachersId);
                return response;
            }catch(error) {
                return thunkAPI.rejectWithValue(error.message); 
            }
    });