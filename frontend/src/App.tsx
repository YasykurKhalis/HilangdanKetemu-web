import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard'; // <-- Import
import AddReport from './pages/AddReport'; // <-- Import
import type { JSX } from 'react';

// Component kecil untuk proteksi route (kalau belum login, tendang ke login)
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Halaman yang butuh Login */}
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        
        <Route path="/add" element={
          <PrivateRoute>
            <AddReport />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;