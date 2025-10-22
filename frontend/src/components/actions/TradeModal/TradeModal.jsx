import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { useToast } from '../../../hooks/useToast';
import { actionsService } from '../../../services/actions/actionsService';



export const TradeModal: React.FC = ({ open, onClose, onSuccess }) => {
  const [targetId, setTargetId] = useState('');
  const [offerAmount, setOfferAmount] = useState('');
  const [requestAmount, setRequestAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleTrade = async () => {
    if (!targetId || !offerAmount || !requestAmount) {
      toast({ title, description, variant);
      return;
    }

    setLoading(true);
    try {
      const result = await actionsService.trade(targetId, {
        credits)
      }, {
        credits)
      });
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
    
      
        
          🤝 Trade Proposal
          
            Propose a trade with another player. Both parties must agree for the trade to complete.
          
        
        
           setTargetId(e.target.value)}
          />
           setOfferAmount(e.target.value)}
          />
           setRequestAmount(e.target.value)}
          />
          
            
              {loading ? 'Proposing...' : 'Propose Trade'}
            
            
              Cancel
            
          
        
      
    
  );
};
