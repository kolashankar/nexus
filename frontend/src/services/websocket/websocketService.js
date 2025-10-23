/**
 * WebSocket service for real-time communication
 */



class WebSocketService {
  ws: WebSocket | null = null;
  handlers: Map = new Map();
  reconnectAttempts = 0;
  maxReconnectAttempts = 5;
  reconnectDelay = 3000;
  url) {
    const wsUrl = process.env.REACT_APP_WS_URL || 'ws;
    this.url = wsUrl;
  }

  connect(token){
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      return;
    }

    this.ws = new WebSocket(`${this.url}?token=${token}`);

    this.ws.onopen = () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
    };

    this.ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        this.handleMessage(message);
      } catch (error) {
        console.error('Failed to parse WebSocket message', error);
      }
    };

    this.ws.onerror = (error: () => {
      console.error('WebSocket error', error);
    };

    this.ws.onclose = () => {
      console.log('WebSocket disconnected');
      this.attemptReconnect(token);
    };
  }

  disconnect(){
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  send(eventType, data){
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type, data }));
    } else {
      console.error('WebSocket is not connected');
    }
  }

  on(eventType, handler){
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, []);
    }
    this.handlers.get(eventType).push(handler);
  }

  off(eventType, handler){
    const handlers = this.handlers.get(eventType);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index > -1) {
        handlers.splice(index, 1);
      }
    }
  }

  handleMessage(message){
    const { type, data } = message;
    const handlers = this.handlers.get(type);
    
    if (handlers) {
      handlers.forEach(handler => handler(data));
    }
  }

  attemptReconnect(token){
    if (this.reconnectAttempts  {
        this.connect(token);
      }, this.reconnectDelay);
    } else {
      console.error('Max reconnection attempts reached');
    }
  }
}

export default new WebSocketService();
