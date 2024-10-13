import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    requestGetTeachers
} from "../services/authServices";
 
export const fetchTeachers = createAsyncThunk(
  "contacts/fetchTeachers",
  async ({ page, limit, filteredTeachers }, thunkAPI) => {
    try {
      console.log('Fetching teachers...');
      const response = await requestGetTeachers(page, limit, filteredTeachers); 
      console.log('Response from requestGetTeachers:', response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Failed to fetch teachers");
    }
  }
);
   
