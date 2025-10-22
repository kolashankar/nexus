import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Calendar, RefreshCw, Clock } from 'lucide-react';
import { toast } from '../ui/sonner';

interface DailyQuest {
  id: string;
  title: string;
  description: string;
  objectives: any[];
  rewards: any;
  status: string;
}

export const DailyQuests: React.FC = () => {
  const [quests, setQuests] = useState<DailyQuest[]>([]);
  const [resetTime, setResetTime] = useState<string>('');
  const [canRefresh, setCanRefresh] = useState(true);

  useEffect(() => {
    fetchDailyQuests();
  }, []);

  const fetchDailyQuests = async () => {
    try {
      const response = await fetch('/api/quests/daily', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setQuests(data.quests || []);
      setResetTime(data.reset_time);
    } catch (error) {
      console.error('Failed to fetch daily quests:', error);
    }
  };

  const refreshQuests = async () => {
    try {
      const response = await fetch('/api/quests/daily/refresh', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Daily quests refreshed!');
        fetchDailyQuests();
        setCanRefresh(false);
      } else {
        toast.error('Cannot refresh', {
          description: data.error
        });
      }
    } catch (error) {
      toast.error('Failed to refresh quests');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Calendar className="h-6 w-6" />
          Daily Quests
        </h2>
        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground flex items-center gap-1">
            <Clock className="h-4 w-4" />
            Resets in: {resetTime}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={refreshQuests}
            disabled={!canRefresh}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quests.map(quest => (
          <Card key={quest.id} className="p-4">
            <div className="space-y-3">
              <div>
                <h3 className="font-bold">{quest.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {quest.description}
                </p>
              </div>

              <div className="space-y-2">
                {quest.objectives.map((obj: any, idx: number) => (
                  <div key={idx} className="text-sm">
                    <div className="flex justify-between mb-1">
                      <span>{obj.description}</span>
                      <span>{obj.current}/{obj.required}</span>
                    </div>
                    <Progress value={(obj.current / obj.required) * 100} />
                  </div>
                ))}
              </div>

              <div className="flex justify-between text-sm border-t pt-2">
                <span>💰 {quest.rewards.credits}</span>
                <span>⭐ {quest.rewards.xp} XP</span>
              </div>

              {quest.status === 'available' && (
                <Button className="w-full" size="sm">Accept</Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
