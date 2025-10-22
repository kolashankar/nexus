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

export const Progression: React.FC = () => {
  const { progression, loading, unlockSkillNode, activateSuperpower, prestige } = useProgression();
  const [selectedTrait, setSelectedTrait] = useState('empathy');

  if (loading || !progression) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4" />
          <p>Loading progression...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Progression</h1>
        <p className="text-gray-600">Track your skills, powers, and achievements</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Level</p>
                <p className="text-3xl font-bold">{progression.level}</p>
              </div>
              <Star className="w-10 h-10 text-blue-500" />
            </div>
            <div className="mt-4">
              <Progress value={(progression.xp / progression.xpForNext) * 100} />
              <p className="text-xs text-gray-500 mt-1">
                {progression.xp.toLocaleString()} / {progression.xpForNext.toLocaleString()} XP
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Prestige</p>
                <p className="text-3xl font-bold">{progression.prestigeLevel}</p>
              </div>
              <Sparkles className="w-10 h-10 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Superpowers</p>
                <p className="text-3xl font-bold">{progression.superpowersUnlocked}</p>
              </div>
              <Zap className="w-10 h-10 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Achievements</p>
                <p className="text-3xl font-bold">
                  {progression.achievementsUnlocked} / {progression.totalAchievements}
                </p>
              </div>
              <Trophy className="w-10 h-10 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="skills" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="skills">
            <Star className="w-4 h-4 mr-2" />
            Skill Trees
          </TabsTrigger>
          <TabsTrigger value="powers">
            <Zap className="w-4 h-4 mr-2" />
            Superpowers
          </TabsTrigger>
          <TabsTrigger value="achievements">
            <Trophy className="w-4 h-4 mr-2" />
            Achievements
          </TabsTrigger>
          <TabsTrigger value="prestige">
            <Sparkles className="w-4 h-4 mr-2" />
            Prestige
          </TabsTrigger>
        </TabsList>

        <TabsContent value="skills" className="mt-6">
          <div className="space-y-4">
            {/* Trait Selector */}
            <Card>
              <CardHeader>
                <CardTitle>Select Trait</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                  {Object.keys(progression.skillTreeProgress).map((trait) => (
                    <button
                      key={trait}
                      onClick={() => setSelectedTrait(trait)}
                      className={`p-3 rounded border-2 transition-all ${
                        selectedTrait === trait
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-950'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <p className="text-sm font-medium truncate">
                        {trait.replace(/_/g, ' ')}
                      </p>
                      <Progress
                        value={progression.skillTreeProgress[trait] || 0}
                        className="h-1 mt-2"
                      />
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Skill Tree Display - Would need actual data */}
            <div className="text-center p-12 border-2 border-dashed rounded-lg">
              <p className="text-gray-500">Skill Tree Visualizer for <strong>{selectedTrait}</strong></p>
              <p className="text-sm text-gray-400 mt-2">Connect to API to load skill tree data</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="powers" className="mt-6">
          <div className="text-center p-12 border-2 border-dashed rounded-lg">
            <Zap className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <p className="text-gray-500">Superpower Display</p>
            <p className="text-sm text-gray-400 mt-2">Connect to API to load superpower data</p>
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="mt-6">
          <div className="text-center p-12 border-2 border-dashed rounded-lg">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <p className="text-gray-500">Achievement Grid</p>
            <p className="text-sm text-gray-400 mt-2">Connect to API to load achievement data</p>
          </div>
        </TabsContent>

        <TabsContent value="prestige" className="mt-6">
          <div className="text-center p-12 border-2 border-dashed rounded-lg">
            <Sparkles className="w-16 h-16 text-purple-500 mx-auto mb-4" />
            <p className="text-gray-500">Prestige Panel</p>
            <p className="text-sm text-gray-400 mt-2">Connect to API to load prestige data</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
