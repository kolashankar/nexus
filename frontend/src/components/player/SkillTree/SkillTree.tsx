import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import skillTreesService from '../../../services/skillTrees/skillTreesService';
import type { PlayerSkillTrees, SkillTree as SkillTreeType } from '../../../types/skillTrees';
import SkillNode from './SkillNode';
import { toast } from '../../ui/sonner';

const SkillTree: React.FC = () => {
  const [skillTrees, setSkillTrees] = useState<PlayerSkillTrees | null>(null);
  const [selectedTrait, setSelectedTrait] = useState<string>('');
  const [selectedTree, setSelectedTree] = useState<SkillTreeType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkillTrees();
  }, []);

  const fetchSkillTrees = async () => {
    try {
      const data = await skillTreesService.getSkillTrees();
      setSkillTrees(data);
    } catch (error) {
      console.error('Failed to fetch skill trees:', error);
      toast.error('Failed to load skill trees');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectTrait = async (traitName: string) => {
    setSelectedTrait(traitName);
    if (skillTrees?.skill_trees[traitName]) {
      setSelectedTree(skillTrees.skill_trees[traitName]);
    }
  };

  const handleUnlockNode = async (nodeId: number) => {
    if (!selectedTrait) return;

    try {
      await skillTreesService.unlockNode({
        trait_name: selectedTrait,
        node_id: nodeId,
      });
      toast.success('Node unlocked!');
      fetchSkillTrees();
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Failed to unlock node');
    }
  };

  const handleChooseBranch = async (branch: 'A' | 'B') => {
    if (!selectedTrait) return;

    try {
      await skillTreesService.chooseBranch({
        trait_name: selectedTrait,
        branch,
      });
      toast.success(`Branch ${branch} selected!`);
      fetchSkillTrees();
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Failed to choose branch');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading skill trees...</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Skill Trees</CardTitle>
          {skillTrees && (
            <div className="flex gap-4 mt-4">
              <Badge variant="secondary">
                Available Points: {skillTrees.available_points}
              </Badge>
              <Badge variant="outline">
                Total Invested: {skillTrees.total_points_spent}
              </Badge>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Trait List */}
            <div className="lg:col-span-1 space-y-2 max-h-[600px] overflow-y-auto">
              <h3 className="font-semibold mb-3">Select Trait</h3>
              {skillTrees &&
                Object.keys(skillTrees.skill_trees).map((traitName) => {
                  const tree = skillTrees.skill_trees[traitName];
                  return (
                    <Button
                      key={traitName}
                      variant={selectedTrait === traitName ? 'default' : 'outline'}
                      className="w-full justify-between"
                      onClick={() => handleSelectTrait(traitName)}
                    >
                      <span className="capitalize">{traitName.replace('_', ' ')}</span>
                      <Badge variant="secondary">{tree.total_points_invested}</Badge>
                    </Button>
                  );
                })}
            </div>

            {/* Skill Tree Display */}
            <div className="lg:col-span-3">
              {selectedTree ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold capitalize">
                      {selectedTrait.replace('_', ' ')}
                    </h2>
                    <div className="space-x-2">
                      <Badge>Points: {selectedTree.total_points_invested}/20</Badge>
                      {selectedTree.active_branch && (
                        <Badge variant="outline">Branch: {selectedTree.active_branch}</Badge>
                      )}
                    </div>
                  </div>

                  <Progress
                    value={(selectedTree.total_points_invested / 20) * 100}
                    className="h-2"
                  />

                  {/* Skill Nodes */}
                  <div className="grid grid-cols-4 gap-4 mt-6">
                    {selectedTree.nodes.map((node) => (
                      <SkillNode
                        key={node.node_id}
                        node={node}
                        onUnlock={() => handleUnlockNode(node.node_id)}
                        canUnlock={skillTrees?.available_points! > 0}
                      />
                    ))}
                  </div>

                  {/* Branch Choice (at node 10) */}
                  {selectedTree.nodes[9]?.unlocked && !selectedTree.active_branch && (
                    <Card className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20">
                      <h3 className="font-semibold mb-3">Choose Your Path</h3>
                      <div className="flex gap-4">
                        <Button onClick={() => handleChooseBranch('A')}>Branch A</Button>
                        <Button onClick={() => handleChooseBranch('B')}>Branch B</Button>
                      </div>
                    </Card>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center h-64 text-muted-foreground">
                  Select a trait to view its skill tree
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SkillTree;
