import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import skillTreesService from '../../../services/skillTrees/skillTreesService';
import SkillNode from './SkillNode';
import { toast } from '../../ui/sonner';



const SkillTree = ({  traitName  }) => {
  const [skillTrees, setSkillTrees] = useState(null);
  const [selectedTrait, setSelectedTrait] = useState(traitName || '');
  const [selectedTree, setSelectedTree] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkillTrees();
  }, []);

  useEffect(() => {
    if (traitName) {
      setSelectedTrait(traitName);
      handleSelectTrait(traitName);
    }
  }, [traitName]);

  const fetchSkillTrees = async () => {
    try {
      const data = await skillTreesService.getSkillTrees();
      setSkillTrees(data);
    } catch (error) {
      console.error('Failed to fetch skill trees, error);
      toast.error('Failed to load skill trees');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectTrait = async (traitName) => {
    setSelectedTrait(traitName);
    if (skillTrees?.skill_trees[traitName]) {
      setSelectedTree(skillTrees.skill_trees[traitName]);
    }
  };

  const handleUnlockNode = async (nodeId) => {
    if (!selectedTrait) return;

    try {
      await skillTreesService.unlockNode({
        trait_name,
        node_id,
      });
      toast.success('Node unlocked!');
      fetchSkillTrees();
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to unlock node');
    }
  };

  const handleChooseBranch = async (branch) => {
    if (!selectedTrait) return;

    try {
      await skillTreesService.chooseBranch({
        trait_name,
        branch,
      });
      toast.success(`Branch ${branch} selected!`);
      fetchSkillTrees();
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to choose branch');
    }
  };

  if (loading) {
    return Loading skill trees...;
  }

  return (
    
      
        
          Skill Trees
          {skillTrees && (
            
              
                Available Points)}
        
        
          
            {/* Trait List */}
            
              Select Trait
              {skillTrees &&
                Object.keys(skillTrees.skill_trees).map((traitName) => {
                  const tree = skillTrees.skill_trees[traitName];
                  return (
                     handleSelectTrait(traitName)}
                    >
                      {traitName.replace('_', ' ')}
                      {tree.total_points_invested}
                    
                  );
                })}
            

            {/* Skill Tree Display */}
            
              {selectedTree ? (
                
                  
                    
                      {selectedTrait.replace('_', ' ')}
                    
                    
                      Points)}
                    
                  

                  

                  {/* Skill Nodes */}
                  
                    {selectedTree.nodes.map((node) => (
                       handleUnlockNode(node.node_id)}
                        canUnlock={skillTrees?.available_points! > 0} />
                    ))}
                  

                  {/* Branch Choice (at node 10) */}
                  {selectedTree.nodes[9]?.unlocked && !selectedTree.active_branch && (
                    
                      Choose Your Path
                      
                         handleChooseBranch('A')}>Branch A
                         handleChooseBranch('B')}>Branch B
                      
                    
                  )}
                
              ) : (
                
                  Select a trait to view its skill tree
                
              )}
            
          
        
      
    
  );
};

export default SkillTree;
