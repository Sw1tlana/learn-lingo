export const selectUser = ((state) => state.auth.user);

export const selectEmail = ((state) => state.auth.email);

export const selectIsLoggedIn = ((state) => state.auth.isLoggedIn);

export const selectIsRefreshing = ((state) => state.auth.isRefreshing);

export const selectAutchError = ((state) => state.auth.error);