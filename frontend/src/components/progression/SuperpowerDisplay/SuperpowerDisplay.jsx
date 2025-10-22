import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Zap, Lock, Clock, Star, Info } from 'lucide-react';





export const SuperpowerDisplay = ({ 
  superpowers,
  onActivate,
  onViewDetails
 }) => {
  const [selectedTier, setSelectedTier] = useState(1);

  const getTierColor = (tier) => {
    const colors = {
      1,
      2,
      3,
      4,
      5: 'bg-yellow-500'
    };
    return colors[tier typeof colors] || 'bg-gray-500';
  };

  const getTierName = (tier) => {
    const names = {
      1,
      2,
      3,
      4,
      5: 'Legendary'
    };
    return names[tier typeof names] || 'Unknown';
  };

  const filteredPowers = superpowers.filter(p => p.tier === selectedTier);
  const unlockedCount = superpowers.filter(p => p.unlocked).length;

  return (
    
      {/* Overview Stats */}
      
        
          
            
              
                Unlocked Powers
                {unlockedCount} / {superpowers.length}
              
              
            
          
        
        
          
            
              Completion
              
              
                {((unlockedCount / superpowers.length) * 100).toFixed(1)}%
              
            
          
        
        
          
            
              Highest Tier
              
                {Math.max(...superpowers.filter(p => p.unlocked).map(p => p.tier), 0)}
              
            
          
        
      

      {/* Tier Tabs */}
       setSelectedTier(Number(v))}>
        
          {[1, 2, 3, 4, 5].map((tier) => (
            
               p.tier === tier && p.unlocked) ? 'text-yellow-500' : ''}`} />
              Tier {tier}
            
          ))}
        

        {/* Powers Grid */}
        
          {filteredPowers.map((power) => (
            
              
                
                  
                    
                      {power.unlocked ? (
                        
                      ) : (
                        
                      )}
                      {power.name}
                    
                    {power.description}
                  
                  
                    {getTierName(power.tier)}
                  
                
              
              
              
                {power.unlocked ? (
                  
                    {/* Cooldown */}
                    {power.currentCooldown > 0 ? (
                      
                        
                          
                            
                            On Cooldown
                          
                          {power.currentCooldown}s
                        
                        
                      
                    ) : (
                      
                        
                        Ready to Use
                      
                    )}

                    {/* Usage Stats */}
                    
                      Times Used
                      {power.usageCount}
                    

                    {/* Effects Preview */}
                    
                      Effects).slice(0, 3).map(([key, value]) => (
                          
                            {key}: {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
                          
                        ))}
                      
                    

                    {/* Action Buttons */}
                    
                       0}
                        onClick={() => onActivate(power.id)}
                      >
                        
                        Activate
                      
                       onViewDetails(power.id)}
                      >
                        
                      
                    
                  
                ) : (
                  
                    {/* Unlock Requirements */}
                    
                      Unlock Requirements).map(([trait, value]) => (
                          
                            {trait.replace(/_/g, ' ')}
                            {value}%
                          
                        ))}
                      
                    

                     onViewDetails(power.id)}
                    >
                      
                      View Details
                    
                  
                )}
              
            
          ))}
        
      
    
  );
};
