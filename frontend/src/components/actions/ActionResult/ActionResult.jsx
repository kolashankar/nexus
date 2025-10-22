import React from 'react';
import { Card, CardContent } from '../../ui/card';
import { Badge } from '../../ui/badge';



export const ActionResult = ({ 
  success,
  message,
  karmaChange,
  creditsChange
 }) => {
  return (
    
      
        
          {success ? '✅' : '❌'}
          {message}
          
            {karmaChange !== undefined && (
               0 ? 'default' : 'destructive'}>
                {karmaChange > 0 ? '+' : ''}{karmaChange} Karma
              
            )}
            {creditsChange !== undefined && (
              
                {creditsChange > 0 ? '+' : ''}{creditsChange} Credits
              
            )}
          
        
      
    
  );
};
