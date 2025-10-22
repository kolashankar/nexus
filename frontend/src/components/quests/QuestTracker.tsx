import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Target, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { questService } from '../../services/questService';

interface TrackedQuest {
  id: string;
  title: string;
  objectives: any[];
  quest_type: string;
}

export const QuestTracker: React.FC = () => {
  const [trackedQuests, setTrackedQuests] = useState<TrackedQuest[]>([]);
  const [expanded, setExpanded] = useState<string[]>([]);
  const [minimized, setMinimized] = useState(false);

  useEffect(() => {
    fetchTrackedQuests();
    const interval = setInterval(fetchTrackedQuests, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const fetchTrackedQuests = async () => {
    try {
      const quests = await questService.getActiveQuests();
      setTrackedQuests(quests.slice(0, 5)); // Track max 5 quests
    } catch (error) {
      console.error('Failed to fetch tracked quests:', error);
    }
  };

  const toggleExpanded = (questId: string) => {
    setExpanded(prev => 
      prev.includes(questId)
        ? prev.filter(id => id !== questId)
        : [...prev, questId]
    );
  };

  const calculateProgress = (objectives: any[]) => {
    if (objectives.length === 0) return 0;
    const completed = objectives.filter(obj => obj.completed).length;
    return (completed / objectives.length) * 100;
  };

  if (minimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setMinimized(false)}
          variant="default"
          size="sm"
        >
          <Target className="h-4 w-4 mr-2" />
          Quests ({trackedQuests.length})
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-80 z-50">
      <Card className="p-4 shadow-2xl border-2">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold flex items-center gap-2">
              <Target className="h-5 w-5" />
              Active Quests
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMinimized(true)}
            >
              Minimize
            </Button>
          </div>

          {trackedQuests.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No active quests
            </p>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {trackedQuests.map(quest => (
                <div
                  key={quest.id}
                  className="border rounded p-2 hover:bg-accent/50 transition-colors"
                >
                  <div
                    className="cursor-pointer"
                    onClick={() => toggleExpanded(quest.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex-1">
                        <div className="font-medium text-sm truncate">
                          {quest.title}
                        </div>
                        <Badge variant="outline" className="text-xs mt-1">
                          {quest.quest_type}
                        </Badge>
                      </div>
                      {expanded.includes(quest.id) ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </div>

                    <Progress value={calculateProgress(quest.objectives)} className="h-1" />
                  </div>

                  {expanded.includes(quest.id) && (
                    <div className="mt-2 space-y-1 pl-2 border-l-2">
                      {quest.objectives.map((obj: any, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-xs"
                        >
                          {obj.completed ? (
                            <CheckCircle2 className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                          ) : (
                            <Target className="h-3 w-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <div className={obj.completed ? 'line-through text-muted-foreground' : ''}>
                              {obj.description}
                            </div>
                            <div className="text-muted-foreground">
                              {obj.current}/{obj.required}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
