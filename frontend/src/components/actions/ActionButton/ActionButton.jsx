import React from 'react';
import { Button } from '../../ui/button';



export const ActionButton: React.FC = ({
  icon,
  label,
  description,
  onClick,
  variant = 'default'
}) => {
  return (
    
      {icon}
      
        {label}
        {description}
      
    
  );
};
