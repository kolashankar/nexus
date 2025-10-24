import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Trophy, Clock } from 'lucide-react';

export const WeeklyQuests = () => {
  const [quests, setQuests] = useState([]);
  const [resetTime, setResetTime] = useState('');

  useEffect(() => {
    fetchWeeklyQuests();
  }, []);

  const fetchWeeklyQuests = async () => {
    try {
      const response = await fetch('/api/quests/weekly', {
        headers
          Authorization)}`,
        },
      });
      const data = await response.json();
      setQuests(data.quests || []);
      setResetTime(data.reset_time);
    } catch (error) {
      console.error('Failed to fetch weekly quests', error);
    }
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      easy,
      medium,
      hard,
      legendary,
    };
    return colors[difficulty] || 'bg-gray-500';
  };

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            <h2 className="text-xl font-bold">Weekly Challenges</h2>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            Resets
          </div>
        </div>
      </Card>

      <div className="grid gap-4">
        {quests.map((quest) => (
          <Card key={quest.id} className="p-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold">{quest.title}</h3>
                  <Badge className={getDifficultyColor(quest.difficulty)}>{quest.difficulty}</Badge>
                </div>
                <Trophy className="w-5 h-5 text-yellow-500" />
              </div>

              <p className="text-sm text-muted-foreground">{quest.description}</p>

              <div className="space-y-2">
                {quest.objectives.map((obj, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{obj.description}</span>
                      <span className="font-medium">
                        {obj.current}/{obj.required}
                      </span>
                    </div>
                    <Progress value={(obj.current / obj.required) * 100} />
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4 text-sm">
                <span>💰 {quest.rewards.credits}</span>
                <span>⭐ {quest.rewards.xp} XP</span>
                {quest.rewards.karma !== 0 && (
                  <span>
                    ✨ {quest.rewards.karma > 0 ? '+' 
                    {quest.rewards.karma}
                  </span>
                )}
              </div>

              {quest.status === 'available' && <Button size="sm">Accept Challenge</Button>}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
