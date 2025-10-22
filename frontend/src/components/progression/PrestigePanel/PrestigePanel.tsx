import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Sparkles, Trophy, Star, AlertTriangle } from 'lucide-react';

interface PrestigeLevel {
  level: number;
  name: string;
  requirements: {
    min_player_level: number;
    karma_threshold: number;
    achievements_required: number;
  };
  permanent_bonuses: Record<string, number>;
  prestige_points_awarded: number;
  unlocks: string[];
}

interface PrestigePanelProps {
  currentPrestige: number;
  playerLevel: number;
  karmaPoints: number;
  achievementsUnlocked: number;
  prestigeConfig: PrestigeLevel;
  onPrestige: () => void;
}

export const PrestigePanel: React.FC<PrestigePanelProps> = ({
  currentPrestige,
  playerLevel,
  karmaPoints,
  achievementsUnlocked,
  prestigeConfig,
  onPrestige
}) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const requirements = prestigeConfig.requirements;
  const meetsLevelReq = playerLevel >= requirements.min_player_level;
  const meetsKarmaReq = Math.abs(karmaPoints) >= requirements.karma_threshold;
  const meetsAchievementReq = achievementsUnlocked >= requirements.achievements_required;
  const canPrestige = meetsLevelReq && meetsKarmaReq && meetsAchievementReq;

  const getRequirementColor = (met: boolean) => met ? 'text-green-500' : 'text-red-500';

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-purple-500" />
          Prestige System
        </CardTitle>
        <CardDescription>
          Reset your progress for permanent bonuses and exclusive rewards
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Prestige */}
        <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Current Prestige</p>
            <p className="text-2xl font-bold">{prestigeConfig.name}</p>
          </div>
          <Badge variant="outline" className="text-lg px-4 py-2">
            <Trophy className="w-4 h-4 mr-2" />
            Level {currentPrestige}
          </Badge>
        </div>

        {/* Next Prestige Requirements */}
        <div>
          <h3 className="font-semibold mb-3">Requirements for Next Prestige</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900 rounded">
              <span className="text-sm">Player Level</span>
              <span className={`font-semibold ${getRequirementColor(meetsLevelReq)}`}>
                {playerLevel} / {requirements.min_player_level}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900 rounded">
              <span className="text-sm">Karma Points</span>
              <span className={`font-semibold ${getRequirementColor(meetsKarmaReq)}`}>
                {Math.abs(karmaPoints)} / {requirements.karma_threshold}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900 rounded">
              <span className="text-sm">Achievements</span>
              <span className={`font-semibold ${getRequirementColor(meetsAchievementReq)}`}>
                {achievementsUnlocked} / {requirements.achievements_required}
              </span>
            </div>
          </div>
        </div>

        {/* Permanent Bonuses */}
        <div>
          <h3 className="font-semibold mb-3">Permanent Bonuses</h3>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(prestigeConfig.permanent_bonuses).map(([key, value]) => (
              <div key={key} className="p-2 bg-green-50 dark:bg-green-950 rounded text-sm">
                <Star className="w-3 h-3 inline mr-1 text-yellow-500" />
                <span className="font-medium">
                  {key.replace(/_/g, ' ')}: +{(value * 100).toFixed(0)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Unlocks */}
        <div>
          <h3 className="font-semibold mb-3">Unlocks</h3>
          <div className="space-y-1">
            {prestigeConfig.unlocks.map((unlock) => (
              <div key={unlock} className="text-sm p-2 bg-blue-50 dark:bg-blue-950 rounded">
                • {unlock.replace(/_/g, ' ')}
              </div>
            ))}
          </div>
        </div>

        {/* Prestige Points Award */}
        <div className="p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">Prestige Points Awarded</p>
          <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
            +{prestigeConfig.prestige_points_awarded}
          </p>
        </div>

        {/* Warning */}
        <Alert variant="destructive">
          <AlertTriangle className="w-4 h-4" />
          <AlertDescription>
            <strong>Warning:</strong> Prestiging will reset your character level and traits (keeping {(prestigeConfig.reset_effects?.keep_percentage || 0) * 100}%).
            Some currencies and items will be lost. This action cannot be undone!
          </AlertDescription>
        </Alert>

        {/* Prestige Button */}
        {!confirmOpen ? (
          <Button
            className="w-full"
            size="lg"
            disabled={!canPrestige}
            onClick={() => setConfirmOpen(true)}
          >
            {canPrestige ? 'Prestige Now' : 'Requirements Not Met'}
          </Button>
        ) : (
          <div className="space-y-2">
            <Button
              className="w-full"
              size="lg"
              variant="destructive"
              onClick={() => {
                onPrestige();
                setConfirmOpen(false);
              }}
            >
              Confirm Prestige - I Understand
            </Button>
            <Button
              className="w-full"
              size="lg"
              variant="outline"
              onClick={() => setConfirmOpen(false)}
            >
              Cancel
            </Button>
          </div>
        )}

        {/* Progress to Next */}
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Overall Progress</p>
          <Progress 
            value={
              ((meetsLevelReq ? 1 : 0) + 
               (meetsKarmaReq ? 1 : 0) + 
               (meetsAchievementReq ? 1 : 0)) / 3 * 100
            } 
          />
        </div>
      </CardContent>
    </Card>
  );
};
