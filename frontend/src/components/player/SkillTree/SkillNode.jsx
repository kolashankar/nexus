import React from 'react';
import { Button } from '../../ui/button';
import { Lock, Unlock, Star } from 'lucide-react';



const SkillNode = ({  node, onUnlock, canUnlock  }) => {
  const isUnlocked = node.unlocked;
  const isMilestone = node.node_id % 5 === 0;

  return (
    
      
        {isUnlocked ? (
          
        ) : (
          
        )}
        Node {node.node_id}
        {isMilestone && }
        {node.level > 0 && (
          Lvl {node.level}
        )}
      
    
  );
};

export default SkillNode;
