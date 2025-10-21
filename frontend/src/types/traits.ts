/**
 * Trait type definitions
 */

export type TraitCategory = 'virtue' | 'vice' | 'skill';

export interface TraitDefinition {
  id: string;
  name: string;
  category: TraitCategory;
  description: string;
  icon?: string;
}

export interface TraitProgress {
  trait_id: string;
  current_value: number;
  previous_value: number;
  change: number;
  level: number;
}

export const TRAIT_CATEGORIES: Record<TraitCategory, string> = {
  virtue: 'Virtue',
  vice: 'Vice',
  skill: 'Skill',
};

export const TRAIT_DEFINITIONS: TraitDefinition[] = [
  // Virtues
  { id: 'empathy', name: 'Empathy', category: 'virtue', description: 'Feel others emotions' },
  { id: 'integrity', name: 'Integrity', category: 'virtue', description: 'Moral principles' },
  { id: 'discipline', name: 'Discipline', category: 'virtue', description: 'Self-control' },
  // Add more trait definitions as needed
];
