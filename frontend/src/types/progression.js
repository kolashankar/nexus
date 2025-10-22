/**
 * @typedef {Object} SkillNode
 * @property {number} node_id
 * @property {number} level_required
 * @property {'stat'|'ability'|'passive'} bonus_type
 * @property {any} bonus_value
 * @property {'A'|'B'|null} branch
 * @property {boolean} unlocked
 */

/**
 * @typedef {Object} SkillTree
 * @property {string} trait_name
 * @property {SkillNode[]} nodes
 * @property {number} total_nodes
 * @property {number} unlocked_nodes
 * @property {'A'|'B'|null} active_branch
 */

/**
 * @typedef {Object} Superpower
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {1|2|3|4|5} tier
 * @property {boolean} unlocked
 * @property {number} cooldown
 * @property {number} current_cooldown
 * @property {number} duration
 * @property {Object.<string, any>} effects
 * @property {Object.<string, number>} unlock_conditions
 * @property {number} usage_count
 * @property {Object.<string, number>} cost
 */

/**
 * @typedef {Object} Achievement
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {string} category
 * @property {Object.<string, any>} condition
 * @property {Object.<string, number>} rewards
 * @property {boolean} unlocked
 * @property {string} [unlocked_at]
 * @property {number} [progress]
 * @property {number} [total]
 * @property {boolean} hidden
 */

/**
 * @typedef {Object} PrestigeLevel
 * @property {number} level
 * @property {string} name
 * @property {Object} requirements
 * @property {Object} reset_effects
 * @property {Object.<string, number>} permanent_bonuses
 * @property {number} prestige_points_awarded
 * @property {string[]} unlocks
 */

/**
 * @typedef {Object} PrestigeData
 * @property {number} current_level
 * @property {PrestigeLevel} next_level_config
 * @property {boolean} can_prestige
 * @property {number} total_prestige_points
 * @property {Object.<string, number>} active_bonuses
 */

/**
 * @typedef {Object} LegacyPerk
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {Object.<string, number>} cost
 * @property {number} max_level
 * @property {number} current_level
 * @property {Object.<string, number>} bonus_per_level
 * @property {boolean} cumulative
 */

/**
 * @typedef {Object} ProgressionData
 * @property {number} level
 * @property {number} xp
 * @property {number} xp_for_next
 * @property {number} prestige_level
 * @property {Object.<string, SkillTree>} skill_trees
 * @property {Superpower[]} superpowers
 * @property {Achievement[]} achievements
 * @property {number} achievements_unlocked
 * @property {number} total_achievements
 * @property {PrestigeData} prestige_data
 * @property {LegacyPerk[]} legacy_perks
 */

export {};
