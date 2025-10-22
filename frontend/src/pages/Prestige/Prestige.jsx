import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../../components/ui/alert-dialog';
import prestigeService from '../../services/prestige/prestigeService';
import { toast } from '../../components/ui/sonner';
import { Crown, Sparkles } from 'lucide-react';

const Prestige: React.FC = () => {
  const [prestige, setPrestige] = useState(null);
  const [eligibility, setEligibility] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrestige();
    checkEligibility();
  }, []);

  const fetchPrestige = async () => {
    try {
      const data = await prestigeService.getPrestige();
      setPrestige(data);
    } catch (error) {
      console.error('Failed to fetch prestige, error);
    } finally {
      setLoading(false);
    }
  };

  const checkEligibility = async () => {
    try {
      const data = await prestigeService.checkPrestigeEligibility();
      setEligibility(data);
    } catch (error) {
      console.error('Failed to check eligibility, error);
    }
  };

  const handlePrestige = async () => {
    try {
      const result = await prestigeService.performPrestige();
      toast.success(result.message);
      fetchPrestige();
      checkEligibility();
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to prestige');
    }
  };

  if (loading) {
    return Loading prestige...;
  }

  return (
    
      
        
          
            
              
              Prestige System
            
            {prestige && (
              
                Level {prestige.current_prestige_level}
              
            )}
          
        
        
          {/* Current Status */}
          {prestige && (
            
              
                
                  
                    Prestige Level
                    {prestige.current_prestige_level}/10
                  
                
              
              
                
                  
                    Total Prestiges
                    {prestige.total_prestiges}
                  
                
              
              
                
                  
                    Prestige Points
                    {prestige.prestige_points}
                  
                
              
            
          )}

          {/* Eligibility */}
          {eligibility && (
            
              
                Prestige Requirements
              
              
                
                  
                    Level 100
                    = 100 ? 'default' : 'secondary'}>
                      {eligibility.current_level}/100
                    
                  
                  
                

                
                  
                    Karma
                    = 1000 ? 'default' : 'secondary'}>
                      {eligibility.current_karma}/1000
                    
                  
                  
                

                {eligibility.requirements.achievements > 0 && (
                  
                    
                      Achievements
                      = eligibility.requirements.achievements
                            ? 'default'
                            : 'secondary'
                        }
                      >
                        {eligibility.current_achievements}/{eligibility.requirements.achievements}
                      
                    
                    
                  
                )}

                
                  {eligibility.eligible ? (
                    
                      
                        
                          
                          Prestige Now
                        
                      
                      
                        
                          Are you sure?
                          
                            Prestiging will reset your level and traits, but you'll keep 10% of your trait
                            progress and gain permanent bonuses. This action cannot be undone.
                          
                        
                        
                          Cancel
                          
                            Prestige
                          
                        
                      
                    
                  ) : (
                    
                      {eligibility.message}
                    
                  )}
                
              
            
          )}

          {/* Permanent Bonuses */}
          {prestige && Object.keys(prestige.permanent_bonuses).length > 0 && (
            
              
                Permanent Bonuses
              
              
                
                  {Object.entries(prestige.permanent_bonuses).map(([bonus, value]) => (
                    
                      {bonus.replace('_', ' ')}
                      x{value.toFixed(2)}
                    
                  ))}
                
              
            
          )}
        
      
    
  );
};

export default Prestige;
