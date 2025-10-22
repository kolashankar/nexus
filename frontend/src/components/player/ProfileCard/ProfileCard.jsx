import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import StatsDisplay from './StatsDisplay';
import { usePlayer } from '@/hooks/usePlayer';



const ProfileCard: React.FC = ({ showActions = true }) => {
  const { player, isLoading: loading } = usePlayer();

  if (loading || !player) {
    return (
      
        
          
            
            
            
          
        
      
    );
  }

  return (
    
      
        
          
            
              {player.username.substring(0, 2).toUpperCase()}
            
          
          
            {player.username}
            
              Level {player.level}
              
                {player.moral_class.toUpperCase()}
              
              
                {player.economic_class.toUpperCase()}
              
            
          
        
      
      
        
        
        {/* Karma Display */}
        
          
            Karma Points
            
              {player.karma_points}
            
          
        

        {/* Currencies */}
        
          
            Credits
            
              {player.currencies?.credits || 0}
            
          
          
            Karma Tokens
            
              {player.currencies?.karma_tokens || 0}
            
          
          
            Dark Matter
            
              {player.currencies?.dark_matter || 0}
            
          
        
      
    
  );
};

export default ProfileCard;