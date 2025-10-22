import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { useToast } from '../../../hooks/useToast';
import { actionsService } from '../../../services/actions/actionsService';

interface StealModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const StealModal: React.FC<StealModalProps> = ({ open, onClose, onSuccess }) => {
  const [targetId, setTargetId] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSteal = async () => {
    if (!targetId) {
      toast({ title: 'Error', description: 'Please enter a target ID', variant: 'destructive' });
      return;
    }

    setLoading(true);
    try {
      const result = await actionsService.steal(targetId);
      toast({
        title: result.success ? 'Success!' : 'Caught!',
        description: result.message,
        variant: result.success ? 'default' : 'destructive'
      });
      if (result.success && onSuccess) onSuccess();
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
          <DialogTitle>💰 Steal from Player</DialogTitle>
          <DialogDescription>
            Attempt to steal credits from another player. Risky! Success depends on your stealth vs their perception.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <Input
            placeholder="Enter target player ID"
            value={targetId}
            onChange={(e) => setTargetId(e.target.value)}
          />
          <div className="flex gap-2">
            <Button onClick={handleSteal} disabled={loading} variant="destructive" className="flex-1">
              {loading ? 'Stealing...' : 'Attempt Steal'}
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
