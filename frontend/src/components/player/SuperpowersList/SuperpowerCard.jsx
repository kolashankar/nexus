import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { Zap, Clock } from 'lucide-react';



const SuperpowerCard = ({ 
  power,
  isEquipped,
  onEquip,
  onUse,
 }) => {
  const isOnCooldown = power.cooldown_until
    ? new Date(power.cooldown_until) > new Date()
    : false;

  return (
    
      
        
          {power.power_id.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
          {isEquipped && Equipped}
        
      
      
        
          Level {power.level}
          Uses)}%
          
          
        

        {isOnCooldown && (
          
            
            On cooldown
          
        )}

        
          {!isEquipped && (
            
              Equip
            
          )}
          {isEquipped && (
            
              
              Use Power
            
          )}
        
      
    
  );
};

export default SuperpowerCard;
