export interface LegacyTitle {
  title_id: string;
  name: string;
  description: string;
  earned_at: string;
  season_earned: number;
  permanent: boolean;
}

export interface HeirloomItem {
  item_id: string;
  name: string;
  description: string;
  power_level: number;
  transferable: boolean;
  season_acquired: number;
}

export interface LegacyPerk {
  perk_id: string;
  name: string;
  description: string;
  bonus_type: string;
  bonus_value: number;
  cost: number;
  unlocked: boolean;
}

export interface PlayerLegacy {
  account_id: string;
  legacy_points: number;
  lifetime_legacy_points: number;
  legacy_level: number;
  earned_titles: LegacyTitle[];
  active_title?: string;
  heirloom_items: HeirloomItem[];
  unlocked_perks: LegacyPerk[];
  active_perks: string[];
  seasons_played: number;
  total_characters_created: number;
  highest_karma_achieved: number;
  total_achievements: number;
  mentorship_level: number;
  apprentices_taught: number;
  mentorship_rewards_earned: number;
}

export interface LegacySummary {
  legacy_level: number;
  legacy_points: number;
  lifetime_points: number;
  seasons_played: number;
  titles_earned: number;
  active_title?: string;
  heirlooms: number;
  unlocked_perks: number;
  active_perks: string[];
  mentorship_level: number;
  apprentices_taught: number;
  achievements: number;
}

export interface NewCharacterBonuses {
  xp_multiplier: number;
  karma_multiplier: number;
  trait_multiplier: number;
  starting_credits: number;
  starting_skill_points: number;
}
