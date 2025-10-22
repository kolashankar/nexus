import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MapPin, Shield, Swords, TrendingUp, Users } from 'lucide-react';
import { worldService } from '@/services/api/worldService';
import './WorldMap.css';



export const WorldMap: React.FC = () => {
  const [territories, setTerritories] = useState([]);
  const [selectedTerritory, setSelectedTerritory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTerritories();
  }, []);

  const fetchTerritories = async () => {
    try {
      const data = await worldService.getAllTerritories();
      setTerritories(data.territories);
      
      if (data.territories.length > 0) {
        setSelectedTerritory(data.territories[0]);
      }
    } catch (error) {
      console.error('Error fetching territories, error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'controlled': return 'bg-blue-500';
      case 'contested': return 'bg-red-500';
      case 'neutral': return 'bg-gray-500';
      default;
    }
  };

  const getRegionColor = (region) => {
    switch (region) {
      case 'north': return 'from-blue-400 to-blue-600';
      case 'south': return 'from-green-400 to-green-600';
      case 'east': return 'from-yellow-400 to-yellow-600';
      case 'west': return 'from-purple-400 to-purple-600';
      case 'central': return 'from-red-400 to-red-600';
      default) {
    return (
      
        
      
    );
  }

  return (
    
      
        {/* Territory List */}
        
          
            
              
                
                Territories
              
            
            
              
                
                  {territories.map((territory) => (
                     setSelectedTerritory(territory)}
                    >
                      
                        
                          {territory.name}
                          
                            {territory.region} Region
                          
                        
                        
                      
                      
                      {territory.contested && (
                        
                          
                          Contested
                        
                      )}
                      
                      {territory.controlling_guild_name && (
                        
                          Controlled by)}
                      
                      
                        
                          
                          {territory.total_residents}
                        
                        
                          Karma)}
                        
                      
                    
                  ))}
                
              
            
          
        

        {/* Territory Details */}
        
          {selectedTerritory ? (
            
              
                
                  
                    {selectedTerritory.name}
                    {selectedTerritory.region} Region
                  
                
                
                
                  
                    {selectedTerritory.status}
                  
                  {selectedTerritory.contested && (
                    
                      
                      Under Siege
                    
                  )}
                
              
              
              
                {/* Description */}
                
                  {selectedTerritory.description}
                

                {/* Control Info */}
                {selectedTerritory.controlling_guild_name && (
                  
                    
                      
                      Controlled Territory
                    
                    
                      Under control of {selectedTerritory.controlling_guild_name}
                    
                  
                )}

                {/* Stats Grid */}
                
                  
                    
                      
                        
                        {selectedTerritory.total_residents}
                        Total Residents
                        
                          {selectedTerritory.online_players} online
                        
                      
                    
                  

                  
                    
                      
                        
                        {selectedTerritory.local_karma.toFixed(0)}
                        Local Karma
                      
                    
                  
                

                {/* Prosperity & Conflict */}
                
                  
                    
                      Prosperity Level
                      {selectedTerritory.prosperity_level.toFixed(0)}%
                    
                    
                      
                    
                  

                  
                    
                      Conflict Level
                      {selectedTerritory.conflict_level.toFixed(0)}%
                    
                    
                      
                    
                  

                  
                    
                      Strategic Value
                      {selectedTerritory.strategic_value}/100
                    
                    
                      
                    
                  
                

                {/* Active Events */}
                {selectedTerritory.active_events.length > 0 && (
                  
                    Active Regional Events
                    
                      {selectedTerritory.active_events.map((event, idx) => (
                        
                          {event.name}
                          
                            {event.event_type}
                          
                        
                      ))}
                    
                  
                )}
              
            
          ) : (
            
              
                
                Select a territory to view details
              
            
          )}
        
      
    
  );
};
