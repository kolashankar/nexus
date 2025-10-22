export enum RelationshipType {
  ALLIANCE = 'alliance',
  RIVAL = 'rival',
  MARRIAGE = 'marriage',
  MENTORSHIP = 'mentorship',
  FRIEND = 'friend',
  ENEMY = 'enemy'
}

export interface Relationship {
  id: string;
  type: RelationshipType;
  player1_id: string;
  player2_id: string;
  created_at: string;
  ended_at: string | null;
  active: boolean;
  metadata: Record<string, any>;
}

export interface Alliance {
  id: string;
  members: string[];
  created_at: string;
  alliance_name: string | null;
  shared_xp: boolean;
  shared_karma: boolean;
}

export interface Marriage {
  id: string;
  player1_id: string;
  player2_id: string;
  married_at: string;
  divorced_at: string | null;
  active: boolean;
  shared_resources: boolean;
  shared_xp_bonus: number;
  joint_karma: number;
}

export interface Mentorship {
  id: string;
  mentor_id: string;
  apprentice_id: string;
  started_at: string;
  graduated_at: string | null;
  active: boolean;
  apprentice_level: number;
  lessons_completed: number;
  mentor_legacy_points: number;
  apprentice_xp_bonus: number;
}

export interface MarriageProposal {
  _id: string;
  proposer_id: string;
  proposed_to_id: string;
  proposed_at: string;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface MentorshipRequest {
  _id: string;
  apprentice_id: string;
  mentor_id: string;
  requested_at: string;
  status: 'pending' | 'accepted' | 'rejected';
}
