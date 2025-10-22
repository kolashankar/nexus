import React from 'react';
import { useParams } from 'react-router-dom';
import ProfileCard from '@/components/player/ProfileCard/ProfileCard';
import TraitsList from '@/components/player/TraitsList/TraitsList';
import { usePlayer } from '@/hooks/usePlayer';

const Profile: React.FC = () => {
  const { playerId } = useParams<{ playerId?: string }>();
  const { player, loading } = usePlayer();

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-48 bg-gray-300 rounded-lg"></div>
          <div className="h-96 bg-gray-300 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (!player) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          Player not found
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {playerId ? 'Player Profile' : 'My Profile'}
          </h1>
          <p className="text-gray-600">
            View and manage your character information
          </p>
        </div>

        {/* Profile Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ProfileCard showActions={!playerId} />
          </div>

          {/* Traits List */}
          <div className="lg:col-span-2">
            <TraitsList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;