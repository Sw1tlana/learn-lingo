import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Suspense } from 'react';
import { lazy } from 'react';

import Layout from './components/Layout/Layout';
import Loader from './shared/components/Loader/Loader';

const Home = lazy(() => import('./pages/Home/Home'));
const Teachers = lazy(() => import('./pages/Teachers/Teachers'));
const Favorites = lazy(() => import('./pages/Favorites/Favorites'));

function App() {

  return (
    <>
      <Layout>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/favorites" element={           
              <Favorites />
            } />
            <Route path="*" element={<Navigate to="/" />} />

          </Routes>
          

        </Suspense>
      </Layout>
      

    </>
  )
}

export default App
