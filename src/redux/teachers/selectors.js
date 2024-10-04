import { createSelector } from 'reselect';

export const selectTeachers = (state) => state.teachers.items;
console.log(selectTeachers);

export const selectLoading = (state) => state.teachers.loading;

export const selectError = (state) => state.teachers.error;

const selectFavoritesState = (state) => state.favorites; 

export const selectFavoriteTeachers = createSelector(
    [selectFavoritesState],
    (favorites) => {

        if (typeof favorites === 'string') {
            try {
       
                return JSON.parse(favorites) || [];
            } catch (error) {
                console.error('Error parsing favorites:', error);
                return []; 
            }
        }
   
        return Array.isArray(favorites) ? favorites : [];
    }
);