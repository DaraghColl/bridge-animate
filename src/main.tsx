import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { SelectedElementProvider } from './state/selected-element.tsx';
import { AnimationsProvider } from './state/animations.tsx';
import { CanvasProvider } from './state/canvas.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SelectedElementProvider>
      <AnimationsProvider>
        <CanvasProvider>
          <App />
        </CanvasProvider>
      </AnimationsProvider>
    </SelectedElementProvider>
  </React.StrictMode>,
);
