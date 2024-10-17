import { createContext, useState, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout as logoutAction } from '../redux/auth/operations'; 
import { selectIsLoggedIn, selectUser } from '../redux/auth/selectors';
import { setCurrentUser } from '../redux/auth/slice'; 
import { auth } from '../firebase';
import { saveUser } from '../redux/services/userService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const loading = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          await saveUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
          });

          dispatch(setCurrentUser({
            uid: user.uid,
            email: user.email,
            name: user.displayName,
          }));
        } catch (error) {
          console.error("Error creating user profile:", error);
        }
      } else {
        dispatch(setCurrentUser({ uid: null, email: null, name: null }));
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