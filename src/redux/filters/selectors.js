import { createSelector } from "@reduxjs/toolkit";
import { selectTeachers } from '../teachers/selectors';

// export const selectNameFilter = (state) => state.filters.name;
// export const selectPriceFilter = (state) => state.filters.price;
// export const selectLevelFilter = (state) => state.filters.level;

export const selectNameFilter = (state) => state.filters.name;

// Вибір фільтрованих контактів
export const selectFilteredTeachers = createSelector(
    [selectTeachers, selectNameFilter],
    (teachers, nameFilter) => {
        return teachers.filter(teacher => {
            const matchesName = nameFilter ? teacher.name.includes(nameFilter) : true;
            const matchesPrice = teacher.price_per_hour <= (price || Infinity); 
            const matchesLanguage = teacher.languages.includes(language) || !language;
            const matchesLevel = teacher.levels.includes(level) || !level;

            console.log('Вчитель:', teacher, 'Відповідає фільтрам:', matchesLanguage, matchesPrice, matchesLevel);
            return matchesName && matchesLanguage && matchesPrice && matchesLevel;
        });
    }
);