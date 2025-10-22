import React from 'react';
import { Card, CardContent } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Superpower } from '../../../types/superpowers';

interface SuperpowerCardProps {
  power: Superpower;
  unlocked: boolean;
  onUnlock: (powerName: string) => void;
}

export const SuperpowerCard: React.FC<SuperpowerCardProps> = ({ power, unlocked, onUnlock }) => {
  const tierColors: Record<number, string> = {
    1: 'bg-gray-500',
    2: 'bg-green-500',
    3: 'bg-blue-500',
    4: 'bg-purple-500',
    5: 'bg-yellow-500'
  };

  return (
    <Card className={unlocked ? 'border-2 border-yellow-400' : ''}>
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <h3 className="font-bold text-lg">{power.name}</h3>
            <Badge className={tierColors[power.tier]}>Tier {power.tier}</Badge>
          </div>
          <p className="text-sm text-gray-600">{power.description}</p>
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-700">Requirements:</p>
            {Object.entries(power.requirements).map(([trait, value]) => (
              <p key={trait} className="text-xs text-gray-600">
                {trait}: {value}%
              </p>
            ))}
          </div>
          {!unlocked && (
            <Button onClick={() => onUnlock(power.name)} className="w-full" size="sm">
              Unlock
            </Button>
          )}
          {unlocked && (
            <div className="text-center">
              <Badge variant="outline">Unlocked ✅</Badge>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
