import React, { useState, useEffect } from 'react';
import AuthScreen from './components/AuthScreen';
import Dashboard from './components/Dashboard';

export default function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [view, setView] = useState('login'); // login, register, dashboard

  // Check for persisted session
  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token');
    const storedUser = localStorage.getItem('auth_user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      setView('dashboard');
    }
  }, []);

  const handleLogin = (userData, token) => {
    setUser(userData);
    setToken(token);
    localStorage.setItem('auth_token', token);
    localStorage.setItem('auth_user', JSON.stringify(userData));
    setView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    setView('login');
  };

  return (
    <div>
      {view === 'login' && <AuthScreen type="login" onAuth={handleLogin} onSwitch={() => setView('register')} />}
      {view === 'register' && <AuthScreen type="register" onAuth={handleLogin} onSwitch={() => setView('login')} />}
      {view === 'dashboard' && user && <Dashboard user={user} token={token} onLogout={handleLogout} />}
    </div>
  );
}