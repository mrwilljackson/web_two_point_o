
import { Clock, PlayCircle } from "lucide-react";
import beforeImage from "../assets/before-image.png";
import afterImage from "../assets/after-image.png";

const ProblemSolution = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-4 py-2 rounded-full text-sm font-bold mb-6">
            <Clock className="inline-block mr-2" size={16} />
            BEFORE / AFTER
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            From Daily Struggle to 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Treatment Success</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            See how Playphysio transforms treatment for real families.
          </p>
        </div>

        {/* Main Comparison Container */}
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* BEFORE Side - Treatment Struggles */}
          <div className="relative">
            {/* Background Image */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={beforeImage.src}
                alt="Family struggling with treatment - before Playphysio"
                className="w-full h-full object-cover"
              />

              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-black/10"></div>
            </div>

            {/* Floating Callout Boxes - Repositioned to prevent overlap */}
            <div className="absolute -top-6 -left-16 z-10">
              <div className="bg-slate-800 text-white p-4 rounded-2xl shadow-xl max-w-xs transform -rotate-2 border-2 border-gray-400">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="text-orange-400" size={20} />
                  <span className="font-bold text-orange-400">We get it. Treatment time is HARD</span>
                </div>
                <p className="text-sm text-slate-300">Families face daily struggles</p>
              </div>
            </div>

            <div className="absolute top-4 -right-8 z-10">
              <div className="bg-slate-700 text-white p-3 rounded-xl shadow-lg max-w-48 transform rotate-1 border-2 border-gray-400">
                <h4 className="font-bold text-sm mb-1">Treatment Avoidance</h4>
                <p className="text-xs text-slate-300">Kids naturally resist daily out of repetitive boring treatment.</p>
              </div>
            </div>

            <div className="absolute top-40 -left-30 z-10">
              <div className="bg-slate-800 text-white p-3 rounded-xl shadow-lg max-w-44 transform -rotate-350 border-2 border-gray-400">
                <h4 className="font-bold text-sm mb-1">Family Stress</h4>
                <p className="text-xs text-slate-300">Treatment is hard for everyone in the family, high stress and arguments.</p>
              </div>
            </div>

            <div className="absolute bottom-34 -right-6 z-10">
              <div className="bg-slate-700 text-white p-3 rounded-xl shadow-lg max-w-52 transform rotate-10 border-2 border-gray-400">
                <h4 className="font-bold text-sm mb-1">Inconsistent Results</h4>
                <p className="text-xs text-slate-300">Confused about doing it correctly gives poor results.</p>
              </div>
            </div>

            {/* Main Quote */}
            <div className="absolute bottom-4 left-4 right-4 z-20">
              <div className="bg-slate-900/90 backdrop-blur-sm text-white p-4 rounded-xl border border-slate-600">
                <p className="text-lg italic font-medium">"Treatment feels like a daily hostage negotiation"</p>
                <p className="text-sm text-slate-400 mt-1">"We all dread that time of day"</p>
                <p className="text-xs text-slate-400 mt-1 font-bold">Parents before Playphysio</p>
              </div>
            </div>
          </div>

          {/* AFTER Side - Treatment Success */}
          <div className="relative">
            {/* Background Image */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={afterImage.src}
                alt="Happy family enjoying treatment with Playphysio"
                className="w-full h-full object-cover"
              />

              {/* Light overlay */}
              <div className="absolute inset-0 bg-white/20"></div>
            </div>

            {/* Floating Callout Boxes - Repositioned to prevent overlap */}
            <div className="absolute -top-6 -right-6 z-10">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-2xl shadow-xl max-w-xs transform rotate-2 border-2 border-white">
                <div className="flex items-center gap-2 mb-2">
                  <PlayCircle className="text-yellow-300" size={20} />
                  <span className="font-bold text-yellow-300">Make treatment EASY</span>
                </div>
                <p className="text-sm text-purple-100">Family life is better for everyone</p>
              </div>
            </div>

            <div className="absolute top-1 -left-8 z-10">
              <div className="bg-gradient-to-br from-green-400 to-green-600 text-white p-3 rounded-xl shadow-lg max-w-48 transform -rotate-350 border-2 border-white">
                <h4 className="font-bold text-sm mb-1 text-green-100">Life is easier</h4>
                <p className="text-xs text-green-100">Treatment time is easy because your child decides that they want to play physio games.</p>
              </div>
            </div>

            <div className="absolute top-50 -right-20 z-10">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-3 rounded-xl shadow-lg max-w-64 transform rotate-5 border-2 border-white">
                <h4 className="font-bold text-sm mb-1">I want to do it!</h4>
                <p className="text-xs text-blue-100">Kids are eager to try another game or to top the high scores and level up!</p>
              </div>
            </div>

            <div className="absolute bottom-34 -left-6 z-10">
              <div className="bg-gradient-to-br from-orange-400 to-orange-600 text-white p-3 rounded-xl shadow-lg max-w-52 transform -rotate-12 border-2 border-white">
                <h4 className="font-bold text-sm mb-1">Therapy is Better</h4>
                <p className="text-xs text-orange-100">Engaged, happy kids do more therapy and they do it better when they choose to play.</p>
              </div>
            </div>

            {/* Main Quote */}
            <div className="absolute bottom-2 left-4 right-4 z-20">
              <div className="bg-white/95 backdrop-blur-sm text-purple-700 p-4 rounded-xl border border-purple-200 shadow-lg">
                <p className="text-lg italic font-medium text-purple-800">"Playphysio = PlayBrilliant!"</p>
                <p className="text-sm text-purple-600 mt-1">"I can't imagine going back to the old way of doing treatment"</p>
                <p className="text-xs text-purple-500 mt-1 font-bold">Parents after using Playphysio</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProblemSolution;
