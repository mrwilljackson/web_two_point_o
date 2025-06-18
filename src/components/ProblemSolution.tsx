import { AlertTriangle, Heart, Shield, TrendingUp, Users, Clock, Stethoscope } from "lucide-react";

const ProblemSolution = () => {
  return (
    <section className="min-h-screen bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Diagonal Split Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-red-700/10 transform -skew-y-1 origin-top-left"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-purple-900/20 to-blue-800/10 transform skew-y-1 origin-bottom-right"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Powerful Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-red-500/20 border border-red-400/30 px-6 py-3 rounded-sm mb-6">
            <span className="text-red-300 font-semibold uppercase tracking-wider text-sm">Critical Healthcare Challenge</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
            The Treatment Crisis
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              vs. The Solution
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Every day, thousands of families struggle with respiratory treatment adherence. 
            The impact on patients and healthcare systems is not visible — until now.
          </p>
        </div>

        {/* Dramatic Before/After Split */}
        <div className="grid lg:grid-cols-2 gap-0 border border-slate-600">
          {/* BEFORE - Crisis Side */}
          <div className="bg-gradient-to-br from-red-950 to-red-900 p-12 relative">
            {/* Crisis Header */}
            <div className="flex items-center gap-4 mb-8 border-b border-red-700 pb-6">
              <div className="p-3 bg-red-800/50 border border-red-600">
                <AlertTriangle className="text-red-300" size={32} />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-red-200 uppercase tracking-wide">The Crisis</h3>
                <p className="text-red-400 text-lg">Current Respiratory Healthcare Reality</p>
              </div>
            </div>

            {/* Crisis Image */}
            <div className="mb-8 relative">
              <img 
                src="https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=600&h=300&fit=crop" 
                alt="Family struggling with treatment"
                className="w-full h-48 object-cover filter grayscale contrast-125"
              />
              <div className="absolute inset-0 bg-red-900/60 flex items-center justify-center">
                <div className="text-center bg-black/50 p-4 border border-red-500">
                  <p className="text-red-200 font-bold text-lg">"I don't want to do it..."</p>
                  <p className="text-red-400 text-sm">Daily treatment resistance</p>
                </div>
              </div>
            </div>

            {/* Crisis Statistics */}
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 bg-red-900/30 border-l-4 border-red-500">
                <Clock className="text-red-400 mt-1" size={20} />
                <div>
                  <p className="text-red-200 font-bold text-lg">Poor Adherence Rates</p>
                  <p className="text-red-400">No one knows how many daily treatments are completed</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-red-900/30 border-l-4 border-red-500">
                <Users className="text-red-400 mt-1" size={20} />
                <div>
                  <p className="text-red-200 font-bold text-lg">Family Stress</p>
                  <p className="text-red-400">A daily struggle through battles and emotional exhaustion</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-red-900/30 border-l-4 border-red-500">
                <Stethoscope className="text-red-400 mt-1" size={20} />
                <div>
                  <p className="text-red-200 font-bold text-lg">Clinical Concerns</p>
                  <p className="text-red-400">Children can't benefit from prescribed treatments</p>
                </div>
              </div>
            </div>
          </div>

          {/* AFTER - Solution Side */}
          <div className="bg-white p-12 relative text-gray-900">
            {/* Solution Header */}
            <div className="flex items-center gap-4 mb-8 border-b border-gray-200 pb-6">
              <div className="w-14 h-14">
                <img
                  src="/images/playphysio-p-logo.svg"
                  alt="Playphysio Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent uppercase tracking-wide">The Solution</h3>
                <p className="text-gray-600 text-lg">Playphysio - Make Treatment Serious Fun</p>
              </div>
            </div>

            {/* Solution Image */}
            <div className="mb-8 relative">
              <img 
                src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&h=300&fit=crop" 
                alt="Child engaged with Playphysio"
                className="w-full h-48 object-cover brightness-110 rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                <div className="text-center bg-white/90 p-4 rounded-lg border-2 border-blue-200">
                  <p className="text-blue-700 font-bold text-lg">"Is it time for Playphysio yet?"</p>
                  <p className="text-blue-600 text-sm">Eager anticipation of treatment</p>
                </div>
              </div>
            </div>

            {/* Solution Results */}
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                <TrendingUp className="text-green-600 mt-1" size={20} />
                <div>
                  <p className="font-bold text-lg bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Transforming Adherence Levels</p>
                  <p className="text-green-700">Children actively request their therapy sessions</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                <Heart className="text-blue-600 mt-1" size={20} />
                <div>
                  <p className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Family Harmony</p>
                  <p className="text-blue-700">Now stress-free treatment time becomes easy routine</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                <Shield className="text-purple-600 mt-1" size={20} />
                <div>
                  <p className="font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Clinical Excellence</p>
                  <p className="text-purple-700">Quality of life and quality of therapy is improved</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Statement */}
        <div className="text-center mt-16 p-8 bg-gradient-to-r from-purple-900/50 to-blue-900/50 border border-purple-700">
          <h3 className="text-3xl font-bold text-white mb-4">The Evidence is Clear</h3>
          <p className="text-xl text-slate-300 max-w-4xl mx-auto">
            Playphysio doesn't just improve adherence—it transforms the entire treatment experience, 
            delivering measurable results for patients, families, and healthcare providers.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
