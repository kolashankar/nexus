import React, { useState } from 'react';
import { BattleParticipant } from '../../../types/combat';
import { Button } from '../../ui/button';
import { Sword, Shield, Zap, Flag } from 'lucide-react';
import AbilityMenu from '../AbilityMenu/AbilityMenu';
import './ActionBar.css';

interface ActionBarProps {
  participant: BattleParticipant;
  opponent: BattleParticipant;
  onAction: (actionType: string, targetId?: string, abilityName?: string) => void;
  onFlee: () => void;
}

const ActionBar: React.FC<ActionBarProps> = ({ participant, opponent, onAction, onFlee }) => {
  const [showAbilities, setShowAbilities] = useState(false);

  const handleAttack = () => {
    onAction('attack', opponent.player_id);
  };

  const handleDefend = () => {
    onAction('defend');
  };

  const handleAbility = (abilityName: string) => {
    onAction('use_power', opponent.player_id, abilityName);
    setShowAbilities(false);
  };

  const canAct = (apCost: number) => {
    return participant.action_points >= apCost;
  };

  return (
    <div className="action-bar">
      <div className="action-bar-header">
        <h4>Choose Your Action</h4>
        <span className="ap-display">
          <Zap size={16} /> {participant.action_points}/{participant.max_action_points} AP
        </span>
      </div>

      <div className="action-buttons">
        <Button
          onClick={handleAttack}
          disabled={!canAct(1)}
          className="action-button attack-button"
          size="lg"
        >
          <Sword size={20} />
          <div>
            <div className="action-name">Attack</div>
            <div className="action-cost">1 AP</div>
          </div>
        </Button>

        <Button
          onClick={handleDefend}
          disabled={!canAct(1)}
          className="action-button defend-button"
          size="lg"
        >
          <Shield size={20} />
          <div>
            <div className="action-name">Defend</div>
            <div className="action-cost">1 AP</div>
          </div>
        </Button>

        <Button
          onClick={() => setShowAbilities(!showAbilities)}
          disabled={!canAct(2) || participant.equipped_abilities.length === 0}
          className="action-button ability-button"
          size="lg"
        >
          <Zap size={20} />
          <div>
            <div className="action-name">Abilities</div>
            <div className="action-cost">Varies</div>
          </div>
        </Button>

        <Button
          onClick={onFlee}
          disabled={!canAct(3)}
          className="action-button flee-button"
          size="lg"
          variant="outline"
        >
          <Flag size={20} />
          <div>
            <div className="action-name">Flee</div>
            <div className="action-cost">3 AP</div>
          </div>
        </Button>
      </div>

      {showAbilities && (
        <AbilityMenu
          abilities={participant.equipped_abilities}
          onSelect={handleAbility}
          onClose={() => setShowAbilities(false)}
          availableAP={participant.action_points}
        />
      )}
    </div>
  );
};

export default ActionBar;
