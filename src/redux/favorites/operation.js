import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast'; 

export const getTeacher = createAsyncThunk(
  "teacher/getTeacher",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`/teachers`);
      toast.success("Teacher data fetched successfully! 🤗");
      return response.data;
    } catch (error) {
      toast.error("Failed to fetch teacher data.");
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);