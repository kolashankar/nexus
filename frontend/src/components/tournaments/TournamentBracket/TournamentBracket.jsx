import React from 'react';
import { Card } from '../../ui/card';
import './TournamentBracket.css';





const TournamentBracket = ({  bracket, currentRound  }) => {
  const renderMatch = (match) => {
    return (
      
        
          {match.player1_id || 'TBD'}
        
        VS
        
          {match.player2_id || 'TBD'}
        
      
    );
  };

  const renderRound = (roundNumber) => {
    const roundMatches = bracket[`round_${roundNumber}`] || [];
    
    return (
      
        
          {roundNumber === Math.ceil(Math.log2(32)) ? 'Finals' 
           roundNumber === Math.ceil(Math.log2(32)) - 1 ? 'Semi-Finals' 
           roundNumber === Math.ceil(Math.log2(32)) - 2 ? 'Quarter-Finals' 
           `Round ${roundNumber}`}
        
        
          {roundMatches.map((match) => renderMatch(match))}
        
      
    );
  };

  const totalRounds = Object.keys(bracket).length;

  return (
    
      Tournament Bracket
      
        {Array.from({ length, (_, i) => i + 1).map(round => renderRound(round))}
      
    
  );
};

export default TournamentBracket;
