import { createSlice } from '@reduxjs/toolkit';
import {
  register,
  login,
  fetchCurrentUser,
  logout
} from './operations';

const initialState = {
  user: {
    name: null,
    email: null,
    },
    token: null,
    uid: null,
    isLoggedIn: false, 
    error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      const { uid, email, displayName } = action.payload;
      state.user = { uid, email, displayName };
      state.isLoggedIn = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        const { name, email } = action.payload.backendResponse; 
        const { uid } = action.payload.firebaseUser; 
        state.user = { name, email };
        state.token = action.payload.token; 
        state.uid = uid;
        state.isLoggedIn = true;
        state.error = null;
        })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload || 'Registration failed';
      })
      // Login
      .addCase(login.pending, (state) => {
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = { uid: action.payload.uid }; 
        state.token = action.payload.token; 
        state.loading = false;
        })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload || 'Login failed';
      })
      // Fetch Current User
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        const { name, email, uid } = action.payload;
        state.user = { name, email };
        state.uid = uid; 
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.error = null;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.payload || 'Failed to fetch user';
      })
      // Logout
     .addCase(logout.pending, (state) => {
      state.error = null;
    })
    .addCase(logout.fulfilled, (state) => {
      localStorage.removeItem('token');
      state.user = initialState.user;
      state.token = null;
      state.uid = null;
      state.isLoggedIn = false;
      state.error = null;
    })
      .addCase(logout.rejected, (state, action) => {
    state.error = action.payload || 'Logout failed';
      });
  }
});

export const { setCurrentUser} = authSlice.actions;
export const authReducer = authSlice.reducer;