/**
 * @typedef {Object} KarmaEvent
 * @property {string} _id
 * @property {string} event_type
 * @property {string} player_id
 * @property {number} karma_change
 * @property {string} description
 * @property {any} [metadata]
 * @property {string} timestamp
 */

/**
 * @typedef {Object} KarmaScore
 * @property {number} karma_points
 * @property {'good'|'average'|'bad'} moral_class
 * @property {'rising'|'falling'|'stable'} karma_trend
 */

/**
 * @typedef {Object} WorldKarmaState
 * @property {number} collective_karma
 * @property {'rising'|'falling'|'stable'} karma_trend
 * @property {Object} [active_event]
 */

export {};
