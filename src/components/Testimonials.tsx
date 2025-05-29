import React from 'react';
import { Card, CardContent } from "./ui/card";

const testimonials = [
  {
    quote: "My son used to dread his breathing exercises. With Playphysio, I now have to convince him to stop! It's transformed our daily routine.",
    name: "Sarah J.",
    role: "Parent",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    color: "bg-playphysio-blue"
  },
  {
    quote: "Playphysio has given me valuable insights into my patients' home therapy adherence that I never had before. It's a game-changer.",
    name: "Dr. Michael R.",
    role: "Pediatric Pulmonologist",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    color: "bg-playphysio-green"
  },
  {
    quote: "I love beating my high scores! The penguin game is my favorite, and Mom says my breathing is getting stronger.",
    name: "Emma, age 8",
    role: "User",
    avatar: "https://randomuser.me/api/portraits/women/67.jpg",
    color: "bg-playphysio-yellow"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Success Stories</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Hear from parents, healthcare professionals, and young users about the difference Playphysio® has made.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="card-hover border-none overflow-visible">
              <CardContent className="p-8 relative">
                {/* Decorative quote mark */}
                <div className={`absolute -top-4 -left-4 w-8 h-8 ${testimonial.color} rounded-full flex items-center justify-center text-white`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                  </svg>
                </div>
                
                <p className="text-lg mb-6 italic text-gray-700">{testimonial.quote}</p>
                
                <div className="flex items-center">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
