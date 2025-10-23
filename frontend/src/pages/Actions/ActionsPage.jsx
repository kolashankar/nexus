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

export const ActionsPage = () => {
  const [activeTab, setActiveTab] = useState('quick');

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          <Activity className="inline mr-2" />
          Actions
        </h1>
        <p className="text-muted-foreground">
          Perform actions, manage cooldowns, and view your action history
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="quick">
            <Zap className="mr-2" />
            Quick Actions
          </TabsTrigger>
          <TabsTrigger value="dashboard">
            <Activity className="mr-2" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="cooldowns">
            <Clock className="mr-2" />
            Cooldowns
          </TabsTrigger>
          <TabsTrigger value="history">
            <History className="mr-2" />
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="quick">
          <div className="mt-6">
            <QuickActions />
          </div>
        </TabsContent>

        <TabsContent value="dashboard">
          <ActionsDashboard />
        </TabsContent>

        <TabsContent value="cooldowns">
          <ActionCooldowns />
        </TabsContent>

        <TabsContent value="history">
          <ActionHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
};
