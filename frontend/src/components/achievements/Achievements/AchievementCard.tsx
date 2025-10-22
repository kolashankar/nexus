import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { Trophy, Lock } from 'lucide-react';
import type { AchievementDefinition, AchievementProgress } from '../../../types/achievements';

interface AchievementCardProps {
  achievement: AchievementDefinition;
  unlocked?: boolean;
  progress?: AchievementProgress;
}

const rarityColors = {
  common: 'bg-gray-500',
  uncommon: 'bg-green-500',
  rare: 'bg-blue-500',
  epic: 'bg-purple-500',
  legendary: 'bg-yellow-500',
};

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement, unlocked, progress }) => {
  return (
    <Card className={unlocked ? 'border-2 border-primary' : 'opacity-75'}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {unlocked ? (
              <Trophy className="h-6 w-6 text-yellow-500" />
            ) : (
              <Lock className="h-6 w-6 text-muted-foreground" />
            )}
            <div>
              <CardTitle className="text-lg">{achievement.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{achievement.description}</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <Badge className={`${rarityColors[achievement.rarity]} text-white capitalize`}>
            {achievement.rarity}
          </Badge>
          <Badge variant="outline">{achievement.points} pts</Badge>
        </div>

        {progress && !unlocked && (
          <div>
            <div className="flex items-center justify-between text-sm mb-1">
              <span>Progress</span>
              <span>
                {progress.current_progress}/{progress.required_progress}
              </span>
            </div>
            <Progress value={progress.percentage} className="h-2" />
          </div>
        )}

        <Badge variant="secondary" className="text-xs capitalize">
          {achievement.category.replace('_', ' ')}
        </Badge>
      </CardContent>
    </Card>
  );
};

export default AchievementCard;
