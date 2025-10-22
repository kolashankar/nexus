import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { useToast } from '../../../hooks/useToast';
import { actionsService } from '../../../services/actions/actionsService';

interface DonateModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const DonateModal: React.FC<DonateModalProps> = ({ open, onClose, onSuccess }) => {
  const [targetId, setTargetId] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleDonate = async () => {
    if (!targetId || !amount) {
      toast({ title: 'Error', description: 'Please fill all fields', variant: 'destructive' });
      return;
    }

    const donationAmount = parseInt(amount);
    if (isNaN(donationAmount) || donationAmount <= 0) {
      toast({ title: 'Error', description: 'Invalid amount', variant: 'destructive' });
      return;
    }

    setLoading(true);
    try {
      const result = await actionsService.donate(targetId, donationAmount);
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
          <DialogTitle>💝 Donate Credits</DialogTitle>
          <DialogDescription>
            Make a charitable donation to another player. This will significantly boost your karma.
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
            placeholder="Amount to donate"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <div className="flex gap-2">
            <Button onClick={handleDonate} disabled={loading} className="flex-1">
              {loading ? 'Donating...' : 'Donate'}
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
