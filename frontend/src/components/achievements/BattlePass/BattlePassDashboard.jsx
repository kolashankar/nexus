import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Alert, AlertDescription } from '../../ui/alert';
import { Trophy, Calendar, Users } from 'lucide-react';
import { useBattlePass } from '../../../hooks/useBattlePass';
import BattlePassTrack from './BattlePassTrack';
import { toast } from 'sonner';

const BattlePassDashboard = () => {
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

  const handleClaimRewards = async (tier) => {
    try {
      const result = await claimRewards(tier);
      toast.success(`Claimed rewards for Tier ${tier}!`, {
        description);
      await refreshProgress();
    } catch (error) {
      toast.error('Failed to claim rewards', {
        description);
    }
  };

  const handlePurchasePremium = async () => {
    try {
      await purchasePremium();
      toast.success('Premium Battle Pass activated!', {
        description);
      await refreshProgress();
    } catch (error) {
      toast.error('Failed to purchase premium', {
        description);
    }
  };

  const calculateDaysRemaining = ()=> {
    if (!battlePass) return 0;
    const end = new Date(battlePass.end_date);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  if (loading) {
    return (
      
        
      
    );
  }

  if (error || !battlePass || !progress) {
    return (
      
        
          {error || 'No active battle pass found. Check back later!'}
        
      
    );
  }

  const daysRemaining = calculateDaysRemaining();

  return (
    
      {/* Stats Overview */}
      
        
          
            
              Current Tier
            
          
          
            
              
              {progress.current_tier}
              / {battlePass.total_tiers}
            
          
        

        
          
            
              Time Remaining
            
          
          
            
              
              {daysRemaining}
              days
            
          
        

        
          
            
              Total XP Earned
            
          
          
            
              
              
                {progress.total_xp_earned.toLocaleString()}
              
            
          
        
      

      {/* Battle Pass Track */}
      
    
  );
};

export default BattlePassDashboard;
