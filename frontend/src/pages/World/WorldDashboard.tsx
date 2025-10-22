import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Globe, Zap, MapPin } from 'lucide-react';
import WorldEventsPanel from '../../components/world/WorldEventsPanel';
import RegionalEventsPanel from '../../components/world/RegionalEventsPanel';

const WorldDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('global');
  const [selectedTerritory, setSelectedTerritory] = useState<number | undefined>(1);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">World Events</h1>
        <p className="text-muted-foreground">
          Global and regional events affecting the game world
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="global" className="gap-2">
            <Globe className="h-4 w-4" />
            Global Events
          </TabsTrigger>
          <TabsTrigger value="regional" className="gap-2">
            <MapPin className="h-4 w-4" />
            Regional Events
          </TabsTrigger>
        </TabsList>

        <TabsContent value="global" className="mt-6">
          <WorldEventsPanel />
        </TabsContent>

        <TabsContent value="regional" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Territory Selector */}
            <div className="lg:col-span-1">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold mb-4">Select Territory</h3>
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
                    <p className="font-semibold">Territory {id}</p>
                    <p className="text-xs text-muted-foreground">View regional events</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Regional Events Display */}
            <div className="lg:col-span-2">
              <RegionalEventsPanel territoryId={selectedTerritory} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorldDashboard;
