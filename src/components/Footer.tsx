import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer
      id="app-footer"
      className="h-[40px] px-10 flex items-center justify-center text-[#888888] text-[10px] shrink-0 border-t border-gray-200/60 mt-8"
    >
      <span id="privacy-security-notice" className="text-center">
        The storage functionality of this tool is entirely handled via localStorage; the page itself does not retain any user data for privacy and security.
      </span>
    </footer>
  );
};
