/**
 * Karma Feed Component - Displays recent karma events.
 */

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { ScrollArea } from '../../ui/scroll-area';
import { useKarma } from '../../../hooks/useKarma';
import { formatDistanceToNow } from 'date-fns';
import {
  Zap,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Award,
  Skull
} from 'lucide-react';
import './KarmaFeed.css';



export const KarmaFeed= () => {
  const { karmaHistory, loading, loadKarmaHistory } = useKarma();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    loadKarmaHistory(20);
  }, [loadKarmaHistory]);

  useEffect(() => {
    if (karmaHistory) {
      setEvents(karmaHistory);
    }
  }, [karmaHistory]);

  const getKarmaIcon = (karmaChange, eventType?) => {
    if (eventType === 'divine_blessing') return null;
    if (eventType === 'punishment') return null;
    if (karmaChange > 50) return null;
    if (karmaChange > 0) return null;
    if (karmaChange ;
    if (karmaChange ;
    return null;
  };

  const getKarmaBadge = (karmaChange) => {
    const value = Math.abs(karmaChange);
    const sign = karmaChange >= 0 ? '+' ;
    
    let variant= 'default';
    if (karmaChange > 50) variant = 'default';
    else if (karmaChange > 0) variant = 'secondary';
    else if (karmaChange 
        {sign}{value}
      
    );
  };

  if (loading && events.length === 0) {
    return (
      
        
          
            
            Karma Feed
          
        
        
          
            
            
            
          
        
      
    );
  }

  if (events.length === 0) {
    return (
      
        
          
            
            Karma Feed
          
        
        
          
            
            No karma events yet
            
              Start performing actions to generate karma
            
          
        
      
    );
  }

  return (
    
      
        
          
          Karma Feed
          
            {events.length} events
          
        
      
      
        
          
            {events.map((event) => (
              
                
                  {getKarmaIcon(event.karma_change, event.event_type)}
                
                
                  
                    {event.action_type}
                    {getKarmaBadge(event.karma_change)}
                  
                  {event.message}
                  
                    {formatDistanceToNow(new Date(event.timestamp), { addSuffix)}
                  
                
              
            ))}
          
        
      
    
  );
};
