import { createSlice } from '@reduxjs/toolkit';
import {
  register,
  login,
  fetchCurrentUser,
  logout
} from './operations';

const token = localStorage.getItem('token')?.replace(/"/g, ''); 

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
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        const { name, email, token, uid } = action.payload;
        state.user = { name, email };
        state.token = token;
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
           console.log(action.payload);
            const { uid, email, name, token } = action.payload; 
            state.user = { uid, email, name };
            state.token = token;
            state.isLoggedIn = true;
        })
      .addCase(login.rejected, (state, action) => {
        console.error('Login failed:', action.payload); 
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
      console.log('Logout process started. Current state:', state);
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
    console.error('Logout rejected:', action.error.message); 
    state.error = action.payload || 'Logout failed';
      });
  }
});

export const { setCurrentUser} = authSlice.actions;
export const authReducer = authSlice.reducer;