import { createSlice } from "@reduxjs/toolkit";
import { getTeacher } from "./operation";

export const initialStateTeacher = {
  favoriteTeachers: [],
  token: null,
  isLoading: false, 
  error: null, 
};

const handlePending = (state) => {
    state.isLoading = true;
};

const handleRejected = (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    console.error('Error:', action.payload);
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: initialStateTeacher,

    reducers: {
        addFavorite: {
            reducer(state, action) {
                 console.log('Adding favorite teacher:', action.payload); 
                state.favoriteTeachers.push(action.payload);
            },
            prepare(values) {
                return {
                    payload: {
                        ...values,
                    }
                };
            }
        },
        deleteFavorite: (state, action) => {
            console.log('Deleting favorite teacher with ID:', action.payload); 
            state.favoriteTeachers = state.favoriteTeachers.filter(car =>
                car._id !== action.payload
            );
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(getTeacher.pending, handlePending)
            .addCase(getTeacher.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.teachers = action.payload;
        })
            .addCase(getTeacher.rejected, handleRejected)
    }
});

export const favoritesReducer = favoritesSlice.reducer;
export const {
    addFavorite,
    deleteFavorite,
} = favoritesSlice.actions;