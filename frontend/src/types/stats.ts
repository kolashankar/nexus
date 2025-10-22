/**
 * Player statistics type definitions.
 */

export interface CombatStats {
  hp: number;
  max_hp: number;
  attack: number;
  defense: number;
  evasion: number;
  crit_chance: number;
  combat_rating: number;
}

export interface DerivedTraits {
  reputation: number;
  influence: number;
  trustworthiness: number;
  business_acumen: number;
  market_intuition: number;
  wealth_management: number;
  enlightenment: number;
  karmic_balance: number;
  divine_favor: number;
  fame: number;
  infamy: number;
}

export interface LevelProgress {
  level: number;
  xp: number;
  xp_needed_for_next: number;
  xp_in_current_level: number;
  level_progress_percentage: number;
  next_level_xp_threshold: number;
}

export interface PlayerStats {
  player_id: string;
  username: string;
  level: number;
  combat_stats: CombatStats;
  derived_traits: DerivedTraits;
  level_progress: LevelProgress;
  calculated_at: string;
}

export interface StatRequirement {
  trait: string;
  required: number;
  current: number;
  difference: number;
}

export interface PowerUnlockRequirements {
  unlockable: boolean;
  missing_requirements: StatRequirement[];
  progress_percentage: number;
}

export interface StatsUpdate {
  stat_type: 'combat' | 'derived' | 'trait';
  stat_name: string;
  old_value: number;
  new_value: number;
  change: number;
  reason: string;
  timestamp: string;
}
