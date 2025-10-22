import React, { useState } from 'react';
import { BattleParticipant } from '../../../types/combat';
import { Button } from '../../ui/button';
import { Sword, Shield, Zap, Flag } from 'lucide-react';
import AbilityMenu from '../AbilityMenu/AbilityMenu';
import './ActionBar.css';



const ActionBar: React.FC = ({ participant, opponent, onAction, onFlee }) => {
  const [showAbilities, setShowAbilities] = useState(false);

  const handleAttack = () => {
    onAction('attack', opponent.player_id);
  };

  const handleDefend = () => {
    onAction('defend');
  };

  const handleAbility = (abilityName) => {
    onAction('use_power', opponent.player_id, abilityName);
    setShowAbilities(false);
  };

  const canAct = (apCost) => {
    return participant.action_points >= apCost;
  };

  return (
    
      
        Choose Your Action
        
           {participant.action_points}/{participant.max_action_points} AP
        
      

      
        
          
          
            Attack
            1 AP
          
        

        
          
          
            Defend
            1 AP
          
        

         setShowAbilities(!showAbilities)}
          disabled={!canAct(2) || participant.equipped_abilities.length === 0}
          className="action-button ability-button"
          size="lg"
        >
          
          
            Abilities
            Varies
          
        

        
          
          
            Flee
            3 AP
          
        
      

      {showAbilities && (
         setShowAbilities(false)}
          availableAP={participant.action_points}
        />
      )}
    
  );
};

export default ActionBar;
