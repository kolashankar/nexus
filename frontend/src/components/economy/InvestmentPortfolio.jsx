import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { TrendingUp, DollarSign, PieChart, AlertTriangle } from 'lucide-react';
import { toast } from '../ui/sonner';





export const InvestmentPortfolio= () => {
  const [portfolio, setPortfolio] = useState(null);
  const [opportunities, setOpportunities] = useState([]);
  const [activeTab, setActiveTab] = useState('portfolio');

  useEffect(() => {
    fetchPortfolio();
    fetchOpportunities();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const response = await fetch('/api/investments/portfolio', {
        headers)}`
        }
      });
      const data = await response.json();
      setPortfolio(data);
    } catch (error) {
      console.error('Failed to fetch portfolio', error);
    }
  };

  const fetchOpportunities = async () => {
    try {
      const response = await fetch('/api/investments/opportunities', {
        headers)}`
        }
      });
      const data = await response.json();
      setOpportunities(data.opportunities || []);
    } catch (error) {
      console.error('Failed to fetch opportunities', error);
    }
  };

  const makeInvestment = async (investmentId, amount) => {
    try {
      const response = await fetch('/api/investments/invest', {
        method,
        headers,
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body, amount })
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Investment successful!', {
          description);
        fetchPortfolio();
      } else {
        toast.error('Investment failed', {
          description);
      }
    } catch (error) {
      toast.error('Investment failed');
    }
  };

  const getRiskColor = (risk) => {
    const colors: Record = {
      low,
      medium,
      high,
      very_high: 'bg-red-500'
    };
    return colors[risk] || 'bg-gray-500';
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat().format(value);
  };

  return (
    
      
        
          
            
            Investment Portfolio
          
          
            Grow your wealth through strategic investments
          
        
      

      {portfolio && (
        
          
            
              Total Invested
              {formatCurrency(portfolio.total_invested)}
            
          

          
            
              Current Value
              {formatCurrency(portfolio.current_value)}
            
          

          
            
              Profit/Loss
              = 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {portfolio.total_profit_loss >= 0 ? '+' : ''}{formatCurrency(portfolio.total_profit_loss)}
              
            
          

          
            
              ROI
              = 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {portfolio.roi_percentage >= 0 ? '+' : ''}{portfolio.roi_percentage.toFixed(2)}%
              
            
          
        
      )}

      
        
          My Investments
          Opportunities
        

        
          {portfolio && portfolio.investments.length > 0 ? (
            
              {portfolio.investments.map(investment => (
                
                  
                    
                      
                        {investment.name}
                        
                          {investment.risk_level} risk
                        
                      
                      
                    

                    
                      
                        Invested
                        {formatCurrency(investment.amount_invested)}
                      
                      
                        Current
                        {formatCurrency(investment.current_value)}
                      
                      
                        P/L
                        = 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {investment.profit_loss >= 0 ? '+' : ''}{formatCurrency(investment.profit_loss)}
                        
                      
                      
                        Return
                        = 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {investment.profit_loss_percentage >= 0 ? '+' : ''}{investment.profit_loss_percentage.toFixed(2)}%
                        
                      
                    

                    
                      Withdraw
                    
                  
                
              ))}
            
          ) : (
            
              
              
                No active investments
              
               setActiveTab('opportunities')}>
                Browse Opportunities
              
            
          )}
        

        
          
            {opportunities.map(opp => (
              
                
                  
                    
                      {opp.name}
                      
                        {opp.risk_level} risk
                      
                    
                    
                  

                  
                    {opp.description}
                  

                  
                    
                      Min. Investment)}
                    
                    
                      Expected Return, opp.min_investment)}
                  >
                    Invest
                  
                
              
            ))}
          
        
      
    
  );
};
