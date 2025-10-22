import React from 'react';
import KarmaDisplay from '../../components/karma/KarmaDisplay/KarmaDisplay';
import KarmaHistory from '../../components/karma/KarmaDisplay/KarmaHistory';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { useKarma } from '../../hooks/useKarma';

export const Karma: React.FC = () => {
  const { karmaScore, karmaHistory, loading } = useKarma();

  if (loading) {
    return Loading karma data...;
  }

  return (
    
      Karma System
      
      
        
        
        
          
            Karma Insights
          
          
            
              
                Current Score
                {karmaScore}
              
              
                Total Events
                {karmaHistory.length}
              
              
                Moral Alignment
                
                  {karmaScore > 500 ? '😇 Good' : karmaScore 
              
            
          
        
      

      
    
  );
};
