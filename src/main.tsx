import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ProjectAnimation } from '@features/project-animation/pages/project-animation.tsx';
import { ProjectList } from '@features/project-list/pages/project-list';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProjectAnimation />,
  },
  {
    path: '/projects',
    element: <ProjectList />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
