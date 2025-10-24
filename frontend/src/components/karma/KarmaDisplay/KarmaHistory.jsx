import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import apiClient from '@/services/api/client';
import { formatDistance } from 'date-fns';

const KarmaHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await apiClient.get('/api/karma/history?limit=20');
      setHistory(response.data);
    } catch (error) {
      console.error('Failed to fetch karma history', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      
        
          
            {[1, 2, 3].map(i => (
              
            ))}
          
        
      
    );
  }

  return (
    
      
        Karma History
      
      
        
          
            {history.length === 0 ? (
              
                No karma history yet. Perform actions to start building your karma!
              
            ) 
              history.map((entry, index) => (
                
                  
                    
                       0 ? 'default' 
                        {entry.action_type.toUpperCase()}
                      
                      
                        {formatDistance(new Date(entry.timestamp), new Date(), { addSuffix)}
                      
                    
                    {entry.message}
                  
                  
                     0 ? 'text-green-600' 
                      }`}
                    >
                      {entry.karma_change > 0 ? '+' 
                    
                    karma
                  
                
              ))
            )}
          
        
      
    
  );
};

export default KarmaHistory;