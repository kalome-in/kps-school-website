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
      title: 'Pre-Primary',
      age: 'Ages 3-5',
      icon: Activity,
      borderColor: 'border-school-yellow',
      iconColor: 'text-school-yellow',
      iconBg: 'bg-school-yellow/5 border-school-yellow/20',
      textColor: 'text-school-yellow',
      image: 'seed/preprimary/1200/800',
      overview: 'Our Pre-Primary program focuses on play-based learning to foster cognitive, motor, and social skills in a secure and nurturing environment.',
      highlights: ['Montessori-inspired methods', 'Creative arts & crafts', 'Basic numeracy & literacy', 'Motor skill development'],
      approach: 'We believe children learn best when they are happy and engaged. Our educators act as facilitators, guiding children through structured play and discovery.'
    },
    {
      id: 'primary',
      title: 'Primary',
      age: 'Classes I - V',
      icon: BookOpen,
      borderColor: 'border-school-orange',
      iconColor: 'text-school-orange',
      iconBg: 'bg-school-orange/5 border-school-orange/10',
      textColor: 'text-school-orange',
      image: 'seed/primary/1200/800',
      overview: 'The Primary curriculum is designed to build a strong foundational knowledge in core subjects while encouraging natural curiosity.',
      highlights: ['Interactive digital learning', 'Language labs', 'Environmental awareness', 'Foundational mathematics & sciences'],
      approach: 'We transition students from play-based learning to structured academics smoothly. Group projects and interactive learning sessions are integral.'
    },
    {
      id: 'highschool',
      title: 'High School',
      age: 'Classes VI - X',
      icon: BrainCircuit,
      borderColor: 'border-school-red',
      iconColor: 'text-school-red',
      iconBg: 'bg-school-red/5 border-school-red/10',
      textColor: 'text-school-red',
      image: 'seed/highschool/1200/800',
      overview: 'Our High School program prepares students for board examinations and higher education through rigorous academics and critical thinking.',
      highlights: ['Advanced laboratory practicals', 'Career counseling', 'Leadership programs', 'Comprehensive board exam prep'],
      approach: 'Students are encouraged to analyze, question, and apply their knowledge. We focus on conceptual clarity over rote memorization to ensure long-term success.'
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
          </section>
        ))}
      </div>
    </div>
  );
}
