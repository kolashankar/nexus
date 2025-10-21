/**
 * Route definitions
 */

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  GAME: '/game',
  COMBAT: '/combat',
  GUILDS: '/guilds',
  MARKETPLACE: '/marketplace',
  QUESTS: '/quests',
  LEADERBOARDS: '/leaderboards',
  SETTINGS: '/settings',
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = typeof ROUTES[RouteKey];
