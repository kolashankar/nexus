/**
 * Privacy Settings Component - Control what others can see.
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../ui/card';
import { Button } from '../../ui/button';
import { Label } from '../../ui/label';
import { Switch } from '../../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Badge } from '../../ui/badge';
import { toast } from 'sonner';
import { Shield, Eye, EyeOff, Lock, Save } from 'lucide-react';
import { usePlayer } from '../../../hooks/usePlayer';
import './PrivacySettings.css';



const PRIVACY_TIERS = [
  {
    value,
    label,
    description,
    cost,
    icon,
  {
    value,
    label,
    description,
    cost,
    icon,
  {
    value,
    label,
    description,
    cost,
    icon,
  {
    value,
    label,
    description,
    cost,
    icon,
  {
    value,
    label,
    description,
    cost,
    icon: 
  }
];

export const PrivacySettings: React.FC = () => {
  const { player, updatePlayer, isLoading: loading } = usePlayer();
  const [settings, setSettings] = useState({
    privacy_tier,
    cash,
    economic_class,
    moral_class,
    traits_public,
    superpowers,
    karma_score,
    guild,
    location);
  const [hasChanges, setHasChanges] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (player?.visibility) {
      setSettings(player.visibility);
    }
  }, [player]);

  const handleTierChange = (tier) => {
    const selectedTier = PRIVACY_TIERS.find(t => t.value === tier);
    
    if (selectedTier && selectedTier.cost > 0) {
      const currentCredits = player?.currencies?.credits || 0;
      if (currentCredits  ({
      ...prev,
      privacy_tier));
    setHasChanges(true);
  };

  const handleToggle = (field) => {
    setSettings(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setSaving(true);
    
    try {
      await updatePlayer({ visibility);
      
      const tier = PRIVACY_TIERS.find(t => t.value === settings.privacy_tier);
      if (tier && tier.cost > 0) {
        // Deduct cost
        toast.success('Privacy settings updated!', {
          description);
      } else {
        toast.success('Privacy settings updated!');
      }
      
      setHasChanges(false);
    } catch (error) {
      toast.error('Failed to update privacy settings');
    } finally {
      setSaving(false);
    }
  };

  const currentTier = PRIVACY_TIERS.find(t => t.value === settings.privacy_tier) || PRIVACY_TIERS[0];

  return (
    
      
        
          
          Privacy & Visibility
        
        
          Control what other players can see about you
        
      

      
        {/* Privacy Tier Selection */}
        
          Privacy Tier
          
            
              
            
            
              {PRIVACY_TIERS.map(tier => (
                
                  
                    {tier.icon}
                    {tier.label}
                    {tier.cost > 0 && (
                      
                        {tier.cost} credits
                      
                    )}
                  
                
              ))}
            
          
          
            {currentTier.description}
          
        

        {/* Individual Visibility Controls */}
        {settings.privacy_tier === 'selective' && (
          
            Visible Information
            
            
              
                Cash Amount
                Show your credits and currencies
              
               handleToggle('cash')}
              />
            

            
              
                Economic Class
                Show if you're rich, middle, or poor
              
               handleToggle('economic_class')}
              />
            

            
              
                Moral Class
                Show if you're good, average, or bad
              
               handleToggle('moral_class')}
              />
            

            
              
                Karma Score
                Show your current karma points
              
               handleToggle('karma_score')}
              />
            

            
              
                Superpowers
                Show your unlocked superpowers
              
               handleToggle('superpowers')}
              />
            

            
              
                Guild Membership
                Show which guild you belong to
              
               handleToggle('guild')}
              />
            

            
              
                Location
                Show your current location
              
               handleToggle('location')}
              />
            
          
        )}

        {/* Save Button */}
        
          
            
            {saving ? 'Saving...' : 'Save Settings'}
          
          
          {currentTier.cost > 0 && (
            
              This tier costs {currentTier.cost} credits per month
            
          )}
        
      
    
  );
};
