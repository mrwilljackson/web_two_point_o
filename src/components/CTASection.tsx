import React from 'react';
import { Play, CheckCircle, Clock, Heart, Trophy, Shield, Zap } from "lucide-react";

const CTASection: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-slate-800 via-purple-800 to-indigo-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-400 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute bottom-32 right-20 w-40 h-40 bg-pink-400 rounded-full opacity-15 animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-blue-400 rounded-full opacity-20 animate-pulse"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-header text-white">
          <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold mb-6">
            🚀 START YOUR TRANSFORMATION
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight text-white">
            Ready to Make Treatment{" "}
            <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
              Epic?
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-purple-100 max-w-4xl mx-auto leading-relaxed">
            Join the families who've transformed their daily treatment battles
            into epic gaming adventures. Your families' journey to better health starts here.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="card-grid md:grid-cols-3">
          <div className="text-center text-white bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Play className="text-white" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Start Free Trial</h3>
            <p className="text-purple-100">Get access to all of our digital adventures.</p>
          </div>

          <div className="text-center text-white bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Zap className="text-white" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">See Results Fast</h3>
            <p className="text-purple-100">Most families will see a dramatic improvement within the first week.</p>
          </div>

          <div className="text-center text-white bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Heart className="text-white" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Family Approved</h3>
            <p className="text-purple-100">Built by families, for families. We understand your journey.</p>
          </div>
        </div>
        {/* Main CTA Card */}
        <div className="bg-white rounded-3xl p-12 shadow-2xl max-w-5xl mx-auto border-4 border-purple-200">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Trophy className="text-purple-600" size={32} />
              <h3 className="text-3xl font-black text-slate-800">
                Get Started in Less Than 2 Minutes
              </h3>
            </div>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Download Playphysio, set up your child's gaming profile, and watch
              treatment time transform into the best part of their day.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-10">
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-5 rounded-2xl text-xl font-black hover:shadow-2xl transition-all duration-300 transform hover:scale-105 w-full md:w-auto flex items-center justify-center gap-3">
              <Trophy size={24} />
              Start Your Adventure Now
            </button>
            <span className="text-slate-400 font-bold text-lg">or</span>
            <button className="bg-slate-100 text-slate-700 px-10 py-5 rounded-2xl text-xl font-bold hover:bg-slate-200 transition-all duration-300 w-full md:w-auto flex items-center justify-center gap-3">
              <Play size={24} />
              Watch 2-Minute Demo
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-500" size={20} />
              <span className="font-semibold">Sign up online</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="text-blue-500" size={20} />
              <span className="font-semibold">2-minute setup</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="text-purple-500" size={20} />
              <span className="font-semibold">CE Medical device</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="text-red-500" size={20} />
              <span className="font-semibold">Cancel anytime</span>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="text-center mt-12">
          <p className="text-purple-200 text-lg">
            Questions? <a href="#" className="underline hover:text-white transition-colors font-bold">Chat with our team</a> or call{" "}
            <a href="tel:1-800-PLAYPHYSIO" className="font-black underline hover:text-white transition-colors">
              1-800-PLAYPHYSIO
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
