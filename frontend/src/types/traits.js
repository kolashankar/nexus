/**
 * Trait type definitions
 */

/**
 * @typedef {'virtue'|'vice'|'skill'} TraitCategory
 */

/**
 * @typedef {Object} TraitDefinition
 * @property {string} id
 * @property {string} name
 * @property {TraitCategory} category
 * @property {string} description
 * @property {string} [icon]
 */

/**
 * @typedef {Object} TraitProgress
 * @property {string} trait_id
 * @property {number} current_value
 * @property {number} previous_value
 * @property {number} change
 * @property {number} level
 */

export const TRAIT_CATEGORIES = {
  virtue: 'Virtue',
  vice: 'Vice',
  skill: 'Skill',
};

export const TRAIT_DEFINITIONS = [
  // Virtues
  { id: 'empathy', name: 'Empathy', category: 'virtue', description: 'Feel others emotions' },
  { id: 'integrity', name: 'Integrity', category: 'virtue', description: 'Moral principles' },
  { id: 'discipline', name: 'Discipline', category: 'virtue', description: 'Self-control' },
  // Add more trait definitions as needed
];
