export interface Superpower {
  name: string;
  tier: number;
  unlocked: boolean;
  unlocked_at?: string;
  usage_count: number;
  cooldown_until?: string;
  requirements: Record<string, number>;
  description: string;
}

export interface SuperpowerConfig {
  name: string;
  tier: number;
  description: string;
  requirements: Record<string, number>;
  cooldown_minutes: number;
  effects: any;
}
