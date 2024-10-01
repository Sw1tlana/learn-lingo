import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getTeacher = createAsyncThunk("teacher/getTeacher",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(`/teachers.json`, {
            });
            toast.success("Teachear data fetched successfully!🤗");
            return response.data;
        } catch (error) {
            toast.error("Failed to fetch teacher data.");
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);