import React from 'react';
import ReactDOM from 'react-dom/client';
import './globalstyle.ts';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyle from './globalstyle';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <GlobalStyle></GlobalStyle>
    <App />
  </React.StrictMode>
);


reportWebVitals();
