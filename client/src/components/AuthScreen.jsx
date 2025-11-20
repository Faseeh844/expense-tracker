import React, { useState } from 'react';
import { Wallet } from 'lucide-react';
import { api, USE_MOCK_BACKEND } from '../api';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Alert from '../ui/Alert';

export default function AuthScreen({ type, onAuth, onSwitch }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = type === 'login' 
        ? await api.login(formData.email, formData.password)
        : await api.register(formData.name, formData.email, formData.password);
      onAuth(res.user, res.token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon-wrapper">
            <Wallet className="auth-icon" />
          </div>
          <h1 className="auth-title">
            {type === 'login' ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="auth-subtitle">
            {type === 'login' ? 'Enter your credentials to access your dashboard' : 'Start tracking your expenses today'}
          </p>
        </div>

        {error && <Alert>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          {type === 'register' && (
            <Input 
              label="Full Name" 
              value={formData.name} 
              onChange={e => setFormData({...formData, name: e.target.value})} 
              required 
            />
          )}
          <Input 
            label="Email Address" 
            type="email" 
            value={formData.email} 
            onChange={e => setFormData({...formData, email: e.target.value})} 
            required 
          />
          <Input 
            label="Password" 
            type="password" 
            value={formData.password} 
            onChange={e => setFormData({...formData, password: e.target.value})} 
            required 
          />
          
          <Button className="auth-submit-button" isLoading={loading}>
            {type === 'login' ? 'Sign In' : 'Sign Up'}
          </Button>
        </form>

        <div className="auth-switch">
          {type === 'login' ? "Don't have an account? " : "Already have an account? "}
          <button onClick={onSwitch} className="auth-switch-button">
            {type === 'login' ? 'Sign up' : 'Log in'}
          </button>
        </div>
        
        {USE_MOCK_BACKEND && type === 'login' && (
          <div className="demo-credentials">
            <strong>Demo Credentials:</strong><br/>
            Email: intern@example.com<br/>
            Pass: password123
          </div>
        )}
      </div>
    </div>
  );
}