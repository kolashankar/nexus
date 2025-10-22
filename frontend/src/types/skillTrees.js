/**
 * @typedef {Object} SkillNode
 * @property {number} node_id
 * @property {boolean} unlocked
 * @property {string} [unlocked_at]
 * @property {number} level
 */

/**
 * @typedef {Object} SkillTree
 * @property {string} trait_name
 * @property {number} total_points_invested
 * @property {SkillNode[]} nodes
 * @property {'A'|'B'} [active_branch]
 * @property {string} [branch_choice_made_at]
 * @property {number[]} milestones_reached
 * @property {Object.<string, number>} synergy_bonuses
 */

/**
 * @typedef {Object} PlayerSkillTrees
 * @property {string} player_id
 * @property {Object.<string, SkillTree>} skill_trees
 * @property {number} total_skill_points
 * @property {number} total_points_spent
 * @property {number} available_points
 */

/**
 * @typedef {Object} SkillTreeSummary
 * @property {number} total_points
 * @property {number} spent_points
 * @property {number} available_points
 * @property {number} trees_with_investment
 * @property {number} total_milestones
 * @property {number} branches_chosen
 */

/**
 * @typedef {Object} UnlockNodeRequest
 * @property {string} trait_name
 * @property {number} node_id
 */

/**
 * @typedef {Object} ChooseBranchRequest
 * @property {string} trait_name
 * @property {'A'|'B'} branch
 */

export {};
