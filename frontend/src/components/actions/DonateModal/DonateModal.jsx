import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { useToast } from '../../../hooks/useToast';
import { actionsService } from '../../../services/actions/actionsService';



export const DonateModal = ({  open, onClose, onSuccess  }) => {
  const [targetId, setTargetId] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleDonate = async () => {
    if (!targetId || !amount) {
      toast({ title, description, variant);
      return;
    }

    const donationAmount = parseInt(amount);
    if (isNaN(donationAmount) || donationAmount 
      
        
          💝 Donate Credits
          
            Make a charitable donation to another player. This will significantly boost your karma.
          
        
        
           setTargetId(e.target.value)} />
           setAmount(e.target.value)} />
          
            
              {loading ? 'Donating...' : 'Donate'}
            
            
              Cancel
            
          
        
      
    
  );
};
