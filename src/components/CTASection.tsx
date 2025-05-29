import React from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Gamepad, Play } from "lucide-react";

const CTASection: React.FC = () => {
  return (
    <section id="contact" className="py-16 md:py-24 bg-gradient-to-r from-playphysio-blue/10 to-playphysio-green/10 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="bubble w-64 h-64 bg-playphysio-pink top-10 right-10 opacity-10 animate-float"></div>
        <div className="bubble w-40 h-40 bg-playphysio-yellow bottom-10 left-10 opacity-10 animate-float" style={{ animationDelay: "1.5s" }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-[1.01] transition-transform duration-300">
          <div className="md:flex">
            <div className="md:w-1/2 bg-gradient-to-br from-playphysio-blue to-playphysio-green p-12 md:p-16 text-white">
              <h2 className="text-3xl font-extrabold mb-6 flex items-center">
                <Gamepad className="mr-2 h-8 w-8" />
                Start Your Journey Today
              </h2>
              <p className="text-lg mb-8">
                Join thousands of families who have transformed respiratory therapy from a chore into fun and games.
              </p>
              
              <div className="rounded-xl overflow-hidden shadow-xl mb-8 bg-white/10 backdrop-blur-md transform hover:translate-y-[-5px] transition-all duration-300">
                {/* Mobile Game Video - This has a animated overlay to make it more dynamic */}
                <div className="relative pt-[56.25%]">
                  <div className="absolute inset-0 bg-gradient-to-r from-playphysio-blue/40 to-transparent z-10 pointer-events-none"></div>
                  <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                    <div className="w-20 h-20 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center animate-pulse">
                      <Play className="h-10 w-10 text-white" />
                    </div>
                  </div>
                  <iframe 
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&controls=1&rel=0" 
                    title="PlayPhysio Mobile Game Demo" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen>
                  </iframe>
                </div>
                <div className="p-4">
                  <p className="font-semibold">See how Playphysio transforms therapy into play!</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center transform hover:translate-x-1 transition-transform duration-200">
                  <div className="mr-4 bg-white/20 rounded-full p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p>Clinically validated results</p>
                </div>
                
                <div className="flex items-center transform hover:translate-x-1 transition-transform duration-200">
                  <div className="mr-4 bg-white/20 rounded-full p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p>30-day satisfaction guarantee</p>
                </div>
                
                <div className="flex items-center transform hover:translate-x-1 transition-transform duration-200">
                  <div className="mr-4 bg-white/20 rounded-full p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p>Compatible with most devices</p>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2 p-12">
              <h3 className="text-2xl font-extrabold mb-6">Request More Information</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <Input id="name" placeholder="Your name" className="w-full hover:border-playphysio-blue focus:border-playphysio-blue transition-colors duration-200" />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <Input id="email" type="email" placeholder="your@email.com" className="w-full hover:border-playphysio-blue focus:border-playphysio-blue transition-colors duration-200" />
                </div>
                
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                    I am a:
                  </label>
                  <select id="role" className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-playphysio-blue focus:border-transparent">
                    <option>Parent/Guardian</option>
                    <option>Healthcare Professional</option>
                    <option>School/Institution</option>
                    <option>Other</option>
                  </select>
                </div>
                
                <Button className="w-full bg-gradient-to-r from-playphysio-blue to-playphysio-green text-white hover:shadow-lg hover:scale-[1.02] transition-all duration-300 font-extrabold">
                  Get Information Package
                </Button>
                
                <p className="text-xs text-gray-500 text-center mt-4">
                  We respect your privacy and will never share your information.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
