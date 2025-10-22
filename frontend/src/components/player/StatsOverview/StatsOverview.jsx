/**
 * Stats Overview Component - Displays comprehensive player stats.
 */

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import {
  Activity,
  Heart,
  Shield,
  Zap,
  TrendingUp,
  Target,
  Award
} from 'lucide-react';
import { usePlayer } from '../../../hooks/usePlayer';
import './StatsOverview.css';

;
  derived_traits: {
    reputation;
    influence;
    trustworthiness;
    business_acumen;
    market_intuition;
    enlightenment;
    karmic_balance;
  };
  level_progress: {
    level;
    xp;
    xp_needed_for_next;
    xp_in_current_level;
    level_progress_percentage;
    next_level_xp_threshold;
  };
}

export const StatsOverview: React.FC = () => {
  const { player, isLoading: loading } = usePlayer();
  const [stats, setStats] = useState(null);
  const [activeTab, setActiveTab] = useState('combat');

  useEffect(() => {
    // In real implementation, fetch stats from API
    // For now, calculate from player data
    if (player) {
      // Mock stats calculation
      const calculatedStats: PlayerStats = {
        player_id,
        username,
        level,
        combat_stats,
          max_hp,
          attack) + (player.traits?.dexterity || 50)) / 2,
          defense) + (player.traits?.perception || 50)) / 2,
          evasion) / 2,
          crit_chance) / 4,
          combat_rating,
        derived_traits,
          influence,
          trustworthiness,
          business_acumen,
          market_intuition,
          enlightenment,
          karmic_balance,
        level_progress,
          xp,
          xp_needed_for_next) ** 2 * 100) - (player.xp || 0),
          xp_in_current_level) - (player.level ** 2 * 100),
          level_progress_percentage,
          next_level_xp_threshold) ** 2 * 100
        }
      };

      const levelXp = player.level ** 2 * 100;
      const nextLevelXp = (player.level + 1) ** 2 * 100;
      calculatedStats.level_progress.level_progress_percentage = 
        ((player.xp - levelXp) / (nextLevelXp - levelXp)) * 100;

      setStats(calculatedStats);
    }
  }, [player]);

  if (loading || !stats) {
    return (
      
        
          Loading Stats...
        
        
          
            
            
            
          
        
      
    );
  }

  return (
    
      {/* Level Progress */}
      
        
          
            
            Level {stats.level}
          
        
        
          
            {stats.level_progress.xp.toLocaleString()} XP
            
              {stats.level_progress.xp_needed_for_next.toLocaleString()} XP to level {stats.level + 1}
            
          
          
          
            {stats.level_progress.level_progress_percentage.toFixed(1)}%
          
        
      

      {/* Stats Tabs */}
      
        
          
            
            Combat
          
          
            
            Social
          
          
            
            Economic
          
        

        {/* Combat Stats */}
        
          
            
              Combat Statistics
            
            
              
                }
                  label="Health"
                  value={stats.combat_stats.hp}
                  max={stats.combat_stats.max_hp}
                  color="#ef4444"
                />
                }
                  label="Attack"
                  value={stats.combat_stats.attack}
                  color="#f59e0b"
                />
                }
                  label="Defense"
                  value={stats.combat_stats.defense}
                  color="#3b82f6"
                />
                }
                  label="Evasion"
                  value={stats.combat_stats.evasion}
                  suffix="%"
                  color="#8b5cf6"
                />
                }
                  label="Crit Chance"
                  value={stats.combat_stats.crit_chance}
                  suffix="%"
                  color="#ec4899"
                />
                }
                  label="Combat Rating"
                  value={stats.combat_stats.combat_rating}
                  color="#10b981"
                />
              
            
          
        

        {/* Social Stats */}
        
          
            
              Social Statistics
            
            
              
                
                
                
                
              
            
          
        

        {/* Economic Stats */}
        
          
            
              Economic Statistics
            
            
              
                
                
                
              
            
          
        
      
    
  );
};

// StatItem sub-component


const StatItem: React.FC = ({
  icon,
  label,
  value,
  max,
  suffix = '',
  showProgress = false,
  color = '#3b82f6'
}) => {
  const displayValue = max ? `${value}/${max}` : `${value}${suffix}`;
  const percentage = max ? (value / max) * 100 : 0;

  return (
    
      {icon && {icon}}
      
        {label}
        
          {displayValue}
        
        {showProgress && max && (
          
        )}
      
    
  );
};
