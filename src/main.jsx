import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import "modern-normalize";
import { AuthProvider } from "./context/AuthContext";
import App from './App.jsx';
import './index.css';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/stores.js';

ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
</React.StrictMode>,
)
