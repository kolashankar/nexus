/**
 * Inventory type definitions.
 */

/**
 * @typedef {Object} InventoryItem
 * @property {string} item_id
 * @property {string} name
 * @property {number} quantity
 * @property {boolean} equipped
 * @property {'common'|'uncommon'|'rare'|'epic'|'legendary'} rarity
 * @property {'consumable'|'equipment'|'resource'|'quest_item'} item_type
 * @property {string} acquired_at
 * @property {Object.<string, any>} [metadata]
 */

/**
 * @typedef {Object} PlayerInventory
 * @property {string} player_id
 * @property {InventoryItem[]} items
 * @property {number} max_capacity
 * @property {number} total_items
 * @property {string} last_updated
 */

/**
 * @typedef {Object} ItemUsageRequest
 * @property {string} item_id
 * @property {string} [target_id]
 * @property {number} quantity
 */

/**
 * @typedef {Object} ItemUsageResponse
 * @property {boolean} success
 * @property {string} item_id
 * @property {number} quantity_used
 * @property {number} remaining_quantity
 * @property {string} effect_description
 * @property {Object.<string, any>} effects
 */

/**
 * @typedef {Object} AddItemRequest
 * @property {string} item_id
 * @property {number} quantity
 * @property {Object.<string, any>} [metadata]
 */

/**
 * @typedef {Object} RemoveItemRequest
 * @property {number} quantity
 */

export {};
