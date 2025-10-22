import React from 'react';
import { KarmaDisplay } from '../../components/karma/KarmaDisplay/KarmaDisplay';
import { KarmaHistory } from '../../components/karma/KarmaDisplay/KarmaHistory';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { useKarma } from '../../hooks/useKarma';

export const Karma: React.FC = () => {
  const { karmaScore, karmaHistory, loading } = useKarma();

  if (loading) {
    return <div className="container mx-auto p-6">Loading karma data...</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Karma System</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <KarmaDisplay />
        
        <Card>
          <CardHeader>
            <CardTitle>Karma Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Current Score</p>
                <p className="text-3xl font-bold">{karmaScore}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Events</p>
                <p className="text-2xl font-semibold">{karmaHistory.length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Moral Alignment</p>
                <p className="text-xl font-medium">
                  {karmaScore > 500 ? '😇 Good' : karmaScore < -500 ? '😈 Bad' : '⚖️ Neutral'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <KarmaHistory />
    </div>
  );
};
