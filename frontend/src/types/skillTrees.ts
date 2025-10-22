export interface SkillNode {
  node_id: number;
  unlocked: boolean;
  unlocked_at?: string;
  level: number;
}

export interface SkillTree {
  trait_name: string;
  total_points_invested: number;
  nodes: SkillNode[];
  active_branch?: 'A' | 'B';
  branch_choice_made_at?: string;
  milestones_reached: number[];
  synergy_bonuses: Record<string, number>;
}

export interface PlayerSkillTrees {
  player_id: string;
  skill_trees: Record<string, SkillTree>;
  total_skill_points: number;
  total_points_spent: number;
  available_points: number;
}

export interface SkillTreeSummary {
  total_points: number;
  spent_points: number;
  available_points: number;
  trees_with_investment: number;
  total_milestones: number;
  branches_chosen: number;
}

export interface UnlockNodeRequest {
  trait_name: string;
  node_id: number;
}

export interface ChooseBranchRequest {
  trait_name: string;
  branch: 'A' | 'B';
}
