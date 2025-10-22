import React from 'react';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { SkillNode as SkillNodeType } from '../../../types/skillTrees';

interface SkillNodeProps {
  node: SkillNodeType;
  onUnlock: () => void;
}

export const SkillNode: React.FC<SkillNodeProps> = ({ node, onUnlock }) => {
  return (
    <div
      className={`p-3 border rounded-lg ${
        node.unlocked ? 'bg-green-50 border-green-500' : 'bg-gray-50 border-gray-300'
      }`}
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Badge variant={node.unlocked ? 'default' : 'outline'}>
            Node {node.node_id}
          </Badge>
          {node.unlocked && <span className="text-green-500">✅</span>}
        </div>
        <p className="text-xs font-semibold">{node.name}</p>
        <p className="text-xs text-gray-600">{node.description}</p>
        {!node.unlocked && (
          <Button onClick={onUnlock} size="sm" className="w-full text-xs">
            Unlock
          </Button>
        )}
      </div>
    </div>
  );
};
