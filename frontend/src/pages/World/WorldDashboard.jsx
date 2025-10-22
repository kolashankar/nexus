import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Globe, Zap, MapPin } from 'lucide-react';
import WorldEventsPanel from '../../components/world/WorldEventsPanel';
import RegionalEventsPanel from '../../components/world/RegionalEventsPanel';

const WorldDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('global');
  const [selectedTerritory, setSelectedTerritory] = useState(1);

  return (
    
      
        World Events
        
          Global and regional events affecting the game world
        
      

      
        
          
            
            Global Events
          
          
            
            Regional Events
          
        

        
          
        

        
          
            {/* Territory Selector */}
            
              
                Select Territory
                {[1, 2, 3, 4, 5].map((id) => (
                   setSelectedTerritory(id)}
                    className={`w-full p-3 rounded-lg border text-left transition-colors ${
                      selectedTerritory === id
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover))}
              
            

            {/* Regional Events Display */}
            
              
            
          
        
      
    
  );
};

export default WorldDashboard;
