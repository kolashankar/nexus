/**
 * Actions Page - Central hub for all player actions.
 */

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { QuickActions } from '../../components/player/QuickActions/QuickActions';
import { ActionCooldowns } from '../../components/actions/ActionCooldowns/ActionCooldowns';
import { ActionHistory } from '../../components/actions/ActionHistory/ActionHistory';
import ActionsDashboard from '../../components/actions/ActionsDashboard/ActionsDashboard';
import { Activity, Clock, History, Zap } from 'lucide-react';
import './ActionsPage.css';

export const ActionsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('quick');

  return (
    
      
        
          
          Actions
        
        
          Perform actions, manage cooldowns, and view your action history
        
      

      
        
          
            
            Quick Actions
          
          
            
            Dashboard
          
          
            
            Cooldowns
          
          
            
            History
          
        

        
          
            
            
          
        

        
          
        

        
          
        

        
          
        
      
    
  );
};
