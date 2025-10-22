import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TraitItem from './TraitItem';
import { usePlayer } from '@/hooks/usePlayer';

const TraitsList: React.FC = () => {
  const { player } = usePlayer();
  const [filter, setFilter] = useState<string>('all');

  if (!player) return null;

  const traits = player.traits || {};
  const metaTraits = player.meta_traits || {};

  // Categorize traits
  const virtues = [
    'empathy', 'integrity', 'discipline', 'creativity', 'resilience',
    'curiosity', 'kindness', 'courage', 'patience', 'adaptability',
    'wisdom', 'humility', 'vision', 'honesty', 'loyalty',
    'generosity', 'self_awareness', 'gratitude', 'optimism', 'loveability'
  ];

  const vices = [
    'greed', 'arrogance', 'deceit', 'cruelty', 'selfishness',
    'envy', 'wrath', 'cowardice', 'laziness', 'gluttony',
    'paranoia', 'impulsiveness', 'vengefulness', 'manipulation', 'prejudice',
    'betrayal', 'stubbornness', 'pessimism', 'recklessness', 'vanity'
  ];

  const skills = [
    'hacking', 'negotiation', 'stealth', 'leadership', 'technical_knowledge',
    'physical_strength', 'speed', 'intelligence', 'charisma', 'perception',
    'endurance', 'dexterity', 'memory', 'focus', 'networking',
    'strategy', 'trading', 'engineering', 'medicine', 'meditation'
  ];

  const getTraitsByCategory = (category: string) => {
    switch (category) {
      case 'virtues':
        return virtues.map(name => ({ name, value: traits[name] || 50 }));
      case 'vices':
        return vices.map(name => ({ name, value: traits[name] || 50 }));
      case 'skills':
        return skills.map(name => ({ name, value: traits[name] || 50 }));
      case 'meta':
        return Object.entries(metaTraits).map(([name, value]) => ({ name, value: value as number }));
      default:
        return Object.entries(traits).map(([name, value]) => ({ name, value: value as number }));
    }
  };

  const filterTraits = (traitsList: any[]) => {
    if (filter === 'top') {
      return [...traitsList].sort((a, b) => b.value - a.value).slice(0, 10);
    } else if (filter === 'bottom') {
      return [...traitsList].sort((a, b) => a.value - b.value).slice(0, 10);
    }
    return traitsList;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Character Traits</CardTitle>
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('top')}
            className={`px-3 py-1 rounded ${filter === 'top' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
          >
            Top 10
          </button>
          <button
            onClick={() => setFilter('bottom')}
            className={`px-3 py-1 rounded ${filter === 'bottom' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
          >
            Bottom 10
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="virtues" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="virtues">Virtues (20)</TabsTrigger>
            <TabsTrigger value="vices">Vices (20)</TabsTrigger>
            <TabsTrigger value="skills">Skills (20)</TabsTrigger>
            <TabsTrigger value="meta">Meta (20)</TabsTrigger>
          </TabsList>
          
          <TabsContent value="virtues" className="space-y-2 mt-4">
            {filterTraits(getTraitsByCategory('virtues')).map((trait) => (
              <TraitItem key={trait.name} name={trait.name} value={trait.value} category="virtue" />
            ))}
          </TabsContent>
          
          <TabsContent value="vices" className="space-y-2 mt-4">
            {filterTraits(getTraitsByCategory('vices')).map((trait) => (
              <TraitItem key={trait.name} name={trait.name} value={trait.value} category="vice" />
            ))}
          </TabsContent>
          
          <TabsContent value="skills" className="space-y-2 mt-4">
            {filterTraits(getTraitsByCategory('skills')).map((trait) => (
              <TraitItem key={trait.name} name={trait.name} value={trait.value} category="skill" />
            ))}
          </TabsContent>
          
          <TabsContent value="meta" className="space-y-2 mt-4">
            {filterTraits(getTraitsByCategory('meta')).map((trait) => (
              <TraitItem key={trait.name} name={trait.name} value={trait.value} category="meta" />
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TraitsList;