'use client';

import { useState } from 'react';
import Image from 'next/image';
import { 
  BookOpen, 
  Trophy, 
  Shield, 
  Smartphone,
  CheckCircle2, 
  ArrowRight,
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
    title: 'Academics & Tech',
    icon: BookOpen,
    facilities: [
      {
        title: 'Multi-Modal TV Classrooms',
        desc: 'Interactive visual learning classrooms integrated with high-definition digital TVs. Standard lessons are animated through 3D models and multi-sensory educational videos to maximize concept absorption.',
        image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1200&auto=format&fit=crop',
        tag: 'Visual Learning',
        features: [
          'High-Definition Smart TV Displays',
          'LEAD-curriculum Multi-Sensory Videos',
          'Concept Visualizations & 3D Demos',
          'Enhanced Student Focus & Retention'
        ],
        stats: { value: '100%', label: 'TV Enabled' }
      },
      {
        title: 'CBT Tab Testing',
        desc: 'Regular Computer-Based Tests (CBT) conducted via dedicated high-speed school tablets. Prepares students for the digital future with self-paced testing, adaptive quizzes, and immediate performance analytics.',
        image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=1200&auto=format&fit=crop',
        tag: 'Digital Assessment',
        features: [
          'Dedicated High-Speed Tablets',
          'Instant Scoring & Performance Analytics',
          'Adaptive Topic-wise Question Banks',
          'Interactive, Stress-free Testing'
        ],
        stats: { value: 'Individual', label: 'Tablet Testing' }
      },
      {
        title: 'Abacus & Penmanship Academy',
        desc: 'Cognitive and artistic refinement studio. Focuses on mental mathematics speed using Abacus kits, alongside elegant handwriting, calligraphy, and Lucida cursive writing styles.',
        image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1200&auto=format&fit=crop',
        tag: 'Cognitive & Art',
        features: [
          'Hands-on Abacus Mental Math Training',
          'Calligraphy & Handwriting Practice',
          'Lucida Cursive Styling Mastery',
          'Fine Motor Skill Development'
        ],
        stats: { value: 'Weekly', label: 'Creative Classes' }
      }
    ]
  },
  {
    id: 'athletics',
    title: 'Athletics & Clubs',
    icon: Trophy,
    facilities: [
      {
        title: 'Taekwondo & Karate Classes',
        desc: 'Professional martial arts training zones designed to teach self-defense techniques, physical coordination, endurance, discipline, and building child self-confidence.',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop',
        tag: 'Self-Defense',
        features: [
          'Professional Padded Safety Sparring Zones',
          'Certified Martial Arts Instructors',
          'Belt Grading and Sparring Gear Sets',
          'Physical Fitness & Coordination Drills'
        ],
        stats: { value: '2', label: 'Martial Arts' }
      },
      {
        title: 'Yoga & Bhagavad Gita Classes',
        desc: 'Nurturing spiritual growth, flexibility, and character building. Integrates calming Yoga postures (asanas) with the timeless ethical and moral values from the Bhagavad Gita.',
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop',
        tag: 'Mind & Spirit',
        features: [
          'Guided Postures & Meditation Practices',
          'Bhagavad Gita Moral Discourse Hours',
          'Calm, Acoustic-Insulated Spaces',
          'Character-Building & Ethical Guidance'
        ],
        stats: { value: 'Daily', label: 'Guided Focus' }
      },
      {
        title: 'Chess Classes',
        desc: 'Strategic logic and analytical training. Students learn chess tactics and strategic planning to build math proficiency, spatial reasoning, and critical thinking skills.',
        image: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?q=80&w=1200&auto=format&fit=crop',
        tag: 'Mental Strategy',
        features: [
          'FIDE-Standard Tourney Chess Sets',
          'Guided Opening & Middle-game Tactics',
          'Weekly Intra-School Chess Matches',
          'Spatial Reasoning & Cognitive Focus'
        ],
        stats: { value: 'Weekly', label: 'Chess Coaching' }
      }
    ]
  },
  {
    id: 'transit',
    title: 'Transit & Safety',
    icon: Shield,
    facilities: [
      {
        title: 'Dual Student Biometrics',
        desc: 'High-security campus checkpoints featuring dual student biometric authentication. Integrates instant facial recognition and fingerprint scanning for absolute campus security.',
        image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=1200&auto=format&fit=crop',
        tag: 'Biometric Security',
        features: [
          'Instant Facial Biometric Verification',
          'Fingerprint Biometric Log Terminals',
          'Automated Gated Entry/Exit Scans',
          'Restricted Perimeter Visitor Access'
        ],
        stats: { value: '100%', label: 'Secure Checkpoints' }
      },
      {
        title: 'Safe GPS Bus Fleet',
        desc: 'Comfortable, highly secured school transportation facility with GPS-enabled transit tracking. Reaches all major boarding routes across Korutla with onboard safety attendants.',
        image: 'https://images.unsplash.com/photo-1557223562-6c77ef16210f?q=80&w=1200&auto=format&fit=crop',
        tag: 'Transit Facility',
        features: [
          'Real-time GPS Location Tracking',
          'Onboard Safety Cameras & Attendants',
          'Direct Route Alert Sync for Parents',
          'Strict Speed Limit Monitoring'
        ],
        stats: { value: '100%', label: 'GPS Connected' }
      }
    ]
  },
  {
    id: 'digital',
    title: 'Digital Connect',
    icon: Smartphone,
    facilities: [
      {
        title: 'WhatsApp Parent Sync',
        desc: 'Direct, automated parent communication. Automatically sends instant WhatsApp notifications for student attendance logs (entry/exit times) and regular academic progress updates.',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop',
        tag: 'WhatsApp Alerts',
        features: [
          'Automated WhatsApp Attendance Alerts',
          'Instant Absence Notifications to Parents',
          'Periodic Academic Progress Reports',
          'Direct Notifications & Notices Delivery'
        ],
        stats: { value: 'Real-time', label: 'WhatsApp Alerts' }
      },
      {
        title: 'Student & Parent Apps',
        desc: 'Unified, secure school mobile applications. Provides immediate mobile access to class schedules, lesson progress, homework logs, progress reports, and hassle-free fee payments.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
        tag: 'Mobile App Portals',
        features: [
          'Dedicated Parent App for School Updates',
          'Student App for Schedules & Homework',
          'Safe and Secure Online Fee Payments',
          'Direct Push Notifications for Notices'
        ],
        stats: { value: '2 Apps', label: 'Android & iOS' }
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 w-full">
        {CATEGORIES.map((cat, index) => {
          const Icon = cat.icon;
          const isActive = index === activeCategoryIndex;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(index)}
              className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all duration-300 font-heading cursor-pointer ${
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
      <div className="w-full mt-10">
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
                      className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                        isSelected 
                          ? 'bg-white border-gray-200 shadow-sm text-school-black font-semibold' 
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
                <span className="block text-xs text-gray-400 font-medium font-heading uppercase tracking-wider">Facility Status</span>
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
              className="object-cover group-hover:scale-102 transition-transform duration-700 opacity-90"
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
