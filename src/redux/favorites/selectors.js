export const selectFavoriteTeachers = (state) => {
  console.log(state); 
  return state.favorites.favoriteTeachers; 
};