import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Progress } from '../../ui/progress';
import { Lock, Check, Crown, Gift } from 'lucide-react';
import { useBattlePass } from '../../../hooks/useBattlePass';

interface Reward {
  reward_type: string;
  name: string;
  description: string;
  amount: number;
  rarity: string;
  is_premium_only?: boolean;
}

interface Tier {
  tier: number;
  xp_required: number;
  free_rewards: Reward[];
  premium_rewards: Reward[];
  is_locked: boolean;
}

interface BattlePassTrackProps {
  tiers: Tier[];
  currentTier: number;
  currentXp: number;
  hasPremium: boolean;
  claimedFree: number[];
  claimedPremium: number[];
  onClaimRewards: (tier: number) => void;
  onPurchasePremium: () => void;
}

const BattlePassTrack: React.FC<BattlePassTrackProps> = ({
  tiers,
  currentTier,
  currentXp,
  hasPremium,
  claimedFree,
  claimedPremium,
  onClaimRewards,
  onPurchasePremium
}) => {
  const [selectedTier, setSelectedTier] = useState<number | null>(null);

  const getRarityColor = (rarity: string): string => {
    const colors: Record<string, string> = {
      common: 'bg-gray-500',
      rare: 'bg-blue-500',
      epic: 'bg-purple-500',
      legendary: 'bg-yellow-500'
    };
    return colors[rarity] || 'bg-gray-500';
  };

  const calculateProgress = (tierIndex: number): number => {
    if (tierIndex === 0) return 100;
    if (tierIndex > currentTier) return 0;
    if (tierIndex < currentTier) return 100;
    
    // Current tier - calculate partial progress
    const prevTier = tiers[tierIndex - 1];
    const currentTierData = tiers[tierIndex];
    const xpForThisTier = currentTierData.xp_required - prevTier.xp_required;
    const xpInThisTier = currentXp - prevTier.xp_required;
    
    return (xpInThisTier / xpForThisTier) * 100;
  };

  const canClaimRewards = (tier: number): boolean => {
    return tier <= currentTier && !claimedFree.includes(tier);
  };

  const renderReward = (reward: Reward, index: number) => (
    <div
      key={index}
      className="flex flex-col items-center p-2 rounded-lg bg-secondary/20 hover:bg-secondary/40 transition-colors"
    >
      <div className={`w-12 h-12 rounded-lg ${getRarityColor(reward.rarity)} flex items-center justify-center mb-2`}>
        <Gift className="h-6 w-6 text-white" />
      </div>
      <p className="text-xs text-center font-medium">{reward.name}</p>
      {reward.amount > 1 && (
        <span className="text-xs text-muted-foreground">x{reward.amount}</span>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Battle Pass</h2>
          <p className="text-sm text-muted-foreground">
            Tier {currentTier} / {tiers.length}
          </p>
        </div>
        {!hasPremium && (
          <Button onClick={onPurchasePremium} className="gap-2">
            <Crown className="h-4 w-4" />
            Upgrade to Premium
          </Button>
        )}
      </div>

      {/* Overall Progress */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span className="font-bold">{currentXp.toLocaleString()} XP</span>
            </div>
            <Progress value={(currentTier / tiers.length) * 100} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Tier Track */}
      <div className="space-y-4">
        {tiers.map((tier, index) => {
          const isUnlocked = tier.tier <= currentTier;
          const freeClaimed = claimedFree.includes(tier.tier);
          const premiumClaimed = claimedPremium.includes(tier.tier);
          const progress = calculateProgress(index);

          return (
            <Card
              key={tier.tier}
              className={`relative ${isUnlocked ? 'border-primary/50' : 'opacity-50'}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant={isUnlocked ? "default" : "secondary"}>
                      Tier {tier.tier}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {tier.xp_required.toLocaleString()} XP
                    </span>
                  </div>
                  {!isUnlocked && <Lock className="h-5 w-5 text-muted-foreground" />}
                  {isUnlocked && canClaimRewards(tier.tier) && (
                    <Button
                      onClick={() => onClaimRewards(tier.tier)}
                      size="sm"
                      className="gap-2"
                    >
                      <Gift className="h-4 w-4" />
                      Claim
                    </Button>
                  )}
                  {freeClaimed && (
                    <Check className="h-5 w-5 text-green-500" />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {/* Progress Bar */}
                {tier.tier === currentTier && (
                  <div className="mb-4">
                    <Progress value={progress} className="h-2" />
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Free Track */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-sm font-semibold">Free Rewards</h4>
                      {freeClaimed && (
                        <Badge variant="outline" className="text-xs">
                          Claimed
                        </Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {tier.free_rewards.map((reward, idx) => renderReward(reward, idx))}
                    </div>
                  </div>

                  {/* Premium Track */}
                  <div className="space-y-2 relative">
                    <div className="flex items-center gap-2 mb-2">
                      <Crown className="h-4 w-4 text-yellow-500" />
                      <h4 className="text-sm font-semibold">Premium Rewards</h4>
                      {premiumClaimed && (
                        <Badge variant="outline" className="text-xs">
                          Claimed
                        </Badge>
                      )}
                    </div>
                    {!hasPremium && (
                      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-lg flex items-center justify-center">
                        <Lock className="h-8 w-8 text-white" />
                      </div>
                    )}
                    <div className="grid grid-cols-3 gap-2">
                      {tier.premium_rewards.map((reward, idx) => renderReward(reward, idx))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default BattlePassTrack;
