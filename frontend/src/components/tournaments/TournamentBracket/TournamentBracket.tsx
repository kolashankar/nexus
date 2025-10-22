import React from 'react';
import { Card } from '../../ui/card';
import './TournamentBracket.css';

interface Match {
  match_id: string;
  round_number: number;
  match_number: number;
  player1_id?: string;
  player2_id?: string;
  winner_id?: string;
  status: string;
}

interface TournamentBracketProps {
  bracket: any;
  currentRound: number;
}

const TournamentBracket: React.FC<TournamentBracketProps> = ({ bracket, currentRound }) => {
  const renderMatch = (match: Match) => {
    return (
      <div key={match.match_id} className={`match match-status-${match.status}`}>
        <div className={`player ${match.winner_id === match.player1_id ? 'winner' : ''}`}>
          {match.player1_id || 'TBD'}
        </div>
        <div className="match-vs">VS</div>
        <div className={`player ${match.winner_id === match.player2_id ? 'winner' : ''}`}>
          {match.player2_id || 'TBD'}
        </div>
      </div>
    );
  };

  const renderRound = (roundNumber: number) => {
    const roundMatches = bracket[`round_${roundNumber}`] || [];
    
    return (
      <div key={roundNumber} className="round">
        <h4 className="round-title">
          {roundNumber === Math.ceil(Math.log2(32)) ? 'Finals' :
           roundNumber === Math.ceil(Math.log2(32)) - 1 ? 'Semi-Finals' :
           roundNumber === Math.ceil(Math.log2(32)) - 2 ? 'Quarter-Finals' :
           `Round ${roundNumber}`}
        </h4>
        <div className="matches">
          {roundMatches.map((match: Match) => renderMatch(match))}
        </div>
      </div>
    );
  };

  const totalRounds = Object.keys(bracket).length;

  return (
    <Card className="tournament-bracket">
      <h3>Tournament Bracket</h3>
      <div className="bracket-container">
        {Array.from({ length: totalRounds }, (_, i) => i + 1).map(round => renderRound(round))}
      </div>
    </Card>
  );
};

export default TournamentBracket;
