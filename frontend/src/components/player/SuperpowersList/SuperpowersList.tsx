import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { SuperpowerCard } from './SuperpowerCard';
import { apiClient } from '../../../services/api/client';
import { Superpower } from '../../../types/superpowers';

export const SuperpowersList: React.FC = () => {
  const [superpowers, setSuperpowers] = useState<Superpower[]>([]);
  const [available, setAvailable] = useState<Superpower[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSuperpowers();
  }, []);

  const loadSuperpowers = async () => {
    try {
      const [unlocked, availableData] = await Promise.all([
        apiClient.get('/api/player/superpowers'),
        apiClient.get('/api/player/superpowers/available')
      ]);
      setSuperpowers(unlocked.data);
      setAvailable(availableData.data);
    } catch (error) {
      console.error('Failed to load superpowers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnlock = async (powerName: string) => {
    try {
      await apiClient.post(`/api/player/superpowers/unlock/${powerName}`);
      await loadSuperpowers();
    } catch (error) {
      console.error('Failed to unlock superpower:', error);
    }
  };

  if (loading) {
    return <div>Loading superpowers...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>⚡ Unlocked Superpowers</CardTitle>
        </CardHeader>
        <CardContent>
          {superpowers.length === 0 ? (
            <p className="text-gray-500">No superpowers unlocked yet</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {superpowers.map((power) => (
                <SuperpowerCard key={power.name} power={power} onUnlock={() => {}} unlocked />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>🔓 Available to Unlock</CardTitle>
        </CardHeader>
        <CardContent>
          {available.length === 0 ? (
            <p className="text-gray-500">No superpowers available. Improve your traits!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {available.map((power) => (
                <SuperpowerCard key={power.name} power={power} onUnlock={handleUnlock} unlocked={false} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
