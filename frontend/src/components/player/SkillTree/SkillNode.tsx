import React from 'react';
import { Button } from '../../ui/button';
import { Lock, Unlock, Star } from 'lucide-react';
import type { SkillNode as SkillNodeType } from '../../../types/skillTrees';

interface SkillNodeProps {
  node: SkillNodeType;
  onUnlock: () => void;
  canUnlock: boolean;
}

const SkillNode: React.FC<SkillNodeProps> = ({ node, onUnlock, canUnlock }) => {
  const isUnlocked = node.unlocked;
  const isMilestone = node.node_id % 5 === 0;

  return (
    <div className="relative">
      <Button
        variant={isUnlocked ? 'default' : 'outline'}
        size="lg"
        className={`w-full h-24 flex flex-col items-center justify-center gap-2 ${
          isMilestone ? 'border-2 border-yellow-500' : ''
        }`}
        onClick={onUnlock}
        disabled={isUnlocked || !canUnlock}
      >
        {isUnlocked ? (
          <Unlock className="h-6 w-6" />
        ) : (
          <Lock className="h-6 w-6 text-muted-foreground" />
        )}
        <span className="text-sm font-semibold">Node {node.node_id}</span>
        {isMilestone && <Star className="h-4 w-4 text-yellow-500 absolute top-1 right-1" />}
        {node.level > 0 && (
          <span className="text-xs text-muted-foreground">Lvl {node.level}</span>
        )}
      </Button>
    </div>
  );
};

export default SkillNode;
