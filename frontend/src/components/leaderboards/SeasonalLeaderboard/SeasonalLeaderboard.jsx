import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Calendar, Trophy } from 'lucide-react';
import LeaderboardPanel from '../Leaderboard/LeaderboardPanel';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http;



const SeasonalLeaderboard= () => {
  const [season, setSeason] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCurrentSeason();
  }, []);

  const fetchCurrentSeason = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/api/seasonal/season/current`, {
        headers);
      setSeason(response.data);
    } catch (error) {
      console.error('Error fetching current season', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateDaysRemaining = ()=> {
    if (!season) return 0;
    const end = new Date(season.end_date);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  if (loading) {
    return (
      
        
      
    );
  }

  return (
    
      {/* Season Info */}
      {season && (
        
          
            
              
                
                  
                  {season.name}
                
                {season.description}
              
              
                Season {season.season_number}
              
            
          
          
            
              
                Days Remaining
                
                  
                  {calculateDaysRemaining()}
                
              
              
                Active Players
                {season.active_players.toLocaleString()}
              
              
                Total Players
                {season.total_players.toLocaleString()}
              
            
          
        
      )}

      {/* Leaderboards */}
      
    
  );
};

export default SeasonalLeaderboard;
