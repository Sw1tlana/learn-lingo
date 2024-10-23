import { createContext, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout as logoutAction } from '../redux/auth/operations'; 
import { selectIsLoggedIn, selectUser } from '../redux/auth/selectors';
import { setCurrentUser } from '../redux/auth/slice';
import { auth } from '../firebase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        const { uid, email, displayName } = currentUser;
        console.log('User logged in:', { uid, email, displayName });
        dispatch(setCurrentUser({ uid, email, displayName }));
      } else if (isLoggedIn) { // Викликаємо logoutAction лише якщо користувач був в системі
        console.log('User logged out');
        dispatch(logoutAction());
      }
    });
  
    return () => {
      console.log('Unsubscribing from auth changes');
      unsubscribe();
    };
  }, [dispatch, isLoggedIn]);

  const logout = () => {
    dispatch(logoutAction());
  };

  return (
    <AuthContext.Provider value={{ user, logout }}> {/* Додаємо функцію logout у контекст */}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);