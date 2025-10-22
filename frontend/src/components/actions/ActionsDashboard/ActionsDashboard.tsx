import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import HackActionModal from '../modals/HackActionModal';
import HelpActionModal from '../modals/HelpActionModal';
import StealActionModal from '../modals/StealActionModal';
import DonateActionModal from '../modals/DonateActionModal';
import TradeActionModal from '../modals/TradeActionModal';

const ActionsDashboard: React.FC = () => {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  const actions = [
    {
      id: 'hack',
      name: 'Hack',
      description: 'Hack another player to steal credits',
      icon: '💻',
      color: 'bg-blue-500 hover:bg-blue-600',
      karmaEffect: 'Negative'
    },
    {
      id: 'help',
      name: 'Help',
      description: 'Help another player with credits',
      icon: '❤️',
      color: 'bg-green-500 hover:bg-green-600',
      karmaEffect: 'Positive'
    },
    {
      id: 'steal',
      name: 'Steal',
      description: 'Steal credits from another player',
      icon: '👿',
      color: 'bg-red-500 hover:bg-red-600',
      karmaEffect: 'Very Negative'
    },
    {
      id: 'donate',
      name: 'Donate',
      description: 'Donate credits to another player',
      icon: '🌟',
      color: 'bg-yellow-500 hover:bg-yellow-600',
      karmaEffect: 'Very Positive'
    },
    {
      id: 'trade',
      name: 'Trade',
      description: 'Trade credits with another player',
      icon: '🤝',
      color: 'bg-purple-500 hover:bg-purple-600',
      karmaEffect: 'Neutral'
    }
  ];

  const renderActionModal = () => {
    switch (selectedAction) {
      case 'hack':
        return <HackActionModal onClose={() => setSelectedAction(null)} />;
      case 'help':
        return <HelpActionModal onClose={() => setSelectedAction(null)} />;
      case 'steal':
        return <StealActionModal onClose={() => setSelectedAction(null)} />;
      case 'donate':
        return <DonateActionModal onClose={() => setSelectedAction(null)} />;
      case 'trade':
        return <TradeActionModal onClose={() => setSelectedAction(null)} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Game Actions</h2>
        <p className="text-gray-600">
          Choose your actions wisely - they affect your karma, traits, and reputation
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {actions.map((action) => (
          <Card
            key={action.id}
            className="cursor-pointer hover:shadow-xl transition-all transform hover:-translate-y-1"
            onClick={() => setSelectedAction(action.id)}
          >
            <CardHeader className={`${action.color} text-white`}>
              <div className="flex items-center gap-3">
                <span className="text-4xl">{action.icon}</span>
                <CardTitle className="text-2xl">{action.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-gray-700 mb-3">{action.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-600">
                  Karma Effect:
                </span>
                <span
                  className={`text-sm font-bold ${
                    action.karmaEffect.includes('Positive')
                      ? 'text-green-600'
                      : action.karmaEffect.includes('Negative')
                      ? 'text-red-600'
                      : 'text-gray-600'
                  }`}
                >
                  {action.karmaEffect}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Modal */}
      {selectedAction && (
        <Dialog open={!!selectedAction} onOpenChange={() => setSelectedAction(null)}>
          <DialogContent className="max-w-2xl">
            {renderActionModal()}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ActionsDashboard;