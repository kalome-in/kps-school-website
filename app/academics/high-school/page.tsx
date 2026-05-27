import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, BrainCircuit, ChevronRight, Target, BookOpen, Tablet, Play } from 'lucide-react';
import { BloomsTaxonomy } from '@/components/blooms-taxonomy';

export const metadata = {
  title: 'High School & IIT Foundation | Korutla Public School',
  description: 'Learn about our High School (Classes VI-X) and our specialized Spectropy IIT-NEET Foundation programs (Maestro & Catalyst).',
};

export default function HighSchoolPage() {
  const highlights = [
    'Spectropy Catalyst Program',
    'Spectropy Maestro Program',
    'Bloom\'s Taxonomy Pedagogy',
    'AI Diagnostic Dashboards',
    'JEE Main & Advanced Testing',
    'ICON-IIT Focused Batches'
  ];

  const extraItems = [
    { label: 'Spectropy Catalyst Program', desc: 'Focuses on NEET, EAPCET, and Olympiad foundations, covering 20% advanced syllabus topics to give students a head start.' },
    { label: 'Spectropy Maestro Program', desc: 'Rigorous analytical training targeted at JEE Main & Advanced standards, integrating physics, chemistry, and mathematics.' },
    { label: 'AI Diagnostics & Gap Analysis', desc: 'Using a diagnostic platform to analyze weekly mock tests, tracing conceptual errors down to sub-topics for corrective instruction.' },
    { label: 'ICON-IIT Focused Batches', desc: 'Limited batches of 35 students ensuring personalized guidance, individual attention, and interactive doubt-solving sessions.' }
  ];

  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <section className="relative h-[35vh] min-h-[250px] flex items-center justify-center overflow-hidden bg-school-black">
        <div className="absolute inset-0 bg-dot-pattern opacity-20"></div>
        <Image 
          src="/images/hero_banner.jpg" 
          alt="High School Academics" 
          fill
          priority
          className="object-cover opacity-30"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-school-black via-school-black/60 to-transparent" />
        <div className="relative z-10 text-center px-4 max-w-3xl space-y-3">
          <span className="inline-block px-3 py-1 rounded-md bg-white/5 text-school-red font-semibold text-xs tracking-wider uppercase border border-white/10 backdrop-blur-sm">
            Academics Hub
          </span>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-white tracking-tight">High School & IIT Foundation</h1>
          <p className="text-xs md:text-sm text-gray-400 max-w-xl mx-auto font-light">Fostering deep comprehension, competitive readiness, and high achievements in Classes VI to X.</p>
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
                src="/images/highschool_learning.jpg" 
                alt="High School Learning at KPS" 
                fill
                className="object-cover hover:scale-102 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-6 left-6 border border-white/20 bg-black/45 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1.5 rounded-md uppercase tracking-wider">
                Classes VI - X (Ages 11-15)
              </div>
            </div>
          </div>

          {/* Details Content Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center border bg-school-red/5 border-school-red/20 text-school-red">
                  <BrainCircuit className="w-5 h-5" />
                </div>
                <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-school-black">High School & Competitive prep</h2>
              </div>

              {/* Partner Logo */}
              <div className="relative w-32 h-10 select-none opacity-90 hover:opacity-100 transition-opacity">
                <Image
                  src="/images/spectropy_logo.png"
                  alt="Spectropy Partner Logo"
                  fill
                  className="object-contain object-left"
                />
              </div>

              <p className="text-sm md:text-base text-gray-500 font-light leading-relaxed">
                Alongside standard State Board academics, we offer the KPS-Spectropy IIT-NEET Foundation Program under the philosophy of &ldquo;Building thinkers, not just test takers.&rdquo; Operating on a Bloom&apos;s Taxonomy framework, it uses AI Diagnostic dashboards to pinpoint learning gaps, hybrid testing patterns, and structured streams: the Catalyst Program for NEET/Olympiad prep, and the Maestro Program for JEE Main & Advanced prep.
              </p>
            </div>

            {/* Approach Block */}
            <div className="bg-[#F9FAFB] p-6 rounded-2xl border border-gray-100">
              <h4 className="font-heading font-semibold text-xs tracking-wider uppercase text-school-black mb-3">
                Learning Approach
              </h4>
              <p className="text-xs md:text-sm text-gray-500 leading-relaxed italic font-light">
                &ldquo;We focus on deep conceptual comprehension, logical reasoning, and analytical speed. Our partnership with Spectropy replaces rote learning with systematic enquiry, detailed concept maps, and video solutions for every mock test.&rdquo;
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="space-y-4">
              <h4 className="font-heading font-semibold text-xs tracking-wider uppercase text-school-black">Program Highlights</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm">
                    <ChevronRight className="w-4 h-4 shrink-0 mt-0.5 text-school-red" />
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
        <div className="mt-20 bg-gradient-to-br from-school-red/10 via-white to-school-red/5 rounded-3xl p-8 border border-school-red/20">
          <h3 className="font-heading font-extrabold text-xl text-school-black mb-8 border-b border-gray-100 pb-3 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-school-red animate-pulse"></span>
            KPS Spectropy IIT-NEET Pathway & Score Impact
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Column: Numbered Pipeline */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { step: '01', title: 'Catalyst & Maestro', desc: 'Tailored NEET/Olympiad prep and JEE Main/Advanced coaching pathways.', icon: Target },
                { step: '02', title: 'AI Diagnostics', desc: 'Detailed conceptual analysis tracking error zones down to sub-topics.', icon: BookOpen },
                { step: '03', title: 'Online Tab Testing', desc: 'Weekly and monthly mock exams conducted on digital tablets.', icon: Tablet },
                { step: '04', title: 'ICON-IIT Batches', desc: 'Limited seats (35 per class) for intensive doubt-solving and guidance.', icon: Play }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group hover:border-school-red transition-all flex flex-col justify-between">
                  <span className="absolute -right-2 -bottom-2 text-6xl font-extrabold text-gray-100/60 font-heading select-none group-hover:text-school-red/5 transition-colors">{item.step}</span>
                  <div className="space-y-3 relative z-10">
                    <span className="bg-school-red/5 p-2 rounded-xl inline-block text-school-red flex items-center justify-center w-fit">
                      <item.icon className="w-5 h-5" />
                    </span>
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

        {/* BLOOM'S TAXONOMY INTERACTIVE DIAGRAM */}
        <div className="mt-20">
          <BloomsTaxonomy />
        </div>

        {/* Action CTA Section */}
        <div className="mt-16 text-center border border-gray-100 rounded-3xl p-10 bg-[#F9FAFB] max-w-4xl mx-auto space-y-6">
          <h3 className="font-heading font-extrabold text-2xl text-school-black">Unlock Your Child&apos;s IIT & NEET Aspirations</h3>
          <p className="text-sm text-gray-500 font-light max-w-xl mx-auto">
            Our Spectropy-partnered high school program covers state boards while laying robust foundations for engineering and medical entrances. Limited seats in our ICON-IIT batches.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-2">
            <Link href="/admissions" className="bg-school-black hover:bg-school-orange text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all shadow-sm">
              Apply For Admissions
            </Link>
            <Link href="/contact" className="border border-gray-200 bg-white hover:bg-gray-50 text-school-black font-semibold text-sm px-6 py-3 rounded-xl transition-all">
              Request Info Booklet
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
