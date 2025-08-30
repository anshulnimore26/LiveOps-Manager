import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { PeopleProvider } from './context/PeopleContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { ClientProvider } from './context/ClientContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PeopleProvider>
      <AuthProvider>
        <ClientProvider>
          <App />
        </ClientProvider>
      </AuthProvider>
    </PeopleProvider>
  </React.StrictMode>,
);