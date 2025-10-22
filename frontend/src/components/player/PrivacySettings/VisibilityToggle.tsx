import React from 'react';
import { Switch } from '../../ui/switch';

interface VisibilityToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const VisibilityToggle: React.FC<VisibilityToggleProps> = ({ label, checked, onChange }) => {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm">{label}</span>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
};
