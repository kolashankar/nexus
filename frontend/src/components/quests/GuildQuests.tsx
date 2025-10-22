import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Users, Trophy, Clock, CheckCircle } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

interface GuildQuest {
  _id: string;
  title: string;
  description: string;
  guild_id: string;
  objectives: Array<{
    description: string;
    current: number;
    required: number;
    completed: boolean;
  }>;
  rewards: {
    credits: number;
    guild_reputation: number;
    guild_xp: number;
  };
  participants: string[];
  required_members: number;
  status: string;
  expires_at?: string;
}

export const GuildQuests: React.FC = () => {
  const [quests, setQuests] = useState<GuildQuest[]>([]);
  const [activeQuests, setActiveQuests] = useState<GuildQuest[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchGuildQuests();
  }, []);

  const fetchGuildQuests = async () => {
    try {
      const response = await fetch('/api/quests/guild', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      
      setQuests(data.available || []);
      setActiveQuests(data.active || []);
    } catch (error) {
      console.error('Failed to fetch guild quests:', error);
    } finally {
      setLoading(false);
    }
  };

  const joinQuest = async (questId: string) => {
    try {
      const response = await fetch(`/api/quests/guild/${questId}/join`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        toast({
          title: 'Joined Guild Quest',
          description: 'You have joined the guild quest',
        });
        fetchGuildQuests();
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to join guild quest',
        variant: 'destructive'
      });
    }
  };

  const calculateProgress = (objectives: GuildQuest['objectives']) => {
    const completed = objectives.filter(obj => obj.completed).length;
    return (completed / objectives.length) * 100;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Active Guild Quests */}
      {activeQuests.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Users className="h-6 w-6 text-blue-500" />
            Active Guild Quests
          </h2>
          
          <div className="grid gap-4">
            {activeQuests.map((quest) => (
              <Card key={quest._id} className="border-blue-500/30">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle>{quest.title}</CardTitle>
                      <CardDescription className="mt-2">
                        {quest.description}
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-blue-500/20">
                      {quest.participants.length}/{quest.required_members} Members
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Objectives */}
                  <div className="space-y-2">
                    {quest.objectives.map((objective, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-2">
                            {objective.completed && (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            )}
                            {objective.description}
                          </span>
                          <span className="text-gray-400">
                            {objective.current}/{objective.required}
                          </span>
                        </div>
                        <Progress 
                          value={(objective.current / objective.required) * 100} 
                          className="h-2"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Overall Progress */}
                  <div className="pt-2 border-t border-gray-700">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span>Overall Progress</span>
                      <span className="text-blue-400">
                        {Math.round(calculateProgress(quest.objectives))}%
                      </span>
                    </div>
                    <Progress 
                      value={calculateProgress(quest.objectives)} 
                      className="h-3"
                    />
                  </div>

                  {/* Rewards */}
                  <div className="flex items-center gap-4 text-sm bg-gray-800/50 p-3 rounded-lg">
                    <div className="flex items-center gap-1">
                      <Trophy className="h-4 w-4 text-yellow-500" />
                      <span>{quest.rewards.guild_reputation} Rep</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-green-500">💰</span>
                      <span>{quest.rewards.credits} Credits</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-blue-500">⭐</span>
                      <span>{quest.rewards.guild_xp} Guild XP</span>
                    </div>
                  </div>

                  {quest.expires_at && (
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Clock className="h-4 w-4" />
                      Expires: {new Date(quest.expires_at).toLocaleDateString()}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Available Guild Quests */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Available Guild Quests</h2>
        
        {quests.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-gray-400 text-center">
                No guild quests available. Check back later!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {quests.map((quest) => (
              <Card key={quest._id} className="border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg">{quest.title}</CardTitle>
                  <CardDescription>{quest.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Required Members:</span>
                    <span className="font-medium">{quest.required_members}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Current Participants:</span>
                    <span className="font-medium text-blue-400">
                      {quest.participants.length}
                    </span>
                  </div>

                  <Button
                    onClick={() => joinQuest(quest._id)}
                    className="w-full"
                    variant="outline"
                  >
                    Join Quest
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
