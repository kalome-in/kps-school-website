import Image from 'next/image';
import { Monitor, Microscope, Library, Trophy, Bus, Fingerprint, Palette, Activity } from 'lucide-react';

export const metadata = {
  title: 'Facilities | Korutla Public School',
  description: 'Explore the modern infrastructure, labs, library, and sports facilities at Korutla Public School.',
};

export default function FacilitiesPage() {
  const facilities = [
    {
      title: 'Smart Classrooms',
      icon: Monitor,
      desc: 'Air-conditioned Classrooms equipped with interactive flat panels and high-speed internet to make learning dynamic and engaging.',
      image: 'seed/smartclass/600/400'
    },
    {
      title: 'Science Laboratories',
      icon: Microscope,
      desc: 'State-of-the-art Physics, Chemistry, and Biology labs ensuring hands-on practical experience under expert supervision.',
      image: 'seed/sciencelab/600/400'
    },
    {
      title: 'Digital Library',
      icon: Library,
      desc: 'A vast collection of physical books, journals, and digital resources to foster a habit of reading and research.',
      image: 'seed/library/600/400'
    },
    {
      title: 'Sports & Athletics',
      icon: Trophy,
      desc: 'Expansive playgrounds, indoor sports complex, and professional coaching for cricket, football, basketball, and athletics.',
      image: 'seed/sports/600/400'
    },
    {
      title: 'Safe Transportation',
      icon: Bus,
      desc: 'Our school provides dedicated, safe, and comfortable bus transportation services for all students across Korutla.',
      image: 'seed/transport/600/400'
    },
    {
      title: 'Auditorium/Multi-Purpose Hall',
      icon: Palette,
      desc: 'A modern, acoustic-treated hall for assemblies, guest lectures, cultural fests, and student activities.',
      image: 'seed/auditorium/600/400'
    },
    {
      title: 'Co-Curricular Activities',
      icon: Activity,
      desc: 'Specialized programs and classes in Karate, Dance, Yoga, and Abacus to build cognitive and physical agility.',
      image: 'seed/cocurricular/600/400'
    }
  ];

  return (
    <div className="w-full bg-white pb-24">
      {/* Header */}
      <section className="relative h-[45vh] min-h-[350px] flex items-center justify-center overflow-hidden bg-school-black">
        <div className="absolute inset-0 bg-dot-pattern opacity-20"></div>
        <Image 
          src="https://picsum.photos/seed/facilities/1920/1080" 
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
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white tracking-tight">World-Class Infrastructure</h1>
          <p className="text-sm md:text-base text-gray-400 max-w-xl mx-auto font-light leading-relaxed">
            We provide an environment that not only facilitates academic learning but also encourages all-round physical and mental development.
          </p>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((fac, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-200/60 flex flex-col group hover:shadow-sm transition-all duration-300">
              <div className="relative h-56 overflow-hidden">
                <Image 
                  src={`https://picsum.photos/${fac.image}`} 
                  alt={fac.title} 
                  fill
                  className="object-cover group-hover:scale-103 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/95 backdrop-blur-sm rounded-lg flex items-center justify-center text-school-orange border border-white/20 shadow-sm">
                   <fac.icon className="w-5 h-5" />
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="text-xl font-bold font-heading text-school-black">{fac.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-xs md:text-sm font-light">{fac.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Campus Security - Contrast Bug Fixed */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="bg-school-black text-white rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden border border-white/5">
          <div className="absolute inset-0 bg-dot-pattern opacity-10"></div>
          <div className="w-16 h-16 bg-school-red/10 border border-school-red/20 text-school-red rounded-xl flex items-center justify-center shrink-0 shadow-sm relative z-10">
             <Fingerprint className="w-8 h-8" />
          </div>
          <div className="relative z-10 space-y-2">
            <h3 className="text-xl md:text-2xl font-heading font-bold text-white">Uncompromising Campus Security</h3>
            <p className="text-xs md:text-sm text-gray-400 font-light leading-relaxed max-w-3xl">
              The safety of our students is our highest priority. Our entire campus is secured with 24/7 CCTV surveillance, restricted visitor entry, ID card scanning, and trained security personnel.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
