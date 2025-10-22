import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { CheckCircle, Circle, Trophy, Star, Coins } from 'lucide-react';

interface Quest {
  _id: string;
  title: string;
  description: string;
  lore?: string;
  quest_type: string;
  difficulty: string;
  objectives: Array<{
    description: string;
    type: string;
    current: number;
    required: number;
    completed: boolean;
  }>;
  rewards: {
    credits: number;
    xp: number;
    karma: number;
    items?: string[];
    trait_boosts?: Record<string, number>;
  };
  status: string;
  expires_at?: string;
}

interface QuestDetailsProps {
  quest: Quest;
  onAccept?: (questId: string) => void;
  onAbandon?: (questId: string) => void;
}

export const QuestDetails: React.FC<QuestDetailsProps> = ({ quest, onAccept, onAbandon }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'text-green-500 border-green-500';
      case 'medium':
        return 'text-yellow-500 border-yellow-500';
      case 'hard':
        return 'text-red-500 border-red-500';
      case 'legendary':
        return 'text-purple-500 border-purple-500';
      default:
        return 'text-gray-500 border-gray-500';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'daily':
        return 'bg-blue-500/20 text-blue-400';
      case 'weekly':
        return 'bg-purple-500/20 text-purple-400';
      case 'guild':
        return 'bg-green-500/20 text-green-400';
      case 'world':
        return 'bg-orange-500/20 text-orange-400';
      case 'hidden':
        return 'bg-pink-500/20 text-pink-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const calculateOverallProgress = () => {
    if (quest.objectives.length === 0) return 0;
    const completed = quest.objectives.filter(obj => obj.completed).length;
    return (completed / quest.objectives.length) * 100;
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <CardTitle className="text-2xl">{quest.title}</CardTitle>
              <Badge 
                variant="outline" 
                className={getDifficultyColor(quest.difficulty)}
              >
                {quest.difficulty}
              </Badge>
              <Badge className={getTypeColor(quest.quest_type)}>
                {quest.quest_type}
              </Badge>
            </div>
            <CardDescription className="text-base">
              {quest.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Lore Section */}
        {quest.lore && (
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <h3 className="font-semibold mb-2 text-amber-400">Story</h3>
            <p className="text-sm text-gray-300 italic">{quest.lore}</p>
          </div>
        )}

        {/* Objectives */}
        <div>
          <h3 className="font-semibold mb-3 text-lg">Objectives</h3>
          <div className="space-y-3">
            {quest.objectives.map((objective, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center gap-2">
                  {objective.completed ? (
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className={`text-sm ${objective.completed ? 'text-gray-400 line-through' : 'text-gray-200'}`}>
                      {objective.description}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Progress 
                        value={(objective.current / objective.required) * 100}
                        className="h-2 flex-1"
                      />
                      <span className="text-xs text-gray-400 min-w-[60px] text-right">
                        {objective.current}/{objective.required}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Overall Progress */}
          <div className="mt-4 pt-4 border-t border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-blue-400">
                {Math.round(calculateOverallProgress())}%
              </span>
            </div>
            <Progress value={calculateOverallProgress()} className="h-3" />
          </div>
        </div>

        {/* Rewards */}
        <div>
          <h3 className="font-semibold mb-3 text-lg">Rewards</h3>
          <div className="grid grid-cols-2 gap-3">
            {quest.rewards.credits > 0 && (
              <div className="bg-gray-800/50 p-3 rounded-lg flex items-center gap-2">
                <Coins className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="text-xs text-gray-400">Credits</p>
                  <p className="font-semibold text-yellow-500">{quest.rewards.credits}</p>
                </div>
              </div>
            )}
            
            {quest.rewards.xp > 0 && (
              <div className="bg-gray-800/50 p-3 rounded-lg flex items-center gap-2">
                <Star className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-xs text-gray-400">Experience</p>
                  <p className="font-semibold text-blue-500">{quest.rewards.xp} XP</p>
                </div>
              </div>
            )}
            
            {quest.rewards.karma !== 0 && (
              <div className="bg-gray-800/50 p-3 rounded-lg flex items-center gap-2">
                <Trophy className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-xs text-gray-400">Karma</p>
                  <p className={`font-semibold ${quest.rewards.karma > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {quest.rewards.karma > 0 ? '+' : ''}{quest.rewards.karma}
                  </p>
                </div>
              </div>
            )}

            {quest.rewards.items && quest.rewards.items.length > 0 && (
              <div className="bg-gray-800/50 p-3 rounded-lg flex items-center gap-2">
                <div className="h-5 w-5 text-amber-500">📦</div>
                <div>
                  <p className="text-xs text-gray-400">Items</p>
                  <p className="font-semibold text-amber-500">{quest.rewards.items.length} items</p>
                </div>
              </div>
            )}
          </div>

          {/* Trait Boosts */}
          {quest.rewards.trait_boosts && Object.keys(quest.rewards.trait_boosts).length > 0 && (
            <div className="mt-3 bg-gradient-to-r from-purple-900/20 to-transparent p-3 rounded-lg">
              <p className="text-sm font-medium mb-2 text-purple-400">Trait Bonuses</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(quest.rewards.trait_boosts).map(([trait, boost]) => (
                  <Badge key={trait} variant="outline" className="text-xs">
                    {trait}: +{boost}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {quest.status === 'available' && onAccept && (
            <Button
              onClick={() => onAccept(quest._id)}
              className="flex-1"
            >
              Accept Quest
            </Button>
          )}
          
          {quest.status === 'active' && onAbandon && (
            <Button
              onClick={() => onAbandon(quest._id)}
              variant="destructive"
              className="flex-1"
            >
              Abandon Quest
            </Button>
          )}
        </div>

        {/* Expiry Warning */}
        {quest.expires_at && (
          <div className="bg-red-900/20 border border-red-500/30 p-3 rounded-lg">
            <p className="text-sm text-red-400">
              ⚠️ This quest expires on {new Date(quest.expires_at).toLocaleString()}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
