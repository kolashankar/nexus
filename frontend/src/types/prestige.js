/**
 * @typedef {Object} PrestigeLevel
 * @property {number} level
 * @property {string} [reached_at]
 * @property {number} traits_kept_percentage
 * @property {Object.<string, number>} bonus_multipliers
 */

/**
 * @typedef {Object} PrestigeReward
 * @property {number} prestige_level
 * @property {number} prestige_points
 * @property {string[]} exclusive_powers
 * @property {Object.<string, number>} permanent_bonuses
 * @property {string[]} cosmetic_rewards
 */

/**
 * @typedef {Object} PlayerPrestige
 * @property {string} player_id
 * @property {number} current_prestige_level
 * @property {number} total_prestiges
 * @property {number} prestige_points
 * @property {boolean} can_prestige
 * @property {Object.<string, any>} next_prestige_requirements
 * @property {string[]} prestige_history
 * @property {Object.<string, number>} permanent_bonuses
 */

/**
 * @typedef {Object} PrestigeEligibility
 * @property {boolean} eligible
 * @property {string} message
 * @property {number} current_level
 * @property {number} current_karma
 * @property {number} current_achievements
 * @property {Object.<string, number>} requirements
 */

export {};
