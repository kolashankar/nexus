import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Trophy, Clock } from 'lucide-react';

interface WeeklyQuest {
  id: string;
  title: string;
  description: string;
  objectives: any[];
  rewards: any;
  difficulty: string;
  status: string;
}

export const WeeklyQuests: React.FC = () => {
  const [quests, setQuests] = useState<WeeklyQuest[]>([]);
  const [resetTime, setResetTime] = useState<string>('');

  useEffect(() => {
    fetchWeeklyQuests();
  }, []);

  const fetchWeeklyQuests = async () => {
    try {
      const response = await fetch('/api/quests/weekly', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setQuests(data.quests || []);
      setResetTime(data.reset_time);
    } catch (error) {
      console.error('Failed to fetch weekly quests:', error);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors: Record<string, string> = {
      medium: 'bg-yellow-500',
      hard: 'bg-orange-500',
      legendary: 'bg-purple-500'
    };
    return colors[difficulty] || 'bg-gray-500';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Trophy className="h-6 w-6" />
          Weekly Challenges
        </h2>
        <div className="text-sm text-muted-foreground flex items-center gap-1">
          <Clock className="h-4 w-4" />
          Resets: {resetTime}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quests.map(quest => (
          <Card key={quest.id} className="p-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold">{quest.title}</h3>
                  <Badge className={getDifficultyColor(quest.difficulty)}>
                    {quest.difficulty}
                  </Badge>
                </div>
                <Trophy className="h-5 w-5 text-yellow-500" />
              </div>

              <p className="text-sm text-muted-foreground">
                {quest.description}
              </p>

              <div className="space-y-2">
                {quest.objectives.map((obj: any, idx: number) => (
                  <div key={idx} className="text-sm">
                    <div className="flex justify-between mb-1">
                      <span>{obj.description}</span>
                      <span className="font-medium">
                        {obj.current}/{obj.required}
                      </span>
                    </div>
                    <Progress value={(obj.current / obj.required) * 100} />
                  </div>
                ))}
              </div>

              <div className="flex justify-between text-sm border-t pt-2">
                <span className="font-medium">💰 {quest.rewards.credits}</span>
                <span className="font-medium">⭐ {quest.rewards.xp} XP</span>
                {quest.rewards.karma !== 0 && (
                  <span className="font-medium">
                    ✨ {quest.rewards.karma > 0 ? '+' : ''}{quest.rewards.karma}
                  </span>
                )}
              </div>

              {quest.status === 'available' && (
                <Button className="w-full">Accept Challenge</Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
