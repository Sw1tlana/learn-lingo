import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
    name: "filters",
    initialState: {
        name: "",
        price: undefined,
        level: undefined,
     },
    
    reducers: {
        changeFilter: (state, action) => {
            state.name = action.payload;
        }
    }
});

export const { changeFilter } = filtersSlice.actions;
export const filterReducer = filtersSlice.reducer;