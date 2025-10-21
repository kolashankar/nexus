/**
 * Dashboard page component
 */
import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import useStore from '../../store';
import Scene from '../../components/3d/Scene/Scene';

const Dashboard: React.FC = () => {
  const { player, fetchPlayer, isLoadingPlayer } = useStore();

  useEffect(() => {
    if (!player) {
      fetchPlayer();
    }
  }, []);

  if (isLoadingPlayer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Dashboard</h1>
        
        {/* Player Info */}
        {player && (
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Player Info</CardTitle>
                <CardDescription>Your character details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p><strong>Username:</strong> {player.username}</p>
                  <p><strong>Level:</strong> {player.level}</p>
                  <p><strong>XP:</strong> {player.xp}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Karma & Class</CardTitle>
                <CardDescription>Your moral standing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p><strong>Karma:</strong> {player.karma_points}</p>
                  <p><strong>Moral Class:</strong> {player.moral_class}</p>
                  <p><strong>Economic Class:</strong> {player.economic_class}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Currencies</CardTitle>
                <CardDescription>Your wealth</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p><strong>Credits:</strong> {player.currencies.credits}</p>
                  <p><strong>Karma Tokens:</strong> {player.currencies.karma_tokens}</p>
                  <p><strong>Dark Matter:</strong> {player.currencies.dark_matter}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 3D Scene Preview */}
        <Card>
          <CardHeader>
            <CardTitle>3D World Preview</CardTitle>
            <CardDescription>Your character in Karma Nexus</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <Scene />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
