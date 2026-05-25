import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpen, Users, Trophy, GraduationCap, Microscope, Monitor, Library, Palette, Calendar, MessageSquare, PhoneCall, ChevronRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-white">
      {/* SECTION 1 - HERO SECTION */}
      <section className="relative w-full h-[90vh] min-h-[650px] flex items-center justify-center overflow-hidden bg-school-black">
        {/* Brand Dot Pattern Background */}
        <div className="absolute inset-0 z-0 bg-dot-pattern opacity-25"></div>
        
        {/* Background Image showing a campus or students */}
        <Image 
          src="https://picsum.photos/seed/schoolhero/1920/1080" 
          alt="Korutla Public School Campus" 
          fill
          priority
          className="object-cover opacity-40 mix-blend-overlay scale-102 transition-transform duration-10000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-school-black via-school-black/85 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-4xl space-y-8">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-school-yellow font-bold text-[10px] tracking-widest uppercase border border-white/20 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-school-orange animate-pulse"></span>
              Welcome to Korutla Public School
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-extrabold text-white leading-[1.1] tracking-tight">
              Empowering Minds,<br />
              Educating Leaders,<br />
              <span className="bg-gradient-to-r from-school-orange via-school-red to-school-yellow bg-clip-text text-transparent drop-shadow-sm">Elevating Futures.</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl font-light">
              Experience a modern, competitive, and technology-enabled educational environment focused on complete student development and exam preparation.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/admissions" className="bg-gradient-to-r from-school-orange to-school-red hover:from-school-red hover:to-school-yellow text-white hover:text-school-black px-8 py-4 rounded-xl font-bold transition-all shadow-md flex items-center gap-2 text-sm">
                Begin Admission <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/about" className="bg-white/5 hover:bg-white/10 text-white backdrop-blur-md px-8 py-4 rounded-xl font-bold transition-all border border-white/20 flex items-center gap-2 text-sm">
                Discover More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 - SCHOOL OVERVIEW & STATS INFOGRAPHIC */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 text-school-orange font-semibold tracking-wide uppercase text-xs">
                <span className="w-6 h-0.5 bg-school-orange"></span> About Us
              </div>
              <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-school-black leading-tight">
                A Legacy of Educational Excellence & Innovation
              </h2>
              <p className="text-gray-500 leading-relaxed text-sm md:text-base font-light">
                At Korutla Public School, managed by Kalam Dreams Educational Society, we believe in empowering every child to discover their true potential. Established in 2016, our comprehensive curriculum, state-of-the-art facilities, and dedicated faculty create an environment where learning is engaging, practical, and futuristic.
              </p>
              
              {/* Vision & Mission Visual Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-gray-100">
                <div className="p-5 rounded-2xl bg-gradient-to-br from-school-orange/5 to-transparent border border-school-orange/10">
                  <h4 className="font-heading font-bold text-base text-school-black flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-school-orange"></span>
                    Our Vision
                  </h4>
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed font-light">To be a leading institution that cultivates global citizens with strong values, thinking abilities, and moral grounding.</p>
                </div>
                <div className="p-5 rounded-2xl bg-gradient-to-br from-school-red/5 to-transparent border border-school-red/10">
                  <h4 className="font-heading font-bold text-base text-school-black flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-school-red"></span>
                    Our Mission
                  </h4>
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed font-light">Providing holistic education through modern methodologies, competitive coaching (IIT/NEET), and continuous innovation.</p>
                </div>
              </div>
            </div>
            
            {/* Stats Dashboard Infographic */}
            <div className="bg-gradient-to-br from-school-black to-neutral-900 text-white p-8 rounded-3xl border border-white/10 relative overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-dot-pattern opacity-10"></div>
              
              <h3 className="text-lg font-heading font-bold mb-6 text-school-yellow flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-school-yellow animate-pulse"></span>
                KPS Performance Metrics
              </h3>
              
              <div className="grid grid-cols-2 gap-6 relative z-10">
                {/* Metric 1 */}
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col justify-between hover:bg-white/10 transition-all">
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Established</span>
                  <div className="mt-4">
                    <span className="text-4xl font-extrabold text-white">2016</span>
                    <p className="text-[10px] text-school-orange font-semibold mt-1">A Decade of Excellence</p>
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col justify-between hover:bg-white/10 transition-all">
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Class Size</span>
                  <div className="mt-4">
                    <span className="text-4xl font-extrabold text-white">35 Max</span>
                    <p className="text-[10px] text-school-red font-semibold mt-1">ICON-IIT Batch Size</p>
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col justify-between hover:bg-white/10 transition-all">
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">National Finals</span>
                  <div className="mt-4">
                    <span className="text-4xl font-extrabold text-white">8 Students</span>
                    <p className="text-[10px] text-school-yellow font-semibold mt-1">LEAD Champions</p>
                  </div>
                </div>

                {/* Metric 4 */}
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col justify-between hover:bg-white/10 transition-all">
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Technology</span>
                  <div className="mt-4">
                    <span className="text-4xl font-extrabold text-white">100%</span>
                    <p className="text-[10px] text-emerald-400 font-semibold mt-1">Smart Classrooms</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 - WHY CHOOSE US INFOGRAPHIC */}
      <section className="py-24 bg-gradient-to-b from-[#F9FAFB] to-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <div className="inline-flex items-center gap-2 text-school-orange font-semibold tracking-wide uppercase text-xs">
              <span className="w-6 h-0.5 bg-school-orange"></span> KPS Advantage Infographic
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-school-black">
              7 Reasons to Join Korutla Public School
            </h2>
            <p className="text-gray-500 text-sm md:text-base font-light">We integrate advanced technology, proven curriculums, and national-standard coaching for all-round growth.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: BookOpen, title: 'Academic Excellence', desc: 'Strong focus on conceptual clarity, structured study materials, and excellent academic records.', color: 'school-orange', bg: 'from-school-orange/10 via-school-orange/5 to-white', iconBg: 'bg-school-orange text-white' },
              { icon: Trophy, title: 'Extra-Curricular opportunities', desc: 'Holistic growth through Karate, Dance, Abacus, Yoga, and arts & crafts.', color: 'school-red', bg: 'from-school-red/10 via-school-red/5 to-white', iconBg: 'bg-school-red text-white' },
              { icon: Library, title: 'Finite Curriculum Solution', desc: 'Best-in-class educational pathways: Pearson Pinnacle (preschool), LEAD (primary), and Spectropy.', color: 'school-yellow', bg: 'from-school-yellow/15 via-school-yellow/5 to-white', iconBg: 'bg-school-yellow text-school-black' },
              { icon: Users, title: 'Expert Teaching Faculty', desc: 'Certified educators trained in modern digital methodologies and competitive mentoring.', color: 'school-gray', bg: 'from-school-gray/10 via-school-gray/5 to-white', iconBg: 'bg-school-gray text-white' },
              { icon: GraduationCap, title: 'National Olympiads', desc: 'Active student participation in Suchirindia Foundation and All India challenge exams.', color: 'school-orange', bg: 'from-school-orange/10 via-school-orange/5 to-white', iconBg: 'bg-school-orange text-white' },
              { icon: Monitor, title: 'Multimodal Smart Classrooms', desc: 'Digital teaching equipped with interactive TV/tabs and animated video lectures.', color: 'school-red', bg: 'from-school-red/10 via-school-red/5 to-white', iconBg: 'bg-school-red text-white' },
              { icon: Microscope, title: 'All-Round Development', desc: 'Enhancing communication, critical thinking, leadership skills, and ethical character building.', color: 'school-yellow', bg: 'from-school-yellow/15 via-school-yellow/5 to-white', iconBg: 'bg-school-yellow text-school-black' }
            ].map((feature, i) => (
              <div key={i} className={`bg-gradient-to-br ${feature.bg} p-8 rounded-3xl border border-gray-100 hover:scale-103 hover:shadow-lg transition-all duration-300 relative group overflow-hidden ${i === 6 ? 'md:col-span-2 lg:col-span-1' : ''}`}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 rounded-full blur-2xl group-hover:scale-150 transition-all duration-500"></div>
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold shadow-md ${feature.iconBg}`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-heading font-extrabold text-gray-300 group-hover:text-school-orange transition-colors">0{i+1}</span>
                </div>
                <h3 className="text-xl font-bold font-heading text-school-black mb-3">{feature.title}</h3>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed font-light">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 - ACADEMIC STRUCTURE */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-school-orange font-semibold tracking-wide uppercase text-xs">
                <span className="w-6 h-0.5 bg-school-orange"></span> Learning Journey
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-school-black">Academic Excellence at Every Step</h2>
            </div>
            <Link href="/academics" className="text-school-orange font-medium flex items-center gap-1.5 hover:underline text-sm">
              View Curriculum <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Pre-Primary', age: 'Ages 3-5', img: 'seed/preprimary/800/600', color: 'border-school-yellow/35', desc: 'A nurturing environment focusing on play-based learning, motor skills, and creative expression.' },
              { title: 'Primary', age: 'Classes I - V', img: 'seed/primary/800/600', color: 'border-school-orange/35', desc: 'Building strong foundations in core subjects while encouraging curiosity and critical thinking.' },
              { title: 'High School', age: 'Classes VI - X', img: 'seed/highschool/800/600', color: 'border-school-red/35', desc: 'Rigorous academics, leadership opportunities, and preparation for board examinations.' }
            ].map((program, i) => (
              <div key={i} className="group rounded-2xl overflow-hidden flex flex-col border border-gray-100 shadow-sm hover:shadow-md transition-all bg-white">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={`https://picsum.photos/${program.img}`}
                    alt={program.title}
                    fill
                    className="object-cover group-hover:scale-103 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 border border-white/20 bg-black/45 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-wider">
                    {program.age}
                  </div>
                </div>
                <div className={`p-8 flex-1 bg-white border-t-2 ${program.color} flex flex-col justify-between`}>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-school-black mb-3">{program.title}</h3>
                    <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-6 font-light">{program.desc}</p>
                  </div>
                  <Link href={`/academics#${program.title.toLowerCase().replace('-', '')}`} className="inline-flex items-center text-xs font-semibold text-school-black hover:text-school-orange transition-colors">
                    Explore Program <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 - FACILITIES SHOWCASE - Redesigned to Light Theme */}
      <section className="py-24 bg-[#F9FAFB] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 text-school-orange font-semibold tracking-wide uppercase text-xs">
              <span className="w-6 h-0.5 bg-school-orange"></span> Campus Infrastructure
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-school-black">World-Class Facilities</h2>
            <p className="text-gray-400 text-sm md:text-base font-light">An environment designed to inspire creativity, foster collaboration, and support comprehensive learning.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Monitor, name: 'Computer Labs', hoverColor: 'hover:border-school-orange hover:text-school-orange' },
              { icon: Microscope, name: 'Science Labs', hoverColor: 'hover:border-school-red hover:text-school-red' },
              { icon: Library, name: 'Digital Library', hoverColor: 'hover:border-school-yellow hover:text-school-yellow' },
              { icon: Trophy, name: 'Sports Complex', hoverColor: 'hover:border-school-orange hover:text-school-orange' },
            ].map((facility, i) => (
              <div key={i} className={`aspect-square relative group overflow-hidden rounded-2xl border border-gray-200/60 bg-white flex flex-col items-center justify-center p-6 text-center transition-all duration-300 hover:shadow-sm ${facility.hoverColor}`}>
                <facility.icon className="w-10 h-10 text-school-gray mb-4 group-hover:scale-105 transition-transform duration-300" />
                <h3 className="font-heading font-semibold text-base text-school-black">{facility.name}</h3>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/facilities" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-school-black hover:bg-school-black hover:text-white transition-colors font-medium text-xs md:text-sm">
              Take a Campus Tour
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 6 & 7 - EVENTS AND NOTICES */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Events */}
            <div className="space-y-8">
              <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                <h2 className="text-2xl font-heading font-bold text-school-black flex items-center gap-2.5">
                  <Palette className="w-6 h-6 text-school-orange" /> Recent Events
                </h2>
                <Link href="/events" className="text-xs font-semibold text-school-gray hover:text-school-orange transition-colors">See All</Link>
              </div>
              <div className="space-y-6">
                {[1, 2].map((i) => (
                  <div key={i} className="flex gap-6 group cursor-pointer bg-[#F9FAFB] p-4 rounded-xl border border-gray-100 hover:border-school-orange transition-all">
                    <div className="w-20 h-20 relative rounded-lg overflow-hidden shrink-0">
                      <Image src={`https://picsum.photos/seed/event${i}/400/400`} alt="Event" fill className="object-cover group-hover:scale-103 transition-transform duration-500" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="text-[10px] font-bold text-school-orange uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" /> Oct {14 + i}, 2025
                      </span>
                      <h4 className="font-heading font-bold text-school-black text-sm md:text-base group-hover:text-school-orange transition-colors">Annual Science Exhibition</h4>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-1 font-light">Students showcase their innovative science projects and working models.</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notices */}
            <div className="space-y-8">
              <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                <h2 className="text-2xl font-heading font-bold text-school-black flex items-center gap-2.5">
                  <MessageSquare className="w-6 h-6 text-school-red" /> Announcements
                </h2>
                <Link href="/notices" className="text-xs font-semibold text-school-gray hover:text-school-red transition-colors">View Board</Link>
              </div>
              <div className="space-y-4">
                {[
                  { date: 'Oct 20', tag: 'Exam', title: 'Half-Yearly Examination Timetable Released for Grades I to X.' },
                  { date: 'Oct 18', tag: 'Holiday', title: 'School will remain closed on Oct 24th due to Diwali.' },
                  { date: 'Oct 15', tag: 'Circular', title: 'Parent-Teacher Meeting scheduled for coming Saturday.' },
                ].map((notice, i) => (
                  <div key={i} className="bg-white p-5 rounded-xl border border-gray-100 border-l-[3px] border-l-school-yellow hover:border-l-school-orange hover:shadow-sm transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] font-bold bg-[#F9FAFB] text-school-gray px-2 py-0.5 rounded border border-gray-100">
                        {notice.date}
                      </span>
                      <span className="text-[10px] font-bold text-school-orange uppercase tracking-wider">
                        {notice.tag}
                      </span>
                    </div>
                    <p className="font-medium text-school-black text-sm leading-relaxed">{notice.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7.5 - CHAMPIONSHIPS & ACHIEVEMENTS INFOGRAPHIC */}
      <section className="py-24 bg-gradient-to-br from-white via-school-light to-[#F9FAFB] border-t border-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <div className="inline-flex items-center gap-2 text-school-red font-semibold tracking-wide uppercase text-xs">
              <span className="w-6 h-0.5 bg-school-red"></span> KPS Wall of Fame
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-school-black leading-tight">
              Championships & Ranks
            </h2>
            <p className="text-gray-500 text-sm md:text-base font-light">Celebrating our students&apos; outstanding performances at national, state, and district levels.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Card 1 - Sports */}
            <div className="bg-white rounded-3xl p-8 border border-gray-200/60 shadow-xl relative overflow-hidden group hover:border-school-orange transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-school-orange/5 rounded-bl-full group-hover:scale-110 transition-transform"></div>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-school-orange/10 flex items-center justify-center text-school-orange">
                    <Trophy className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-extrabold text-school-black">Sports Arena</h3>
                    <p className="text-[10px] text-school-orange uppercase font-bold tracking-wider">National & State Victories</p>
                  </div>
                </div>

                <div className="space-y-6 pt-4 border-t border-gray-100">
                  <div className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-school-orange/10 text-school-orange font-bold text-xs">🥈</span>
                    <div>
                      <h4 className="font-heading font-bold text-sm text-school-black">National Level Softball</h4>
                      <p className="text-xs text-gray-400 mt-1 leading-relaxed font-light">2nd Place (Silver Medal) representing Telangana at Kerala national meet.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-school-orange/10 text-school-orange font-bold text-xs">⭐</span>
                    <div>
                      <h4 className="font-heading font-bold text-sm text-school-black">State Representative</h4>
                      <p className="text-xs text-gray-400 mt-1 leading-relaxed font-light">Major representations in Netball (Nagarjunasagar) and Softball (Nirmal, Nalgonda).</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-school-orange/10 text-school-orange font-bold text-xs">🏆</span>
                    <div>
                      <h4 className="font-heading font-bold text-sm text-school-black">District Gold Medals</h4>
                      <p className="text-xs text-gray-400 mt-1 leading-relaxed font-light">Kho Kho & Taekwondo district victories, and Cross Country at Kamareddy.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 - Olympiads */}
            <div className="bg-white rounded-3xl p-8 border border-gray-200/60 shadow-xl relative overflow-hidden group hover:border-school-red transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-school-red/5 rounded-bl-full group-hover:scale-110 transition-transform"></div>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-school-red/10 flex items-center justify-center text-school-red">
                    <GraduationCap className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-extrabold text-school-black">Olympiad Ranks</h3>
                    <p className="text-[10px] text-school-red uppercase font-bold tracking-wider">Academic Challenge Victories</p>
                  </div>
                </div>

                <div className="space-y-6 pt-4 border-t border-gray-100">
                  <div className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-school-red/10 text-school-red font-bold text-xs">🇮🇳</span>
                    <div>
                      <h4 className="font-heading font-bold text-sm text-school-black">All India Math Challenge</h4>
                      <p className="text-xs text-gray-400 mt-1 leading-relaxed font-light">B. Nagachaitanya (Grade V) secured the **3rd Rank** at the national level.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-school-red/10 text-school-red font-bold text-xs">🎖️</span>
                    <div>
                      <h4 className="font-heading font-bold text-sm text-school-black">31st State Level Olympiad</h4>
                      <p className="text-xs text-gray-400 mt-1 leading-relaxed font-light">Suthari Shanvitha (Grade III) achieved **State 3rd Rank** in Suchirindia.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-school-red/10 text-school-red font-bold text-xs">🥇</span>
                    <div>
                      <h4 className="font-heading font-bold text-sm text-school-black">District 1st Ranks</h4>
                      <p className="text-xs text-gray-400 mt-1 leading-relaxed font-light">Arise Vishwak (Grade III) & Nemuri Nithyasri (Grade IV) - District 1st. Jem Srinidhi (Grade V) - District 2nd.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 - LEAD & Society Honors Infographic */}
            <div className="bg-white rounded-3xl p-8 border border-gray-200/60 shadow-xl relative overflow-hidden group hover:border-school-yellow transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-school-yellow/5 rounded-bl-full group-hover:scale-110 transition-transform"></div>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-school-yellow/10 flex items-center justify-center text-school-yellow">
                    <Users className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-extrabold text-school-black">Society Honors</h3>
                    <p className="text-[10px] text-school-yellow uppercase font-bold tracking-wider">National Level Standard</p>
                  </div>
                </div>

                <div className="space-y-6 pt-4 border-t border-gray-100">
                  {/* LEAD Infographic Widget */}
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-school-yellow/15 to-transparent border border-school-yellow/20 space-y-3">
                    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-school-black">
                      <span>LEAD Championship</span>
                      <span className="text-school-red">8 Qualifiers</span>
                    </div>
                    <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-school-red to-school-yellow rounded-full w-[85%]"></div>
                    </div>
                    <p className="text-[10.5px] text-gray-500 leading-normal font-light">
                      KPS students stood out nationally in a pool of **2 Lakh participants**, with 8 of our students qualifying for the elite **2,000 national finalists**.
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-school-yellow/10 text-school-yellow font-bold text-xs">🏫</span>
                    <div>
                      <h4 className="font-heading font-bold text-sm text-school-black">Best School Award</h4>
                      <p className="text-xs text-gray-400 mt-1 leading-relaxed font-light">Awarded for all-round excellence, sports infrastructure, and leadership coaching.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-school-yellow/10 text-school-yellow font-bold text-xs">🎓</span>
                    <div>
                      <h4 className="font-heading font-bold text-sm text-school-black">LEAD Acharya Award</h4>
                      <p className="text-xs text-gray-400 mt-1 leading-relaxed font-light">Honoring teaching faculty excellence and digital integration success.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8 - ADMISSIONS CTA & CONTACT - Redesigned to Premium Dark theme */}
      <section className="bg-school-black relative overflow-hidden py-16 border-t border-white/5">
        <div className="absolute inset-0 bg-dot-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white/5 rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 border border-white/10 backdrop-blur-sm">
            <div className="max-w-xl space-y-6">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white leading-tight">Ready to shape your child&apos;s future?</h2>
              <p className="text-sm md:text-base text-gray-400 font-light leading-relaxed">Admissions for the academic year 2026-2027 are now open. Secure your child&apos;s place at Korutla Public School today.</p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link href="/admissions" className="bg-school-orange hover:bg-school-yellow text-white hover:text-school-black px-6 py-3.5 rounded-lg font-bold text-sm transition-all shadow-sm">
                  Apply for Admission
                </Link>
                <a href="tel:+919848459246" className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-6 py-3.5 rounded-lg font-bold text-sm transition-all flex items-center gap-2">
                  <PhoneCall className="w-4 h-4" /> Call Us
                </a>
              </div>
            </div>

            <div className="hidden md:flex select-none relative w-56 h-56 shrink-0">
              <div className="relative z-10 w-full h-full bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 hover:border-school-orange transition-colors group">
                <GraduationCap className="w-24 h-24 text-school-yellow group-hover:scale-105 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
