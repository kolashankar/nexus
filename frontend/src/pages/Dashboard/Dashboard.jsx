import React, { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { usePlayer } from '../../hooks/usePlayer';
import { useWebSocket } from '../../hooks/useWebSocket';
import Header from '../../components/layout/Header/Header';
import Sidebar from '../../components/layout/Sidebar/Sidebar';
import ProfileCard from '../../components/player/ProfileCard/ProfileCard';
import TraitsList from '../../components/player/TraitsList/TraitsList';
import Scene3D from '../../components/3d/Scene/Scene';
import { Card } from '@/components/ui/card';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const { profile, traits, fetchProfile, fetchTraits, isLoading } = usePlayer();
  const websocket = useWebSocket();

  useEffect(() => {
    // Fetch player data on mount
    fetchProfile();
    fetchTraits();
  }, []);

  return (
    <div className="dashboard-page min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-6 space-y-6">
          {/* Welcome Section */}
          <div className="welcome-section">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Welcome back, {user?.username}!
            </h1>
            <p className="text-gray-400 mt-2">
              Your karma journey continues...
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Player Info */}
            <div className="lg:col-span-1 space-y-6">
              <ProfileCard profile={profile} isLoading={isLoading} />
              
              <Card className="p-4 bg-gray-800/50 border-cyan-500/30">
                <h3 className="text-lg font-semibold text-cyan-400 mb-3">Quick Stats</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Karma Points:</span>
                    <span className="text-white font-semibold">{profile?.karma_points || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Level:</span>
                    <span className="text-white font-semibold">{profile?.level || 1}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Credits:</span>
                    <span className="text-green-400 font-semibold">{profile?.credits || 0}</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Middle Column - 3D Scene */}
            <div className="lg:col-span-1">
              <Card className="p-0 bg-gray-800/50 border-cyan-500/30 overflow-hidden">
                <div className="h-[500px]">
                  <Scene3D />
                </div>
                <div className="p-4 border-t border-cyan-500/30">
                  <p className="text-sm text-gray-400 text-center">
                    Your character in the Karma Nexus
                  </p>
                </div>
              </Card>
            </div>

            {/* Right Column - Traits */}
            <div className="lg:col-span-1">
              <TraitsList traits={traits} isLoading={isLoading} />
            </div>
          </div>

          {/* Bottom Section - Recent Activity */}
          <Card className="p-6 bg-gray-800/50 border-cyan-500/30">
            <h3 className="text-xl font-semibold text-cyan-400 mb-4">Recent Activity</h3>
            <div className="text-gray-400 text-center py-8">
              <p>No recent activity yet. Start your journey!</p>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
