import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { SelectedElementProvider } from './state/selected-element.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SelectedElementProvider>
      <App />
    </SelectedElementProvider>
  </React.StrictMode>,
);
