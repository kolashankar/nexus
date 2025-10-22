import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Trophy, Crown, Award } from 'lucide-react';
import BattlePassDashboard from '../../components/achievements/BattlePass/BattlePassDashboard';
import SeasonalLeaderboard from '../../components/leaderboards/SeasonalLeaderboard/SeasonalLeaderboard';
import TournamentList from '../../components/tournaments/TournamentList';

const SeasonalDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('battlepass');

  return (
    
      
        Seasonal Content
        
          Compete, progress, and earn exclusive rewards
        
      

      
        
          
            
            Battle Pass
          
          
            
            Leaderboards
          
          
            
            Tournaments
          
        

        
          
        

        
          
        

        
          
        
      
    
  );
};

export default SeasonalDashboard;
