import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { NavBar } from './components/NavBar';
import { ToastProvider } from './features/dashboard/components';
import PeopleDashboard from './features/people/pages/PeopleDashboard';
import PersonDetails from './features/people/pages/PersonDetails';
import AddPeople from './features/people/pages/AddPeople';
import Home from './Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Client from './pages/Client';
import AddClient from './pages/AddClient';
import Sidebar from './components/layout/Sidebar';
import TaskDashboard from './features/task/pages/TaskDashboard';
import AddTask from './features/task/pages/AddTask';
import UploadTask from './features/task/pages/UploadTask';
import ManualClose from './features/task/pages/ManualClose';

function App() {
  return (
    <Router>
      <ToastProvider>
        <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
          <Sidebar />
          <main className="flex-1 ml-64">
            <NavBar />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              <Route path="/dashboard/people" element={<PeopleDashboard />} />
              <Route path="/dashboard/client" element={<Client />} />
              <Route path="/dashboard/task" element={<TaskDashboard />} />
              
              <Route path="/add-people" element={<AddPeople />} />
              <Route path="/add-client" element={<AddClient />} />
              <Route path="/person/:personId" element={<PersonDetails />} />

              <Route path="/dashboard/task/add" element={<AddTask />} />
              <Route path="/dashboard/task/upload" element={<UploadTask />} />
              <Route path="/dashboard/task/manual-close" element={<ManualClose />} />
              
              <Route path="/" element={<Navigate to="/dashboard/people" />} />
              <Route path="*" element={<Navigate to="/dashboard/people" />} />
            </Routes>
          </main>
        </div>
      </ToastProvider>
    </Router>
  );
}

export default App;
