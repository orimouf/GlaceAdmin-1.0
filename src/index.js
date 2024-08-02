import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { DarkModeContextProvider } from './context/darkModeContext';
import { AuthContextProvider } from './context/authContext/AuthContext';
import { SnackbarProvider } from 'notistack';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <DarkModeContextProvider>
      <AuthContextProvider>
        <SnackbarProvider maxSnack={5}>
          <App />
        </SnackbarProvider>
      </AuthContextProvider>
    </DarkModeContextProvider>
  </BrowserRouter>
);