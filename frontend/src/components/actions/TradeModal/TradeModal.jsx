import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { useToast } from '../../../hooks/useToast';
import { actionsService } from '../../../services/actions/actionsService';

export const TradeModal = ({ open, onClose, onSuccess }) => {
  const [targetId, setTargetId] = useState('');
  const [offer, setOffer] = useState('');
  const [request, setRequest] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleTrade = async () => {
    if (!targetId || !offer || !request) {
      toast({
        title,
        description,
        variant,
      });
      return;
    }

    setLoading(true);
    try {
      const result = await actionsService.trade(targetId, offer, request);
      toast({
        title,
        description,
        variant,
      });
      if (result.success && onSuccess) onSuccess();
      onClose();
    } catch (error) {
      toast({
        title,
        description,
        variant,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>🔄 Trade with Player</DialogTitle>
          <DialogDescription>
            Propose a trade with another player. Both parties must agree to the terms.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Target Player ID"
            value={targetId}
            onChange={(e) => setTargetId(e.target.value)}
          />
          <Input
            placeholder="What you offer"
            value={offer}
            onChange={(e) => setOffer(e.target.value)}
          />
          <Input
            placeholder="What you request"
            value={request}
            onChange={(e) => setRequest(e.target.value)}
          />
          <div className="flex gap-2">
            <Button onClick={handleTrade} disabled={loading}>
              {loading ? 'Sending...' 
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
