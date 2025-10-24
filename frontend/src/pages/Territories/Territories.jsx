import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import guildsService from '../../services/guilds/guildsService';
import { usePlayer } from '../../hooks/usePlayer';

const Territories = () => {
  const { player } = usePlayer();
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
      console.error('Failed to load territories', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAttack = async (territoryId) => {
    if (!player?.guild_id) {
      alert('You must be in a guild to attack territories');
      return;
    }

    if (!['leader', 'officer'].includes(player?.guild_rank || '')) {
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
    return <div className="flex items-center justify-center min-h-screen">Loading territories...</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Territories</h1>

      <div className="grid gap-4">
        {territories.map((territory) => (
          <Card key={territory.territory_id} className="p-6">
            <h2 className="text-xl font-bold mb-2">{territory.name}</h2>
            <p className="text-muted-foreground mb-4">{territory.description}</p>
            <div className="flex justify-between items-center">
              <div>
                {territory.controlling_guild_id ? (
                  <span>
                    Controlled by Guild {territory.controlling_guild_id} | Income: {territory.income_per_hour}
                  </span>
                ) : (
                  <span>Unclaimed</span>
                )}
                {territory.contested && <span className="ml-2 text-red-600 font-bold">CONTESTED!</span>}
              </div>

              {territory.controlling_guild_id !== player?.guild_id && (
                <Button onClick={() => handleAttack(territory.territory_id)}>Attack</Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Territories;
