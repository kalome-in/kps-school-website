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

      {/* History & Overview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-school-orange font-semibold tracking-wide uppercase text-xs">
                <span className="w-6 h-0.5 bg-school-orange"></span> Our Heritage
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-school-black leading-tight">A Legacy of Excellence in Education</h2>
              <div className="space-y-4 text-gray-500 text-sm md:text-base leading-relaxed font-light">
                <p>
                  Founded with a profound vision to provide world-class education, Korutla Public School has grown to become a beacon of learning, innovation, and character-building in the region.
                </p>
                <p>
                  For over two decades, we have been shaping young minds from their early years through to high school, instilling in them the values of integrity, respect, and a lifelong love for learning. Our alumni are testaments to the robust foundation laid during their time with us.
                </p>
                <p>
                  Today, we continue to embrace modern educational paradigms while staying rooted in our core values, offering a dynamic and holistic curriculum tailored for the 21st century.
                </p>
              </div>
            </div>
            <div className="relative h-[480px] rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
              <Image 
                src="https://picsum.photos/seed/heritage/800/1000" 
                alt="School Heritage" 
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-6 rounded-xl shadow-sm border border-gray-100/40">
                <p className="font-heading font-bold text-base md:text-lg text-school-black leading-snug">{"\"Education is not preparation for life; education is life itself.\""}</p>
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

      {/* Leadership / Principal Message */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-school-black text-white rounded-2xl p-8 md:p-12 border border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-dot-pattern opacity-10"></div>
            <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
              <div className="w-44 h-44 md:w-56 md:h-56 rounded-2xl overflow-hidden shrink-0 border border-white/10 shadow-md">
                <Image 
                  src="https://picsum.photos/seed/principal/400/400" 
                  alt="Principal" 
                  width={224}
                  height={224}
                  className="object-cover w-full h-full"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-4">
                <div className="space-y-1">
                  <h2 className="text-2xl md:text-3xl font-heading font-bold">Message from the Principal</h2>
                  <h4 className="text-school-yellow font-semibold tracking-wider text-xs uppercase">Dr. AN Sharma</h4>
                </div>
                <div className="space-y-4 text-gray-300 italic font-light text-sm md:text-base leading-relaxed">
                  <p>
                    {"\"Welcome to Korutla Public School. Our goal is to nurture not just academic brilliance, but to shape character and instill a lifelong passion for knowledge."} 
                  </p>
                  <p>
                    {"We provide a safe, supportive, and stimulating environment where each child is valued and encouraged to reach their highest potential. Together with our dedicated staff and supportive parent community, we are building the leaders of tomorrow.\""}
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
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Award, title: 'Excellence', color: 'hover:border-school-orange hover:text-school-orange' },
              { icon: Heart, title: 'Compassion', color: 'hover:border-school-red hover:text-school-red' },
              { icon: Users, title: 'Community', color: 'hover:border-school-yellow hover:text-school-yellow' },
              { icon: Target, title: 'Integrity', color: 'hover:border-school-gray hover:text-school-gray' },
            ].map((value, i) => (
              <div key={i} className="flex flex-col items-center space-y-4 group">
                <div className={`w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-100 text-school-gray transition-all duration-300 hover:shadow-md ${value.color}`}>
                  <value.icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold font-heading text-school-black">{value.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
