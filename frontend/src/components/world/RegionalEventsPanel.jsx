import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { MapPin, Zap, Shield, TrendingUp, AlertTriangle, PartyPopper } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http;





const RegionalEventsPanel: React.FC = ({ territoryId }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (territoryId) {
      fetchRegionalEvents(territoryId);
    }
  }, [territoryId]);

  const fetchRegionalEvents = async (territory) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_URL}/api/world/events/regional/${territory}`,
        {
          headers);
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching regional events, error);
    } finally {
      setLoading(false);
    }
  };

  const getEventIcon = (eventType) => {
    const icons: Record = {
      resource_surge,
      hostile_takeover,
      market_boom,
      npc_raid,
      festival,
      disaster;
    return icons[eventType] || ;
  };

  const getEventColor = (eventType)=> {
    const colors: Record = {
      resource_surge,
      hostile_takeover,
      market_boom,
      npc_raid,
      festival,
      disaster: 'border-red-600/50'
    };
    return colors[eventType] || '';
  };

  const calculateTimeRemaining = (endsAt)=> {
    const end = new Date(endsAt);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    
    if (diff  0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const renderEffects = (effects) => {
    return Object.entries(effects).map(([key, value]) => {
      let displayValue = value;
      if (typeof value === 'number') {
        if (value > 1) {
          displayValue = `${value}x`;
        } else if (value 
          
            {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:
          
          {displayValue.toString()}
        
      );
    });
  };

  if (!territoryId) {
    return (
      
        
          
            
            
              Select a territory to view regional events
            
          
        
      
    );
  }

  if (loading) {
    return (
      
        
          Regional Events
        
        
          
            
          
        
      
    );
  }

  return (
    
      
        
          
          Regional Events
        
        
          Active events in this territory
        
      
      
        {events.length === 0 ? (
          
            
              No active events in this territory
            
          
        ) : (
          
            {events.map((event) => (
              
                
                  
                    {getEventIcon(event.event_type)}
                    
                      {event.name}
                      
                        {event.territory_name}
                      
                    
                  
                  
                    {calculateTimeRemaining(event.ends_at)}
                  
                
                
                
                  {event.description}
                
                
                
                  Effects)}
                
              
            ))}
          
        )}
      
    
  );
};

export default RegionalEventsPanel;
