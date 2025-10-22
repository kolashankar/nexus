import React from 'react';
import TraitBar from './TraitBar';

interface TraitItemProps {
  name: string;
  value: number;
  category: 'virtue' | 'vice' | 'skill' | 'meta';
}

const TraitItem: React.FC<TraitItemProps> = ({ name, value, category }) => {
  // Format trait name for display
  const formatName = (str: string) => {
    return str
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Get color based on category
  const getCategoryColor = () => {
    switch (category) {
      case 'virtue':
        return 'text-green-600';
      case 'vice':
        return 'text-red-600';
      case 'skill':
        return 'text-blue-600';
      case 'meta':
        return 'text-purple-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border hover:shadow-md transition-shadow">
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <span className={`font-medium ${getCategoryColor()}`}>
            {formatName(name)}
          </span>
          <span className="text-sm font-bold text-gray-700">
            {Math.round(value)}
          </span>
        </div>
        <TraitBar value={value} category={category} />
      </div>
    </div>
  );
};

export default TraitItem;