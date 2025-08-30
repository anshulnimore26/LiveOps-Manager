import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { NavBar } from './components/NavBar';
import { PeopleDashboard } from './features/dashboard';
import { ToastProvider } from './features/dashboard/components';
import Home from './Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <ToastProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/dashboard/*" 
              element={isAuthenticated ? <PeopleDashboard /> : <Navigate to="/login" />} 
            />
          </Routes>
        </div>
      </ToastProvider>
    </Router>
  );
}

export default App;
