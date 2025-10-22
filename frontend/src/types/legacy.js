/**
 * @typedef {Object} LegacyTitle
 * @property {string} title_id
 * @property {string} name
 * @property {string} description
 * @property {string} earned_at
 * @property {number} season_earned
 * @property {boolean} permanent
 */

/**
 * @typedef {Object} HeirloomItem
 * @property {string} item_id
 * @property {string} name
 * @property {string} description
 * @property {number} power_level
 * @property {boolean} transferable
 * @property {number} season_acquired
 */

/**
 * @typedef {Object} LegacyPerk
 * @property {string} perk_id
 * @property {string} name
 * @property {string} description
 * @property {string} bonus_type
 * @property {number} bonus_value
 * @property {number} cost
 * @property {boolean} unlocked
 */

/**
 * @typedef {Object} PlayerLegacy
 * @property {string} account_id
 * @property {number} legacy_points
 * @property {number} lifetime_legacy_points
 * @property {number} legacy_level
 * @property {LegacyTitle[]} earned_titles
 * @property {string} [active_title]
 * @property {HeirloomItem[]} heirloom_items
 * @property {LegacyPerk[]} unlocked_perks
 * @property {string[]} active_perks
 * @property {number} seasons_played
 * @property {number} total_characters_created
 * @property {number} highest_karma_achieved
 * @property {number} total_achievements
 * @property {number} mentorship_level
 * @property {number} apprentices_taught
 * @property {number} mentorship_rewards_earned
 */

/**
 * @typedef {Object} LegacySummary
 * @property {number} legacy_level
 * @property {number} legacy_points
 * @property {number} lifetime_points
 * @property {number} seasons_played
 * @property {number} titles_earned
 * @property {string} [active_title]
 * @property {number} heirlooms
 * @property {number} unlocked_perks
 * @property {string[]} active_perks
 * @property {number} mentorship_level
 * @property {number} apprentices_taught
 * @property {number} achievements
 */

/**
 * @typedef {Object} NewCharacterBonuses
 * @property {number} xp_multiplier
 * @property {number} karma_multiplier
 * @property {number} trait_multiplier
 * @property {number} starting_credits
 * @property {number} starting_skill_points
 */

export {};
