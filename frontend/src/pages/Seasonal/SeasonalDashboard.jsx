import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Trophy, Crown, Award } from 'lucide-react';
import BattlePassDashboard from '../../components/achievements/BattlePass/BattlePassDashboard';
import SeasonalLeaderboard from '../../components/leaderboards/SeasonalLeaderboard/SeasonalLeaderboard';
import TournamentList from '../../components/tournaments/TournamentList';

const SeasonalDashboard = () => {
  const [activeTab, setActiveTab] = useState('battlepass');

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Seasonal Content</h1>
        <p className="text-muted-foreground">
          Compete, progress, and earn exclusive rewards
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="battlepass">
            <Trophy className="mr-2" />
            Battle Pass
          </TabsTrigger>
          <TabsTrigger value="leaderboards">
            <Crown className="mr-2" />
            Leaderboards
          </TabsTrigger>
          <TabsTrigger value="tournaments">
            <Award className="mr-2" />
            Tournaments
          </TabsTrigger>
        </TabsList>

        <TabsContent value="battlepass">
          <BattlePassDashboard />
        </TabsContent>

        <TabsContent value="leaderboards">
          <SeasonalLeaderboard />
        </TabsContent>

        <TabsContent value="tournaments">
          <TournamentList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SeasonalDashboard;
