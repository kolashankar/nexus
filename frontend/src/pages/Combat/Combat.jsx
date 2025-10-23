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

const Combat = () => {
  const navigate = useNavigate();
  const { battleId } = useParams();
  const [activeBattles, setActiveBattles] = useState([]);
  const [tournaments, setTournaments] = useState([]);
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
      console.error('Failed to load combat data', error);
    } finally {
      setLoading(false);
    }
  };

  // If battleId is provided, show combat arena
  if (battleId) {
    return (
      <div className="container mx-auto py-6">
        <CombatArena battleId={battleId} />
      </div>
    );
  }

  const handleJoinArena = async (ranked) => {
    try {
      const result = await combatService.joinArenaQueue(playerId, ranked);
      if (result.battle_id) {
        navigate(`/combat/${result.battle_id}`);
      } else {
        alert('Searching for opponent...');
      }
    } catch (error) {
      alert(error.message || 'Failed to join arena');
    }
  };

  const handleRegisterTournament = async (tournamentId) => {
    try {
      await tournamentsService.registerForTournament(tournamentId, playerId);
      alert('Successfully registered!');
      loadData();
    } catch (error) {
      alert(error.message || 'Failed to register');
    }
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-2">
        Combat Arena
      </h1>
      <p className="text-muted-foreground mb-6">
        Test your skills in PvP battles and tournaments
      </p>

      <Tabs defaultValue="arena">
        <TabsList>
          <TabsTrigger value="arena">
            <Sword className="mr-2" /> Arena
          </TabsTrigger>
          <TabsTrigger value="duels">
            <Users className="mr-2" /> Duels
          </TabsTrigger>
          <TabsTrigger value="tournaments">
            <Trophy className="mr-2" /> Tournaments
          </TabsTrigger>
        </TabsList>

        {/* Arena Tab */}
        <TabsContent value="arena">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-2">Arena Matchmaking</h2>
            <p className="text-muted-foreground mb-4">
              Fight against players of similar skill level
            </p>
            <div className="flex gap-4">
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
            <Card className="p-6 mt-4">
              <h3 className="text-lg font-bold mb-4">Active Battles</h3>
              <div className="space-y-2">
                {activeBattles.map(battle => (
                  <div key={battle.battle_id} className="flex justify-between items-center p-3 border rounded">
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
        </TabsContent>

        {/* Duels Tab */}
        <TabsContent value="duels">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-2">Challenge Players</h2>
            <p className="text-muted-foreground">
              Send duel challenges to other players
            </p>
            <div className="mt-4">
              {/* TODO: Add duel challenges UI */}
              <p className="text-sm text-muted-foreground">Duel system coming soon...</p>
            </div>
          </Card>
        </TabsContent>

        {/* Tournaments Tab */}
        <TabsContent value="tournaments">
          <div className="space-y-4">
            {tournaments.length === 0 ? (
              <Card className="p-6">
                <p className="text-center text-muted-foreground">No active tournaments</p>
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
