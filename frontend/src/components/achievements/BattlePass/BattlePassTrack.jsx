import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Progress } from '../../ui/progress';
import { Lock, Check, Crown, Gift } from 'lucide-react';
import { useBattlePass } from '../../../hooks/useBattlePass';







const BattlePassTrack = ({ 
  tiers,
  currentTier,
  currentXp,
  hasPremium,
  claimedFree,
  claimedPremium,
  onClaimRewards,
  onPurchasePremium
 }) => {
  const [selectedTier, setSelectedTier] = useState(null);

  const getRarityColor = (rarity)=> {
    const colors= {
      common,
      rare,
      epic,
      legendary
    };
    return colors[rarity] || 'bg-gray-500';
  };

  const calculateProgress = (tierIndex)=> {
    if (tierIndex === 0) return 100;
    if (tierIndex > currentTier) return 0;
    if (tierIndex  {
    return tier  (
    
      
        
      
      {reward.name}
      {reward.amount > 1 && (
        x{reward.amount}
      )}
    
  );

  return (
    
      {/* Header */}
      
        
          Battle Pass
          
            Tier {currentTier} / {tiers.length}
          
        
        {!hasPremium && (
          
            
            Upgrade to Premium
          
        )}
      

      {/* Overall Progress */}
      
        
          
            
              Overall Progress
              {currentXp.toLocaleString()} XP
            
            
          
        
      

      {/* Tier Track */}
      
        {tiers.map((tier, index) => {
          const isUnlocked = tier.tier 
              
                
                  
                    
                      Tier {tier.tier}
                    
                    
                      {tier.xp_required.toLocaleString()} XP
                    
                  
                  {!isUnlocked && }
                  {isUnlocked && canClaimRewards(tier.tier) && (
                     onClaimRewards(tier.tier)}
                      size="sm"
                      className="gap-2"
                    >
                      
                      Claim
                    
                  )}
                  {freeClaimed && (
                    
                  )}
                
              
              
                {/* Progress Bar */}
                {tier.tier === currentTier && (
                  
                    
                  
                )}

                
                  {/* Free Track */}
                  
                    
                      Free Rewards
                      {freeClaimed && (
                        
                          Claimed
                        
                      )}
                    
                    
                      {tier.free_rewards.map((reward, idx) => renderReward(reward, idx))}
                    
                  

                  {/* Premium Track */}
                  
                    
                      
                      Premium Rewards
                      {premiumClaimed && (
                        
                          Claimed
                        
                      )}
                    
                    {!hasPremium && (
                      
                        
                      
                    )}
                    
                      {tier.premium_rewards.map((reward, idx) => renderReward(reward, idx))}
                    
                  
                
              
            
          );
        })}
      
    
  );
};

export default BattlePassTrack;
