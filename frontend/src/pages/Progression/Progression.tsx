import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import SkillTree from '../../components/player/SkillTree/SkillTree';
import SuperpowersList from '../../components/player/SuperpowersList/SuperpowersList';
import Achievements from '../../components/achievements/Achievements/Achievements';

const Progression: React.FC = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-4xl font-bold mb-6">Progression</h1>
      
      <Tabs defaultValue="skills" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="skills">Skill Trees</TabsTrigger>
          <TabsTrigger value="powers">Superpowers</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="skills" className="mt-6">
          <SkillTree />
        </TabsContent>

        <TabsContent value="powers" className="mt-6">
          <SuperpowersList />
        </TabsContent>

        <TabsContent value="achievements" className="mt-6">
          <Achievements />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Progression;
