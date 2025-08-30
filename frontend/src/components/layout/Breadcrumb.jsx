import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Breadcrumb = () => {
  const location = useLocation();
  // Ignore the first empty string from split('/')
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Find the index of 'dashboard' to start breadcrumbs from there
  const dashboardIndex = pathnames.indexOf('dashboard');
  
  // If 'dashboard' is not in the path, don't render breadcrumbs
  if (dashboardIndex === -1) {
    return null;
  }

  // Get the path segments after 'dashboard'
  const relevantPathnames = pathnames.slice(dashboardIndex + 1);

  const capitalize = (s) => {
    if (!s) return "";
    return s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, ' ');
  }

  return (
    <nav className="flex items-center text-lg font-medium text-gray-500 dark:text-gray-400 mb-6">
      <Link to="/dashboard/people" className="hover:text-gray-700 dark:hover:text-gray-200">Home</Link>
      {relevantPathnames.map((name, index) => {
        const routeTo = `/dashboard/${relevantPathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === relevantPathnames.length - 1;
        
        return (
          <React.Fragment key={name}>
            <ChevronRight className="w-5 h-5 mx-1" />
            {isLast ? (
              <span className="font-semibold text-gray-800 dark:text-gray-100">{capitalize(name)}</span>
            ) : (
              <Link to={routeTo} className="hover:text-gray-700 dark:hover:text-gray-200">
                {capitalize(name)}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
