'use client';

import { useState } from 'react';

export function CurriculumDonut() {
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);

  const segments = [
    { id: 'phonics', label: '35% Phonics & ELA', value: 35, stroke: '#FFC107', offset: 100, desc: 'Phonics-based reading, sight words, storytelling, and early vocabulary building.' },
    { id: 'math', label: '25% Mathematics', value: 25, stroke: '#F57C00', offset: 65, desc: 'Concrete-Pictorial-Abstract (CPA) math approach for foundational number sense.' },
    { id: 'creative', label: '20% Creative & PE', value: 20, stroke: '#D32F2F', offset: 40, desc: 'Visual arts, children\'s yoga, gross motor coordination activities, and active play.' },
    { id: 'env', label: '20% Environment & EVS', value: 20, stroke: '#222222', offset: 20, desc: 'Self-discovery themes, hygiene habits, plant and animal observation projects.' }
  ];

  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center">
      <h4 className="font-heading font-bold text-xs uppercase text-school-black tracking-wider mb-6 text-center">Curriculum Activity Allocation</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center w-full">
        {/* Donut Visual */}
        <div className="md:col-span-5 flex flex-col items-center justify-center relative">
          <div className="relative w-44 h-44 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90 select-none" viewBox="0 0 36 36">
              {/* Phonics Segment */}
              <circle
                cx="18"
                cy="18"
                r="15.915"
                fill="none"
                stroke="#FFC107"
                strokeWidth="3.2"
                strokeDasharray="35 65"
                strokeDashoffset="100"
                onMouseEnter={() => setHoveredSegment('phonics')}
                onMouseLeave={() => setHoveredSegment(null)}
                className={`cursor-pointer transition-all duration-300 ${
                  hoveredSegment === 'phonics' ? 'stroke-[3.8px] scale-102 origin-center' : 'opacity-85'
                }`}
              />
              {/* Math Segment */}
              <circle
                cx="18"
                cy="18"
                r="13.5"
                fill="none"
                stroke="#F57C00"
                strokeWidth="3"
                strokeDasharray="25 75"
                strokeDashoffset="65"
                onMouseEnter={() => setHoveredSegment('math')}
                onMouseLeave={() => setHoveredSegment(null)}
                className={`cursor-pointer transition-all duration-300 ${
                  hoveredSegment === 'math' ? 'stroke-[3.6px] scale-102 origin-center' : 'opacity-85'
                }`}
              />
              {/* Creative Segment */}
              <circle
                cx="18"
                cy="18"
                r="11.0"
                fill="none"
                stroke="#D32F2F"
                strokeWidth="2.8"
                strokeDasharray="20 80"
                strokeDashoffset="40"
                onMouseEnter={() => setHoveredSegment('creative')}
                onMouseLeave={() => setHoveredSegment(null)}
                className={`cursor-pointer transition-all duration-300 ${
                  hoveredSegment === 'creative' ? 'stroke-[3.4px] scale-102 origin-center' : 'opacity-85'
                }`}
              />
              {/* Environmental Segment */}
              <circle
                cx="18"
                cy="18"
                r="8.5"
                fill="none"
                stroke="#222222"
                strokeWidth="2.5"
                strokeDasharray="20 80"
                strokeDashoffset="20"
                onMouseEnter={() => setHoveredSegment('env')}
                onMouseLeave={() => setHoveredSegment(null)}
                className={`cursor-pointer transition-all duration-300 ${
                  hoveredSegment === 'env' ? 'stroke-[3.1px] scale-102 origin-center' : 'opacity-85'
                }`}
              />
            </svg>
            
            {/* Center Text */}
            <div className="absolute text-center">
              <span className="text-xl font-extrabold text-school-black">Pinnacle</span>
              <p className="text-[9px] uppercase font-bold text-school-gray tracking-wider">Curriculum</p>
            </div>
          </div>
          <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-4">
            💡 Hover segments to details
          </span>
        </div>

        {/* Legend & Details */}
        <div className="md:col-span-7 space-y-4">
          <div className="grid grid-cols-2 gap-3 text-[11px] font-semibold">
            {segments.map((seg) => (
              <button
                key={seg.id}
                onMouseEnter={() => setHoveredSegment(seg.id)}
                onMouseLeave={() => setHoveredSegment(null)}
                className={`flex items-center gap-2.5 p-2 rounded-xl text-left border transition-all duration-200 ${
                  hoveredSegment === seg.id
                    ? 'border-gray-200 bg-gray-50/70 shadow-sm translate-x-0.5'
                    : 'border-transparent'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: seg.stroke }}></span>
                <span className="text-school-black">{seg.label}</span>
              </button>
            ))}
          </div>

          {/* Segment Details Box */}
          <div className="p-4 rounded-xl border border-gray-100 bg-[#F9FAFB] min-h-[75px] transition-all duration-300">
            {hoveredSegment ? (
              <div className="animate-fadeIn">
                <h5 className="text-[11px] font-bold uppercase tracking-wider text-school-black mb-1">
                  {segments.find(s => s.id === hoveredSegment)?.label}
                </h5>
                <p className="text-[11px] text-gray-500 font-light leading-relaxed">
                  {segments.find(s => s.id === hoveredSegment)?.desc}
                </p>
              </div>
            ) : (
              <div className="text-gray-400 font-light text-xs italic flex items-center justify-center h-full pt-2">
                Hover over a segment or legend item to view foundational activity goals.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
