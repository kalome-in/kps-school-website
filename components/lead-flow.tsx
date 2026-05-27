'use client';

import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

export function LeadFlow() {
  const [activeStep, setActiveStep] = useState(0);

  const stages = [
    { step: 'A', title: 'Teacher Led Lecture', desc: 'Trained teachers deliver lessons using digital tablet resources & smartboards.', color: 'border-school-orange bg-school-orange/5 text-school-orange hover:bg-school-orange/10' },
    { step: 'B', title: 'Hands-on Activities', desc: 'Students participate in group worksheets, scientific lab experiments, and visual learning aids.', color: 'border-school-red bg-school-red/5 text-school-red hover:bg-school-red/10' },
    { step: 'C', title: 'Home Practice (LEAD Student App)', desc: 'Reinforcement exercises, quizzes, homework notifications, and learning analytics at home.', color: 'border-school-yellow bg-school-yellow/5 text-school-yellow hover:bg-school-yellow/10' },
    { step: 'D', title: 'Student Led Conferences (SLC)', desc: 'Students present their learning directly to parents to gain communication skills and analytical confidence.', color: 'border-school-black bg-school-black/5 text-school-black hover:bg-school-black/10' }
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-full">
      <div className="space-y-2 mb-6">
        <h4 className="font-heading font-bold text-sm text-school-black uppercase tracking-wider">LEAD Multimodal Learning Cycle</h4>
        <p className="text-xs text-gray-400 font-light leading-relaxed">Our cyclical pedagogic roadmap ensures continuous improvement and active knowledge absorption.</p>
      </div>

      {/* Horizontal Flow Steps for MD+ Screens, Vertical for SM Screens */}
      <div className="hidden md:flex items-center justify-between gap-2.5 relative py-6 select-none">
        {stages.map((stage, idx) => (
          <div key={idx} className="flex-1 flex items-center relative">
            <button
              onClick={() => setActiveStep(idx)}
              className={`relative z-10 w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold text-xs shrink-0 transition-all duration-300 ${
                activeStep === idx
                  ? 'scale-115 border-current shadow-md ring-4 ring-gray-100'
                  : 'opacity-70 hover:opacity-100'
              } ${stage.color}`}
            >
              {stage.step}
            </button>
            {idx < 3 && (
              <div className="flex-1 h-0.5 bg-gray-100 mx-2 relative flex items-center justify-center">
                <ChevronRight className="w-3.5 h-3.5 text-gray-300 -mt-0.5" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile Vertical Steps */}
      <div className="flex md:hidden flex-col gap-3.5 py-2">
        {stages.map((stage, idx) => (
          <button
            key={idx}
            onClick={() => setActiveStep(idx)}
            className={`flex items-center gap-3.5 p-3 rounded-xl border text-left transition-all duration-300 ${
              activeStep === idx
                ? 'border-gray-200 bg-gray-50/70 shadow-sm'
                : 'border-transparent'
            }`}
          >
            <span className={`w-8 h-8 rounded-full border flex items-center justify-center font-bold text-xs shrink-0 ${stage.color}`}>
              {stage.step}
            </span>
            <span className="text-xs font-bold text-school-black">{stage.title}</span>
          </button>
        ))}
      </div>

      {/* Description Panel of the Active Stage */}
      <div className="mt-6 p-5 rounded-2xl border border-gray-100 bg-[#F9FAFB] min-h-[95px] relative overflow-hidden transition-all duration-300">
        <div className="absolute top-2 right-4 text-xs font-bold uppercase tracking-wider text-gray-300 select-none">
          Stage {stages[activeStep].step}
        </div>
        
        <div className="animate-fadeIn space-y-1">
          <h5 className="font-bold text-sm text-school-black">{stages[activeStep].title}</h5>
          <p className="text-xs text-gray-500 leading-relaxed font-light">{stages[activeStep].desc}</p>
        </div>
      </div>
      
      <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest text-center mt-4">
        💡 Click stages to step through cycles
      </span>
    </div>
  );
}
