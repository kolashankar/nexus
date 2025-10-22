import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
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
    const createNotificationFromEvent = (event) => {
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
    const showToast = (notification) => {
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
    const getNotificationIcon = (type) => {
        switch (type) {
            case 'quest_completed':
                return _jsx(CheckCircle2, { className: "h-5 w-5" });
            case 'quest_failed':
                return _jsx(XCircle, { className: "h-5 w-5" });
            case 'quest_available':
            case 'objective_progress':
                return _jsx(Info, { className: "h-5 w-5" });
            default:
                return _jsx(Bell, { className: "h-5 w-5" });
        }
    };
    return null; // This component handles notifications via toasts
};
export const useQuestNotifications = () => {
    const notify = {
        questCompleted: (questTitle, rewards) => {
            toast.success('Quest Completed!', {
                description: `${questTitle} - Rewards claimed!`,
                icon: _jsx(CheckCircle2, { className: "h-5 w-5" })
            });
        },
        questAccepted: (questTitle) => {
            toast.info('Quest Accepted', {
                description: questTitle,
                icon: _jsx(Info, { className: "h-5 w-5" })
            });
        },
        questFailed: (questTitle) => {
            toast.error('Quest Failed', {
                description: questTitle,
                icon: _jsx(XCircle, { className: "h-5 w-5" })
            });
        },
        objectiveProgress: (description, current, required) => {
            toast(`Objective Progress`, {
                description: `${description}: ${current}/${required}`,
                icon: _jsx(Info, { className: "h-5 w-5" })
            });
        },
        hiddenQuestDiscovered: (questTitle) => {
            toast.success('Secret Discovered!', {
                description: `You found: ${questTitle}`,
                icon: _jsx(CheckCircle2, { className: "h-5 w-5" })
            });
        }
    };
    return notify;
};
