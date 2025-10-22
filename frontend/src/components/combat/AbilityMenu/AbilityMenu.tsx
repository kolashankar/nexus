import React from 'react';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { X, Zap } from 'lucide-react';
import './AbilityMenu.css';

interface AbilityMenuProps {
  abilities: string[];
  onSelect: (abilityName: string) => void;
  onClose: () => void;
  availableAP: number;
}

// Mock ability data - In real app, fetch from API
const ABILITY_DATA: Record<string, { name: string; cost: number; description: string }> = {
  'emp_blast': { name: 'EMP Blast', cost: 2, description: 'Disables enemy robots' },
  'mercy': { name: 'Mercy', cost: 2, description: 'Spare enemy, gain karma' },
  'berserker_rage': { name: 'Berserker Rage', cost: 3, description: 'Double damage, no defense' },
  'tactical_advantage': { name: 'Tactical Advantage', cost: 2, description: 'Gain +2 AP' },
  'inner_peace': { name: 'Inner Peace', cost: 2, description: 'Restore 30% HP' },
  'shadow_strike': { name: 'Shadow Strike', cost: 3, description: 'Guaranteed critical' },
  'power_strike': { name: 'Power Strike', cost: 2, description: 'Triple damage attack' },
};

const AbilityMenu: React.FC<AbilityMenuProps> = ({ 
  abilities, 
  onSelect, 
  onClose, 
  availableAP 
}) => {
  return (
    <div className="ability-menu-overlay">
      <Card className="ability-menu">
        <div className="ability-menu-header">
          <h4>
            <Zap size={20} /> Select Ability
          </h4>
          <Button onClick={onClose} variant="ghost" size="icon">
            <X size={20} />
          </Button>
        </div>

        <div className="ability-list">
          {abilities.length === 0 ? (
            <p className="no-abilities">No abilities equipped</p>
          ) : (
            abilities.map((abilityId) => {
              const ability = ABILITY_DATA[abilityId] || {
                name: abilityId,
                cost: 2,
                description: 'Unknown ability'
              };
              
              const canUse = availableAP >= ability.cost;

              return (
                <div key={abilityId} className={`ability-item ${!canUse ? 'disabled' : ''}`}>
                  <div className="ability-info">
                    <h5>{ability.name}</h5>
                    <p>{ability.description}</p>
                  </div>
                  <div className="ability-actions">
                    <span className="ability-cost">
                      <Zap size={14} /> {ability.cost} AP
                    </span>
                    <Button
                      onClick={() => onSelect(abilityId)}
                      disabled={!canUse}
                      size="sm"
                    >
                      Use
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </Card>
    </div>
  );
};

export default AbilityMenu;
