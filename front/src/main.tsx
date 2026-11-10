import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import Session from './Session.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Session>
      <App />
    </Session>
  </StrictMode>,
);
