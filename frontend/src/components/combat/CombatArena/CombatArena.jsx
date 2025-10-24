import React, { useState, useEffect } from 'react';
import { Battle, BattleParticipant } from '../../../types/combat';
import combatService from '../../../services/combat/combatService';
import ActionBar from '../ActionBar/ActionBar';
import HealthBar from '../HealthBar/HealthBar';
import AbilityMenu from '../AbilityMenu/AbilityMenu';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { AlertCircle, Shield, Zap } from 'lucide-react';
import './CombatArena.css';



const CombatArena = ({  battleId, playerId  }) => {
  const [battle, setBattle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [combatLog, setCombatLog] = useState([]);
  const [isMyTurn, setIsMyTurn] = useState(false);

  useEffect(() => {
    loadBattle();
    // Poll for updates every 2 seconds
    const interval = setInterval(loadBattle, 2000);
    return () => clearInterval(interval);
  }, [battleId]);

  useEffect(() => {
    if (battle) {
      setIsMyTurn(battle.active_participant_id === playerId);
    }
  }, [battle, playerId]);

  const loadBattle = async () => {
    try {
      const data = await combatService.getBattleState(battleId);
      setBattle(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleAction = async (actionType, targetId, abilityName) => {
    try {
      const result = await combatService.executeAction(
        battleId,
        playerId,
        actionType,
        targetId,
        abilityName
      );

      // Add to combat log
      setCombatLog(prev => [...prev, result.description]);

      // Reload battle state
      await loadBattle();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleFlee = async () => {
    if (window.confirm('Are you sure you want to flee? This will count loss.')) {
      try {
        await combatService.fleeBattle(battleId, playerId);
        await loadBattle();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) {
      return <div>Loading battle...</div>;
  }

  if (error) {
    return (
      
        
        {error}
      
    );
  }

  if (!battle) {
    return Battle not found;
  }

  const player = battle.participants.find(p => p.player_id === playerId);
  const opponent = battle.participants.find(p => p.player_id !== playerId);

  if (!player || !opponent) {
    return Invalid battle state;
  }

  const isBattleOver = battle.status === 'completed';
  const isWinner = battle.winner_id === playerId;

  return (
    
      {/* Battle Header */}
      
        
          {battle.battle_type.toUpperCase()} - Turn {battle.current_turn}
        
        
          {isBattleOver ? (
            
              {isWinner ? '🏆 VICTORY!' 
            
          ) 
            
              {isMyTurn ? '⚡ YOUR TURN' 
            
          )}
        
      

      {/* Battle Arena */}
      
        {/* Player Side */}
        
          
            
              {player.username}
              
                 {player.action_points}/{player.max_action_points} AP
  
                ATK, i) => (
                  
                    {effect.type}
                  
                ))}
              
            )}
          
        

        {/* VS Divider */}
        
          VS
        

        {/* Opponent Side */}
        
          
            
              {opponent.username}
              
                 {opponent.action_points}/{opponent.max_action_points} AP
              
            
            
            
              
                
                ATK, i) => (
                  
                    {effect.type}
                  
                ))}
              
            )}
          
        
      

      {/* Combat Log */}
      
        Combat Log
        
          {combatLog.length === 0 ? (
            Battle start! Prepare for combat...
          ) 
            combatLog.map((entry, i) => (
              
                {entry}
              
            ))
          )}
        
      

      {/* Action Bar - Only show if it's player's turn and battle not over */}
      {!isBattleOver && isMyTurn && (
        
      )}

      {/* Battle Results */}
      {isBattleOver && (
        
          {isWinner ? '🏆 Victory!' 
          {battle.rewards && (
            
              Rewards).map(([key, value]) => (
                  
                    {key}
                  
                ))}
              
            
          )}
           window.location.href = '/dashboard'}>
            Return to Dashboard
          
        
      )}
    
  );
};

export default CombatArena;
