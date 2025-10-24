import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Eye, Lock, MapPin, Clock } from 'lucide-react';
import { toast } from '../ui/sonner';

export const HiddenQuests = () => {
  const [discoveredQuests, setDiscoveredQuests] = useState([]);
  const [hints, setHints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHiddenQuests();
    fetchHints();
  }, []);

  const fetchHiddenQuests = async () => {
    try {
      const response = await fetch('/api/quests/hidden/discovered', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        },
      });
      const data = await response.json();
      setDiscoveredQuests(data.quests || []);
    } catch (error) {
      console.error('Failed to fetch hidden quests', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchHints = async () => {
    try {
      const response = await fetch('/api/quests/hidden/hints', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        },
      });
      const data = await response.json();
      setHints(data.hints || []);
    } catch (error) {
      console.error('Failed to fetch hints', error);
    }
  };

  const acceptQuest = async (questId) => {
    try {
      const response = await fetch('/api/quests/accept', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        },
        body: JSON.stringify({ quest_id: questId }),
      });

      if (response.ok) {
        toast.success('Quest Accepted', {
          description: "Operation completed",
        });
        fetchHiddenQuests();
      }
    } catch (error) {
      toast.error('Failed to accept', {
        description: "Operation completed",
        variant: "default",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Discovered Hidden Quests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Discovered Hidden Quests
          </CardTitle>
        </CardHeader>
        <CardContent>
          {discoveredQuests.length === 0 ? (
            <div className="text-center py-8">
              <Lock className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">
                No hidden quests discovered yet. Explore the world to find them!
              </p>
            </div>
          ) 
            <div className="space-y-4">
              {discoveredQuests.map((quest) => (
                <div key={quest._id} className="border rounded-lg p-4">
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold">{quest.title}</h3>
                        <Badge variant="outline">{quest.difficulty}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{quest.description}</p>
                    </div>
                    {quest.status === 'available' && (
                      <Button
                        onClick={() => acceptQuest(quest._id)}
                        size="sm"
                        className="bg-purple-600 hover
                      >
                        Accept Secret Quest
                      </Button>
                    )}
                  </div>
                  {quest.discovered_at && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-3">
                      <MapPin className="w-3 h-3" />
                      <span>Discovered {new Date(quest.discovered_at).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Cryptic Hints */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Cryptic Hints
          </CardTitle>
        </CardHeader>
        <CardContent>
          {hints.length === 0 ? (
            <div className="text-center py-8">
              <Lock className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No hints available at this time.</p>
            </div>
          ) 
            <div className="space-y-3">
              {hints.map((hint, index) => (
                <div key={index} className="border rounded-lg p-4 bg-purple-50 dark
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-purple-600" />
                      <span className="font-semibold text-sm">Mystery Quest</span>
                    </div>
                  </div>
                  <p className="italic text-sm mt-2">"{hint.hint}"</p>
                  <div className="flex gap-2 mt-3">
                    <Badge variant="outline">{hint.difficulty}</Badge>
                    <Badge variant="secondary">{hint.category}</Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
