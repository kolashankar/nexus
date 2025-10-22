/**
 * Inventory type definitions.
 */

export interface InventoryItem {
  item_id: string;
  name: string;
  quantity: number;
  equipped: boolean;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  item_type: 'consumable' | 'equipment' | 'resource' | 'quest_item';
  acquired_at: string;
  metadata?: Record<string, any>;
}

export interface PlayerInventory {
  player_id: string;
  items: InventoryItem[];
  max_capacity: number;
  total_items: number;
  last_updated: string;
}

export interface ItemUsageRequest {
  item_id: string;
  target_id?: string;
  quantity: number;
}

export interface ItemUsageResponse {
  success: boolean;
  item_id: string;
  quantity_used: number;
  remaining_quantity: number;
  effect_description: string;
  effects: Record<string, any>;
}

export interface AddItemRequest {
  item_id: string;
  quantity: number;
  metadata?: Record<string, any>;
}

export interface RemoveItemRequest {
  quantity: number;
}
