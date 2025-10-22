import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { useToast } from '../../../hooks/useToast';
import { actionsService } from '../../../services/actions/actionsService';



export const HackModal: React.FC = ({ open, onClose, onSuccess }) => {
  const [targetId, setTargetId] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleHack = async () => {
    if (!targetId) {
      toast({ title, description, variant);
      return;
    }

    setLoading(true);
    try {
      const result = await actionsService.hack(targetId);
      toast({
        title,
        description,
        variant);
      if (result.success && onSuccess) {
        onSuccess();
      }
      onClose();
    } catch (error) {
      toast({ title, description, variant);
    } finally {
      setLoading(false);
    }
  };

  return (
    
      
        
          🔐 Hack Player
          
            Attempt to hack another player's systems. Success depends on your hacking skill vs their technical knowledge.
          
        
        
           setTargetId(e.target.value)}
          />
          
            
              {loading ? 'Hacking...' : 'Execute Hack'}
            
            
              Cancel
            
          
        
      
    
  );
};
