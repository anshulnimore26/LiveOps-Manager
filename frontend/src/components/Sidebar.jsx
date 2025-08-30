import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Users, Building, ClipboardList, BarChart2, FileText, Settings, LifeBuoy, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const menuItems = [
  { name: 'People', icon: <Users size={20} />, path: '/dashboard/people' },
  { name: 'Client', icon: <Building size={20} />, path: '/dashboard/client' },
  { name: 'Task', icon: <ClipboardList size={20} />, path: '/dashboard/task' },
  { name: 'Reports', icon: <BarChart2 size={20} />, path: '/dashboard/reports' },
  { name: 'Reimbursement', icon: <FileText size={20} />, path: '/dashboard/reimbursement' },
  { name: 'Forms', icon: <FileText size={20} />, path: '/dashboard/forms' },
  { name: 'Manage', icon: <Settings size={20} />, path: '/dashboard/manage' },
];

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  // Hide sidebar on login/register pages
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-[#001E4D] text-white flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold">Workmate</h1>
      </div>
      <nav className="flex-1 px-4">
        <ul>
          {menuItems.map((item) => (
            <li key={item.name} className="mb-2">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg transition-colors ${
                    isActive ? 'bg-blue-900' : 'hover:bg-blue-800'
                  } ${!['People', 'Client'].includes(item.name) ? 'opacity-50 cursor-not-allowed' : ''}`
                }
                onClick={(e) => !['People', 'Client'].includes(item.name) && e.preventDefault()}
              >
                {item.icon}
                <span className="ml-4">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-blue-900">
        <div className="mb-4">
          <NavLink to="/help" className="flex items-center p-3 rounded-lg hover:bg-blue-800">
            <LifeBuoy size={20} />
            <span className="ml-4">Help & Support</span>
          </NavLink>
        </div>
        {user && (
          <div className="flex items-center p-3">
            <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
            <div className="ml-3">
              <p className="font-semibold">{user.name}</p>
              <button onClick={logout} className="text-sm text-red-400 hover:underline">
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
