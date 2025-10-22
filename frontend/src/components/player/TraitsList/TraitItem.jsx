import React from 'react';
import TraitBar from './TraitBar';



const TraitItem: React.FC = ({ name, value, category }) => {
  // Format trait name for display
  const formatName = (str) => {
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
      default)}
          
          
            {Math.round(value)}
          
        
        
      
    
  );
};

export default TraitItem;