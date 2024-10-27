import { createSlice } from "@reduxjs/toolkit";

import {
  fetchTeachers
} from "./operations.js"; 
 
const handlePending = (state) => {
  state.loading = true;
  state.error = null;
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
      state.page = 1; 
      state.items = [];
    },
    setTotalPage: (state, active) => {
      state.totalPages = active.payload;
    },
    clearTeachers: (state) => { 
      state.items = [];
    },
},

  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachers.pending, handlePending)
      .addCase(fetchTeachers.fulfilled, (state, action) => {
      state.loading = false;
      if (state.page === 1) {
          state.items = action.payload.teachers; 
      } else {
          state.items = [...state.items, ...action.payload.teachers];
      }
      state.totalPages = action.payload.totalPages;
      state.error = null;
        })
      .addCase(fetchTeachers.rejected, handleRejected)
  },
});

export const {
  setPage,
  setLimit,
  setTotalPage,
  clearTeachers
} = teachersSlice.actions;

export const teachersReducer = teachersSlice.reducer;