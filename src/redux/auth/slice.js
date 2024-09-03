import { createSlice } from '@reduxjs/toolkit';
import { register, login, fetchCurrentUser, logout } from './operations';

const initialState = {
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
        state.name = action.payload.name;
        state.email = action.payload.email;
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
        state.name = '';
        state.email = '';
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