import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import apiClient from '@/services/api/client';
import { formatDistance } from 'date-fns';

const KarmaHistory: React.FC = () => {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await apiClient.get('/api/karma/history?limit=20');
      setHistory(response.data);
    } catch (error) {
      console.error('Failed to fetch karma history:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-16 bg-gray-300 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Karma History</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-3">
            {history.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                No karma history yet. Perform actions to start building your karma!
              </div>
            ) : (
              history.map((entry, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={entry.karma_change > 0 ? 'default' : 'destructive'}>
                        {entry.action_type.toUpperCase()}
                      </Badge>
                      <span className="text-sm text-gray-600">
                        {formatDistance(new Date(entry.timestamp), new Date(), { addSuffix: true })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{entry.message}</p>
                  </div>
                  <div className="text-right">
                    <div
                      className={`text-2xl font-bold ${
                        entry.karma_change > 0 ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {entry.karma_change > 0 ? '+' : ''}{entry.karma_change}
                    </div>
                    <div className="text-xs text-gray-500">karma</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default KarmaHistory;