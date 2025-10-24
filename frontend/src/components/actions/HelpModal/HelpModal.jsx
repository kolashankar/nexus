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

export const HelpModal = ({ open, onClose, onSuccess }) => {
  const [targetId, setTargetId] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleHelp = async () => {
    if (!targetId) {
      toast({
        title,
        description,
        variant,
      });
      return;
    }

    setLoading(true);
    try {
      const result = await actionsService.help(targetId);
      toast({
        title,
        description,
        variant,
      });
      if (onSuccess) onSuccess();
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
          <DialogTitle>🤝 Help Player</DialogTitle>
          <DialogDescription>
            Provide assistance to another player. This will increase your karma and strengthen
            positive traits.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Target Player ID"
            value={targetId}
            onChange={(e) => setTargetId(e.target.value)}
          />
          <div className="flex gap-2">
            <Button onClick={handleHelp} disabled={loading}>
              {loading ? 'Helping...' 
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
