import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Target, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

export const QuestTracker = () => {
  const [trackedQuests, setTrackedQuests] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [minimized, setMinimized] = useState(false);

  useEffect(() => {
    fetchTrackedQuests();
    const interval = setInterval(fetchTrackedQuests, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const fetchTrackedQuests = async () => {
    try {
      const response = await fetch('/api/quests/active', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        },
      });
      const data = await response.json();
      setTrackedQuests((data.quests || []).slice(0, 5)); // Track max 5 quests
    } catch (error) {
      console.error('Failed to fetch tracked quests', error);
    }
  };

  const toggleExpanded = (questId) => {
    setExpanded((prev) =>
      prev.includes(questId) ? prev.filter((id) => id !== questId) , questId]
    );
  };

  const calculateProgress = (objectives) => {
    if (objectives.length === 0) return 0;
    const completed = objectives.filter((obj) => obj.completed).length;
    return (completed / objectives.length) * 100;
  };

  if (minimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button onClick={() => setMinimized(false)} variant="default" size="sm">
          <Target className="mr-2" />
          Quests ({trackedQuests.length})
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96">
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            <h3 className="font-bold">Active Quests</h3>
          </div>
          <Button onClick={() => setMinimized(true)} variant="ghost" size="sm">
            Minimize
          </Button>
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {trackedQuests.map((quest) => {
            const isExpanded = expanded.includes(quest.id);
            const progress = calculateProgress(quest.objectives);

            return (
              <div key={quest.id} className="border rounded-lg p-3">
                <div
                  className="flex items-start justify-between cursor-pointer"
                  onClick={() => toggleExpanded(quest.id)}
                >
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{quest.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Progress value={progress} className="flex-1" />
                      <span className="text-xs text-muted-foreground">{Math.round(progress)}%</span>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4" />
                  ) 
                    <ChevronDown className="w-4 h-4" />
                  )}
                </div>

                {isExpanded && (
                  <div className="mt-3 space-y-2">
                    {quest.objectives.map((obj, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        {obj.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                        ) 
                          <div className="w-4 h-4 border rounded-full mt-0.5" />
                        )}
                        <div className="flex-1">
                          <p>{obj.description}</p>
                          <p className="text-xs text-muted-foreground">
                            {obj.current}/{obj.required}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};
