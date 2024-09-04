import { createSlice } from '@reduxjs/toolkit';
import { register, login, fetchCurrentUser, logout } from './operations';

const initialState = {
  user: null,
  name: '',
  email: '',
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
  version: -1,
  rehydrated: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setName(state, action) {
      state.name = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
         console.log('Register fulfilled', action.payload);
            const { name, email, token } = action.payload;
            state.user = { name, email, token };
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
            const { token, email } = action.payload;
            state.token = token;
            state.email = email;
            state.isLoggedIn = true;
            state.error = null;
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
        state.user = {
          name: action.payload.name,
          email: action.payload.email
        };
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
        console.log('Logout fulfilled');
        state.user = null; 
        state.token = null;
        state.isLoggedIn = false;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload || 'Logout failed';
      });
  }
});

export const { setName, setEmail } = authSlice.actions;
export const authReducer = authSlice.reducer;