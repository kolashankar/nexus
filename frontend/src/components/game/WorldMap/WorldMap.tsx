import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MapPin, Shield, Swords, TrendingUp, Users } from 'lucide-react';
import { worldService } from '@/services/api/worldService';
import './WorldMap.css';

interface Territory {
  territory_id: number;
  name: string;
  description: string;
  region: string;
  status: string;
  controlling_guild_id: string | null;
  controlling_guild_name: string | null;
  contested: boolean;
  total_residents: number;
  online_players: number;
  local_karma: number;
  prosperity_level: number;
  conflict_level: number;
  strategic_value: number;
  active_events: Array<any>;
}

export const WorldMap: React.FC = () => {
  const [territories, setTerritories] = useState<Territory[]>([]);
  const [selectedTerritory, setSelectedTerritory] = useState<Territory | null>(null);
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
      console.error('Error fetching territories:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'controlled': return 'bg-blue-500';
      case 'contested': return 'bg-red-500';
      case 'neutral': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getRegionColor = (region: string) => {
    switch (region) {
      case 'north': return 'from-blue-400 to-blue-600';
      case 'south': return 'from-green-400 to-green-600';
      case 'east': return 'from-yellow-400 to-yellow-600';
      case 'west': return 'from-purple-400 to-purple-600';
      case 'central': return 'from-red-400 to-red-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="world-map-container p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Territory List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Territories
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[700px]">
                <div className="space-y-2 p-4">
                  {territories.map((territory) => (
                    <div
                      key={territory.territory_id}
                      className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                        selectedTerritory?.territory_id === territory.territory_id
                          ? 'border-primary bg-primary/5'
                          : 'border-border'
                      }`}
                      onClick={() => setSelectedTerritory(territory)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="font-semibold">{territory.name}</div>
                          <div className="text-xs text-muted-foreground capitalize">
                            {territory.region} Region
                          </div>
                        </div>
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(territory.status)}`} />
                      </div>
                      
                      {territory.contested && (
                        <Badge variant="destructive" className="text-xs">
                          <Swords className="w-3 h-3 mr-1" />
                          Contested
                        </Badge>
                      )}
                      
                      {territory.controlling_guild_name && (
                        <div className="text-xs text-muted-foreground mt-1">
                          Controlled by: {territory.controlling_guild_name}
                        </div>
                      )}
                      
                      <div className="flex items-center gap-3 mt-2 text-xs">
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {territory.total_residents}
                        </div>
                        <div className="text-muted-foreground">
                          Karma: {territory.local_karma.toFixed(0)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Territory Details */}
        <div className="lg:col-span-2">
          {selectedTerritory ? (
            <Card>
              <CardHeader>
                <div className={`h-32 -mx-6 -mt-6 mb-4 rounded-t-lg bg-gradient-to-br ${getRegionColor(selectedTerritory.region)} flex items-center justify-center`}>
                  <div className="text-center text-white">
                    <h2 className="text-3xl font-bold">{selectedTerritory.name}</h2>
                    <p className="text-sm opacity-90 capitalize">{selectedTerritory.region} Region</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Badge variant="outline" className="capitalize">
                    {selectedTerritory.status}
                  </Badge>
                  {selectedTerritory.contested && (
                    <Badge variant="destructive">
                      <Swords className="w-3 h-3 mr-1" />
                      Under Siege
                    </Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Description */}
                <p className="text-muted-foreground">
                  {selectedTerritory.description}
                </p>

                {/* Control Info */}
                {selectedTerritory.controlling_guild_name && (
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Shield className="w-4 h-4 text-primary" />
                      <span className="font-semibold">Controlled Territory</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Under control of <span className="font-semibold">{selectedTerritory.controlling_guild_name}</span>
                    </p>
                  </div>
                )}

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <Users className="w-8 h-8 mx-auto mb-2 text-primary" />
                        <div className="text-2xl font-bold">{selectedTerritory.total_residents}</div>
                        <div className="text-sm text-muted-foreground">Total Residents</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {selectedTerritory.online_players} online
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-500" />
                        <div className="text-2xl font-bold">{selectedTerritory.local_karma.toFixed(0)}</div>
                        <div className="text-sm text-muted-foreground">Local Karma</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Prosperity & Conflict */}
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2 text-sm">
                      <span className="font-medium">Prosperity Level</span>
                      <span className="font-bold">{selectedTerritory.prosperity_level.toFixed(0)}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500 transition-all"
                        style={{ width: `${selectedTerritory.prosperity_level}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2 text-sm">
                      <span className="font-medium">Conflict Level</span>
                      <span className="font-bold">{selectedTerritory.conflict_level.toFixed(0)}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-red-500 transition-all"
                        style={{ width: `${selectedTerritory.conflict_level}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2 text-sm">
                      <span className="font-medium">Strategic Value</span>
                      <span className="font-bold">{selectedTerritory.strategic_value}/100</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-purple-500 transition-all"
                        style={{ width: `${selectedTerritory.strategic_value}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Active Events */}
                {selectedTerritory.active_events.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-3">Active Regional Events</h3>
                    <div className="space-y-2">
                      {selectedTerritory.active_events.map((event, idx) => (
                        <div key={idx} className="bg-primary/10 p-3 rounded-lg border border-primary/20">
                          <div className="font-medium">{event.name}</div>
                          <div className="text-sm text-muted-foreground capitalize">
                            {event.event_type}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <MapPin className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Select a territory to view details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
