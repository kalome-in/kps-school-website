import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Activity, ChevronRight, MessageSquare, Binary, Sprout, Heart, Music, Palette } from 'lucide-react';
import { CurriculumDonut } from '@/components/curriculum-donut';

export const metadata = {
  title: 'Pre-Primary Education | Korutla Public School',
  description: 'Learn about our Pearson-partnered Pinnacle+ Pre-Primary curriculum for Nursery, LKG, and UKG classes.',
};

export default function PrePrimaryPage() {
  const highlights = [
    'Pinnacle+ Young Explorers',
    'NEP 2020 Aligned Activity Kits',
    'Pearson Blended Learning',
    'Pinnacle Student App Access',
    'Early Phonics & Sight Words',
    'Student Led Conferences (SLC)'
  ];

  const themeAreas = [
    { label: 'Young Explorers English', desc: 'Phonics-based reading, sight words, storytelling, and language expression.', icon: MessageSquare, iconColor: 'text-school-yellow' },
    { label: 'Foundational Mathematics', desc: 'Concrete-Pictorial-Abstract (CPA) approach for counting, shapes, and number sense.', icon: Binary, iconColor: 'text-school-orange' },
    { label: 'NEP-Aligned Activity Kits', desc: 'Hands-on learning tools and scientific kits provided to every child for self-discovery.', icon: Sprout, iconColor: 'text-emerald-500' },
    { label: 'Social-Emotional Learning (SEL)', desc: 'Building emotional resilience, positive habits, collaboration, and manners.', icon: Heart, iconColor: 'text-school-red' },
    { label: 'Music & Movement', desc: 'Rhymes, rhythms, nursery action songs, and active physical play.', icon: Music, iconColor: 'text-indigo-500' },
    { label: 'Creative & Physical Development', desc: 'Rhymes, rhythms, children\'s yoga, visual arts, and fine/gross motor skill building.', icon: Palette, iconColor: 'text-school-yellow' }
  ];

  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <section className="relative h-[35vh] min-h-[250px] flex items-center justify-center overflow-hidden bg-school-black">
        <div className="absolute inset-0 bg-dot-pattern opacity-20"></div>
        <Image 
          src="/images/hero_banner.jpg" 
          alt="Pre-Primary Academics" 
          fill
          priority
          className="object-cover opacity-30"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-school-black via-school-black/60 to-transparent" />
        <div className="relative z-10 text-center px-4 max-w-3xl space-y-3">
          <span className="inline-block px-3 py-1 rounded-md bg-white/5 text-school-yellow font-semibold text-xs tracking-wider uppercase border border-white/10 backdrop-blur-sm">
            Academics Hub
          </span>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-white tracking-tight">Pre-Primary Education</h1>
          <p className="text-xs md:text-sm text-gray-400 max-w-xl mx-auto font-light">Nurturing curiosity and laying foundations in Nursery, LKG, and UKG.</p>
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
                src="/images/preprimary_learning.jpg" 
                alt="Pre-Primary Learning at KPS" 
                fill
                className="object-cover hover:scale-102 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-6 left-6 border border-white/20 bg-black/45 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1.5 rounded-md uppercase tracking-wider">
                Nursery - UKG (Ages 3-5)
              </div>
            </div>
          </div>

          {/* Details Content Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center border bg-school-yellow/5 border-school-yellow/20 text-school-yellow">
                  <Activity className="w-5 h-5" />
                </div>
                <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-school-black">Pinnacle+ School System</h2>
              </div>

              {/* Partner Logo */}
              <div className="relative w-36 h-10 select-none opacity-90 hover:opacity-100 transition-opacity">
                <Image
                  src="/images/Pinnacle_plus_logo.webp"
                  alt="Pinnacle+ Partner Logo"
                  fill
                  className="object-contain object-left"
                />
              </div>

              <p className="text-sm md:text-base text-gray-500 font-light leading-relaxed">
                Powered by the Pinnacle+ School System in collaboration with Pearson, our pre-primary curriculum implements the Young Explorers Program. It features a multi-sensory, theme-based approach fully aligned with NEP 2020. This framework blends digital modules, hands-on Activity Kits, and holistic growth areas (English Phonics, Math, EVS, Creative Arts, and Social-Emotional Learning) with standard home support via the Pinnacle Student App.
              </p>
            </div>

            {/* Approach Block */}
            <div className="bg-[#F9FAFB] p-6 rounded-2xl border border-gray-100">
              <h4 className="font-heading font-semibold text-xs tracking-wider uppercase text-school-black mb-3">
                Learning Approach
              </h4>
              <p className="text-xs md:text-sm text-gray-500 leading-relaxed italic font-light">
                &ldquo;We nurture young minds through self-discovery and multi-sensory tools. Our Pinnacle+ framework ensures that abstract concepts become tangible experiences using structured activity kits and interactive storytelling.&rdquo;
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="space-y-4">
              <h4 className="font-heading font-semibold text-xs tracking-wider uppercase text-school-black">Program Highlights</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm">
                    <ChevronRight className="w-4 h-4 shrink-0 mt-0.5 text-school-yellow" />
                    <span className="text-xs md:text-sm font-medium text-gray-700">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

        {/* Infographic Section */}
        <div className="mt-20 bg-gradient-to-br from-school-yellow/10 via-white to-school-yellow/5 rounded-3xl p-8 border border-school-yellow/20">
          <h3 className="font-heading font-extrabold text-xl text-school-black mb-8 border-b border-gray-100 pb-3 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-school-yellow animate-pulse"></span>
            Pre-Primary Curriculum Distribution & Themes
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Donut Chart Visual Infographic (Left Column) */}
            <div className="lg:col-span-5">
              <CurriculumDonut />
            </div>

            {/* Themes List (Right Column) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {themeAreas.map((item, idx) => (
                <div key={idx} className="bg-white p-5 rounded-xl border border-gray-100 hover:shadow-sm transition-all flex gap-3.5 items-start">
                  <span className="bg-school-yellow/10 p-2.5 rounded-xl shrink-0 flex items-center justify-center">
                    <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                  </span>
                  <div className="space-y-0.5">
                    <h4 className="font-heading font-bold text-xs text-school-black">{item.label}</h4>
                    <p className="text-[11px] text-gray-400 font-light leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Action CTA Section */}
        <div className="mt-16 text-center border border-gray-100 rounded-3xl p-10 bg-[#F9FAFB] max-w-4xl mx-auto space-y-6">
          <h3 className="font-heading font-extrabold text-2xl text-school-black">Ready to Enroll Your Child?</h3>
          <p className="text-sm text-gray-500 font-light max-w-xl mx-auto">
            Give your child the foundational advantage with our Pearson-Pinnacle+ interactive program. Admissions are currently open for Nursery, LKG, and UKG batches.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-2">
            <Link href="/admissions" className="bg-school-black hover:bg-school-orange text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all shadow-sm">
              Apply For Admission
            </Link>
            <Link href="/contact" className="border border-gray-200 bg-white hover:bg-gray-50 text-school-black font-semibold text-sm px-6 py-3 rounded-xl transition-all">
              Inquire Today
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
