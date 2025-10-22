import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import StatsDisplay from './StatsDisplay';
import { usePlayer } from '@/hooks/usePlayer';

interface ProfileCardProps {
  showActions?: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ showActions = true }) => {
  const { player, isLoading: loading } = usePlayer();

  if (loading || !player) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-20 w-20 bg-gray-300 rounded-full"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20 border-4 border-white">
            <AvatarFallback className="text-2xl font-bold">
              {player.username.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-2xl">{player.username}</CardTitle>
            <div className="flex gap-2 mt-2">
              <Badge variant="secondary">Level {player.level}</Badge>
              <Badge variant="outline" className="bg-white/20">
                {player.moral_class.toUpperCase()}
              </Badge>
              <Badge variant="outline" className="bg-white/20">
                {player.economic_class.toUpperCase()}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <StatsDisplay player={player} />
        
        {/* Karma Display */}
        <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-700">Karma Points</span>
            <span className="text-2xl font-bold text-orange-600">
              {player.karma_points}
            </span>
          </div>
        </div>

        {/* Currencies */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="p-3 bg-blue-50 rounded-lg text-center">
            <div className="text-xs text-gray-600">Credits</div>
            <div className="text-lg font-bold text-blue-600">
              {player.currencies?.credits || 0}
            </div>
          </div>
          <div className="p-3 bg-green-50 rounded-lg text-center">
            <div className="text-xs text-gray-600">Karma Tokens</div>
            <div className="text-lg font-bold text-green-600">
              {player.currencies?.karma_tokens || 0}
            </div>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg text-center">
            <div className="text-xs text-gray-600">Dark Matter</div>
            <div className="text-lg font-bold text-purple-600">
              {player.currencies?.dark_matter || 0}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;