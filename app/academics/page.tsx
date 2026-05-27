import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, ArrowRight, BookOpen, Brain, Sprout, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Academics Portal | Korutla Public School',
  description: 'Discover the academic pathways at Korutla Public School, including our partnerships with Pinnacle+, LEAD, and Spectropy.',
};

export default function AcademicsPortalPage() {
  const pathways = [
    {
      id: 'pre-primary',
      title: 'Pre-Primary Education',
      age: 'Nursery - UKG (Ages 3-5)',
      description: 'Laying strong cognitive and social foundations through a multi-sensory, theme-based curriculum.',
      partnerLogo: '/images/Pinnacle_plus_logo.webp',
      logoWidth: 'w-36',
      logoHeight: 'h-10',
      colorTheme: 'yellow',
      borderColor: 'border-school-yellow/30',
      bgColor: 'bg-school-yellow/5',
      textColor: 'text-school-yellow',
      highlights: [
        'Pearson-powered Pinnacle+ System',
        'Young Explorers Foundation modules',
        'NEP-aligned Activity Kits'
      ],
      href: '/academics/pre-primary'
    },
    {
      id: 'primary',
      title: 'Primary School & LEAD',
      age: 'Classes I - V (Ages 6-10)',
      description: 'Building critical communication, logical thinking, and digital skills inside tech-enabled smart classrooms.',
      partnerLogo: '/images/lead_school_logo.webp',
      logoWidth: 'w-28',
      logoHeight: 'h-10',
      colorTheme: 'orange',
      borderColor: 'border-school-orange/20',
      bgColor: 'bg-school-orange/5',
      textColor: 'text-school-orange',
      highlights: [
        'Fully integrated LEAD School System',
        'ELGA levels-based English model',
        'Computer Coding Skills (CCS) focus'
      ],
      href: '/academics/primary'
    },
    {
      id: 'high-school',
      title: 'High School & IIT Foundation',
      age: 'Classes VI - X (Ages 11-15)',
      description: 'Balancing rigorous board academic standards with advanced coaching for JEE Main, JEE Advanced, and NEET entrances.',
      partnerLogo: '/images/spectropy_logo.png',
      logoWidth: 'w-32',
      logoHeight: 'h-10',
      colorTheme: 'red',
      borderColor: 'border-school-red/20',
      bgColor: 'bg-school-red/5',
      textColor: 'text-school-red',
      highlights: [
        'KPS-Spectropy IIT-NEET program',
        'Catalyst (NEET) & Maestro (JEE) paths',
        'AI Diagnostics conceptual gap analysis'
      ],
      href: '/academics/high-school'
    }
  ];

  const pillars = [
    {
      title: 'NEP 2020 Aligned',
      description: 'Structured in accordance with the National Education Policy, focusing on skill competency rather than rote learning.',
      icon: ShieldCheck,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50'
    },
    {
      title: 'Conceptual Comprehension',
      description: 'Utilizing Bloom\'s Taxonomy to structure lesson progressions from basic retention to critical application and analysis.',
      icon: Brain,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50'
    },
    {
      title: 'Digital & Practical Blend',
      description: 'Blending physical worksheets and experiential activity toolkits with interactive smartboard lectures and student apps.',
      icon: BookOpen,
      color: 'text-school-orange',
      bg: 'bg-school-orange/5'
    },
    {
      title: 'Teacher-Empowered Success',
      description: 'Our teachers undergo rigorous regular training, equipped with digital tools and tablet resources to deliver high outcomes.',
      icon: Sprout,
      color: 'text-school-yellow',
      bg: 'bg-school-yellow/5'
    }
  ];

  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <section className="relative h-[45vh] min-h-[350px] flex items-center justify-center overflow-hidden bg-school-black">
        <div className="absolute inset-0 bg-dot-pattern opacity-20"></div>
        <Image 
          src="/images/hero_banner.jpg" 
          alt="Academics KPS Portal" 
          fill
          priority
          className="object-cover opacity-35"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-school-black via-school-black/60 to-transparent" />
        <div className="relative z-10 text-center px-4 max-w-3xl space-y-4">
          <span className="inline-block px-3 py-1 rounded-md bg-white/5 text-school-orange font-semibold text-xs tracking-wider uppercase border border-white/10 backdrop-blur-sm">
            Our Pathways
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white tracking-tight">Academic Structure</h1>
          <p className="text-sm md:text-base text-gray-400 max-w-xl mx-auto font-light leading-relaxed">
            A planned, future-ready learning pathway from foundational pre-primary discovery to high school competitive excellence.
          </p>
        </div>
      </section>

      {/* Pathways Grid Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-school-orange font-semibold tracking-wide uppercase text-xs">
            <span className="w-6 h-0.5 bg-school-orange"></span> Learning Levels
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-school-black">
            Choose a Division to Explore
          </h2>
          <p className="text-gray-500 text-sm md:text-base font-light leading-relaxed">
            Click on any section below to see deep curriculum details, teaching methodologies, interactive pipelines, and achievements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pathways.map((path) => (
            <div 
              key={path.id} 
              className={`bg-white rounded-3xl border border-gray-100 p-8 shadow-sm flex flex-col justify-between hover:-translate-y-1 hover:shadow-lg transition-all duration-300 relative overflow-hidden group`}
            >
              {/* Top Accent Bar */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 ${
                path.colorTheme === 'yellow' ? 'bg-school-yellow' :
                path.colorTheme === 'orange' ? 'bg-school-orange' : 'bg-school-red'
              }`} />

              <div className="space-y-6">
                {/* Header Info */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">{path.age}</span>
                  <h3 className="text-xl font-heading font-bold text-school-black group-hover:text-school-orange transition-colors">
                    {path.title}
                  </h3>
                  <p className="text-xs text-gray-500 font-light leading-relaxed">
                    {path.description}
                  </p>
                </div>

                {/* Partner Integration */}
                <div className="pt-4 border-t border-gray-50 space-y-2">
                  <span className="text-[9px] uppercase font-bold text-gray-400 tracking-wider">Curriculum Partner</span>
                  <div className={`relative ${path.logoWidth} ${path.logoHeight} select-none opacity-90 hover:opacity-100 transition-opacity`}>
                    <Image
                      src={path.partnerLogo}
                      alt={`${path.title} Partner Logo`}
                      fill
                      className="object-contain object-left"
                    />
                  </div>
                </div>

                {/* Highlight Bullets */}
                <div className="space-y-3 pt-2">
                  <span className="text-[9px] uppercase font-bold text-gray-400 tracking-wider">Highlights</span>
                  <ul className="space-y-2.5">
                    {path.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-gray-700 font-medium">
                        <ChevronRight className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${path.textColor}`} />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Navigation Action */}
              <div className="pt-8 mt-6 border-t border-gray-50">
                <Link 
                  href={path.href} 
                  className={`inline-flex items-center justify-between w-full p-4 rounded-xl border text-xs font-bold transition-all ${
                    path.colorTheme === 'yellow' ? 'bg-school-yellow/5 border-school-yellow/10 text-school-black hover:bg-school-yellow hover:text-white' :
                    path.colorTheme === 'orange' ? 'bg-school-orange/5 border-school-orange/10 text-school-orange hover:bg-school-orange hover:text-white' :
                    'bg-school-red/5 border-school-red/10 text-school-red hover:bg-school-red hover:text-white'
                  }`}
                >
                  <span>Explore Full Curriculum</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* Pedagogical Pillars Section */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase font-bold text-school-orange tracking-widest">KPS Pedagogy</span>
            <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-school-black">
              Our Core Educational Pillars
            </h2>
            <p className="text-sm text-gray-500 font-light max-w-xl mx-auto">
              How we construct daily classroom experiences to cultivate active thinkers and achievers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pillars.map((pillar, idx) => (
              <div 
                key={idx} 
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex gap-4 hover:-translate-y-0.5 transition-transform"
              >
                <div className={`p-3 rounded-xl ${pillar.bg} ${pillar.color} shrink-0 h-fit`}>
                  <pillar.icon className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-heading font-bold text-sm text-school-black">{pillar.title}</h4>
                  <p className="text-xs md:text-sm text-gray-400 font-light leading-relaxed">{pillar.description}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* General Admission CTA banner */}
      <section className="py-16 max-w-5xl mx-auto px-4 text-center space-y-6">
        <h3 className="font-heading font-extrabold text-2xl md:text-3xl text-school-black">Begin the Admissions Process</h3>
        <p className="text-sm text-gray-500 font-light max-w-2xl mx-auto">
          Admissions are open for the academic session. Apply online, request our prospectus, or book a physical campus visit today.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/admissions" className="bg-school-black hover:bg-school-orange text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all shadow-sm">
            Apply Now
          </Link>
          <Link href="/contact" className="border border-gray-200 bg-white hover:bg-gray-50 text-school-black font-semibold text-sm px-6 py-3 rounded-xl transition-all">
            Contact Admissions
          </Link>
        </div>
      </section>
    </div>
  );
}
