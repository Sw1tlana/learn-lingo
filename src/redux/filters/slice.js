import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
    name: "filters",
    initialState: {
        price: null,
        language: null,
        level: null
    },
    reducers: {
        changeFilter: (state, action) => {
            state.price = action.payload.price !== undefined ? action.payload.price : state.price;
            state.language = action.payload.language !== undefined ? action.payload.language : state.language;
            state.level = action.payload.level !== undefined ? action.payload.level : state.level;
        },
    },
});

export const { changeFilter } = filtersSlice.actions;
export const filterReducer = filtersSlice.reducer;