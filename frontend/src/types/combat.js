/**
 * @typedef {Object} StatusEffect
 * @property {string} type
 * @property {number} [value]
 * @property {number} [duration]
 */

/**
 * @typedef {Object} CombatStats
 * @property {number} hp
 * @property {number} max_hp
 * @property {number} attack
 * @property {number} defense
 * @property {number} speed
 * @property {number} evasion
 * @property {number} critical_chance
 */

/**
 * @typedef {Object} BattleParticipant
 * @property {string} player_id
 * @property {string} username
 * @property {number} hp
 * @property {number} max_hp
 * @property {number} action_points
 * @property {number} max_action_points
 * @property {number} initiative
 * @property {number} position
 * @property {StatusEffect[]} status_effects
 * @property {CombatStats} combat_stats
 * @property {string[]} equipped_abilities
 * @property {boolean} has_fled
 */

/**
 * @typedef {Object} BattleAction
 * @property {string} action_id
 * @property {string} actor_id
 * @property {string} action_type
 * @property {string} [target_id]
 * @property {string} [ability_name]
 * @property {number} ap_cost
 * @property {number} [damage]
 * @property {any[]} effects
 * @property {boolean} success
 * @property {string} description
 * @property {string} timestamp
 */

/**
 * @typedef {Object} Battle
 * @property {string} battle_id
 * @property {string} battle_type
 * @property {string} status
 * @property {BattleParticipant[]} participants
 * @property {string} attacker_id
 * @property {string} defender_id
 * @property {number} current_turn
 * @property {string} [active_participant_id]
 * @property {any[]} turn_history
 * @property {string} created_at
 * @property {string} [started_at]
 * @property {string} [ended_at]
 * @property {string} [winner_id]
 * @property {string} [loser_id]
 * @property {string} [victory_type]
 * @property {any} [rewards]
 * @property {number} max_turns
 * @property {number} turn_timeout
 * @property {boolean} [ranked]
 */

/**
 * @typedef {Object} CombatAbility
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {number} ap_cost
 * @property {string} target
 * @property {string} [effect_type]
 */

/**
 * @typedef {Object} Tournament
 * @property {string} tournament_id
 * @property {string} name
 * @property {string} description
 * @property {string} tournament_type
 * @property {number} max_participants
 * @property {string[]} participants
 * @property {string} status
 * @property {number} current_round
 * @property {any} prize_pool
 * @property {string} created_at
 * @property {string} [starts_at]
 */

export {};
