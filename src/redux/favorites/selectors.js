import { createSelector } from 'reselect';

const selectFavoritesState = (state) => state.favorites;

export const selectFavoriteTeachers = createSelector(
  [selectFavoritesState], 
  (favorites) => favorites.selected 
);