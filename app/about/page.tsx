import Image from 'next/image';
import { Target, Eye, Award, Heart, CheckCircle2, Users } from 'lucide-react';

export const metadata = {
  title: 'About | Korutla Public School',
  description: 'Learn about the history, mission, vision, and leadership of Korutla Public School.',
};

export default function AboutPage() {
  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <section className="relative h-[45vh] min-h-[350px] flex items-center justify-center overflow-hidden bg-school-black">
        <div className="absolute inset-0 bg-dot-pattern opacity-20"></div>
        <Image 
          src="https://picsum.photos/seed/about/1920/1080" 
          alt="About KPS" 
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
          <p className="text-sm md:text-base text-gray-400 max-w-xl mx-auto font-light leading-relaxed">Discover our heritage, our values, and what makes Korutla Public School a center for educational excellence.</p>
        </div>
      </section>

      {/* History & Timeline Infographic */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <div className="inline-flex items-center gap-2 text-school-orange font-semibold tracking-wide uppercase text-xs">
              <span className="w-6 h-0.5 bg-school-orange"></span> Our Journey
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-school-black">KPS History & Growth Timeline</h2>
            <p className="text-gray-400 text-sm md:text-base font-light">From our society establishment to a premium digital and educational powerhouse.</p>
          </div>

          <div className="relative border-l border-gray-200 ml-4 md:ml-32 space-y-12">
            {/* Timeline Item 1 */}
            <div className="relative pl-8 md:pl-12 group">
              <div className="absolute -left-3.5 top-1.5 w-7 h-7 rounded-full bg-school-orange text-white flex items-center justify-center font-bold text-xs shadow-md group-hover:scale-110 transition-transform">
                1
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#F9FAFB] p-6 rounded-2xl border border-gray-100 hover:border-school-orange transition-all">
                <div className="md:col-span-1">
                  <span className="text-3xl font-extrabold text-school-orange font-heading">2016</span>
                  <h4 className="text-sm font-bold text-school-black uppercase tracking-wider mt-1">Foundation</h4>
                </div>
                <div className="md:col-span-2 text-gray-500 text-xs md:text-sm leading-relaxed font-light">
                  Established by the **Kalam Dreams Educational Society** to provide quality, concept-driven English-medium education (Nursery to Class X) in Korutla.
                </div>
              </div>
            </div>

            {/* Timeline Item 2 */}
            <div className="relative pl-8 md:pl-12 group">
              <div className="absolute -left-3.5 top-1.5 w-7 h-7 rounded-full bg-school-red text-white flex items-center justify-center font-bold text-xs shadow-md group-hover:scale-110 transition-transform">
                2
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#F9FAFB] p-6 rounded-2xl border border-gray-100 hover:border-school-red transition-all">
                <div className="md:col-span-1">
                  <span className="text-3xl font-extrabold text-school-red font-heading">2019</span>
                  <h4 className="text-sm font-bold text-school-black uppercase tracking-wider mt-1">LEAD & Smart Class</h4>
                </div>
                <div className="md:col-span-2 text-gray-500 text-xs md:text-sm leading-relaxed font-light">
                  Fully integrated the **LEAD School System** with smart classrooms and multi-modal interactive panels, transforming local education with technology.
                </div>
              </div>
            </div>

            {/* Timeline Item 3 */}
            <div className="relative pl-8 md:pl-12 group">
              <div className="absolute -left-3.5 top-1.5 w-7 h-7 rounded-full bg-school-yellow text-school-black flex items-center justify-center font-bold text-xs shadow-md group-hover:scale-110 transition-transform">
                3
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#F9FAFB] p-6 rounded-2xl border border-gray-100 hover:border-school-yellow transition-all">
                <div className="md:col-span-1">
                  <span className="text-3xl font-extrabold text-school-yellow font-heading">2023</span>
                  <h4 className="text-sm font-bold text-school-black uppercase tracking-wider mt-1">Spectropy Foundation</h4>
                </div>
                <div className="md:col-span-2 text-gray-500 text-xs md:text-sm leading-relaxed font-light">
                  Launched the **KPS Spectropy IIT-NEET Foundation** coaching program, preparing middle and high school batches for national competitive exams.
                </div>
              </div>
            </div>

            {/* Timeline Item 4 */}
            <div className="relative pl-8 md:pl-12 group">
              <div className="absolute -left-3.5 top-1.5 w-7 h-7 rounded-full bg-school-gray text-white flex items-center justify-center font-bold text-xs shadow-md group-hover:scale-110 transition-transform">
                4
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#F9FAFB] p-6 rounded-2xl border border-gray-100 hover:border-school-gray transition-all">
                <div className="md:col-span-1">
                  <span className="text-3xl font-extrabold text-school-gray font-heading">Present</span>
                  <h4 className="text-sm font-bold text-school-black uppercase tracking-wider mt-1">Futuristic Tech</h4>
                </div>
                <div className="md:col-span-2 text-gray-500 text-xs md:text-sm leading-relaxed font-light">
                  Introducing **Computer Coding Skills (CCS)** and Pinnacle Pearson curriculums, creating a world-class environment for all-round personality development.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision - Clean layout */}
      <section className="py-24 bg-[#F9FAFB] border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Mission Card */}
            <div className="bg-white p-10 rounded-2xl border border-gray-100 shadow-sm space-y-6">
              <div className="w-12 h-12 bg-school-orange/5 border border-school-orange/10 rounded-xl flex items-center justify-center text-school-orange">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-school-black">Our Mission</h3>
              <p className="text-gray-500 leading-relaxed text-sm md:text-base font-light pb-6 border-b border-gray-100">
                To foster an environment where students are inspired to learn, empowered to lead, and equipped to succeed in a rapidly changing world by providing innovative, holistic, and inclusive education.
              </p>
              <ul className="space-y-3 pt-2">
                {['Innovative teaching methodologies', 'Holistic development', 'Inclusive environment'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-500 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-school-orange shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Vision Card */}
            <div className="bg-white p-10 rounded-2xl border border-gray-100 shadow-sm space-y-6">
              <div className="w-12 h-12 bg-school-red/5 border border-school-red/10 rounded-xl flex items-center justify-center text-school-red">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-school-black">Our Vision</h3>
              <p className="text-gray-500 leading-relaxed text-sm md:text-base font-light pb-6 border-b border-gray-100">
                To be a globally recognized educational institution that cultivates lifelong learners, compassionate leaders, and responsible global citizens grounded in strong ethical values.
              </p>
              <ul className="space-y-3 pt-2">
                {['Global recognition', 'Compassionate leadership', 'Strong ethical values'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-500 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-school-red shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership / Principal Message - Magazine Visual Redesign */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-school-black to-neutral-900 text-white rounded-3xl p-8 md:p-16 border border-white/10 relative shadow-2xl">
            <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
              {/* Left Column: Image & Badges (5 cols) */}
              <div className="lg:col-span-5 space-y-6 flex flex-col items-center lg:items-start">
                <div className="w-56 h-56 md:w-64 md:h-64 rounded-3xl overflow-hidden border-2 border-white/20 shadow-xl relative group">
                  <Image 
                    src="https://picsum.photos/seed/principal/400/400" 
                    alt="Principal Gujjeti Venkatesh" 
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                {/* Visual Badges/Chips */}
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start w-full">
                  <span className="px-3 py-1 rounded-full bg-school-orange/20 border border-school-orange/30 text-school-orange text-[10px] font-bold uppercase tracking-wider">Correspondent</span>
                  <span className="px-3 py-1 rounded-full bg-school-red/20 border border-school-red/30 text-school-red text-[10px] font-bold uppercase tracking-wider">Director & Principal</span>
                  <span className="px-3 py-1 rounded-full bg-school-yellow/20 border border-school-yellow/30 text-school-yellow text-[10px] font-bold uppercase tracking-wider">M.Sc Chemistry</span>
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-gray-300 text-[10px] font-bold uppercase tracking-wider">IIT Coach</span>
                </div>
              </div>

              {/* Right Column: Message & Details (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] text-school-yellow font-bold uppercase tracking-widest">Leadership Profile</span>
                  <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-white leading-tight">
                    Gujjeti Venkatesh
                  </h2>
                  <p className="text-xs text-gray-400">Post Graduate in Chemistry, Kakatiya University (2006) | Worked as Vice Principal at Sri Arunodaya Degree College</p>
                </div>
                
                <div className="relative border-l-2 border-school-orange pl-6 space-y-4">
                  <span className="text-4xl font-serif text-school-orange absolute -left-2 -top-4 opacity-55">“</span>
                  <p className="text-gray-300 italic text-sm md:text-base leading-relaxed font-light">
                    At Korutla Public School, we promote learning that focuses on conceptual clarity, logical analysis, thinking skills, comparison and contrast, and hands-on practical experience.
                  </p>
                  <p className="text-gray-300 italic text-sm md:text-base leading-relaxed font-light">
                    By combining Pinnacle Pearson, LEAD, and Spectropy IIT-NEET coaching, we create a futuristic environment where students become independent thinkers, confident communicators, and future leaders.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-[#F9FAFB] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 text-school-orange font-semibold tracking-wide uppercase text-xs">
              <span className="w-6 h-0.5 bg-school-orange"></span> The Pillars
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-school-black">Our Core Values</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Award, title: 'Excellence', desc: 'Striving for highest quality in academics, thinking skills, and sports achievements.', bg: 'from-school-orange/10 via-school-orange/5 to-white', color: 'text-school-orange border-school-orange/20' },
              { icon: Heart, title: 'Compassion', desc: 'Developing social-emotional care, empathy, caring behaviors, and good habits.', bg: 'from-school-red/10 via-school-red/5 to-white', color: 'text-school-red border-school-red/20' },
              { icon: Users, title: 'Community', desc: 'Fostering strong parent-teacher collaborations and student-led engagement.', bg: 'from-school-yellow/15 via-school-yellow/5 to-white', color: 'text-school-yellow border-school-yellow/30' },
              { icon: Target, title: 'Integrity', desc: 'Building ethical grounding, responsibility, moral values, and civic discipline.', bg: 'from-school-gray/10 via-school-gray/5 to-white', color: 'text-school-gray border-school-gray/20' },
            ].map((value, i) => (
              <div key={i} className={`bg-gradient-to-br ${value.bg} p-8 rounded-3xl border border-gray-100 hover:-translate-y-2 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center space-y-4`}>
                <div className={`w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-md border ${value.color}`}>
                  <value.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-heading text-school-black">{value.title}</h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
