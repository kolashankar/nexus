class WebSocketService {
  constructor() {
    this.ws = null;
    this.listeners = {};
    this.reconnectInterval = 5000;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 10;
  }

  connect(playerId, username) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      console.log('WebSocket already connected');
      return;
    }

    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
    const wsUrl = BACKEND_URL.replace('http', 'ws');
    const url = `${wsUrl}/ws?player_id=${playerId}&username=${encodeURIComponent(username)}`;

    try {
      this.ws = new WebSocket(url);

      this.ws.onopen = () => {
        console.log('✅ WebSocket connected');
        this.reconnectAttempts = 0;
        this.emit('connected', { playerId, username });
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log('📨 WebSocket message:', data);
          
          // Emit event to listeners
          if (data.type && data.event) {
            this.emit(`${data.type}:${data.event}`, data.data);
          }
          
          // Also emit the raw message
          this.emit('message', data);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      this.ws.onerror = (error) => {
        console.error('❌ WebSocket error:', error);
        this.emit('error', error);
      };

      this.ws.onclose = () => {
        console.log('WebSocket disconnected');
        this.emit('disconnected');
        this.attemptReconnect(playerId, username);
      };
    } catch (error) {
      console.error('Failed to create WebSocket:', error);
    }
  }

  attemptReconnect(playerId, username) {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
      
      setTimeout(() => {
        this.connect(playerId, username);
      }, this.reconnectInterval);
    } else {
      console.error('Max reconnection attempts reached');
      this.emit('reconnect_failed');
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  send(data) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    } else {
      console.error('WebSocket is not connected');
    }
  }

  // Event emitter functionality
  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    }
  }

  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(data));
    }
  }

  // Game-specific methods
  updateLocation(location) {
    this.send({
      type: 'player',
      event: 'location_update',
      data: { location }
    });
  }

  joinRoom(roomId) {
    this.send({
      type: 'player',
      event: 'join_room',
      data: { room_id: roomId }
    });
  }

  leaveRoom(roomId) {
    this.send({
      type: 'player',
      event: 'leave_room',
      data: { room_id: roomId }
    });
  }
}

export default new WebSocketService();
