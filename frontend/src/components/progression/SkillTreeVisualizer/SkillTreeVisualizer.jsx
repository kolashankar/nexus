import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Lock, Check, Star, Zap } from 'lucide-react';





export const SkillTreeVisualizer: React.FC = ({
  traitName,
  nodes,
  currentLevel,
  onNodeUnlock
}) => {
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);

  const linearNodes = nodes.filter(n => n.branch === null && n.node_id  n.branch === 'A');
  const branchBNodes = nodes.filter(n => n.branch === 'B');
  const convergenceNodes = nodes.filter(n => n.branch === null && n.node_id > 15);

  const canUnlockNode = (node) => {
    return !node.unlocked && currentLevel >= node.level_required;
  };

  const getNodeIcon = (node) => {
    if (node.unlocked) return ;
    if (canUnlockNode(node)) return ;
    return ;
  };

  const getNodeColor = (node) => {
    if (node.unlocked) return 'bg-green-500';
    if (canUnlockNode(node)) return 'bg-yellow-500';
    return 'bg-gray-400';
  };

  return (
    
      
        
          {traitName.replace(/_/g, ' ').toUpperCase()} Skill Tree
          
            Level {currentLevel}
          
        
      
      
        
          {/* Linear Progression (Nodes 1-9) */}
          
            Foundation Path
            
              {linearNodes.map((node) => (
                 setHoveredNode(node.node_id)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                   canUnlockNode(node) && onNodeUnlock(node.node_id)}
                    disabled={!canUnlockNode(node) || node.unlocked}
                  >
                    
                      {getNodeIcon(node)}
                      Node {node.node_id}
                      Lv.{node.level_required}
                    
                  
                  
                  {hoveredNode === node.node_id && (
                    
                      Node {node.node_id}
                      Required Level)}
                    
                  )}
                
              ))}
            
          

          {/* Branching Point (Nodes 10-15) */}
          
            Specialization Path
             setSelectedBranch(v as 'A' | 'B')}>
              
                Path A
                Path B
              
              
              
                
                  {branchANodes.map((node) => (
                     setHoveredNode(node.node_id)}
                      onMouseLeave={() => setHoveredNode(null)}
                    >
                       canUnlockNode(node) && onNodeUnlock(node.node_id)}
                        disabled={!canUnlockNode(node) || node.unlocked}
                      >
                        
                          {getNodeIcon(node)}
                          Node {node.node_id}
                          Lv.{node.level_required}
                        
                      
                      
                      {hoveredNode === node.node_id && (
                        
                          Branch A - Node {node.node_id}
                          Required Level)}
                        
                      )}
                    
                  ))}
                
              
              
              
                
                  {branchBNodes.map((node) => (
                     setHoveredNode(node.node_id)}
                      onMouseLeave={() => setHoveredNode(null)}
                    >
                       canUnlockNode(node) && onNodeUnlock(node.node_id)}
                        disabled={!canUnlockNode(node) || node.unlocked}
                      >
                        
                          {getNodeIcon(node)}
                          Node {node.node_id}
                          Lv.{node.level_required}
                        
                      
                      
                      {hoveredNode === node.node_id && (
                        
                          Branch B - Node {node.node_id}
                          Required Level)}
                        
                      )}
                    
                  ))}
                
              
            
          

          {/* Convergence (Nodes 16-20) */}
          
            Mastery Path
            
              {convergenceNodes.map((node) => (
                 setHoveredNode(node.node_id)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                   canUnlockNode(node) && onNodeUnlock(node.node_id)}
                    disabled={!canUnlockNode(node) || node.unlocked}
                  >
                    
                      {node.node_id === 20 ?  : getNodeIcon(node)}
                      Node {node.node_id}
                      Lv.{node.level_required}
                      {node.node_id === 20 && MASTERY}
                    
                  
                  
                  {hoveredNode === node.node_id && (
                    
                      {node.node_id === 20 ? 'MASTERY' : 'Node'} {node.node_id}
                      Required Level)}
                    
                  )}
                
              ))}
            
          

          {/* Progress Bar */}
          
            
              Progress
              {nodes.filter(n => n.unlocked).length} / {nodes.length} Nodes
            
             n.unlocked).length / nodes.length) * 100} />
          
        
      
    
  );
};
