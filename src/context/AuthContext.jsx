import { createContext, useState, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout as logoutAction } from '../redux/auth/operations'; 
import { selectIsLoggedIn, selectUser } from '../redux/auth/selectors';
import { setCurrentUser } from '../redux/auth/slice'; 
import { auth } from '../firebase';
// import { saveUser } from '../redux/services/userService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const loading = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
        if (currentUser) {
            const { uid, email, displayName } = currentUser;
            console.log('User logged in:', { uid, email, displayName });
            dispatch(setCurrentUser({ uid, email, displayName }));
        } else {
            console.log('User logged out');
            dispatch(logoutAction());
        }
    });

    return () => unsubscribe();
}, [dispatch]);

const logout = () => {
  dispatch(logoutAction());
};

  return (
    <AuthContext.Provider value={{ currentUser: user, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);