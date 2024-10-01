import { createSlice } from "@reduxjs/toolkit";
import { getTeacher } from "./operation";

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favoriteTeachers: [],
  },
  reducers: {
      addFavorite: (state, action) => {
      console.log('Adding Favorite:', action.payload);
      state.favoriteTeachers.push(...action.payload)
    },
    deleteFavorite: (state, action) => {
      state.favoriteTeachers = state.favoriteTeachers.filter(teacher => teacher.id !== action.payload);
      },
      extraReducers: (builder) => {
    builder
      .addCase(getTeacher.pending, (state) => {
        state.loading = true;
        state.error = null; 
      })
      .addCase(getTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload; 
      })
      .addCase(getTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      });
  },
  },
});

export const { addFavorite, deleteFavorite } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;

