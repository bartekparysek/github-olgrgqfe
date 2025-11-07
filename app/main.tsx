import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import { createRoot } from 'react-dom/client';

import './app.css';
import { GlobalErrorBoundary } from './GlobalErrorBoundry';
import { Home } from './routes/Home';
import { authMiddleware } from './authMiddleware';
import { Login } from './routes/Login';
import { StrictMode } from 'react';
import { Layout } from './Layout';

const router = createBrowserRouter([
  {
    ErrorBoundary: GlobalErrorBoundary,
    middleware: [authMiddleware],
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home,
        loader: Home.loader,
        action: Home.action,
      },
      {
        path: '/login',
        Component: Login,
        action: Login.action,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
