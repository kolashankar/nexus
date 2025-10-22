import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import KarmaScore from './KarmaScore';
import KarmaHistory from './KarmaHistory';
import apiClient from '@/services/api/client';

const KarmaDisplay: React.FC = () => {
  const [karmaData, setKarmaData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchKarmaData();
  }, []);

  const fetchKarmaData = async () => {
    try {
      const response = await apiClient.get('/api/karma/score');
      setKarmaData(response.data);
    } catch (error) {
      console.error('Failed to fetch karma data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-24 bg-gray-300 rounded"></div>
            <div className="h-32 bg-gray-300 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <KarmaScore karmaData={karmaData} />
      <KarmaHistory />
    </div>
  );
};

export default KarmaDisplay;