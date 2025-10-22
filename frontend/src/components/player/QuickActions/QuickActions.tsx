/**
 * Quick Actions Component - Fast access to common actions.
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import {
  Zap,
  Shield,
  DollarSign,
  Heart,
  Users,
  Swords,
  TrendingUp
} from 'lucide-react';
import { useActions } from '../../../hooks/useActions';
import { toast } from 'sonner';
import './QuickActions.css';

interface QuickAction {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  cooldown?: boolean;
}

const QUICK_ACTIONS: QuickAction[] = [
  {
    id: 'hack',
    name: 'Hack',
    icon: <Zap className="w-4 h-4" />,
    description: 'Hack another player',
    color: '#8b5cf6'
  },
  {
    id: 'help',
    name: 'Help',
    icon: <Heart className="w-4 h-4" />,
    description: 'Help another player',
    color: '#10b981'
  },
  {
    id: 'steal',
    name: 'Steal',
    icon: <DollarSign className="w-4 h-4" />,
    description: 'Steal from another player',
    color: '#ef4444'
  },
  {
    id: 'donate',
    name: 'Donate',
    icon: <TrendingUp className="w-4 h-4" />,
    description: 'Donate to another player',
    color: '#3b82f6'
  },
  {
    id: 'trade',
    name: 'Trade',
    icon: <Users className="w-4 h-4" />,
    description: 'Trade with another player',
    color: '#f59e0b'
  },
  {
    id: 'combat',
    name: 'Combat',
    icon: <Swords className="w-4 h-4" />,
    description: 'Challenge to combat',
    color: '#dc2626'
  }
];

export const QuickActions: React.FC = () => {
  const { checkCooldown } = useActions();
  const [cooldowns, setCooldowns] = useState<Record<string, boolean>>({});

  const handleActionClick = async (actionId: string) => {
    // Check cooldown
    const cooldownStatus = await checkCooldown(actionId);
    
    if (cooldownStatus.on_cooldown) {
      toast.warning('Action on cooldown', {
        description: `Wait ${cooldownStatus.remaining_minutes?.toFixed(1)} minutes`
      });
      return;
    }

    // In real implementation, open action modal
    toast.info(`${actionId} action selected`, {
      description: 'Select a target player to continue'
    });
  };

  return (
    <Card className="quick-actions-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="quick-actions-grid">
          {QUICK_ACTIONS.map((action) => (
            <Button
              key={action.id}
              variant="outline"
              className="quick-action-btn"
              onClick={() => handleActionClick(action.id)}
              disabled={cooldowns[action.id]}
              style={{
                '--action-color': action.color
              } as React.CSSProperties}
            >
              <div className="action-icon" style={{ backgroundColor: action.color }}>
                {action.icon}
              </div>
              <div className="action-info">
                <span className="action-name">{action.name}</span>
                <span className="action-description">{action.description}</span>
              </div>
              {cooldowns[action.id] && (
                <Badge variant="secondary" className="cooldown-badge">
                  Cooldown
                </Badge>
              )}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
