export interface SkillNode {
  node_id: number;
  name: string;
  description: string;
  unlocked: boolean;
  requirements: {
    level?: number;
    trait_value?: number;
  };
}

export interface SkillTree {
  trait_name: string;
  nodes_unlocked: number[];
  active_branch?: string;
  total_points: number;
  nodes: SkillNode[];
}

export interface UnlockNodeRequest {
  trait_name: string;
  node_id: number;
}
