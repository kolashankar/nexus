import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { SkillNode } from './SkillNode';
import { apiClient } from '../../../services/api/client';
import { SkillTree as SkillTreeType } from '../../../types/skillTrees';

interface SkillTreeProps {
  traitName: string;
}

export const SkillTree: React.FC<SkillTreeProps> = ({ traitName }) => {
  const [tree, setTree] = useState<SkillTreeType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTree();
  }, [traitName]);

  const loadTree = async () => {
    try {
      const response = await apiClient.get(`/api/player/skill-trees/${traitName}`);
      setTree(response.data);
    } catch (error) {
      console.error('Failed to load skill tree:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnlock = async (nodeId: number) => {
    try {
      await apiClient.post('/api/player/skill-trees/unlock', {
        trait_name: traitName,
        node_id: nodeId
      });
      await loadTree();
    } catch (error) {
      console.error('Failed to unlock node:', error);
    }
  };

  if (loading || !tree) {
    return <div>Loading skill tree...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="capitalize">
          {traitName} Skill Tree ({tree.total_points} points)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-4">
          {tree.nodes.map((node) => (
            <SkillNode
              key={node.node_id}
              node={node}
              onUnlock={() => handleUnlock(node.node_id)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
