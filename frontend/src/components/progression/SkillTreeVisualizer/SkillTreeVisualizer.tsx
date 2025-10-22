import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Lock, Check, Star, Zap } from 'lucide-react';

interface SkillNode {
  node_id: number;
  level_required: number;
  bonus_type: string;
  bonus_value: any;
  branch: string | null;
  unlocked: boolean;
}

interface SkillTreeVisualizerProps {
  traitName: string;
  nodes: SkillNode[];
  currentLevel: number;
  onNodeUnlock: (nodeId: number) => void;
}

export const SkillTreeVisualizer: React.FC<SkillTreeVisualizerProps> = ({
  traitName,
  nodes,
  currentLevel,
  onNodeUnlock
}) => {
  const [selectedBranch, setSelectedBranch] = useState<'A' | 'B' | null>(null);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  const linearNodes = nodes.filter(n => n.branch === null && n.node_id < 10);
  const branchANodes = nodes.filter(n => n.branch === 'A');
  const branchBNodes = nodes.filter(n => n.branch === 'B');
  const convergenceNodes = nodes.filter(n => n.branch === null && n.node_id > 15);

  const canUnlockNode = (node: SkillNode) => {
    return !node.unlocked && currentLevel >= node.level_required;
  };

  const getNodeIcon = (node: SkillNode) => {
    if (node.unlocked) return <Check className="w-4 h-4" />;
    if (canUnlockNode(node)) return <Zap className="w-4 h-4" />;
    return <Lock className="w-4 h-4" />;
  };

  const getNodeColor = (node: SkillNode) => {
    if (node.unlocked) return 'bg-green-500';
    if (canUnlockNode(node)) return 'bg-yellow-500';
    return 'bg-gray-400';
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{traitName.replace(/_/g, ' ').toUpperCase()} Skill Tree</span>
          <Badge variant="outline">
            Level {currentLevel}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {/* Linear Progression (Nodes 1-9) */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Foundation Path</h3>
            <div className="grid grid-cols-3 gap-4">
              {linearNodes.map((node) => (
                <div
                  key={node.node_id}
                  className="relative"
                  onMouseEnter={() => setHoveredNode(node.node_id)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  <Button
                    variant="outline"
                    className={`w-full h-20 ${getNodeColor(node)} hover:scale-105 transition-transform`}
                    onClick={() => canUnlockNode(node) && onNodeUnlock(node.node_id)}
                    disabled={!canUnlockNode(node) || node.unlocked}
                  >
                    <div className="flex flex-col items-center">
                      {getNodeIcon(node)}
                      <span className="text-xs mt-1">Node {node.node_id}</span>
                      <span className="text-xs text-gray-500">Lv.{node.level_required}</span>
                    </div>
                  </Button>
                  
                  {hoveredNode === node.node_id && (
                    <div className="absolute z-10 bg-black text-white p-3 rounded shadow-lg top-full mt-2 w-64">
                      <p className="text-xs font-semibold mb-1">Node {node.node_id}</p>
                      <p className="text-xs mb-1">Required Level: {node.level_required}</p>
                      <p className="text-xs">Type: {node.bonus_type}</p>
                      <p className="text-xs mt-2">{JSON.stringify(node.bonus_value)}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Branching Point (Nodes 10-15) */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Specialization Path</h3>
            <Tabs value={selectedBranch || 'choose'} onValueChange={(v) => setSelectedBranch(v as 'A' | 'B')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="A">Path A</TabsTrigger>
                <TabsTrigger value="B">Path B</TabsTrigger>
              </TabsList>
              
              <TabsContent value="A" className="mt-4">
                <div className="grid grid-cols-2 gap-4">
                  {branchANodes.map((node) => (
                    <div
                      key={`A-${node.node_id}`}
                      className="relative"
                      onMouseEnter={() => setHoveredNode(node.node_id)}
                      onMouseLeave={() => setHoveredNode(null)}
                    >
                      <Button
                        variant="outline"
                        className={`w-full h-20 ${getNodeColor(node)} hover:scale-105 transition-transform`}
                        onClick={() => canUnlockNode(node) && onNodeUnlock(node.node_id)}
                        disabled={!canUnlockNode(node) || node.unlocked}
                      >
                        <div className="flex flex-col items-center">
                          {getNodeIcon(node)}
                          <span className="text-xs mt-1">Node {node.node_id}</span>
                          <span className="text-xs text-gray-500">Lv.{node.level_required}</span>
                        </div>
                      </Button>
                      
                      {hoveredNode === node.node_id && (
                        <div className="absolute z-10 bg-black text-white p-3 rounded shadow-lg top-full mt-2 w-64">
                          <p className="text-xs font-semibold mb-1">Branch A - Node {node.node_id}</p>
                          <p className="text-xs mb-1">Required Level: {node.level_required}</p>
                          <p className="text-xs">Type: {node.bonus_type}</p>
                          <p className="text-xs mt-2">{JSON.stringify(node.bonus_value)}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="B" className="mt-4">
                <div className="grid grid-cols-2 gap-4">
                  {branchBNodes.map((node) => (
                    <div
                      key={`B-${node.node_id}`}
                      className="relative"
                      onMouseEnter={() => setHoveredNode(node.node_id)}
                      onMouseLeave={() => setHoveredNode(null)}
                    >
                      <Button
                        variant="outline"
                        className={`w-full h-20 ${getNodeColor(node)} hover:scale-105 transition-transform`}
                        onClick={() => canUnlockNode(node) && onNodeUnlock(node.node_id)}
                        disabled={!canUnlockNode(node) || node.unlocked}
                      >
                        <div className="flex flex-col items-center">
                          {getNodeIcon(node)}
                          <span className="text-xs mt-1">Node {node.node_id}</span>
                          <span className="text-xs text-gray-500">Lv.{node.level_required}</span>
                        </div>
                      </Button>
                      
                      {hoveredNode === node.node_id && (
                        <div className="absolute z-10 bg-black text-white p-3 rounded shadow-lg top-full mt-2 w-64">
                          <p className="text-xs font-semibold mb-1">Branch B - Node {node.node_id}</p>
                          <p className="text-xs mb-1">Required Level: {node.level_required}</p>
                          <p className="text-xs">Type: {node.bonus_type}</p>
                          <p className="text-xs mt-2">{JSON.stringify(node.bonus_value)}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Convergence (Nodes 16-20) */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Mastery Path</h3>
            <div className="grid grid-cols-3 gap-4">
              {convergenceNodes.map((node) => (
                <div
                  key={node.node_id}
                  className="relative"
                  onMouseEnter={() => setHoveredNode(node.node_id)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  <Button
                    variant="outline"
                    className={`w-full h-20 ${getNodeColor(node)} hover:scale-105 transition-transform ${node.node_id === 20 ? 'border-4 border-yellow-400' : ''}`}
                    onClick={() => canUnlockNode(node) && onNodeUnlock(node.node_id)}
                    disabled={!canUnlockNode(node) || node.unlocked}
                  >
                    <div className="flex flex-col items-center">
                      {node.node_id === 20 ? <Star className="w-5 h-5" /> : getNodeIcon(node)}
                      <span className="text-xs mt-1">Node {node.node_id}</span>
                      <span className="text-xs text-gray-500">Lv.{node.level_required}</span>
                      {node.node_id === 20 && <span className="text-xs font-bold text-yellow-400">MASTERY</span>}
                    </div>
                  </Button>
                  
                  {hoveredNode === node.node_id && (
                    <div className="absolute z-10 bg-black text-white p-3 rounded shadow-lg top-full mt-2 w-64">
                      <p className="text-xs font-semibold mb-1">{node.node_id === 20 ? 'MASTERY' : 'Node'} {node.node_id}</p>
                      <p className="text-xs mb-1">Required Level: {node.level_required}</p>
                      <p className="text-xs">Type: {node.bonus_type}</p>
                      <p className="text-xs mt-2">{JSON.stringify(node.bonus_value)}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Progress</span>
              <span>{nodes.filter(n => n.unlocked).length} / {nodes.length} Nodes</span>
            </div>
            <Progress value={(nodes.filter(n => n.unlocked).length / nodes.length) * 100} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
