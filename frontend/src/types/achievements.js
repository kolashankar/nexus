/**
 * Achievement categories
 */
export const AchievementCategory = {
  TRAIT_MASTERY: 'trait_mastery',
  POWER_COLLECTOR: 'power_collector',
  KARMA: 'karma',
  SOCIAL: 'social',
  ECONOMIC: 'economic',
  COMBAT: 'combat',
  STORY: 'story',
  HIDDEN: 'hidden',
  SEASONAL: 'seasonal',
  LEGACY: 'legacy',
};

/**
 * Achievement rarities
 */
export const AchievementRarity = {
  COMMON: 'common',
  UNCOMMON: 'uncommon',
  RARE: 'rare',
  EPIC: 'epic',
  LEGENDARY: 'legendary',
};

/**
 * @typedef {Object} AchievementDefinition
 * @property {string} achievement_id
 * @property {string} name
 * @property {string} description
 * @property {string} category
 * @property {string} rarity
 * @property {string} icon
 * @property {number} points
 * @property {Object.<string, any>} requirements
 * @property {Object.<string, number>} rewards
 * @property {boolean} hidden
 * @property {boolean} repeatable
 */

/**
 * @typedef {Object} AchievementProgress
 * @property {string} achievement_id
 * @property {number} current_progress
 * @property {number} required_progress
 * @property {number} percentage
 * @property {string} started_at
 * @property {number[]} milestones_reached
 */

/**
 * @typedef {Object} UnlockedAchievement
 * @property {string} achievement_id
 * @property {string} unlocked_at
 * @property {number} points_earned
 * @property {string} rarity
 * @property {boolean} notification_shown
 * @property {number} [completion_time]
 */

/**
 * @typedef {Object} PlayerAchievements
 * @property {string} player_id
 * @property {UnlockedAchievement[]} unlocked_achievements
 * @property {Object.<string, AchievementProgress>} achievement_progress
 * @property {number} total_points
 * @property {number} completion_percentage
 * @property {string[]} recent_unlocks
 */

/**
 * @typedef {Object} AchievementSummary
 * @property {number} total_achievements
 * @property {number} unlocked
 * @property {number} completion_percentage
 * @property {number} total_points
 * @property {Object.<string, number>} by_rarity
 * @property {string[]} recent_unlocks
 */
