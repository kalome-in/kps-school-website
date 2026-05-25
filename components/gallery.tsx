'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ImageIcon, Eye } from 'lucide-react';

const TABS = ['All', 'Campus', 'Academics', 'Sports', 'Activities'];

const GALLERY_ITEMS = [
  // Campus
  { id: 1, category: 'Campus', title: 'Smart Classroom', desc: 'Interactive TV/Tab multimodal learning setup.', image: '/images/gallery_classroom.jpg', fallback: 'https://picsum.photos/seed/smartclass/600/400' },
  { id: 2, category: 'Campus', title: 'Science Laboratory', desc: 'Fully equipped physics, chemistry, and biology labs.', image: '/images/gallery_lab.jpg', fallback: 'https://picsum.photos/seed/sciencelab/600/400' },
  // Academics
  { id: 3, category: 'Academics', title: 'Olympiad Rankers', desc: 'Celebrating top ranks in national and state examinations.', image: '/images/gallery_olympiad.jpg', fallback: 'https://picsum.photos/seed/olympiad/600/400' },
  { id: 4, category: 'Academics', title: 'Coding Lab', desc: 'Primary students learning Computer Coding Skills (CCS).', image: '/images/gallery_coding.jpg', fallback: 'https://picsum.photos/seed/coding/600/400' },
  // Sports
  { id: 5, category: 'Sports', title: 'Softball Team', desc: 'National Silver Medalists softball representations.', image: '/images/gallery_softball.jpg', fallback: 'https://picsum.photos/seed/softball/600/400' },
  { id: 6, category: 'Sports', title: 'Netball Match', desc: 'State-level netball tournament runners.', image: '/images/gallery_netball.jpg', fallback: 'https://picsum.photos/seed/netball/600/400' },
  // Activities
  { id: 7, category: 'Activities', title: 'Karate Training', desc: 'Martial arts classes for fitness and self-defense.', image: '/images/gallery_karate.jpg', fallback: 'https://picsum.photos/seed/karate/600/400' },
  { id: 8, category: 'Activities', title: 'Yoga & Meditation', desc: 'Weekly school-wide yoga sessions for mindfulness.', image: '/images/gallery_yoga.jpg', fallback: 'https://picsum.photos/seed/yoga/600/400' },
];

export function Gallery() {
  const [activeTab, setActiveTab] = useState('All');

  const filteredItems = activeTab === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeTab);

  return (
    <div className="space-y-6 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-100 pb-4 gap-4">
        <h2 className="text-2xl font-heading font-extrabold text-school-black flex items-center gap-2.5">
          <ImageIcon className="w-6 h-6 text-school-orange animate-pulse" /> KPS Gallery
        </h2>
        
        {/* Gallery Tabs */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0 hide-scrollbar w-full sm:w-auto">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === tab
                  ? 'bg-school-orange text-white shadow-sm'
                  : 'bg-[#F9FAFB] text-school-gray border border-gray-100 hover:border-school-orange/45 hover:text-school-black'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 gap-4 h-[350px] overflow-y-auto pr-2 custom-scrollbar">
        {filteredItems.map(item => (
          <div
            key={item.id}
            className="group relative h-40 rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
          >
            {/* Image */}
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
              onError={(e) => {
                // If local image doesn't exist, load Picsum fallback
                const target = e.target as HTMLImageElement;
                if (target.src !== item.fallback) {
                  target.src = item.fallback;
                }
              }}
            />
            {/* Visual Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-school-black/85 via-school-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
              <span className="text-[8px] font-bold text-school-orange uppercase tracking-wider mb-1">{item.category}</span>
              <h4 className="font-heading font-bold text-xs flex items-center gap-1.5">
                {item.title} <Eye className="w-3 h-3 text-school-yellow" />
              </h4>
              <p className="text-[10px] text-gray-300 line-clamp-1 font-light mt-0.5">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
