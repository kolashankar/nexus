import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Hammer, Package, Clock, TrendingUp } from 'lucide-react';
import { toast } from '../ui/sonner';

interface Recipe {
  id: string;
  name: string;
  description: string;
  category: string;
  level_required: number;
  crafting_time: number;
  xp_reward: number;
  materials_required: Array<{
    material_id: string;
    name: string;
    quantity: number;
    owned: number;
  }>;
  result_item: {
    name: string;
    type: string;
    rarity: string;
  };
  unlocked: boolean;
}

export const CraftingStation: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [crafting, setCrafting] = useState(false);
  const [craftingProgress, setCraftingProgress] = useState(0);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch('/api/crafting/recipes', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setRecipes(data.recipes || []);
    } catch (error) {
      console.error('Failed to fetch recipes:', error);
    }
  };

  const craftItem = async (recipeId: string, quantity: number = 1) => {
    setCrafting(true);
    setCraftingProgress(0);

    try {
      const response = await fetch('/api/crafting/craft', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ recipe_id: recipeId, quantity })
      });

      const data = await response.json();

      if (data.success) {
        // Simulate crafting progress
        const interval = setInterval(() => {
          setCraftingProgress(prev => {
            if (prev >= 100) {
              clearInterval(interval);
              toast.success(`Crafted ${data.item_name}!`, {
                description: `+${data.xp_gained} XP`
              });
              setCrafting(false);
              fetchRecipes(); // Refresh recipes
              return 100;
            }
            return prev + 10;
          });
        }, 100);
      } else {
        toast.error('Crafting failed', {
          description: data.error || 'Unknown error'
        });
        setCrafting(false);
      }
    } catch (error) {
      toast.error('Crafting failed');
      setCrafting(false);
    }
  };

  const canCraft = (recipe: Recipe) => {
    if (!recipe.unlocked) return false;
    return recipe.materials_required.every(
      mat => mat.owned >= mat.quantity
    );
  };

  const getRarityColor = (rarity: string) => {
    const colors: Record<string, string> = {
      common: 'bg-gray-500',
      uncommon: 'bg-green-500',
      rare: 'bg-blue-500',
      epic: 'bg-purple-500',
      legendary: 'bg-yellow-500'
    };
    return colors[rarity] || 'bg-gray-500';
  };

  const filteredRecipes = recipes.filter(recipe => 
    activeCategory === 'all' || recipe.category === activeCategory
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Hammer className="h-8 w-8" />
            Crafting Station
          </h1>
          <p className="text-muted-foreground mt-1">
            Create items from materials
          </p>
        </div>
      </div>

      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="robot_parts">Robot Parts</TabsTrigger>
          <TabsTrigger value="electronics">Electronics</TabsTrigger>
          <TabsTrigger value="power">Power</TabsTrigger>
          <TabsTrigger value="augmentation">Augmentation</TabsTrigger>
        </TabsList>

        <TabsContent value={activeCategory} className="space-y-4">
          {crafting && (
            <Card className="p-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Crafting in progress...</span>
                  <span>{craftingProgress}%</span>
                </div>
                <Progress value={craftingProgress} />
              </div>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRecipes.map(recipe => (
              <Card
                key={recipe.id}
                className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
                  !recipe.unlocked ? 'opacity-50' : ''
                } ${
                  selectedRecipe?.id === recipe.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedRecipe(recipe)}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg">{recipe.name}</h3>
                      <Badge className={getRarityColor(recipe.result_item.rarity)}>
                        {recipe.result_item.rarity}
                      </Badge>
                    </div>
                    <Package className="h-6 w-6 text-muted-foreground" />
                  </div>

                  <p className="text-sm text-muted-foreground">
                    {recipe.description}
                  </p>

                  <div className="space-y-2">
                    <div className="text-xs font-medium">Materials Required:</div>
                    {recipe.materials_required.map(mat => (
                      <div
                        key={mat.material_id}
                        className="flex items-center justify-between text-sm"
                      >
                        <span>{mat.name}</span>
                        <span className={
                          mat.owned >= mat.quantity
                            ? 'text-green-600'
                            : 'text-red-600'
                        }>
                          {mat.owned}/{mat.quantity}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {recipe.crafting_time}s
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4" />
                      +{recipe.xp_reward} XP
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    disabled={!canCraft(recipe) || crafting}
                    onClick={(e) => {
                      e.stopPropagation();
                      craftItem(recipe.id);
                    }}
                  >
                    {recipe.unlocked ? 'Craft' : `Unlock at Lv.${recipe.level_required}`}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
