# Karma Nexus 2.0 - AI-Powered Multiplayer RPG

A groundbreaking, AI-powered massively multiplayer karma-based RPG where every action shapes your destiny.

## 🎮 Game Features

- **80 Traits System**: 60 base traits (Virtues, Vices, Skills) + 20 meta traits
- **25 Superpowers**: 5 tiers of legendary powers
- **AI Pantheon**: 6 AI entities managing different aspects of the game
- **Dynamic World**: Real-time multiplayer with WebSocket support
- **Guilds & Territory**: Control territories, wage wars, form alliances
- **AI-Generated Quests**: Unique personal campaigns for each player
- **3D Graphics**: Three.js powered 3D world

## 🛠️ Tech Stack

### Backend
- **Framework**: FastAPI (Python 3.11+)
- **Database**: MongoDB
- **Real-time**: WebSockets
- **AI**: Emergent LLM (GPT-4o)
- **Caching**: Redis

### Frontend
- **Framework**: React 18+ with TypeScript
- **3D Engine**: Three.js
- **State**: Zustand
- **Styling**: Tailwind CSS + Shadcn UI
- **Build**: Vite

## 🚀 Getting Started

### Prerequisites
- Python 3.11+
- Node.js 18+
- MongoDB
- Redis (optional, for caching)

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file
cp .env.example .env
# Edit .env with your configuration

# Run server
uvicorn server:app --reload --host 0.0.0.0 --port 8001
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
yarn install

# Copy environment file
cp .env.example .env
# Edit .env with your configuration

# Run development server
yarn dev
```

### Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8001
- **API Docs**: http://localhost:8001/docs

## 📚 Project Structure

```
/app/
├── backend/           # FastAPI backend
│   ├── api/           # API routes
│   ├── core/          # Core configuration
│   ├── models/        # Database models
│   ├── services/      # Business logic
│   │   ├── ai/        # AI Pantheon services
│   │   └── player/    # Player services
│   └── utils/         # Utilities
│
├── frontend/          # React frontend
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   ├── store/        # Zustand store
│   │   ├── hooks/        # Custom hooks
│   │   └── types/        # TypeScript types
│   └── public/        # Static assets
│
└── tests/             # Test suites
```

## 🎯 Phase 1 Completion Status

**Phase 1: Foundation (Weeks 1-3)** - ✅ **COMPLETE**

- [x] Project setup & architecture
- [x] Authentication system (JWT)
- [x] Database models (players, actions, karma)
- [x] Basic API structure
- [x] WebSocket foundation
- [x] Frontend skeleton with React + TypeScript
- [x] Basic 3D scene setup with Three.js
- [x] State management with Zustand
- [x] Shadcn UI components
- [x] Landing, Login, Register, Dashboard pages

**Files Created**: 55/55 (100%)

## 📝 Environment Variables

### Backend (.env)
```
MONGO_URL=mongodb://localhost:27017/karma_nexus
SECRET_KEY=your-secret-key-here
EMERGENT_LLM_KEY=your-emergent-llm-key
REDIS_URL=redis://localhost:6379/0
```

### Frontend (.env)
```
REACT_APP_BACKEND_URL=http://localhost:8001
REACT_APP_WS_URL=ws://localhost:8001/ws
```

## 🧑‍💻 Development

### Running Tests
```bash
# Backend tests
cd backend
pytest

# Frontend tests
cd frontend
yarn test
```

### Code Quality
```bash
# Backend linting
cd backend
ruff check .

# Frontend linting
cd frontend
yarn lint
```

## 💬 WebSocket Events

### Client → Server
- `authenticate` - Authenticate connection
- `join_room` - Join a game room
- `action_update` - Send player action

### Server → Client
- `player_joined` - Player entered world
- `action_performed` - Action completed
- `karma_changed` - Karma updated
- `trait_updated` - Trait changed

## 🚀 Next Steps (Phase 2+)

- [ ] Implement 80 traits system
- [ ] Build all 5 basic actions
- [ ] Integrate AI Karma Arbiter
- [ ] Add 25 superpowers
- [ ] Create guild system
- [ ] Build combat mechanics

## 📝 License

MIT License - see LICENSE file for details

## 👥 Contributing

Contributions are welcome! Please read CONTRIBUTING.md for details.

---

**Built with ❤️ for the future of AI-powered gaming**
