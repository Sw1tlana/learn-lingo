import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    requestGetTeachers
} from "../services/authServices";
 
export const fetchTeachers = createAsyncThunk(
    "contacts/fetchTeachers",
    async (_, thunkAPI) => {
        try {
            console.log('Fetching teachers...');
            const response = await requestGetTeachers();
             console.log('Response from requestGetTeachers:', response);
            return response;
        } catch(error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    });
   
    // export const addTeachers = createAsyncThunk(
    // "contacts/addTeachers",
    // async (teacherData, thunkAPI) => {
    //     try {
    //         const response = await addFavoriteTeacher(teacherData);
    //         return response;
    //     } catch(error) {
    //         return thunkAPI.rejectWithValue(error.message);
    //     }
    //     });
    
    //     export const deleteTeachers = createAsyncThunk( 
    //     "contacts/deleteTeachers",
    //     async (teachersId, thunkAPI) => {
    //         try {
    //             const response = await requestDeleteTeachers(teachersId);
    //             return response;
    //         }catch(error) {
    //             return thunkAPI.rejectWithValue(error.message); 
    //         }
    // });