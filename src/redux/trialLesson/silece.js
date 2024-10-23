import { createSlice } from '@reduxjs/toolkit';

const bookLessonSlice = createSlice({
    name: 'bookLesson',
    initialState: {
        data: {
            name: '',
            email: '',
            phone: '',
            selectedOption: '',
        },
    },
    reducers: {
        setBookingData: (state, action) => {
            state.data = action.payload;
        },
        setSelectedOption: (state, action) => {
            state.data.selectedOption = action.payload; 
        },
    },
});

export const { setBookingData, setSelectedOption } = bookLessonSlice.actions;

export const bookLessonReducer = bookLessonSlice.reducer;