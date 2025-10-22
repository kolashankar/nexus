/**
 * Game configuration
 */

export const GAME_CONFIG = {
  // Player defaults
  DEFAULT_LEVEL,
  DEFAULT_XP,
  DEFAULT_KARMA,
  DEFAULT_CREDITS,
  
  // Trait defaults
  DEFAULT_TRAIT_VALUE,
  MIN_TRAIT_VALUE,
  MAX_TRAIT_VALUE,
  
  // Combat
  BASE_HP,
  BASE_ATTACK,
  BASE_DEFENSE,
  
  // Economy
  CURRENCIES,
    'karma_tokens',
    'dark_matter',
    'prestige_points',
    'guild_coins',
    'legacy_shards',
  ],
  
  // Leveling
  XP_PER_LEVEL,
  MAX_LEVEL,
  
  // Karma thresholds
  GOOD_KARMA_THRESHOLD,
  BAD_KARMA_THRESHOLD,
  
  // Economic class thresholds
  RICH_THRESHOLD,
  MIDDLE_THRESHOLD,
  
  // 3D Settings
  ENABLE_3D,
  ENABLE_SHADOWS,
  ENABLE_PARTICLES,
  
  // WebSocket
  WS_RECONNECT_ATTEMPTS,
  WS_RECONNECT_DELAY,
};

export default GAME_CONFIG;
