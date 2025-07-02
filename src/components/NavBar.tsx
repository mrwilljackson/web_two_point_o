import React, { useState } from 'react';
import { Button } from "./ui/button";

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="w-full sticky top-0 bg-white/80 backdrop-blur-md z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <a href="/" className="flex-shrink-0 flex items-center justify-center h-full py-2">
              <img src="/src/assets/playphysio-logo.svg" alt="Playphysio Logo" className="h-10 w-auto max-w-none" />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              <a href="/#how-it-works" className="text-gray-700 hover:text-playphysio-blue font-light tracking-wide">How It Works</a>
              <a href="/#testimonials" className="text-gray-700 hover:text-playphysio-blue font-light tracking-wide">Testimonials</a>
              <a href="/blog" className="text-gray-700 hover:text-playphysio-blue font-light tracking-wide">News</a>
              <a href="/#contact" className="text-gray-700 hover:text-playphysio-blue font-light tracking-wide">Contact</a>
              <a href="/#contact">
                <Button
                  className="text-white rounded-full px-6 py-2 font-medium hover:scale-105 transition-all duration-300"
                  style={{
                    background: 'linear-gradient(to right, #4DBBFA, #58D68D)',
                  }}
                >
                  Get Started
                </Button>
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" onClick={toggleMenu} aria-label="Toggle menu">
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md border-t border-gray-200">
              <a
                href="/#how-it-works"
                className="block px-3 py-2 text-gray-700 hover:text-playphysio-blue font-light tracking-wide"
                onClick={closeMenu}
              >
                How It Works
              </a>
              <a
                href="/#testimonials"
                className="block px-3 py-2 text-gray-700 hover:text-playphysio-blue font-light tracking-wide"
                onClick={closeMenu}
              >
                Testimonials
              </a>
              <a
                href="/blog"
                className="block px-3 py-2 text-gray-700 hover:text-playphysio-blue font-light tracking-wide"
                onClick={closeMenu}
              >
                News
              </a>
              <a
                href="/#contact"
                className="block px-3 py-2 text-gray-700 hover:text-playphysio-blue font-light tracking-wide"
                onClick={closeMenu}
              >
                Contact
              </a>
              <div className="px-3 py-2">
                <a href="/#contact">
                  <Button
                    className="w-full text-white rounded-full px-6 py-2 font-medium hover:scale-105 transition-all duration-300"
                    style={{
                      background: 'linear-gradient(to right, #4DBBFA, #58D68D)',
                    }}
                    onClick={closeMenu}
                  >
                    Get Started
                  </Button>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
