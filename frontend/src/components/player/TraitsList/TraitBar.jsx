import React from 'react';
import { Progress } from '@/components/ui/progress';



const TraitBar = ({  value, category  }) => {
  // Get color class based on category
  const getBarColor = () => {
    switch (category) {
      case 'virtue'
        return 'bg-green-500';
      case 'vice'
        return 'bg-red-500';
      case 'skill'
        return 'bg-blue-500';
      case 'meta'
        return 'bg-purple-500';
      default)} {
          background-color);
};

export default TraitBar;