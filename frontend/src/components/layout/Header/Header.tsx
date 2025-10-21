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
    <header className="bg-slate-900 border-b border-purple-500/30 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              KARMA NEXUS
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-gray-300 hover:text-white transition">
                  Dashboard
                </Link>
                <Link to="/profile" className="text-gray-300 hover:text-white transition">
                  Profile
                </Link>
                <Link to="/game" className="text-gray-300 hover:text-white transition">
                  Play
                </Link>
                <div className="flex items-center space-x-4">
                  {player && (
                    <span className="text-sm text-gray-400">
                      {player.username}
                    </span>
                  )}
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/register">
                  <Button>Get Started</Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
