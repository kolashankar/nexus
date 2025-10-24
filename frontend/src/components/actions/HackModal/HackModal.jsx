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

export const HackModal = ({ open, onClose, onSuccess }) => {
  const [targetId, setTargetId] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleHack = async () => {
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
      const result = await actionsService.hack(targetId);
      toast({
        title: 'Hack Successful!',
        description: `You successfully hacked the player!`,
        variant: 'default',
      });
      if (result.success && onSuccess) {
        onSuccess();
      }
      onClose();
    } catch (error) {
      toast({
        title: 'Hack Failed',
        description: error.message || 'Failed to hack player',
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
          <DialogTitle>🔐 Hack Player</DialogTitle>
          <DialogDescription>
            Attempt to hack another player's systems. Success depends on your hacking skill vs their
            technical knowledge.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Target Player ID"
            value={targetId}
            onChange={(e) => setTargetId(e.target.value)}
          />
          <div className="flex gap-2">
            <Button onClick={handleHack} disabled={loading}>
              {loading ? 'Hacking...' : 'Hack'}
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
