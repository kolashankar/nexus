import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { ActionButton } from '../../components/actions/ActionButton/ActionButton';
import { ActionHistory } from '../../components/actions/ActionHistory/ActionHistory';
import { HackModal } from '../../components/actions/HackModal/HackModal';
import { HelpModal } from '../../components/actions/HelpModal/HelpModal';
import { StealModal } from '../../components/actions/StealModal/StealModal';
import { DonateModal } from '../../components/actions/DonateModal/DonateModal';
import { TradeModal } from '../../components/actions/TradeModal/TradeModal';

export const Actions: React.FC = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Game Actions</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Choose Your Action</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <ActionButton
              icon="🔐"
              label="Hack"
              description="Infiltrate systems"
              onClick={() => setActiveModal('hack')}
            />
            <ActionButton
              icon="🤝"
              label="Help"
              description="Assist others"
              onClick={() => setActiveModal('help')}
            />
            <ActionButton
              icon="💰"
              label="Steal"
              description="Take resources"
              onClick={() => setActiveModal('steal')}
              variant="destructive"
            />
            <ActionButton
              icon="💝"
              label="Donate"
              description="Give to others"
              onClick={() => setActiveModal('donate')}
            />
            <ActionButton
              icon="🤝"
              label="Trade"
              description="Exchange goods"
              onClick={() => setActiveModal('trade')}
              variant="outline"
            />
          </div>
        </CardContent>
      </Card>

      <ActionHistory />

      <HackModal
        open={activeModal === 'hack'}
        onClose={() => setActiveModal(null)}
      />
      <HelpModal
        open={activeModal === 'help'}
        onClose={() => setActiveModal(null)}
      />
      <StealModal
        open={activeModal === 'steal'}
        onClose={() => setActiveModal(null)}
      />
      <DonateModal
        open={activeModal === 'donate'}
        onClose={() => setActiveModal(null)}
      />
      <TradeModal
        open={activeModal === 'trade'}
        onClose={() => setActiveModal(null)}
      />
    </div>
  );
};
