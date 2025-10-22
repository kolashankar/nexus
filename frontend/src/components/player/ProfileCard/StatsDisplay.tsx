import React from 'react';
import { Progress } from '@/components/ui/progress';

interface StatsDisplayProps {
  player: any;
}

const StatsDisplay: React.FC<StatsDisplayProps> = ({ player }) => {
  // Calculate XP progress
  const calculateXPProgress = () => {
    const xpForCurrentLevel = 100 * (player.level ** 2);
    const xpForNextLevel = 100 * ((player.level + 1) ** 2);
    const xpInLevel = player.xp - xpForCurrentLevel;
    const xpNeeded = xpForNextLevel - xpForCurrentLevel;
    return (xpInLevel / xpNeeded) * 100;
  };

  const xpProgress = calculateXPProgress();

  return (
    <div className="space-y-4">
      {/* XP Progress */}
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span className="font-medium text-gray-700">Experience</span>
          <span className="text-gray-600">
            {player.xp} XP
          </span>
        </div>
        <Progress value={xpProgress} className="h-3" />
        <div className="text-xs text-gray-500 mt-1 text-right">
          {Math.round(xpProgress)}% to Level {player.level + 1}
        </div>
      </div>

      {/* Player Stats */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="text-xs text-gray-600">Total Actions</div>
          <div className="text-xl font-bold text-gray-800">
            {player.stats?.total_actions || 0}
          </div>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="text-xs text-gray-600">PvP Wins</div>
          <div className="text-xl font-bold text-gray-800">
            {player.stats?.pvp_wins || 0}
          </div>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="text-xs text-gray-600">Quests Done</div>
          <div className="text-xl font-bold text-gray-800">
            {player.stats?.quests_completed || 0}
          </div>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="text-xs text-gray-600">Robots Owned</div>
          <div className="text-xl font-bold text-gray-800">
            {player.stats?.robots_owned || 0}
          </div>
        </div>
      </div>

      {/* Prestige Level */}
      {player.prestige_level > 0 && (
        <div className="mt-3 p-3 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg border-2 border-yellow-300">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">Prestige Level</span>
            <span className="text-2xl font-bold text-orange-600">
              ★ {player.prestige_level}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsDisplay;