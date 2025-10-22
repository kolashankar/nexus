/**
 * Centralized 3D model paths configuration
 */

export const MODEL_PATHS = {
  // Character Models
  characters,
      athletic,
      heavy,
    female,
      athletic,
      heavy,

  // Character Animations
  animations,
    walk,
    run,
    jump,
    attack,
    defend,
    victory,
    defeat,
    emotes,
      dance,
      laugh,

  // Robot Models
  robots,
    combat,
    scout,
    guardian,
    assault,
    tactical,
    hacker,
    medic,
    harvester,
    trader,

  // Environment
  environment,
      warehouse,
      shop,
      headquarters,
    props,
      container,
      vehicle,
    terrain,
      platform,

  // UI Elements
  ui,
    interface,

  // Placeholder Models (simple geometries)
  placeholders,
    robot,
    building: '/models/placeholders/building_placeholder.glb'
  }
};

// Texture Paths
export const TEXTURE_PATHS = {
  characters,
    hair,
    clothing,
  robots,
    lights,
  environment,
    walls,
    props,
  effects,
    glow: '/textures/effects/glow/'
  }
};

// Asset Collections for batch loading
export const ASSET_COLLECTIONS = {
  // Essential assets to load on startup
  essential,
    MODEL_PATHS.placeholders.robot,
    MODEL_PATHS.animations.idle,
    MODEL_PATHS.animations.walk
  ],

  // Character creation assets
  characterCreation,
    MODEL_PATHS.characters.female.base,
    MODEL_PATHS.animations.idle,
    MODEL_PATHS.animations.walk,
    MODEL_PATHS.animations.emotes.wave
  ],

  // Combat assets
  combat,
    MODEL_PATHS.animations.defend,
    MODEL_PATHS.animations.victory,
    MODEL_PATHS.animations.defeat
  ],

  // Robot marketplace assets
  robotMarketplace,
    MODEL_PATHS.robots.combat,
    MODEL_PATHS.robots.scout,
    MODEL_PATHS.robots.guardian
  ],

  // Environment assets
  worldEnvironment,
    MODEL_PATHS.environment.terrain.platform,
    MODEL_PATHS.environment.buildings.tower
  ]
};

/**
 * Get model path by category and type
 */
export function getModelPath(category, type){
  const paths: any = MODEL_PATHS;
  return paths[category]?.[type];
}

/**
 * Get all paths in a category
 */
export function getCategoryPaths(category){
  const paths: any = MODEL_PATHS;
  const categoryData = paths[category];
  
  if (!categoryData) return [];

  const result: string[] = [];
  
  function extractPaths(obj) {
    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        result.push(obj[key]);
      } else if (typeof obj[key] === 'object') {
        extractPaths(obj[key]);
      }
    }
  }

  extractPaths(categoryData);
  return result;
}
