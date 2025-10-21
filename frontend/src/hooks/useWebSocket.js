import { useEffect } from 'react';
import { useGameStore } from '../store';
import websocketService from '../services/websocket/websocketService';
import { useAuth } from './useAuth';

export const useWebSocket = () => {
  const { user } = useAuth();
  const { setWSConnected, setOnlinePlayers, addOnlinePlayer, removeOnlinePlayer } = useGameStore();

  useEffect(() => {
    if (user) {
      // Connect WebSocket
      websocketService.connect(user.id, user.username);

      // Set up event listeners
      websocketService.on('connected', (data) => {
        console.log('WebSocket connected:', data);
        setWSConnected(true);
        if (data.online_players) {
          setOnlinePlayers(data.online_players);
        }
      });

      websocketService.on('disconnected', () => {
        console.log('WebSocket disconnected');
        setWSConnected(false);
      });

      websocketService.on('player:player_joined', (data) => {
        console.log('Player joined:', data);
        addOnlinePlayer(data);
      });

      websocketService.on('player:player_left', (data) => {
        console.log('Player left:', data);
        removeOnlinePlayer(data.player_id);
      });

      // Cleanup on unmount
      return () => {
        websocketService.disconnect();
      };
    }
  }, [user]);

  return {
    send: websocketService.send.bind(websocketService),
    updateLocation: websocketService.updateLocation.bind(websocketService),
    joinRoom: websocketService.joinRoom.bind(websocketService),
    leaveRoom: websocketService.leaveRoom.bind(websocketService),
    on: websocketService.on.bind(websocketService),
    off: websocketService.off.bind(websocketService),
  };
};
