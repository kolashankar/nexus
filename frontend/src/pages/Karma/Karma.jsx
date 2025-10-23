import React from 'react';
import KarmaDisplay from '../../components/karma/KarmaDisplay/KarmaDisplay';
import KarmaHistory from '../../components/karma/KarmaDisplay/KarmaHistory';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { useKarma } from '../../hooks/useKarma';

export const Karma = () => {
  const { karmaScore, karmaHistory, loading } = useKarma();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading karma data...</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Karma System</h1>
      
      <div className="grid gap-6">
        <KarmaDisplay score={karmaScore} />
        
        <Card>
          <CardHeader>
            <CardTitle>Karma Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded">
                <p className="text-sm text-muted-foreground">Current Score</p>
                <p className="text-2xl font-bold">{karmaScore}</p>
              </div>
              <div className="p-4 border rounded">
                <p className="text-sm text-muted-foreground">Total Events</p>
                <p className="text-2xl font-bold">{karmaHistory.length}</p>
              </div>
              <div className="p-4 border rounded">
                <p className="text-sm text-muted-foreground">Moral Alignment</p>
                <p className="text-2xl font-bold">
                  {karmaScore > 500 ? '😇 Good' : karmaScore < -500 ? '😈 Evil' : '😐 Neutral'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <KarmaHistory history={karmaHistory} />
    </div>
  );
};
