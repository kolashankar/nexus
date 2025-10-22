import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Trophy, Users, Calendar, DollarSign, Crown } from 'lucide-react';
import { useTournaments } from '../../hooks/useTournaments';
import { toast } from 'sonner';

interface Tournament {
  tournament_id: string;
  name: string;
  description: string;
  tournament_type: string;
  status: string;
  registration_start: string;
  registration_end: string;
  start_time: string;
  max_participants: number;
  total_registered: number;
  entry_fee: number;
  prize_pool: number;
  min_level?: number;
  min_karma?: number;
}

const TournamentList: React.FC = () => {
  const { tournaments, loading, registerForTournament, fetchActiveTournaments } = useTournaments();
  const [registering, setRegistering] = useState<string | null>(null);

  useEffect(() => {
    fetchActiveTournaments();
  }, []);

  const handleRegister = async (tournamentId: string) => {
    setRegistering(tournamentId);
    try {
      await registerForTournament(tournamentId);
      toast.success('Registered successfully!', {
        description: 'Good luck in the tournament!'
      });
      await fetchActiveTournaments();
    } catch (error: any) {
      toast.error('Registration failed', {
        description: error.message || 'Please try again'
      });
    } finally {
      setRegistering(null);
    }
  };

  const getStatusColor = (status: string): string => {
    const colors: Record<string, string> = {
      registration: 'bg-blue-500',
      active: 'bg-green-500',
      completed: 'bg-gray-500',
      upcoming: 'bg-yellow-500'
    };
    return colors[status] || 'bg-gray-500';
  };

  const getTournamentTypeIcon = (type: string) => {
    const icons: Record<string, React.ReactNode> = {
      pvp_combat: <Trophy className="h-5 w-5" />,
      robot_battle: <Trophy className="h-5 w-5" />,
      trading_competition: <DollarSign className="h-5 w-5" />,
      quest_speedrun: <Trophy className="h-5 w-5" />,
      creativity_contest: <Crown className="h-5 w-5" />
    };
    return icons[type] || <Trophy className="h-5 w-5" />;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const canRegister = (tournament: Tournament): boolean => {
    const now = new Date();
    const regEnd = new Date(tournament.registration_end);
    return tournament.status === 'registration' && 
           now < regEnd && 
           tournament.total_registered < tournament.max_participants;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Tournaments</h2>
        <p className="text-muted-foreground">Compete for glory and rewards</p>
      </div>

      {tournaments.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <Trophy className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-semibold mb-2">No Active Tournaments</p>
              <p className="text-sm text-muted-foreground">
                Check back soon for upcoming competitions
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tournaments.map((tournament) => (
            <Card key={tournament.tournament_id} className="hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getTournamentTypeIcon(tournament.tournament_type)}
                    <CardTitle className="text-lg">{tournament.name}</CardTitle>
                  </div>
                  <Badge className={getStatusColor(tournament.status)}>
                    {tournament.status}
                  </Badge>
                </div>
                <CardDescription className="line-clamp-2">
                  {tournament.description || 'No description'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {tournament.total_registered}/{tournament.max_participants}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span>{tournament.prize_pool.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2 col-span-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs">{formatDate(tournament.start_time)}</span>
                  </div>
                </div>

                {/* Requirements */}
                {(tournament.min_level || tournament.min_karma || tournament.entry_fee > 0) && (
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <p className="font-semibold">Requirements:</p>
                    {tournament.min_level && <p>• Level {tournament.min_level}+</p>}
                    {tournament.min_karma && <p>• Karma {tournament.min_karma}+</p>}
                    {tournament.entry_fee > 0 && (
                      <p>• Entry Fee: {tournament.entry_fee} credits</p>
                    )}
                  </div>
                )}

                {/* Action Button */}
                {canRegister(tournament) && (
                  <Button
                    onClick={() => handleRegister(tournament.tournament_id)}
                    disabled={registering === tournament.tournament_id}
                    className="w-full"
                  >
                    {registering === tournament.tournament_id ? 'Registering...' : 'Register'}
                  </Button>
                )}
                {tournament.status === 'active' && (
                  <Badge variant="outline" className="w-full justify-center">
                    In Progress
                  </Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TournamentList;
