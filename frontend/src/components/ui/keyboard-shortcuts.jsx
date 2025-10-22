import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './button';



const shortcuts: KeyboardShortcut[] = [
  { key, description, category,
  { key, description, category,
  { key, description, category,
  { key, description, category,
  { key, description, category,
  { key, description, category,
  { key, description, category,
  { key, description, category,
  { key, description, category,
  { key, description, category,
  { key, description, category,
];



export const KeyboardShortcutsModal = ({ 
  isOpen,
  onClose,
 }) => {
  if (!isOpen) return null;

  const groupedShortcuts = shortcuts.reduce((acc, shortcut) => {
    if (!acc[shortcut.category]) {
      acc[shortcut.category] = [];
    }
    acc[shortcut.category].push(shortcut);
    return acc;
  }, {});

  return (
    
       e.stopPropagation()}
      >
        
          Keyboard Shortcuts
          
            
          
        

        
          {Object.entries(groupedShortcuts).map(([category, items]) => (
            
              {category}
              
                {items.map((shortcut, index) => (
                  
                    {shortcut.key}
                    
                      {shortcut.description}
                    
                  
                ))}
              
            
          ))}
        
      

      {`
        .keyboard-shortcuts-overlay {
          position, 0, 0, 0.7);
          display);
        }

        .keyboard-shortcuts-modal {
          background, 23, 42, 0.95);
          border, 130, 246, 0.3);
          border-radius, 0, 0, 0.5);
        }

        .modal-header {
          display, 255, 255, 0.1);
        }

        .modal-header h2 {
          font-size);
        }

        .shortcut-category {
          margin-bottom, 255, 255, 0.1);
          border, 255, 255, 0.2);
          border-radius, monospace;
          font-size, 0, 0, 0.2);
        }

        .shortcut-description {
          flex, 255, 255, 0.8);
          font-size);
};

export const useKeyboardShortcuts = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event) => {
      // Ignore if user is typing in an input
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (event.key) {
        case '?':
          event.preventDefault();
          setIsOpen(true);
          break;
        case 'Escape':
          if (isOpen) {
            event.preventDefault();
            setIsOpen(false);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isOpen]);

  return {
    isOpen,
    open) => setIsOpen(true),
    close) => setIsOpen(false),
  };
};
