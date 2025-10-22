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

interface PlayerStats {
  player_id: string;
  username: string;
  level: number;
  combat_stats: {
    hp: number;
    max_hp: number;
    attack: number;
    defense: number;
    evasion: number;
    crit_chance: number;
    combat_rating: number;
  };
  derived_traits: {
    reputation: number;
    influence: number;
    trustworthiness: number;
    business_acumen: number;
    market_intuition: number;
    enlightenment: number;
    karmic_balance: number;
  };
  level_progress: {
    level: number;
    xp: number;
    xp_needed_for_next: number;
    xp_in_current_level: number;
    level_progress_percentage: number;
    next_level_xp_threshold: number;
  };
}

export const StatsOverview: React.FC = () => {
  const { player, isLoading: loading } = usePlayer();
  const [stats, setStats] = useState<PlayerStats | null>(null);
  const [activeTab, setActiveTab] = useState('combat');

  useEffect(() => {
    // In real implementation, fetch stats from API
    // For now, calculate from player data
    if (player) {
      // Mock stats calculation
      const calculatedStats: PlayerStats = {
        player_id: player._id,
        username: player.username,
        level: player.level,
        combat_stats: {
          hp: player.traits?.endurance * 10 || 500,
          max_hp: player.traits?.endurance * 10 || 500,
          attack: ((player.traits?.physical_strength || 50) + (player.traits?.dexterity || 50)) / 2,
          defense: ((player.traits?.resilience || 50) + (player.traits?.perception || 50)) / 2,
          evasion: (player.traits?.speed || 50) / 2,
          crit_chance: (player.traits?.perception || 50) / 4,
          combat_rating: player.meta_traits?.combat_rating || 0
        },
        derived_traits: {
          reputation: player.meta_traits?.reputation || 50,
          influence: player.meta_traits?.influence || 50,
          trustworthiness: player.meta_traits?.trustworthiness || 50,
          business_acumen: player.meta_traits?.business_acumen || 50,
          market_intuition: player.meta_traits?.market_intuition || 50,
          enlightenment: player.meta_traits?.enlightenment || 50,
          karmic_balance: player.meta_traits?.karmic_balance || 50
        },
        level_progress: {
          level: player.level,
          xp: player.xp || 0,
          xp_needed_for_next: ((player.level + 1) ** 2 * 100) - (player.xp || 0),
          xp_in_current_level: (player.xp || 0) - (player.level ** 2 * 100),
          level_progress_percentage: 0,
          next_level_xp_threshold: (player.level + 1) ** 2 * 100
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
      <Card>
        <CardHeader>
          <CardTitle>Loading Stats...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="loading-stats">
            <div className="skeleton-stat" />
            <div className="skeleton-stat" />
            <div className="skeleton-stat" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="stats-overview">
      {/* Level Progress */}
      <Card className="level-progress-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Level {stats.level}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="progress-info">
            <span className="xp-current">{stats.level_progress.xp.toLocaleString()} XP</span>
            <span className="xp-needed">
              {stats.level_progress.xp_needed_for_next.toLocaleString()} XP to level {stats.level + 1}
            </span>
          </div>
          <Progress 
            value={stats.level_progress.level_progress_percentage} 
            className="level-progress-bar"
          />
          <span className="progress-percentage">
            {stats.level_progress.level_progress_percentage.toFixed(1)}%
          </span>
        </CardContent>
      </Card>

      {/* Stats Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="stats-tabs">
        <TabsList className="stats-tabs-list">
          <TabsTrigger value="combat">
            <Shield className="w-4 h-4 mr-2" />
            Combat
          </TabsTrigger>
          <TabsTrigger value="social">
            <Activity className="w-4 h-4 mr-2" />
            Social
          </TabsTrigger>
          <TabsTrigger value="economic">
            <TrendingUp className="w-4 h-4 mr-2" />
            Economic
          </TabsTrigger>
        </TabsList>

        {/* Combat Stats */}
        <TabsContent value="combat" className="stats-tab-content">
          <Card>
            <CardHeader>
              <CardTitle>Combat Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="stats-grid">
                <StatItem
                  icon={<Heart className="stat-icon" />}
                  label="Health"
                  value={stats.combat_stats.hp}
                  max={stats.combat_stats.max_hp}
                  color="#ef4444"
                />
                <StatItem
                  icon={<Zap className="stat-icon" />}
                  label="Attack"
                  value={stats.combat_stats.attack}
                  color="#f59e0b"
                />
                <StatItem
                  icon={<Shield className="stat-icon" />}
                  label="Defense"
                  value={stats.combat_stats.defense}
                  color="#3b82f6"
                />
                <StatItem
                  icon={<Target className="stat-icon" />}
                  label="Evasion"
                  value={stats.combat_stats.evasion}
                  suffix="%"
                  color="#8b5cf6"
                />
                <StatItem
                  icon={<Zap className="stat-icon" />}
                  label="Crit Chance"
                  value={stats.combat_stats.crit_chance}
                  suffix="%"
                  color="#ec4899"
                />
                <StatItem
                  icon={<Award className="stat-icon" />}
                  label="Combat Rating"
                  value={stats.combat_stats.combat_rating}
                  color="#10b981"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social Stats */}
        <TabsContent value="social" className="stats-tab-content">
          <Card>
            <CardHeader>
              <CardTitle>Social Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="stats-grid">
                <StatItem
                  label="Reputation"
                  value={stats.derived_traits.reputation}
                  max={100}
                  showProgress
                  color="#6366f1"
                />
                <StatItem
                  label="Influence"
                  value={stats.derived_traits.influence}
                  max={100}
                  showProgress
                  color="#8b5cf6"
                />
                <StatItem
                  label="Trustworthiness"
                  value={stats.derived_traits.trustworthiness}
                  max={100}
                  showProgress
                  color="#10b981"
                />
                <StatItem
                  label="Karmic Balance"
                  value={stats.derived_traits.karmic_balance}
                  max={100}
                  showProgress
                  color="#f59e0b"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Economic Stats */}
        <TabsContent value="economic" className="stats-tab-content">
          <Card>
            <CardHeader>
              <CardTitle>Economic Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="stats-grid">
                <StatItem
                  label="Business Acumen"
                  value={stats.derived_traits.business_acumen}
                  max={100}
                  showProgress
                  color="#10b981"
                />
                <StatItem
                  label="Market Intuition"
                  value={stats.derived_traits.market_intuition}
                  max={100}
                  showProgress
                  color="#3b82f6"
                />
                <StatItem
                  label="Enlightenment"
                  value={stats.derived_traits.enlightenment}
                  max={100}
                  showProgress
                  color="#8b5cf6"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// StatItem sub-component
interface StatItemProps {
  icon?: React.ReactNode;
  label: string;
  value: number;
  max?: number;
  suffix?: string;
  showProgress?: boolean;
  color?: string;
}

const StatItem: React.FC<StatItemProps> = ({
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
    <div className="stat-item">
      {icon && <div className="stat-icon-wrapper">{icon}</div>}
      <div className="stat-content">
        <span className="stat-label">{label}</span>
        <span className="stat-value" style={{ color }}>
          {displayValue}
        </span>
        {showProgress && max && (
          <Progress value={percentage} className="stat-progress" />
        )}
      </div>
    </div>
  );
};
