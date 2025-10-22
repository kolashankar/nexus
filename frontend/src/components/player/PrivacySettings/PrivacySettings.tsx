import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { VisibilityToggle } from './VisibilityToggle';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { usePrivacy } from '../../../hooks/usePrivacy';

export const PrivacySettings: React.FC = () => {
  const { settings, loading, updateSettings, changeTier } = usePrivacy();

  if (loading || !settings) {
    return <div>Loading privacy settings...</div>;
  }

  const handleToggle = async (key: string, value: boolean) => {
    await updateSettings({ [key]: value });
  };

  const handleTierChange = async (tier: string) => {
    await changeTier(tier);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>🔒 Privacy Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="text-sm font-semibold mb-2 block">Privacy Tier</label>
          <Select value={settings.privacy_tier} onValueChange={handleTierChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="public">Public (Free)</SelectItem>
              <SelectItem value="selective">Selective (Small cost)</SelectItem>
              <SelectItem value="private">Private (Moderate cost)</SelectItem>
              <SelectItem value="ghost">Ghost (High cost)</SelectItem>
              <SelectItem value="phantom">Phantom (Very high cost)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold">Visible Information</h3>
          <VisibilityToggle
            label="Cash Amount"
            checked={settings.cash}
            onChange={(v) => handleToggle('cash', v)}
          />
          <VisibilityToggle
            label="Economic Class"
            checked={settings.economic_class}
            onChange={(v) => handleToggle('economic_class', v)}
          />
          <VisibilityToggle
            label="Moral Class"
            checked={settings.moral_class}
            onChange={(v) => handleToggle('moral_class', v)}
          />
          <VisibilityToggle
            label="Superpowers"
            checked={settings.superpowers}
            onChange={(v) => handleToggle('superpowers', v)}
          />
          <VisibilityToggle
            label="Karma Score"
            checked={settings.karma_score}
            onChange={(v) => handleToggle('karma_score', v)}
          />
          <VisibilityToggle
            label="Guild Membership"
            checked={settings.guild}
            onChange={(v) => handleToggle('guild', v)}
          />
          <VisibilityToggle
            label="Location"
            checked={settings.location}
            onChange={(v) => handleToggle('location', v)}
          />
        </div>
      </CardContent>
    </Card>
  );
};
