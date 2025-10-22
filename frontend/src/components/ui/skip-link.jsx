import React from 'react';

export const SkipLink: React.FC = () => {
  const handleSkip = (event) => {
    event.preventDefault();
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior);
    }
  };

  return (
    
      
        Skip to main content
      

      {`
        .skip-link {
          position);
};
