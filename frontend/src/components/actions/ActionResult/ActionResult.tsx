import React from 'react';
import { Card, CardContent } from '../../ui/card';
import { Badge } from '../../ui/badge';

interface ActionResultProps {
  success: boolean;
  message: string;
  karmaChange?: number;
  creditsChange?: number;
}

export const ActionResult: React.FC<ActionResultProps> = ({
  success,
  message,
  karmaChange,
  creditsChange
}) => {
  return (
    <Card className={success ? 'border-green-500' : 'border-red-500'}>
      <CardContent className="pt-6">
        <div className="text-center space-y-4">
          <div className="text-4xl">{success ? '✅' : '❌'}</div>
          <p className="text-lg font-medium">{message}</p>
          <div className="flex gap-4 justify-center">
            {karmaChange !== undefined && (
              <Badge variant={karmaChange > 0 ? 'default' : 'destructive'}>
                {karmaChange > 0 ? '+' : ''}{karmaChange} Karma
              </Badge>
            )}
            {creditsChange !== undefined && (
              <Badge variant="outline">
                {creditsChange > 0 ? '+' : ''}{creditsChange} Credits
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
