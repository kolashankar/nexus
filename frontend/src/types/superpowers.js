/**
 * Superpower tiers
 */
export const PowerTier = {
  TIER_1: 'tier_1',
  TIER_2: 'tier_2',
  TIER_3: 'tier_3',
  TIER_4: 'tier_4',
  TIER_5: 'tier_5',
};

/**
 * @typedef {Object} SuperpowerDefinition
 * @property {string} power_id
 * @property {string} name
 * @property {string} description
 * @property {string} tier
 * @property {Object.<string, number>} requirements
 * @property {number} cooldown_seconds
 * @property {number} energy_cost
 * @property {Object.<string, any>} [effects]
 */

/**
 * @typedef {Object} UnlockedSuperpower
 * @property {string} power_id
 * @property {string} unlocked_at
 * @property {number} usage_count
 * @property {string} [last_used_at]
 * @property {string} [cooldown_until]
 * @property {number} level
 * @property {number} mastery
 */

/**
 * @typedef {Object} PlayerSuperpowers
 * @property {string} player_id
 * @property {UnlockedSuperpower[]} unlocked_powers
 * @property {string[]} equipped_powers
 * @property {number} total_powers_unlocked
 */

/**
 * @typedef {Object} AvailablePower
 * @property {string} power_id
 * @property {string} name
 * @property {string} description
 * @property {string} tier
 * @property {boolean} eligible
 * @property {Object.<string, number>} requirements
 * @property {string} message
 */

export {};
