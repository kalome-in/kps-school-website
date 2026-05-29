import Image from 'next/image';
import Link from 'next/link';
import { 
  Monitor, 
  Bus, 
  Fingerprint, 
  ShieldCheck, 
  Clock, 
  ChevronRight, 
  PhoneCall,
  GraduationCap,
  MessageSquare,
  Smartphone,
  Tablet
} from 'lucide-react';
import { FacilitiesExplorer } from '@/components/facilities-explorer';

export const metadata = {
  title: 'Facilities | Korutla Public School',
  description: 'Explore the modern infrastructure, multi-modal classrooms, biometric safety, transit fleet, and parent connectivity portals at Korutla Public School.',
};

export default function FacilitiesPage() {
  const metrics = [
    {
      value: '100%',
      label: 'Multi-Modal Learning',
      desc: 'Interactive TV-led classroom learning visual models.',
      icon: Monitor,
      color: 'text-school-orange',
      bg: 'bg-school-orange/5 border-school-orange/10'
    },
    {
      value: 'Tab CBT',
      label: 'Digital Testing',
      desc: 'Regular computer-based quizzes via school tablets.',
      icon: Tablet,
      color: 'text-school-yellow',
      bg: 'bg-school-yellow/15 border-school-yellow/30'
    },
    {
      value: 'Dual Biometrics',
      label: 'Double Safe Entry',
      desc: 'Facial and fingerprint biometric verification checkpoints.',
      icon: Fingerprint,
      color: 'text-school-orange',
      bg: 'bg-school-orange/5 border-school-orange/10'
    },
    {
      value: 'Real-time',
      label: 'WhatsApp Sync',
      desc: 'Automated attendance and academic parent communication.',
      icon: MessageSquare,
      color: 'text-school-red',
      bg: 'bg-school-red/5 border-school-red/10'
    }
  ];

  const spotlights = [
    {
      tag: 'Nursery - Class X',
      title: 'Multi-Modal Television Classrooms',
      desc: 'At Korutla Public School, we teach students through visual and interactive methods by equipping classrooms with high-contrast digital TVs. Standard textbook lessons are animated through 3D models and multi-sensory educational videos to maximize concept absorption.',
      image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=1200&auto=format&fit=crop',
      icon: Monitor,
      iconColor: 'text-school-yellow',
      iconBg: 'bg-school-yellow/5 border-school-yellow/20',
      textColor: 'text-school-yellow',
      features: [
        'HD Classroom Smart TV Displays',
        'LEAD Multi-Sensory Educational Videos',
        '3D Interactive Concept Models',
        'Enhanced Student Classroom Engagement'
      ]
    },
    {
      tag: 'Campus Security',
      title: 'Dual Student Biometric Safety Gate',
      desc: 'The safety of our students is our prime directive. Our campus entry and exit gates are managed by a state-of-the-art dual biometric system requiring both instant facial recognition and fingerprint scanning for verification.',
      image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=1200&auto=format&fit=crop',
      icon: Fingerprint,
      iconColor: 'text-school-orange',
      iconBg: 'bg-school-orange/5 border-school-orange/10',
      textColor: 'text-school-orange',
      features: [
        'Instant Facial Biometric Matching',
        'Fingerprint Verification Scanners',
        'Gated Log & Active Security Staff',
        'Automatic Gate entry/exit notifications'
      ]
    },
    {
      tag: 'Parent Communication',
      title: 'Direct WhatsApp Parent Sync & Mobile Apps',
      desc: 'Keep track of your child\'s school journey effortlessly. The school automatically broadcasts instant attendance log alerts (arrival and departure times) and regular progress details directly to parents via WhatsApp and our dedicated mobile applications.',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop',
      icon: Smartphone,
      iconColor: 'text-school-red',
      iconBg: 'bg-school-red/5 border-school-red/10',
      textColor: 'text-school-red',
      features: [
        'WhatsApp Attendance Broadcast Alerts',
        'Dedicated Parent App for Notifications',
        'Student App for Schedules & Homework',
        'Online Fee Payments & Progress Reports'
      ]
    }
  ];

  return (
    <div className="w-full bg-white">
      {/* 1. Hero Section - Styled exactly like About/Academics Pages */}
      <section className="relative h-[45vh] min-h-[350px] flex items-center justify-center overflow-hidden bg-school-black">
        <div className="absolute inset-0 bg-dot-pattern opacity-20"></div>
        <Image 
          src="/images/hero_banner.jpg" 
          alt="Facilities KPS" 
          fill
          priority
          className="object-cover opacity-35"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-school-black via-school-black/60 to-transparent" />
        <div className="relative z-10 text-center px-4 max-w-3xl space-y-4">
          <span className="inline-block px-3 py-1 rounded-md bg-white/5 text-school-orange font-semibold text-xs tracking-wider uppercase border border-white/10 backdrop-blur-sm">
            Facilities
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white tracking-tight">Modern Campus Facilities</h1>
          <p className="text-sm md:text-base text-gray-400 max-w-xl mx-auto font-light leading-relaxed">
            We provide a technology-integrated, safety-first educational ecosystem engineered to nurture intellectual growth, physical development, and digital parent connectivity.
          </p>
        </div>
      </section>

      {/* 2. Metrics Section */}
      <section className="py-12 bg-[#F9FAFB] border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, i) => {
              const Icon = metric.icon;
              return (
                <div 
                  key={i} 
                  className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col justify-between hover:-translate-y-1 hover:shadow-lg hover:border-school-orange/20 transition-all duration-300 group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-school-orange/5 to-transparent rounded-full blur-xl group-hover:scale-125 transition-transform duration-500"></div>
                  <div className="flex justify-between items-start relative z-10">
                    <span className="text-3xl md:text-4xl font-extrabold font-heading text-school-black tracking-tight">
                      {metric.value}
                    </span>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-transform duration-500 group-hover:scale-110 shadow-sm ${metric.bg} ${metric.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="mt-6 relative z-10">
                    <h3 className="text-base font-bold font-heading text-school-black group-hover:text-school-orange transition-colors">
                      {metric.label}
                    </h3>
                    <p className="text-xs text-gray-400 font-light mt-1.5 leading-relaxed">
                      {metric.desc}
                    </p>
                    
                    {/* Micro Progress Bar */}
                    <div className="mt-4 relative w-full h-1 bg-gray-200/60 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${
                          i === 0 ? 'bg-school-orange w-full' :
                          i === 1 ? 'bg-school-yellow w-3/4' :
                          i === 2 ? 'bg-school-orange w-[90%]' :
                          'bg-school-red w-full'
                        }`}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Interactive Facilities Explorer Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Unified Title block */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-school-orange font-semibold tracking-wide uppercase text-xs">
            <span className="w-6 h-0.5 bg-school-orange"></span> Campus Infrastructure
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-school-black">Explore Our Learning Ecosystem</h2>
          <p className="text-gray-400 text-sm md:text-base font-light">Select a category below to see details, Certified infrastructure parameters, and specialized facilities we host in our school.</p>
        </div>
        
        {/* Explorer UI */}
        <FacilitiesExplorer />
      </section>

      {/* 4. Flagship Spotlights (Alternating Rows) */}
      <section className="bg-[#F9FAFB] border-y border-gray-100 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 text-school-orange font-semibold tracking-wide uppercase text-xs">
              <span className="w-6 h-0.5 bg-school-orange"></span> Flagship Highlights
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-school-black">Modern Technology & Security</h2>
            <p className="text-gray-400 text-sm md:text-base font-light">A deep dive into our core student facilities where digital integration and campus safety happen daily.</p>
          </div>

          <div className="space-y-24">
            {spotlights.map((row, i) => {
              const Icon = row.icon;
              return (
                <div 
                  key={i} 
                  className={`flex flex-col lg:flex-row gap-16 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
                >
                  {/* Image Side */}
                  <div className="w-full lg:w-1/2 relative">
                    <div className="relative h-[380px] md:h-[450px] rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-neutral-100">
                      <Image 
                        src={row.image} 
                        alt={row.title} 
                        fill
                        className="object-cover hover:scale-102 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-6 left-6 border border-white/20 bg-black/45 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1.5 rounded-md uppercase tracking-wider">
                        {row.tag}
                      </div>
                    </div>
                  </div>

                  {/* Text Side */}
                  <div className="w-full lg:w-1/2 space-y-6">
                    <div>
                      <div className="inline-flex items-center gap-3 mb-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${row.iconBg} ${row.iconColor}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-heading font-bold text-school-black">{row.title}</h3>
                      </div>
                      <p className="text-sm md:text-base text-gray-500 font-light leading-relaxed">
                        {row.desc}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-heading font-semibold text-xs tracking-wider uppercase text-school-black">Facility Features</h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {row.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm">
                            <ChevronRight className="w-4 h-4 shrink-0 mt-0.5 text-school-orange" />
                            <span className="text-xs md:text-sm font-medium text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Campus Security Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="bg-gradient-to-br from-school-black to-neutral-900 text-white rounded-3xl p-8 md:p-16 border border-white/10 relative shadow-2xl">
          <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none"></div>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-12">
            <div className="max-w-2xl space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 font-heading">
                  Active Monitoring Systems
                </span>
              </div>
              <h3 className="text-3xl font-bold font-heading text-white tracking-tight">
                Safety First Campus & Transit Protocols
              </h3>
              <p className="text-xs md:text-sm text-gray-400 font-light leading-relaxed">
                The safety of our students is our prime directive. Our facility maintains a security perimeter managed by biometric checkposts, continuous camera networks, and secure transport links.
              </p>
              
              {/* Grid elements matching core colors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-school-orange shrink-0 shadow-sm">
                    <Fingerprint className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white">Student Dual Biometrics</h5>
                    <p className="text-xs text-gray-400 font-light mt-0.5 leading-relaxed">
                      Facial recognition and fingerprint scanning checkpoints for gated entry/exit logging.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-school-yellow shrink-0 shadow-sm">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white">CCTV Surveillance Grid</h5>
                    <p className="text-xs text-gray-400 font-light mt-0.5 leading-relaxed">
                      Continuous camera feeds cover classrooms, corridors, and perimeters.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-school-orange shrink-0 shadow-sm">
                    <Bus className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white">GPS Transit Notifications</h5>
                    <p className="text-xs text-gray-400 font-light mt-0.5 leading-relaxed">
                      Real-time bus tracking and speed notifications sent to parent devices.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-school-red shrink-0 shadow-sm">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white">Safety Audits & Drills</h5>
                    <p className="text-xs text-gray-400 font-light mt-0.5 leading-relaxed">
                      Regular training sessions for fire compliance and emergency responses.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Security Box */}
            <div className="lg:w-80 bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4 shrink-0 backdrop-blur-sm self-stretch lg:self-auto flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs text-gray-400">
                  <span>Safety Status</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Live
                  </span>
                </div>
                <div className="p-3 bg-white/5 rounded-lg border border-white/10 flex justify-between items-center text-xs">
                  <span className="text-gray-300">Biometric Checkposts</span>
                  <span className="font-semibold text-white">Active</span>
                </div>
                <div className="p-3 bg-white/5 rounded-lg border border-white/10 flex justify-between items-center text-xs">
                  <span className="text-gray-300">CCTV Nodes</span>
                  <span className="font-semibold text-white">Operational</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 text-center">
                <span className="block text-[10px] text-gray-400 uppercase tracking-widest font-bold font-heading">Emergency Line</span>
                <a href="tel:+919848459246" className="inline-flex items-center gap-1.5 text-school-yellow hover:text-school-orange font-bold text-sm mt-1 transition-colors">
                  <PhoneCall className="w-4 h-4" />
                  <span>+91 98484 59246</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Admissions CTA & Contact - Standardized with Home/Academics pages */}
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
