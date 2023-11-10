import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
import { RouterProvider } from 'react-router-dom';
import router from './router/router';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router}></RouterProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
