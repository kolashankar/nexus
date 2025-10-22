import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Alert, AlertDescription } from '../../ui/alert';
import { Trophy, Calendar, Users } from 'lucide-react';
import { useBattlePass } from '../../../hooks/useBattlePass';
import BattlePassTrack from './BattlePassTrack';
import { toast } from 'sonner';

const BattlePassDashboard: React.FC = () => {
  const {
    battlePass,
    progress,
    loading,
    error,
    claimRewards,
    purchasePremium,
    refreshProgress
  } = useBattlePass();

  useEffect(() => {
    refreshProgress();
  }, []);

  const handleClaimRewards = async (tier: number) => {
    try {
      const result = await claimRewards(tier);
      toast.success(`Claimed rewards for Tier ${tier}!`, {
        description: `${result.rewards_claimed.length} rewards added to your inventory`
      });
      await refreshProgress();
    } catch (error: any) {
      toast.error('Failed to claim rewards', {
        description: error.message || 'Please try again'
      });
    }
  };

  const handlePurchasePremium = async () => {
    try {
      await purchasePremium();
      toast.success('Premium Battle Pass activated!', {
        description: 'You now have access to all premium rewards'
      });
      await refreshProgress();
    } catch (error: any) {
      toast.error('Failed to purchase premium', {
        description: error.message || 'Please try again'
      });
    }
  };

  const calculateDaysRemaining = (): number => {
    if (!battlePass) return 0;
    const end = new Date(battlePass.end_date);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !battlePass || !progress) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          {error || 'No active battle pass found. Check back later!'}
        </AlertDescription>
      </Alert>
    );
  }

  const daysRemaining = calculateDaysRemaining();

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Current Tier
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Trophy className="h-8 w-8 text-primary" />
              <span className="text-3xl font-bold">{progress.current_tier}</span>
              <span className="text-muted-foreground">/ {battlePass.total_tiers}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Time Remaining
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Calendar className="h-8 w-8 text-primary" />
              <span className="text-3xl font-bold">{daysRemaining}</span>
              <span className="text-muted-foreground">days</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total XP Earned
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Users className="h-8 w-8 text-primary" />
              <span className="text-3xl font-bold">
                {progress.total_xp_earned.toLocaleString()}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Battle Pass Track */}
      <BattlePassTrack
        tiers={battlePass.tiers}
        currentTier={progress.current_tier}
        currentXp={progress.current_xp}
        hasPremium={progress.has_premium}
        claimedFree={progress.claimed_free_rewards}
        claimedPremium={progress.claimed_premium_rewards}
        onClaimRewards={handleClaimRewards}
        onPurchasePremium={handlePurchasePremium}
      />
    </div>
  );
};

export default BattlePassDashboard;
