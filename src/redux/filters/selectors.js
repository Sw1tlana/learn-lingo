import { createSelector } from "@reduxjs/toolkit";
import { selectTeachers } from '../teachers/selectors';

export const selectNameFilter = (state) => state.filters.name;
export const selectPriceFilter = (state) => state.filters.price; 
export const selectLevelFilter = (state) => state.filters.level; я

export const selectFilteredTeachers = createSelector(
    [selectTeachers, selectNameFilter, selectPriceFilter, selectLevelFilter],
    (teachers, nameFilter, priceFilter, levelFilter) => {
        return teachers.filter((teacher) => {
            const matchesLanguage = nameFilter ? 
                (teacher.languages && teacher.languages.some(lang => lang.includes(nameFilter.toLowerCase()))) : true;

            const matchesPrice = priceFilter !== undefined ? 
                (teacher.price_per_hour && teacher.price_per_hour.toString().includes(priceFilter.toString())) : true;

            const matchesLevel = levelFilter !== undefined ? 
                (teacher.levels && teacher.levels.includes(levelFilter)) : true;

            console.log('Відповідає:', {
                matchesLanguage,
                matchesPrice,
                matchesLevel
            });

            return matchesLanguage && matchesPrice && matchesLevel;
        });
    }
);