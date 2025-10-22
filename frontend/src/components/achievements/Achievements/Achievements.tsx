import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Input } from '../../ui/input';
import achievementsService from '../../../services/achievements/achievementsService';
import type {
  PlayerAchievements,
  AchievementDefinition,
} from '../../../types/achievements';
import { AchievementCategory } from '../../../types/achievements';
import AchievementCard from './AchievementCard';
import { Progress } from '../../ui/progress';

const Achievements: React.FC = () => {
  const [achievements, setAchievements] = useState<PlayerAchievements | null>(null);
  const [allAchievements, setAllAchievements] = useState<AchievementDefinition[]>([]);
  const [filteredAchievements, setFilteredAchievements] = useState<AchievementDefinition[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<AchievementCategory | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAchievements();
    fetchAllAchievements();
  }, []);

  useEffect(() => {
    filterAchievements();
  }, [searchTerm, selectedCategory, allAchievements]);

  const fetchAchievements = async () => {
    try {
      const data = await achievementsService.getAchievements();
      setAchievements(data);
    } catch (error) {
      console.error('Failed to fetch achievements:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllAchievements = async () => {
    try {
      const data = await achievementsService.getAchievementDefinitions();
      setAllAchievements(data);
    } catch (error) {
      console.error('Failed to fetch achievement definitions:', error);
    }
  };

  const filterAchievements = () => {
    let filtered = allAchievements;

    if (selectedCategory) {
      filtered = filtered.filter((a) => a.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (a) =>
          a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          a.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredAchievements(filtered);
  };

  const isUnlocked = (achievementId: string) => {
    return achievements?.unlocked_achievements.some((a) => a.achievement_id === achievementId);
  };

  const getProgress = (achievementId: string) => {
    return achievements?.achievement_progress[achievementId];
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading achievements...</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-3xl">Achievements</CardTitle>
            {achievements && (
              <div className="flex gap-2">
                <Badge variant="secondary">
                  {achievements.unlocked_achievements.length}/{allAchievements.length}
                </Badge>
                <Badge>Points: {achievements.total_points}</Badge>
              </div>
            )}
          </div>
          {achievements && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2 text-sm">
                <span>Completion</span>
                <span>{achievements.completion_percentage.toFixed(1)}%</span>
              </div>
              <Progress value={achievements.completion_percentage} className="h-2" />
            </div>
          )}
        </CardHeader>
        <CardContent>
          {/* Search and Filters */}
          <div className="mb-6 space-y-4">
            <Input
              placeholder="Search achievements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="flex flex-wrap gap-2">
              <Badge
                variant={!selectedCategory ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(null)}
              >
                All
              </Badge>
              {Object.values(AchievementCategory).map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  className="cursor-pointer capitalize"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.replace('_', ' ')}
                </Badge>
              ))}
            </div>
          </div>

          {/* Achievement Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAchievements.map((achievement) => (
              <AchievementCard
                key={achievement.achievement_id}
                achievement={achievement}
                unlocked={isUnlocked(achievement.achievement_id)}
                progress={getProgress(achievement.achievement_id)}
              />
            ))}
          </div>

          {filteredAchievements.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No achievements found matching your criteria
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Achievements;
