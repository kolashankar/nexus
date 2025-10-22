import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { useToast } from '../../../hooks/useToast';
import { actionsService } from '../../../services/actions/actionsService';

interface HackModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const HackModal: React.FC<HackModalProps> = ({ open, onClose, onSuccess }) => {
  const [targetId, setTargetId] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleHack = async () => {
    if (!targetId) {
      toast({ title: 'Error', description: 'Please enter a target ID', variant: 'destructive' });
      return;
    }

    setLoading(true);
    try {
      const result = await actionsService.hack(targetId);
      toast({
        title: result.success ? 'Success!' : 'Failed',
        description: result.message,
        variant: result.success ? 'default' : 'destructive'
      });
      if (result.success && onSuccess) {
        onSuccess();
      }
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
          <DialogTitle>🔐 Hack Player</DialogTitle>
          <DialogDescription>
            Attempt to hack another player's systems. Success depends on your hacking skill vs their technical knowledge.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <Input
            placeholder="Enter target player ID"
            value={targetId}
            onChange={(e) => setTargetId(e.target.value)}
          />
          <div className="flex gap-2">
            <Button onClick={handleHack} disabled={loading} className="flex-1">
              {loading ? 'Hacking...' : 'Execute Hack'}
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
