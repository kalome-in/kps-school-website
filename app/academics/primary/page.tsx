import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, BookOpen, ChevronRight } from 'lucide-react';
import { LeadFlow } from '@/components/lead-flow';

export const metadata = {
  title: 'Primary School & LEAD | Korutla Public School',
  description: 'Explore our Primary School (Classes I-V) integrated with the LEAD School System, ELGA, and Computer Coding Skills.',
};

export default function PrimaryPage() {
  const highlights = [
    'LEAD School System',
    'ELGA (Level-based English)',
    'Coding & Tech Integration (CCS)',
    'LEAD Student & Teacher Apps',
    'Student Led Conferences (SLC)',
    'National Championship Exposure'
  ];

  const extraItems = [
    { label: 'ELGA Program', desc: 'English Language & General Awareness program which levels students by proficiency rather than class, accelerating fluency.' },
    { label: 'Smart Classroom Tech', desc: 'Teachers deliver digital content and structured, multimodal lesson plans using dedicated tablet resources.' },
    { label: 'Student Led Conferences (SLC)', desc: 'A unique program where students take center stage, presenting their projects and academic portfolios directly to parents.' },
    { label: 'LEAD Championships', desc: 'National-level competitions in science, coding, and elocution; 8 of our students qualified as national finalists from 2 lakh+ entries.' }
  ];

  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <section className="relative h-[35vh] min-h-[250px] flex items-center justify-center overflow-hidden bg-school-black">
        <div className="absolute inset-0 bg-dot-pattern opacity-20"></div>
        <Image 
          src="/images/hero_banner.jpg" 
          alt="Primary School Academics" 
          fill
          priority
          className="object-cover opacity-30"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-school-black via-school-black/60 to-transparent" />
        <div className="relative z-10 text-center px-4 max-w-3xl space-y-3">
          <span className="inline-block px-3 py-1 rounded-md bg-white/5 text-school-orange font-semibold text-xs tracking-wider uppercase border border-white/10 backdrop-blur-sm">
            Academics Hub
          </span>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-white tracking-tight">Primary School & LEAD</h1>
          <p className="text-xs md:text-sm text-gray-400 max-w-xl mx-auto font-light">Nurturing independent thought, communication, and digital competency in Classes I to V.</p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        {/* Back Link */}
        <Link href="/academics" className="inline-flex items-center gap-2 text-xs font-semibold text-school-orange hover:text-school-black transition-colors mb-10 group">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Academics Portal
        </Link>

        {/* Section Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Visual Presentation Column */}
          <div className="lg:col-span-6 relative w-full">
            <div className="relative h-[350px] md:h-[420px] rounded-3xl overflow-hidden border border-gray-100 shadow-md">
              <Image 
                src="/images/primary_learning.jpg" 
                alt="Primary Learning at KPS" 
                fill
                className="object-cover hover:scale-102 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-6 left-6 border border-white/20 bg-black/45 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1.5 rounded-md uppercase tracking-wider">
                Classes I - V (Ages 6-10)
              </div>
            </div>
          </div>

          {/* Details Content Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center border bg-school-orange/5 border-school-orange/20 text-school-orange">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-school-black">Primary School Curriculum</h2>
              </div>

              {/* Partner Logo */}
              <div className="relative w-28 h-10 select-none opacity-90 hover:opacity-100 transition-opacity">
                <Image
                  src="/images/lead_school_logo.webp"
                  alt="LEAD Partner Logo"
                  fill
                  className="object-contain object-left"
                />
              </div>

              <p className="text-sm md:text-base text-gray-500 font-light leading-relaxed">
                Integrated with the internationally recognized LEAD School System, our primary school provides India&apos;s strongest educational framework. We combine smart classrooms, digital teaching resources, and level-based English pedagogy (ELGA). Students benefit from direct exposure through the National LEAD Championships, Student Led Conferences (SLC), and high-demand Computer Coding Skills (CCS) programs.
              </p>
            </div>

            {/* Approach Block */}
            <div className="bg-[#F9FAFB] p-6 rounded-2xl border border-gray-100">
              <h4 className="font-heading font-semibold text-xs tracking-wider uppercase text-school-black mb-3">
                Learning Approach
              </h4>
              <p className="text-xs md:text-sm text-gray-500 leading-relaxed italic font-light">
                &ldquo;We prepare students to be confident leaders and collaborators. By moving away from rote memorization, our LEAD curriculum uses experiential toolkits, regular digital assessments, and student-led exhibitions.&rdquo;
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="space-y-4">
              <h4 className="font-heading font-semibold text-xs tracking-wider uppercase text-school-black">Program Highlights</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm">
                    <ChevronRight className="w-4 h-4 shrink-0 mt-0.5 text-school-orange" />
                    <span className="text-xs md:text-sm font-medium text-gray-700">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

        {/* Info Cards Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {extraItems.map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div className="space-y-2">
                <h4 className="font-heading font-bold text-sm text-school-black">{item.label}</h4>
                <p className="text-xs text-gray-400 font-light leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Infographics Section */}
        <div className="mt-20 bg-gradient-to-br from-school-orange/10 via-white to-school-orange/5 rounded-3xl p-8 border border-school-orange/20">
          <h3 className="font-heading font-extrabold text-xl text-school-black mb-8 border-b border-gray-100 pb-3 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-school-orange animate-pulse"></span>
            LEAD Advantage & Curriculum Pipeline
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
                Our interactive primary curriculum prepares students for national competitions, allowing <span className="font-semibold text-school-black">8 KPS students</span> to secure ranks in the elite top finals of the country.
              </p>
            </div>

            {/* Right Column: LEAD Multimodal Learning Pipeline (Flow Diagram) */}
            <div className="lg:col-span-6">
              <LeadFlow />
            </div>
          </div>
        </div>

        {/* Action CTA Section */}
        <div className="mt-16 text-center border border-gray-100 rounded-3xl p-10 bg-[#F9FAFB] max-w-4xl mx-auto space-y-6">
          <h3 className="font-heading font-extrabold text-2xl text-school-black">Prepare Your Child for Global Opportunities</h3>
          <p className="text-sm text-gray-500 font-light max-w-xl mx-auto">
            Our LEAD-integrated primary curriculum builds communication skills, mathematical reasoning, and early technology confidence. Admissions are open for Classes I through V.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-2">
            <Link href="/admissions" className="bg-school-black hover:bg-school-orange text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all shadow-sm">
              Apply For Admission
            </Link>
            <Link href="/contact" className="border border-gray-200 bg-white hover:bg-gray-50 text-school-black font-semibold text-sm px-6 py-3 rounded-xl transition-all">
              Schedule a Visit
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
