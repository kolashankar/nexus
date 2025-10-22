import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Globe, Users } from 'lucide-react';

interface EventCardProps {
  event: any;
  onViewDetails: () => void;
  getSeverityColor: (severity: string) => string;
  getImpactIcon: (impact: string) => React.ReactNode;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  onViewDetails,
  getSeverityColor,
  getImpactIcon
}) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleString();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default">Active</Badge>;
      case 'ended':
        return <Badge variant="secondary">Ended</Badge>;
      case 'scheduled':
        return <Badge variant="outline">Scheduled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={onViewDetails}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {getImpactIcon(event.estimated_impact)}
              <Badge variant={getSeverityColor(event.severity)}>
                {event.severity}
              </Badge>
              {getStatusBadge(event.status)}
              {event.is_global && (
                <Badge variant="outline">
                  <Globe className="w-3 h-3 mr-1" />
                  Global
                </Badge>
              )}
            </div>
            <CardTitle className="text-xl">{event.name}</CardTitle>
            <CardDescription className="mt-1">
              {event.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{event.duration_hours}h</span>
            </div>
            {event.requires_participation && (
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{event.total_participants} participants</span>
              </div>
            )}
          </div>
          
          {event.started_at && (
            <span className="text-xs">
              {formatDate(event.started_at)}
            </span>
          )}
        </div>
        
        <div className="mt-3">
          <Button variant="outline" size="sm" className="w-full">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
