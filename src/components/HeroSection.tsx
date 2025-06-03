import React, { useEffect, useState, useRef } from 'react';
import { Button } from "./ui/button";
import { Play } from "lucide-react";

interface Bubble {
  id: number;
  x: number;
  y: number;
  baseSize: number;
  color: string;
  maxOpacity: number;
  speed: number;
  direction: { x: number; y: number };
  // For cyclic fading
  cycleOffset: number; // Offset in the cycle (0-1)
  cycleSpeed: number;  // How fast this bubble cycles
  // For scaling animation
  scaleOffset: number; // Offset in the scale cycle (0-1)
  scaleSpeed: number;  // How fast this bubble scales
}

const HeroSection: React.FC = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const timeRef = useRef<number>(0);

  // Colors for the bubbles
  const colors = [
    '#4DBBFA', // playphysio-blue
    '#58D68D', // playphysio-green
    '#F4D03F', // playphysio-yellow
    '#FF6B81', // playphysio-pink
    '#9B59B6', // playphysio-purple
    '#F39C12'  // playphysio-orange
  ];

  // Constants for bubble behavior
  const TOTAL_BUBBLES = 15;
  const CYCLE_DURATION = 15000; // 15 seconds for a complete fade in/out cycle
  const FADE_PORTION = 0.3; // 30% of the cycle is spent fading in or out
  const SCALE_CYCLE_DURATION = 8000; // 8 seconds for a complete scale cycle
  const MIN_SCALE = 0.8; // Minimum scale factor
  const MAX_SCALE = 1.2; // Maximum scale factor

  useEffect(() => {
    // Create a fixed set of bubbles with staggered cycles
    const initialBubbles: Bubble[] = [];

    for (let i = 0; i < TOTAL_BUBBLES; i++) {
      // Stagger the cycle offsets evenly across bubbles
      const cycleOffset = i / TOTAL_BUBBLES;
      // Stagger the scale offsets differently to create more variation
      const scaleOffset = ((i * 1.618) % TOTAL_BUBBLES) / TOTAL_BUBBLES; // Golden ratio for better distribution
      initialBubbles.push(createBubble(i, cycleOffset, scaleOffset));
    }

    setBubbles(initialBubbles);

    // Animation loop
    const animate = (timestamp: number) => {
      if (!timeRef.current) {
        timeRef.current = timestamp;
      }

      const elapsed = timestamp - timeRef.current;
      timeRef.current = timestamp;

      // Update bubble positions and opacities
      setBubbles(prevBubbles => {
        return prevBubbles.map(bubble => {
          // Update cycle position (0-1 range that repeats)
          const cycleDelta = (elapsed / CYCLE_DURATION) * bubble.cycleSpeed;
          let newCycleOffset = (bubble.cycleOffset + cycleDelta) % 1;

          // Update scale cycle position
          const scaleDelta = (elapsed / SCALE_CYCLE_DURATION) * bubble.scaleSpeed;
          let newScaleOffset = (bubble.scaleOffset + scaleDelta) % 1;

          // Calculate opacity based on cycle position
          let opacity = bubble.maxOpacity;

          // First FADE_PORTION of cycle: fade in
          if (newCycleOffset < FADE_PORTION) {
            opacity = bubble.maxOpacity * (newCycleOffset / FADE_PORTION);
          }
          // Last FADE_PORTION of cycle: fade out
          else if (newCycleOffset > (1 - FADE_PORTION)) {
            const fadeOutProgress = (newCycleOffset - (1 - FADE_PORTION)) / FADE_PORTION;
            opacity = bubble.maxOpacity * (1 - fadeOutProgress);
          }

          // Calculate scale factor using sine wave for smooth transitions
          // This creates a smooth oscillation between MIN_SCALE and MAX_SCALE
          const scaleRange = MAX_SCALE - MIN_SCALE;
          const scaleFactor = MIN_SCALE + scaleRange * (Math.sin(newScaleOffset * Math.PI * 2) * 0.5 + 0.5);

          // Update position with faster, smoother movement
          // Using elapsed time for frame-rate independent movement
          let newX = bubble.x + bubble.direction.x * bubble.speed * (elapsed / 10); // Faster (16 -> 10)
          let newY = bubble.y + bubble.direction.y * bubble.speed * (elapsed / 10);

          // Bounce off edges if container exists
          let newDirectionX = bubble.direction.x;
          let newDirectionY = bubble.direction.y;

          if (containerRef.current) {
            const containerWidth = containerRef.current.clientWidth;
            const containerHeight = containerRef.current.clientHeight;
            const visibleHeight = containerHeight * 0.8; // Keep bubbles in top 80% of screen

            // Ensure bubbles stay within visible area with padding
            const padding = 20;

            // Handle horizontal boundaries
            if (newX <= padding) {
              newX = padding;
              newDirectionX = Math.abs(newDirectionX); // Force direction to right
            } else if (newX + bubble.size >= containerWidth - padding) {
              newX = containerWidth - bubble.size - padding;
              newDirectionX = -Math.abs(newDirectionX); // Force direction to left
            }

            // Handle vertical boundaries - keep in top portion of screen
            if (newY <= padding) {
              newY = padding;
              newDirectionY = Math.abs(newDirectionY); // Force direction down
            } else if (newY + bubble.size >= visibleHeight - padding) {
              newY = visibleHeight - bubble.size - padding;
              newDirectionY = -Math.abs(newDirectionY); // Force direction up
            }
          }

          return {
            ...bubble,
            x: newX,
            y: newY,
            direction: { x: newDirectionX, y: newDirectionY },
            cycleOffset: newCycleOffset,
            scaleOffset: newScaleOffset,
            opacity,
            scaleFactor // Add the calculated scale factor
          };
        });
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Function to create a bubble with cyclic fading and scaling
  const createBubble = (id: number, cycleOffset: number, scaleOffset: number): Bubble => {
    // Get the visible area dimensions
    const containerWidth = containerRef.current?.clientWidth || window.innerWidth;
    const containerHeight = containerRef.current?.clientHeight || window.innerHeight;

    // Ensure bubbles are visible in the viewport
    const baseSize = Math.random() * 40 + 30; // Base size between 30 and 70px

    // Restrict bubbles to the visible area (top 80% of the screen)
    const visibleHeight = containerHeight * 0.8;
    const x = Math.random() * (containerWidth - baseSize - 40) + 20; // Keep away from edges
    const y = Math.random() * (visibleHeight - baseSize - 40) + 20; // Keep in top portion and away from edges

    const color = colors[Math.floor(Math.random() * colors.length)];
    const maxOpacity = Math.random() * 0.2 + 0.1; // Max opacity between 0.1 and 0.3

    // Faster movement
    const speed = Math.random() * 0.3 + 0.1; // Speed between 0.1 and 0.4 (faster)

    // Random direction with more horizontal movement
    const angle = Math.random() * Math.PI * 2;
    const direction = {
      x: Math.cos(angle) * (Math.random() * 0.5 + 0.5), // Bias toward horizontal movement
      y: Math.sin(angle) * (Math.random() * 0.3 + 0.2)  // Reduce vertical movement
    };

    // Randomize cycle speeds for more natural movement
    const cycleSpeed = 0.8 + Math.random() * 0.4; // 0.8 to 1.2 times normal speed
    const scaleSpeed = 0.7 + Math.random() * 0.6; // 0.7 to 1.3 times normal speed (more variation)

    // Calculate initial scale factor
    const scaleRange = MAX_SCALE - MIN_SCALE;
    const initialScaleFactor = MIN_SCALE + scaleRange * (Math.sin(scaleOffset * Math.PI * 2) * 0.5 + 0.5);

    return {
      id,
      x,
      y,
      baseSize,
      color,
      maxOpacity,
      speed,
      direction,
      cycleOffset,
      cycleSpeed,
      scaleOffset,
      scaleSpeed,
      opacity: 0, // Start invisible
      scaleFactor: initialScaleFactor
    };
  };

  return (
    <section className="relative pt-16 pb-20 md:pt-24 md:pb-32 overflow-hidden bg-gradient-to-b from-white to-playphysio-blue/5">
      {/* Animated background elements */}
      <div ref={containerRef} className="absolute inset-0 overflow-hidden z-0">
        {bubbles.map(bubble => {
          // Calculate the actual size with scaling
          const size = bubble.baseSize * (bubble.scaleFactor || 1);

          return (
            <div
              key={bubble.id}
              className="absolute rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: bubble.color,
                // Adjust position to keep bubble centered while scaling
                left: `${bubble.x - (size - bubble.baseSize) / 2}px`,
                top: `${bubble.y - (size - bubble.baseSize) / 2}px`,
                opacity: bubble.opacity,
                transition: 'opacity 0.5s ease-in-out',
                transform: `translate(${Math.sin(bubble.id) * 10}px, ${Math.cos(bubble.id) * 10}px)`,
                boxShadow: `0 0 20px rgba(255,255,255,0.4), 0 0 30px ${bubble.color}40`
              }}
            />
          );
        })}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 animate-fade-in leading-tight">
              <span className="gradient-text-blue">Little Lungs,</span>
              <br />
              <span className="gradient-text-purple drop-shadow-md">Big Wins!</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 font-light tracking-wide animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Transform respiratory therapy into an exciting adventure. Playphysio® makes breathing exercises fun, engaging, and effective for children.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <Button
                className="text-white text-lg py-6 px-8 rounded-full font-bold tracking-tight hover:scale-105 transition-all duration-300 shadow-lg"
                style={{
                  background: 'linear-gradient(to right, #4DBBFA, #58D68D)',
                }}
              >
                <Play className="mr-2" />
                Get Started
              </Button>
              <Button variant="outline" className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 bg-white text-lg py-6 px-8 rounded-full hover:scale-105 transition-all duration-300">
                Learn More
              </Button>
            </div>
          </div>

          <div className="mt-10 md:mt-0 md:w-1/2 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-playphysio-blue/20 to-playphysio-green/20 rounded-3xl transform rotate-3 animate-pulse"></div>
              <img
                src="images/bubbles-child.jpg"
                alt="Child using Playphysio"
                className="relative z-10 rounded-3xl shadow-xl transform -rotate-2 hover:rotate-0 transition-transform duration-300 hover:scale-105"
              />

              {/* Animated stats badge */}
              <div className="absolute -bottom-6 -right-6 bg-white p-2 rounded-xl shadow-lg transform rotate-6 hover:rotate-0 hover:scale-110 transition-all duration-300 z-20">
                <div
                  className="p-3 rounded-lg"
                  style={{
                    background: 'linear-gradient(to right, #F4D03F, #F39C12)',
                  }}
                >
                  <p className="font-extrabold text-white text-lg tracking-tight">Follow Willow Waterford!</p>
                </div>
              </div>

              {/* Floating game elements */}
              <div className="absolute -top-8 -left-8 bg-white p-3 rounded-full shadow-lg animate-bounce-gentle z-20">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #58D68D, #4DBBFA)',
                  }}
                >
                  <span className="text-white font-bold text-xl">6x</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
