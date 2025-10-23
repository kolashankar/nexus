import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { ActionButton } from '../../components/actions/ActionButton/ActionButton';
import { ActionHistory } from '../../components/actions/ActionHistory/ActionHistory';
import { HackModal } from '../../components/actions/HackModal/HackModal';
import { HelpModal } from '../../components/actions/HelpModal/HelpModal';
import { StealModal } from '../../components/actions/StealModal/StealModal';
import { DonateModal } from '../../components/actions/DonateModal/DonateModal';
import { TradeModal } from '../../components/actions/TradeModal/TradeModal';

export const Actions = () => {
  const [activeModal, setActiveModal] = useState(null);

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Game Actions</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Choose Your Action</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ActionButton label="Hack" onClick={() => setActiveModal('hack')} />
            <ActionButton label="Help" onClick={() => setActiveModal('help')} />
            <ActionButton
              label="Steal"
              onClick={() => setActiveModal('steal')}
              variant="destructive"
            />
            <ActionButton label="Donate" onClick={() => setActiveModal('donate')} />
            <ActionButton
              label="Trade"
              onClick={() => setActiveModal('trade')}
              variant="outline"
            />
          </div>
        </CardContent>
      </Card>

      <ActionHistory />

      <HackModal isOpen={activeModal === 'hack'} onClose={() => setActiveModal(null)} />
      <HelpModal isOpen={activeModal === 'help'} onClose={() => setActiveModal(null)} />
      <StealModal isOpen={activeModal === 'steal'} onClose={() => setActiveModal(null)} />
      <DonateModal isOpen={activeModal === 'donate'} onClose={() => setActiveModal(null)} />
      <TradeModal isOpen={activeModal === 'trade'} onClose={() => setActiveModal(null)} />
    </div>
  );
};
