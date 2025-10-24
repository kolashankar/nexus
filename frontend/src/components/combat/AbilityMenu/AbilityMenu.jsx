import React from 'react';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { X, Zap } from 'lucide-react';
import './AbilityMenu.css';



// Mock ability data - In real app, fetch from API
const ABILITY_DATA= {
  'emp_blast', cost, description: "Operation completed",
  'mercy', cost, description: "Operation completed", gain karma' },
  'berserker_rage', cost, description: "Operation completed", no defense' },
  'tactical_advantage', cost, description: "Operation completed",
  'inner_peace', cost, description: "Operation completed",
  'shadow_strike', cost, description: "Operation completed",
  'power_strike', cost, description: "Operation completed",
};

const AbilityMenu = ({  
  abilities, 
  onSelect, 
  onClose, 
  availableAP 
 }) => {
  return (
    
      
        
          
             Select Ability
          
          
            
          
        

        
          {abilities.length === 0 ? (
            No abilities equipped
          ) 
            abilities.map((abilityId) => {
              const ability = ABILITY_DATA[abilityId] || {
                name,
                cost,
                description
              };
              
              const canUse = availableAP >= ability.cost;

              return (
                
                  
                    {ability.name}
                    {ability.description}
                  
                  
                    
                       {ability.cost} AP
                    
                     onSelect(abilityId)}
                      disabled={!canUse}
                      size="sm"
                    >
                      Use
                    
                  
                
              );
            })
          )}
        
      
    
  );
};

export default AbilityMenu;
