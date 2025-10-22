import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import guildsService from '../../services/guilds/guildsService';
import { Territory } from '../../types/guilds';
import { usePlayer } from '../../hooks/usePlayer';

const Territories: React.FC = () => {
  const { player: user } = usePlayer();
  const [territories, setTerritories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTerritories();
  }, []);

  const loadTerritories = async () => {
    try {
      const data = await guildsService.getAllTerritories();
      setTerritories(data);
    } catch (error) {
      console.error('Failed to load territories, error);
    } finally {
      setLoading(false);
    }
  };

  const handleAttack = async (territoryId) => {
    if (!user?.guild_id) {
      alert('You must be in a guild to attack territories');
      return;
    }

    if (['leader', 'officer'].includes(user?.guild_rank || '')) {
      alert('Only guild leaders and officers can attack territories');
      return;
    }

    try {
      const result = await guildsService.attackTerritory(territoryId);
      alert(result.message);
      loadTerritories();
    } catch (error) {
      alert(error.response?.data?.detail || 'Failed to attack territory');
    }
  };

  if (loading) {
    return Loading territories...;
  }

  return (
    
      Territories

      
        {territories.map((territory) => (
          
            {territory.name}
            {territory.description}
            
            
              Income) : (
                Unclaimed
              )}
              {territory.contested && (
                CONTESTED!
              )}
            

            {territory.controlling_guild_id !== user?.guild_id && (
               handleAttack(territory.territory_id)}
              >
                Attack
              
            )}
          
        ))}
      
    
  );
};

export default Territories;
