export enum AchievementCategory {
  TRAIT_MASTERY = 'trait_mastery',
  POWER_COLLECTOR = 'power_collector',
  KARMA = 'karma',
  SOCIAL = 'social',
  ECONOMIC = 'economic',
  COMBAT = 'combat',
  STORY = 'story',
  HIDDEN = 'hidden',
  SEASONAL = 'seasonal',
  LEGACY = 'legacy',
}

export enum AchievementRarity {
  COMMON = 'common',
  UNCOMMON = 'uncommon',
  RARE = 'rare',
  EPIC = 'epic',
  LEGENDARY = 'legendary',
}

export interface AchievementDefinition {
  achievement_id: string;
  name: string;
  description: string;
  category: AchievementCategory;
  rarity: AchievementRarity;
  icon: string;
  points: number;
  requirements: Record<string, any>;
  rewards: Record<string, number>;
  hidden: boolean;
  repeatable: boolean;
}

export interface AchievementProgress {
  achievement_id: string;
  current_progress: number;
  required_progress: number;
  percentage: number;
  started_at: string;
  milestones_reached: number[];
}

export interface UnlockedAchievement {
  achievement_id: string;
  unlocked_at: string;
  points_earned: number;
  rarity: AchievementRarity;
  notification_shown: boolean;
  completion_time?: number;
}

export interface PlayerAchievements {
  player_id: string;
  unlocked_achievements: UnlockedAchievement[];
  achievement_progress: Record<string, AchievementProgress>;
  total_points: number;
  completion_percentage: number;
  recent_unlocks: string[];
}

export interface AchievementSummary {
  total_achievements: number;
  unlocked: number;
  completion_percentage: number;
  total_points: number;
  by_rarity: Record<string, number>;
  recent_unlocks: string[];
}
