import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, Sparkles, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './EventNotification.css';

interface EventNotificationProps {
  event: any;
  onClose: () => void;
  onViewDetails: () => void;
}

export const EventNotification: React.FC<EventNotificationProps> = ({
  event,
  onClose,
  onViewDetails
}) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Auto-dismiss after 10 seconds
    const timer = setTimeout(() => {
      handleClose();
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShow(false);
    setTimeout(onClose, 300); // Wait for animation
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'border-red-500 bg-red-50';
      case 'high': return 'border-orange-500 bg-orange-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      case 'low': return 'border-green-500 bg-green-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="event-notification"
        >
          <Card className={`border-2 shadow-lg ${getSeverityColor(event.severity)}`}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                {/* Icon */}
                <div className="flex-shrink-0">
                  {event.severity === 'critical' ? (
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  ) : (
                    <Sparkles className="w-6 h-6 text-primary" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline">{event.event_type}</Badge>
                    <Badge>{event.severity}</Badge>
                  </div>
                  <h4 className="font-bold text-lg mb-1">{event.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {event.description}
                  </p>
                  
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" onClick={onViewDetails}>
                      View Details
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleClose}>
                      Dismiss
                    </Button>
                  </div>
                </div>

                {/* Close button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="flex-shrink-0 h-6 w-6"
                  onClick={handleClose}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
