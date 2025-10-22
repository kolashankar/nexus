import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { actionsService } from '../../../services/actions/actionsService';

interface Action {
  _id: string;
  action_type: string;
  timestamp: string;
  result: any;
  karma_changes: any;
}

export const ActionHistory: React.FC = () => {
  const [actions, setActions] = useState<Action[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const history = await actionsService.getHistory();
      setActions(history);
    } catch (error) {
      console.error('Failed to load action history:', error);
    } finally {
      setLoading(false);
    }
  };

  const getActionIcon = (type: string) => {
    const icons: Record<string, string> = {
      hack: '🔐',
      help: '🤝',
      steal: '💰',
      donate: '💝',
      trade: '🤝'
    };
    return icons[type] || '⚡';
  };

  const getActionColor = (type: string) => {
    const colors: Record<string, string> = {
      hack: 'bg-purple-500',
      help: 'bg-green-500',
      steal: 'bg-red-500',
      donate: 'bg-blue-500',
      trade: 'bg-yellow-500'
    };
    return colors[type] || 'bg-gray-500';
  };

  if (loading) {
    return <div className="text-center py-8">Loading history...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {actions.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No actions yet</p>
          ) : (
            actions.map((action) => (
              <div key={action._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getActionIcon(action.action_type)}</span>
                  <div>
                    <p className="font-medium capitalize">{action.action_type}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(action.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getActionColor(action.action_type)}>
                    {action.karma_changes?.actor_karma > 0 ? '+' : ''}
                    {action.karma_changes?.actor_karma || 0} Karma
                  </Badge>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
