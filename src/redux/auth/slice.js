import { createSlice } from '@reduxjs/toolkit';
import {
  register,
  login,
  fetchCurrentUser,
  logout
} from './operations';

const initialState = {
  user: {
    name: '',
    email: '',
  },
  token: null,
  uid: null, 
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
  version: -1,
  rehydrated: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
         console.log('Register fulfilled', action.payload);
            const { name, email, token, uid } = action.payload;
            state.user = { name, email, token, uid };
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
        console.log('Login fulfilled', action.payload);
          state.uid = action.payload.uid;
          state.token = action.payload.token;
          state.isLoggedIn = true;
          state.error = null;
         console.log('Token saved in Redux state:', state.token);
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
        state.user = action.payload;
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
        console.log('Logout pending');
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        console.log('Logout fulfilled');
        console.log('State before clearing:', state);
        state.user = null; 
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

export const { setName, setEmail } = authSlice.actions;
export const authReducer = authSlice.reducer;