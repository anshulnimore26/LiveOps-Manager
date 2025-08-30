import { MapIcon } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from './Button';

export function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem('token');

  // Don't show nav on login/register pages
  const hideNav = ['/login', '/register'].includes(location.pathname);
  
  if (hideNav) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-6 bg-slate-900/50 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => navigate('/')}
        >
          <MapIcon className="w-6 h-6 text-blue-400" />
          <span className="text-xl font-bold text-white">LiveOps Manager</span>
        </div>
        <div className="flex space-x-4">
          {!isAuthenticated ? (
            <>
              <Button
                variant="outline"
                size="sm"
                className="auth-button shadow-lg shadow-purple-500/25"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
              <Button
                variant="gradient"
                size="sm"
                className="auth-button shadow-lg shadow-purple-500/25"
                onClick={() => navigate('/register')}
              >
                Register
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="auth-button border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
              onClick={() => {
                localStorage.removeItem('token');
                navigate('/login');
              }}
            >
              Logout
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
