import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface KarmaScoreProps {
  karmaData: any;
}

const KarmaScore: React.FC<KarmaScoreProps> = ({ karmaData }) => {
  if (!karmaData) return null;

  const getMoralClassColor = (moralClass: string) => {
    switch (moralClass) {
      case 'good':
        return 'bg-green-500';
      case 'bad':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getKarmaLevelColor = (level: string) => {
    const positiveL evels = ['saint', 'virtuous', 'good', 'neutral_good'];
    const negativeLevel = ['demon', 'evil', 'bad', 'neutral_bad'];
    
    if (positiveLevels.includes(level)) return 'text-green-600';
    if (negativeLevels.includes(level)) return 'text-red-600';
    return 'text-gray-600';
  };

  // Calculate progress to next milestone
  const calculateProgress = () => {
    if (!karmaData.next_milestone) return 100;
    const current = karmaData.karma_points;
    const next = karmaData.next_milestone;
    
    if (next > 0) {
      const previous = next === 100 ? 0 : next === 500 ? 100 : next === 1000 ? 500 : next === 2000 ? 1000 : 0;
      return ((current - previous) / (next - previous)) * 100;
    } else {
      const previous = next === -100 ? 0 : next === -500 ? -100 : next === -1000 ? -500 : next === -2000 ? -1000 : 0;
      return ((current - previous) / (next - previous)) * 100;
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white">
        <CardTitle className="text-2xl flex items-center justify-between">
          <span>Karma Score</span>
          <Badge className={getMoralClassColor(karmaData.moral_class)}>
            {karmaData.moral_class.toUpperCase()}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {/* Karma Points */}
        <div className="text-center mb-6">
          <div className="text-6xl font-bold text-orange-600">
            {karmaData.karma_points}
          </div>
          <div className={`text-xl font-semibold mt-2 ${getKarmaLevelColor(karmaData.karma_level)}`}>
            {karmaData.karma_level.replace('_', ' ').toUpperCase()}
          </div>
        </div>

        {/* Progress to Next Milestone */}
        {karmaData.next_milestone && (
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Next Milestone</span>
              <span className="font-semibold">{karmaData.next_milestone}</span>
            </div>
            <Progress value={calculateProgress()} className="h-3" />
          </div>
        )}

        {/* Karma Description */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-700">
            {karmaData.karma_points >= 2000 && 'You are a beacon of virtue in this world. Your actions inspire others.'}
            {karmaData.karma_points >= 500 && karmaData.karma_points < 2000 && 'You are known for your good deeds and positive influence.'}
            {karmaData.karma_points > -500 && karmaData.karma_points < 500 && 'You walk the line between good and evil. Your choices will define you.'}
            {karmaData.karma_points > -2000 && karmaData.karma_points <= -500 && 'Your reputation has been tarnished by your actions.'}
            {karmaData.karma_points <= -2000 && 'You are feared and reviled. Redemption seems distant.'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default KarmaScore;