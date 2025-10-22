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
    
      
        Quest Log
        
          Track your adventures, complete objectives, and earn rewards
        
      

      
        
          
            
            Active
          
          
            
            Daily
          
          
            
            Weekly
          
          
            
            World
          
          
            
            Hidden
          
          
            
            Guild
          
          
            
            Campaigns
          
        

        
          
        

        
          
        

        
          
        

        
          
        

        
          
        

        
          
        

        
          
        
      
    
  );
};
