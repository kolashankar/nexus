import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
export const SkipLink = () => {
    const handleSkip = (event) => {
        event.preventDefault();
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.focus();
            mainContent.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx("a", { href: "#main-content", className: "skip-link", onClick: handleSkip, children: "Skip to main content" }), _jsx("style", { children: `
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
      ` })] }));
};
