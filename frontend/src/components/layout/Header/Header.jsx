/**
 * Header component
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../ui/button';
import useStore from '../../../store';

const Header: React.FC = () => {
  const { isAuthenticated, logout, player } = useStore();

  const handleLogout = async () => {
    await logout();
    window.location.href = '/login';
  };

  return (
    
      
        
          {/* Logo */}
          
            
              KARMA NEXUS
            
          

          {/* Navigation */}
          
            {isAuthenticated ? (
              
                
                  Dashboard
                
                
                  Profile
                
                
                  Play
                
                
                  {player && (
                    
                      {player.username}
                    
                  )}
                  
                    Logout
                  
                
              
            ) : (
              
                
                  Login
                
                
                  Get Started
                
              
            )}
          
        
      
    
  );
};

export default Header;
