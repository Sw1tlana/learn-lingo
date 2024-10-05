export const selectTeachers = (state) => state.teachers.items;
console.log(selectTeachers);

export const selectLoading = (state) => state.teachers.loading;

export const selectError = (state) => state.teachers.error;

