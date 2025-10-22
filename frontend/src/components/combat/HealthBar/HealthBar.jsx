import React from 'react';
import { Progress } from '../../ui/progress';
import './HealthBar.css';



const HealthBar = ({  
  current, 
  max, 
  label = 'HP',
  showNumbers = true 
 }) => {
  const percentage = (current / max) * 100;
  
  const getHealthColor = () => {
    if (percentage > 60) return 'health-high';
    if (percentage > 30) return 'health-medium';
    return 'health-low';
  };

  return (
    
      
        {label}
        {showNumbers && (
          
            {current} / {max}
          
        )}
      
      
        
          
        
        
          {Math.round(percentage)}%
        
      
    
  );
};

export default HealthBar;
