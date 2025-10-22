import React, { useState, useEffect } from 'react';
import { toast } from '../ui/sonner';
import { Bell, CheckCircle2, XCircle, Info } from 'lucide-react';

interface QuestNotification {
  type: string;
  title: string;
  message: string;
  quest_id?: string;
  priority: string;
  timestamp: string;
}

export const QuestNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<QuestNotification[]>([]);

  useEffect(() => {
    // Listen for quest events via WebSocket or polling
    const handleQuestEvent = (event: any) => {
      const notification = createNotificationFromEvent(event);
      if (notification) {
        setNotifications(prev => [notification, ...prev.slice(0, 9)]);
        showToast(notification);
      }
    };

    // Subscribe to quest events
    // This would connect to your WebSocket service
    // window.addEventListener('quest_event', handleQuestEvent);

    return () => {
      // window.removeEventListener('quest_event', handleQuestEvent);
    };
  }, []);

  const createNotificationFromEvent = (event: any): QuestNotification | null => {
    switch (event.type) {
      case 'quest_completed':
        return {
          type: 'quest_completed',
          title: 'Quest Completed!',
          message: `You completed ${event.quest_title}`,
          quest_id: event.quest_id,
          priority: 'high',
          timestamp: new Date().toISOString()
        };
      case 'objective_progress':
        return {
          type: 'objective_progress',
          title: 'Objective Progress',
          message: event.message,
          quest_id: event.quest_id,
          priority: 'low',
          timestamp: new Date().toISOString()
        };
      case 'quest_available':
        return {
          type: 'quest_available',
          title: 'New Quest',
          message: `New quest available: ${event.quest_title}`,
          quest_id: event.quest_id,
          priority: 'medium',
          timestamp: new Date().toISOString()
        };
      default:
        return null;
    }
  };

  const showToast = (notification: QuestNotification) => {
    const icon = getNotificationIcon(notification.type);
    
    switch (notification.priority) {
      case 'high':
        toast.success(notification.title, {
          description: notification.message,
          icon: icon
        });
        break;
      case 'medium':
        toast.info(notification.title, {
          description: notification.message,
          icon: icon
        });
        break;
      case 'low':
        toast(notification.title, {
          description: notification.message,
          icon: icon
        });
        break;
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'quest_completed':
        return <CheckCircle2 className="h-5 w-5" />;
      case 'quest_failed':
        return <XCircle className="h-5 w-5" />;
      case 'quest_available':
      case 'objective_progress':
        return <Info className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  return null; // This component handles notifications via toasts
};

export const useQuestNotifications = () => {
  const notify = {
    questCompleted: (questTitle: string, rewards: any) => {
      toast.success('Quest Completed!', {
        description: `${questTitle} - Rewards claimed!`,
        icon: <CheckCircle2 className="h-5 w-5" />
      });
    },
    
    questAccepted: (questTitle: string) => {
      toast.info('Quest Accepted', {
        description: questTitle,
        icon: <Info className="h-5 w-5" />
      });
    },
    
    questFailed: (questTitle: string) => {
      toast.error('Quest Failed', {
        description: questTitle,
        icon: <XCircle className="h-5 w-5" />
      });
    },
    
    objectiveProgress: (description: string, current: number, required: number) => {
      toast(`Objective Progress`, {
        description: `${description}: ${current}/${required}`,
        icon: <Info className="h-5 w-5" />
      });
    },
    
    hiddenQuestDiscovered: (questTitle: string) => {
      toast.success('Secret Discovered!', {
        description: `You found: ${questTitle}`,
        icon: <CheckCircle2 className="h-5 w-5" />
      });
    }
  };

  return notify;
};
