import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Scroll, CheckCircle2, Clock, Star, Target } from 'lucide-react';
import { toast } from '../ui/sonner';

interface Objective {
  description: string;
  type: string;
  target: string;
  current: number;
  required: number;
  completed: boolean;
}

interface Quest {
  id: string;
  title: string;
  description: string;
  quest_type: string;
  difficulty: string;
  objectives: Objective[];
  rewards: {
    credits: number;
    xp: number;
    karma: number;
  };
  status: string;
  expires_at?: string;
}

export const QuestLog: React.FC = () => {
  const [activeQuests, setActiveQuests] = useState<Quest[]>([]);
  const [availableQuests, setAvailableQuests] = useState<Quest[]>([]);
  const [completedQuests, setCompletedQuests] = useState<Quest[]>([]);
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
  const [activeTab, setActiveTab] = useState('active');

  useEffect(() => {
    fetchActiveQuests();
    fetchAvailableQuests();
    fetchCompletedQuests();
  }, []);

  const fetchActiveQuests = async () => {
    try {
      const response = await fetch('/api/quests/active', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setActiveQuests(data.quests || []);
    } catch (error) {
      console.error('Failed to fetch active quests:', error);
    }
  };

  const fetchAvailableQuests = async () => {
    try {
      const response = await fetch('/api/quests/available', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setAvailableQuests(data.quests || []);
    } catch (error) {
      console.error('Failed to fetch available quests:', error);
    }
  };

  const fetchCompletedQuests = async () => {
    try {
      const response = await fetch('/api/quests/completed', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setCompletedQuests(data.quests || []);
    } catch (error) {
      console.error('Failed to fetch completed quests:', error);
    }
  };

  const acceptQuest = async (questId: string) => {
    try {
      const response = await fetch('/api/quests/accept', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ quest_id: questId })
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Quest accepted!', {
          description: data.quest_title
        });
        fetchActiveQuests();
        fetchAvailableQuests();
      } else {
        toast.error('Failed to accept quest', {
          description: data.error
        });
      }
    } catch (error) {
      toast.error('Failed to accept quest');
    }
  };

  const completeQuest = async (questId: string) => {
    try {
      const response = await fetch('/api/quests/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ quest_id: questId })
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Quest completed!', {
          description: `+${data.rewards.xp} XP, +${data.rewards.credits} credits`
        });
        fetchActiveQuests();
        fetchCompletedQuests();
      } else {
        toast.error('Failed to complete quest', {
          description: data.error
        });
      }
    } catch (error) {
      toast.error('Failed to complete quest');
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors: Record<string, string> = {
      easy: 'bg-green-500',
      medium: 'bg-yellow-500',
      hard: 'bg-orange-500',
      legendary: 'bg-purple-500'
    };
    return colors[difficulty] || 'bg-gray-500';
  };

  const calculateProgress = (objectives: Objective[]) => {
    if (objectives.length === 0) return 0;
    const completed = objectives.filter(obj => obj.completed).length;
    return (completed / objectives.length) * 100;
  };

  const canComplete = (quest: Quest) => {
    return quest.objectives.every(obj => obj.completed);
  };

  const QuestCard = ({ quest, showAccept = false, showComplete = false }: any) => (
    <Card
      className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
        selectedQuest?.id === quest.id ? 'ring-2 ring-primary' : ''
      }`}
      onClick={() => setSelectedQuest(quest)}
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-bold text-lg">{quest.title}</h3>
            <div className="flex gap-2 mt-1">
              <Badge className={getDifficultyColor(quest.difficulty)}>
                {quest.difficulty}
              </Badge>
              <Badge variant="outline">{quest.quest_type}</Badge>
            </div>
          </div>
          <Scroll className="h-6 w-6 text-muted-foreground" />
        </div>

        <p className="text-sm text-muted-foreground">{quest.description}</p>

        {quest.status === 'active' && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Progress</span>
              <span>{calculateProgress(quest.objectives).toFixed(0)}%</span>
            </div>
            <Progress value={calculateProgress(quest.objectives)} />
          </div>
        )}

        <div className="space-y-1 text-sm">
          <div className="font-medium">Objectives:</div>
          {quest.objectives.slice(0, 3).map((obj: Objective, index: number) => (
            <div key={index} className="flex items-center gap-2">
              {obj.completed ? (
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              ) : (
                <Target className="h-4 w-4 text-muted-foreground" />
              )}
              <span className={obj.completed ? 'line-through text-muted-foreground' : ''}>
                {obj.description} ({obj.current}/{obj.required})
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm border-t pt-2">
          <div className="flex gap-3">
            <span>💰 {quest.rewards.credits}</span>
            <span>⭐ {quest.rewards.xp} XP</span>
            {quest.rewards.karma !== 0 && (
              <span>✨ {quest.rewards.karma > 0 ? '+' : ''}{quest.rewards.karma}</span>
            )}
          </div>
        </div>

        {showAccept && (
          <Button
            className="w-full"
            onClick={(e) => {
              e.stopPropagation();
              acceptQuest(quest.id);
            }}
          >
            Accept Quest
          </Button>
        )}

        {showComplete && canComplete(quest) && (
          <Button
            className="w-full"
            onClick={(e) => {
              e.stopPropagation();
              completeQuest(quest.id);
            }}
          >
            Complete Quest
          </Button>
        )}
      </div>
    </Card>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Scroll className="h-8 w-8" />
            Quest Log
          </h1>
          <p className="text-muted-foreground mt-1">
            Your adventure awaits
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="active">
            Active ({activeQuests.length})
          </TabsTrigger>
          <TabsTrigger value="available">
            Available ({availableQuests.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({completedQuests.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeQuests.length === 0 ? (
            <Card className="p-8 text-center">
              <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                No active quests. Check available quests!
              </p>
              <Button className="mt-4" onClick={() => setActiveTab('available')}>
                Browse Quests
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeQuests.map(quest => (
                <QuestCard key={quest.id} quest={quest} showComplete />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="available" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableQuests.map(quest => (
              <QuestCard key={quest.id} quest={quest} showAccept />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {completedQuests.map(quest => (
              <QuestCard key={quest.id} quest={quest} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
