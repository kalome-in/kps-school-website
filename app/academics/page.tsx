import Image from 'next/image';
import { BookOpen, BrainCircuit, Activity, ChevronRight } from 'lucide-react';

export const metadata = {
  title: 'Academics | Korutla Public School',
  description: 'Explore the academic structure at Korutla Public School: Pre-Primary, Primary, and High School.',
};

export default function AcademicsPage() {
  const sections = [
    {
      id: 'preprimary',
      title: 'Pre-Primary Education',
      age: 'Nursery - UKG',
      icon: Activity,
      borderColor: 'border-school-yellow',
      iconColor: 'text-school-yellow',
      iconBg: 'bg-school-yellow/5 border-school-yellow/20',
      textColor: 'text-school-yellow',
      image: '/images/preprimary_learning.jpg',
      overview: 'Associated with the Pinnacle Curriculum (Pearson Product), our pre-primary program uses a theme-based approach that integrates English, Math, Environmental Science (EVS), Social-Emotional Learning, Music, and physical motor activities.',
      highlights: ['Pinnacle Pearson Curriculum', 'Activity-based play learning', 'English phonics & storytelling', 'Yoga & motor skill building'],
      approach: 'We focus on activity-based learning that fosters early communication basics, language skills, learning confidence, and strong conceptual understanding.',
      extraTitle: 'Theme-Based Approach Areas',
      extraItems: [
        { label: 'English Phonics & Sight Words', desc: 'Focuses on early reading, comprehension, storytelling, and active listening.' },
        { label: 'Foundational Mathematics', desc: 'Introduces counting, shapes, operations, measurement, and number understanding.' },
        { label: 'EVS (Environmental Studies)', desc: 'Exploration and hands-on experience of our surrounding world.' },
        { label: 'Social-Emotional Learning', desc: 'Encouraging caring behavior, good habits, and emotional resilience.' },
        { label: 'Music & Movement', desc: 'Expressive learning through physical movement, rhymes, and action songs.' },
        { label: 'Creative Learning & PE', desc: 'Visual arts, crafts, kids yoga, and physical motor skill development.' }
      ]
    },
    {
      id: 'primary',
      title: 'Primary School & LEAD',
      age: 'Classes I - V',
      icon: BookOpen,
      borderColor: 'border-school-orange',
      iconColor: 'text-school-orange',
      iconBg: 'bg-school-orange/5 border-school-orange/10',
      textColor: 'text-school-orange',
      image: '/images/primary_learning.jpg',
      overview: 'Integrated with the LEAD School System, the primary section delivers multi-modal, technology-enabled education to cultivate 21st-century skills. Our students participate in the LEAD Network, LEAD Championship, and Student Led Conferences (SLC). We also introduce Computer Coding Skills (CCS) for digital readiness.',
      highlights: ['LEAD School Integration', 'Computer Coding Skills (CCS)', 'Student Led Conferences (SLC)', 'LEAD Master Classes & App'],
      approach: 'We emphasize multimodal learning, communication, collaboration, exposure, and confidence. Our students study with custom learning materials and trained teachers.',
      extraTitle: 'LEAD System & Coding Advantages',
      extraItems: [
        { label: 'LEAD Championship Success', desc: '8 of our students qualified for the National LEAD Championship among 2 lakh participants.' },
        { label: 'Computer Coding Skills (CCS)', desc: 'Introducing basic coding exposure, technology education, and future-tech readiness.' },
        { label: 'Student Led Conferences (SLC)', desc: 'Empowering students to present their learning progress directly to parents.' },
        { label: 'Super Teachers & App', desc: 'Certified teachers using tablet resources, with seamless home learning via the LEAD app.' }
      ]
    },
    {
      id: 'highschool',
      title: 'High School & Foundation',
      age: 'Classes VI - X',
      icon: BrainCircuit,
      borderColor: 'border-school-red',
      iconColor: 'text-school-red',
      iconBg: 'bg-school-red/5 border-school-red/10',
      textColor: 'text-school-red',
      image: '/images/highschool_learning.jpg',
      overview: 'Alongside state board academics, we host the KPS SPECTROPY IIT-NEET Foundation program ("Filling The Learning Gap") designed to boost competitive exam preparation through planned structures, tab-based practice, and advanced standards.',
      highlights: ['ICON-IIT Batch (max 35)', 'JEE Main & Advanced standards', 'Tab-based online examinations', 'App-based video solutions'],
      approach: 'We fill the learning gap with rigorous, structured coaching, periodic weekly/monthly assessments, and digital interactive lectures, preparing students for competitive excellence.',
      extraTitle: 'Spectropy Foundation Coaching Highlights',
      extraItems: [
        { label: 'ICON-IIT Batch', desc: 'Limited batch size of 35 students for focused, competitive guidance and individual attention.' },
        { label: 'Competitive Standards', desc: 'Exams conducted on JEE Main (NIT Standard) and JEE Advanced (IIT Standard) patterns.' },
        { label: 'Online Tab Testing', desc: 'Tab-based online examinations simulating real national-level exam environments.' },
        { label: 'Video Solutions', desc: 'Instant access to step-by-step video explanations for difficult mock test questions.' }
      ]
    }
  ];

  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <section className="relative h-[45vh] min-h-[350px] flex items-center justify-center overflow-hidden bg-school-black">
        <div className="absolute inset-0 bg-dot-pattern opacity-20"></div>
        <Image 
          src="/images/hero_banner.jpg" 
          alt="Academics KPS" 
          fill
          priority
          className="object-cover opacity-35"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-school-black via-school-black/60 to-transparent" />
        <div className="relative z-10 text-center px-4 max-w-3xl space-y-4">
          <span className="inline-block px-3 py-1 rounded-md bg-white/5 text-school-orange font-semibold text-xs tracking-wider uppercase border border-white/10 backdrop-blur-sm">
            Academics
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white tracking-tight">Academic Structure</h1>
          <p className="text-sm md:text-base text-gray-400 max-w-xl mx-auto font-light leading-relaxed">A structured journey from early childhood discovery to adolescent academic mastery.</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-32">
        {sections.map((section, index) => (
          <section key={section.id} id={section.id} className="scroll-mt-32">
            <div className={`flex flex-col lg:flex-row gap-16 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              
              {/* Image Side */}
              <div className="w-full lg:w-1/2 relative">
                <div className="relative h-[380px] md:h-[450px] rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                  <Image 
                    src={section.image} 
                    alt={section.title} 
                    fill
                    className="object-cover hover:scale-103 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-6 left-6 border border-white/20 bg-black/45 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1.5 rounded-md uppercase tracking-wider">
                    {section.age}
                  </div>
                </div>
              </div>

              {/* Text Side */}
              <div className="w-full lg:w-1/2 space-y-6">
                <div>
                  <div className="inline-flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${section.iconBg} ${section.iconColor}`}>
                      <section.icon className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-heading font-bold text-school-black">{section.title}</h2>
                  </div>
                  <p className="text-sm md:text-base text-gray-500 font-light leading-relaxed">
                    {section.overview}
                  </p>
                </div>

                <div className="bg-[#F9FAFB] p-6 rounded-2xl border border-gray-100">
                  <h4 className="font-heading font-semibold text-xs tracking-wider uppercase text-school-black mb-3">
                    Learning Approach
                  </h4>
                  <p className="text-xs md:text-sm text-gray-500 leading-relaxed italic font-light">
                    {"\""}{section.approach}{"\""}
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="font-heading font-semibold text-xs tracking-wider uppercase text-school-black">Program Highlights</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {section.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                        <ChevronRight className={`w-4 h-4 shrink-0 mt-0.5 ${section.textColor}`} />
                        <span className="text-xs md:text-sm font-medium text-gray-700">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>

            {/* Custom Infographics depending on Section */}
            {/* Custom Infographics depending on Section */}
            {section.id === 'preprimary' && (
              <div className="mt-16 bg-gradient-to-br from-school-yellow/10 via-white to-school-yellow/5 rounded-3xl p-8 border border-school-yellow/20">
                <h3 className="font-heading font-extrabold text-xl text-school-black mb-8 border-b border-gray-200 pb-3 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-school-yellow animate-pulse"></span>
                  Pre-Primary Curriculum Distribution Infographic
                </h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  {/* Donut Chart Visual Infographic (Left Column) */}
                  <div className="lg:col-span-5 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center">
                    <h4 className="font-heading font-bold text-xs uppercase text-school-black tracking-wider mb-6 text-center">Curriculum Activity Allocation</h4>
                    <div className="relative w-44 h-44 flex items-center justify-center">
                      {/* SVG Circle representing ratio rings */}
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        {/* Outer Ring: Phonics 35% */}
                        <circle cx="18" cy="18" r="15.915" fill="none" stroke="#FFC107" strokeWidth="3" strokeDasharray="35 65" strokeDashoffset="100" />
                        {/* Inner 1 Ring: Math 25% */}
                        <circle cx="18" cy="18" r="13.5" fill="none" stroke="#F57C00" strokeWidth="2.8" strokeDasharray="25 75" strokeDashoffset="65" />
                        {/* Inner 2 Ring: Arts & PE 20% */}
                        <circle cx="18" cy="18" r="11" fill="none" stroke="#D32F2F" strokeWidth="2.5" strokeDasharray="20 80" strokeDashoffset="40" />
                        {/* Inner 3 Ring: EVS 20% */}
                        <circle cx="18" cy="18" r="8.5" fill="none" stroke="#222222" strokeWidth="2.2" strokeDasharray="20 80" strokeDashoffset="20" />
                      </svg>
                      {/* Center Badge */}
                      <div className="absolute text-center">
                        <span className="text-2xl font-extrabold text-school-black">Pinnacle</span>
                        <p className="text-[9px] uppercase font-bold text-school-gray tracking-wider">Curriculum</p>
                      </div>
                    </div>
                    
                    {/* Legend */}
                    <div className="grid grid-cols-2 gap-4 w-full mt-8 text-xs font-medium">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-school-yellow shrink-0"></span>
                        <span className="text-school-black">35% Phonics & ELA</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-school-orange shrink-0"></span>
                        <span className="text-school-black">25% Mathematics</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-school-red shrink-0"></span>
                        <span className="text-school-black">20% Creative & PE</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-school-black shrink-0"></span>
                        <span className="text-school-black">20% Environment</span>
                      </div>
                    </div>
                  </div>

                  {/* Themes List (Right Column) */}
                  <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: 'English & Phonics', desc: 'Active phonic sounds, sight words, reading comprehension, and storytelling.', icon: '🗣️' },
                      { label: 'Mathematics', desc: 'Counting, shape properties, basic math operations, and number lines.', icon: '🔢' },
                      { label: 'EVS Exploration', desc: 'Hands-on discovery and active experience of our surrounding environment.', icon: '🌱' },
                      { label: 'Social & Emotional', desc: 'Focusing on good habit cultivation, manners, and sharing emotions.', icon: '❤️' },
                      { label: 'Music & Movement', desc: 'Rhythms, nursery action songs, and active physical play.', icon: '🎵' },
                      { label: 'Creative & Physical', desc: 'Kids yoga, painting, visual arts, crafts, and motor skill games.', icon: '🎨' }
                    ].map((item, idx) => (
                      <div key={idx} className="bg-white p-5 rounded-xl border border-gray-100 hover:shadow-sm transition-all flex gap-3.5 items-start">
                        <span className="text-2xl bg-school-yellow/10 p-2 rounded-xl shrink-0">{item.icon}</span>
                        <div className="space-y-0.5">
                          <h4 className="font-heading font-bold text-xs text-school-black">{item.label}</h4>
                          <p className="text-[11px] text-gray-400 font-light leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {section.id === 'primary' && (
              <div className="mt-16 bg-gradient-to-br from-school-orange/10 via-white to-school-orange/5 rounded-3xl p-8 border border-school-orange/20">
                <h3 className="font-heading font-extrabold text-xl text-school-black mb-8 border-b border-gray-200 pb-3 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-school-orange animate-pulse"></span>
                  LEAD Advantage & Curriculum Pipeline Infographic
                </h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                  {/* Left Column: National Championship comparison bar */}
                  <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between space-y-4">
                    <div>
                      <h4 className="font-heading font-bold text-sm text-school-black uppercase tracking-wider mb-2">National LEAD Championship Standings</h4>
                      <p className="text-xs text-gray-400 font-light leading-relaxed mb-6">Our students compete at high standards among elite national schools.</p>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-[10px] font-bold text-gray-400">
                          <span>Total Competitors</span>
                          <span>200,000 Students</span>
                        </div>
                        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-gray-300 w-full"></div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-[10px] font-bold text-school-orange">
                          <span>Elite Qualifiers</span>
                          <span>2,000 Finalists</span>
                        </div>
                        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-school-orange w-[15%]"></div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-[10px] font-bold text-school-red">
                          <span>KPS National Finalists</span>
                          <span className="font-extrabold">8 Students Qualified</span>
                        </div>
                        <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-school-orange to-school-red w-[5%] animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-400 leading-relaxed font-light pt-4 border-t border-gray-50">
                      Our interactive primary curriculum prepares students for national competitions, allowing **8 KPS students** to secure ranks in the elite top finals of the country.
                    </p>
                  </div>

                  {/* Right Column: LEAD Multimodal Learning Pipeline (Flow Diagram) */}
                  <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
                    <h4 className="font-heading font-bold text-sm text-school-black uppercase tracking-wider mb-6">LEAD Multimodal Learning Cycle</h4>
                    
                    <div className="space-y-4 relative">
                      {[
                        { step: 'A', title: 'Teacher Led Lecture', desc: 'Trained teachers deliver lessons using digital tablet resources & smartboards.', color: 'border-school-orange bg-school-orange/5 text-school-orange' },
                        { step: 'B', title: 'Hands-on Activities', desc: 'Students participate in group worksheets and visual learning aids.', color: 'border-school-red bg-school-red/5 text-school-red' },
                        { step: 'C', title: 'Home Practice (LEAD Student App)', desc: 'Reinforcement exercises, quizzes, and learning analytics at home.', color: 'border-school-yellow bg-school-yellow/5 text-school-yellow' },
                        { step: 'D', title: 'Student Led Conferences (SLC)', desc: 'Students present their learning directly to parents to gain confidence.', color: 'border-school-black bg-school-black/5 text-school-black' }
                      ].map((stage, idx) => (
                        <div key={idx} className="flex gap-4 items-start relative">
                          {idx < 3 && <span className="absolute left-4 top-8 w-0.5 h-12 bg-gray-100 z-0"></span>}
                          <div className={`w-8 h-8 rounded-full border flex items-center justify-center font-bold text-xs shrink-0 z-10 relative ${stage.color}`}>
                            {stage.step}
                          </div>
                          <div className="space-y-0.5">
                            <h5 className="font-bold text-xs text-school-black">{stage.title}</h5>
                            <p className="text-[11px] text-gray-400 leading-relaxed font-light">{stage.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {section.id === 'highschool' && (
              <div className="mt-16 bg-gradient-to-br from-school-red/10 via-white to-school-red/5 rounded-3xl p-8 border border-school-red/20">
                <h3 className="font-heading font-extrabold text-xl text-school-black mb-8 border-b border-gray-200 pb-3 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-school-red animate-pulse"></span>
                  KPS Spectropy IIT-NEET Pathway & Score Impact
                </h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                  {/* Left Column: Numbered Pipeline */}
                  <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { step: '01', title: 'ICON-IIT Batch', desc: 'Max 35 selected students per batch for focused, personal coaching.', icon: '🎯' },
                      { step: '02', title: 'Curriculum & Material', desc: 'Comprehensive foundation-oriented prep content and reference guides.', icon: '📚' },
                      { step: '03', title: 'Online Tab Testing', desc: 'Weekly/monthly exams conducted on tablets to simulate JEE patterns.', icon: '📱' },
                      { step: '04', title: 'Video Solutions', desc: 'Instant access to mock test video solutions for clearing learning gaps.', icon: '🎬' }
                    ].map((item, idx) => (
                      <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group hover:border-school-red transition-all flex flex-col justify-between">
                        <span className="absolute -right-2 -bottom-2 text-6xl font-extrabold text-gray-100/60 font-heading select-none group-hover:text-school-red/5 transition-colors">{item.step}</span>
                        <div className="space-y-3 relative z-10">
                          <span className="text-3xl bg-school-red/5 p-2 rounded-xl inline-block">{item.icon}</span>
                          <div className="space-y-1">
                            <h4 className="font-heading font-bold text-sm text-school-black">{item.title}</h4>
                            <p className="text-xs text-gray-400 font-light leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Right Column: Learning Gap Impact Metric Infographic */}
                  <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between space-y-6">
                    <div>
                      <h4 className="font-heading font-bold text-sm text-school-black uppercase tracking-wider mb-2">Performance & Learning Gap Index</h4>
                      <p className="text-xs text-gray-400 font-light leading-relaxed">Comparison of students score gains on JEE/NEET patterns using our method.</p>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-bold text-gray-400">
                          <span>Without IIT Foundation (Traditional)</span>
                          <span className="text-gray-400">45% Average</span>
                        </div>
                        <div className="relative w-full h-4 bg-gray-100 rounded-lg overflow-hidden">
                          <div className="absolute top-0 left-0 h-full bg-gray-300 rounded-lg w-[45%]"></div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-bold text-school-red">
                          <span>KPS Spectropy Foundation Program</span>
                          <span className="font-extrabold">92% Average</span>
                        </div>
                        <div className="relative w-full h-4 bg-gray-100 rounded-lg overflow-hidden">
                          <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-school-orange to-school-red rounded-lg w-[92%] animate-pulse"></div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-school-red/5 border border-school-red/10 text-xs text-school-red font-semibold leading-relaxed">
                      💡 Spectropy is designed specifically to fill the learning gaps of standard curriculum textbooks, enhancing analytical reasoning by 2x.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
