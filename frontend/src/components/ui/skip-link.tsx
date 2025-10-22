import React from 'react';

export const SkipLink: React.FC = () => {
  const handleSkip = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <a href="#main-content" className="skip-link" onClick={handleSkip}>
        Skip to main content
      </a>

      <style>{`
        .skip-link {
          position: absolute;
          top: -40px;
          left: 0;
          background: #3b82f6;
          color: white;
          padding: 8px 16px;
          text-decoration: none;
          z-index: 10000;
          font-weight: 600;
          border-radius: 0 0 4px 0;
        }

        .skip-link:focus {
          top: 0;
        }
      `}</style>
    </>
  );
};
