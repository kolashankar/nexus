/**
 * Cooldown type definitions.
 */

/**
 * @typedef {Object} CooldownStatus
 * @property {boolean} on_cooldown
 * @property {boolean} can_perform
 * @property {string} [expires_at]
 * @property {number} [remaining_seconds]
 * @property {number} [remaining_minutes]
 */

/**
 * @typedef {Object} ActionCooldown
 * @property {string} action_type
 * @property {string} expires_at
 * @property {number} remaining_seconds
 * @property {number} remaining_minutes
 * @property {string} set_at
 * @property {number} duration_seconds
 */

/**
 * @typedef {Object.<string, {expires_at: string, remaining_seconds: number, remaining_minutes: number}>} AllCooldowns
 */

export const COOLDOWN_DURATIONS = {
  hack: 300,        // 5 minutes
  steal: 600,       // 10 minutes
  help: 60,         // 1 minute
  donate: 120,      // 2 minutes
  trade: 180,       // 3 minutes
  attack: 300,      // 5 minutes
  use_superpower: 3600  // 1 hour
};
