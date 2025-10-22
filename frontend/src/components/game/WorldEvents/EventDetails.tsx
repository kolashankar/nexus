import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Clock, Users, Sparkles, Target } from 'lucide-react';

interface EventDetailsProps {
  event: any;
  onClose: () => void;
  onParticipate: (eventId: string) => void;
}

export const EventDetails: React.FC<EventDetailsProps> = ({
  event,
  onClose,
  onParticipate
}) => {
  const formatDateTime = (date: string) => {
    return new Date(date).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline">{event.event_type}</Badge>
            <Badge>{event.severity}</Badge>
            <Badge variant="secondary">{event.estimated_impact}</Badge>
          </div>
          <DialogTitle className="text-2xl">{event.name}</DialogTitle>
          <DialogDescription className="text-base">
            {event.description}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-6">
            {/* Event Lore */}
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                The Story
              </h3>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm leading-relaxed whitespace-pre-line">
                  {event.lore}
                </p>
              </div>
            </div>

            <Separator />

            {/* Effects */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Active Effects
              </h3>
              <div className="space-y-2">
                {event.effects.map((effect: any, idx: number) => (
                  <div key={idx} className="bg-muted/30 p-3 rounded border border-border">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">{effect.effect_type}</span>
                      <Badge variant="outline">{effect.duration_hours}h</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{effect.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span>Value: {effect.value}</span>
                      <span>Affects: {effect.affected_players}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Timing */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Event Timeline
              </h3>
              <div className="grid gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-medium">{event.duration_hours} hours</span>
                </div>
                {event.started_at && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Started:</span>
                    <span className="font-medium">{formatDateTime(event.started_at)}</span>
                  </div>
                )}
                {event.ends_at && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ends:</span>
                    <span className="font-medium">{formatDateTime(event.ends_at)}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Participation */}
            {event.requires_participation && (
              <>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Participation
                  </h3>
                  <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                    <p className="text-sm mb-3">{event.participation_mechanics}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {event.total_participants} players participating
                      </span>
                      {event.status === 'active' && (
                        <Button onClick={() => onParticipate(event.event_id)} size="sm">
                          Participate Now
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* The Architect's Reasoning */}
            <div>
              <h3 className="font-semibold mb-2">The Architect's Reasoning</h3>
              <p className="text-sm text-muted-foreground italic">
                "{event.architect_reasoning}"
              </p>
            </div>

            {/* Trigger Reason */}
            <div className="bg-muted/30 p-3 rounded">
              <span className="text-xs text-muted-foreground">
                Triggered: {event.trigger_reason}
              </span>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
