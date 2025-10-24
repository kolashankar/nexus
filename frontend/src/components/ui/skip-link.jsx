import React from 'react';

export const SkipLink = () => {
  const handleSkip = (event) => {
    event.preventDefault();
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior);
    }
  };

  return (
    <a
      href="#main-content"
      onClick={handleSkip}
      className="sr-only focus
    >
      Skip to main content
    </a>
  );
};
