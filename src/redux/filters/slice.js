import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
    name: "filters",
    initialState: {
        name: '',
        price: null,         
        language: null,      
        level: null          
    },
    reducers: {
        changeFilter: (state, action) => {
            state.name = action.payload;
        },
        changePriceFilter: (state, action) => {
            state.price = action.payload;
        },
        changeLanguageFilter: (state, action) => {
            state.language = action.payload;
        },
        changeLevelFilter: (state, action) => {
            state.level = action.payload;
        }
    },
});

export const { changeFilter } = filtersSlice.actions;
export const filterReducer = filtersSlice.reducer;