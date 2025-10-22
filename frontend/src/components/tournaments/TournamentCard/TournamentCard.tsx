import React from 'react';
import { Tournament } from '../../../types/combat';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Trophy, Users, Calendar } from 'lucide-react';
import './TournamentCard.css';

interface TournamentCardProps {
  tournament: Tournament;
  onRegister: (tournamentId: string) => void;
  onView: (tournamentId: string) => void;
  isRegistered?: boolean;
}

const TournamentCard: React.FC<TournamentCardProps> = ({
  tournament,
  onRegister,
  onView,
  isRegistered = false
}) => {
  const getStatusBadge = () => {
    switch (tournament.status) {
      case 'registration':
        return <span className="status-badge registration">Open for Registration</span>;
      case 'in_progress':
        return <span className="status-badge in-progress">In Progress</span>;
      case 'completed':
        return <span className="status-badge completed">Completed</span>;
      default:
        return null;
    }
  };

  return (
    <Card className="tournament-card">
      <div className="tournament-header">
        <Trophy className="tournament-icon" size={32} />
        <div>
          <h3>{tournament.name}</h3>
          {getStatusBadge()}
        </div>
      </div>

      <p className="tournament-description">{tournament.description}</p>

      <div className="tournament-info">
        <div className="info-item">
          <Users size={16} />
          <span>
            {tournament.participants.length} / {tournament.max_participants} Players
          </span>
        </div>
        {tournament.starts_at && (
          <div className="info-item">
            <Calendar size={16} />
            <span>{new Date(tournament.starts_at).toLocaleString()}</span>
          </div>
        )}
      </div>

      {tournament.prize_pool && Object.keys(tournament.prize_pool).length > 0 && (
        <div className="prize-pool">
          <h4>Prize Pool</h4>
          <div className="prizes">
            {Object.entries(tournament.prize_pool).map(([place, prize]) => (
              <div key={place} className="prize-item">
                <span className="place">{place}</span>
                <span className="prize">{prize}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="tournament-actions">
        {tournament.status === 'registration' && !isRegistered && (
          <Button
            onClick={() => onRegister(tournament.tournament_id)}
            disabled={tournament.participants.length >= tournament.max_participants}
            className="register-button"
          >
            Register Now
          </Button>
        )}
        {isRegistered && (
          <span className="registered-badge">✓ Registered</span>
        )}
        <Button
          onClick={() => onView(tournament.tournament_id)}
          variant="outline"
        >
          View Details
        </Button>
      </div>
    </Card>
  );
};

export default TournamentCard;
