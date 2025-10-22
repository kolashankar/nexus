import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { useToast } from '../../../hooks/useToast';
import { actionsService } from '../../../services/actions/actionsService';



export const StealModal = ({  open, onClose, onSuccess  }) => {
  const [targetId, setTargetId] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSteal = async () => {
    if (!targetId) {
      toast({ title, description, variant);
      return;
    }

    setLoading(true);
    try {
      const result = await actionsService.steal(targetId);
      toast({
        title,
        description,
        variant);
      if (result.success && onSuccess) onSuccess();
      onClose();
    } catch (error) {
      toast({ title, description, variant);
    } finally {
      setLoading(false);
    }
  };

  return (
    
      
        
          💰 Steal from Player
          
            Attempt to steal credits from another player. Risky! Success depends on your stealth vs their perception.
          
        
        
           setTargetId(e.target.value)} />
          
            
              {loading ? 'Stealing...' : 'Attempt Steal'}
            
            
              Cancel
            
          
        
      
    
  );
};
