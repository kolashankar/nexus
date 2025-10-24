from fastapi import WebSocket, WebSocketDisconnect
import logging
from .manager import manager
from .events.player import handle_player_event

logger = logging.getLogger(__name__)

class WebSocketHandler:
    """Handles WebSocket events and routes them to appropriate handlers."""

    def __init__(self):
        self.event_handlers = {
            "player": handle_player_event,
            # More handlers will be added in later phases
            # "combat": handle_combat_event,
            # "chat": handle_chat_event,
            # "world": handle_world_event,
        }

    async def handle_event(self, event_data: dict, player_id: str):
        """Route an event to the appropriate handler."""
        try:
            event_type = event_data.get("type")
            event_name = event_data.get("event")
            data = event_data.get("data", {})

            if event_type in self.event_handlers:
                handler = self.event_handlers[event_type]
                response = await handler(event_name, data, player_id)
                return response
            else:
                logger.warning(f"Unknown event type: {event_type}")
                return {
                    "type": "error",
                    "message": f"Unknown event type: {event_type}"
                }
        except Exception as e:
            logger.error(f"Error handling event: {e}")
            return {
                "type": "error",
                "message": str(e)
            }

handler = WebSocketHandler()

async def websocket_endpoint(websocket: WebSocket, player_id: str, username: str):
    """Main WebSocket endpoint for handling connections."""
    await manager.connect(websocket, player_id, username)

    try:
        # Send initial connection success message
        await manager.send_personal_message({
            "type": "connection",
            "event": "connected",
            "data": {
                "message": "Connected to Karma Nexus",
                "online_players": manager.get_online_players()
            }
        }, player_id)

        # Listen for messages
        while True:
            data = await websocket.receive_json()

            # Handle the event
            response = await handler.handle_event(data, player_id)

            # Send response back to client
            if response:
                await manager.send_personal_message(response, player_id)

    except WebSocketDisconnect:
        manager.disconnect(player_id)
        # Broadcast player left
        await manager.broadcast({
            "event": "player_left",
            "data": {
                "player_id": player_id,
                "username": username
            }
        })
    except Exception as e:
        logger.error(f"WebSocket error for player {player_id}: {e}")
        manager.disconnect(player_id)
