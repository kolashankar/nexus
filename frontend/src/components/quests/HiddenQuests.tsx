import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Eye, Lock, MapPin, Clock } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

interface HiddenQuest {
  _id: string;
  title: string;
  description: string;
  hint: string;
  difficulty: string;
  discovered_at?: string;
  status: string;
}

export const HiddenQuests: React.FC = () => {
  const [discoveredQuests, setDiscoveredQuests] = useState<HiddenQuest[]>([]);
  const [hints, setHints] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchHiddenQuests();
    fetchHints();
  }, []);

  const fetchHiddenQuests = async () => {
    try {
      const response = await fetch('/api/quests/hidden/discovered', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setDiscoveredQuests(data.quests || []);
    } catch (error) {
      console.error('Failed to fetch hidden quests:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchHints = async () => {
    try {
      const response = await fetch('/api/quests/hidden/hints', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setHints(data.hints || []);
    } catch (error) {
      console.error('Failed to fetch hints:', error);
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

      if (response.ok) {
        toast({
          title: 'Quest Accepted',
          description: 'Hidden quest added to your quest log',
        });
        fetchHiddenQuests();
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to accept quest',
        variant: 'destructive'
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Discovered Hidden Quests */}
      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Eye className="h-6 w-6 text-purple-500" />
          Discovered Hidden Quests
        </h2>
        
        {discoveredQuests.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-gray-400 text-center">
                No hidden quests discovered yet. Explore the world to find them!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {discoveredQuests.map((quest) => (
              <Card key={quest._id} className="border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-transparent">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {quest.title}
                        <Badge variant="outline" className="ml-2">
                          {quest.difficulty}
                        </Badge>
                      </CardTitle>
                      <CardDescription className="mt-2">
                        {quest.description}
                      </CardDescription>
                    </div>
                    {quest.status === 'available' && (
                      <Button
                        onClick={() => acceptQuest(quest._id)}
                        size="sm"
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        Accept
                      </Button>
                    )}
                  </div>
                </CardHeader>
                {quest.discovered_at && (
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Clock className="h-4 w-4" />
                      Discovered: {new Date(quest.discovered_at).toLocaleDateString()}
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Cryptic Hints */}
      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Lock className="h-6 w-6 text-yellow-500" />
          Cryptic Hints
        </h2>
        
        {hints.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-gray-400 text-center">
                No hints available at this time.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {hints.map((hint, index) => (
              <Card key={index} className="border-yellow-500/30 bg-gradient-to-br from-yellow-900/10 to-transparent">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-yellow-500" />
                    Mystery Quest
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-300 italic">"{hint.hint}"</p>
                  <div className="mt-3 flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {hint.difficulty}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {hint.category}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
