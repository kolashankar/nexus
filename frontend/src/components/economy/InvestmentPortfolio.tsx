import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { TrendingUp, DollarSign, PieChart, AlertTriangle } from 'lucide-react';
import { toast } from '../ui/sonner';

interface Investment {
  id: string;
  name: string;
  description: string;
  investment_type: string;
  risk_level: string;
  amount_invested: number;
  current_value: number;
  profit_loss: number;
  profit_loss_percentage: number;
  expected_return: number;
}

interface Portfolio {
  total_invested: number;
  current_value: number;
  total_profit_loss: number;
  roi_percentage: number;
  investments: Investment[];
}

export const InvestmentPortfolio: React.FC = () => {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('portfolio');

  useEffect(() => {
    fetchPortfolio();
    fetchOpportunities();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const response = await fetch('/api/investments/portfolio', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setPortfolio(data);
    } catch (error) {
      console.error('Failed to fetch portfolio:', error);
    }
  };

  const fetchOpportunities = async () => {
    try {
      const response = await fetch('/api/investments/opportunities', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setOpportunities(data.opportunities || []);
    } catch (error) {
      console.error('Failed to fetch opportunities:', error);
    }
  };

  const makeInvestment = async (investmentId: string, amount: number) => {
    try {
      const response = await fetch('/api/investments/invest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ investment_id: investmentId, amount })
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Investment successful!', {
          description: `Invested in ${data.investment_name}`
        });
        fetchPortfolio();
      } else {
        toast.error('Investment failed', {
          description: data.error
        });
      }
    } catch (error) {
      toast.error('Investment failed');
    }
  };

  const getRiskColor = (risk: string) => {
    const colors: Record<string, string> = {
      low: 'bg-green-500',
      medium: 'bg-yellow-500',
      high: 'bg-orange-500',
      very_high: 'bg-red-500'
    };
    return colors[risk] || 'bg-gray-500';
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat().format(value);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <PieChart className="h-8 w-8" />
            Investment Portfolio
          </h1>
          <p className="text-muted-foreground mt-1">
            Grow your wealth through strategic investments
          </p>
        </div>
      </div>

      {portfolio && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Invested</p>
              <p className="text-2xl font-bold">{formatCurrency(portfolio.total_invested)}</p>
            </div>
          </Card>

          <Card className="p-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Current Value</p>
              <p className="text-2xl font-bold">{formatCurrency(portfolio.current_value)}</p>
            </div>
          </Card>

          <Card className="p-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Profit/Loss</p>
              <p className={`text-2xl font-bold ${
                portfolio.total_profit_loss >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {portfolio.total_profit_loss >= 0 ? '+' : ''}{formatCurrency(portfolio.total_profit_loss)}
              </p>
            </div>
          </Card>

          <Card className="p-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">ROI</p>
              <p className={`text-2xl font-bold ${
                portfolio.roi_percentage >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {portfolio.roi_percentage >= 0 ? '+' : ''}{portfolio.roi_percentage.toFixed(2)}%
              </p>
            </div>
          </Card>
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="portfolio">My Investments</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
        </TabsList>

        <TabsContent value="portfolio" className="space-y-4">
          {portfolio && portfolio.investments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {portfolio.investments.map(investment => (
                <Card key={investment.id} className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold">{investment.name}</h3>
                        <Badge className={getRiskColor(investment.risk_level)}>
                          {investment.risk_level} risk
                        </Badge>
                      </div>
                      <TrendingUp className="h-5 w-5 text-muted-foreground" />
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Invested</p>
                        <p className="font-medium">{formatCurrency(investment.amount_invested)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Current</p>
                        <p className="font-medium">{formatCurrency(investment.current_value)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">P/L</p>
                        <p className={`font-medium ${
                          investment.profit_loss >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {investment.profit_loss >= 0 ? '+' : ''}{formatCurrency(investment.profit_loss)}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Return</p>
                        <p className={`font-medium ${
                          investment.profit_loss_percentage >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {investment.profit_loss_percentage >= 0 ? '+' : ''}{investment.profit_loss_percentage.toFixed(2)}%
                        </p>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full" size="sm">
                      Withdraw
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <PieChart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                No active investments
              </p>
              <Button className="mt-4" onClick={() => setActiveTab('opportunities')}>
                Browse Opportunities
              </Button>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="opportunities" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {opportunities.map(opp => (
              <Card key={opp.id} className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold">{opp.name}</h3>
                      <Badge className={getRiskColor(opp.risk_level)}>
                        {opp.risk_level} risk
                      </Badge>
                    </div>
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  </div>

                  <p className="text-sm text-muted-foreground">
                    {opp.description}
                  </p>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Min. Investment:</span>
                      <span className="font-medium">{formatCurrency(opp.min_investment)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Expected Return:</span>
                      <span className="font-medium text-green-600">+{opp.expected_return}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span className="font-medium">{opp.duration_days} days</span>
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    onClick={() => makeInvestment(opp.id, opp.min_investment)}
                  >
                    Invest
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
