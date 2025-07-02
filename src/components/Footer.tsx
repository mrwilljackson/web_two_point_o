import React from 'react';
import footerLogo from '../assets/playphysio-p-footer-logo.svg';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-600 via-gray-800 to-gray-700 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-4">
              <img src={footerLogo.src} alt="Playphysio Logo" className="h-auto w-full max-w-[190px]" />
            </div>
            <p className="text-gray-300 mb-4 text-sm font-light">
              make treatment serious fun
            </p>

          </div>

          <div>
            <h3 className="font-bold text-white mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Features</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">How It Works</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Pricing</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">FAQ</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Research</a>
              </li>
              <li>
                <a href="/blog" className="text-gray-300 hover:text-white transition-colors duration-300">Blog</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Partners</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Support</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">About Us</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Careers</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Contact</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Press</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm font-light">
              © {new Date().getFullYear()} Playphysio® is a registered trademark of Playphysio C.I.C. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm font-light transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm font-light transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm font-light transition-colors duration-300">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
