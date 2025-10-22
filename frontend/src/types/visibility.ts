/**
 * Visibility and privacy type definitions.
 */

export type PrivacyTier = 'public' | 'selective' | 'private' | 'ghost' | 'phantom';

export interface VisibilitySettings {
  privacy_tier: PrivacyTier;
  cash: boolean;
  economic_class: boolean;
  moral_class: boolean;
  traits_public: string[];
  superpowers: boolean;
  karma_score: boolean;
  guild: boolean;
  location: boolean;
  relationships: boolean;
  online_status: boolean;
}

export interface PrivacyTierInfo {
  tier: PrivacyTier;
  name: string;
  description: string;
  cost_per_month: number;
  features: string[];
  detection_resistance: number;
}

export const PRIVACY_TIER_DETAILS: Record<PrivacyTier, PrivacyTierInfo> = {
  public: {
    tier: 'public',
    name: 'Public',
    description: 'Everything visible to all players',
    cost_per_month: 0,
    features: [
      'All information visible',
      'No privacy protection',
      'Can be easily tracked'
    ],
    detection_resistance: 0
  },
  selective: {
    tier: 'selective',
    name: 'Selective',
    description: 'Choose what information to share',
    cost_per_month: 100,
    features: [
      'Customize visibility settings',
      'Hide specific information',
      'Basic privacy protection'
    ],
    detection_resistance: 25
  },
  private: {
    tier: 'private',
    name: 'Private',
    description: 'Most information hidden by default',
    cost_per_month: 500,
    features: [
      'Most data hidden',
      'Only basic info visible',
      'Good privacy protection'
    ],
    detection_resistance: 50
  },
  ghost: {
    tier: 'ghost',
    name: 'Ghost',
    description: 'Nearly invisible to other players',
    cost_per_month: 1000,
    features: [
      'Minimal visibility',
      'Hard to track',
      'Strong privacy protection'
    ],
    detection_resistance: 75
  },
  phantom: {
    tier: 'phantom',
    name: 'Phantom',
    description: 'Maximum privacy and anonymity',
    cost_per_month: 2500,
    features: [
      'Nearly untraceable',
      'Maximum privacy',
      'Elite detection resistance'
    ],
    detection_resistance: 95
  }
};

export interface VisibilityCheckResult {
  can_view: boolean;
  viewer_perception: number;
  target_privacy_level: number;
  hidden_fields: string[];
  detection_success: boolean;
}
