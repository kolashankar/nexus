import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Globe, Zap, MapPin } from 'lucide-react';
import WorldEventsPanel from '../../components/world/WorldEventsPanel';
import RegionalEventsPanel from '../../components/world/RegionalEventsPanel';

const WorldDashboard = () => {
  const [activeTab, setActiveTab] = useState('global');
  const [selectedTerritory, setSelectedTerritory] = useState(1);

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">World Events</h1>
        <p className="text-muted-foreground">
          Global and regional events affecting the game world
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="global">
            <Globe className="mr-2" />
            Global Events
          </TabsTrigger>
          <TabsTrigger value="regional">
            <MapPin className="mr-2" />
            Regional Events
          </TabsTrigger>
        </TabsList>

        <TabsContent value="global">
          <WorldEventsPanel />
        </TabsContent>

        <TabsContent value="regional">
          <div className="grid md:grid-cols-[300px_1fr] gap-6">
            {/* Territory Selector */}
            <div>
              <h3 className="font-semibold mb-3">Select Territory</h3>
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((id) => (
                  <button
                    key={id}
                    onClick={() => setSelectedTerritory(id)}
                    className={`w-full p-3 rounded-lg border text-left transition-colors ${
                      selectedTerritory === id
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    Territory {id}
                  </button>
                ))}
              </div>
            </div>

            {/* Regional Events Display */}
            <div>
              <RegionalEventsPanel territoryId={selectedTerritory} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorldDashboard;
