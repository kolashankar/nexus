export interface SkillNode {
  node_id: number;
  level_required: number;
  bonus_type: 'stat' | 'ability' | 'passive';
  bonus_value: any;
  branch: 'A' | 'B' | null;
  unlocked: boolean;
}

export interface SkillTree {
  trait_name: string;
  nodes: SkillNode[];
  total_nodes: number;
  unlocked_nodes: number;
  active_branch: 'A' | 'B' | null;
}

export interface Superpower {
  id: string;
  name: string;
  description: string;
  tier: 1 | 2 | 3 | 4 | 5;
  unlocked: boolean;
  cooldown: number;
  current_cooldown: number;
  duration: number;
  effects: Record<string, any>;
  unlock_conditions: Record<string, number>;
  usage_count: number;
  cost: Record<string, number>;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  category: string;
  condition: Record<string, any>;
  rewards: Record<string, number>;
  unlocked: boolean;
  unlocked_at?: string;
  progress?: number;
  total?: number;
  hidden: boolean;
}

export interface PrestigeLevel {
  level: number;
  name: string;
  requirements: {
    min_player_level: number;
    karma_threshold: number;
    achievements_required: number;
  };
  reset_effects: {
    keep_percentage: number;
    reset_currencies: string[];
    keep_currencies: string[];
    keep_achievements: boolean;
    keep_superpowers: boolean;
    reset_level: boolean;
  };
  permanent_bonuses: Record<string, number>;
  prestige_points_awarded: number;
  unlocks: string[];
}

export interface PrestigeData {
  current_level: number;
  next_level_config: PrestigeLevel;
  can_prestige: boolean;
  total_prestige_points: number;
  active_bonuses: Record<string, number>;
}

export interface LegacyPerk {
  id: string;
  name: string;
  description: string;
  cost: Record<string, number>;
  max_level: number;
  current_level: number;
  bonus_per_level: Record<string, number>;
  cumulative: boolean;
}

export interface ProgressionData {
  level: number;
  xp: number;
  xp_for_next: number;
  prestige_level: number;
  skill_trees: Record<string, SkillTree>;
  superpowers: Superpower[];
  achievements: Achievement[];
  achievements_unlocked: number;
  total_achievements: number;
  prestige_data: PrestigeData;
  legacy_perks: LegacyPerk[];
}
