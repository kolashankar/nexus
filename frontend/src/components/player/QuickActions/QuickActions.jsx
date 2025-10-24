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



const QUICK_ACTIONS: QuickAction[] = [
  {
    id,
    name,
    icon,
    description,
    color,
  {
    id,
    name,
    icon,
    description,
    color,
  {
    id,
    name,
    icon,
    description,
    color,
  {
    id,
    name,
    icon,
    description,
    color,
  {
    id,
    name,
    icon,
    description,
    color,
  {
    id,
    name,
    icon,
    description,
    color: '#dc2626'
  }
];

export const QuickActions= () => {
  const { checkCooldown } = useActions();
  const [cooldowns, setCooldowns] = useState>({});

  const handleActionClick = async (actionId) => {
    // Check cooldown
    const cooldownStatus = await checkCooldown(actionId);
    
    if (cooldownStatus.on_cooldown) {
      const remainingMinutes = cooldownStatus.remaining_seconds ? (cooldownStatus.remaining_seconds / 60).toFixed(1) : '0';
      toast.warning('Action on cooldown', {
        description);
      return;
    }

    // In real implementation, open action modal
    toast.info(`${actionId} action selected`, {
      description);
  };

  return (
    
      
        
          
          Quick Actions
        
      
      
        
          {QUICK_ACTIONS.map((action) => (
             handleActionClick(action.id)}
              disabled={cooldowns[action.id]}
              style={{
                '--action-color': action.color
              }.CSSProperties}
            >
              
                {action.icon}
              
              
                {action.name}
                {action.description}
              
              {cooldowns[action.id] && (
                
                  Cooldown
                
              )}
            
          ))}
        
      
    
  );
};
