import { Route, Routes, Navigate } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import { lazy } from 'react';

import Layout from './components/Layout/Layout';
import Loader from './shared/components/Loader/Loader';
import { useDispatch } from 'react-redux';
import { fetchCurrentUser } from "./redux/auth/operations";
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { auth } from './firebase';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const TeachersPage = lazy(() => import('./pages/TeachersPage/TeachersPage'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage/FavoritesPage'));

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const rawToken = localStorage.getItem('token');
    const token = rawToken ? rawToken.replace(/(^"|"$)/g, '') : null;

    if (token) {
      // Якщо токен є в localStorage, встановлюємо його та завантажуємо поточного користувача
      dispatch(fetchCurrentUser());
    }
  }, [dispatch]);

  return (
    <>
      <Layout>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/teachers" element={<TeachersPage />} />
            <Route path="/favorites" element={
             <PrivateRoute>
                  <FavoritesPage />
              </PrivateRoute> 
          
            } />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          </Suspense>
      </Layout>  
    </>
  )
}

export default App
