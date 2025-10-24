import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TraitItem from './TraitItem';
import { usePlayer } from '@/hooks/usePlayer';

const TraitsList= () => {
  const { player } = usePlayer();
  const [filter, setFilter] = useState('all');

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

  const getTraitsByCategory = (category) => {
    switch (category) {
      case 'virtues':
        return virtues.map(name => ({ name, value));
      case 'vices':
        return vices.map(name => ({ name, value));
      case 'skills':
        return skills.map(name => ({ name, value));
      case 'meta':
        return Object.entries(metaTraits).map(([name, value]) => ({ name, value));
      default).map(([name, value]) => ({ name, value));
    }
  };

  const filterTraits = (traitsList) => {
    if (filter === 'top') {
      return [...traitsList].sort((a, b) => b.value - a.value).slice(0, 10);
    } else if (filter === 'bottom') {
      return [...traitsList].sort((a, b) => a.value - b.value).slice(0, 10);
    }
    return traitsList;
  };

  return (
    
      
        Character Traits
        
           setFilter('all')}
            className={`px-3 py-1 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            All
          
           setFilter('top')}
            className={`px-3 py-1 rounded ${filter === 'top' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
          >
            Top 10
          
           setFilter('bottom')}
            className={`px-3 py-1 rounded ${filter === 'bottom' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
          >
            Bottom 10
          
        
      
      
        
          
            Virtues (20)
            Vices (20)
            Skills (20)
            Meta (20)
          
          
          
            {filterTraits(getTraitsByCategory('virtues')).map((trait) => (
              
            ))}
          
          
          
            {filterTraits(getTraitsByCategory('vices')).map((trait) => (
              
            ))}
          
          
          
            {filterTraits(getTraitsByCategory('skills')).map((trait) => (
              
            ))}
          
          
          
            {filterTraits(getTraitsByCategory('meta')).map((trait) => (
              
            ))}
          
        
      
    
  );
};

export default TraitsList;