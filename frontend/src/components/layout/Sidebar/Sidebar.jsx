import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../../lib/utils';

const navItems = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Profile', href: '/profile' },
  { title: 'Actions', href: '/actions' },
  { title: 'Combat', href: '/combat' },
  { title: 'Quests', href: '/quests' },
  { title: 'Skills', href: '/skills' },
  { title: 'Guild', href: '/guild' },
  { title: 'Leaderboard', href: '/leaderboard' }
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.href}>
                <Link 
                  to={item.href}
                  className={cn(
                    "block px-4 py-2 rounded hover:bg-gray-800",
                    isActive && "bg-purple-600"
                  )}
                >
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
