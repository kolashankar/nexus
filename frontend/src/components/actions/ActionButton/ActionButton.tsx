import React from 'react';
import { Button } from '../../ui/button';

interface ActionButtonProps {
  icon: string;
  label: string;
  description: string;
  onClick: () => void;
  variant?: 'default' | 'destructive' | 'outline';
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  label,
  description,
  onClick,
  variant = 'default'
}) => {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      className="h-auto py-4 px-6 flex flex-col items-center gap-2 w-full"
    >
      <span className="text-3xl">{icon}</span>
      <div className="text-center">
        <p className="font-bold">{label}</p>
        <p className="text-xs opacity-80">{description}</p>
      </div>
    </Button>
  );
};
