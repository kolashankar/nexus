import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { useToast } from '../../../hooks/useToast';
import { actionsService } from '../../../services/actions/actionsService';

interface TradeModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const TradeModal: React.FC<TradeModalProps> = ({ open, onClose, onSuccess }) => {
  const [targetId, setTargetId] = useState('');
  const [offerAmount, setOfferAmount] = useState('');
  const [requestAmount, setRequestAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleTrade = async () => {
    if (!targetId || !offerAmount || !requestAmount) {
      toast({ title: 'Error', description: 'Please fill all fields', variant: 'destructive' });
      return;
    }

    setLoading(true);
    try {
      const result = await actionsService.trade(targetId, {
        credits: parseInt(offerAmount)
      }, {
        credits: parseInt(requestAmount)
      });
      toast({
        title: 'Success!',
        description: result.message,
        variant: 'default'
      });
      if (onSuccess) onSuccess();
      onClose();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>🤝 Trade Proposal</DialogTitle>
          <DialogDescription>
            Propose a trade with another player. Both parties must agree for the trade to complete.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <Input
            placeholder="Enter target player ID"
            value={targetId}
            onChange={(e) => setTargetId(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Credits you offer"
            value={offerAmount}
            onChange={(e) => setOfferAmount(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Credits you request"
            value={requestAmount}
            onChange={(e) => setRequestAmount(e.target.value)}
          />
          <div className="flex gap-2">
            <Button onClick={handleTrade} disabled={loading} className="flex-1">
              {loading ? 'Proposing...' : 'Propose Trade'}
            </Button>
            <Button onClick={onClose} variant="outline">
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
