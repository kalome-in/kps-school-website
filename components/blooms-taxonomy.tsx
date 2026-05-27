'use client';

import { useState } from 'react';

export function BloomsTaxonomy() {
  const [activeTier, setActiveTier] = useState('create');

  const tiers = [
    { id: 'create', label: '1. Create (Creative Synthesis)', color: 'text-[#D32F2F] border-[#D32F2F]/20 bg-[#D32F2F]/5', desc: 'Developing new problem-solving shortcuts and original proofs for JEE/NEET questions.' },
    { id: 'evaluate', label: '2. Evaluate (Critical Reasoning)', color: 'text-[#F57C00] border-[#F57C00]/20 bg-[#F57C00]/5', desc: 'Analyzing different methods to solve a single mathematical problem and judging the fastest pathway.' },
    { id: 'analyze', label: '3. Analyze (Concept Diagnostics)', color: 'text-[#FFC107] border-[#FFC107]/20 bg-[#FFC107]/5', desc: 'Using AI Diagnostic charts to break down complex organic reactions or physics word problems into core principles.' },
    { id: 'apply', label: '4. Apply (Mock Test Practice)', color: 'text-indigo-600 border-indigo-200 bg-indigo-50/50', desc: 'Applying chemical laws and calculus concepts in mock test scenarios on tablets.' },
    { id: 'understand', label: '5. Understand (Logical Mapping)', color: 'text-emerald-600 border-emerald-200 bg-emerald-50/50', desc: 'Explaining physical and chemical phenomena in classrooms through concept maps.' },
    { id: 'remember', label: '6. Remember (Formula Retrieval)', color: 'text-gray-600 border-gray-200 bg-gray-50', desc: 'Quickly recalling periodic tables, calculus formulas, and physical constants.' }
  ];

  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Description & Interactive Controller */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <h4 className="font-heading font-extrabold text-lg text-school-black uppercase tracking-wider flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-school-red animate-pulse"></span>
              Bloom&apos;s Taxonomy Framework
            </h4>
            <p className="text-xs md:text-sm text-gray-500 font-light leading-relaxed">
              Spectropy coaching is structured around the cognitive levels of Bloom&apos;s Taxonomy. Rather than focusing solely on memory recall, we train high schoolers to evaluate and create logical proofs, building true competitive readiness.
            </p>
          </div>
          
          <div className="space-y-3">
            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Interactive Study Levels</p>
            <div className="flex flex-col gap-2">
              {tiers.map((tier) => (
                <button
                  key={tier.id}
                  onClick={() => setActiveTier(tier.id)}
                  className={`text-left p-3.5 rounded-xl border text-xs font-semibold transition-all duration-300 ${
                    activeTier === tier.id
                      ? `${tier.color} shadow-sm translate-x-1 border-current`
                      : 'border-gray-50 hover:border-gray-200 text-gray-500 hover:bg-gray-50/50'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span>{tier.label}</span>
                    {activeTier === tier.id && <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping"></span>}
                  </div>
                  {activeTier === tier.id && (
                    <p className="mt-2 text-[11px] font-light leading-relaxed text-gray-500 transition-opacity duration-300 animate-fadeIn">
                      {tier.desc}
                    </p>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Visual SVG Pyramid Diagram */}
        <div className="lg:col-span-7 flex justify-center items-center">
          <div className="relative w-full max-w-md aspect-square bg-[#F9FAFB] rounded-2xl border border-gray-100 p-8 flex flex-col items-center justify-center">
            <svg viewBox="0 0 100 85" className="w-full h-auto drop-shadow-md select-none">
              {/* Create - Top Level */}
              <polygon
                points="50,5 57,17 43,17"
                onClick={() => setActiveTier('create')}
                className={`cursor-pointer transition-all duration-300 ${
                  activeTier === 'create' ? 'fill-[#D32F2F] opacity-100 scale-103 origin-[50%_11%]' : 'fill-[#D32F2F]/80 hover:fill-[#D32F2F]'
                }`}
              />
              <text x="50" y="14" textAnchor="middle" className="text-[2.8px] font-extrabold fill-white select-none pointer-events-none uppercase tracking-widest">Create</text>

              {/* Evaluate */}
              <polygon
                points="43,18 57,18 64,30 36,30"
                onClick={() => setActiveTier('evaluate')}
                className={`cursor-pointer transition-all duration-300 ${
                  activeTier === 'evaluate' ? 'fill-[#F57C00] opacity-100 scale-103 origin-[50%_24%]' : 'fill-[#F57C00]/80 hover:fill-[#F57C00]'
                }`}
              />
              <text x="50" y="26" textAnchor="middle" className="text-[2.8px] font-extrabold fill-white select-none pointer-events-none uppercase tracking-widest">Evaluate</text>

              {/* Analyze */}
              <polygon
                points="36,31 64,31 71,43 29,43"
                onClick={() => setActiveTier('analyze')}
                className={`cursor-pointer transition-all duration-300 ${
                  activeTier === 'analyze' ? 'fill-[#FFC107] opacity-100 scale-103 origin-[50%_37%]' : 'fill-[#FFC107]/80 hover:fill-[#FFC107]'
                }`}
              />
              <text x="50" y="39" textAnchor="middle" className="text-[2.8px] font-extrabold fill-school-black select-none pointer-events-none uppercase tracking-widest">Analyze</text>

              {/* Apply */}
              <polygon
                points="29,44 71,44 78,56 22,56"
                onClick={() => setActiveTier('apply')}
                className={`cursor-pointer transition-all duration-300 ${
                  activeTier === 'apply' ? 'fill-indigo-600 opacity-100 scale-103 origin-[50%_50%]' : 'fill-indigo-500/80 hover:fill-indigo-500'
                }`}
              />
              <text x="50" y="52" textAnchor="middle" className="text-[2.8px] font-extrabold fill-white select-none pointer-events-none uppercase tracking-widest">Apply</text>

              {/* Understand */}
              <polygon
                points="22,57 78,57 85,69 15,69"
                onClick={() => setActiveTier('understand')}
                className={`cursor-pointer transition-all duration-300 ${
                  activeTier === 'understand' ? 'fill-emerald-600 opacity-100 scale-103 origin-[50%_63%]' : 'fill-emerald-500/80 hover:fill-emerald-500'
                }`}
              />
              <text x="50" y="65" textAnchor="middle" className="text-[2.8px] font-extrabold fill-white select-none pointer-events-none uppercase tracking-widest">Understand</text>

              {/* Remember */}
              <polygon
                points="15,70 85,70 92,82 8,82"
                onClick={() => setActiveTier('remember')}
                className={`cursor-pointer transition-all duration-300 ${
                  activeTier === 'remember' ? 'fill-gray-600 opacity-100 scale-103 origin-[50%_76%]' : 'fill-gray-500/80 hover:fill-gray-500'
                }`}
              />
              <text x="50" y="78" textAnchor="middle" className="text-[2.8px] font-extrabold fill-white select-none pointer-events-none uppercase tracking-widest">Remember</text>
            </svg>

            {/* Micro instructions badge */}
            <span className="absolute bottom-4 text-[9px] text-gray-400 font-bold uppercase tracking-widest">
              💡 Click tiers to explore
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
