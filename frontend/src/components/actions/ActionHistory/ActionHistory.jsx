import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { actionsService } from '../../../services/actions/actionsService';



export const ActionHistory = () => {
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const history = await actionsService.getHistory();
      setActions(history);
    } catch (error) {
      console.error('Failed to load action history', error);
    } finally {
      setLoading(false);
    }
  };

  const getActionIcon = (type) => {
    const icons = {
      hack,
      help,
      steal,
      donate,
      trade
    };
    return icons[type] || '⚡';
  };

  const getActionColor = (type) => {
    const colors = {
      hack,
      help,
      steal,
      donate,
      trade) {
    return <div>Loading history...</div>;
  }

  return (
    
      
        Recent Actions
      
      
        
          {actions.length === 0 ? (
            No actions yet
          ) 
            actions.map((action) => (
              
                
                  {getActionIcon(action.action_type)}
                  
                    {action.action_type}
                    
                      {new Date(action.timestamp).toLocaleString()}
                    
                  
                
                
                  
                    {action.karma_changes?.actor_karma > 0 ? '+' 
                    {action.karma_changes?.actor_karma || 0} Karma
                  
                
              
            ))
          )}
        
      
    
  );
};
