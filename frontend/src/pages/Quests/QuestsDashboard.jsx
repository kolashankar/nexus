import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { QuestLog } from '../../components/quests/QuestLog';
import { DailyQuests } from '../../components/quests/DailyQuests';
import { WeeklyQuests } from '../../components/quests/WeeklyQuests';
import { WorldQuests } from '../../components/quests/WorldQuests';
import { HiddenQuests } from '../../components/quests/HiddenQuests';
import { GuildQuests } from '../../components/quests/GuildQuests';
import { CampaignViewer } from '../../components/quests/CampaignViewer';
import { ScrollText, Calendar, TrendingUp, Globe, Eye, Users, BookOpen } from 'lucide-react';

export const QuestsDashboard = () => {
  const [activeTab, setActiveTab] = useState('active');

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Quest Log</h1>
        <p className="text-muted-foreground">
          Track your adventures, complete objectives, and earn rewards
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="active">
            <ScrollText className="mr-2" />
            Active
          </TabsTrigger>
          <TabsTrigger value="daily">
            <Calendar className="mr-2" />
            Daily
          </TabsTrigger>
          <TabsTrigger value="weekly">
            <TrendingUp className="mr-2" />
            Weekly
          </TabsTrigger>
          <TabsTrigger value="world">
            <Globe className="mr-2" />
            World
          </TabsTrigger>
          <TabsTrigger value="hidden">
            <Eye className="mr-2" />
            Hidden
          </TabsTrigger>
          <TabsTrigger value="guild">
            <Users className="mr-2" />
            Guild
          </TabsTrigger>
          <TabsTrigger value="campaigns">
            <BookOpen className="mr-2" />
            Campaigns
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <QuestLog />
        </TabsContent>

        <TabsContent value="daily">
          <DailyQuests />
        </TabsContent>

        <TabsContent value="weekly">
          <WeeklyQuests />
        </TabsContent>

        <TabsContent value="world">
          <WorldQuests />
        </TabsContent>

        <TabsContent value="hidden">
          <HiddenQuests />
        </TabsContent>

        <TabsContent value="guild">
          <GuildQuests />
        </TabsContent>

        <TabsContent value="campaigns">
          <CampaignViewer />
        </TabsContent>
      </Tabs>
    </div>
  );
};
