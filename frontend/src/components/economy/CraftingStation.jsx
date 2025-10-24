import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Hammer, Package, Clock, TrendingUp } from 'lucide-react';
import { toast } from '../ui/sonner';

  result_item
    name;
    type;
    rarity;
  };
  unlocked;
}

export const CraftingStation = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [crafting, setCrafting] = useState(false);
  const [craftingProgress, setCraftingProgress] = useState(0);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch('/api/crafting/recipes', {
        headers)}`
        }
      });
      const data = await response.json();
      setRecipes(data.recipes || []);
    } catch (error) {
      console.error('Failed to fetch recipes', error);
    }
  };

  const craftItem = async (recipeId, quantity= 1) => {
    setCrafting(true);
    setCraftingProgress(0);

    try {
      const response = await fetch('/api/crafting/craft', {
        method,
        headers,
          'Authorization')}`
        },
        body, quantity })
      });

      const data = await response.json();

      if (data.success) {
        // Simulate crafting progress
        const interval = setInterval(() => {
          setCraftingProgress(prev => {
            if (prev >= 100) {
              clearInterval(interval);
              toast.success(`Crafted ${data.item_name}!`, {
                description);
              setCrafting(false);
              fetchRecipes(); // Refresh recipes
              return 100;
            }
            return prev + 10;
          });
        }, 100);
      } else {
        toast.error('Crafting failed', {
          description);
        setCrafting(false);
      }
    } catch (error) {
      toast.error('Crafting failed');
      setCrafting(false);
    }
  };

  const canCraft = (recipe) => {
    if (!recipe.unlocked) return false;
    return recipe.materials_required.every(
      mat => mat.owned >= mat.quantity
    );
  };

  const getRarityColor = (rarity) => {
    const colors = {
      common,
      uncommon,
      rare,
      epic,
      legendary
    };
    return colors[rarity] || 'bg-gray-500';
  };

  const filteredRecipes = recipes.filter(recipe => 
    activeCategory === 'all' || recipe.category === activeCategory
  );

  return (
    
      
        
          
            
            Crafting Station
          
          
            Create items from materials
          
        
      

      
        
          All
          Robot Parts
          Electronics
          Power
          Augmentation
        

        
          {crafting && (
            
              
                
                  Crafting in progress...
                  {craftingProgress}%
                
                
              
            
          )}

          
            {filteredRecipes.map(recipe => (
               setSelectedRecipe(recipe)}
              >
                
                  
                    
                      {recipe.name}
                      
                        {recipe.result_item.rarity}
                      
                    
                    
                  

                  
                    {recipe.description}
                  

                  
                    Materials Required
                    {recipe.materials_required.map(mat => (
                      
                        {mat.name}
                        = mat.quantity
                            ? 'text-green-600'
                            
                        }>
                          {mat.owned}/{mat.quantity}
                        
                      
                    ))}
                  

                  
                    
                      
                      {recipe.crafting_time}s
                    
                    
                      
                      +{recipe.xp_reward} XP
                    
                  

                   {
                      e.stopPropagation();
                      craftItem(recipe.id);
                    }}
                  >
                    {recipe.unlocked ? 'Craft' 
                  
                
              
            ))}
          
        
      
    
  );
};
