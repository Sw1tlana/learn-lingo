import { createSelector } from "@reduxjs/toolkit";
import { selectTeachers } from '../teachers/selectors';

export const selectFilteredTeachers = createSelector(
  [selectTeachers, (state) => state.filters],
  (teachers, filters) => {
return teachers.filter(teacher => {
      console.log('Teacher languages:', teacher.languages);
  console.log('Filter language:', filters.language);
  const matchesPrice = filters.price === null || teacher.price_per_hour <= filters.price;
  const matchesLanguage = !filters.language || teacher.languages.includes(filters.language);
  const matchesLevel = !filters.level || teacher.levels.includes(filters.level);

  return matchesPrice && matchesLanguage && matchesLevel;
});
  }
)