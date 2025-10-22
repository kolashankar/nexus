import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Globe, Users } from 'lucide-react';
import { toast } from '../ui/sonner';

interface WorldQuest {
  id: string;
  title: string;
  description: string;
  objectives: any[];
  rewards: any;
  participants: any[];
  expires_at: string;
}

export const WorldQuests: React.FC = () => {
  const [quests, setQuests] = useState<WorldQuest[]>([]);

  useEffect(() => {
    fetchWorldQuests();
    const interval = setInterval(fetchWorldQuests, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  const fetchWorldQuests = async () => {
    try {
      const response = await fetch('/api/quests/world', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setQuests(data.quests || []);
    } catch (error) {
      console.error('Failed to fetch world quests:', error);
    }
  };

  const participate = async (questId: string) => {
    try {
      const response = await fetch(`/api/quests/world/participate/${questId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Joined world quest!');
        fetchWorldQuests();
      } else {
        toast.error('Failed to join');
      }
    } catch (error) {
      toast.error('Failed to join quest');
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Globe className="h-6 w-6" />
          World Quests
        </h2>
        <p className="text-sm text-muted-foreground">
          Limited-time events open to all players
        </p>
      </div>

      {quests.length === 0 ? (
        <Card className="p-8 text-center">
          <Globe className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">
            No active world quests at the moment
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quests.map(quest => (
            <Card key={quest.id} className="p-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-lg">{quest.title}</h3>
                    <Badge variant="secondary">
                      <Users className="h-3 w-3 mr-1" />
                      {quest.participants?.length || 0} participating
                    </Badge>
                  </div>
                  <Globe className="h-6 w-6 text-blue-500" />
                </div>

                <p className="text-sm text-muted-foreground">
                  {quest.description}
                </p>

                <div className="space-y-1 text-sm">
                  <div className="font-medium">Objectives:</div>
                  {quest.objectives.slice(0, 2).map((obj: any, idx: number) => (
                    <div key={idx}>• {obj.description}</div>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm border-t pt-2">
                  <div className="flex gap-3">
                    <span>💰 {quest.rewards.credits}</span>
                    <span>⭐ {quest.rewards.xp} XP</span>
                  </div>
                  {quest.expires_at && (
                    <span className="text-xs text-muted-foreground">
                      Expires: {new Date(quest.expires_at).toLocaleDateString()}
                    </span>
                  )}
                </div>

                <Button
                  className="w-full"
                  onClick={() => participate(quest.id)}
                >
                  Participate
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
