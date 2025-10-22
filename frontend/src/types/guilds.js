/**
 * Guild ranks
 */
export const GuildRank = {
  LEADER: 'leader',
  OFFICER: 'officer',
  VETERAN: 'veteran',
  MEMBER: 'member',
  RECRUIT: 'recruit'
};

/**
 * War status
 */
export const WarStatus = {
  ACTIVE: 'active',
  PEACE_NEGOTIATION: 'peace_negotiation',
  ENDED: 'ended'
};

/**
 * @typedef {Object} GuildMember
 * @property {string} player_id
 * @property {string} rank
 * @property {string} joined_at
 * @property {number} contribution
 */

/**
 * @typedef {Object} Guild
 * @property {string} id
 * @property {string} name
 * @property {string} tag
 * @property {string} description
 * @property {string} leader_id
 * @property {string} created_at
 * @property {GuildMember[]} members
 * @property {number} total_members
 * @property {number} max_members
 * @property {number} level
 * @property {number} xp
 * @property {Object} guild_bank
 * @property {number[]} controlled_territories
 * @property {number} guild_karma
 * @property {string[]} unlocked_skills
 * @property {any[]} active_wars
 * @property {boolean} recruitment_open
 * @property {string} emblem
 * @property {number} reputation
 */

/**
 * @typedef {Object} Territory
 * @property {number} territory_id
 * @property {string} name
 * @property {string} description
 * @property {string|null} controlling_guild_id
 * @property {string|null} controlled_since
 * @property {boolean} contested
 * @property {number} passive_income
 * @property {Object.<string, number>} resource_bonus
 * @property {number} defense_level
 * @property {string|null} last_attacked
 * @property {number} x
 * @property {number} y
 */

/**
 * @typedef {Object} GuildWar
 * @property {string} id
 * @property {string} attacker_guild_id
 * @property {string} defender_guild_id
 * @property {string} started_at
 * @property {string|null} ended_at
 * @property {string} status
 * @property {number} attacker_points
 * @property {number} defender_points
 * @property {number|null} target_territory
 * @property {any|null} peace_offer
 * @property {string|null} peace_offered_by
 * @property {string|null} winner_guild_id
 */
