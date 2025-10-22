/**
 * Action type definitions
 */

/**
 * @typedef {'hack'|'help'|'steal'|'donate'|'trade'} ActionType
 */

/**
 * @typedef {Object} ActionRequest
 * @property {ActionType} action_type
 * @property {string} target_id
 * @property {number} [amount]
 * @property {string} [message]
 */

/**
 * @typedef {Object} ActionResult
 * @property {boolean} success
 * @property {string} message
 * @property {number} karma_change
 * @property {Object.<string, number>} trait_changes
 * @property {Object} [rewards]
 */

/**
 * @typedef {Object} ActionHistory
 * @property {string} id
 * @property {string} player_id
 * @property {ActionType} action_type
 * @property {string} target_id
 * @property {string} timestamp
 * @property {ActionResult} result
 */

/**
 * @typedef {Object} ActionResponse
 * @property {boolean} success
 * @property {string} message
 * @property {any} [data]
 * @property {string} [error]
 */

/**
 * @typedef {Object} AvailableActions
 * @property {boolean} hack
 * @property {boolean} help
 * @property {boolean} steal
 * @property {boolean} donate
 * @property {boolean} trade
 */

export {};
