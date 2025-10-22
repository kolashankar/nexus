import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { BookOpen, Lock, CheckCircle2, Play } from 'lucide-react';
import { toast } from '../ui/sonner';

interface Chapter {
  chapter_number: number;
  title: string;
  description: string;
  completed: bool;
  unlocked: bool;
}

interface Campaign {
  campaign_id: string;
  title: string;
  current_chapter: number;
  total_chapters: number;
  completion_percentage: number;
  chapters: Chapter[];
}

export const CampaignViewer: React.FC = () => {
  const [activeCampaign, setActiveCampaign] = useState<Campaign | null>(null);
  const [availableCampaigns, setAvailableCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActiveCampaign();
    fetchAvailableCampaigns();
  }, []);

  const fetchActiveCampaign = async () => {
    try {
      const response = await fetch('/api/quests/campaigns/active', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        if (data) {
          // Fetch progress
          const progressResponse = await fetch('/api/quests/campaigns/progress', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          const progressData = await progressResponse.json();
          setActiveCampaign(progressData);
        }
      }
    } catch (error) {
      console.error('Failed to fetch campaign:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableCampaigns = async () => {
    try {
      const response = await fetch('/api/quests/campaigns/available', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setAvailableCampaigns(data.campaigns || []);
    } catch (error) {
      console.error('Failed to fetch available campaigns:', error);
    }
  };

  const startCampaign = async (campaignType: string) => {
    try {
      const response = await fetch('/api/quests/campaigns/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ campaign_type: campaignType })
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Campaign started!', {
          description: data.campaign.title
        });
        fetchActiveCampaign();
      } else {
        toast.error('Failed to start campaign', {
          description: data.error
        });
      }
    } catch (error) {
      toast.error('Failed to start campaign');
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <BookOpen className="h-8 w-8" />
            Story Campaigns
          </h1>
          <p className="text-muted-foreground mt-1">
            Epic storylines with lasting consequences
          </p>
        </div>
      </div>

      {activeCampaign ? (
        <div className="space-y-6">
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold">{activeCampaign.title}</h2>
                <p className="text-muted-foreground">
                  Chapter {activeCampaign.current_chapter} of {activeCampaign.total_chapters}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Overall Progress</span>
                  <span>{activeCampaign.completion_percentage.toFixed(0)}%</span>
                </div>
                <Progress value={activeCampaign.completion_percentage} />
              </div>
            </div>
          </Card>

          <div>
            <h3 className="text-xl font-bold mb-4">Chapters</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeCampaign.chapters.map(chapter => (
                <Card
                  key={chapter.chapter_number}
                  className={`p-4 ${!chapter.unlocked ? 'opacity-50' : ''}`}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold">{chapter.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          Chapter {chapter.chapter_number}
                        </p>
                      </div>
                      {chapter.completed ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      ) : chapter.unlocked ? (
                        <Play className="h-5 w-5 text-blue-600" />
                      ) : (
                        <Lock className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {chapter.description}
                    </p>

                    {chapter.unlocked && !chapter.completed && (
                      <Button className="w-full" size="sm">
                        Continue
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <Card className="p-8 text-center">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">
              Start an epic campaign to experience a unique story
            </p>
          </Card>

          <div>
            <h3 className="text-xl font-bold mb-4">Available Campaigns</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableCampaigns.map(campaign => (
                <Card key={campaign.id} className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xl font-bold">{campaign.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {campaign.description}
                      </p>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Chapters:</span>
                        <span>{campaign.total_chapters}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span>{campaign.estimated_duration}</span>
                      </div>
                    </div>

                    <Button
                      className="w-full"
                      onClick={() => startCampaign(campaign.campaign_type)}
                    >
                      Start Campaign
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
