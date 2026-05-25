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
      image: 'seed/preprimary/1200/800',
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
      image: 'seed/primary/1200/800',
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
      image: 'seed/highschool/1200/800',
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
          src="https://picsum.photos/seed/academics/1920/1080" 
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
                    src={`https://picsum.photos/${section.image}`} 
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

            {/* Extra details sub-grid for themes/LEAD/IIT */}
            {section.extraItems && (
              <div className="mt-16 bg-[#F9FAFB] rounded-2xl p-8 border border-gray-100">
                <h3 className="font-heading font-bold text-lg text-school-black mb-6 border-b border-gray-200 pb-3">
                  {section.extraTitle}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {section.extraItems.map((item, idx) => (
                    <div key={idx} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm space-y-2">
                      <h4 className="font-heading font-bold text-sm text-school-black">{item.label}</h4>
                      <p className="text-xs text-gray-400 font-light leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
