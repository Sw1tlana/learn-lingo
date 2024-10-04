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
    favorites: [],
    loading: false,
    error: null,
    },
  reducers: {
  addFavorite: {
    reducer(state, action) {
        const isFavorite = state.favorites.some(fav => fav.id === action.payload.id);
        if (!isFavorite) {
            state.favorites.push(action.payload);
        }
    },
    prepare(values) {
        return {
            payload: {
                ...values,
            }
        };
    }
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