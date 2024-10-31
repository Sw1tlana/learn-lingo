import { createAsyncThunk } from "@reduxjs/toolkit";

import { requestGetTeachers } from "../services/teacherService.js";
 
export const fetchTeachers = createAsyncThunk(
  "contacts/fetchTeachers",
  async ({ page = 1, limit = 4 } = {}, thunkAPI) => {
    try {
      const response = await requestGetTeachers(page, limit); 
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Failed to fetch teachers");
    }
  }
);
   
