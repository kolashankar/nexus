import React, { useState, useEffect } from 'react';
import { toast } from '../ui/sonner';
import { Bell, CheckCircle2, XCircle, Info } from 'lucide-react';



export const QuestNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Listen for quest events via WebSocket or polling
    const handleQuestEvent = (event) => {
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

  const createNotificationFromEvent = (event)=> {
    switch (event.type) {
      case 'quest_completed'
        return {
          type,
          title,
          message,
          quest_id,
          priority,
          timestamp).toISOString()
        };
      case 'objective_progress'
        return {
          type,
          title,
          message,
          quest_id,
          priority,
          timestamp).toISOString()
        };
      case 'quest_available'
        return {
          type,
          title,
          message,
          quest_id,
          priority,
          timestamp).toISOString()
        };
      default;
    }
  };

  const showToast = (notification) => {
    const icon = getNotificationIcon(notification.type);
    
    switch (notification.priority) {
      case 'high'
        toast.success(notification.title, {
          description,
          icon);
        break;
      case 'medium'
        toast.info(notification.title, {
          description,
          icon);
        break;
      case 'low'
        toast(notification.title, {
          description,
          icon);
        break;
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'quest_completed'
        return null;
      case 'quest_failed'
        return null;
      case 'quest_available'
      case 'objective_progress'
        return null;
      default;
    }
  };

  return null; // This component handles notifications via toasts
};

export const useQuestNotifications = () => {
  const notify = {
    questCompleted, rewards) => {
      toast.success('Quest Completed!', {
        description,
        icon);
    },
    
    questAccepted) => {
      toast.info('Quest Accepted', {
        description,
        icon);
    },
    
    questFailed) => {
      toast.error('Quest Failed', {
        description,
        icon);
    },
    
    objectiveProgress, current, required) => {
      toast(`Objective Progress`, {
        description,
        icon);
    },
    
    hiddenQuestDiscovered) => {
      toast.success('Secret Discovered!', {
        description,
        icon);
    }
  };

  return notify;
};
