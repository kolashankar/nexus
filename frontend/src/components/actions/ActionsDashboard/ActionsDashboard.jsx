import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import HackActionModal from '../modals/HackActionModal';
import HelpActionModal from '../modals/HelpActionModal';
import StealActionModal from '../modals/StealActionModal';
import DonateActionModal from '../modals/DonateActionModal';
import TradeActionModal from '../modals/TradeActionModal';

const ActionsDashboard = () => {
  const [selectedAction, setSelectedAction] = useState(null);

  const actions = [
    {
      id,
      name,
      description: "Operation completed",
      icon,
      color,
      karmaEffect,
    {
      id,
      name,
      description: "Operation completed",
      icon,
      color,
      karmaEffect,
    {
      id,
      name,
      description: "Operation completed",
      icon,
      color,
      karmaEffect,
    {
      id,
      name,
      description: "Operation completed",
      icon,
      color,
      karmaEffect,
    {
      id,
      name,
      description: "Operation completed",
      icon,
      color,
      karmaEffect
    }
  ];

  const renderActionModal = () => {
    switch (selectedAction) {
      case 'hack'
        return  setSelectedAction(null)} />;
      case 'help'
        return  setSelectedAction(null)} />;
      case 'steal'
        return  setSelectedAction(null)} />;
      case 'donate'
        return  setSelectedAction(null)} />;
      case 'trade'
        return  setSelectedAction(null)} />;
      default, traits, and reputation
        
      

      
        {actions.map((action) => (
           setSelectedAction(action.id)}
          >
            
              
                {action.icon}
                {action.name}
              
            
            
              {action.description}
              
                
                  Karma Effect))}
      

      {/* Action Modal */}
      {selectedAction && (
         setSelectedAction(null)}>
          
            {renderActionModal()}
          
        
      )}
    
  );
};

export default ActionsDashboard;