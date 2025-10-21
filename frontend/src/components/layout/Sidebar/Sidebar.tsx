/**
 * Sidebar component
 */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../../lib/utils';

interface NavItem {
  title: string;
  href: string;
  icon?: string;
}

const navItems: NavItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Profile', href: '/profile' },
  { title: 'Game World', href: '/game' },
  { title: 'Combat', href: '/combat' },
  { title: 'Guilds', href: '/guilds' },
  { title: 'Marketplace', href: '/marketplace' },
  { title: 'Quests', href: '/quests' },
  { title: 'Leaderboards', href: '/leaderboards' },
];

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-slate-900 border-r border-purple-500/30 min-h-screen">
      <div className="p-6">
        <nav className="space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'block px-4 py-2 rounded-lg transition',
                  isActive
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-300 hover:bg-slate-800 hover:text-white'
                )}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
