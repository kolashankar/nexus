import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import superpowersService from '../../../services/superpowers/superpowersService';
import SuperpowerCard from './SuperpowerCard';
import { toast } from '../../ui/sonner';

const SuperpowersList: React.FC = () => {
  const [superpowers, setSuperpowers] = useState(null);
  const [availablePowers, setAvailablePowers] = useState([]);
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
      console.error('Failed to fetch superpowers, error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailablePowers = async () => {
    try {
      const data = await superpowersService.getAvailablePowers();
      setAvailablePowers(data);
    } catch (error) {
      console.error('Failed to fetch available powers, error);
    }
  };

  const handleUnlockPower = async (powerId) => {
    try {
      await superpowersService.unlockPower(powerId);
      toast.success('Superpower unlocked!');
      fetchSuperpowers();
      fetchAvailablePowers();
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to unlock power');
    }
  };

  const handleEquipPower = async (powerId) => {
    try {
      await superpowersService.equipPower(powerId);
      toast.success('Power equipped!');
      fetchSuperpowers();
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to equip power');
    }
  };

  const handleUsePower = async (powerId) => {
    try {
      const result = await superpowersService.usePower(powerId);
      toast.success(result.message);
      fetchSuperpowers();
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to use power');
    }
  };

  if (loading) {
    return Loading superpowers...;
  }

  return (
    
      
        
          
            Superpowers
            {superpowers && (
              
                
                  Unlocked)}
          
        
        
          
            
              Unlocked Powers
              Available Powers
            

            
              {superpowers && superpowers.unlocked_powers.length > 0 ? (
                
                  {superpowers.unlocked_powers.map((power) => (
                     handleEquipPower(power.power_id)}
                      onUse={() => handleUsePower(power.power_id)}
                    />
                  ))}
                
              ) : (
                
                  No superpowers unlocked yet. Meet requirements to unlock powers!
                
              )}
            

            
              
                {availablePowers.map((power) => (
                  
                    
                      
                        {power.name}
                        
                          {power.tier.replace('tier_', 'T')}
                        
                      
                    
                    
                      {power.description}
                      
                      
                        Requirements).map(([trait, value]) => (
                            
                              {trait}: {value}%
                            
                          ))}
                        
                      

                      {power.eligible && (
                         handleUnlockPower(power.power_id)}
                        >
                          Unlock Power
                        
                      )}
                    
                  
                ))}
              
            
          
        
      
    
  );
};

export default SuperpowersList;
