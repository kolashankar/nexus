import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { useToast } from '../../../hooks/useToast';
import { actionsService } from '../../../services/actions/actionsService';



export const HelpModal = ({  open, onClose, onSuccess  }) => {
  const [targetId, setTargetId] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleHelp = async () => {
    if (!targetId) {
      toast({ title, description, variant);
      return;
    }

    setLoading(true);
    try {
      const result = await actionsService.help(targetId);
      toast({
        title,
        description,
        variant);
      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      toast({ title, description, variant);
    } finally {
      setLoading(false);
    }
  };

  return (
    
      
        
          🤝 Help Player
          
            Provide assistance to another player. This will increase your karma and strengthen positive traits.
          
        
        
           setTargetId(e.target.value)} />
          
            
              {loading ? 'Helping...' : 'Help Player'}
            
            
              Cancel
            
          
        
      
    
  );
};
