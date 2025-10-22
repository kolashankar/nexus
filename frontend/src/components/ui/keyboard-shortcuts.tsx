import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './button';

interface KeyboardShortcut {
  key: string;
  description: string;
  category: string;
}

const shortcuts: KeyboardShortcut[] = [
  { key: '?', description: 'Show keyboard shortcuts', category: 'General' },
  { key: 'h', description: 'Go to Home/Dashboard', category: 'Navigation' },
  { key: 'p', description: 'Go to Profile', category: 'Navigation' },
  { key: 'q', description: 'Go to Quests', category: 'Navigation' },
  { key: 'm', description: 'Go to Marketplace', category: 'Navigation' },
  { key: 'g', description: 'Go to Guilds', category: 'Navigation' },
  { key: 'c', description: 'Go to Combat', category: 'Navigation' },
  { key: 'l', description: 'Go to Leaderboards', category: 'Navigation' },
  { key: 'Escape', description: 'Close modal/dialog', category: 'Actions' },
  { key: 'Enter', description: 'Confirm action', category: 'Actions' },
  { key: '/', description: 'Focus search', category: 'Actions' },
];

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({
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
  }, {} as Record<string, KeyboardShortcut[]>);

  return (
    <div className="keyboard-shortcuts-overlay" onClick={onClose}>
      <div
        className="keyboard-shortcuts-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>Keyboard Shortcuts</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X size={20} />
          </Button>
        </div>

        <div className="modal-content">
          {Object.entries(groupedShortcuts).map(([category, items]) => (
            <div key={category} className="shortcut-category">
              <h3>{category}</h3>
              <div className="shortcut-list">
                {items.map((shortcut, index) => (
                  <div key={index} className="shortcut-item">
                    <kbd className="shortcut-key">{shortcut.key}</kbd>
                    <span className="shortcut-description">
                      {shortcut.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .keyboard-shortcuts-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          backdrop-filter: blur(4px);
        }

        .keyboard-shortcuts-modal {
          background: rgba(15, 23, 42, 0.95);
          border: 1px solid rgba(59, 130, 246, 0.3);
          border-radius: 12px;
          max-width: 600px;
          width: 90%;
          max-height: 80vh;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .modal-header h2 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #fff;
          margin: 0;
        }

        .modal-content {
          padding: 1.5rem;
          overflow-y: auto;
          max-height: calc(80vh - 80px);
        }

        .shortcut-category {
          margin-bottom: 2rem;
        }

        .shortcut-category:last-child {
          margin-bottom: 0;
        }

        .shortcut-category h3 {
          font-size: 1rem;
          font-weight: 600;
          color: #3b82f6;
          margin: 0 0 1rem 0;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .shortcut-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .shortcut-item {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .shortcut-key {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 60px;
          padding: 0.5rem 0.75rem;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 6px;
          font-family: 'Courier New', monospace;
          font-size: 0.875rem;
          font-weight: 600;
          color: #fff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .shortcut-description {
          flex: 1;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.9375rem;
        }
      `}</style>
    </div>
  );
};

export const useKeyboardShortcuts = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
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
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  };
};
