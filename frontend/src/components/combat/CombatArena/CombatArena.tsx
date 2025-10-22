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

interface CombatArenaProps {
  battleId: string;
  playerId: string;
}

const CombatArena: React.FC<CombatArenaProps> = ({ battleId, playerId }) => {
  const [battle, setBattle] = useState<Battle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [combatLog, setCombatLog] = useState<string[]>([]);
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
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleAction = async (actionType: string, targetId?: string, abilityName?: string) => {
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
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleFlee = async () => {
    if (window.confirm('Are you sure you want to flee? This will count as a loss.')) {
      try {
        await combatService.fleeBattle(battleId, playerId);
        await loadBattle();
      } catch (err: any) {
        setError(err.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="combat-arena-loading">
        <div className="spinner">Loading battle...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="combat-arena-error">
        <AlertCircle className="error-icon" />
        <p>{error}</p>
      </div>
    );
  }

  if (!battle) {
    return <div>Battle not found</div>;
  }

  const player = battle.participants.find(p => p.player_id === playerId);
  const opponent = battle.participants.find(p => p.player_id !== playerId);

  if (!player || !opponent) {
    return <div>Invalid battle state</div>;
  }

  const isBattleOver = battle.status === 'completed';
  const isWinner = battle.winner_id === playerId;

  return (
    <div className="combat-arena">
      {/* Battle Header */}
      <div className="battle-header">
        <h2 className="battle-title">
          {battle.battle_type.toUpperCase()} - Turn {battle.current_turn}
        </h2>
        <div className="battle-status">
          {isBattleOver ? (
            <span className={`status-badge ${isWinner ? 'winner' : 'loser'}`}>
              {isWinner ? '🏆 VICTORY!' : '💀 DEFEATED'}
            </span>
          ) : (
            <span className={`status-badge ${isMyTurn ? 'active' : 'waiting'}`}>
              {isMyTurn ? '⚡ YOUR TURN' : '⏳ OPPONENT\'S TURN'}
            </span>
          )}
        </div>
      </div>

      {/* Battle Arena */}
      <div className="battle-arena">
        {/* Player Side */}
        <div className="participant player-side">
          <Card className="participant-card">
            <div className="participant-header">
              <h3>{player.username}</h3>
              <span className="ap-badge">
                <Zap size={16} /> {player.action_points}/{player.max_action_points} AP
              </span>
            </div>
            <HealthBar 
              current={player.hp}
              max={player.max_hp}
              label="HP"
            />
            <div className="participant-stats">
              <div className="stat">
                <Shield size={16} />
                <span>ATK: {player.combat_stats.attack}</span>
              </div>
              <div className="stat">
                <Shield size={16} />
                <span>DEF: {player.combat_stats.defense}</span>
              </div>
            </div>
            {player.status_effects.length > 0 && (
              <div className="status-effects">
                {player.status_effects.map((effect, i) => (
                  <span key={i} className="effect-badge">
                    {effect.type}
                  </span>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* VS Divider */}
        <div className="vs-divider">
          <span className="vs-text">VS</span>
        </div>

        {/* Opponent Side */}
        <div className="participant opponent-side">
          <Card className="participant-card">
            <div className="participant-header">
              <h3>{opponent.username}</h3>
              <span className="ap-badge">
                <Zap size={16} /> {opponent.action_points}/{opponent.max_action_points} AP
              </span>
            </div>
            <HealthBar 
              current={opponent.hp}
              max={opponent.max_hp}
              label="HP"
            />
            <div className="participant-stats">
              <div className="stat">
                <Shield size={16} />
                <span>ATK: {opponent.combat_stats.attack}</span>
              </div>
              <div className="stat">
                <Shield size={16} />
                <span>DEF: {opponent.combat_stats.defense}</span>
              </div>
            </div>
            {opponent.status_effects.length > 0 && (
              <div className="status-effects">
                {opponent.status_effects.map((effect, i) => (
                  <span key={i} className="effect-badge">
                    {effect.type}
                  </span>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Combat Log */}
      <Card className="combat-log">
        <h4>Combat Log</h4>
        <div className="log-entries">
          {combatLog.length === 0 ? (
            <p className="log-empty">Battle start! Prepare for combat...</p>
          ) : (
            combatLog.map((entry, i) => (
              <div key={i} className="log-entry">
                {entry}
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Action Bar - Only show if it's player's turn and battle not over */}
      {!isBattleOver && isMyTurn && (
        <ActionBar
          participant={player}
          opponent={opponent}
          onAction={handleAction}
          onFlee={handleFlee}
        />
      )}

      {/* Battle Results */}
      {isBattleOver && (
        <Card className="battle-results">
          <h3>{isWinner ? '🏆 Victory!' : '💀 Defeat'}</h3>
          {battle.rewards && (
            <div className="rewards">
              <h4>Rewards:</h4>
              <ul>
                {Object.entries(battle.rewards).map(([key, value]) => (
                  <li key={key}>
                    {key}: {value}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <Button onClick={() => window.location.href = '/dashboard'}>
            Return to Dashboard
          </Button>
        </Card>
      )}
    </div>
  );
};

export default CombatArena;
