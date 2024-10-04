import { createSlice } from "@reduxjs/toolkit";

import {
  fetchTeachers
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
    favorites: JSON.stringify([]),
    loading: false,
    error: null,
    },
  reducers: {
    addFavorite: {
      reducer(state, action) {
          const updatedFavorites = [...state.favorites, action.payload];
          state.favorites = JSON.stringify(updatedFavorites);
      },
      prepare(values) {
        return {
          payload: {
            ...values,
          },
        };
      },
    },
    deleteFavorite: (state, action) => {
      const teacherId = action.payload;
      console.log("Deleting favorite teacher with ID:", teacherId);
      state.favorites = state.favorites.filter(fav => fav.id !== teacherId);
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
      .addCase(fetchTeachers.rejected, handleRejected)
  },
});

export const { addFavorite, deleteFavorite } = teachersSlice.actions;

export const teachersReducer = teachersSlice.reducer;