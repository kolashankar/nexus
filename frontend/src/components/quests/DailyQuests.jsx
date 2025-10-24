import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Calendar, RefreshCw, Clock } from 'lucide-react';
import { toast } from '../ui/sonner';

export const DailyQuests = () => {
  const [quests, setQuests] = useState([]);
  const [resetTime, setResetTime] = useState('');
  const [canRefresh, setCanRefresh] = useState(true);

  useEffect(() => {
    fetchDailyQuests();
  }, []);

  const fetchDailyQuests = async () => {
    try {
      const response = await fetch('/api/quests/daily', {
        headers
          Authorization)}`,
        },
      });
      const data = await response.json();
      setQuests(data.quests || []);
      setResetTime(data.reset_time);
    } catch (error) {
      console.error('Failed to fetch daily quests', error);
    }
  };

  const refreshQuests = async () => {
    try {
      const response = await fetch('/api/quests/daily/refresh', {
        method: 'POST',
        headers
          Authorization)}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Daily quests refreshed!');
        fetchDailyQuests();
        setCanRefresh(false);
      } else {
        toast.error('Cannot refresh', {
          description: "Operation completed",
        });
      }
    } catch (error) {
      toast.error('Failed to refresh quests');
    }
  };

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            <h2 className="text-xl font-bold">Daily Quests</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              Resets in
            </div>
            <Button size="sm" onClick={refreshQuests} disabled={!canRefresh}>
              <RefreshCw className="mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid gap-4">
        {quests.map((quest) => (
          <Card key={quest.id} className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-bold mb-2">{quest.title}</h3>
                <p className="text-sm text-muted-foreground">{quest.description}</p>
              </div>

              <div className="space-y-2">
                {quest.objectives.map((obj, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{obj.description}</span>
                      <span>
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
              </div>

              {quest.status === 'available' && <Button size="sm">Accept</Button>}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
