import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import KarmaScore from './KarmaScore';
import KarmaHistory from './KarmaHistory';
import apiClient from '@/services/api/client';

const KarmaDisplay = () => {
  const [karmaData, setKarmaData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchKarmaData();
  }, []);

  const fetchKarmaData = async () => {
    try {
      const response = await apiClient.get('/api/karma/score');
      setKarmaData(response.data);
    } catch (error) {
      console.error('Failed to fetch karma data', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      
        
          
            
            
          
        
      
    );
  }

  return (
    
      
      
    
  );
};

export default KarmaDisplay;