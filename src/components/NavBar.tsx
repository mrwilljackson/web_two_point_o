import React from 'react';
import { Button } from "./ui/button";

const NavBar: React.FC = () => {
  return (
    <nav className="w-full sticky top-0 bg-white/80 backdrop-blur-md z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <a href="/" className="flex-shrink-0 flex items-center">
              <img src="/images/playphysio-logo-horizontal.svg" alt="PlayPhysio Logo" className="h-auto w-[150px]" />
            </a>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              <a href="/blog" className="text-gray-700 hover:text-playphysio-blue font-light tracking-wide">News</a>
              <a href="#benefits" className="text-gray-700 hover:text-playphysio-blue font-light tracking-wide">Benefits</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-playphysio-blue font-light tracking-wide">How It Works</a>
              <a href="#testimonials" className="text-gray-700 hover:text-playphysio-blue font-light tracking-wide">Testimonials</a>
              <a href="#contact" className="text-gray-700 hover:text-playphysio-blue font-light tracking-wide">Contact</a>
              <Button
                className="text-white rounded-full px-6 py-2 font-medium hover:scale-105 transition-all duration-300"
                style={{
                  background: 'linear-gradient(to right, #4DBBFA, #58D68D)',
                }}
              >
                Get Started
              </Button>
            </div>
          </div>

          <div className="md:hidden">
            <Button variant="ghost">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
