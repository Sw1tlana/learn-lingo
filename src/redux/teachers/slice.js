import { createSlice } from "@reduxjs/toolkit";

import {
    fetchTeachers,
    addTeachers,
    deleteTeachers
} from "./operations.js"; 
 
const handlePending = (state) => {
    console.log('Fetch teachers pending');
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.error.message;;
};

const teachersSlice = createSlice({
  name: "teachers",
  initialState: {
    items: [],
    loading: false,
    error: null,
    },
    extraReducers: (builder) => {
    builder
      .addCase(fetchTeachers.pending, handlePending)

      .addCase(fetchTeachers.fulfilled, (state, action) => {
        console.log('Fetched teachers in reducer:', action.payload);
        state.loading = false;
        state.error = null;
         state.items = action.payload;
      })
      .addCase(addTeachers.pending, handlePending)

      .addCase(addTeachers.fulfilled, (state, action) => {
        console.log('Teacher added:', action.payload); 
        state.loading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(addTeachers.rejected, handleRejected) 
      
      .addCase(deleteTeachers.pending, handlePending)
      
        .addCase(deleteTeachers.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.items = state.items.filter(
          (teacher) => teacher.id !== action.payload.id
        );
        }) 
       .addCase(deleteTeachers.rejected, handleRejected)  
},
});

export const teachersReducer = teachersSlice.reducer;