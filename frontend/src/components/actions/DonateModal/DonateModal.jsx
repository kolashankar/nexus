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

export const DonateModal = ({ open, onClose, onSuccess }) => {
  const [targetId, setTargetId] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleDonate = async () => {
    if (!targetId || !amount) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    const donationAmount = parseInt(amount);
    if (isNaN(donationAmount) || donationAmount <= 0) {
      toast({
        title: 'Invalid Amount',
        description: 'Please enter a valid positive number',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const result = await actionsService.donate(targetId, donationAmount);
      toast({
        title: 'Donation Successful!',
        description: `You donated ${donationAmount} credits!`,
        variant: 'default',
      });
      if (result.success && onSuccess) onSuccess();
      onClose();
    } catch (error) {
      toast({
        title: 'Donation Failed',
        description: error.message || 'Failed to donate',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>💝 Donate Credits</DialogTitle>
          <DialogDescription>
            Make a charitable donation to another player. This will significantly boost your karma.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Target Player ID"
            value={targetId}
            onChange={(e) => setTargetId(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <div className="flex gap-2">
            <Button onClick={handleDonate} disabled={loading}>
              {loading ? 'Donating...' : 'Donate'}
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
