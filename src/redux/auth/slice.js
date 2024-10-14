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
        console.log('Login fulfilled payload:', action.payload);

        const { token, uid } = action.payload || {};  
        if (token && uid) {
          state.user.uid = uid;
          state.token = token;
          state.isLoggedIn = true;
        } else {
          state.error = 'Missing token or uid in response';
        }
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
        state.uid = uid; // Додається uid, якщо потрібно
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

export const { setName, setEmail } = authSlice.actions;
export const authReducer = authSlice.reducer;