import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { useToast } from '../../../hooks/useToast';
import { actionsService } from '../../../services/actions/actionsService';

export const StealModal = ({ open, onClose, onSuccess }) => {
  const [targetId, setTargetId] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSteal = async () => {
    if (!targetId) {
      toast({
        title: 'Error',
        description: 'Please enter a target player ID',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const result = await actionsService.steal(targetId);
      toast({
        title: 'Steal Successful!',
        description: `You stole from the player!`,
        variant: 'default',
      });
      if (result.success && onSuccess) onSuccess();
      onClose();
    } catch (error) {
      toast({
        title: 'Steal Failed',
        description: error.message || 'Failed to steal from player',
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
          <DialogTitle>💰 Steal from Player</DialogTitle>
          <DialogDescription>
            Attempt to steal credits from another player. Risky! Success depends on your stealth vs their
            perception.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Input placeholder="Target Player ID" value={targetId} onChange={(e) => setTargetId(e.target.value)} />
          <div className="flex gap-2">
            <Button onClick={handleSteal} disabled={loading} variant="destructive">
              {loading ? 'Stealing...' : 'Steal'}
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
