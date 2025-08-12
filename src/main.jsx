import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ContextProvider } from './context/Context';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <ContextProvider>
      <App />
    </ContextProvider>
  </Router>
);
