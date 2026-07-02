import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';

// Всегда стартуем сверху (конверт), без восстановления прокрутки браузером.
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);