import React from 'react';
import { Progress } from '@/components/ui/progress';

interface TraitBarProps {
  value: number;
  category: 'virtue' | 'vice' | 'skill' | 'meta';
}

const TraitBar: React.FC<TraitBarProps> = ({ value, category }) => {
  // Get color class based on category
  const getBarColor = () => {
    switch (category) {
      case 'virtue':
        return 'bg-green-500';
      case 'vice':
        return 'bg-red-500';
      case 'skill':
        return 'bg-blue-500';
      case 'meta':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="relative">
      <Progress value={value} className="h-2" />
      <style>{`
        .${getBarColor()} {
          background-color: currentColor;
        }
      `}</style>
    </div>
  );
};

export default TraitBar;