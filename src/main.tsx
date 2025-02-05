import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'react-tooltip/dist/react-tooltip.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ProjectAnimation } from '@features/project-animation/pages/project-animation.tsx';
import { ProjectList } from '@features/project-list/pages/project-list';
import { Home } from '@features/home/pages/home';
import { ThemeProvider } from '@shared/state/theme/theme';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProjectAnimation />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/projects',
    element: <ProjectList />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
);
