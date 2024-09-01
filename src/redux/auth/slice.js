import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { login, logout, fetchCurrentUser, register } from "./operations";
import { toast } from 'react-hot-toast';

const INITIAL_STATE = {
    user: {
        name: null,
        email: null,
    },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
    error: false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState: INITIAL_STATE,
  
    extraReducers: (builder) => {
        builder
            // REGISTER
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isLoggedIn = true;
                toast.success('You have registered✅');
            })
            // LOGIN
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isLoggedIn = true;
                toast.success('You are logged in✅');
            })
            // LOGOUT
            .addCase(logout.fulfilled, () => {
                return INITIAL_STATE;
            })
            // REFRESH
            .addCase(fetchCurrentUser.pending, (state) => {
                state.isRefreshing = true;
                state.error = false;
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.isRefreshing = false;
                state.user = action.payload;
                state.isLoggedIn = true;
            })
            .addCase(fetchCurrentUser.rejected, (state) => {
                state.isRefreshing = false;
                state.error = true;
            })
            // pending/rejected
            .addMatcher(isAnyOf(
                register.pending, login.pending, logout.pending),
                (state) => {
                    state.error = false;
                })
            .addMatcher(isAnyOf(
                register.rejected, login.rejected, logout.rejected),
                (state) => {
                    state.error = true;
                    toast.error('Oops! Something went wrong ❌');
                })
    }
});

export const authReducer = authSlice.reducer;