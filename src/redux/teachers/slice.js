import { createSlice } from "@reduxjs/toolkit";

import {
  fetchTeachers
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
    page: 1,
    limit: 4,
    totalPages: 0
  },
  reducers: { 
    setPage: (state, active) => {
      state.page = active.payload;
    },
    setLimit: (state, active) => {
      state.limit = active.payload;
    },
    setTotalPage: (state, active) => {
      state.totalPages = active.payload;
    }
},

  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachers.pending, handlePending)
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchTeachers.rejected, handleRejected)
  },
});

export const {
  setPage,
  setLimit,
  setTotalPage
} = teachersSlice.actions;

export const teachersReducer = teachersSlice.reducer;