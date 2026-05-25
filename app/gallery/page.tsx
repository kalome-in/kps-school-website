'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Calendar, Eye, Image as ImageIcon, MapPin } from 'lucide-react';

const TABS = ['All', 'Science Exhibition', 'Sports Meet', 'Diwali Fest', 'Independence Day', 'Investiture Ceremony'];

const GALLERY_ITEMS = [
  {
    id: 1,
    category: 'Science Exhibition',
    title: 'Science Project Showcase',
    desc: 'Students presenting working models of solar tracking systems.',
    date: 'Oct 15, 2026',
    location: 'School Auditorium',
    image: '/images/gallery_science1.jpg',
    fallback: 'https://picsum.photos/seed/sci1/800/600'
  },
  {
    id: 2,
    category: 'Science Exhibition',
    title: 'Biological Charts Display',
    desc: 'Interactive plant cell model exhibits designed by Grade VIII.',
    date: 'Oct 15, 2026',
    location: 'School Auditorium',
    image: '/images/gallery_science2.jpg',
    fallback: 'https://picsum.photos/seed/sci2/800/600'
  },
  {
    id: 3,
    category: 'Sports Meet',
    title: '100m Sprint Finals',
    desc: 'High school track athletes racing to the finish line.',
    date: 'Nov 05, 2026',
    location: 'Main Sports Ground',
    image: '/images/gallery_sports1.jpg',
    fallback: 'https://picsum.photos/seed/spr1/800/600'
  },
  {
    id: 4,
    category: 'Sports Meet',
    title: 'Netball Champions',
    desc: 'KPS netball girls team celebrating their state tournament victory.',
    date: 'Nov 05, 2026',
    location: 'Main Sports Ground',
    image: '/images/gallery_sports2.jpg',
    fallback: 'https://picsum.photos/seed/spr2/800/600'
  },
  {
    id: 5,
    category: 'Diwali Fest',
    title: 'Colorful Rangoli Art',
    desc: 'Students decorating the corridors with floral designs.',
    date: 'Oct 22, 2026',
    location: 'Central Courtyard',
    image: '/images/gallery_diwali1.jpg',
    fallback: 'https://picsum.photos/seed/diw1/800/600'
  },
  {
    id: 6,
    category: 'Diwali Fest',
    title: 'Diya Lighting assembly',
    desc: 'Whole-school lighting assembly and traditional song rendition.',
    date: 'Oct 22, 2026',
    location: 'Campus Ground',
    image: '/images/gallery_diwali2.jpg',
    fallback: 'https://picsum.photos/seed/diw2/800/600'
  },
  {
    id: 7,
    category: 'Independence Day',
    title: 'National Flag Hoisting',
    desc: 'Correspondent hoisting the Indian tricolor on Independence Day.',
    date: 'Aug 15, 2026',
    location: 'Assembly Ground',
    image: '/images/gallery_ind1.jpg',
    fallback: 'https://picsum.photos/seed/ind1/800/600'
  },
  {
    id: 8,
    category: 'Independence Day',
    title: 'House March Past',
    desc: 'Rigorous student house march past parade during national assembly.',
    date: 'Aug 15, 2026',
    location: 'Main Playground',
    image: '/images/gallery_ind2.jpg',
    fallback: 'https://picsum.photos/seed/ind2/800/600'
  },
  {
    id: 9,
    category: 'Investiture Ceremony',
    title: 'Prefect Badge Presentation',
    desc: 'Newly elected school captain receiving badges from the director.',
    date: 'Jul 20, 2026',
    location: 'School Auditorium',
    image: '/images/gallery_inv1.jpg',
    fallback: 'https://picsum.photos/seed/inv1/800/600'
  },
  {
    id: 10,
    category: 'Investiture Ceremony',
    title: 'Student Council Oath',
    desc: 'Student leadership team pledging their commitment to excellence.',
    date: 'Jul 20, 2026',
    location: 'School Auditorium',
    image: '/images/gallery_inv2.jpg',
    fallback: 'https://picsum.photos/seed/inv2/800/600'
  }
];

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState('All');

  const filteredItems = activeTab === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeTab);

  return (
    <div className="w-full bg-white pb-24">
      {/* Header Banner */}
      <section className="relative h-[45vh] min-h-[350px] flex items-center justify-center overflow-hidden bg-school-black">
        <div className="absolute inset-0 bg-dot-pattern opacity-20"></div>
        <Image 
          src="/images/hero_banner.jpg" 
          alt="KPS Gallery Banner" 
          fill
          priority
          className="object-cover opacity-35"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-school-black via-school-black/60 to-transparent" />
        <div className="relative z-10 text-center px-4 max-w-3xl space-y-4">
          <span className="inline-block px-3 py-1 rounded-md bg-white/5 text-school-orange font-semibold text-xs tracking-wider uppercase border border-white/10 backdrop-blur-sm">
            Campus Life
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white tracking-tight flex items-center justify-center gap-3">
            <ImageIcon className="w-8 h-8 text-school-orange animate-pulse" /> School Gallery
          </h1>
          <p className="text-sm md:text-base text-gray-400 max-w-xl mx-auto font-light leading-relaxed">
            Take a visual walk through our memorable events, festivals, sports milestones, and curricular celebrations.
          </p>
        </div>
      </section>

      {/* Tabs Menu */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="flex flex-wrap justify-center gap-2 border-b border-gray-100 pb-6">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-school-orange text-white shadow-md'
                  : 'bg-[#F9FAFB] text-school-gray border border-gray-100 hover:border-school-orange/40 hover:text-school-black'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 text-gray-400 font-light">
            No images available in this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map(item => (
              <div 
                key={item.id} 
                className="group bg-white rounded-2xl overflow-hidden border border-gray-200/60 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
              >
                {/* Photo container */}
                <div className="relative h-64 overflow-hidden bg-gray-50">
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    fill
                    className="object-cover group-hover:scale-103 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src !== item.fallback) {
                        target.src = item.fallback;
                      }
                    }}
                  />
                  {/* Category tag */}
                  <span className="absolute top-4 left-4 border border-white/20 bg-black/45 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-wider">
                    {item.category}
                  </span>
                  
                  {/* Hover Eye Overlay */}
                  <div className="absolute inset-0 bg-school-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/95 rounded-full flex items-center justify-center shadow-lg text-school-orange transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <Eye className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Details Footer */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold font-heading text-school-black group-hover:text-school-orange transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-center text-[10px] md:text-xs text-gray-400 font-medium pt-3 border-t border-gray-100">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-school-orange" /> {item.date}</span>
                    <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-school-orange" /> {item.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
