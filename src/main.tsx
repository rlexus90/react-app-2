import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import ErrorBoundary from './component/ErrorBoundary/ErrorBoundary';
import { RouterProvider } from 'react-router-dom';
import router from './controller/router/router';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router}></RouterProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
