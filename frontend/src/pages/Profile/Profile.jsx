import React from 'react';
import { useParams } from 'react-router-dom';
import ProfileCard from '@/components/player/ProfileCard/ProfileCard';
import TraitsList from '@/components/player/TraitsList/TraitsList';
import { usePlayer } from '@/hooks/usePlayer';

const Profile = () => {
  const { playerId } = useParams();
  const { player, isLoading: loading } = usePlayer();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-xl">Loading profile...</div>
        </div>
      </div>
    );
  }

  if (!player) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-xl">Player not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">
            {playerId ? 'Player Profile' : 'My Profile'}
          </h1>
          <p className="text-muted-foreground">
            View and manage your character information
          </p>
        </div>

        {/* Profile Card */}
        <div className="grid gap-6">
          <div>
            <ProfileCard player={player} />
          </div>

          {/* Traits List */}
          <div>
            <TraitsList traits={player.traits} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
