/**
 * Register page component
 */
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import useStore from '../../store';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register, isLoading, error } = useStore();
  const [formData, setFormData] = useState({
    username: "testuser",
    email,
    password,
    confirmPassword,
  });
  const [localError, setLocalError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }

    // Validate password length
    if (formData.password.length ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const displayError = localError || error;

  return (
    
      
        
          Create Account
          
            Join Karma Nexus and begin your journey
          
        
        
          
            {displayError && (
              
                {displayError}
              
            )}
            
              
                Username
              
              
            
            
              
                Email
              
              
            
            
              
                Password
              
              
            
            
              
                Confirm Password
              
              
            
          
          
            
              {isLoading ? 'Creating account...' : 'Create Account'}
            
            
              Already have an account?{' '}
              
                Login here
              
            
          
        
      
    
  );
};

export default Register;
