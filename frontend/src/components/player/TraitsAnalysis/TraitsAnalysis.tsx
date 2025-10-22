/**
 * Traits Analysis Component - Advanced trait analytics.
 */

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { TrendingUp, TrendingDown, AlertCircle, Award, Target } from 'lucide-react';
import './TraitsAnalysis.css';

interface TraitAnalysisData {
  moral_alignment: {
    class: string;
    score: number;
  };
  balance: {
    balance_score: number;
    spread: number;
    specialization: number;
  };
  dominant_traits: Array<{ trait: string; value: number }>;
  weakest_traits: Array<{ trait: string; value: number }>;
  improvement_suggestions: Array<{
    trait: string;
    current_value: number;
    suggested_target: number;
    priority: string;
  }>;
  active_synergies: Array<{
    name: string;
    traits: string[];
    bonus: string;
  }>;
}

export const TraitsAnalysis: React.FC = () => {
  const [analysis, setAnalysis] = useState<TraitAnalysisData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load trait analysis
    // In real implementation: await playerService.getTraitAnalysis();
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading Analysis...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="loading-skeleton">Loading...</div>
        </CardContent>
      </Card>
    );
  }

  if (!analysis) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Traits Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No analysis data available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="traits-analysis">
      <Tabs defaultValue="overview" className="analysis-tabs">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="synergies">Synergies</TabsTrigger>
          <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="analysis-grid">
            {/* Moral Alignment */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Moral Alignment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="alignment-display">
                  <Badge variant="outline" className="alignment-badge">
                    {analysis.moral_alignment.class}
                  </Badge>
                  <span className="alignment-score">
                    Score: {analysis.moral_alignment.score}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Balance Score */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Trait Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={analysis.balance.balance_score} />
                <span className="balance-text">
                  {analysis.balance.balance_score.toFixed(1)}% balanced
                </span>
              </CardContent>
            </Card>

            {/* Dominant Traits */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Dominant Traits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="traits-list">
                  {analysis.dominant_traits.map((trait) => (
                    <div key={trait.trait} className="trait-item">
                      <span>{trait.trait}</span>
                      <Badge>{trait.value}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Weakest Traits */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <TrendingDown className="w-4 h-4" />
                  Weakest Traits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="traits-list">
                  {analysis.weakest_traits.map((trait) => (
                    <div key={trait.trait} className="trait-item">
                      <span>{trait.trait}</span>
                      <Badge variant="outline">{trait.value}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="synergies">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Active Synergies
              </CardTitle>
            </CardHeader>
            <CardContent>
              {analysis.active_synergies.length > 0 ? (
                <div className="synergies-list">
                  {analysis.active_synergies.map((synergy, idx) => (
                    <div key={idx} className="synergy-card">
                      <h4>{synergy.name}</h4>
                      <p className="synergy-traits">
                        {synergy.traits.join(' + ')}
                      </p>
                      <Badge variant="secondary">{synergy.bonus}</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <AlertCircle className="empty-icon" />
                  <p>No active synergies</p>
                  <p className="text-sm">Level up related traits to unlock synergies</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suggestions">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Improvement Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="suggestions-list">
                {analysis.improvement_suggestions.map((suggestion, idx) => (
                  <div key={idx} className="suggestion-card">
                    <div className="suggestion-header">
                      <span className="suggestion-trait">{suggestion.trait}</span>
                      <Badge variant={suggestion.priority === 'high' ? 'destructive' : 'secondary'}>
                        {suggestion.priority} priority
                      </Badge>
                    </div>
                    <div className="suggestion-progress">
                      <span>Current: {suggestion.current_value}</span>
                      <Progress value={(suggestion.current_value / suggestion.suggested_target) * 100} />
                      <span>Target: {suggestion.suggested_target}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
