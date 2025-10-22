/**
 * Sidebar component
 */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../../lib/utils';



const navItems: NavItem[] = [
  { title, href,
  { title, href,
  { title, href,
  { title, href,
  { title, href,
  { title, href,
  { title, href,
  { title, href,
];

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    
      
        
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              
                {item.title}
              
            );
          })}
        
      
    
  );
};

export default Sidebar;
