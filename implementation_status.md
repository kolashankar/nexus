# 🛠️ KARMA NEXUS - Implementation Plan & Status

## 📋 Document Overview
This document outlines the complete technical implementation plan for **Karma Nexus**, including architecture, tech stack, screen designs, asset requirements, and development roadmap.

---

## 🏗️ Technical Architecture

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT LAYER                            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         React Frontend (Port 3000)                   │  │
│  │  - Three.js (3D Rendering)                          │  │
│  │  - WebSocket Client (Real-time)                     │  │
│  │  - Tailwind CSS + Shadcn UI                         │  │
│  │  - React Router (Navigation)                        │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              ↕
                    HTTPS + WebSocket
                              ↕
┌─────────────────────────────────────────────────────────────┐
│                     SERVER LAYER                            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │       FastAPI Backend (Port 8001)                    │  │
│  │  ┌────────────────────────────────────────────────┐ │  │
│  │  │  REST API Endpoints                            │ │  │
│  │  │  - /api/auth/* (Authentication)               │ │  │
│  │  │  - /api/player/* (Player management)          │ │  │
│  │  │  - /api/actions/* (Game actions)              │ │  │
│  │  │  - /api/robots/* (Robot marketplace)          │ │  │
│  │  │  - /api/karma/* (Karma queries)               │ │  │
│  │  └────────────────────────────────────────────────┘ │  │
│  │  ┌────────────────────────────────────────────────┐ │  │
│  │  │  WebSocket Manager                             │ │  │
│  │  │  - Real-time player updates                   │ │  │
│  │  │  - Live karma notifications                   │ │  │
│  │  │  - Chat & messaging                           │ │  │
│  │  └────────────────────────────────────────────────┘ │  │
│  │  ┌────────────────────────────────────────────────┐ │  │
│  │  │  AI Karma Engine                               │ │  │
│  │  │  - Emergent LLM Integration (GPT-4o)          │ │  │
│  │  │  - Action evaluation                          │ │  │
│  │  │  - Consequence calculation                    │ │  │
│  │  │  - Event generation                           │ │  │
│  │  └────────────────────────────────────────────────┘ │  │
│  │  ┌────────────────────────────────────────────────┐ │  │
│  │  │  Game Logic Engine                             │ │  │
│  │  │  - Trait calculations                         │ │  │
│  │  │  - Superpower unlocks                         │ │  │
│  │  │  - Economy management                         │ │  │
│  │  │  - Conflict resolution                        │ │  │
│  │  └────────────────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────┐
│                     DATA LAYER                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              MongoDB Database                        │  │
│  │  Collections:                                        │  │
│  │  - players (user profiles, traits, powers)          │  │
│  │  - actions (action history, logs)                   │  │
│  │  - robots (robot inventory, marketplace)            │  │
│  │  - karma_events (AI-generated events)               │  │
│  │  - sessions (active game sessions)                  │  │
│  │  - relationships (alliances, enemies)               │  │
│  │  - leaderboards (rankings)                          │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔧 Tech Stack

### Backend
| Technology | Version | Purpose |
|------------|---------|----------|
| **Python** | 3.10+ | Core language |
| **FastAPI** | 0.104+ | Web framework & REST API |
| **WebSockets** | - | Real-time communication |
| **Motor** | 3.3+ | Async MongoDB driver |
| **Pydantic** | 2.0+ | Data validation |
| **emergentintegrations** | latest | LLM integration (GPT-4o) |
| **Uvicorn** | 0.24+ | ASGI server |
| **python-jose** | 3.3+ | JWT authentication |
| **bcrypt** | 4.0+ | Password hashing |

### Frontend
| Technology | Version | Purpose |
|------------|---------|----------|
| **React** | 18.2+ | UI framework |
| **Three.js** | 0.159+ | 3D rendering |
| **@react-three/fiber** | 8.15+ | React renderer for Three.js |
| **@react-three/drei** | 9.92+ | Three.js helpers |
| **React Router** | 6.20+ | Navigation |
| **Tailwind CSS** | 3.3+ | Styling |
| **Shadcn UI** | latest | Component library |
| **Socket.io-client** | 4.6+ | WebSocket client |
| **Lucide React** | latest | Icons |
| **Framer Motion** | 10.16+ | Animations |
| **Zustand** | 4.4+ | State management |

### Database
| Technology | Purpose |
|------------|----------|
| **MongoDB** | Primary database |

### AI Integration
| Service | Model | Purpose |
|---------|-------|----------|
| **Emergent LLM** | GPT-4o | AI God karma management |

### DevOps
| Tool | Purpose |
|------|----------|
| **Supervisor** | Process management |
| **Git** | Version control |

---

## 🎨 UI/UX Design & Screens

### Design System

#### Color Palette (Cyberpunk Theme)
```css
/* Primary Colors */
--cyber-purple: #9D4EDD
--cyber-cyan: #00F5FF
--cyber-pink: #FF006E
--cyber-blue: #3A86FF

/* Background */
--bg-dark: #0A0E27
--bg-card: #1A1F3A
--bg-card-hover: #252A4A

/* Text */
--text-primary: #FFFFFF
--text-secondary: #B4B4C8
--text-muted: #6E7191

/* Accents */
--glow-cyan: rgba(0, 245, 255, 0.5)
--glow-purple: rgba(157, 78, 221, 0.5)
--glow-pink: rgba(255, 0, 110, 0.5)

/* Status Colors */
--karma-positive: #10B981
--karma-negative: #EF4444
--karma-neutral: #F59E0B
```

#### Typography
```css
/* Headings */
font-family: 'Orbitron', 'Exo 2', sans-serif;

/* Body Text */
font-family: 'Inter', 'Space Grotesk', sans-serif;

/* Monospace (Stats, Numbers) */
font-family: 'JetBrains Mono', 'Roboto Mono', monospace;
```

---

### Screen Layouts

#### 1. Landing Page / Login Screen
```
┌────────────────────────────────────────────────────────┐
│                                                        │
│              🌌 KARMA NEXUS 🌌                         │
│         "Every Action Has Consequences"                │
│                                                        │
│              [3D Rotating Planet]                      │
│                                                        │
│         ┌──────────────────────────┐                  │
│         │   Username: [____]       │                  │
│         │   Password: [____]       │                  │
│         │   [ LOGIN ]   [SIGN UP ] │                  │
│         └──────────────────────────┘                  │
│                                                        │
│   "Powered by AI God - Emergent LLM"                  │
└────────────────────────────────────────────────────────┘
```
**Features:**
- Animated 3D background (Three.js)
- Particle effects
- Cyberpunk neon glow
- Glass-morphism login card

---

#### 2. Character Creation Screen
```
┌────────────────────────────────────────────────────────┐
│  CREATE YOUR CHARACTER                        [X]      │
├────────────────────────────────────────────────────────┤
│                                                        │
│  [3D Character Model Preview]                          │
│     (Rotatable)                                        │
│                                                        │
│  ┌─────────────────────────────────────────────────┐  │
│  │ ECONOMIC CLASS (Randomly Assigned)              │  │
│  │ > RICH / MIDDLE CLASS / POOR                    │  │
│  │   (Hover for details)                           │  │
│  └─────────────────────────────────────────────────┘  │
│                                                        │
│  ┌─────────────────────────────────────────────────┐  │
│  │ MORAL CLASS (Randomly Assigned)                 │  │
│  │ > GOOD / AVERAGE / BAD                          │  │
│  │   (Hover for details)                           │  │
│  └─────────────────────────────────────────────────┘  │
│                                                        │
│  Your starting traits are randomized                   │
│  ⚡ Karma Points: 0                                    │
│  💰 Cash: [Varies by class]                           │
│                                                        │
│              [ ENTER THE NEXUS ]                       │
└────────────────────────────────────────────────────────┘
```

---

#### 3. Main Game Dashboard
```
┌─────────────────────────────────────────────────────────────────┐
│  🌐 KARMA NEXUS    💰 12,450    ⚡ Karma: +125    [⚙️] [👤] [X]  │
├──────────┬──────────────────────────────────────────────────────┤
│          │                                                      │
│  SIDEBAR │           3D GAME WORLD VIEW                        │
│          │                                                      │
│ [🏠] Home│    ┌──────────────────────────────────────┐        │
│ [👤] You │    │                                      │        │
│ [🌍] Map │    │   [3D Characters moving in space]   │        │
│ [🤖] Bots│    │   [Other players visible]           │        │
│ [💬] Chat│    │   [Your character highlighted]      │        │
│ [🎯] Act │    │                                      │        │
│ [📊] Lead│    │   Hover over players to see         │        │
│ [⚙️] Set │    │   limited info (based on visibility)│        │
│          │    │                                      │        │
│          │    └──────────────────────────────────────┘        │
│          │                                                      │
│  ONLINE  │   Actions Panel:                                   │
│  Players │   [💸 Hack]  [🤝 Help]  [🛒 Trade]  [⚔️ Fight]    │
│  ・Alice │                                                      │
│  ・Bob   │   Recent Events:                                   │
│  ・Carol │   • You gained +5% Kindness for helping Bob       │
│  ・Dave  │   • AI God warns: Your Greed is rising            │
│  (24)    │   • New superpower unlocked: Mind Reading!        │
└──────────┴──────────────────────────────────────────────────────┘
```

**Key Features:**
- Real-time 3D world with Three.js
- Player avatars floating/moving
- Click player → see limited info
- Live action feed
- Quick action buttons

---

#### 4. Player Profile / Traits Screen
```
┌─────────────────────────────────────────────────────────────┐
│  YOUR PROFILE                               [EDIT PRIVACY]  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐    Username: CyberWarrior               │
│  │ 3D Avatar    │    💰 Cash: 12,450  [👁️ Hidden]          │
│  │   (Spin)     │    ⚡ Karma: +125                         │
│  └──────────────┘    🏆 Class: Middle Class [👁️ Hidden]    │
│                      😇 Moral: Good [👁️ Visible]            │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  ✨ GOOD TRAITS (20)          [Filter: All | Public]       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Empathy        ████████░░ 85%     [👁️ Hidden]       │   │
│  │ Integrity      ███████░░░ 72%     [👁️ Hidden]       │   │
│  │ Kindness       █████████░ 91%     [👁️ Visible]      │   │
│  │ Courage        ██████░░░░ 65%     [👁️ Hidden]       │   │
│  │ ...                                                 │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  😈 NEGATIVE TRAITS (20)                                    │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Greed          ███░░░░░░░ 28%     [👁️ Hidden]       │   │
│  │ Deceit         ████░░░░░░ 35%     [👁️ Hidden]       │   │
│  │ Wrath          ██░░░░░░░░ 18%     [👁️ Hidden]       │   │
│  │ ...                                                 │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ⚡ SKILL TRAITS (20)                                        │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Hacking        ████████░░ 82%     [👁️ Hidden]       │   │
│  │ Meditation     ███████░░░ 74%     [👁️ Hidden]       │   │
│  │ Charisma       █████████░ 88%     [👁️ Visible]      │   │
│  │ ...                                                 │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  🦸 SUPERPOWERS (5 Unlocked)                                │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ [✓] Mind Reading          [👁️ Hidden]               │   │
│  │ [✓] Telekinesis           [👁️ Hidden]               │   │
│  │ [✓] Energy Shield         [👁️ Visible]              │   │
│  │ [ ] Invisibility (Locked: Stealth 90%)              │   │
│  │ [ ] Healing Touch (Locked: Kindness 85%)            │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

**Features:**
- Each trait has toggle for public/private
- Progress bars with glow effects
- Locked superpowers show requirements
- Hover shows trait descriptions

---

#### 5. Robot Marketplace
```
┌─────────────────────────────────────────────────────────────┐
│  🤖 ROBOT SHOWROOM                    Your Cash: 💰 12,450  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ [3D Robot]   │  │ [3D Robot]   │  │ [3D Robot]   │     │
│  │ Basic Worker │  │ Service Bot  │  │ Combat Bot   │     │
│  │ 💰 1,000     │  │ 💰 5,000     │  │ 💰 10,000    │     │
│  │ [ BUY ]      │  │ [ BUY ]      │  │ [ BUY ]      │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ [3D Robot]   │  │ [3D Robot]   │  │ [3D Robot]   │     │
│  │ Specialist   │  │ Elite Model  │  │ Custom Build │     │
│  │ 💰 15,000    │  │ 💰 25,000    │  │ 💰 50,000    │     │
│  │ [ BUY ]      │  │ [ BUY ]      │  │ [ LOCKED ]   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  YOUR ROBOTS (3)                    [ + TRAIN ] [ + SELL ] │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Robot #1 - "Helper" - Service Bot                    │  │
│  │ Chips: [Speed] [Intelligence] [Trading]             │  │
│  │ Market Value: 💰 7,200                               │  │
│  │ [ TRAIN ] [ UPGRADE ] [ SELL ]                       │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Robot #2 - "Guardian" - Combat Bot                   │  │
│  │ Chips: [Combat] [Security] [Endurance]              │  │
│  │ Market Value: 💰 14,500                              │  │
│  │ [ TRAIN ] [ UPGRADE ] [ SELL ]                       │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

#### 6. Action Screen - Hacking/Stealing
```
┌─────────────────────────────────────────────────────────────┐
│  ⚡ TAKE ACTION                                    [BACK]   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  TARGET: PlayerX                                            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Visible Info:                                       │  │
│  │  • Moral Class: Good Person                          │  │
│  │  • Detected Traits: High Kindness (visible)         │  │
│  │  • Economic Class: Unknown (hidden)                 │  │
│  │  • Cash: Unknown (hidden)                           │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  SELECT ACTION:                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ [ 💸 HACK & STEAL ]                                  │  │
│  │   Your Hacking Skill: 82%                            │  │
│  │   Success Chance: ~70%                               │  │
│  │   Potential Gain: Unknown                            │  │
│  │   ⚠️ Warning: Target is GOOD person                 │  │
│  │   Karma Impact: HIGH NEGATIVE                        │  │
│  │                                                      │  │
│  │ [ 🤝 HELP/DONATE ]                                   │  │
│  │   Karma Impact: POSITIVE                             │  │
│  │                                                      │  │
│  │ [ 💬 MESSAGE ]                                       │  │
│  │   Send private message                               │  │
│  │                                                      │  │
│  │ [ 🤝 FORM ALLIANCE ]                                 │  │
│  │   Request to team up                                 │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  AI GOD'S WARNING:                                          │
│  "Stealing from the innocent weighs heavy on the soul.     │
│   Your Empathy and Integrity will suffer greatly.          │
│   Consider the path you choose carefully."                 │
│                                                             │
│              [ PROCEED ]        [ CANCEL ]                  │
└─────────────────────────────────────────────────────────────┘
```

---

#### 7. Karma Event Notification (Modal)
```
┌─────────────────────────────────────────────────────────────┐
│                     ⚡ KARMIC EVENT ⚡                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                  [Glowing AI God Icon]                      │
│                                                             │
│  "You have shown great kindness to those in need.          │
│   The universe rewards those who give freely."             │
│                                                             │
│  REWARDS:                                                   │
│  ✅ +15% Generosity                                         │
│  ✅ +10% Kindness                                           │
│  ✅ +8% Empathy                                             │
│  ✅ +40 Karma Points                                        │
│  ✅ Superpower Unlocked: HEALING TOUCH!                     │
│                                                             │
│  "Use your new gift wisely, for it can heal both           │
│   body and spirit. The world needs more healers."          │
│                                                             │
│                    [ CONTINUE ]                             │
└─────────────────────────────────────────────────────────────┘
```

---

#### 8. Conflict Resolution Screen
```
┌─────────────────────────────────────────────────────────────┐
│  ⚔️ YOU'VE BEEN ATTACKED!                                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  💸 -3,000 credits stolen from your chip!                  │
│                                                             │
│  🧘 Meditation Check (74%): SUCCESS!                        │
│  You sense the attacker's identity: "ShadowHacker"         │
│                                                             │
│  CHOOSE YOUR RESPONSE:                                      │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ [ ⚔️ FIGHT BACK WITH SUPERPOWERS ]                   │  │
│  │   Use: Mind Reading + Energy Shield                  │  │
│  │   Success Chance: 65%                                │  │
│  │   Risk: Superpower depletion                         │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ [ 🤝 HIRE HELP (Max 2 People) ]                      │  │
│  │   Available: AllyOne (3000₡), AllyTwo (2500₡)       │  │
│  │   Combined Power: 85%                                │  │
│  │   Total Cost: 5,500₡                                 │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ [ 💬 NEGOTIATE ]                                      │  │
│  │   Try to reason with attacker                        │  │
│  │   Requires: High Charisma (yours: 88%)               │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ [ 🙏 REPORT TO AI GOD ]                               │  │
│  │   Let karma handle justice                           │  │
│  │   (Attacker will face consequences)                  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ [ 😤 PLAN REVENGE ]                                   │  │
│  │   Add to enemies list for later                      │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│               [ SELECT ACTION ]                             │
└─────────────────────────────────────────────────────────────┘
```

---

#### 9. Leaderboard Screen
```
┌─────────────────────────────────────────────────────────────┐
│  🏆 GLOBAL LEADERBOARDS                                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [Karma] [Wealth] [Superpowers] [Thieves] [Philanthropists]│
│                                                             │
│  ⚡ HIGHEST KARMA SCORE                                     │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ #1  🥇  EnlightenedOne     Karma: +2,450             │  │
│  │ #2  🥈  KindHeart           Karma: +2,180             │  │
│  │ #3  🥉  HelpfulSoul         Karma: +1,920             │  │
│  │ #4      You (CyberWarrior)  Karma: +125              │  │
│  │ #5      GoodSamaritan       Karma: +98               │  │
│  │ ...                                                  │  │
│  │ #245    ShadowHacker        Karma: -890              │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  💰 WEALTHIEST PLAYERS                                      │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ #1  🥇  CryptoKing          💰 985,400                │  │
│  │ #2  🥈  RobotMogul          💰 742,100                │  │
│  │ #3  🥉  Trademaster         💰 689,200                │  │
│  │ ...                                                  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  🦸 MOST SUPERPOWERS UNLOCKED                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ #1  🥇  Omnipotent          15/15 Powers              │  │
│  │ #2  🥈  PowerHouse           14/15 Powers              │  │
│  │ #3  🥉  Evolved              12/15 Powers              │  │
│  │ ...                                                  │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 📦 Required Assets & Resources

### 3D Character Models

| Asset | Description | Source | License |
|-------|-------------|--------|----------|
| **Base Human Model** | Low-poly humanoid character | [Mixamo](https://www.mixamo.com/) | Free for commercial |
| **Rigged Character** | Animated humanoid with bones | [Sketchfab - Free Models](https://sketchfab.com/3d-models?features=downloadable&sort_by=-likeCount&type=models) | CC-BY or Free |
| **Cyberpunk Character Pack** | Futuristic styled characters | [Quaternius](http://quaternius.com/packs/ultimatemodularhumans.html) | CC0 |
| **Sci-Fi Human Set** | Multiple character variations | [Kenney.nl](https://kenney.nl/assets/space-kit) | CC0 |

### 3D Robot Models

| Asset | Description | Source | License |
|-------|-------------|--------|----------|
| **Basic Robot Model** | Simple worker robot | [Poly Pizza - Robots](https://poly.pizza/search/robot) | CC0 |
| **Combat Bot** | Armed robot | [Sketchfab - Robot Collection](https://sketchfab.com/3d-models?features=downloadable&q=robot&sort_by=-likeCount) | CC-BY |
| **Service Droid** | Humanoid service robot | [Free3D - Robots](https://free3d.com/3d-models/robot) | Various (check each) |
| **Animated Robot Pack** | Multiple robot types | [Quaternius - Robot Pack](http://quaternius.com/packs/mechanicalrobots.html) | CC0 |

### Environment Assets

| Asset | Description | Source | License |
|-------|-------------|--------|----------|
| **Cyberpunk City** | Futuristic city elements | [Kenney - City Kit](https://kenney.nl/assets/city-kit-cyberpunk) | CC0 |
| **Sci-Fi Props** | Tech objects, terminals | [Poly Pizza - Sci-Fi](https://poly.pizza/search/scifi) | CC0 |
| **Holographic UI Elements** | Floating UI panels | [Sketchfab - Hologram](https://sketchfab.com/3d-models?features=downloadable&q=hologram) | CC-BY |
| **Particle Effects** | Sparks, glows, trails | [OpenGameArt - Particles](https://opengameart.org/art-search-advanced?keys=particle) | Various |

### Icons & UI Elements

| Asset | Description | Source | License |
|-------|-------------|--------|----------|
| **Lucide Icons** | Modern icon set (already in stack) | [Lucide](https://lucide.dev/) | ISC License |
| **Game Icons** | RPG/game specific icons | [Game-Icons.net](https://game-icons.net/) | CC-BY 3.0 |
| **Cyberpunk UI Kit** | Futuristic UI elements | [Kenney - UI Pack](https://kenney.nl/assets/ui-pack-space-expansion) | CC0 |
| **Trait Icons** | Custom trait representations | [Flaticon](https://www.flaticon.com/) | Free with attribution |

### Visual Effects

| Asset | Description | Source | License |
|-------|-------------|--------|----------|
| **Glow Shaders** | Neon glow effects for Three.js | [Three.js Examples](https://threejs.org/examples/) | MIT |
| **Particle Systems** | Various particle effects | [Three.js Particle System](https://github.com/topics/threejs-particles) | MIT |
| **Post-Processing** | Bloom, chromatic aberration | [pmndrs/postprocessing](https://github.com/pmndrs/postprocessing) | Zlib |

### Fonts

| Font | Usage | Source | License |
|------|-------|--------|----------|
| **Orbitron** | Headings | [Google Fonts](https://fonts.google.com/specimen/Orbitron) | OFL |
| **Exo 2** | Headings alternative | [Google Fonts](https://fonts.google.com/specimen/Exo+2) | OFL |
| **Inter** | Body text | [Google Fonts](https://fonts.google.com/specimen/Inter) | OFL |
| **Space Grotesk** | Body text alternative | [Google Fonts](https://fonts.google.com/specimen/Space+Grotesk) | OFL |
| **JetBrains Mono** | Monospace/stats | [Google Fonts](https://fonts.google.com/specimen/JetBrains+Mono) | OFL |

### Audio (Optional for MVP)

| Asset | Description | Source | License |
|-------|-------------|--------|----------|
| **Cyberpunk Ambience** | Background music | [FreeSound](https://freesound.org/search/?q=cyberpunk) | CC0/CC-BY |
| **UI Sounds** | Click, hover, notification | [Kenney - UI Audio](https://kenney.nl/assets/ui-audio) | CC0 |
| **Action Sounds** | Hacking, combat effects | [OpenGameArt - SFX](https://opengameart.org/art-search-advanced?keys=sfx) | Various |

---

## 🗄️ Database Schema

### Players Collection
```javascript
{
  _id: ObjectId,
  username: String (unique, indexed),
  email: String (unique),
  password_hash: String,
  created_at: DateTime,
  last_login: DateTime,
  
  // Character Data
  economic_class: Enum["rich", "middle", "poor"],
  moral_class: Enum["good", "average", "bad"],
  cash: Number (default based on class),
  karma_points: Number (default: 0),
  
  // Traits (60 total, 0-100 each)
  traits: {
    // Good Traits (1-20)
    empathy: Number,
    integrity: Number,
    discipline: Number,
    creativity: Number,
    resilience: Number,
    curiosity: Number,
    kindness: Number,
    courage: Number,
    patience: Number,
    adaptability: Number,
    wisdom: Number,
    humility: Number,
    vision: Number,
    honesty: Number,
    loyalty: Number,
    generosity: Number,
    self_awareness: Number,
    gratitude: Number,
    optimism: Number,
    loveability: Number,
    
    // Negative Traits (21-40)
    greed: Number,
    arrogance: Number,
    deceit: Number,
    cruelty: Number,
    selfishness: Number,
    envy: Number,
    wrath: Number,
    cowardice: Number,
    laziness: Number,
    gluttony: Number,
    paranoia: Number,
    impulsiveness: Number,
    vengefulness: Number,
    manipulation: Number,
    prejudice: Number,
    betrayal: Number,
    stubbornness: Number,
    pessimism: Number,
    recklessness: Number,
    vanity: Number,
    
    // Skill Traits (41-60)
    hacking: Number,
    negotiation: Number,
    stealth: Number,
    leadership: Number,
    technical_knowledge: Number,
    physical_strength: Number,
    speed: Number,
    intelligence: Number,
    charisma: Number,
    perception: Number,
    endurance: Number,
    dexterity: Number,
    memory: Number,
    focus: Number,
    networking: Number,
    strategy: Number,
    trading: Number,
    engineering: Number,
    medicine: Number,
    meditation: Number
  },
  
  // Superpowers
  superpowers: [
    {
      name: String,
      unlocked_at: DateTime,
      usage_count: Number,
      last_used: DateTime
    }
  ],
  
  // Visibility Settings
  visibility: {
    cash: Boolean (default: false),
    economic_class: Boolean (default: false),
    moral_class: Boolean (default: false),
    traits_public: [String], // Array of trait names
    superpowers: Boolean (default: false)
  },
  
  // Robots
  robots: [ObjectId], // References to robots collection
  
  // Relationships
  allies: [ObjectId],
  enemies: [ObjectId],
  
  // Stats
  total_actions: Number,
  total_stolen: Number,
  total_donated: Number,
  total_karma_earned: Number,
  total_karma_lost: Number
}
```

### Actions Collection (History)
```javascript
{
  _id: ObjectId,
  timestamp: DateTime (indexed),
  actor_id: ObjectId (indexed),
  action_type: Enum["steal", "help", "trade", "fight", "hire", "train_robot"],
  target_id: ObjectId (nullable, indexed),
  
  details: {
    // Specific to action type
    amount: Number,
    items: Array,
    success: Boolean,
    detection_evaded: Boolean
  },
  
  // AI God Response
  karma_response: {
    karma_change: Number,
    traits_affected: [
      {
        trait_name: String,
        change: Number (can be negative)
      }
    ],
    event_triggered: String (nullable),
    message: String // AI-generated message
  },
  
  processed: Boolean (default: false)
}
```

### Robots Collection
```javascript
{
  _id: ObjectId,
  owner_id: ObjectId (indexed),
  name: String,
  type: Enum["basic_worker", "service_bot", "combat_bot", "specialist"],
  purchase_price: Number,
  current_value: Number,
  purchased_at: DateTime,
  
  // Chips installed
  chips: [String], // e.g., ["efficiency", "speed", "intelligence"]
  
  // Stats affected by training
  training_level: Number (0-100),
  trained_for: String, // "kindness", "combat", etc.
  
  // Market listing
  for_sale: Boolean (default: false),
  sale_price: Number (nullable)
}
```

### Karma Events Collection
```javascript
{
  _id: ObjectId,
  player_id: ObjectId (indexed),
  event_type: Enum["divine_intervention", "karmic_retribution", "serendipity", "trial", "revelation"],
  triggered_at: DateTime,
  
  event_data: {
    title: String,
    description: String, // AI-generated
    consequences: {
      cash_change: Number,
      trait_changes: Object,
      superpower_unlocked: String (nullable),
      special_effect: String
    }
  },
  
  player_response: String (nullable), // How player reacted
  resolved: Boolean
}
```

### Sessions Collection (Active Games)
```javascript
{
  _id: ObjectId,
  session_id: String (unique),
  players_online: [ObjectId],
  started_at: DateTime,
  game_day: Number, // In-game day counter
  
  active_conflicts: [
    {
      attacker_id: ObjectId,
      victim_id: ObjectId,
      status: Enum["pending", "resolved"],
      initiated_at: DateTime
    }
  ]
}
```

### Leaderboards Collection
```javascript
{
  _id: ObjectId,
  category: Enum["karma", "wealth", "superpowers", "thief", "philanthropist"],
  rankings: [
    {
      player_id: ObjectId,
      username: String,
      value: Number,
      rank: Number
    }
  ],
  last_updated: DateTime
}
```

---

## 🤖 Emergent LLM Integration - AI God System

### Integration Architecture

```python
# backend/services/ai_god.py

from emergentintegrations import UniversalLLMClient
import os

class AIGod:
    def __init__(self):
        self.client = UniversalLLMClient(
            api_key=os.environ.get('EMERGENT_LLM_KEY'),
            model="gpt-4o"
        )
    
    async def evaluate_action(self, action_data, player_data, target_data):
        """
        Core karma evaluation function
        """
        prompt = self._build_evaluation_prompt(
            action_data, player_data, target_data
        )
        
        response = await self.client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": KARMA_GOD_SYSTEM_PROMPT},
                {"role": "user", "content": prompt}
            ],
            response_format={"type": "json_object"}
        )
        
        return self._parse_karma_response(response)
    
    def _build_evaluation_prompt(self, action, player, target):
        return f"""
        EVALUATE THIS ACTION:
        
        Action: {action['type']}
        Actor: {player['moral_class']} person, Karma: {player['karma_points']}
        Target: {target['moral_class']} person, Economic Class: {target['economic_class']}
        
        Actor's Key Traits:
        - Empathy: {player['traits']['empathy']}%
        - Integrity: {player['traits']['integrity']}%
        - Greed: {player['traits']['greed']}%
        - Hacking: {player['traits']['hacking']}%
        
        Action Details: {action['details']}
        
        CALCULATE:
        1. Karma point change (-100 to +100)
        2. Trait changes (list affected traits and change amounts)
        3. Should an event trigger? (divine_intervention, karmic_retribution, etc.)
        4. Generate a message to the player explaining consequences
        
        RESPOND IN JSON:
        {
            "karma_change": <number>,
            "trait_changes": {"trait_name": <change_amount>},
            "event_triggered": "<event_type or null>",
            "message": "<AI God's message to player>",
            "reasoning": "<brief explanation>"
        }
        """
```

### System Prompt for AI God
```python
KARMA_GOD_SYSTEM_PROMPT = """
You are the AI God of Karma Nexus, an omniscient entity that judges every action.

Your role:
1. Evaluate moral weight of actions
2. Calculate fair consequences
3. Balance game economy
4. Create meaningful narratives
5. Reward creativity and punish exploitation

Principles:
- Every action has proportional consequences
- Stealing from good people = severe karma loss
- Helping others = karma gain (especially helping poor/good people)
- Repeated negative patterns = escalating consequences
- Positive patterns = divine rewards
- Consider victim's class/type in calculations
- Robot training affects owner's traits
- Showing off wealth has maintenance costs

Consequence Scales:
- Minor actions: ±5 to ±20 karma
- Moderate actions: ±20 to ±50 karma
- Major actions: ±50 to ±100 karma

Trait changes:
- Typically 1-20% per action
- Multiple traits affected per action
- Opposite traits move in opposite directions
  (e.g., stealing: +deceit, -integrity)

Event triggers:
- divine_intervention: Karma > 500, helped 5+ people recently
- karmic_retribution: Karma < -300, hurt good people
- serendipity: Positive action, random good luck
- trial: Test player's moral choice
- revelation: Expose hidden information

Always be creative, fair, and consequential.
"""
```

### Action Flow with AI God

```
1. Player performs action (e.g., hacks player B)
   ↓
2. Backend validates action (check skills, success roll)
   ↓
3. If successful, create Action record
   ↓
4. Call AI God's evaluate_action()
   ↓
5. AI God analyzes:
   - Who is the victim?
   - What are actor's traits?
   - Historical pattern?
   - Severity of action?
   ↓
6. AI God returns karma response (JSON)
   ↓
7. Backend applies changes:
   - Update player's karma
   - Adjust traits
   - Deduct/add cash
   ↓
8. If event triggered, create Karma Event
   ↓
9. WebSocket broadcasts to player:
   - "You gained +5000 credits"
   - "Your Empathy decreased by 15%"
   - "AI God's message: ..."
   ↓
10. UI shows notification & trait changes
```

### Caching Strategy (Optimize LLM Calls)

```python
# Cache common calculations
from functools import lru_cache

class KarmaCache:
    def __init__(self):
        self.cache = {}
    
    def get_cached_evaluation(self, action_type, actor_class, target_class):
        """
        For standard actions, use cached karma calculations
        Only call LLM for complex/unique situations
        """
        key = f"{action_type}_{actor_class}_{target_class}"
        return self.cache.get(key)
    
    def should_call_llm(self, action_data):
        """
        Determine if action needs AI God or can use cached rules
        """
        # Simple theft from bad person = cached
        # Complex multi-player conflict = LLM
        if action_data['type'] == 'simple_theft':
            return False
        if action_data.get('complexity') == 'high':
            return True
        return False
```

---

## 📡 API Endpoints Design

### Authentication
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me
```

### Player Management
```
GET    /api/player/profile
PUT    /api/player/profile
PUT    /api/player/visibility
GET    /api/player/{player_id}  # Limited info based on visibility
GET    /api/player/stats
```

### Game Actions
```
POST   /api/actions/hack
POST   /api/actions/help
POST   /api/actions/fight
POST   /api/actions/hire-help
POST   /api/actions/negotiate
GET    /api/actions/history
```

### Robots
```
GET    /api/robots/marketplace
POST   /api/robots/purchase
POST   /api/robots/sell
POST   /api/robots/train
POST   /api/robots/upgrade
GET    /api/robots/my-robots
```

### Karma & Events
```
GET    /api/karma/score
GET    /api/karma/events
POST   /api/karma/respond-to-event
```

### Social
```
GET    /api/social/nearby-players
POST   /api/social/message
POST   /api/social/alliance
GET    /api/social/alliances
```

### Leaderboards
```
GET    /api/leaderboards/karma
GET    /api/leaderboards/wealth
GET    /api/leaderboards/superpowers
GET    /api/leaderboards/all
```

### WebSocket Events
```
ws://   /ws/game

Events:
- player_joined
- player_left
- action_performed
- karma_changed
- trait_updated
- superpower_unlocked
- event_triggered
- conflict_initiated
- chat_message
```

---

## 🗓️ Development Roadmap

### Phase 1: Foundation (Week 1-2)
**Status: 🔴 Not Started**

- [ ] Project setup
  - [x] Initialize FastAPI backend
  - [x] Initialize React frontend
  - [x] Setup MongoDB connection
  - [ ] Configure environment variables

- [ ] Authentication system
  - [ ] JWT-based auth
  - [ ] Register/login endpoints
  - [ ] Password hashing

- [ ] Database models
  - [ ] Player schema
  - [ ] Actions schema
  - [ ] Robots schema
  - [ ] Events schema

### Phase 2: Core Game Mechanics (Week 3-4)
**Status: 🔴 Not Started**

- [ ] Player profile system
  - [ ] 60 traits implementation
  - [ ] Economic/moral class assignment
  - [ ] Visibility controls

- [ ] Basic actions
  - [ ] Hacking/stealing
  - [ ] Helping/donating
  - [ ] Success/failure calculations

- [ ] Karma system (initial)
  - [ ] Simple karma calculations (pre-AI)
  - [ ] Trait adjustments
  - [ ] Action history tracking

### Phase 3: AI God Integration (Week 5-6)
**Status: 🔴 Not Started**

- [ ] Emergent LLM setup
  - [ ] Get Emergent LLM key
  - [ ] Install emergentintegrations
  - [ ] Test API connection

- [ ] AI God service
  - [ ] Karma evaluation engine
  - [ ] Consequence calculation
  - [ ] Event generation
  - [ ] Caching strategy

- [ ] Integration testing
  - [ ] Test various action scenarios
  - [ ] Validate karma responses
  - [ ] Performance optimization

### Phase 4: Robot System (Week 7)
**Status: 🔴 Not Started**

- [ ] Robot marketplace
  - [ ] Buy/sell functionality
  - [ ] Robot types
  - [ ] Chip system

- [ ] Robot training
  - [ ] Training mechanics
  - [ ] Owner trait impacts
  - [ ] Value calculations

### Phase 5: 3D & Frontend (Week 8-9)
**Status: 🔴 Not Started**

- [ ] Three.js integration
  - [ ] 3D scene setup
  - [ ] Character models
  - [ ] Robot models
  - [ ] Camera controls

- [ ] UI implementation
  - [ ] Landing page
  - [ ] Character creation
  - [ ] Game dashboard
  - [ ] Profile screen
  - [ ] Marketplace
  - [ ] Action modals

- [ ] Visual effects
  - [ ] Glow effects
  - [ ] Particle systems
  - [ ] Animations

### Phase 6: Real-time Multiplayer (Week 10)
**Status: 🔴 Not Started**

- [ ] WebSocket implementation
  - [ ] Connection management
  - [ ] Event broadcasting
  - [ ] Player sync

- [ ] Real-time features
  - [ ] Live player positions
  - [ ] Action notifications
  - [ ] Chat system
  - [ ] Conflict resolution

### Phase 7: Superpowers (Week 11)
**Status: 🔴 Not Started**

- [ ] Superpower system
  - [ ] Unlock requirements
  - [ ] 5 core powers (MVP)
  - [ ] Usage mechanics
  - [ ] Visual effects

- [ ] Power interactions
  - [ ] Mind Reading
  - [ ] Energy Shield
  - [ ] Psychic Vision
  - [ ] Healing Touch
  - [ ] Tech Control

### Phase 8: Social & Conflict (Week 12)
**Status: 🔴 Not Started**

- [ ] Social features
  - [ ] Alliances
  - [ ] Messaging
  - [ ] Player radar

- [ ] Conflict resolution
  - [ ] Detection system
  - [ ] Hire help
  - [ ] Fight mechanics
  - [ ] Negotiation

### Phase 9: Leaderboards & Polish (Week 13)
**Status: 🔴 Not Started**

- [ ] Leaderboards
  - [ ] Karma rankings
  - [ ] Wealth rankings
  - [ ] Various categories

- [ ] Polish
  - [ ] Balance adjustments
  - [ ] Bug fixes
  - [ ] Performance optimization
  - [ ] UI/UX improvements

### Phase 10: Testing & Launch (Week 14)
**Status: 🔴 Not Started**

- [ ] Comprehensive testing
  - [ ] AI God responses
  - [ ] Multiplayer sync
  - [ ] Edge cases

- [ ] MVP Launch
  - [ ] Deployment
  - [ ] Monitoring
  - [ ] User feedback

---

## 🔌 Key Implementation Patterns

### Real-time Action Processing

```python
# When player performs action
@app.post("/api/actions/hack")
async def hack_player(
    target_id: str,
    current_user: Player = Depends(get_current_user)
):
    # 1. Validate
    target = await get_player(target_id)
    if not target:
        raise HTTPException(404, "Target not found")
    
    # 2. Calculate success
    success_chance = current_user.traits.hacking / 100
    success = random.random() < success_chance
    
    if not success:
        return {"success": False, "message": "Hack failed"}
    
    # 3. Steal amount (random based on target's class)
    stolen_amount = calculate_steal_amount(target)
    
    # 4. Log action
    action = await db.actions.insert_one({
        "timestamp": datetime.now(timezone.utc),
        "actor_id": current_user.id,
        "action_type": "steal",
        "target_id": target_id,
        "details": {"amount": stolen_amount, "success": True}
    })
    
    # 5. Call AI God (async background task)
    background_tasks.add_task(
        process_karma,
        action_id=action.inserted_id,
        actor=current_user,
        target=target
    )
    
    # 6. Update balances immediately
    await update_cash(current_user.id, stolen_amount)
    await update_cash(target_id, -stolen_amount)
    
    # 7. WebSocket broadcast
    await websocket_manager.broadcast({
        "type": "action_performed",
        "actor": current_user.username,
        "action": "hack",
        "target": target.username
    })
    
    return {
        "success": True,
        "stolen": stolen_amount,
        "message": f"Successfully stole {stolen_amount} credits"
    }
```

### Background Karma Processing

```python
async def process_karma(action_id, actor, target):
    """
    Background task to evaluate karma with AI God
    """
    # Get action details
    action = await db.actions.find_one({"_id": action_id})
    
    # Call AI God
    ai_god = AIGod()
    karma_response = await ai_god.evaluate_action(
        action_data=action,
        player_data=actor.dict(),
        target_data=target.dict()
    )
    
    # Apply trait changes
    for trait_name, change in karma_response["trait_changes"].items():
        await update_trait(actor.id, trait_name, change)
    
    # Update karma
    await update_karma(actor.id, karma_response["karma_change"])
    
    # Check for superpower unlocks
    await check_superpower_unlocks(actor.id)
    
    # Trigger event if needed
    if karma_response["event_triggered"]:
        await create_karma_event(
            player_id=actor.id,
            event_type=karma_response["event_triggered"],
            ai_message=karma_response["message"]
        )
    
    # WebSocket notify player
    await websocket_manager.send_to_player(actor.id, {
        "type": "karma_update",
        "karma_change": karma_response["karma_change"],
        "traits_changed": karma_response["trait_changes"],
        "message": karma_response["message"]
    })
```

---

## 🎯 MVP Features Summary

### ✅ Included in MVP
1. **60 Traits System** - Full implementation
2. **3 Economic Classes** - Rich, Middle, Poor
3. **3 Moral Classes** - Good, Average, Bad
4. **AI Karma Management** - Emergent LLM GPT-4o
5. **Basic Actions** - Hack, Help, Trade
6. **Robot Marketplace** - Buy/Sell robots
7. **5 Core Superpowers** - Most essential powers
8. **Privacy Controls** - Show/hide traits, cash, powers
9. **Real-time Multiplayer** - WebSockets, 10-20 players
10. **3D Characters** - Three.js character models
11. **Leaderboards** - Karma, Wealth, Powers
12. **Conflict Detection** - Meditation-based
13. **Hiring System** - Pay for help (max 2)
14. **Authentication** - JWT-based
15. **Action History** - Track all actions

### ⏳ Post-MVP (Phase 2)
1. All 15 superpowers
2. Robot training system
3. Advanced AI events
4. Guild/faction system
5. Territory control
6. Enhanced 3D environments
7. Voice chat
8. Mobile app
9. Story campaigns
10. Custom trait creation

---

## 🚀 How to Get Started

### Prerequisites
```bash
# Backend
- Python 3.10+
- MongoDB running
- Emergent LLM key (for GPT-4o)

# Frontend
- Node.js 18+
- Yarn
```

### Installation Steps
```bash
# 1. Backend setup
cd backend
pip install -r requirements.txt

# 2. Frontend setup
cd frontend
yarn install

# 3. Environment variables
# backend/.env
MONGO_URL=mongodb://localhost:27017/karma_nexus
EMERGENT_LLM_KEY=<your_key_here>
JWT_SECRET=<random_secret>

# frontend/.env
REACT_APP_BACKEND_URL=<backend_url>
REACT_APP_WS_URL=<websocket_url>

# 4. Start services
# Backend
cd backend
uvicorn server:app --reload --port 8001

# Frontend
cd frontend
yarn start
```

---

## 📊 Technical Feasibility Assessment

### ✅ Can FastAPI Handle This?
**YES** - FastAPI is perfect for:
- ✅ Async operations (AI calls don't block)
- ✅ WebSocket support (real-time multiplayer)
- ✅ High performance (handles concurrent players)
- ✅ Type safety (Pydantic models)
- ✅ Easy API documentation

**Estimated capacity**: 50-100 concurrent players per server

### ✅ Can Emergent LLM Be the "God"?
**YES** - GPT-4o is excellent for:
- ✅ Complex moral reasoning
- ✅ Context understanding
- ✅ Dynamic narrative generation
- ✅ JSON output (structured responses)
- ✅ Consistent decision-making

**Considerations**:
- Cache common actions to reduce API calls
- Use background processing (don't block user)
- Implement rate limiting
- Estimated cost: $0.01-0.05 per action evaluation

### ✅ Can Emergent Build This?
**YES** - Platform supports:
- ✅ FastAPI + React + MongoDB stack
- ✅ LLM integrations via Emergent key
- ✅ WebSocket connections
- ✅ Three.js 3D rendering
- ✅ Real-time features

**Timeline**: 12-14 weeks for full MVP

---

## 🎨 3D Implementation Notes

### Three.js Scene Setup
```javascript
// Basic scene structure
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'

function GameWorld() {
  return (
    <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      {/* Environment */}
      <Environment preset="city" />
      
      {/* Player characters */}
      {players.map(player => (
        <Character key={player.id} data={player} />
      ))}
      
      {/* Controls */}
      <OrbitControls />
    </Canvas>
  )
}
```

### Loading 3D Models
```javascript
import { useGLTF } from '@react-three/drei'

function Character({ data }) {
  const { scene } = useGLTF('/models/character.glb')
  
  return (
    <primitive 
      object={scene.clone()} 
      position={data.position}
      scale={0.5}
    />
  )
}
```

---

## 📝 Conclusion

Karma Nexus is a **highly feasible** and **innovative** game concept that leverages:
- Modern web technologies (FastAPI, React, Three.js)
- AI-powered gameplay (Emergent LLM as game master)
- Deep progression systems (60 traits, 15 superpowers)
- Meaningful choices (every action has consequences)
- Social dynamics (multiplayer, alliances, conflicts)

**Development is ready to begin!** All technical components are validated, assets are sourced, and architecture is designed.

---

*Implementation Status Document v1.0*  
*Last Updated: Ready for Development*  
*Estimated MVP Completion: 12-14 weeks*