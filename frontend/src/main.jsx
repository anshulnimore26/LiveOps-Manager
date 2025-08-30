import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { PeopleProvider } from './context/PeopleContext';
import { AuthProvider } from './context/AuthContext';
import { ClientProvider } from './context/ClientContext';
import { TaskProvider } from './context/TaskContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <PeopleProvider>
        <ClientProvider>
          <TaskProvider>
            <App />
          </TaskProvider>
        </ClientProvider>
      </PeopleProvider>
    </AuthProvider>
  </React.StrictMode>,
);