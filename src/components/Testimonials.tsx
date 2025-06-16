import React from 'react';
import { Star, Quote, Heart, Trophy, Users } from "lucide-react";

const testimonials = [
  {
    quote: "Sarah actually RUNS to get her vest now! She calls it 'dragon training time' and has made friends with kids from around the world. It's like magic watching her excitement.",
    author: "Maria K.",
    role: "Parent of CF patient",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=60&h=60&fit=crop&crop=face",
    highlight: "Finally asks for treatment",
    rating: 5,
    badge: "Parent Champion"
  },
  {
    quote: "I'm on level 15 of Crystal Caves and my breathing is getting SO much stronger! I beat my friend Jake yesterday and we're planning to tackle the Ice Kingdom together!",
    author: "Emma, age 9",
    role: "Playphysio Warrior",
    avatar: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=60&h=60&fit=crop&crop=face",
    highlight: "Level 15 achieved",
    rating: 5,
    badge: "Gaming Hero"
  },
  {
    quote: "In 15 years of pediatric respiratory therapy, I've never seen adherence rates this high. Parents tell me treatment went from their biggest stress to family bonding time.",
    author: "Dr. Jennifer Liu",
    role: "Pediatric Respiratory Therapist",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=60&h=60&fit=crop&crop=face",
    highlight: "Record adherence rates",
    rating: 5,
    badge: "Medical Expert"
  }
];

const getBadgeColor = (badge: string) => {
  switch (badge) {
    case "Parent Champion": return "bg-purple-100 text-purple-700 border-purple-200";
    case "Gaming Hero": return "bg-pink-100 text-pink-700 border-pink-200";
    case "Medical Expert": return "bg-blue-100 text-blue-700 border-blue-200";
    default: return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

const getBadgeIcon = (badge: string) => {
  switch (badge) {
    case "Parent Champion": return Heart;
    case "Gaming Hero": return Trophy;
    case "Medical Expert": return Users;
    default: return Star;
  }
};

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
            ⭐ REAL STORIES, REAL RESULTS
          </div>
          <h2 className="text-4xl font-black text-slate-800 mb-6">
            Families Sharing Their{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Transformation Stories
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Real testimonials from families whose lives have been completely transformed
            by making treatment time the best part of their day.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => {
            const BadgeIcon = getBadgeIcon(testimonial.badge);
            return (
              <div
                key={index}
                className="bg-white border-2 border-slate-200 rounded-3xl p-8 hover:shadow-2xl hover:border-purple-200 transition-all duration-500 transform hover:-translate-y-2"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold border-2 ${getBadgeColor(testimonial.badge)}`}>
                    <BadgeIcon size={16} />
                    {testimonial.badge}
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: testimonial.rating }, (_, i) => (
                      <Star key={i} className="text-yellow-400 fill-current" size={16} />
                    ))}
                  </div>
                </div>

                {/* Highlight Badge */}
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-xl text-sm font-bold mb-6 text-center">
                  🎉 {testimonial.highlight}
                </div>

                {/* Quote */}
                <div className="relative mb-6">
                  <Quote className="text-purple-200 absolute -top-2 -left-2" size={32} />
                  <blockquote className="text-slate-700 text-lg leading-relaxed pl-6">
                    "{testimonial.quote}"
                  </blockquote>
                </div>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-14 h-14 rounded-full object-cover border-3 border-purple-200 shadow-lg"
                  />
                  <div>
                    <div className="font-bold text-slate-800 text-lg">{testimonial.author}</div>
                    <div className="text-purple-600 text-sm font-semibold">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-white text-center shadow-2xl">
          <h3 className="text-3xl font-black mb-6">
            Ready to Join 10,000+ Families Making Treatment Fun?
          </h3>
          <p className="text-xl mb-8 text-purple-100">
            See why healthcare providers and families worldwide trust Playphysio
            to transform respiratory care into gaming adventures.
          </p>
          <button className="bg-white text-purple-700 px-10 py-4 rounded-xl font-black text-lg hover:bg-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            Start Your Free Adventure Today →
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
