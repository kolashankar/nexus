/**
 * Dashboard page component
 */
import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import useStore from '../../store';
import Scene from '../../components/3d/Scene/Scene';

const Dashboard: React.FC = () => {
  const { player, fetchPlayer, isLoadingPlayer } = useStore();

  useEffect(() => {
    if (!player) {
      fetchPlayer();
    }
  }, []);

  if (isLoadingPlayer) {
    return (
      
        Loading...
      
    );
  }

  return (
    
      
        Dashboard
        
        {/* Player Info */}
        {player && (
          
            
              
                Player Info
                Your character details
              
              
                
                  Username)}

        {/* 3D Scene Preview */}
        
          
            3D World Preview
            Your character in Karma Nexus
          
          
            
              
            
          
        
      
    
  );
};

export default Dashboard;
