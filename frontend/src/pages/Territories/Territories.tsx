import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import guildsService from '../../services/guilds/guildsService';
import { Territory } from '../../types/guilds';
import { usePlayer } from '../../hooks/usePlayer';

const Territories: React.FC = () => {
  const { player: user } = usePlayer();
  const [territories, setTerritories] = useState<Territory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTerritories();
  }, []);

  const loadTerritories = async () => {
    try {
      const data = await guildsService.getAllTerritories();
      setTerritories(data);
    } catch (error) {
      console.error('Failed to load territories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAttack = async (territoryId: number) => {
    if (!user?.guild_id) {
      alert('You must be in a guild to attack territories');
      return;
    }

    if (!['leader', 'officer'].includes(user?.guild_rank || '')) {
      alert('Only guild leaders and officers can attack territories');
      return;
    }

    try {
      const result = await guildsService.attackTerritory(territoryId);
      alert(result.message);
      loadTerritories();
    } catch (error: any) {
      alert(error.response?.data?.detail || 'Failed to attack territory');
    }
  };

  if (loading) {
    return <div className="p-8">Loading territories...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Territories</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {territories.map((territory) => (
          <Card key={territory.territory_id} className="p-4">
            <h3 className="text-xl font-bold mb-2">{territory.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{territory.description}</p>
            
            <div className="space-y-1 text-sm">
              <p><strong>Income:</strong> {territory.passive_income} credits/day</p>
              <p><strong>Defense:</strong> Level {territory.defense_level}</p>
              {territory.controlling_guild_id ? (
                <p className="text-green-600">
                  <strong>Controlled by:</strong> {territory.controlling_guild_id}
                </p>
              ) : (
                <p className="text-gray-500">Unclaimed</p>
              )}
              {territory.contested && (
                <p className="text-red-600 font-bold">CONTESTED!</p>
              )}
            </div>

            {territory.controlling_guild_id !== user?.guild_id && (
              <Button 
                className="mt-4 w-full" 
                size="sm"
                onClick={() => handleAttack(territory.territory_id)}
              >
                Attack
              </Button>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Territories;
