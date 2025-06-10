import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import NotFound from './errors/404'; // Create this component
import { ThemeProvider } from './styles/ThemeContext';
import './styles/globals.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
// Check current URL
if (window.location.pathname === '/coming-soon') {
  root.render(
    <React.StrictMode>
        <NotFound />
    </React.StrictMode>
  );
} else {
  root.render(
    <React.StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </React.StrictMode>
  );
}
