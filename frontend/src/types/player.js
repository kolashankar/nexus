/**
 * Player type definitions
 * @typedef {Object} PlayerTraits
 * @property {number} empathy
 * @property {number} integrity
 * @property {number} discipline
 * @property {number} creativity
 * @property {number} resilience
 * @property {number} curiosity
 * @property {number} kindness
 * @property {number} courage
 * @property {number} patience
 * @property {number} adaptability
 * @property {number} wisdom
 * @property {number} humility
 * @property {number} vision
 * @property {number} honesty
 * @property {number} loyalty
 * @property {number} generosity
 * @property {number} self_awareness
 * @property {number} gratitude
 * @property {number} optimism
 * @property {number} loveability
 * @property {number} greed
 * @property {number} arrogance
 * @property {number} deceit
 * @property {number} cruelty
 * @property {number} selfishness
 * @property {number} envy
 * @property {number} wrath
 * @property {number} cowardice
 * @property {number} laziness
 * @property {number} gluttony
 * @property {number} paranoia
 * @property {number} impulsiveness
 * @property {number} vengefulness
 * @property {number} manipulation
 * @property {number} prejudice
 * @property {number} betrayal
 * @property {number} stubbornness
 * @property {number} pessimism
 * @property {number} recklessness
 * @property {number} vanity
 * @property {number} hacking
 * @property {number} negotiation
 * @property {number} stealth
 * @property {number} leadership
 * @property {number} technical_knowledge
 * @property {number} physical_strength
 * @property {number} speed
 * @property {number} intelligence
 * @property {number} charisma
 * @property {number} perception
 * @property {number} endurance
 * @property {number} dexterity
 * @property {number} memory
 * @property {number} focus
 * @property {number} networking
 * @property {number} strategy
 * @property {number} trading
 * @property {number} engineering
 * @property {number} medicine
 * @property {number} meditation
 */

/**
 * @typedef {Object} MetaTraits
 * @property {number} reputation
 * @property {number} influence
 * @property {number} fame
 * @property {number} infamy
 * @property {number} trustworthiness
 * @property {number} combat_rating
 * @property {number} tactical_mastery
 * @property {number} survival_instinct
 * @property {number} business_acumen
 * @property {number} market_intuition
 * @property {number} wealth_management
 * @property {number} enlightenment
 * @property {number} karmic_balance
 * @property {number} divine_favor
 * @property {number} guild_loyalty
 * @property {number} political_power
 * @property {number} diplomatic_skill
 * @property {number} legendary_status
 * @property {number} mentorship
 * @property {number} historical_impact
 */

/**
 * @typedef {Object} PlayerCurrencies
 * @property {number} credits
 * @property {number} karma_tokens
 * @property {number} dark_matter
 * @property {number} prestige_points
 * @property {number} guild_coins
 * @property {number} legacy_shards
 */

/**
 * @typedef {Object} Player
 * @property {string} id
 * @property {string} username
 * @property {string} email
 * @property {number} level
 * @property {number} xp
 * @property {number} karma_points
 * @property {'rich'|'middle'|'poor'} economic_class
 * @property {'good'|'average'|'bad'} moral_class
 * @property {PlayerCurrencies} currencies
 * @property {PlayerTraits} traits
 * @property {MetaTraits} meta_traits
 * @property {boolean} online
 * @property {string} created_at
 * @property {string} last_action
 * @property {string} [guild_id]
 * @property {string} [guild_rank]
 * @property {Object} [visibility]
 */

/**
 * @typedef {Object} PlayerStats
 * @property {number} total_actions
 * @property {number} total_stolen
 * @property {number} total_donated
 * @property {number} pvp_wins
 * @property {number} pvp_losses
 * @property {number} quests_completed
 * @property {number} guilds_joined
 * @property {number} robots_owned
 * @property {number} marriages
 */

export {};
