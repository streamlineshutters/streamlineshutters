import React, { useState, useEffect } from 'react';
import FAQModal from './FAQModal';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFAQOpen, setIsFAQOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-900" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="4" width="56" height="56" />
              <rect x="10" y="10" width="16" height="44" />
              <line x1="10" y1="16.3" x2="26" y2="16.3" />
              <line x1="10" y1="22.6" x2="26" y2="22.6" />
              <line x1="10" y1="28.9" x2="26" y2="28.9" />
              <line x1="10" y1="35.2" x2="26" y2="35.2" />
              <line x1="10" y1="41.5" x2="26" y2="41.5" />
              <line x1="10" y1="47.8" x2="26" y2="47.8" />
              <rect x="38" y="10" width="16" height="44" />
              <line x1="38" y1="16.3" x2="54" y2="16.3" />
              <line x1="38" y1="22.6" x2="54" y2="22.6" />
              <line x1="38" y1="28.9" x2="54" y2="28.9" />
              <line x1="38" y1="35.2" x2="54" y2="35.2" />
              <line x1="38" y1="41.5" x2="54" y2="41.5" />
              <line x1="38" y1="47.8" x2="54" y2="47.8" />
            </svg>
            <h1 className="text-xl font-bold text-gray-900">Streamline Shutters</h1>
          </div>
          <button 
            onClick={() => setIsFAQOpen(true)}
            className="px-6 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors duration-300"
          >
            FAQ's
          </button>
        </div>
      </header>
      
      <FAQModal isOpen={isFAQOpen} onClose={() => setIsFAQOpen(false)} />
    </>
  );
};

export default Header;
