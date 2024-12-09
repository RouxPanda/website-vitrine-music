import React, { useState, useEffect } from 'react';

function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50`}>
      <div className="max-w-5xl mx-auto px-4 h-16 flex justify-between items-center">
        <nav>
          <a href="#albums" className="text-black text-sm uppercase tracking-wider hover:opacity-70 transition-opacity">
            Discography
          </a>
        </nav>
        <nav>
          <a href="#social" className="text-black text-sm uppercase tracking-wider hover:opacity-70 transition-opacity">
            Socials
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;