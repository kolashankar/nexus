/**
 * Login page component
 */
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import useStore from '../../store';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading, error } = useStore();
  const [formData, setFormData] = useState({
    username,
    password,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      navigate('/dashboard');
    } catch (err) {
      // Error is handled by the store
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    
      
        
          Login
          
            Enter your credentials to access your account
          
        
        
          
            {error && (
              
                {error}
              
            )}
            
              
                Username
              
              
            
            
              
                Password
              
              
            
          
          
            
              {isLoading ? 'Logging in...' : 'Login'}
            
            
              Don't have an account?{' '}
              
                Register here
              
            
          
        
      
    
  );
};

export default Login;
