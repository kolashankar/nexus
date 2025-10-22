import React from 'react';
import { Dialog, DialogContent } from '../../ui/dialog';

interface ActionModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const ActionModal: React.FC<ActionModalProps> = ({ open, onClose, children }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
  );
};
