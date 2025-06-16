import React from 'react';
import { Heart, Target, Users, Lightbulb, Gamepad2 } from "lucide-react";

const FoundersJourney: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Badge and Heading */}
        <div className="text-center mb-16">
          <div className="inline-block bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-4 py-2 rounded-full text-sm font-bold mb-6">
            💜 FOUNDER'S JOURNEY
          </div>
          <h2 className="text-4xl font-black text-slate-800 leading-tight">
            Born from{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Personal Experience
            </span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Story Content */}
          <div className="space-y-8">

            <div className="bg-white rounded-2xl p-8 border-2 border-purple-100 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="text-red-500" size={24} />
                <h3 className="text-xl font-bold text-slate-800">The Reality I Lived</h3>
              </div>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                "I was diagnosed with cystic fibrosis at 6 months old. For over 20 years, 
                I experienced firsthand the daily struggle of respiratory treatments. 
                The isolation, the boredom, the family conflicts—I lived it all."
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-white shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="text-yellow-300" size={24} />
                <h3 className="text-xl font-bold">The Breakthrough Moment</h3>
              </div>
              <p className="text-lg leading-relaxed">
                "But I also knew that with the right motivation, treatments could become 
                something kids actually looked forward to. What if we could turn medicine 
                into magic? That's when Playphysio was born."
              </p>
            </div>

            {/* Mission Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center bg-white p-6 rounded-2xl border-2 border-green-100 shadow-sm">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Target className="text-white" size={20} />
                </div>
                <h4 className="font-black text-slate-800 mb-2">Our Mission</h4>
                <p className="text-slate-600 text-sm">Make treatment serious fun</p>
              </div>
              
              <div className="text-center bg-white p-6 rounded-2xl border-2 border-purple-100 shadow-sm">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Heart className="text-white" size={20} />
                </div>
                <h4 className="font-black text-slate-800 mb-2">Our Vision</h4>
                <p className="text-slate-600 text-sm">Transform respiratory care worldwide</p>
              </div>
              
              <div className="text-center bg-white p-6 rounded-2xl border-2 border-blue-100 shadow-sm">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Users className="text-white" size={20} />
                </div>
                <h4 className="font-black text-slate-800 mb-2">Our Impact</h4>
                <p className="text-slate-600 text-sm">10,000+ families helped</p>
              </div>
            </div>
          </div>

          {/* Visual Content */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-8 border-2 border-purple-100 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1501286353178-1ec881214838?w=600&h=400&fit=crop" 
                alt="Founder working on Playphysio"
                className="rounded-2xl w-full h-64 object-cover mb-6"
              />
              <div className="text-center">
                <h4 className="text-xl font-bold text-slate-800 mb-2">From Patient to Pioneer</h4>
                <p className="text-slate-600">Turning personal struggle into global solution</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-8 border-2 border-purple-200">
              <div className="flex items-center gap-3 mb-4">
                <Gamepad2 className="text-purple-600" size={28} />
                <h3 className="text-xl font-bold text-slate-800">Today's Reality</h3>
              </div>
              <p className="text-slate-700 leading-relaxed">
                Our team combines lived experience with cutting-edge gaming technology 
                to ensure no child has to face the treatment battles I once did. 
                We're not just building a product—we're building hope, one game at a time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoundersJourney;
