import React from 'react';
import { Button } from "./ui/button";

const steps = [
  {
    number: "01",
    title: "Connect Device",
    description: "Easily connect our physioPal™ monitor to any smartphone or tablet with Bluetooth.",
    image: "device-and-app.jpg",
    color: "bg-playphysio-blue"
  },
  {
    number: "02",
    title: "Choose Games",
    description: "Select from a variety of age-appropriate games approved by respiratory therapists.",
    image: "some-games.png",
    color: "bg-playphysio-green"
  },
  {
    number: "03",
    title: "Play & Breathe",
    description: "Children control games by blowing, now therapy is a fun challenge.",
    image: "defender-screens.png",
    color: "bg-playphysio-yellow"
  },
  {
    number: "04",
    title: "Track Progress",
    description: "Monitor improvements, earn rewards, and share your results with healthcare providers.",
    image: "game-locked.png",
    color: "bg-playphysio-orange"
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">How It Works</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Playphysio® combines engaging games with effective respiratory therapy in a simple, user-friendly experience.
          </p>
        </div>
        
        <div className="relative">
          {/* Connected line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-playphysio-blue via-playphysio-green to-playphysio-yellow transform -translate-x-1/2"></div>
          
          {steps.map((step, index) => (
            <div key={index} className={`flex flex-col md:flex-row items-center mb-16 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                <div className={`${step.color} rounded-full w-16 h-16 flex items-center justify-center mb-4 text-white font-bold text-xl`}>
                  {step.number}
                </div>
                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-lg text-gray-700">{step.description}</p>
              </div>
              <div className={`md:w-1/2 mt-8 md:mt-0 ${index % 2 === 0 ? '' : 'md:pr-16'}`}>
                <div className={`relative p-4 bg-opacity-10 rounded-xl`}>
                  <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                    <img
                      src={`images/${step.image}`}
                      alt={`Step ${index + 1} illustration`}
                      className="object-cover h-full w-full rounded-lg shadow-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Button className="bg-gradient-to-r from-playphysio-blue to-playphysio-green text-white text-lg py-6 px-8 rounded-full">
            Get Started Today
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
