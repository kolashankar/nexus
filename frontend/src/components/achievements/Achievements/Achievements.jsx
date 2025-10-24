import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Input } from '../../ui/input';
import achievementsService from '../../../services/achievements/achievementsService';
import AchievementCard from './AchievementCard';
import { Progress } from '../../ui/progress';

const Achievements = () => {
  const [achievements, setAchievements] = useState(null);
  const [allAchievements, setAllAchievements] = useState([]);
  const [filteredAchievements, setFilteredAchievements] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
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
      console.error('Failed to fetch achievements', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllAchievements = async () => {
    try {
      const data = await achievementsService.getAchievementDefinitions();
      setAllAchievements(data);
    } catch (error) {
      console.error('Failed to fetch achievement definitions', error);
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

  const isUnlocked = (achievementId) => {
    return achievements?.unlocked_achievements.some((a) => a.achievement_id === achievementId);
  };

  const getProgress = (achievementId) => {
    return achievements?.achievement_progress[achievementId];
  };

  if (loading) {
    return <div>Loading achievements...</div>;
  }

  const categories = ['combat', 'social', 'economy', 'exploration', 'special'];

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle>Achievements</CardTitle>
            {achievements && (
              <div className="text-right">
                <Badge variant="secondary">
                  {achievements.unlocked_achievements.length}/{allAchievements.length}
                </Badge>
                <p className="text-sm text-muted-foreground mt-1">
                  {achievements.total_points} Points
                </p>
              </div>
            )}
          </div>
          {achievements && (
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Completion</span>
                <span>{achievements.completion_percentage.toFixed(1)}%</span>
              </div>
              <Progress value={achievements.completion_percentage} />
            </div>
          )}
        </CardHeader>
        <CardContent>
          {/* Search and Filters */}
          <div className="mb-6 space-y-4">
            <Input placeholder="Search achievements..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

            <div className="flex gap-2 flex-wrap">
              <Badge variant={selectedCategory === null ? 'default' : 'outline'} className="cursor-pointer" onClick={() => setSelectedCategory(null)}>
                All
              </Badge>
              {categories.map((category) => (
                <Badge key={category} variant={selectedCategory === category ? 'default' : 'outline'} className="cursor-pointer" onClick={() => setSelectedCategory(category)}>
                  {category.replace('_', ' ')}
                </Badge>
              ))}
            </div>
          </div>

          {/* Achievement Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAchievements.map((achievement) => (
              <AchievementCard key={achievement._id} achievement={achievement} unlocked={isUnlocked(achievement._id)} progress={getProgress(achievement._id)} />
            ))}
          </div>

          {filteredAchievements.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No achievements found matching your criteria
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Achievements;
