import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import SuperpowersList from '../../components/player/SuperpowersList/SuperpowersList';
import SkillTree from '../../components/player/SkillTree/SkillTree';

export const Skills: React.FC = () => {
  const [selectedTrait, setSelectedTrait] = useState('hacking');

  const traitCategories = {
    skills, 'negotiation', 'stealth', 'leadership', 'technical_knowledge'],
    virtues, 'integrity', 'discipline', 'creativity', 'resilience'],
    vices, 'arrogance', 'deceit', 'cruelty', 'selfishness']
  };

  return (
    
      Skills & Powers

      
        
          Superpowers
          Skill Trees
        

        
          
        

        
          
            
              
                Select a Trait
              
              
                
                  {Object.entries(traitCategories).map(([category, traits]) => (
                    
                      {category}
                      
                        {traits.map((trait) => (
                           setSelectedTrait(trait)}
                            className={`px-3 py-1 rounded text-sm ${
                              selectedTrait === trait
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-700'
                            }`}
                          >
                            {trait.replace('_', ' ')}
                          
                        ))}
                      
                    
                  ))}
                
              
            

            {selectedTrait && }
          
        
      
    
  );
};
