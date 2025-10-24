/**
 * Action Cooldowns Component - Shows active cooldowns.
 */

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { Clock, Zap, AlertCircle } from 'lucide-react';
import { actionService } from '../../../services/action/actionService';
import './ActionCooldowns.css';



export const ActionCooldowns = () => {
  const [cooldowns, setCooldowns] = useState>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCooldowns();
    const interval = setInterval(loadCooldowns, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const loadCooldowns = async () => {
    try {
      // In real implementation, call actionService.getAllCooldowns()
      // For now, mock data
      setLoading(false);
    } catch (error) {
      console.error('Failed to load cooldowns', error);
      setLoading(false);
    }
  };

  const formatTime = (seconds)=> {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}).padStart(2, '0')}`;
  };

  const getCooldownPercentage = (cooldown)=> {
    // Calculate based on typical durations
    const typicalDuration = {
      'hack',
      'steal',
      'help',
      'donate',
      'trade'
    };

    const duration = typicalDuration[cooldown.action_type typeof typicalDuration] || 300;
    return ((duration - cooldown.remaining_seconds) / duration) * 100;
  };

  const cooldownEntries = Object.entries(cooldowns);

  if (loading) {
    return (
      
        
          
            
            Action Cooldowns
          
        
        
          Loading cooldowns...
        
      
    );
  }

  if (cooldownEntries.length === 0) {
    return (
      
        
          
            
            Action Cooldowns
          
        
        
          
            
            No active cooldowns
            All actions are ready!
          
        
      
    );
  }

  return (
    
      
        
          
          Action Cooldowns
          
            {cooldownEntries.length} active
          
        
      
      
        
          {cooldownEntries.map(([actionType, cooldown]) => (
            
              
                {actionType}
                
                  {formatTime(cooldown.remaining_seconds)}
                
              
              
              
                {cooldown.remaining_minutes.toFixed(1)} minutes remaining
              
            
          ))}
        
      
    
  );
};
