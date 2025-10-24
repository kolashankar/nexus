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
import Combat from './pages/Combat/Combat';
import Actions from './pages/Actions/Actions';
import Guild from './pages/Guild/Guild';
import Karma from './pages/Karma/Karma';
import Prestige from './pages/Prestige/Prestige';
import Profile from './pages/Profile/Profile';
import Progression from './pages/Progression/Progression';
import Quests from './pages/Quests/QuestsDashboard';
import Seasonal from './pages/Seasonal/SeasonalDashboard';
import Skills from './pages/Skills/Skills';
import SocialHub from './pages/SocialHub/SocialHub';
import Territories from './pages/Territories/Territories';
import World from './pages/World/World';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
