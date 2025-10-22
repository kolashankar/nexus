import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { Zap, Clock } from 'lucide-react';
import type { UnlockedSuperpower } from '../../../types/superpowers';

interface SuperpowerCardProps {
  power: UnlockedSuperpower;
  isEquipped: boolean;
  onEquip: () => void;
  onUse: () => void;
}

const SuperpowerCard: React.FC<SuperpowerCardProps> = ({
  power,
  isEquipped,
  onEquip,
  onUse,
}) => {
  const isOnCooldown = power.cooldown_until
    ? new Date(power.cooldown_until) > new Date()
    : false;

  return (
    <Card className={isEquipped ? 'border-2 border-primary' : ''}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-lg">
          <span>{power.power_id.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</span>
          {isEquipped && <Badge>Equipped</Badge>}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Level {power.level}</span>
          <span className="text-muted-foreground">Uses: {power.usage_count}</span>
        </div>

        <div>
          <div className="flex items-center justify-between text-sm mb-1">
            <span>Mastery</span>
            <span>{power.mastery.toFixed(1)}%</span>
          </div>
          <Progress value={power.mastery} className="h-2" />
        </div>

        {isOnCooldown && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>On cooldown</span>
          </div>
        )}

        <div className="flex gap-2">
          {!isEquipped && (
            <Button variant="outline" size="sm" className="flex-1" onClick={onEquip}>
              Equip
            </Button>
          )}
          {isEquipped && (
            <Button
              size="sm"
              className="flex-1"
              onClick={onUse}
              disabled={isOnCooldown}
            >
              <Zap className="h-4 w-4 mr-1" />
              Use Power
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SuperpowerCard;
