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
  const [activeModal, setActiveModal] = useState(null);

  return (
    
      Game Actions
      
      
        
          Choose Your Action
        
        
          
             setActiveModal('hack')}
            />
             setActiveModal('help')}
            />
             setActiveModal('steal')}
              variant="destructive"
            />
             setActiveModal('donate')}
            />
             setActiveModal('trade')}
              variant="outline"
            />
          
        
      

      

       setActiveModal(null)}
      />
       setActiveModal(null)}
      />
       setActiveModal(null)}
      />
       setActiveModal(null)}
      />
       setActiveModal(null)}
      />
    
  );
};
