/**
 * Relationship types
 */
export const RelationshipType = {
  ALLIANCE: 'alliance',
  RIVAL: 'rival',
  MARRIAGE: 'marriage',
  MENTORSHIP: 'mentorship',
  FRIEND: 'friend',
  ENEMY: 'enemy'
};

/**
 * @typedef {Object} Relationship
 * @property {string} id
 * @property {string} type
 * @property {string} player1_id
 * @property {string} player2_id
 * @property {string} created_at
 * @property {string|null} ended_at
 * @property {boolean} active
 * @property {Object.<string, any>} metadata
 */

/**
 * @typedef {Object} Alliance
 * @property {string} id
 * @property {string[]} members
 * @property {string} created_at
 * @property {string|null} alliance_name
 * @property {boolean} shared_xp
 * @property {boolean} shared_karma
 */

/**
 * @typedef {Object} Marriage
 * @property {string} id
 * @property {string} player1_id
 * @property {string} player2_id
 * @property {string} married_at
 * @property {string|null} divorced_at
 * @property {boolean} active
 * @property {boolean} shared_resources
 * @property {number} shared_xp_bonus
 * @property {number} joint_karma
 */

/**
 * @typedef {Object} Mentorship
 * @property {string} id
 * @property {string} mentor_id
 * @property {string} apprentice_id
 * @property {string} started_at
 * @property {string|null} graduated_at
 * @property {boolean} active
 * @property {number} apprentice_level
 * @property {number} lessons_completed
 * @property {number} mentor_legacy_points
 * @property {number} apprentice_xp_bonus
 */

/**
 * @typedef {Object} MarriageProposal
 * @property {string} _id
 * @property {string} proposer_id
 * @property {string} proposed_to_id
 * @property {string} proposed_at
 * @property {'pending'|'accepted'|'rejected'} status
 */

/**
 * @typedef {Object} MentorshipRequest
 * @property {string} _id
 * @property {string} apprentice_id
 * @property {string} mentor_id
 * @property {string} requested_at
 * @property {'pending'|'accepted'|'rejected'} status
 */
