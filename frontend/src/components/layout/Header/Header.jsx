import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../ui/button';
import useStore from '../../../store';

const Header = () => {
  const { isAuthenticated, logout, player } = useStore();

  const handleLogout = async () => {
    await logout();
    window.location.href = '/login';
  };

  return (
    <header className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div>
            <Link to="/" className="text-2xl font-bold text-purple-400">
              KARMA NEXUS
            </Link>
          </div>

          <nav className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="hover:text-purple-400">
                  Dashboard
                </Link>
                <Link to="/profile" className="hover:text-purple-400">
                  Profile
                </Link>
                <Link to="/play" className="hover:text-purple-400">
                  Play
                </Link>
                <div className="flex items-center space-x-2">
                  {player && (
                    <span className="text-sm text-gray-400">
                      {player.username}
                    </span>
                  )}
                  <Button onClick={handleLogout} variant="outline" size="sm">
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
