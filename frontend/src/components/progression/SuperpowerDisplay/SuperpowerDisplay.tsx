import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Zap, Lock, Clock, Star, Info } from 'lucide-react';

interface Superpower {
  id: string;
  name: string;
  description: string;
  tier: number;
  unlocked: boolean;
  cooldown: number;
  currentCooldown: number;
  usageCount: number;
  effects: Record<string, any>;
  unlock_conditions: Record<string, number>;
}

interface SuperpowerDisplayProps {
  superpowers: Superpower[];
  onActivate: (powerId: string) => void;
  onViewDetails: (powerId: string) => void;
}

export const SuperpowerDisplay: React.FC<SuperpowerDisplayProps> = ({
  superpowers,
  onActivate,
  onViewDetails
}) => {
  const [selectedTier, setSelectedTier] = useState<number>(1);

  const getTierColor = (tier: number) => {
    const colors = {
      1: 'bg-gray-500',
      2: 'bg-green-500',
      3: 'bg-blue-500',
      4: 'bg-purple-500',
      5: 'bg-yellow-500'
    };
    return colors[tier as keyof typeof colors] || 'bg-gray-500';
  };

  const getTierName = (tier: number) => {
    const names = {
      1: 'Basic',
      2: 'Intermediate',
      3: 'Advanced',
      4: 'Master',
      5: 'Legendary'
    };
    return names[tier as keyof typeof names] || 'Unknown';
  };

  const filteredPowers = superpowers.filter(p => p.tier === selectedTier);
  const unlockedCount = superpowers.filter(p => p.unlocked).length;

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Unlocked Powers</p>
                <p className="text-3xl font-bold">{unlockedCount} / {superpowers.length}</p>
              </div>
              <Zap className="w-10 h-10 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-gray-600 mb-2">Completion</p>
              <Progress value={(unlockedCount / superpowers.length) * 100} />
              <p className="text-xs text-gray-500 mt-1">
                {((unlockedCount / superpowers.length) * 100).toFixed(1)}%
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-gray-600">Highest Tier</p>
              <p className="text-3xl font-bold">
                {Math.max(...superpowers.filter(p => p.unlocked).map(p => p.tier), 0)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tier Tabs */}
      <Tabs value={selectedTier.toString()} onValueChange={(v) => setSelectedTier(Number(v))}>
        <TabsList className="grid w-full grid-cols-5">
          {[1, 2, 3, 4, 5].map((tier) => (
            <TabsTrigger key={tier} value={tier.toString()}>
              <Star className={`w-4 h-4 mr-1 ${superpowers.some(p => p.tier === tier && p.unlocked) ? 'text-yellow-500' : ''}`} />
              Tier {tier}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Powers Grid */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredPowers.map((power) => (
            <Card
              key={power.id}
              className={`transition-all ${
                power.unlocked
                  ? 'border-2 hover:shadow-lg'
                  : 'opacity-60'
              }`}
              style={{
                borderColor: power.unlocked ? getTierColor(power.tier).replace('bg-', '#') : undefined
              }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      {power.unlocked ? (
                        <Zap className={`w-5 h-5 ${getTierColor(power.tier).replace('bg-', 'text-')}`} />
                      ) : (
                        <Lock className="w-5 h-5 text-gray-400" />
                      )}
                      {power.name}
                    </CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{power.description}</p>
                  </div>
                  <Badge className={getTierColor(power.tier)}>
                    {getTierName(power.tier)}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                {power.unlocked ? (
                  <div className="space-y-4">
                    {/* Cooldown */}
                    {power.currentCooldown > 0 ? (
                      <div>
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            On Cooldown
                          </span>
                          <span className="font-semibold">{power.currentCooldown}s</span>
                        </div>
                        <Progress value={((power.cooldown - power.currentCooldown) / power.cooldown) * 100} />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-sm text-green-600">
                        <Zap className="w-4 h-4" />
                        <span className="font-semibold">Ready to Use</span>
                      </div>
                    )}

                    {/* Usage Stats */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Times Used</span>
                      <span className="font-semibold">{power.usageCount}</span>
                    </div>

                    {/* Effects Preview */}
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Effects:</p>
                      <div className="flex flex-wrap gap-1">
                        {Object.entries(power.effects).slice(0, 3).map(([key, value]) => (
                          <Badge key={key} variant="outline" className="text-xs">
                            {key}: {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button
                        className="flex-1"
                        disabled={power.currentCooldown > 0}
                        onClick={() => onActivate(power.id)}
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        Activate
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onViewDetails(power.id)}
                      >
                        <Info className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {/* Unlock Requirements */}
                    <div>
                      <p className="text-sm font-semibold mb-2">Unlock Requirements:</p>
                      <div className="space-y-1">
                        {Object.entries(power.unlock_conditions).map(([trait, value]) => (
                          <div key={trait} className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">{trait.replace(/_/g, ' ')}</span>
                            <span className="font-semibold">{value}%</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => onViewDetails(power.id)}
                    >
                      <Info className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </Tabs>
    </div>
  );
};
