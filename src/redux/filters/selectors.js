import { createSelector } from "@reduxjs/toolkit";
import { selectTeachers } from '../teachers/selectors';

export const selectFilteredTeachers = createSelector(
    [selectTeachers, (state) => state.filters],
    (teachers, filters) => {
                console.log("Teachers: ", teachers);
        console.log("Filters: ", filters);
        return teachers.filter(teacher => {
            const matchesName = filters.name ? teacher.name.includes(filters.name) : true;
            const matchesPrice = teacher.price_per_hour <= (filters.price || Infinity);
            const matchesLanguage = !filters.language || teacher.languages.includes(filters.language);
            const matchesLevel = !filters.level || teacher.levels.includes(filters.level);

            return matchesName && matchesPrice && matchesLanguage && matchesLevel;
        });
    }
);