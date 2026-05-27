'use client';

import { useState } from 'react';
import Image from 'next/image';
import { 
  BookOpen, 
  Trophy, 
  Palette, 
  Shield, 
  CheckCircle2, 
  ArrowRight,
  Monitor,
  Microscope,
  Library,
  Bus,
  Activity,
  Sparkles,
  Flame,
  Award
} from 'lucide-react';

interface Facility {
  title: string;
  desc: string;
  image: string;
  tag: string;
  features: string[];
  stats: {
    value: string;
    label: string;
  };
}

interface Category {
  id: string;
  title: string;
  icon: any;
  facilities: Facility[];
}

const CATEGORIES: Category[] = [
  {
    id: 'academics',
    title: 'Academics & Technology',
    icon: BookOpen,
    facilities: [
      {
        title: 'Smart Classrooms',
        desc: 'Air-conditioned digital learning studios equipped with 75-inch interactive flat panels, multimedia tools, and high-speed internet to make teaching visual, dynamic, and engaging.',
        image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1200&auto=format&fit=crop',
        tag: 'Tech-Enabled Classrooms',
        features: [
          '75-inch Interactive Flat Panels',
          'Air-Conditioned Environment',
          'Ergonomic, Child-Safe Seating',
          'Integrated LEAD School Digital Media'
        ],
        stats: { value: '100%', label: 'Smart Enabled' }
      },
      {
        title: 'Science Laboratories',
        desc: 'Advanced, fully equipped Physics, Chemistry, and Biology laboratories designed to support hands-on experimentation, analytical thinking, and scientific inquiry under expert safety supervision.',
        image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1200&auto=format&fit=crop',
        tag: 'Scientific Discovery',
        features: [
          'Separate Physics, Chemistry & Bio Zones',
          'Individual Safety Workstations',
          'Premium Equipment & Glassware',
          'Safety Showers & Evacuation Kits'
        ],
        stats: { value: '3', label: 'Specialized Labs' }
      },
      {
        title: 'Digital Library & Research Hub',
        desc: 'A sanctuary for readers containing thousands of physical volumes, encyclopedias, reference texts, along with high-speed digital research terminals for online academic journals.',
        image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1200&auto=format&fit=crop',
        tag: 'Knowledge Oasis',
        features: [
          '5,000+ Physical Books & Journals',
          'Digital Cataloging (OPAC) System',
          'Dedicated E-Learning Computer Desks',
          'Comfortable Collaborative Zones'
        ],
        stats: { value: '5,000+', label: 'Books & Resources' }
      }
    ]
  },
  {
    id: 'athletics',
    title: 'Athletics & Wellness',
    icon: Trophy,
    facilities: [
      {
        title: 'Sports & Playgrounds',
        desc: 'Vast sports grounds designed for physical fitness, outdoor activities, and coordination. Features professional-grade setups for cricket, football, basketball, and track.',
        image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200&auto=format&fit=crop',
        tag: 'Competitive Sports',
        features: [
          'Dedicated Cricket Practice Nets',
          'Full-Sized Basketball & Volleyball Courts',
          'Expansive Outdoor Football Ground',
          'Qualified Physical Education Instructors'
        ],
        stats: { value: '10+', label: 'Sports Programs' }
      },
      {
        title: 'Yoga & Meditation Hall',
        desc: 'A quiet, ventilated wellness hall dedicated to physical posture training, breathing techniques, and mental health practices to improve focus, agility, and cognitive function.',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop',
        tag: 'Holistic Health',
        features: [
          'Soft, Clean Yoga Mats Provided',
          'Acoustic-Insulated Silent Space',
          'Daily Guided Breathing Workouts',
          'Certified Yoga & Mindfulness Coaches'
        ],
        stats: { value: 'Daily', label: 'Guided Sessions' }
      }
    ]
  },
  {
    id: 'creative',
    title: 'Creative & Culture',
    icon: Palette,
    facilities: [
      {
        title: 'Multi-Purpose Auditorium',
        desc: 'A beautifully structured, acoustic-treated auditorium that serves as the center for student assemblies, theatrical acts, guest seminars, and major cultural festivals.',
        image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop',
        tag: 'Performing Arts Arena',
        features: [
          'High-Definition Projector & Screen',
          'Acoustic Soundproofing & Audio Systems',
          'Comfortable Multi-Tier Seating',
          'Spacious Changing & Rehearsal Backstage'
        ],
        stats: { value: '400+', label: 'Seat Capacity' }
      },
      {
        title: 'Karate & Activity Center',
        desc: 'Specialized spaces equipped with martial arts training equipment to teach self-defense, physical coordination, confidence, and internal discipline.',
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop',
        tag: 'Martial Arts & Dance',
        features: [
          'High-Impact Padded Safety Mats',
          'Full-Wall Alignment Mirrors',
          'Interactive Audio for Choreography',
          'Belt Grading and Sparring Gear'
        ],
        stats: { value: '2', label: 'Activity Zones' }
      },
      {
        title: 'Abacus & Cognitive Center',
        desc: 'A dedicated mental arithmetic and logic studio designed to sharpen mathematical speed, visual memory, and problem-solving through abacus kits and board games.',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
        tag: 'Brain Development',
        features: [
          'Authentic Abacus Slide Kits',
          'Strategy Games (Chess & Checkers)',
          'Logical Reasoning Puzzles',
          'Individual Progress Mentoring'
        ],
        stats: { value: '100%', label: 'Cognitive Focus' }
      }
    ]
  },
  {
    id: 'transit',
    title: 'Transit & Safety',
    icon: Shield,
    facilities: [
      {
        title: 'Safe GPS Bus Fleet',
        desc: 'A fleet of comfortable, highly secured school buses operating across all major routes of Korutla. Equipped with real-time GPS tracking, onboard CCTV, and emergency communication devices.',
        image: 'https://images.unsplash.com/photo-1557223562-6c77ef16210f?q=80&w=1200&auto=format&fit=crop',
        tag: 'Secure Commutes',
        features: [
          'Live GPS Fleet Tracking System',
          'Real-time Speed Limit Monitors',
          'Onboard Safety Cameras & Attendants',
          'Strict Route Timing Alerts for Parents'
        ],
        stats: { value: '100%', label: 'GPS Connected' }
      },
      {
        title: 'Gated Access & CCTV Grid',
        desc: 'Our highest priority is children safety. The school security grid integrates restricted perimeter access, digital visitor registries, and active continuous monitoring.',
        image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=1200&auto=format&fit=crop',
        tag: '24/7 Gated Security',
        features: [
          'RFID Student Entry-Exit Scans',
          'Gated Guard Posts with Visitor Logs',
          'Continuous CCTV Monitoring Hub',
          'Regular Safety Evacuation Audits'
        ],
        stats: { value: '24/7', label: 'Active Guarding' }
      }
    ]
  }
];

export function FacilitiesExplorer() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [activeFacilityIndex, setActiveFacilityIndex] = useState(0);

  const activeCategory = CATEGORIES[activeCategoryIndex];
  const activeFacility = activeCategory.facilities[activeFacilityIndex];

  // Helper to change category and reset facility index
  const handleCategoryChange = (index: number) => {
    setActiveCategoryIndex(index);
    setActiveFacilityIndex(0);
  };

  const CategoryIcon = activeCategory.icon;

  return (
    <div className="w-full">
      {/* Category Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {CATEGORIES.map((cat, index) => {
          const Icon = cat.icon;
          const isActive = index === activeCategoryIndex;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(index)}
              className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all duration-300 font-heading ${
                isActive 
                  ? 'bg-school-black text-white border-school-black shadow-lg shadow-black/5 scale-[1.02]' 
                  : 'bg-white hover:bg-gray-50 text-gray-600 border-gray-100'
              }`}
            >
              <div className={`p-2 rounded-lg shrink-0 ${isActive ? 'bg-school-orange/20 text-school-yellow' : 'bg-gray-100 text-gray-500'}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-xs md:text-sm font-semibold tracking-tight">{cat.title}</span>
            </button>
          );
        })}
      </div>

      {/* Explorer Panel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* Left: Facilities List & active details */}
          <div className="lg:col-span-5 p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-gray-100 flex flex-col justify-between bg-[#F9FAFB]">
            <div>
              {/* Heading */}
              <div className="flex items-center gap-2 mb-6">
                <span className="h-1.5 w-6 bg-school-orange rounded-full"></span>
                <span className="text-xs font-bold uppercase tracking-wider text-school-orange font-heading">
                  {activeCategory.title}
                </span>
              </div>

              {/* Sub-selector */}
              <div className="space-y-2 mb-8">
                {activeCategory.facilities.map((fac, idx) => {
                  const isSelected = idx === activeFacilityIndex;
                  return (
                    <button
                      key={fac.title}
                      onClick={() => setActiveFacilityIndex(idx)}
                      className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all duration-200 ${
                        isSelected 
                          ? 'bg-white border-gray-200 shadow-sm text-school-black' 
                          : 'border-transparent hover:bg-white hover:border-gray-100 text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full transition-all duration-300 ${isSelected ? 'bg-school-orange scale-125' : 'bg-gray-300'}`}></div>
                        <span className="text-sm font-bold font-heading">{fac.title}</span>
                      </div>
                      {isSelected && <ArrowRight className="w-4 h-4 text-school-orange" />}
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Content */}
              <div className="space-y-6 transition-all duration-300">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold font-heading text-school-black tracking-tight mb-3">
                    {activeFacility.title}
                  </h3>
                  <p className="text-gray-500 text-xs md:text-sm leading-relaxed font-light">
                    {activeFacility.desc}
                  </p>
                </div>

                {/* Features Grid */}
                <div className="space-y-4">
                  <h4 className="font-heading font-semibold text-xs tracking-wider uppercase text-school-black">Key Specifications</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeFacility.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm text-xs text-gray-700 font-medium">
                        <CheckCircle2 className="w-4.5 h-4.5 text-school-orange shrink-0 mt-0.5" />
                        <span className="leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Summary Footer */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-4">
              <div className="bg-school-orange/5 border border-school-orange/10 text-school-orange px-4 py-2.5 rounded-xl shrink-0">
                <span className="block text-2xl font-bold font-heading leading-none">
                  {activeFacility.stats.value}
                </span>
              </div>
              <div>
                <span className="block text-xs text-gray-400 font-medium font-heading uppercase tracking-wider">Facility Audit</span>
                <span className="block text-sm font-bold text-school-black">{activeFacility.stats.label}</span>
              </div>
            </div>
          </div>

          {/* Right: Immersive Image Frame */}
          <div className="lg:col-span-7 relative h-[320px] md:h-[450px] lg:h-auto min-h-[350px] overflow-hidden group bg-school-black">
            <Image
              src={activeFacility.image}
              alt={activeFacility.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-school-black/80 via-transparent to-school-black/30" />
            
            {/* Top Right Floating Badge */}
            <div className="absolute top-6 right-6">
              <div className="flex items-center gap-2 bg-school-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg text-white">
                <CategoryIcon className="w-4 h-4 text-school-yellow" />
                <span className="text-[10px] uppercase font-bold tracking-widest font-heading">{activeCategory.title.split(' ')[0]}</span>
              </div>
            </div>

            {/* Bottom Floating Info Glass */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 md:p-5 rounded-xl shadow-lg border border-white/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="inline-block text-[10px] font-bold text-school-orange uppercase tracking-wider bg-school-orange/10 px-2 py-0.5 rounded-md mb-1.5 font-heading">
                  {activeFacility.tag}
                </span>
                <h4 className="text-base md:text-lg font-bold font-heading text-school-black leading-tight">
                  {activeFacility.title}
                </h4>
              </div>
              <div className="flex items-center gap-2 bg-school-black hover:bg-school-orange text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors shadow-sm self-stretch sm:self-auto text-center justify-center">
                <span>Certified Infrastructure</span>
                <Award className="w-4 h-4 text-school-yellow shrink-0" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
