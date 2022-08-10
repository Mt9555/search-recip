import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './Application';

const root = ReactDOM.createRoot(
  // eslint-disable-next-line no-undef
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
