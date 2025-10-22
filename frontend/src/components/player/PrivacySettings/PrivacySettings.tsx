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

interface VisibilitySettings {
  privacy_tier: 'public' | 'selective' | 'private' | 'ghost' | 'phantom';
  cash: boolean;
  economic_class: boolean;
  moral_class: boolean;
  traits_public: string[];
  superpowers: boolean;
  karma_score: boolean;
  guild: boolean;
  location: boolean;
}

const PRIVACY_TIERS = [
  {
    value: 'public',
    label: 'Public',
    description: 'Everything visible',
    cost: 0,
    icon: <Eye className="w-4 h-4" />
  },
  {
    value: 'selective',
    label: 'Selective',
    description: 'Choose what to show',
    cost: 100,
    icon: <Eye className="w-4 h-4" />
  },
  {
    value: 'private',
    label: 'Private',
    description: 'Most hidden',
    cost: 500,
    icon: <EyeOff className="w-4 h-4" />
  },
  {
    value: 'ghost',
    label: 'Ghost',
    description: 'Nearly invisible',
    cost: 1000,
    icon: <Shield className="w-4 h-4" />
  },
  {
    value: 'phantom',
    label: 'Phantom',
    description: 'Untraceable',
    cost: 2500,
    icon: <Lock className="w-4 h-4" />
  }
];

export const PrivacySettings: React.FC = () => {
  const { player, updatePlayer, isLoading: loading } = usePlayer();
  const [settings, setSettings] = useState<VisibilitySettings>({
    privacy_tier: 'public',
    cash: true,
    economic_class: true,
    moral_class: true,
    traits_public: [],
    superpowers: true,
    karma_score: true,
    guild: true,
    location: true
  });
  const [hasChanges, setHasChanges] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (player?.visibility) {
      setSettings(player.visibility);
    }
  }, [player]);

  const handleTierChange = (tier: string) => {
    const selectedTier = PRIVACY_TIERS.find(t => t.value === tier);
    
    if (selectedTier && selectedTier.cost > 0) {
      const currentCredits = player?.currencies?.credits || 0;
      if (currentCredits < selectedTier.cost) {
        toast.error('Insufficient credits', {
          description: `You need ${selectedTier.cost} credits for this privacy tier`
        });
        return;
      }
    }

    setSettings(prev => ({
      ...prev,
      privacy_tier: tier as any
    }));
    setHasChanges(true);
  };

  const handleToggle = (field: keyof VisibilitySettings) => {
    setSettings(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setSaving(true);
    
    try {
      await updatePlayer({ visibility: settings });
      
      const tier = PRIVACY_TIERS.find(t => t.value === settings.privacy_tier);
      if (tier && tier.cost > 0) {
        // Deduct cost
        toast.success('Privacy settings updated!', {
          description: `${tier.cost} credits deducted`
        });
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
    <Card className="privacy-settings-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Privacy & Visibility
        </CardTitle>
        <CardDescription>
          Control what other players can see about you
        </CardDescription>
      </CardHeader>

      <CardContent className="privacy-content">
        {/* Privacy Tier Selection */}
        <div className="privacy-tier-section">
          <Label>Privacy Tier</Label>
          <Select value={settings.privacy_tier} onValueChange={handleTierChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PRIVACY_TIERS.map(tier => (
                <SelectItem key={tier.value} value={tier.value}>
                  <div className="tier-option">
                    {tier.icon}
                    <span>{tier.label}</span>
                    {tier.cost > 0 && (
                      <Badge variant="outline" className="ml-auto">
                        {tier.cost} credits
                      </Badge>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="tier-description">
            {currentTier.description}
          </p>
        </div>

        {/* Individual Visibility Controls */}
        {settings.privacy_tier === 'selective' && (
          <div className="visibility-controls">
            <h3 className="controls-title">Visible Information</h3>
            
            <div className="control-item">
              <div className="control-label">
                <Label htmlFor="cash">Cash Amount</Label>
                <p className="control-description">Show your credits and currencies</p>
              </div>
              <Switch
                id="cash"
                checked={settings.cash}
                onCheckedChange={() => handleToggle('cash')}
              />
            </div>

            <div className="control-item">
              <div className="control-label">
                <Label htmlFor="economic">Economic Class</Label>
                <p className="control-description">Show if you're rich, middle, or poor</p>
              </div>
              <Switch
                id="economic"
                checked={settings.economic_class}
                onCheckedChange={() => handleToggle('economic_class')}
              />
            </div>

            <div className="control-item">
              <div className="control-label">
                <Label htmlFor="moral">Moral Class</Label>
                <p className="control-description">Show if you're good, average, or bad</p>
              </div>
              <Switch
                id="moral"
                checked={settings.moral_class}
                onCheckedChange={() => handleToggle('moral_class')}
              />
            </div>

            <div className="control-item">
              <div className="control-label">
                <Label htmlFor="karma">Karma Score</Label>
                <p className="control-description">Show your current karma points</p>
              </div>
              <Switch
                id="karma"
                checked={settings.karma_score}
                onCheckedChange={() => handleToggle('karma_score')}
              />
            </div>

            <div className="control-item">
              <div className="control-label">
                <Label htmlFor="powers">Superpowers</Label>
                <p className="control-description">Show your unlocked superpowers</p>
              </div>
              <Switch
                id="powers"
                checked={settings.superpowers}
                onCheckedChange={() => handleToggle('superpowers')}
              />
            </div>

            <div className="control-item">
              <div className="control-label">
                <Label htmlFor="guild">Guild Membership</Label>
                <p className="control-description">Show which guild you belong to</p>
              </div>
              <Switch
                id="guild"
                checked={settings.guild}
                onCheckedChange={() => handleToggle('guild')}
              />
            </div>

            <div className="control-item">
              <div className="control-label">
                <Label htmlFor="location">Location</Label>
                <p className="control-description">Show your current location</p>
              </div>
              <Switch
                id="location"
                checked={settings.location}
                onCheckedChange={() => handleToggle('location')}
              />
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="privacy-actions">
          <Button
            onClick={handleSave}
            disabled={!hasChanges || saving || loading}
            className="save-button"
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Saving...' : 'Save Settings'}
          </Button>
          
          {currentTier.cost > 0 && (
            <p className="cost-notice">
              This tier costs {currentTier.cost} credits per month
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
