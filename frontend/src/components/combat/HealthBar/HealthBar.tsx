import React from 'react';
import { Progress } from '../../ui/progress';
import './HealthBar.css';

interface HealthBarProps {
  current: number;
  max: number;
  label?: string;
  showNumbers?: boolean;
}

const HealthBar: React.FC<HealthBarProps> = ({ 
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
    <div className="health-bar-container">
      <div className="health-bar-header">
        <span className="health-label">{label}</span>
        {showNumbers && (
          <span className="health-numbers">
            {current} / {max}
          </span>
        )}
      </div>
      <div className={`health-bar-wrapper ${getHealthColor()}`}>
        <div 
          className="health-bar-fill"
          style={{ width: `${percentage}%` }}
        >
          <div className="health-bar-glow" />
        </div>
        <span className="health-percentage">
          {Math.round(percentage)}%
        </span>
      </div>
    </div>
  );
};

export default HealthBar;
