import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, Sparkles, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './EventNotification.css';



export const EventNotification = ({ 
  event,
  onClose,
  onViewDetails
 }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Auto-dismiss after 10 seconds
    const timer = setTimeout(() => {
      handleClose();
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShow(false);
    setTimeout(onClose, 300); // Wait for animation
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical';
      case 'high';
      case 'medium';
      case 'low';
      default;
    }
  };

  return (
    
      {show && (
        
          
            
              
                {/* Icon */}
                
                  {event.severity === 'critical' ? (
                    
                  ) 
                    
                  )}
                

                {/* Content */}
                
                  
                    {event.event_type}
                    {event.severity}
                  
                  {event.name}
                  
                    {event.description}
                  
                  
                  
                    
                      View Details
                    
                    
                      Dismiss
                    
                  
                

                {/* Close button */}
                
                  
                
              
            
          
        
      )}
    
  );
};
