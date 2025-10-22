import React from 'react';
import { useParams } from 'react-router-dom';
import ProfileCard from '@/components/player/ProfileCard/ProfileCard';
import TraitsList from '@/components/player/TraitsList/TraitsList';
import { usePlayer } from '@/hooks/usePlayer';

const Profile: React.FC = () => {
  const { playerId } = useParams();
  const { player, isLoading: loading } = usePlayer();

  if (loading) {
    return (
      
        
          
          
        
      
    );
  }

  if (!player) {
    return (
      
        
          Player not found
        
      
    );
  }

  return (
    
      
        {/* Header */}
        
          
            {playerId ? 'Player Profile' : 'My Profile'}
          
          
            View and manage your character information
          
        

        {/* Profile Card */}
        
          
            
          

          {/* Traits List */}
          
            
          
        
      
    
  );
};

export default Profile;