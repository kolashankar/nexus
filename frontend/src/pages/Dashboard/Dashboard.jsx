/**
 * Dashboard page component
 */
import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import useStore from '../../store';
import Scene from '../../components/3d/Scene/Scene';

const Dashboard = () => {
  const { player, fetchPlayer, isLoadingPlayer } = useStore();

  useEffect(() => {
    if (!player) {
      fetchPlayer();
    }
  }, [player, fetchPlayer]);

  if (isLoadingPlayer) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>
      <div className="grid gap-6">
        {/* Player Info */}
        {player && (
          <Card>
            <CardHeader>
              <CardTitle>
                Player Info
              </CardTitle>
              <CardDescription>
                Your character details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-lg">
                Username: {player.username}
              </p>
            </CardContent>
          </Card>
        )}

        {/* 3D Scene Preview */}
        <Card>
          <CardHeader>
            <CardTitle>3D World Preview</CardTitle>
            <CardDescription>
              Your character in Karma Nexus
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96 bg-gray-100 rounded-lg">
              <Scene />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
