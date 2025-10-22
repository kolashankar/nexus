export enum GuildRank {
  LEADER = 'leader',
  OFFICER = 'officer',
  VETERAN = 'veteran',
  MEMBER = 'member',
  RECRUIT = 'recruit'
}

export interface GuildMember {
  player_id: string;
  rank: GuildRank;
  joined_at: string;
  contribution: number;
}

export interface Guild {
  id: string;
  name: string;
  tag: string;
  description: string;
  leader_id: string;
  created_at: string;
  members: GuildMember[];
  total_members: number;
  max_members: number;
  level: number;
  xp: number;
  guild_bank: {
    credits: number;
    resources: Record<string, number>;
  };
  controlled_territories: number[];
  guild_karma: number;
  unlocked_skills: string[];
  active_wars: any[];
  recruitment_open: boolean;
  emblem: string;
  reputation: number;
}

export interface Territory {
  territory_id: number;
  name: string;
  description: string;
  controlling_guild_id: string | null;
  controlled_since: string | null;
  contested: boolean;
  passive_income: number;
  resource_bonus: Record<string, number>;
  defense_level: number;
  last_attacked: string | null;
  x: number;
  y: number;
}

export enum WarStatus {
  ACTIVE = 'active',
  PEACE_NEGOTIATION = 'peace_negotiation',
  ENDED = 'ended'
}

export interface GuildWar {
  id: string;
  attacker_guild_id: string;
  defender_guild_id: string;
  started_at: string;
  ended_at: string | null;
  status: WarStatus;
  attacker_points: number;
  defender_points: number;
  target_territory: number | null;
  peace_offer: any | null;
  peace_offered_by: string | null;
  winner_guild_id: string | null;
}
