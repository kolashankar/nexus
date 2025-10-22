import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { useToast } from '../../../hooks/useToast';
import { actionsService } from '../../../services/actions/actionsService';

interface HelpModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ open, onClose, onSuccess }) => {
  const [targetId, setTargetId] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleHelp = async () => {
    if (!targetId) {
      toast({ title: 'Error', description: 'Please enter a target ID', variant: 'destructive' });
      return;
    }

    setLoading(true);
    try {
      const result = await actionsService.help(targetId);
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
          <DialogTitle>🤝 Help Player</DialogTitle>
          <DialogDescription>
            Provide assistance to another player. This will increase your karma and strengthen positive traits.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <Input
            placeholder="Enter target player ID"
            value={targetId}
            onChange={(e) => setTargetId(e.target.value)}
          />
          <div className="flex gap-2">
            <Button onClick={handleHelp} disabled={loading} className="flex-1">
              {loading ? 'Helping...' : 'Help Player'}
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
