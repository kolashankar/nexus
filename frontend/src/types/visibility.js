/**
 * Visibility and privacy type definitions.
 */

/**
 * @typedef {'public'|'selective'|'private'|'ghost'|'phantom'} PrivacyTier
 */

/**
 * @typedef {Object} VisibilitySettings
 * @property {PrivacyTier} privacy_tier
 * @property {boolean} cash
 * @property {boolean} economic_class
 * @property {boolean} moral_class
 * @property {string[]} traits_public
 * @property {boolean} superpowers
 * @property {boolean} karma_score
 * @property {boolean} guild
 * @property {boolean} location
 * @property {boolean} relationships
 * @property {boolean} online_status
 */

/**
 * @typedef {Object} PrivacyTierInfo
 * @property {PrivacyTier} tier
 * @property {string} name
 * @property {string} description
 * @property {number} cost_per_month
 * @property {string[]} features
 * @property {number} detection_resistance
 */

export const PRIVACY_TIER_DETAILS = {
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

/**
 * @typedef {Object} VisibilityCheckResult
 * @property {boolean} can_view
 * @property {number} viewer_perception
 * @property {number} target_privacy_level
 * @property {string[]} hidden_fields
 * @property {boolean} detection_success
 */

export {};
