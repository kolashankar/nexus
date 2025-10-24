import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { BookOpen, Lock, CheckCircle2, Play } from 'lucide-react';
import { toast } from '../ui/sonner';

export const CampaignViewer = () => {
  const [activeCampaign, setActiveCampaign] = useState(null);
  const [availableCampaigns, setAvailableCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActiveCampaign();
    fetchAvailableCampaigns();
  }, []);

  const fetchActiveCampaign = async () => {
    try {
      const response = await fetch('/api/quests/campaigns/active', {
        headers
          Authorization)}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        if (data) {
          // Fetch progress
          const progressResponse = await fetch('/api/quests/campaigns/progress', {
            headers
              Authorization)}`,
            },
          });
          const progressData = await progressResponse.json();
          setActiveCampaign(progressData);
        }
      }
    } catch (error) {
      console.error('Failed to fetch campaign', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableCampaigns = async () => {
    try {
      const response = await fetch('/api/quests/campaigns/available', {
        headers
          Authorization)}`,
        },
      });
      const data = await response.json();
      setAvailableCampaigns(data.campaigns || []);
    } catch (error) {
      console.error('Failed to fetch available campaigns', error);
    }
  };

  const startCampaign = async (campaignType) => {
    try {
      const response = await fetch('/api/quests/campaigns/start', {
        method,
        headers
          'Content-Type',
          Authorization)}`,
        },
        body),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Campaign started!', {
          description,
        });
        fetchActiveCampaign();
      } else {
        toast.error('Failed to start campaign', {
          description,
        });
      }
    } catch (error) {
      toast.error('Failed to start campaign');
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-6 h-6" />
          <div>
            <h2 className="text-2xl font-bold">Story Campaigns</h2>
            <p className="text-muted-foreground">Epic storylines with lasting consequences</p>
          </div>
        </div>
      </Card>

      {activeCampaign ? (
        <div className="space-y-4">
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold">{activeCampaign.title}</h3>
                <Badge variant="outline">
                  Chapter {activeCampaign.current_chapter} of {activeCampaign.total_chapters}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Overall Progress</span>
                  <span>{activeCampaign.completion_percentage.toFixed(0)}%</span>
                </div>
                <Progress value={activeCampaign.completion_percentage} />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4">Chapters</h3>
            <div className="space-y-3">
              {activeCampaign.chapters.map((chapter) => (
                <div key={chapter.chapter_number} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold">{chapter.title}</h4>
                        <Badge variant="outline">Chapter {chapter.chapter_number}</Badge>
                      </div>
                      {chapter.completed ? (
                        <CheckCircle2 className="text-green-500" />
                      ) 
                        <Play className="text-blue-500" />
                      ) 
                        <Lock className="text-gray-400" />
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground mt-2">{chapter.description}</p>

                    {chapter.unlocked && !chapter.completed && <Button size="sm">Continue</Button>}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      ) 
        <div className="space-y-4">
          <Card className="p-8">
            <div className="text-center">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">
                Start an epic campaign to experience a unique story
              </p>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4">Available Campaigns</h3>
            <div className="grid gap-4">
              {availableCampaigns.map((campaign) => (
                <div key={campaign.campaign_type} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold mb-2">{campaign.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{campaign.description}</p>
                    </div>

                    <Button onClick={() => startCampaign(campaign.campaign_type)}>
                      <BookOpen className="mr-2" />
                      {campaign.total_chapters} Chapters
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
