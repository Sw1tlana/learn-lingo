import { createSlice } from "@reduxjs/toolkit";

import {
    fetchTeachers,
} from "./operations.js"; 
 
const handlePending = (state) => {
  console.log('Fetch teachers pending');
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.error.message;;
};

const teachersSlice = createSlice({
  name: "teachers",
  initialState: {
    items: [],
    favorites: [],
    loading: false,
    error: null,
    },
  reducers: {
    addFavorite: (state, action) => {
      const teacher = action.payload;
      if (!state.favorites.some(favTeacher => favTeacher.id === teacher.id)) {
        state.favorites.push(teacher);
        console.log('Favorite added:', teacher);
      }
    },
    deleteFavorite: (state, action) => {
      const teacherId = action.payload;
      state.favorites = state.favorites.filter(teacher => teacher.id !== teacherId);
      console.log('Favorite removed:', teacherId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachers.pending, handlePending)
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchTeachers.rejected, handleRejected);
  },
});

export const { addFavorite, deleteFavorite } = teachersSlice.actions;

export const teachersReducer = teachersSlice.reducer;