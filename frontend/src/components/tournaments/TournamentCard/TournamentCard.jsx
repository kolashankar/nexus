import React from 'react';
import { Tournament } from '../../../types/combat';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Trophy, Users, Calendar } from 'lucide-react';
import './TournamentCard.css';



const TournamentCard = ({ 
  tournament,
  onRegister,
  onView,
  isRegistered = false
 }) => {
  const getStatusBadge = () => {
    switch (tournament.status) {
      case 'registration':
        return Open for Registration;
      case 'in_progress':
        return In Progress;
      case 'completed':
        return Completed;
      default)}
        
      

      {tournament.description}

      
        
          
          
            {tournament.participants.length} / {tournament.max_participants} Players
          
        
        {tournament.starts_at && (
          
            
            {new Date(tournament.starts_at).toLocaleString()}
          
        )}
      

      {tournament.prize_pool && Object.keys(tournament.prize_pool).length > 0 && (
        
          Prize Pool
          
            {Object.entries(tournament.prize_pool).map(([place, prize]) => (
              
                {place}
                {prize}
              
            ))}
          
        
      )}

      
        {tournament.status === 'registration' && !isRegistered && (
           onRegister(tournament.tournament_id)}
            disabled={tournament.participants.length >= tournament.max_participants}
            className="register-button"
          >
            Register Now
          
        )}
        {isRegistered && (
          ✓ Registered
        )}
         onView(tournament.tournament_id)}
          variant="outline"
        >
          View Details
        
      
    
  );
};

export default TournamentCard;
