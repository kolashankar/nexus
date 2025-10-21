/**
 * Custom hook for WebSocket
 */
import { useEffect, useCallback } from 'react';
import websocketService from '../services/websocket/websocketService';
import useStore from '../store';

type MessageHandler = (data: any) => void;

export const useWebSocket = () => {
  const { accessToken, isAuthenticated } = useStore();

  useEffect(() => {
    if (isAuthenticated && accessToken) {
      websocketService.connect(accessToken);
    }

    return () => {
      if (!isAuthenticated) {
        websocketService.disconnect();
      }
    };
  }, [isAuthenticated, accessToken]);

  const send = useCallback((eventType: string, data: any) => {
    websocketService.send(eventType, data);
  }, []);

  const on = useCallback((eventType: string, handler: MessageHandler) => {
    websocketService.on(eventType, handler);
  }, []);

  const off = useCallback((eventType: string, handler: MessageHandler) => {
    websocketService.off(eventType, handler);
  }, []);

  return {
    send,
    on,
    off,
  };
};

export default useWebSocket;
