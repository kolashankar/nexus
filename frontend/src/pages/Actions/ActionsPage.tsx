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
    <div className="actions-page">
      <div className="actions-header">
        <h1 className="actions-title">
          <Activity className="w-8 h-8" />
          Actions
        </h1>
        <p className="actions-subtitle">
          Perform actions, manage cooldowns, and view your action history
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="actions-tabs">
        <TabsList className="actions-tabs-list">
          <TabsTrigger value="quick">
            <Zap className="w-4 h-4 mr-2" />
            Quick Actions
          </TabsTrigger>
          <TabsTrigger value="dashboard">
            <Activity className="w-4 h-4 mr-2" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="cooldowns">
            <Clock className="w-4 h-4 mr-2" />
            Cooldowns
          </TabsTrigger>
          <TabsTrigger value="history">
            <History className="w-4 h-4 mr-2" />
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="quick" className="actions-tab-content">
          <div className="actions-grid">
            <QuickActions />
            <ActionCooldowns />
          </div>
        </TabsContent>

        <TabsContent value="dashboard" className="actions-tab-content">
          <ActionsDashboard />
        </TabsContent>

        <TabsContent value="cooldowns" className="actions-tab-content">
          <ActionCooldowns />
        </TabsContent>

        <TabsContent value="history" className="actions-tab-content">
          <ActionHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
};
