import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';



const KarmaScore: React.FC = ({ karmaData }) => {
  if (!karmaData) return null;

  const getMoralClassColor = (moralClass) => {
    switch (moralClass) {
      case 'good':
        return 'bg-green-500';
      case 'bad':
        return 'bg-red-500';
      default;
    }
  };

  const getKarmaLevelColor = (level) => {
    const positiveLevels = ['saint', 'virtuous', 'good', 'neutral_good'];
    const negativeLevels = ['demon', 'evil', 'bad', 'neutral_bad'];
    
    if (positiveLevels.includes(level)) return 'text-green-600';
    if (negativeLevels.includes(level)) return 'text-red-600';
    return 'text-gray-600';
  };

  // Calculate progress to next milestone
  const calculateProgress = () => {
    if (!karmaData.next_milestone) return 100;
    const current = karmaData.karma_points;
    const next = karmaData.next_milestone;
    
    if (next > 0) {
      const previous = next === 100 ? 0 : next === 500 ? 100 : next === 1000 ? 500 : next === 2000 ? 1000 : 0;
      return ((current - previous) / (next - previous)) * 100;
    } else {
      const previous = next === -100 ? 0 : next === -500 ? -100 : next === -1000 ? -500 : next === -2000 ? -1000 : 0;
      return ((current - previous) / (next - previous)) * 100;
    }
  };

  return (
    
      
        
          Karma Score
          
            {karmaData.moral_class.toUpperCase()}
          
        
      
      
        {/* Karma Points */}
        
          
            {karmaData.karma_points}
          
          
            {karmaData.karma_level.replace('_', ' ').toUpperCase()}
          
        

        {/* Progress to Next Milestone */}
        {karmaData.next_milestone && (
          
            
              Next Milestone
              {karmaData.next_milestone}
            
            
          
        )}

        {/* Karma Description */}
        
          
            {karmaData.karma_points >= 2000 && 'You are a beacon of virtue in this world. Your actions inspire others.'}
            {karmaData.karma_points >= 500 && karmaData.karma_points  -500 && karmaData.karma_points  -2000 && karmaData.karma_points 
        
      
    
  );
};

export default KarmaScore;