export interface BattleParticipant {
  player_id: string;
  username: string;
  hp: number;
  max_hp: number;
  action_points: number;
  max_action_points: number;
  initiative: number;
  position: number;
  status_effects: StatusEffect[];
  combat_stats: CombatStats;
  equipped_abilities: string[];
  has_fled: boolean;
}

export interface StatusEffect {
  type: string;
  value?: number;
  duration?: number;
  [key: string]: any;
}

export interface CombatStats {
  hp: number;
  max_hp: number;
  attack: number;
  defense: number;
  speed: number;
  evasion: number;
  critical_chance: number;
}

export interface BattleAction {
  action_id: string;
  actor_id: string;
  action_type: string;
  target_id?: string;
  ability_name?: string;
  ap_cost: number;
  damage?: number;
  effects: any[];
  success: boolean;
  description: string;
  timestamp: string;
}

export interface Battle {
  battle_id: string;
  battle_type: string;
  status: string;
  participants: BattleParticipant[];
  attacker_id: string;
  defender_id: string;
  current_turn: number;
  active_participant_id?: string;
  turn_history: any[];
  created_at: string;
  started_at?: string;
  ended_at?: string;
  winner_id?: string;
  loser_id?: string;
  victory_type?: string;
  rewards?: any;
  max_turns: number;
  turn_timeout: number;
  ranked?: boolean;
}

export interface CombatAbility {
  id: string;
  name: string;
  description: string;
  ap_cost: number;
  target: string;
  effect_type?: string;
}

export interface Tournament {
  tournament_id: string;
  name: string;
  description: string;
  tournament_type: string;
  max_participants: number;
  participants: string[];
  status: string;
  current_round: number;
  prize_pool: any;
  created_at: string;
  starts_at?: string;
}
