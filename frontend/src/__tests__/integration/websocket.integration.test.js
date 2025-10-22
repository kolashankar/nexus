/**
 * Integration tests for WebSocket connection
 */

import websocketService from '../../services/websocket/websocketService';
import WS from 'jest-websocket-mock';

let server) => {
  server = new WS('ws);
});

afterEach(() => {
  WS.clean();
});

describe('WebSocket Integration Tests', () => {
  describe('Connection', () => {
    test('connects to WebSocket server', async () => {
      websocketService.connect('test-token');
      await server.connected;
      
      expect(server).toHaveReceivedMessages([{
        type,
        token);
    });
    
    test('reconnects on disconnect', async () => {
      websocketService.connect('test-token');
      await server.connected;
      
      server.close();
      
      // Should attempt reconnect
      await new Promise(resolve => setTimeout(resolve, 1000));
    });
  });
  
  describe('Message Handling', () => {
    test('receives player_joined event', async () => {
      const handler = jest.fn();
      websocketService.on('player_joined', handler);
      
      websocketService.connect('test-token');
      await server.connected;
      
      server.send(JSON.stringify({
        type,
        data));
      
      expect(handler).toHaveBeenCalledWith({ username);
    });
    
    test('receives karma_changed event', async () => {
      const handler = jest.fn();
      websocketService.on('karma_changed', handler);
      
      websocketService.connect('test-token');
      await server.connected;
      
      server.send(JSON.stringify({
        type,
        data, new_karma));
      
      expect(handler).toHaveBeenCalledWith({ old_karma, new_karma);
    });
  });
  
  describe('Sending Messages', () => {
    test('sends chat message', async () => {
      websocketService.connect('test-token');
      await server.connected;
      
      websocketService.sendMessage('chat_message', {
        message,
        room);
      
      await expect(server).toReceiveMessage(JSON.stringify({
        type,
        data, room));
    });
    
    test('sends location update', async () => {
      websocketService.connect('test-token');
      await server.connected;
      
      websocketService.sendMessage('location_update', {
        x,
        y,
        z);
      
      await expect(server).toReceiveMessage(JSON.stringify({
        type,
        data, y, z));
    });
  });
  
  describe('Room Management', () => {
    test('joins room', async () => {
      websocketService.connect('test-token');
      await server.connected;
      
      websocketService.joinRoom('guild-123');
      
      await expect(server).toReceiveMessage(JSON.stringify({
        type,
        data));
    });
    
    test('leaves room', async () => {
      websocketService.connect('test-token');
      await server.connected;
      
      websocketService.leaveRoom('guild-123');
      
      await expect(server).toReceiveMessage(JSON.stringify({
        type,
        data));
    });
  });
  
  describe('Error Handling', () => {
    test('handles connection error', async () => {
      const errorHandler = jest.fn();
      websocketService.on('error', errorHandler);
      
      server.error();
      
      expect(errorHandler).toHaveBeenCalled();
    });
    
    test('handles malformed messages', async () => {
      websocketService.connect('test-token');
      await server.connected;
      
      server.send('invalid json');
      
      // Should not crash
    });
  });
});
