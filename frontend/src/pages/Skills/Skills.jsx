import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import SuperpowersList from '../../components/player/SuperpowersList/SuperpowersList';
import SkillTree from '../../components/player/SkillTree/SkillTree';

export const Skills = () => {
  const [selectedTrait, setSelectedTrait] = useState('hacking');

  const traitCategories = {
    skills, 'negotiation', 'stealth', 'leadership', 'technical_knowledge'],
    virtues, 'integrity', 'discipline', 'creativity', 'resilience'],
    vices, 'arrogance', 'deceit', 'cruelty', 'selfishness'],
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Skills & Powers</h1>

      <Tabs defaultValue="superpowers">
        <TabsList>
          <TabsTrigger value="superpowers">Superpowers</TabsTrigger>
          <TabsTrigger value="skilltrees">Skill Trees</TabsTrigger>
        </TabsList>

        <TabsContent value="superpowers">
          <SuperpowersList />
        </TabsContent>

        <TabsContent value="skilltrees">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Select a Trait</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(traitCategories).map(([category, traits]) => (
                    <div key={category}>
                      <h3 className="font-semibold mb-2 capitalize">{category}</h3>
                      <div className="flex flex-wrap gap-2">
                        {traits.map((trait) => (
                          <button
                            key={trait}
                            onClick={() => setSelectedTrait(trait)}
                            className={`px-3 py-1 rounded text-sm ${
                              selectedTrait === trait
                                ? 'bg-blue-500 text-white'
                                
                            }`}
                          >
                            {trait.replace('_', ' ')}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {selectedTrait && <SkillTree trait={selectedTrait} />}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
