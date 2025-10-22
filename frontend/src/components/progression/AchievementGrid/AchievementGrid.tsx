import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Trophy, Lock, Search, Star } from 'lucide-react';

interface Achievement {
  id: string;
  name: string;
  description: string;
  category: string;
  rewards: Record<string, number>;
  unlocked: boolean;
  progress?: number;
  total?: number;
  hidden: boolean;
}

interface AchievementGridProps {
  achievements: Achievement[];
  onAchievementClick: (achievementId: string) => void;
}

export const AchievementGrid: React.FC<AchievementGridProps> = ({
  achievements,
  onAchievementClick
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = useMemo(() => {
    const cats = new Set(achievements.map(a => a.category));
    return ['all', ...Array.from(cats)];
  }, [achievements]);

  const filteredAchievements = useMemo(() => {
    return achievements.filter(achievement => {
      // Filter hidden achievements that aren't unlocked
      if (achievement.hidden && !achievement.unlocked) {
        return false;
      }

      // Filter by category
      if (selectedCategory !== 'all' && achievement.category !== selectedCategory) {
        return false;
      }

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          achievement.name.toLowerCase().includes(query) ||
          achievement.description.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [achievements, selectedCategory, searchQuery]);

  const stats = useMemo(() => {
    const total = achievements.filter(a => !a.hidden).length;
    const unlocked = achievements.filter(a => a.unlocked).length;
    const percentage = total > 0 ? (unlocked / total) * 100 : 0;
    return { total, unlocked, percentage };
  }, [achievements]);

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Unlocked</p>
                <p className="text-3xl font-bold">{stats.unlocked}</p>
              </div>
              <Trophy className="w-10 h-10 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-3xl font-bold">{stats.total}</p>
              </div>
              <Star className="w-10 h-10 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">Completion</p>
                <p className="text-sm font-semibold">{stats.percentage.toFixed(1)}%</p>
              </div>
              <Progress value={stats.percentage} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search achievements..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-5 lg:grid-cols-11">
          {categories.map((cat) => (
            <TabsTrigger key={cat} value={cat} className="text-xs">
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Achievement Grid */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAchievements.map((achievement) => (
            <Card
              key={achievement.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                achievement.unlocked
                  ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-950'
                  : 'opacity-75'
              }`}
              onClick={() => onAchievementClick(achievement.id)}
            >
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <div
                    className={`p-3 rounded-full ${
                      achievement.unlocked
                        ? 'bg-yellow-500'
                        : 'bg-gray-300 dark:bg-gray-700'
                    }`}
                  >
                    {achievement.unlocked ? (
                      <Trophy className="w-6 h-6 text-white" />
                    ) : (
                      <Lock className="w-6 h-6 text-gray-500" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-sm">{achievement.name}</h3>
                      {achievement.hidden && (
                        <Badge variant="secondary" className="text-xs">
                          Hidden
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                      {achievement.description}
                    </p>
                    
                    {/* Progress Bar for In-Progress Achievements */}
                    {!achievement.unlocked && achievement.progress !== undefined && achievement.total !== undefined && (
                      <div className="mb-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-500">Progress</span>
                          <span className="text-gray-600 font-medium">
                            {achievement.progress} / {achievement.total}
                          </span>
                        </div>
                        <Progress value={(achievement.progress / achievement.total) * 100} className="h-2" />
                      </div>
                    )}
                    
                    {/* Rewards */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {Object.entries(achievement.rewards).map(([key, value]) => (
                        <Badge key={key} variant="outline" className="text-xs">
                          +{value} {key}
                        </Badge>
                      ))}
                    </div>
                    
                    {/* Category Badge */}
                    <Badge variant="secondary" className="mt-2 text-xs">
                      {achievement.category}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAchievements.length === 0 && (
          <div className="text-center py-12">
            <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No achievements found</p>
          </div>
        )}
      </Tabs>
    </div>
  );
};
