export interface PrestigeLevel {
  level: number;
  reached_at?: string;
  traits_kept_percentage: number;
  bonus_multipliers: Record<string, number>;
}

export interface PrestigeReward {
  prestige_level: number;
  prestige_points: number;
  exclusive_powers: string[];
  permanent_bonuses: Record<string, number>;
  cosmetic_rewards: string[];
}

export interface PlayerPrestige {
  player_id: string;
  current_prestige_level: number;
  total_prestiges: number;
  prestige_points: number;
  can_prestige: boolean;
  next_prestige_requirements: Record<string, any>;
  prestige_history: string[];
  permanent_bonuses: Record<string, number>;
}

export interface PrestigeEligibility {
  eligible: boolean;
  message: string;
  current_level: number;
  current_karma: number;
  current_achievements: number;
  requirements: Record<string, number>;
}
