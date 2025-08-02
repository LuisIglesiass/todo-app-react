import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { TodoStatsProvider } from './context/TodoStatsProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TodoStatsProvider>
      <App />
    </TodoStatsProvider>
  </React.StrictMode>,
);
