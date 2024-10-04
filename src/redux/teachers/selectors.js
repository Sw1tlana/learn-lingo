
export const selectTeachers = (state) => state.teachers.items;
console.log(selectTeachers);

export const selectLoading = (state) => state.teachers.loading;

export const selectError = (state) => state.teachers.error;

export const selectFavoriteTeachers = (state) => {
  console.log('Current State:', state.teachers);
  return state.teachers.favorites;
};