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

export const QuestsDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('active');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Quest Log</h1>
        <p className="text-gray-400">
          Track your adventures, complete objectives, and earn rewards
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-7 lg:w-auto">
          <TabsTrigger value="active" className="flex items-center gap-2">
            <ScrollText className="h-4 w-4" />
            <span className="hidden sm:inline">Active</span>
          </TabsTrigger>
          <TabsTrigger value="daily" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Daily</span>
          </TabsTrigger>
          <TabsTrigger value="weekly" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">Weekly</span>
          </TabsTrigger>
          <TabsTrigger value="world" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">World</span>
          </TabsTrigger>
          <TabsTrigger value="hidden" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            <span className="hidden sm:inline">Hidden</span>
          </TabsTrigger>
          <TabsTrigger value="guild" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Guild</span>
          </TabsTrigger>
          <TabsTrigger value="campaigns" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Campaigns</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <QuestLog />
        </TabsContent>

        <TabsContent value="daily" className="space-y-4">
          <DailyQuests />
        </TabsContent>

        <TabsContent value="weekly" className="space-y-4">
          <WeeklyQuests />
        </TabsContent>

        <TabsContent value="world" className="space-y-4">
          <WorldQuests />
        </TabsContent>

        <TabsContent value="hidden" className="space-y-4">
          <HiddenQuests />
        </TabsContent>

        <TabsContent value="guild" className="space-y-4">
          <GuildQuests />
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-4">
          <CampaignViewer />
        </TabsContent>
      </Tabs>
    </div>
  );
};
