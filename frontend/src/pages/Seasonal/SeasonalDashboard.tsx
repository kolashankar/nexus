import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Trophy, Crown, Award } from 'lucide-react';
import BattlePassDashboard from '../../components/achievements/BattlePass/BattlePassDashboard';
import SeasonalLeaderboard from '../../components/leaderboards/SeasonalLeaderboard/SeasonalLeaderboard';
import TournamentList from '../../components/tournaments/TournamentList';

const SeasonalDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('battlepass');

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Seasonal Content</h1>
        <p className="text-muted-foreground">
          Compete, progress, and earn exclusive rewards
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="battlepass" className="gap-2">
            <Crown className="h-4 w-4" />
            Battle Pass
          </TabsTrigger>
          <TabsTrigger value="leaderboards" className="gap-2">
            <Trophy className="h-4 w-4" />
            Leaderboards
          </TabsTrigger>
          <TabsTrigger value="tournaments" className="gap-2">
            <Award className="h-4 w-4" />
            Tournaments
          </TabsTrigger>
        </TabsList>

        <TabsContent value="battlepass" className="mt-6">
          <BattlePassDashboard />
        </TabsContent>

        <TabsContent value="leaderboards" className="mt-6">
          <SeasonalLeaderboard />
        </TabsContent>

        <TabsContent value="tournaments" className="mt-6">
          <TournamentList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SeasonalDashboard;
