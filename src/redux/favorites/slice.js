import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favorites: [],
  },
  reducers: {
addFavorite: {
  reducer(state, action) {
    const isFavorite = state.favorites.find(fav => fav.id === action.payload.id);
    if (!isFavorite) {
      state.favorites.push(action.payload);
      c
    }
  },
  prepare(values) {
    return {
      payload: {
        ...values,
      }
    };
  },
},
deleteFavorite: (state, action) => {
  state.favorites = state.favorites.filter(teacher => teacher.id !== action.payload);
}
  },
});

export const { addFavorite, deleteFavorite } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;