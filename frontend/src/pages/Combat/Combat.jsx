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
  const { battleId } = useParams();
  const [activeBattles, setActiveBattles] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get player ID from auth (mock for now)
  const playerId = 'current-player-id'; // TODO) => {
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
    
      
        Combat Arena
        Test your skills in PvP battles and tournaments
      

      
        
          
             Arena
          
          
             Duels
          
          
             Tournaments
          
        

        {/* Arena Tab */}
        
          
            
              Arena Matchmaking
              Fight against players of similar skill level
              
                 handleJoinArena(false)}
                  size="lg"
                  className="casual-button"
                >
                  Join Casual Match
                
                 handleJoinArena(true)}
                  size="lg"
                  className="ranked-button"
                >
                  Join Ranked Match
                
              
            

            {activeBattles.length > 0 && (
              
                Active Battles
                
                  {activeBattles.map(battle => (
                    
                      {battle.battle_type}
                       navigate(`/combat/${battle.battle_id}`)}
                        size="sm"
                      >
                        Continue
                      
                    
                  ))}
                
              
            )}
          
        

        {/* Duels Tab */}
        
          
            Challenge Players
            Send duel challenges to other players
            
              {/* TODO) : tournaments.length === 0 ? (
              
                No active tournaments
              
            ) : (
              tournaments.map(tournament => (
                 navigate(`/tournaments/${id}`)} />
              ))
            )}
          
        
      
    
  );
};

export default Combat;
