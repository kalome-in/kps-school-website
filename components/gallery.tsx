'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ImageIcon, Eye, Play, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ALL_TAGS, GALLERY_ITEMS, getYouTubeId } from '@/app/data/gallery-data';

export function Gallery() {
  const [activeTag, setActiveTag] = useState('All');
  
  // Lightbox State
  const [selectedItem, setSelectedItem] = useState<typeof GALLERY_ITEMS[0] | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  const filteredItems = activeTag === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.tags.includes(activeTag));

  // Limit display to 12 items for dashboard performance
  const displayedItems = filteredItems.slice(0, 12);

  // Lightbox interactions
  const handleOpenPreview = (item: typeof GALLERY_ITEMS[0]) => {
    setSelectedItem(item);
    const index = filteredItems.findIndex(x => x.id === item.id);
    setCurrentIndex(index);
  };

  const handleClosePreview = () => {
    setSelectedItem(null);
    setCurrentIndex(-1);
  };

  const handlePrev = () => {
    if (filteredItems.length <= 1) return;
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredItems.length - 1;
    setCurrentIndex(prevIndex);
    setSelectedItem(filteredItems[prevIndex]);
  };

  const handleNext = () => {
    if (filteredItems.length <= 1) return;
    const nextIndex = currentIndex < filteredItems.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(nextIndex);
    setSelectedItem(filteredItems[nextIndex]);
  };

  // Keyboard controls for lightbox
  useEffect(() => {
    if (!selectedItem) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClosePreview();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem, currentIndex, filteredItems]);

  return (
    <div className="space-y-6 w-full flex flex-col justify-between h-full">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-100 pb-4 gap-4">
          <h2 className="text-2xl font-heading font-extrabold text-school-black flex items-center gap-2.5">
            <ImageIcon className="w-6 h-6 text-school-orange animate-pulse" /> KPS Gallery
          </h2>
          
          {/* Gallery Tabs */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0 hide-scrollbar w-full sm:w-auto max-w-[280px] sm:max-w-xs md:max-w-md">
            {ALL_TAGS.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTag === tag
                    ? 'bg-school-orange text-white shadow-sm'
                    : 'bg-[#F9FAFB] text-school-gray border border-gray-100 hover:border-school-orange/45 hover:text-school-black'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 gap-4 h-[350px] overflow-y-auto pr-2 custom-scrollbar">
          {displayedItems.map(item => (
            <div
              key={item.id}
              onClick={() => handleOpenPreview(item)}
              className="group relative h-40 rounded-xl overflow-hidden border border-gray-150 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              {/* Image */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src !== item.fallback) {
                    target.src = item.fallback;
                  }
                }}
              />

              {/* Video Overlay Play Indicator */}
              {item.type === 'video' && (
                <span className="absolute top-2 right-2 bg-school-orange text-white text-[8px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider flex items-center gap-1 shadow-sm z-10">
                  <Play className="w-2 h-2 fill-current" /> Video
                </span>
              )}

              {/* Visual Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-school-black/85 via-school-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                <span className="text-[7px] font-bold text-school-orange uppercase tracking-wider mb-1">
                  {item.tags.slice(0, 2).join(' • ')}
                </span>
                <h4 className="font-heading font-bold text-xs flex items-center gap-1.5 leading-tight">
                  {item.title}
                  {item.type === 'video' ? (
                    <Play className="w-3 h-3 text-school-yellow fill-current ml-0.5" />
                  ) : (
                    <Eye className="w-3 h-3 text-school-yellow" />
                  )}
                </h4>
                <p className="text-[9px] text-gray-300 line-clamp-1 font-light mt-0.5 leading-tight">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View Full Gallery Link CTA */}
      {filteredItems.length > 12 && (
        <div className="pt-4 border-t border-gray-50 flex justify-center">
          <Link 
            href="/gallery" 
            className="inline-flex items-center gap-1.5 text-xs font-bold text-school-orange hover:text-school-red hover:underline transition-all"
          >
            View Full Gallery ({filteredItems.length} items) <ChevronRight className="w-4.5 h-4.5" />
          </Link>
        </div>
      )}

      {/* Lightbox Modal Overlay */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          onClick={handleClosePreview}
        >
          {/* Close button top right */}
          <button 
            className="absolute top-6 right-6 text-white/80 hover:text-white p-2.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-50 cursor-pointer"
            onClick={handleClosePreview}
            aria-label="Close Preview"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left Navigation Arrow */}
          {filteredItems.length > 1 && (
            <button
              className="absolute left-4 md:left-8 text-white/85 hover:text-white p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-50 cursor-pointer animate-fade-in"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>
          )}

          {/* Center Display */}
          <div 
            className="max-w-4xl w-full max-h-[85vh] flex flex-col items-center justify-center relative z-40 select-none animate-fade-in"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking card content
          >
            <div className="relative w-full h-[50vh] md:h-[60vh] rounded-2xl overflow-hidden bg-black/30 flex items-center justify-center">
              {selectedItem.type === 'video' ? (
                <iframe
                  src={`https://www.youtube.com/embed/${getYouTubeId(selectedItem.videoUrl)}?autoplay=1&rel=0`}
                  title={selectedItem.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0 absolute inset-0"
                ></iframe>
              ) : (
                <Image
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  fill
                  className="object-contain"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src !== selectedItem.fallback) {
                      target.src = selectedItem.fallback;
                    }
                  }}
                />
              )}
            </div>
            
            {/* Image Details Panel */}
            <div className="text-center mt-6 max-w-2xl px-4 space-y-2.5">
              <div className="flex justify-center items-center gap-2">
                {selectedItem.tags.map((t, idx) => (
                  <span key={idx} className="text-[9px] font-bold text-school-orange bg-school-orange/15 px-2.5 py-1 rounded-md uppercase tracking-wider">
                    {t}
                  </span>
                ))}
                {selectedItem.type === 'video' && (
                  <span className="text-[9px] font-bold text-white bg-school-red px-2.5 py-1 rounded-md uppercase tracking-wider flex items-center gap-1">
                    <Play className="w-2.5 h-2.5 fill-current" /> Video
                  </span>
                )}
              </div>
              <h3 className="text-xl md:text-2xl font-heading font-bold text-white tracking-tight">
                {selectedItem.title}
              </h3>
              <p className="text-gray-300 text-xs md:text-sm font-light leading-relaxed">
                {selectedItem.desc}
              </p>
            </div>
          </div>

          {/* Right Navigation Arrow */}
          {filteredItems.length > 1 && (
            <button
              className="absolute right-4 md:right-8 text-white/85 hover:text-white p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-50 cursor-pointer animate-fade-in"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
