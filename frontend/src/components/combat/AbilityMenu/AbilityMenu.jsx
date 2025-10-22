import React from 'react';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { X, Zap } from 'lucide-react';
import './AbilityMenu.css';



// Mock ability data - In real app, fetch from API
const ABILITY_DATA: Record = {
  'emp_blast': { name, cost, description,
  'mercy': { name, cost, description, gain karma' },
  'berserker_rage': { name, cost, description, no defense' },
  'tactical_advantage': { name, cost, description,
  'inner_peace': { name, cost, description,
  'shadow_strike': { name, cost, description,
  'power_strike': { name, cost, description,
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
          ) : (
            abilities.map((abilityId) => {
              const ability = ABILITY_DATA[abilityId] || {
                name,
                cost,
                description: 'Unknown ability'
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
