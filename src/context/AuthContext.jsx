import { createContext, useState, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout as logoutAction } from '../redux/auth/operations'; 
import { selectIsLoggedIn, selectUser } from '../redux/auth/selectors';
import { createUserProfile } from '../redux/services/userServices';
import { auth } from '../firebase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const loading = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
          if (user) {
              try {
                  await createUserProfile({
                      uid: user.uid,
                      email: user.email,
                      displayName: user.displayName,
                  });
              } catch (error) {
                  console.error("Error creating user profile:", error);
              }
          }
      });
        
        return () => unsubscribe();
    }, []);


const logout = async () => {
  try {
    await dispatch(logoutAction());
  } catch (error) {
    console.error('Logout error:', error);
  } 
};

  return (
    <AuthContext.Provider value={{ currentUser: user, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);