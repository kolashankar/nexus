import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Globe, Users } from 'lucide-react';
import { toast } from '../ui/sonner';

export const WorldQuests = () => {
  const [quests, setQuests] = useState([]);

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
      console.error('Failed to fetch world quests', error);
    }
  };

  const participate = async (questId) => {
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
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <Globe className="w-5 h-5" />
          <h2 className="text-xl font-bold">World Quests</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Limited-time events open to all players
        </p>
      </Card>

      {quests.length === 0 ? (
        <Card className="p-8">
          <div className="text-center">
            <Globe className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">
              No active world quests at the moment
            </p>
          </div>
        </Card>
      ) : (
        <div className="grid gap-4">
          {quests.map(quest => (
            <Card key={quest.id} className="p-6">
              <div className="space-y-4">
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold">{quest.title}</h3>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {quest.participants?.length || 0} participating
                    </Badge>
                  </div>
                  <Globe className="w-5 h-5 text-blue-500" />
                </div>

                <p className="text-sm text-muted-foreground">
                  {quest.description}
                </p>

                <div className="text-sm space-y-1">
                  <p className="font-semibold">Objectives:</p>
                  {quest.objectives?.slice(0, 2).map((obj, idx) => (
                    <p key={idx} className="text-muted-foreground">• {obj.description}</p>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-4 text-sm">
                    <span>💰 {quest.rewards.credits}</span>
                    <span>⭐ {quest.rewards.xp} XP</span>
                  </div>
                  {quest.expires_at && (
                    <span className="text-xs text-muted-foreground">
                      Expires: {new Date(quest.expires_at).toLocaleDateString()}
                    </span>
                  )}
                </div>

                <Button onClick={() => participate(quest.id)}>
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
