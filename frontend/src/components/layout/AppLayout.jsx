import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

const AppLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 w-full h-14 bg-gray-800 text-white flex items-center justify-between px-6 z-50">
        <div className="text-xl font-bold">
          <Link to="/">LiveOps Manager</Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/login" className="px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-700 text-sm font-medium">
            Login
          </Link>
          <Link to="/register" className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-sm font-medium">
            Register
          </Link>
        </div>
      </header>

      <div className="flex pt-14">
        {/* Sidebar */}
        <aside className="fixed left-0 top-14 w-60 h-full bg-blue-900 text-white z-40">
          <div className="px-4 py-6">
            <Sidebar />
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="ml-60 flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
