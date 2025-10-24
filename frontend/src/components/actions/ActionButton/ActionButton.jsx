import React from 'react';
import { Button } from '../../ui/button';

export const ActionButton = ({ 
  icon,
  label,
  description,
  onClick,
  variant = 'default'
}) => {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      className="flex flex-col items-center justify-center p-4 h-auto space-y-2"
    >
      <div className="text-2xl">{icon}</div>
      <div className="flex flex-col items-center">
        <span className="font-semibold">{label}</span>
        {description && <span className="text-xs opacity-70">{description}</span>}
      </div>
    </Button>
  );
};
