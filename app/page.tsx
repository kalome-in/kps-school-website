import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpen, Users, Trophy, GraduationCap, Microscope, Monitor, Library, Palette, Calendar, MessageSquare, PhoneCall, ChevronRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-white">
      {/* SECTION 1 - HERO SECTION */}
      <section className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-school-black">
        {/* Brand Dot Pattern Background */}
        <div className="absolute inset-0 z-0 bg-dot-pattern opacity-20"></div>
        
        {/* Background Image showing a campus or students */}
        <Image 
          src="https://picsum.photos/seed/schoolhero/1920/1080" 
          alt="Korutla Public School Campus" 
          fill
          priority
          className="object-cover opacity-35 mix-blend-overlay"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-school-black via-school-black/80 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl space-y-6">
            <span className="inline-block px-3 py-1 rounded-md bg-white/5 text-school-orange font-semibold text-xs tracking-wider uppercase border border-white/10 backdrop-blur-sm">
              Welcome to Korutla Public School
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-[1.15] tracking-tight">
              Empowering Minds, <br />
              Educating Leaders, <br />
              <span className="text-school-orange">Elevating Futures.</span>
            </h1>
            <p className="text-base md:text-lg text-gray-400 leading-relaxed max-w-xl font-light">
              Experience a modern educational environment dedicated to fostering academic excellence, innovation, and holistic student development.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/admissions" className="bg-school-orange hover:bg-school-yellow text-white hover:text-school-black px-6 py-3 rounded-lg font-semibold transition-all shadow-sm flex items-center gap-2">
                Begin Admission <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/about" className="bg-white/5 hover:bg-white/10 text-white backdrop-blur-sm px-6 py-3 rounded-lg font-semibold transition-all border border-white/10 flex items-center gap-2">
                Discover More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 - SCHOOL OVERVIEW */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-school-orange font-semibold tracking-wide uppercase text-xs">
                <span className="w-6 h-0.5 bg-school-orange"></span> About Us
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-school-black leading-tight">A legacy of educational excellence and innovation</h2>
              <p className="text-gray-500 leading-relaxed text-sm md:text-base font-light">
                At Korutla Public School, managed by Kalam Dreams Educational Society, we believe in empowering every child to discover their true potential. Established in 2016, our comprehensive curriculum, state-of-the-art facilities, and dedicated faculty create an environment where learning is engaging, practical, and futuristic.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-100">
                <div>
                  <h4 className="font-heading font-semibold text-base text-school-black">Our Vision</h4>
                  <p className="text-xs text-gray-400 mt-2 leading-relaxed">To be a leading institution that cultivates global citizens with strong values.</p>
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-base text-school-black">Our Mission</h4>
                  <p className="text-xs text-gray-400 mt-2 leading-relaxed">Providing holistic education through modern methodologies and continuous innovation.</p>
                </div>
              </div>
            </div>
            
            {/* Stats Cards Grid - Uniform and Minimalist */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6 pt-12">
                <div className="bg-[#F9FAFB] p-6 rounded-2xl text-center border border-gray-100 hover:border-school-orange transition-colors">
                  <div className="text-4xl font-bold text-school-orange font-heading mb-2">2016</div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-school-gray">Established</div>
                </div>
                <div className="bg-[#F9FAFB] p-6 rounded-2xl text-center border border-gray-100 hover:border-school-red transition-colors">
                  <div className="text-4xl font-bold text-school-red font-heading mb-2">8</div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-school-gray">LEAD Championship Finalists</div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-[#F9FAFB] p-6 rounded-2xl text-center border border-gray-100 hover:border-school-yellow transition-colors">
                  <div className="text-4xl font-bold text-school-yellow font-heading mb-2">35 Max</div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-school-gray">ICON-IIT Class Strength</div>
                </div>
                <div className="bg-[#F9FAFB] p-6 rounded-2xl text-center border border-gray-100 hover:border-school-gray transition-colors">
                  <div className="text-4xl font-bold text-school-gray font-heading mb-2">100%</div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-school-gray">Smart Classrooms</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 - WHY CHOOSE US */}
      <section className="py-24 bg-[#F9FAFB] border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 text-school-orange font-semibold tracking-wide uppercase text-xs">
              <span className="w-6 h-0.5 bg-school-orange"></span> Why Us
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-school-black">Why Choose Korutla?</h2>
            <p className="text-gray-400 text-sm md:text-base font-light">We provide a unique blend of academic rigor, character building, and modern infrastructure to ensure your child&apos;s success.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: BookOpen, title: '1. Academic Excellence', desc: 'Strong focus on academic results, conceptual understanding, and systematic coaching.', border: 'hover:border-school-orange', bg: 'bg-school-orange/5 text-school-orange border-school-orange/10' },
              { icon: Trophy, title: '2. Extra-Curriculars', desc: 'Holistic growth through sports, yoga, karate, dance, art & craft, and abacus classes.', border: 'hover:border-school-red', bg: 'bg-school-red/5 text-school-red border-school-red/10' },
              { icon: Library, title: '3. Finite Curriculum Solutions', desc: 'Integrating high-quality solutions like Pearson Pinnacle, LEAD school system, and IIT Foundation.', border: 'hover:border-school-yellow', bg: 'bg-school-yellow/5 text-school-yellow border-school-yellow/20' },
              { icon: Users, title: '4. Experienced Faculty', desc: 'Passionate and fully trained teachers skilled in competitive coaching and digital methods.', border: 'hover:border-school-gray', bg: 'bg-school-gray/5 text-school-gray border-school-gray/10' },
              { icon: GraduationCap, title: '5. Olympiad Achievements', desc: 'Students actively participate and rank in Suchirindia Olympiads and MI Champ exams.', border: 'hover:border-school-orange', bg: 'bg-school-orange/5 text-school-orange border-school-orange/10' },
              { icon: Monitor, title: '6. Multimodal Learning', desc: 'Digital classrooms enabled with interactive flat panels and digital video lectures.', border: 'hover:border-school-red', bg: 'bg-school-red/5 text-school-red border-school-red/10' },
              { icon: Microscope, title: '7. All-Round Development', desc: 'Enhancing crucial 21st-century skills: communication, collaboration, creativity, and leadership.', border: 'hover:border-school-yellow', bg: 'bg-school-yellow/5 text-school-yellow border-school-yellow/20' }
            ].map((feature, i) => (
              <div key={i} className={`bg-white p-8 rounded-2xl border border-gray-100 ${feature.border} transition-all duration-300 hover:shadow-sm ${i === 6 ? 'md:col-span-2 lg:col-span-1' : ''}`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 border ${feature.bg}`}>
                  <feature.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold font-heading text-school-black mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-light">{feature.desc}</p>
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

      {/* SECTION 7.5 - CHAMPIONSHIPS & ACHIEVEMENTS */}
      <section className="py-24 bg-[#F9FAFB] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 text-school-orange font-semibold tracking-wide uppercase text-xs">
              <span className="w-6 h-0.5 bg-school-orange"></span> Ranks & Victories
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-school-black">Championships & Achievements</h2>
            <p className="text-gray-400 text-sm md:text-base font-light">Celebrating our students&apos; outstanding performances at national, state, and district levels.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Card 1 - Sports */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200/60 shadow-sm flex flex-col justify-between hover:border-school-orange transition-all">
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-xl bg-school-orange/5 border border-school-orange/10 flex items-center justify-center text-school-orange">
                  <Trophy className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-heading font-bold text-school-black">Sports Achievements</h3>
                <ul className="space-y-4 text-xs md:text-sm text-gray-500 font-light">
                  <li className="flex gap-2.5 items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-school-orange shrink-0 mt-2"></span>
                    <span><strong>National Level Softball (Kerala)</strong>: 2nd Place / Silver Medalists.</span>
                  </li>
                  <li className="flex gap-2.5 items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-school-orange shrink-0 mt-2"></span>
                    <span><strong>State Level Netball & Softball</strong>: Active representation at Nagarjunasagar, Nirmal, and Nalgonda.</span>
                  </li>
                  <li className="flex gap-2.5 items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-school-orange shrink-0 mt-2"></span>
                    <span><strong>Kho Kho & Taekwondo</strong>: Gold medals at District levels and cross-country representation in Kamareddy.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Card 2 - Olympiads */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200/60 shadow-sm flex flex-col justify-between hover:border-school-red transition-all">
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-xl bg-school-red/5 border border-school-red/10 flex items-center justify-center text-school-red">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-heading font-bold text-school-black">Olympiad Ranks</h3>
                <ul className="space-y-4 text-xs md:text-sm text-gray-500 font-light">
                  <li className="flex gap-2.5 items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-school-red shrink-0 mt-2"></span>
                    <span><strong>B. Nagachaitanya (Class V)</strong>: 3rd Rank, All India Math Challenge Exam.</span>
                  </li>
                  <li className="flex gap-2.5 items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-school-red shrink-0 mt-2"></span>
                    <span><strong>Suthari Shanvitha (Class III)</strong>: State 3rd Rank, 31st Telangana Level Olympiad.</span>
                  </li>
                  <li className="flex gap-2.5 items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-school-red shrink-0 mt-2"></span>
                    <span><strong>District 1st Ranks</strong>: Arise Vishwak (Class III) & Nemuri Nithyasri (Class IV). Jem Srinidhi (Class V) secured District 2nd Rank.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Card 3 - LEAD & Society Honors */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200/60 shadow-sm flex flex-col justify-between hover:border-school-yellow transition-all">
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-xl bg-school-yellow/5 border border-school-yellow/20 flex items-center justify-center text-school-yellow">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-heading font-bold text-school-black">Institutional Honors</h3>
                <ul className="space-y-4 text-xs md:text-sm text-gray-500 font-light">
                  <li className="flex gap-2.5 items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-school-yellow shrink-0 mt-2"></span>
                    <span><strong>National LEAD Championship</strong>: 8 KPS students qualified in the national finals, standing out among 2 lakh participants.</span>
                  </li>
                  <li className="flex gap-2.5 items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-school-yellow shrink-0 mt-2"></span>
                    <span><strong>Best School Award</strong>: Recognized for educational excellence and sports representation.</span>
                  </li>
                  <li className="flex gap-2.5 items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-school-yellow shrink-0 mt-2"></span>
                    <span><strong>LEAD Acharya Award</strong>: Awarded for outstanding pedagogical execution and teacher achievements.</span>
                  </li>
                </ul>
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
