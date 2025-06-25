import React from 'react';
import { Smartphone, Heart, Users, Stethoscope, Play, Star, Trophy, Clock } from "lucide-react";

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="section-header">
          <div className="section-badge">
            🎮 HOW IT WORKS
          </div>
          <div className="hidden md:block h-8"></div>
          <h2 className="section-title">
            See the{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Magic in Action
            </span>
          </h2>
          <div className="hidden md:block h-8"></div>
          <p className="section-description">
            From gameplay to real health outcomes - discover how Playphysio transforms respiratory therapy into an adventure everyone loves.
          </p>
        </div>

        {/* For Children - Left aligned */}
        <div className="grid lg:grid-cols-2 gap-16 items-center content-section">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <Heart className="text-white" size={24} />
              </div>
              <h3 className="text-3xl font-black text-slate-800">For Children</h3>
            </div>

            <h4 className="text-2xl font-bold text-slate-700">Treatment Becomes an Epic Quest</h4>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-1">
                  <Play className="text-green-600" size={16} />
                </div>
                <div>
                  <h5 className="font-bold text-slate-800">Immersive Gaming Experience</h5>
                  <p className="text-slate-600">Dragon adventures, treasure hunts, and magical quests that respond to their breathing patterns</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mt-1">
                  <Trophy className="text-purple-600" size={16} />
                </div>
                <div>
                  <h5 className="font-bold text-slate-800">Achievement & Rewards</h5>
                  <p className="text-slate-600">Unlock badges, level up characters, and earn rewards for consistent treatment</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center mt-1">
                  <Star className="text-pink-600" size={16} />
                </div>
                <div>
                  <h5 className="font-bold text-slate-800">Personalized Adventures</h5>
                  <p className="text-slate-600">Games adapt to their progress, ensuring the perfect challenge level every time</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src="/images/playphysio-for-kids.png"
              alt="Children enjoying Playphysio gaming experience"
              className="w-full h-auto rounded-3xl shadow-2xl border-8 border-white transform rotate-3 hover:rotate-0 transition-all duration-500"
            />
          </div>
        </div>

        {/* For Parents - Right aligned */}
        <div className="grid lg:grid-cols-2 gap-16 items-center content-section">
          <div className="relative order-2 lg:order-1">
            <img
              src="/images/playphysio-for-parents.png"
              alt="Parents monitoring child's treatment progress"
              className="w-full h-auto rounded-3xl shadow-2xl border-8 border-white transform -rotate-3 hover:rotate-0 transition-all duration-500"
            />
          </div>

          <div className="space-y-8 order-1 lg:order-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                <Users className="text-white" size={24} />
              </div>
              <h3 className="text-3xl font-black text-slate-800">For Parents</h3>
            </div>

            <h4 className="text-2xl font-bold text-slate-700">Peace of Mind & Real Progress</h4>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                  <Clock className="text-blue-600" size={16} />
                </div>
                <div>
                  <h5 className="font-bold text-slate-800">Real-Time Monitoring</h5>
                  <p className="text-slate-600">Track treatment compliance, technique quality, and progress from anywhere</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-1">
                  <Heart className="text-green-600" size={16} />
                </div>
                <div>
                  <h5 className="font-bold text-slate-800">Stress-Free Treatment Time</h5>
                  <p className="text-slate-600">No more battles or bribes - children actively request their treatment sessions</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mt-1">
                  <Users className="text-purple-600" size={16} />
                </div>
                <div>
                  <h5 className="font-bold text-slate-800">Family Connection</h5>
                  <p className="text-slate-600">Share achievements and celebrate milestones together as a family</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* For Clinicians - Center aligned */}
        <div className="hidden md:block h-8"></div>
        <div className="text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Stethoscope className="text-white" size={24} />
              </div>
              <h3 className="text-3xl font-black text-slate-800">For Clinicians</h3>
            </div>
            <div className="hidden md:block h-4"></div>
            <h4 className="text-2xl font-bold text-slate-700 mb-8">Data-Driven Care & Better Outcomes</h4>
            <div className="hidden md:block h-8"></div>
            <div className="card-grid md:grid-cols-3">
              <div className="bg-white p-6 rounded-2xl border-2 border-purple-100 shadow-lg">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Trophy className="text-white" size={24} />
                </div>
                <h5 className="font-bold text-slate-800 mb-3">Improved Compliance</h5>
                <p className="text-slate-600">Average 40% increase in treatment adherence compared to traditional methods</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border-2 border-blue-100 shadow-lg">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="text-white" size={24} />
                </div>
                <h5 className="font-bold text-slate-800 mb-3">Detailed Analytics</h5>
                <p className="text-slate-600">Comprehensive treatment data to inform care decisions and track progress</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border-2 border-green-100 shadow-lg">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Heart className="text-white" size={24} />
                </div>
                <h5 className="font-bold text-slate-800 mb-3">Better Outcomes</h5>
                <p className="text-slate-600">Measurable improvements in lung function and quality of life metrics</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-8 text-white">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h4 className="text-xl font-bold mb-4">Clinical Dashboard Preview</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <div className="font-bold">Patient Compliance</div>
                    <div className="text-2xl font-black">87%</div>
                  </div>
                  <div className="bg-white/20 p-3 rounded-lg">
                    <div className="font-bold">Avg Session Quality</div>
                    <div className="text-2xl font-black">92%</div>
                  </div>
                  <div className="bg-white/20 p-3 rounded-lg">
                    <div className="font-bold">Active Patients</div>
                    <div className="text-2xl font-black">156</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
