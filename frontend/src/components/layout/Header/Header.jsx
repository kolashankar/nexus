import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '../../../hooks/useAuth';
import { useGameStore } from '../../../store';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { wsConnected, onlinePlayers } = useGameStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header bg-gray-900 border-b border-cyan-500/30 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo/Title */}
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            KARMA NEXUS
          </h1>
          
          {/* Connection Status */}
          <div className="flex items-center space-x-2 text-sm">
            <div className={`w-2 h-2 rounded-full ${
              wsConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'
            }`}></div>
            <span className="text-gray-400">
              {wsConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>

        {/* Center - Online Count */}
        <div className="text-sm text-gray-400">
          <span className="text-cyan-400 font-semibold">{onlinePlayers.length}</span>
          {' '}players online
        </div>

        {/* Right - User Menu */}
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-white font-medium">{user?.username}</p>
            <p className="text-xs text-gray-400">Level {user?.level || 1}</p>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            className="border-red-500/50 text-red-400 hover:bg-red-500/20"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
