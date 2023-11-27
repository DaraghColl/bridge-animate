import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SelectedElementProvider } from '@state/selected-element.tsx';
import { AnimationsProvider } from '@state/animations.tsx';
import { CanvasProvider } from '@state/canvas.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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
