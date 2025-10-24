import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { Trophy, Lock } from 'lucide-react';

const rarityColors = {
  common: 'bg-gray-500',
  uncommon: 'bg-green-500',
  rare: 'bg-blue-500',
  epic: 'bg-purple-500',
  legendary: 'bg-yellow-500'
};

const AchievementCard = ({ achievement, unlocked, progress }) => {
  return (
    <Card className={`relative ${unlocked ? 'border-yellow-500' : 'opacity-75'}`}>
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="mt-1">
            {unlocked ? (
              <Trophy className="w-8 h-8 text-yellow-500" />
            ) : (
              <Lock className="w-8 h-8 text-gray-400" />
            )}
          </div>
          <div className="flex-1">
            <CardTitle>{achievement.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{achievement.description}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-2">
          <Badge className={rarityColors[achievement.rarity]}>
            {achievement.rarity}
          </Badge>
          <span className="text-sm font-semibold">{achievement.points} pts</span>
        </div>

        {progress && !unlocked && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span className="font-medium">
                {progress.current_progress}/{progress.required_progress}
              </span>
            </div>
            <Progress value={(progress.current_progress / progress.required_progress) * 100} />
          </div>
        )}

        <Badge variant="outline" className="mt-2">
          {achievement.category.replace('_', ' ')}
        </Badge>
      </CardContent>
    </Card>
  );
};

export default AchievementCard;
