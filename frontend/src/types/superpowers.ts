export enum PowerTier {
  TIER_1 = 'tier_1',
  TIER_2 = 'tier_2',
  TIER_3 = 'tier_3',
  TIER_4 = 'tier_4',
  TIER_5 = 'tier_5',
}

export interface SuperpowerDefinition {
  power_id: string;
  name: string;
  description: string;
  tier: PowerTier;
  requirements: Record<string, number>;
  cooldown_seconds: number;
  energy_cost: number;
  effects?: Record<string, any>;
}

export interface UnlockedSuperpower {
  power_id: string;
  unlocked_at: string;
  usage_count: number;
  last_used_at?: string;
  cooldown_until?: string;
  level: number;
  mastery: number;
}

export interface PlayerSuperpowers {
  player_id: string;
  unlocked_powers: UnlockedSuperpower[];
  equipped_powers: string[];
  total_powers_unlocked: number;
}

export interface AvailablePower {
  power_id: string;
  name: string;
  description: string;
  tier: PowerTier;
  eligible: boolean;
  requirements: Record<string, number>;
  message: string;
}
