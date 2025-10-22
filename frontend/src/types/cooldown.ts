/**
 * Cooldown type definitions.
 */

export interface CooldownStatus {
  on_cooldown: boolean;
  can_perform: boolean;
  expires_at?: string;
  remaining_seconds?: number;
  remaining_minutes?: number;
}

export interface ActionCooldown {
  action_type: string;
  expires_at: string;
  remaining_seconds: number;
  remaining_minutes: number;
  set_at: string;
  duration_seconds: number;
}

export interface AllCooldowns {
  [actionType: string]: {
    expires_at: string;
    remaining_seconds: number;
    remaining_minutes: number;
  };
}

export const COOLDOWN_DURATIONS: Record<string, number> = {
  hack: 300,        // 5 minutes
  steal: 600,       // 10 minutes
  help: 60,         // 1 minute
  donate: 120,      // 2 minutes
  trade: 180,       // 3 minutes
  attack: 300,      // 5 minutes
  use_superpower: 3600  // 1 hour
};
