/**
 * Player statistics type definitions.
 */

/**
 * @typedef {Object} CombatStats
 * @property {number} hp
 * @property {number} max_hp
 * @property {number} attack
 * @property {number} defense
 * @property {number} evasion
 * @property {number} crit_chance
 * @property {number} combat_rating
 */

/**
 * @typedef {Object} DerivedTraits
 * @property {number} reputation
 * @property {number} influence
 * @property {number} trustworthiness
 * @property {number} business_acumen
 * @property {number} market_intuition
 * @property {number} wealth_management
 * @property {number} enlightenment
 * @property {number} karmic_balance
 * @property {number} divine_favor
 * @property {number} fame
 * @property {number} infamy
 */

/**
 * @typedef {Object} LevelProgress
 * @property {number} level
 * @property {number} xp
 * @property {number} xp_needed_for_next
 * @property {number} xp_in_current_level
 * @property {number} level_progress_percentage
 * @property {number} next_level_xp_threshold
 */

/**
 * @typedef {Object} PlayerStats
 * @property {string} player_id
 * @property {string} username
 * @property {number} level
 * @property {CombatStats} combat_stats
 * @property {DerivedTraits} derived_traits
 * @property {LevelProgress} level_progress
 * @property {string} calculated_at
 */

/**
 * @typedef {Object} StatRequirement
 * @property {string} trait
 * @property {number} required
 * @property {number} current
 * @property {number} difference
 */

/**
 * @typedef {Object} PowerUnlockRequirements
 * @property {boolean} unlockable
 * @property {StatRequirement[]} missing_requirements
 * @property {number} progress_percentage
 */

/**
 * @typedef {Object} StatsUpdate
 * @property {'combat'|'derived'|'trait'} stat_type
 * @property {string} stat_name
 * @property {number} old_value
 * @property {number} new_value
 * @property {number} change
 * @property {string} reason
 * @property {string} timestamp
 */

export {};
