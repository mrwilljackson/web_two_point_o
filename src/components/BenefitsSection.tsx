import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

const benefits = [
  {
    title: "Improved Adherence",
    description: "More consistent, effective treatment; better health outcomes",
    icon: "👍",
    color: "bg-playphysio-blue"
  },
  {
    title: "Motivation & Enjoyment",
    description: "Makes therapy fun, reduces resistance, builds positive habits",
    icon: "🎮",
    color: "bg-playphysio-green"
  },
  {
    title: "Feedback & Progress Tracking",
    description: "Real-time data and visual achievements for users, families, and clinicians",
    icon: "📊",
    color: "bg-playphysio-purple"
  },
  {
    title: "Reduced Family Burden",
    description: "Less stress and conflict, easier daily routines",
    icon: "🏡",
    color: "bg-playphysio-yellow"
  },
  {
    title: "Empowerment & Education",
    description: "Teaches correct technique, builds confidence and self-efficacy",
    icon: "💪",
    color: "bg-playphysio-orange"
  },
  {
    title: "Community & Social Support",
    description: "Connects users, fosters support and healthy competition",
    icon: "👪",
    color: "bg-playphysio-pink"
  },
  {
    title: "Cost & System Efficiency",
    description: "Saves time and money for families and health systems, supports digital transformation",
    icon: "💰",
    color: "bg-playphysio-blue-dark"
  },
  {
    title: "Clinical Validation",
    description: "Backed by research and aligns with current healthcare best practices",
    icon: "🔬",
    color: "bg-playphysio-green-dark"
  }
];

const BenefitsSection: React.FC = () => {
  return (
    <section id="benefits" className="py-16 md:py-24 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Benefits</span> That Make a Difference
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Playphysio® transforms respiratory therapy from a dreaded chore to an exciting challenge through smart gamification and thoughtful design.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="card-hover border-none bg-white">
              <CardHeader>
                <div className={`w-12 h-12 rounded-full ${benefit.color} flex items-center justify-center mb-4`}>
                  <span className="text-2xl">{benefit.icon}</span>
                </div>
                <CardTitle className="text-xl font-bold">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-700">{benefit.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
