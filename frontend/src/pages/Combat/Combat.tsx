import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CombatArena from '../../components/combat/CombatArena/CombatArena';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import combatService from '../../services/combat/combatService';
import tournamentsService from '../../services/tournaments/tournamentsService';
import TournamentCard from '../../components/tournaments/TournamentCard/TournamentCard';
import { Sword, Trophy, Users } from 'lucide-react';
import './Combat.css';

const Combat: React.FC = () => {
  const navigate = useNavigate();
  const { battleId } = useParams<{ battleId?: string }>();
  const [activeBattles, setActiveBattles] = useState<any[]>([]);
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Get player ID from auth (mock for now)
  const playerId = 'current-player-id'; // TODO: Get from auth context

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [battlesData, tournamentsData] = await Promise.all([
        combatService.getActiveBattles(playerId),
        tournamentsService.getActiveTournaments()
      ]);
      setActiveBattles(battlesData.battles || []);
      setTournaments(tournamentsData || []);
    } catch (error) {
      console.error('Failed to load combat data:', error);
    } finally {
      setLoading(false);
    }
  };

  // If battleId is provided, show combat arena
  if (battleId) {
    return (
      <div className="combat-page">
        <CombatArena battleId={battleId} playerId={playerId} />
      </div>
    );
  }

  const handleJoinArena = async (ranked: boolean) => {
    try {
      const result = await combatService.joinArenaQueue(playerId, ranked);
      if (result.battle_id) {
        navigate(`/combat/${result.battle_id}`);
      } else {
        alert('Searching for opponent...');
      }
    } catch (error: any) {
      alert(error.message || 'Failed to join arena');
    }
  };

  const handleRegisterTournament = async (tournamentId: string) => {
    try {
      await tournamentsService.registerForTournament(tournamentId, playerId);
      alert('Successfully registered!');
      loadData();
    } catch (error: any) {
      alert(error.message || 'Failed to register');
    }
  };

  return (
    <div className="combat-page">
      <div className="combat-header">
        <h1>Combat Arena</h1>
        <p>Test your skills in PvP battles and tournaments</p>
      </div>

      <Tabs defaultValue="arena" className="combat-tabs">
        <TabsList>
          <TabsTrigger value="arena">
            <Sword size={16} /> Arena
          </TabsTrigger>
          <TabsTrigger value="duels">
            <Users size={16} /> Duels
          </TabsTrigger>
          <TabsTrigger value="tournaments">
            <Trophy size={16} /> Tournaments
          </TabsTrigger>
        </TabsList>

        {/* Arena Tab */}
        <TabsContent value="arena">
          <div className="arena-section">
            <Card className="arena-card">
              <h2>Arena Matchmaking</h2>
              <p>Fight against players of similar skill level</p>
              <div className="arena-buttons">
                <Button
                  onClick={() => handleJoinArena(false)}
                  size="lg"
                  className="casual-button"
                >
                  Join Casual Match
                </Button>
                <Button
                  onClick={() => handleJoinArena(true)}
                  size="lg"
                  className="ranked-button"
                >
                  Join Ranked Match
                </Button>
              </div>
            </Card>

            {activeBattles.length > 0 && (
              <Card className="active-battles-card">
                <h3>Active Battles</h3>
                <div className="battles-list">
                  {activeBattles.map(battle => (
                    <div key={battle.battle_id} className="battle-item">
                      <span>{battle.battle_type}</span>
                      <Button
                        onClick={() => navigate(`/combat/${battle.battle_id}`)}
                        size="sm"
                      >
                        Continue
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Duels Tab */}
        <TabsContent value="duels">
          <Card>
            <h2>Challenge Players</h2>
            <p>Send duel challenges to other players</p>
            <div className="duels-section">
              {/* TODO: Add player list and challenge functionality */}
              <p className="coming-soon">Coming soon: Player search and challenge system</p>
            </div>
          </Card>
        </TabsContent>

        {/* Tournaments Tab */}
        <TabsContent value="tournaments">
          <div className="tournaments-grid">
            {loading ? (
              <p>Loading tournaments...</p>
            ) : tournaments.length === 0 ? (
              <Card>
                <p className="no-tournaments">No active tournaments</p>
              </Card>
            ) : (
              tournaments.map(tournament => (
                <TournamentCard
                  key={tournament.tournament_id}
                  tournament={tournament}
                  onRegister={handleRegisterTournament}
                  onView={(id) => navigate(`/tournaments/${id}`)}
                />
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Combat;
