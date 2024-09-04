import { Route, Routes, Navigate } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import { lazy } from 'react';

import Layout from './components/Layout/Layout';
import Loader from './shared/components/Loader/Loader';
import { useDispatch } from 'react-redux';
import { fetchCurrentUser } from "./redux/auth/operations";

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const TeachersPage = lazy(() => import('./pages/TeachersPage/TeachersPage'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage/FavoritesPage'));

function App() {

  const dispatch = useDispatch();

    useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <>
      <Layout>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/teachers" element={<TeachersPage />} />
            <Route path="/favorites" element={           
              <FavoritesPage />
            } />
            <Route path="*" element={<Navigate to="/" />} />

          </Routes>
          

        </Suspense>
      </Layout>
      

    </>
  )
}

export default App
