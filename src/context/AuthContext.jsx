import { createContext, useState, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout as logoutAction } from '../redux/auth/operations'; 
import { selectIsLoggedIn, selectUser } from '../redux/auth/selectors';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
    console.log('Is Logged In:', isLoggedIn);
    console.log('User:', user);
      setLoading(false);
    };

    checkUser();
  }, []);

  const logout = async () => {
    setLoading(true); 
    try {
      await dispatch(logoutAction());
    } finally {
      setLoading(false); 
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser: user, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);