import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import SuperpowersList from '../../components/player/SuperpowersList/SuperpowersList';
import SkillTree from '../../components/player/SkillTree/SkillTree';

export const Skills: React.FC = () => {
  const [selectedTrait, setSelectedTrait] = useState<string>('hacking');

  const traitCategories = {
    skills: ['hacking', 'negotiation', 'stealth', 'leadership', 'technical_knowledge'],
    virtues: ['empathy', 'integrity', 'discipline', 'creativity', 'resilience'],
    vices: ['greed', 'arrogance', 'deceit', 'cruelty', 'selfishness']
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Skills & Powers</h1>

      <Tabs defaultValue="superpowers">
        <TabsList>
          <TabsTrigger value="superpowers">Superpowers</TabsTrigger>
          <TabsTrigger value="skill-trees">Skill Trees</TabsTrigger>
        </TabsList>

        <TabsContent value="superpowers" className="mt-6">
          <SuperpowersList />
        </TabsContent>

        <TabsContent value="skill-trees" className="mt-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Select a Trait</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(traitCategories).map(([category, traits]) => (
                    <div key={category}>
                      <p className="text-sm font-semibold mb-2 capitalize">{category}</p>
                      <div className="flex flex-wrap gap-2">
                        {traits.map((trait) => (
                          <button
                            key={trait}
                            onClick={() => setSelectedTrait(trait)}
                            className={`px-3 py-1 rounded text-sm ${
                              selectedTrait === trait
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-700'
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

            {selectedTrait && <SkillTree traitName={selectedTrait} />}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
