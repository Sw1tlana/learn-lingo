import { createContext, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout as logoutAction } from '../redux/auth/operations'; 
import { selectIsLoggedIn, selectUser } from '../redux/auth/selectors';
import { setCurrentUser } from '../redux/auth/slice';
import { auth } from '../firebase';
import { fetchTeachers } from '../redux/teachers/operations';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        const { uid, email, displayName } = currentUser;
        dispatch(setCurrentUser({ uid, email, displayName }));
  
      } else if (isLoggedIn) { 
        dispatch(logoutAction());
      }
    });
  
    return () => {
      unsubscribe();
    };
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    dispatch(fetchTeachers()); 
  }, [dispatch]);

  const logout = () => {
    dispatch(logoutAction());
  };

  return (
    <AuthContext.Provider value={{ user, logout }}> 
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);