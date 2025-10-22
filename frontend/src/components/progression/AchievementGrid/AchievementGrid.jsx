import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Trophy, Lock, Search, Star } from 'lucide-react';





export const AchievementGrid = ({ 
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
    
      {/* Stats Overview */}
      
        
          
            
              
                Unlocked
                {stats.unlocked}
              
              
            
          
        
        
          
            
              
                Total
                {stats.total}
              
              
            
          
        
        
          
            
              
                Completion
                {stats.percentage.toFixed(1)}%
              
              
            
          
        
      

      {/* Search and Filters */}
      
        
          
           setSearchQuery(e.target.value)}
            className="pl-10"
          />
        
      

      {/* Category Tabs */}
      
        
          {categories.map((cat) => (
            
              {cat}
            
          ))}
        

        {/* Achievement Grid */}
        
          {filteredAchievements.map((achievement) => (
             onAchievementClick(achievement.id)}
            >
              
                
                  
                    {achievement.unlocked ? (
                      
                    ) : (
                      
                    )}
                  
                  
                  
                    
                      {achievement.name}
                      {achievement.hidden && (
                        
                          Hidden
                        
                      )}
                    
                    
                    
                      {achievement.description}
                    
                    
                    {/* Progress Bar for In-Progress Achievements */}
                    {!achievement.unlocked && achievement.progress !== undefined && achievement.total !== undefined && (
                      
                        
                          Progress
                          
                            {achievement.progress} / {achievement.total}
                          
                        
                        
                      
                    )}
                    
                    {/* Rewards */}
                    
                      {Object.entries(achievement.rewards).map(([key, value]) => (
                        
                          +{value} {key}
                        
                      ))}
                    
                    
                    {/* Category Badge */}
                    
                      {achievement.category}
                    
                  
                
              
            
          ))}
        

        {filteredAchievements.length === 0 && (
          
            
            No achievements found
          
        )}
      
    
  );
};
