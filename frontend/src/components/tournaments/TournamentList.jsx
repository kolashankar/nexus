import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Trophy, Users, Calendar, DollarSign, Crown } from 'lucide-react';
import { useTournaments } from '../../hooks/useTournaments';
import { toast } from 'sonner';



const TournamentList: React.FC = () => {
  const { tournaments, loading, registerForTournament, fetchActiveTournaments } = useTournaments();
  const [registering, setRegistering] = useState(null);

  useEffect(() => {
    fetchActiveTournaments();
  }, []);

  const handleRegister = async (tournamentId) => {
    setRegistering(tournamentId);
    try {
      await registerForTournament(tournamentId);
      toast.success('Registered successfully!', {
        description);
      await fetchActiveTournaments();
    } catch (error) {
      toast.error('Registration failed', {
        description);
    } finally {
      setRegistering(null);
    }
  };

  const getStatusColor = (status)=> {
    const colors: Record = {
      registration,
      active,
      completed,
      upcoming: 'bg-yellow-500'
    };
    return colors[status] || 'bg-gray-500';
  };

  const getTournamentTypeIcon = (type) => {
    const icons: Record = {
      pvp_combat,
      robot_battle,
      trading_competition,
      quest_speedrun,
      creativity_contest;
    return icons[type] || ;
  };

  const formatDate = (dateString)=> {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month,
      day,
      hour,
      minute);
  };

  const canRegister = (tournament)=> {
    const now = new Date();
    const regEnd = new Date(tournament.registration_end);
    return tournament.status === 'registration' && 
           now 
        
      
    );
  }

  return (
    
      
        Tournaments
        Compete for glory and rewards
      

      {tournaments.length === 0 ? (
        
          
            
              
              No Active Tournaments
              
                Check back soon for upcoming competitions
              
            
          
        
      ) : (
        
          {tournaments.map((tournament) => (
            
              
                
                  
                    {getTournamentTypeIcon(tournament.tournament_type)}
                    {tournament.name}
                  
                  
                    {tournament.status}
                  
                
                
                  {tournament.description || 'No description'}
                
              
              
                {/* Info Grid */}
                
                  
                    
                    
                      {tournament.total_registered}/{tournament.max_participants}
                    
                  
                  
                    
                    {tournament.prize_pool.toLocaleString()}
                  
                  
                    
                    {formatDate(tournament.start_time)}
                  
                

                {/* Requirements */}
                {(tournament.min_level || tournament.min_karma || tournament.entry_fee > 0) && (
                  
                    Requirements)}
                  
                )}

                {/* Action Button */}
                {canRegister(tournament) && (
                   handleRegister(tournament.tournament_id)}
                    disabled={registering === tournament.tournament_id}
                    className="w-full"
                  >
                    {registering === tournament.tournament_id ? 'Registering...' : 'Register'}
                  
                )}
                {tournament.status === 'active' && (
                  
                    In Progress
                  
                )}
              
            
          ))}
        
      )}
    
  );
};

export default TournamentList;
