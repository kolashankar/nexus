import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import superpowersService from '../../../services/superpowers/superpowersService';
import type { PlayerSuperpowers, AvailablePower } from '../../../types/superpowers';
import SuperpowerCard from './SuperpowerCard';
import { toast } from '../../ui/sonner';

const SuperpowersList: React.FC = () => {
  const [superpowers, setSuperpowers] = useState<PlayerSuperpowers | null>(null);
  const [availablePowers, setAvailablePowers] = useState<AvailablePower[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSuperpowers();
    fetchAvailablePowers();
  }, []);

  const fetchSuperpowers = async () => {
    try {
      const data = await superpowersService.getSuperpowers();
      setSuperpowers(data);
    } catch (error) {
      console.error('Failed to fetch superpowers:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailablePowers = async () => {
    try {
      const data = await superpowersService.getAvailablePowers();
      setAvailablePowers(data);
    } catch (error) {
      console.error('Failed to fetch available powers:', error);
    }
  };

  const handleUnlockPower = async (powerId: string) => {
    try {
      await superpowersService.unlockPower(powerId);
      toast.success('Superpower unlocked!');
      fetchSuperpowers();
      fetchAvailablePowers();
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Failed to unlock power');
    }
  };

  const handleEquipPower = async (powerId: string) => {
    try {
      await superpowersService.equipPower(powerId);
      toast.success('Power equipped!');
      fetchSuperpowers();
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Failed to equip power');
    }
  };

  const handleUsePower = async (powerId: string) => {
    try {
      const result = await superpowersService.usePower(powerId);
      toast.success(result.message);
      fetchSuperpowers();
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Failed to use power');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading superpowers...</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-3xl">Superpowers</CardTitle>
            {superpowers && (
              <div className="flex gap-2">
                <Badge variant="secondary">
                  Unlocked: {superpowers.total_powers_unlocked}/25
                </Badge>
                <Badge variant="outline">
                  Equipped: {superpowers.equipped_powers.length}/5
                </Badge>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="unlocked" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="unlocked">Unlocked Powers</TabsTrigger>
              <TabsTrigger value="available">Available Powers</TabsTrigger>
            </TabsList>

            <TabsContent value="unlocked" className="mt-6">
              {superpowers && superpowers.unlocked_powers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {superpowers.unlocked_powers.map((power) => (
                    <SuperpowerCard
                      key={power.power_id}
                      power={power}
                      isEquipped={superpowers.equipped_powers.includes(power.power_id)}
                      onEquip={() => handleEquipPower(power.power_id)}
                      onUse={() => handleUsePower(power.power_id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  No superpowers unlocked yet. Meet requirements to unlock powers!
                </div>
              )}
            </TabsContent>

            <TabsContent value="available" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {availablePowers.map((power) => (
                  <Card
                    key={power.power_id}
                    className={power.eligible ? 'border-green-500' : 'opacity-60'}
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{power.name}</span>
                        <Badge variant={power.eligible ? 'default' : 'secondary'}>
                          {power.tier.replace('tier_', 'T')}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{power.description}</p>
                      
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold">Requirements:</h4>
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(power.requirements).map(([trait, value]) => (
                            <Badge key={trait} variant="outline" className="text-xs">
                              {trait}: {value}%
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {power.eligible && (
                        <Button
                          className="w-full mt-4"
                          onClick={() => handleUnlockPower(power.power_id)}
                        >
                          Unlock Power
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuperpowersList;
