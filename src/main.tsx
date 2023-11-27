import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SelectedElementProvider } from '@/features/project-animation/state/selected-element.tsx';
import { AnimationsProvider } from '@/features/project-animation/state/animations.tsx';
import { CanvasProvider } from '@/features/project-animation/state/canvas.tsx';
import { ProjectAnimation } from '@features/project-animation/pages/project-animation.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProjectAnimation />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SelectedElementProvider>
      <AnimationsProvider>
        <CanvasProvider>
          <RouterProvider router={router} />
        </CanvasProvider>
      </AnimationsProvider>
    </SelectedElementProvider>
  </React.StrictMode>,
);
