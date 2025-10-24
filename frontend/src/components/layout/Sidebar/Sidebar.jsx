import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../../lib/utils';

const navItems = [
  { title: "Action", href,
  { title: "Action", href,
  { title: "Action", href,
  { title: "Action", href,
  { title: "Action", href,
  { title: "Action", href,
  { title: "Action", href,
  { title: "Action", href,
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
                    'block px-4 py-2 rounded hover,
                    isActive && 'bg-purple-600'
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
