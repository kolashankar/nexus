import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SkillTreeVisualizer } from '@/components/progression/SkillTreeVisualizer/SkillTreeVisualizer';
import { SuperpowerDisplay } from '@/components/progression/SuperpowerDisplay/SuperpowerDisplay';
import { AchievementGrid } from '@/components/progression/AchievementGrid/AchievementGrid';
import { PrestigePanel } from '@/components/progression/PrestigePanel/PrestigePanel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useProgression } from '@/hooks/useProgression';
import { Trophy, Zap, Star, Sparkles } from 'lucide-react';

export const Progression = () => {
  const { progression, loading, unlockSkillNode, activateSuperpower, prestige } = useProgression();
  const [selectedTrait, setSelectedTrait] = useState('empathy');

  if (loading || !progression) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-xl">Loading progression...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Progression</h1>
        <p className="text-muted-foreground">Track your skills, powers, and achievements</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Level</p>
                <p className="text-2xl font-bold">{progression.level}</p>
              </div>
              <Star className="w-8 h-8 text-muted-foreground" />
            </div>
            <Progress value={(progression.xp / progression.xpForNext) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {progression.xp.toLocaleString()} / {progression.xpForNext.toLocaleString()} XP
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Prestige</p>
                <p className="text-2xl font-bold">{progression.prestigeLevel}</p>
              </div>
              <Sparkles className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Superpowers</p>
                <p className="text-2xl font-bold">{progression.superpowersUnlocked}</p>
              </div>
              <Zap className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Achievements</p>
                <p className="text-2xl font-bold">
                  {progression.achievementsUnlocked} / {progression.totalAchievements}
                </p>
              </div>
              <Trophy className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="skills">
        <TabsList>
          <TabsTrigger value="skills">
            <Star className="mr-2" />
            Skill Trees
          </TabsTrigger>
          <TabsTrigger value="superpowers">
            <Zap className="mr-2" />
            Superpowers
          </TabsTrigger>
          <TabsTrigger value="achievements">
            <Trophy className="mr-2" />
            Achievements
          </TabsTrigger>
          <TabsTrigger value="prestige">
            <Sparkles className="mr-2" />
            Prestige
          </TabsTrigger>
        </TabsList>

        <TabsContent value="skills">
          <div className="space-y-4">
            {/* Trait Selector */}
            <Card>
              <CardHeader>
                <CardTitle>Select Trait</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {Object.keys(progression.skillTreeProgress).map((trait) => (
                    <button
                      key={trait}
                      onClick={() => setSelectedTrait(trait)}
                      className={`p-3 rounded border-2 transition-all ${
                        selectedTrait === trait
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <span className="capitalize">{trait}</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Skill Tree Display */}
            <Card className="p-6">
              <p>Skill Tree Visualizer for {selectedTrait}</p>
              <p className="text-sm text-muted-foreground">Connect to API to load skill tree data</p>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="superpowers">
          <Card className="p-6">
            <p>Superpower Display</p>
            <p className="text-sm text-muted-foreground">Connect to API to load superpower data</p>
          </Card>
        </TabsContent>

        <TabsContent value="achievements">
          <Card className="p-6">
            <p>Achievement Grid</p>
            <p className="text-sm text-muted-foreground">Connect to API to load achievement data</p>
          </Card>
        </TabsContent>

        <TabsContent value="prestige">
          <Card className="p-6">
            <p>Prestige Panel</p>
            <p className="text-sm text-muted-foreground">Connect to API to load prestige data</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
