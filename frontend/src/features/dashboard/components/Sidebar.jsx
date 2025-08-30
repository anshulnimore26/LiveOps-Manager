import { motion } from 'framer-motion';
import { Activity, Briefcase, CheckSquare, ClipboardList, DollarSign, FileText, HelpCircle, Settings, Users } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { id: 'people', name: 'People', icon: Users, path: '/dashboard/people' },
  { id: 'client', name: 'Client', icon: Briefcase, path: '/dashboard/client' },
  { id: 'task', name: 'Task', icon: CheckSquare, path: '/dashboard/task' },
  { id: 'reports', name: 'Reports', icon: FileText, path: '/dashboard/reports', hasArrow: true },
  { id: 'reimbursement', name: 'Reimbursement', icon: DollarSign, path: '/dashboard/reimbursement', hasArrow: true },
  { id: 'forms', name: 'Forms', icon: ClipboardList, path: '/dashboard/forms' },
  { id: 'manage', name: 'Manage', icon: Settings, path: '/dashboard/manage', hasArrow: true },
  { id: 'help', name: 'Help & Support', icon: HelpCircle, path: '/dashboard/help', hasArrow: true },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <motion.div 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-64 bg-gradient-to-b from-blue-600 to-blue-700 text-white p-6 shadow-xl h-screen fixed"
    >
      <div className="flex items-center gap-2 mb-8">
        <Activity className="w-6 h-6" />
        <span className="text-xl font-bold tracking-wide">Workmate</span>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map(item => (
          <Link 
            key={item.id}
            to={item.path}
            className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-colors ${
              location.pathname.includes(item.id)
                ? 'bg-white/10 text-white'
                : 'text-white/70 hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </div>
            {item.hasArrow && (
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 18l6-6-6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </Link>
        ))}
      </nav>
    </motion.div>
  );
}
