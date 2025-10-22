import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Input } from '../../ui/input';
import achievementsService from '../../../services/achievements/achievementsService';
import { AchievementCategory } from '../../../types/achievements';
import AchievementCard from './AchievementCard';
import { Progress } from '../../ui/progress';

const Achievements: React.FC = () => {
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
      console.error('Failed to fetch achievements, error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllAchievements = async () => {
    try {
      const data = await achievementsService.getAchievementDefinitions();
      setAllAchievements(data);
    } catch (error) {
      console.error('Failed to fetch achievement definitions, error);
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
    return Loading achievements...;
  }

  return (
    
      
        
          
            Achievements
            {achievements && (
              
                
                  {achievements.unlocked_achievements.length}/{allAchievements.length}
                
                Points)}
          
          {achievements && (
            
              
                Completion
                {achievements.completion_percentage.toFixed(1)}%
              
              
            
          )}
        
        
          {/* Search and Filters */}
          
             setSearchTerm(e.target.value)} />

            
               setSelectedCategory(null)}
              >
                All
              
              {Object.values(AchievementCategory).map((category) => (
                 setSelectedCategory(category)}
                >
                  {category.replace('_', ' ')}
                
              ))}
            
          

          {/* Achievement Grid */}
          
            {filteredAchievements.map((achievement) => (
              
            ))}
          

          {filteredAchievements.length === 0 && (
            
              No achievements found matching your criteria
            
          )}
        
      
    
  );
};

export default Achievements;
