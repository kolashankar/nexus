/**
 * Player type definitions
 */

export interface PlayerTraits {
  // Virtues (1-20)
  empathy: number;
  integrity: number;
  discipline: number;
  creativity: number;
  resilience: number;
  curiosity: number;
  kindness: number;
  courage: number;
  patience: number;
  adaptability: number;
  wisdom: number;
  humility: number;
  vision: number;
  honesty: number;
  loyalty: number;
  generosity: number;
  self_awareness: number;
  gratitude: number;
  optimism: number;
  loveability: number;

  // Vices (21-40)
  greed: number;
  arrogance: number;
  deceit: number;
  cruelty: number;
  selfishness: number;
  envy: number;
  wrath: number;
  cowardice: number;
  laziness: number;
  gluttony: number;
  paranoia: number;
  impulsiveness: number;
  vengefulness: number;
  manipulation: number;
  prejudice: number;
  betrayal: number;
  stubbornness: number;
  pessimism: number;
  recklessness: number;
  vanity: number;

  // Skills (41-60)
  hacking: number;
  negotiation: number;
  stealth: number;
  leadership: number;
  technical_knowledge: number;
  physical_strength: number;
  speed: number;
  intelligence: number;
  charisma: number;
  perception: number;
  endurance: number;
  dexterity: number;
  memory: number;
  focus: number;
  networking: number;
  strategy: number;
  trading: number;
  engineering: number;
  medicine: number;
  meditation: number;
}

export interface MetaTraits {
  // Social Meta Traits
  reputation: number;
  influence: number;
  fame: number;
  infamy: number;
  trustworthiness: number;

  // Combat Meta Traits
  combat_rating: number;
  tactical_mastery: number;
  survival_instinct: number;

  // Economic Meta Traits
  business_acumen: number;
  market_intuition: number;
  wealth_management: number;

  // Spiritual Meta Traits
  enlightenment: number;
  karmic_balance: number;
  divine_favor: number;

  // Guild Meta Traits
  guild_loyalty: number;
  political_power: number;
  diplomatic_skill: number;

  // Legacy Meta Traits
  legendary_status: number;
  mentorship: number;
  historical_impact: number;
}

export interface PlayerCurrencies {
  credits: number;
  karma_tokens: number;
  dark_matter: number;
  prestige_points: number;
  guild_coins: number;
  legacy_shards: number;
}

export interface Player {
  id: string;
  username: string;
  email: string;
  level: number;
  xp: number;
  karma_points: number;
  economic_class: 'rich' | 'middle' | 'poor';
  moral_class: 'good' | 'average' | 'bad';
  currencies: PlayerCurrencies;
  traits: PlayerTraits;
  meta_traits: MetaTraits;
  online: boolean;
  created_at: string;
  last_action: string;
  guild_id?: string;
  guild_rank?: string;
}

export interface PlayerStats {
  total_actions: number;
  total_stolen: number;
  total_donated: number;
  pvp_wins: number;
  pvp_losses: number;
  quests_completed: number;
  guilds_joined: number;
  robots_owned: number;
  marriages: number;
}
