import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '🏠' },
    { name: 'Profile', path: '/profile', icon: '👤' },
    { name: 'Actions', path: '/actions', icon: '⚡', badge: 'New' },
    { name: 'Combat', path: '/combat', icon: '⚔️', locked: true },
    { name: 'Guilds', path: '/guilds', icon: '🏰', locked: true },
    { name: 'Marketplace', path: '/marketplace', icon: '🛒', locked: true },
    { name: 'Quests', path: '/quests', icon: '📜', locked: true },
    { name: 'Leaderboards', path: '/leaderboards', icon: '🏆', locked: true },
  ];

  return (
    <aside className="sidebar w-64 bg-gray-900 border-r border-cyan-500/30 p-4 space-y-2">
      {menuItems.map((item) => (
        <Button
          key={item.path}
          variant="ghost"
          className={`w-full justify-start text-left ${
            location.pathname === item.path
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
              : 'text-gray-400 hover:text-white hover:bg-gray-800'
          } ${item.locked ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => !item.locked && navigate(item.path)}
          disabled={item.locked}
        >
          <span className="text-xl mr-3">{item.icon}</span>
          <span className="flex-1">{item.name}</span>
          {item.badge && (
            <span className="px-2 py-0.5 text-xs bg-purple-500 text-white rounded-full">
              {item.badge}
            </span>
          )}
          {item.locked && (
            <span className="text-xs">🔒</span>
          )}
        </Button>
      ))}

      {/* Phase Info */}
      <Card className="mt-6 p-4 bg-gray-800/50 border-purple-500/30">
        <p className="text-xs text-gray-400 mb-2">Phase 1: Foundation</p>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full" style={{ width: '100%' }}></div>
        </div>
        <p className="text-xs text-cyan-400 mt-2">Foundation Complete!</p>
      </Card>
    </aside>
  );
};

export default Sidebar;
