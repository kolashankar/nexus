/**
 * Main App component
 */
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import useStore from './store';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import Landing from './pages/Landing/Landing';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard';

const ProtectedRoute: React.FC = ({ children }) => {
  const { isAuthenticated } = useStore();
  
  if (!isAuthenticated) {
    return ;
  }
  
  return {children};
};

function App() {
  return (
    
      
        
        
          
            } />
            } />
            } />
            
                  
                
              }
            />
            } />
          
        
        
      
    
  );
}

export default App;
