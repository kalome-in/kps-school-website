import Image from 'next/image';
import Link from 'next/link';
import { Target, Eye, Award, Heart, CheckCircle2, Users, BookOpen, Sparkles, Quote, GraduationCap } from 'lucide-react';
import { Gallery } from '@/components/gallery';

export const metadata = {
  title: 'About | Korutla Public School',
  description: 'Learn about the Kalam Dreams Educational Society, school history, academic performance metrics, and leadership of Korutla Public School.',
};

export default function AboutPage() {
  const stats = [
    { value: '10+ Years', label: 'Educational Legacy', desc: 'Guiding and shaping young minds in Korutla since our foundation in 2016.' },
    { value: '100%', label: 'SSC Pass Rate', desc: 'Consistently delivering top-tier academic results in State Board examinations.' },
    { value: '35+', label: 'Super Teachers', desc: 'Expert educators certified and trained by Pearson & LEAD systems.' },
    { value: '8 Students', label: 'National Finalists', desc: 'Representing KPS in the top standings of the National LEAD Championships.' }
  ];

  const coreValues = [
    { icon: Award, title: 'Excellence', desc: 'Striving for the highest quality in academics, critical thinking skills, and sports achievements.', color: 'text-school-orange bg-school-orange/5 border-school-orange/10' },
    { icon: Heart, title: 'Compassion', desc: 'Nurturing social-emotional growth, empathy, helpful behaviors, and caring habits.', color: 'text-school-red bg-school-red/5 border-school-red/10' },
    { icon: Users, title: 'Community', desc: 'Fostering active parent-teacher collaborations and student-led community programs.', color: 'text-school-yellow bg-school-yellow/5 border-school-yellow/10' },
    { icon: Target, title: 'Integrity', desc: 'Building strong ethical principles, personal responsibility, moral values, and civic discipline.', color: 'text-gray-600 bg-gray-50 border-gray-200/50' }
  ];

  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <section className="relative h-[45vh] min-h-[350px] flex items-center justify-center overflow-hidden bg-school-black">
        <div className="absolute inset-0 bg-dot-pattern opacity-20"></div>
        <Image 
          src="/images/hero_banner.jpg" 
          alt="About KPS Banner" 
          fill
          priority
          className="object-cover opacity-35"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-school-black via-school-black/60 to-transparent" />
        <div className="relative z-10 text-center px-4 max-w-3xl space-y-4">
          <span className="inline-block px-3 py-1 rounded-md bg-white/5 text-school-orange font-semibold text-xs tracking-wider uppercase border border-white/10 backdrop-blur-sm">
            Our Story
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white tracking-tight">About the School</h1>
          <p className="text-sm md:text-base text-gray-400 max-w-xl mx-auto font-light leading-relaxed">
            Discover our heritage, our vision, and the values that drive Korutla Public School towards educational leadership.
          </p>
        </div>
      </section>

      {/* SECTION 1.5 - KALAM DREAMS EDUCATIONAL SOCIETY */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left: Philosophy & Dr. Kalam Tribute */}
            <div className="lg:col-span-5 bg-gradient-to-br from-school-black to-neutral-900 text-white rounded-3xl p-6 md:p-8 border border-white/10 shadow-xl relative overflow-hidden flex flex-col justify-between">
              <div className="absolute inset-0 bg-dot-pattern opacity-10"></div>
              
              <div className="relative z-10 space-y-6">
                {/* Kalam Portrait Painting */}
                <div className="relative w-full h-64 md:h-72 rounded-2xl overflow-hidden border border-white/10 shadow-md">
                  <Image
                    src="/images/kalam_painted.png"
                    alt="Dr. A.P.J. Abdul Kalam Painted Portrait"
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="inline-flex p-2.5 rounded-xl bg-white/5 border border-white/10 text-school-orange">
                  <Quote className="w-5 h-5" />
                </div>

                <blockquote className="space-y-3">
                  <p className="text-xs md:text-sm italic leading-relaxed text-gray-200 font-light">
                    &ldquo;Dreams transform into thoughts, and thoughts result in action. Educationists should build the capacities of the spirit of inquiry, creativity, entrepreneurial and moral leadership among students.&rdquo;
                  </p>
                  <footer className="text-[11px] font-bold text-school-orange uppercase tracking-wider">
                    — Dr. A.P.J. Abdul Kalam
                  </footer>
                </blockquote>
              </div>

              <div className="relative z-10 pt-6 mt-6 border-t border-white/5 flex gap-4 items-center">
                <div className="w-9 h-9 rounded-full bg-school-orange/20 border border-school-orange/30 flex items-center justify-center text-school-orange shrink-0">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h5 className="text-[11px] font-bold uppercase tracking-wider text-white">Our Direct Inspiration</h5>
                  <p className="text-[9px] text-gray-400">Guiding our conceptual & logical learning models.</p>
                </div>
              </div>
            </div>

            {/* Right: Society Detail & Vision */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 text-school-orange font-semibold tracking-wide uppercase text-xs">
                  <span className="w-6 h-0.5 bg-school-orange"></span> Governing Body
                </div>
                <h2 className="text-2xl md:text-4xl font-heading font-extrabold text-school-black">
                  Managed by Kalam Dreams Educational Society
                </h2>
              </div>
              <p className="text-gray-500 text-sm md:text-base font-light leading-relaxed">
                Established in 2016, the <span className="font-semibold text-school-black">Kalam Dreams Educational Society</span> set out with a clear purpose: to bridge the gap in quality English-medium education for families in Korutla. Driven by the educational teachings of India&apos;s former President, Dr. A.P.J. Abdul Kalam, the society stands for concept-driven instruction, student empowerment, and national competitiveness.
              </p>
              <p className="text-gray-500 text-sm md:text-base font-light leading-relaxed">
                By investing in smart classrooms, securing partnerships with curriculum leaders Pearson and LEAD, and introducing high-standard IIT-NEET coaching through Spectropy, the society ensures KPS is always ahead of educational trends.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-school-orange shrink-0" />
                  <span className="text-xs md:text-sm font-semibold text-gray-700">Concept-Based Pedagogy</span>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-school-orange shrink-0" />
                  <span className="text-xs md:text-sm font-semibold text-gray-700">Holistic Character Focus</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* History & Timeline Infographic */}
      <section className="py-24 bg-[#F9FAFB] border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <div className="inline-flex items-center gap-2 text-school-orange font-semibold tracking-wide uppercase text-xs">
              <span className="w-6 h-0.5 bg-school-orange"></span> Our Journey
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-school-black">KPS History & Growth Timeline</h2>
            <p className="text-gray-400 text-sm md:text-base font-light">Trace the milestones of our growth from a local school to an educational leader.</p>
          </div>

          <div className="relative border-l border-gray-200 ml-4 md:ml-32 space-y-12 max-w-4xl mx-auto">
            {/* Timeline Item 1 */}
            <div className="relative pl-8 md:pl-12 group">
              <div className="absolute -left-3.5 top-1.5 w-7 h-7 rounded-full bg-school-orange text-white flex items-center justify-center font-bold text-xs shadow-md group-hover:scale-110 transition-transform">
                1
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 rounded-2xl border border-gray-100 hover:border-school-orange transition-all duration-300 shadow-sm">
                <div className="md:col-span-1">
                  <span className="text-3xl font-extrabold text-school-orange font-heading">2016</span>
                  <h4 className="text-sm font-bold text-school-black uppercase tracking-wider mt-1">Foundation</h4>
                </div>
                <div className="md:col-span-2 text-gray-500 text-xs md:text-sm leading-relaxed font-light">
                  Kalam Dreams Educational Society registers and establishes Korutla Public School, welcoming LKG through Class X batches with dedicated, concept-driven teaching.
                </div>
              </div>
            </div>

            {/* Timeline Item 2 */}
            <div className="relative pl-8 md:pl-12 group">
              <div className="absolute -left-3.5 top-1.5 w-7 h-7 rounded-full bg-school-red text-white flex items-center justify-center font-bold text-xs shadow-md group-hover:scale-110 transition-transform">
                2
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 rounded-2xl border border-gray-100 hover:border-school-red transition-all duration-300 shadow-sm">
                <div className="md:col-span-1">
                  <span className="text-3xl font-extrabold text-school-red font-heading">2019</span>
                  <h4 className="text-sm font-bold text-school-black uppercase tracking-wider mt-1">LEAD school Integration</h4>
                </div>
                <div className="md:col-span-2 text-gray-500 text-xs md:text-sm leading-relaxed font-light">
                  Fully integrated the <span className="font-semibold text-school-black">LEAD School System</span> inside primary classrooms, adding smartboards, digital lesson planning tabs, and interactive science toolkits.
                </div>
              </div>
            </div>

            {/* Timeline Item 3 */}
            <div className="relative pl-8 md:pl-12 group">
              <div className="absolute -left-3.5 top-1.5 w-7 h-7 rounded-full bg-school-yellow text-school-black flex items-center justify-center font-bold text-xs shadow-md group-hover:scale-110 transition-transform">
                3
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 rounded-2xl border border-gray-100 hover:border-school-yellow transition-all duration-300 shadow-sm">
                <div className="md:col-span-1">
                  <span className="text-3xl font-extrabold text-school-yellow font-heading">2023</span>
                  <h4 className="text-sm font-bold text-school-black uppercase tracking-wider mt-1">IIT-NEET Foundation</h4>
                </div>
                <div className="md:col-span-2 text-gray-500 text-xs md:text-sm leading-relaxed font-light">
                  Partnered with <span className="font-semibold text-school-black">Spectropy</span> to initiate the high-demand IIT-NEET Maestro and Catalyst coaching programs for classes VI to X, utilizing weekly tab-based testing.
                </div>
              </div>
            </div>

            {/* Timeline Item 4 */}
            <div className="relative pl-8 md:pl-12 group">
              <div className="absolute -left-3.5 top-1.5 w-7 h-7 rounded-full bg-gray-500 text-white flex items-center justify-center font-bold text-xs shadow-md group-hover:scale-110 transition-transform">
                4
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 rounded-2xl border border-gray-100 hover:border-gray-500 transition-all duration-300 shadow-sm">
                <div className="md:col-span-1">
                  <span className="text-3xl font-extrabold text-gray-500 font-heading">Present</span>
                  <h4 className="text-sm font-bold text-school-black uppercase tracking-wider mt-1">NEP Blended Learning</h4>
                </div>
                <div className="md:col-span-2 text-gray-500 text-xs md:text-sm leading-relaxed font-light">
                  Launching Pinnacle Pearson pre-primary curriculum, digital parent dashboards, and school-wide coding programs (CCS) to stay aligned with national standards.
                </div>
              </div>
            </div>
          </div>
          
          {/* Growth Statistics Panel */}
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:scale-101 hover:shadow-md transition-all text-center space-y-2">
                <span className="text-3xl font-extrabold text-school-black block font-heading">{stat.value}</span>
                <span className="text-xs font-bold text-school-orange uppercase tracking-wider block">{stat.label}</span>
                <p className="text-xs text-gray-400 font-light leading-relaxed">{stat.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Foundational Pillars: Mission & Vision Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 text-school-orange font-semibold tracking-wide uppercase text-xs">
              <span className="w-6 h-0.5 bg-school-orange"></span> School Philosophy
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-school-black">Foundational Pillars</h2>
            <p className="text-gray-400 text-xs md:text-sm font-light">Our guiding principles that dictate how we educate and shape character.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Mission Pillar Card */}
            <div className="lg:col-span-6 bg-[#F9FAFB] p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-school-orange/5 border border-school-orange/10 rounded-xl flex items-center justify-center text-school-orange">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-school-black">Our Mission</h3>
                <p className="text-gray-500 leading-relaxed text-xs md:text-sm font-light">
                  To foster an environment where students are inspired to learn, empowered to lead, and equipped to succeed in a rapidly changing world by providing innovative, concept-driven, and inclusive education.
                </p>
              </div>
              <ul className="space-y-3 pt-4 border-t border-gray-200/50">
                {['Innovative, digitized smartboard instruction', 'Activity kits for experiential exploration', 'Holistic personality and leadership building'].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-600 text-xs font-medium">
                    <CheckCircle2 className="w-4 h-4 text-school-orange shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Vision Pillar Card */}
            <div className="lg:col-span-6 bg-[#F9FAFB] p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-school-red/5 border border-school-red/10 rounded-xl flex items-center justify-center text-school-red">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-school-black">Our Vision</h3>
                <p className="text-gray-500 leading-relaxed text-xs md:text-sm font-light">
                  To be a premier educational institution in the region that cultivates lifelong learners, analytical thinkers, and empathetic leaders grounded in strong ethical principles and moral values.
                </p>
              </div>
              <ul className="space-y-3 pt-4 border-t border-gray-200/50">
                {['Deep conceptual clarity & reasoning skills', 'Global mindset with strong local ethics', 'Nurturing future engineering & medical pioneers'].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-600 text-xs font-medium">
                    <CheckCircle2 className="w-4 h-4 text-school-red shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-24 bg-gradient-to-b from-white to-[#F9FAFB] border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase font-bold text-school-orange tracking-widest">Leadership</span>
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-school-black">
              Message from our Principal
            </h2>
          </div>

          <div className="bg-gradient-to-br from-school-black to-neutral-900 text-white rounded-3xl p-8 md:p-16 border border-white/10 relative shadow-xl">
            <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
              
              {/* Left Column: Image & Portrait badges */}
              <div className="lg:col-span-5 flex flex-col items-center lg:items-start gap-6">
                <div className="w-52 h-52 md:w-60 md:h-60 rounded-3xl overflow-hidden border-2 border-white/20 shadow-lg relative">
                  <Image 
                    src="/images/principal_portrait.jpg" 
                    alt="Principal Gujjeti Venkatesh Portrait" 
                    fill
                    className="object-cover hover:scale-102 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                  <span className="px-3 py-1 rounded-full bg-school-orange/20 border border-school-orange/30 text-school-orange text-[9px] font-bold uppercase tracking-wider">Correspondent</span>
                  <span className="px-3 py-1 rounded-full bg-school-red/20 border border-school-red/30 text-school-red text-[9px] font-bold uppercase tracking-wider">Principal & Director</span>
                  <span className="px-3 py-1 rounded-full bg-school-yellow/20 border border-school-yellow/30 text-school-yellow text-[9px] font-bold uppercase tracking-wider">M.Sc Chemistry</span>
                </div>
              </div>

              {/* Right Column: Profile and Message */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-1">
                  <h3 className="text-2xl md:text-3xl font-heading font-bold text-white">Gujjeti Venkatesh</h3>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <GraduationCap className="w-4 h-4 text-school-orange shrink-0" />
                    <span>M.Sc Chemistry, Kakatiya University (2006)</span>
                  </div>
                  <p className="text-[11px] text-gray-500 font-light">Former Vice Principal at Sri Arunodaya Degree College | Experienced IIT Foundation Mentor</p>
                </div>

                <div className="relative border-l-2 border-school-orange pl-6 space-y-4">
                  <Quote className="w-8 h-8 text-school-orange/20 absolute -left-4 -top-6" />
                  <p className="text-gray-300 italic text-xs md:text-sm leading-relaxed font-light">
                    &ldquo;At Korutla Public School, we promote learning that focuses on conceptual clarity, logical analysis, comparison and contrast, and hands-on practical experience.&rdquo;
                  </p>
                  <p className="text-gray-300 italic text-xs md:text-sm leading-relaxed font-light">
                    &ldquo;By combining Pinnacle Pearson, LEAD, and Spectropy IIT-NEET coaching, we create a futuristic environment where students become independent thinkers, confident communicators, and future leaders.&rdquo;
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* SECTION - CAMPUS LIFE GALLERY */}
      <section className="py-24 bg-[#F9FAFB] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-4 space-y-6">
              <div className="inline-flex items-center gap-2 text-school-orange font-semibold tracking-wide uppercase text-xs">
                <span className="w-6 h-0.5 bg-school-orange"></span> Campus Tour
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-school-black leading-tight">
                Our Campus Life Gallery
              </h2>
              <p className="text-gray-500 text-sm md:text-base font-light leading-relaxed">
                Take a virtual tour of our school environment, science exhibitions, sports milestones, and vibrant celebrations.
              </p>
              <div className="pt-2">
                <Link href="/gallery" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-school-black hover:bg-school-black hover:text-white transition-colors font-medium text-xs md:text-sm">
                  View Full Gallery
                </Link>
              </div>
            </div>
            <div className="lg:col-span-8 bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
              <Gallery />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 text-school-orange font-semibold tracking-wide uppercase text-xs">
              <span className="w-6 h-0.5 bg-school-orange"></span> Character Pillars
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-school-black">Our Core Values</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center space-y-4 shadow-sm">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-sm ${value.color}`}>
                  <value.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold font-heading text-school-black">{value.title}</h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
