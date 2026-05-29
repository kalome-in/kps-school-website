'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Eye, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Award, 
  Newspaper, 
  Sparkles, 
  CheckCircle2, 
  Layers,
  Search,
  Video,
  Image as ImageIcon
} from 'lucide-react';
import { 
  ALL_TAGS, 
  GALLERY_ITEMS, 
  getYouTubeId, 
  TOPPERS, 
  MEDIA_CLIPPINGS,
  GalleryItem,
  MediaClipping
} from '@/app/data/gallery-data';

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(GALLERY_ITEMS);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeSubTag, setActiveSubTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Pagination / Load More State
  const [visibleCount, setVisibleCount] = useState<number>(12);
  
  // Lightbox State
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [selectedClipping, setSelectedClipping] = useState<MediaClipping | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  useEffect(() => {
    async function loadGallery() {
      try {
        const response = await fetch('/api/gallery');
        if (!response.ok) throw new Error('Failed to fetch gallery');
        const json = await response.json();
        if (json.status === 'success' && Array.isArray(json.data)) {
          setGalleryItems(json.data);
        }
      } catch (error) {
        console.error('Error loading dynamic gallery:', error);
      }
    }
    loadGallery();
  }, []);

  // Reset filters when primary category changes
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setActiveSubTag(null);
    setSearchQuery('');
    setVisibleCount(12);
  };

  // Get items matching category
  const getCategoryItems = () => {
    let items = galleryItems;
    if (activeCategory !== 'All') {
      items = items.filter(item => item.tags.includes(activeCategory));
    }
    return items;
  };

  const categoryItems = getCategoryItems();

  // Extract unique sub-tags present in the current category's items (excluding the category tag itself and other primary tags)
  const getCategorySubTags = () => {
    const tags = categoryItems.flatMap(item => item.tags);
    return Array.from(new Set(tags)).filter(
      tag => tag !== activeCategory && tag !== 'All' && !ALL_TAGS.includes(tag)
    );
  };

  const categoryTags = getCategorySubTags();

  // Filter category items further by selected sub-tag and search query
  const getDisplayedItems = () => {
    let items = categoryItems;
    if (activeSubTag) {
      items = items.filter(item => item.tags.includes(activeSubTag));
    }
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      items = items.filter(
        item =>
          item.title.toLowerCase().includes(query) ||
          item.desc.toLowerCase().includes(query) ||
          item.tags.some(t => t.toLowerCase().includes(query))
      );
    }
    return items;
  };

  const displayedItems = getDisplayedItems();
  
  // Slice items for pagination
  const paginatedItems = displayedItems.slice(0, visibleCount);
  const hasMore = displayedItems.length > visibleCount;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 12);
  };

  // Lightbox navigation
  const handleOpenPreview = (item: GalleryItem) => {
    setSelectedItem(item);
    setSelectedClipping(null);
    const index = displayedItems.findIndex(x => x.id === item.id);
    setCurrentIndex(index);
  };

  const handleOpenClipping = (clipping: MediaClipping) => {
    setSelectedClipping(clipping);
    setSelectedItem(null);
  };

  const handleClosePreview = () => {
    setSelectedItem(null);
    setSelectedClipping(null);
    setCurrentIndex(-1);
  };

  const handlePrev = () => {
    if (displayedItems.length <= 1) return;
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : displayedItems.length - 1;
    setCurrentIndex(prevIndex);
    setSelectedItem(displayedItems[prevIndex]);
  };

  const handleNext = () => {
    if (displayedItems.length <= 1) return;
    const nextIndex = currentIndex < displayedItems.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(nextIndex);
    setSelectedItem(displayedItems[nextIndex]);
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
  }, [selectedItem, currentIndex, displayedItems]);

  return (
    <div className="w-full bg-white text-school-black">
      {/* 1. HERO SECTION */}
      <section className="relative h-[45vh] min-h-[350px] flex items-center justify-center overflow-hidden bg-school-black animate-fade-in">
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
            Visual Archive
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white tracking-tight flex items-center justify-center gap-3">
            School Gallery
          </h1>
          <p className="text-sm md:text-base text-gray-400 max-w-xl mx-auto font-light leading-relaxed">
            Browse our comprehensive collection of science exhibitions, sports milestones, festival celebrations, and daily campus life.
          </p>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="py-12 bg-[#F9FAFB] border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:scale-101 hover:shadow-md transition-all text-center space-y-2">
              <span className="text-3xl font-extrabold text-school-black block font-heading">5000+</span>
              <span className="text-xs font-bold text-school-orange uppercase tracking-wider block">Memories</span>
              <p className="text-[11px] text-gray-400 font-light leading-relaxed">High-definition snaps archiving every key milestone.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:scale-101 hover:shadow-md transition-all text-center space-y-2">
              <span className="text-3xl font-extrabold text-school-black block font-heading">150+</span>
              <span className="text-xs font-bold text-school-orange uppercase tracking-wider block">Events</span>
              <p className="text-[11px] text-gray-400 font-light leading-relaxed">Celebrations, academic science meets, and workshops.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:scale-101 hover:shadow-md transition-all text-center space-y-2">
              <span className="text-3xl font-extrabold text-school-black block font-heading">100%</span>
              <span className="text-xs font-bold text-school-orange uppercase tracking-wider block">SSC Results</span>
              <p className="text-[11px] text-gray-400 font-light leading-relaxed">Consecutive years of perfect academic success rates.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:scale-101 hover:shadow-md transition-all text-center space-y-2">
              <span className="text-3xl font-extrabold text-school-black block font-heading">50+</span>
              <span className="text-xs font-bold text-school-orange uppercase tracking-wider block">Awards</span>
              <p className="text-[11px] text-gray-400 font-light leading-relaxed">State and district recognitions in sports & arts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FILTER / CATEGORY / SEARCH SECTION */}
      <section className="sticky top-[73px] sm:top-[80px] z-40 bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          {/* Top Controls: Tabs and Search */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Primary Category Selector */}
            <div className="flex gap-1.5 overflow-x-auto pb-1.5 lg:pb-0 hide-scrollbar w-full lg:w-auto">
              {ALL_TAGS.map(tag => (
                <button
                  key={tag}
                  onClick={() => handleCategoryChange(tag)}
                  className={`whitespace-nowrap px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all duration-200 border cursor-pointer ${
                    activeCategory === tag
                      ? 'bg-school-orange border-school-orange text-white shadow-md'
                      : 'bg-[#F9FAFB] text-school-gray border-gray-100 hover:border-school-orange/45 hover:text-school-black hover:bg-gray-50'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full lg:max-w-xs">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-school-gray" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(12);
                }}
                placeholder="Search gallery media..."
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-150 text-xs bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-school-orange/20 focus:border-school-orange transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => { setSearchQuery(''); setVisibleCount(12); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-school-black"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Sub-tags (Albums) */}
          {activeCategory !== 'All' && categoryTags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-2.5 border-t border-gray-100 animate-fade-in">
              <span className="text-[9px] font-bold text-school-gray uppercase tracking-widest mr-2 flex items-center gap-1 shrink-0">
                <Sparkles className="w-3.5 h-3.5 text-school-orange animate-pulse" /> Filter by Album:
              </span>
              <button
                onClick={() => { setActiveSubTag(null); setVisibleCount(12); }}
                className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all border cursor-pointer ${
                  !activeSubTag
                    ? 'bg-school-orange border-school-orange text-white shadow-sm'
                    : 'bg-[#F9FAFB] text-school-gray border-gray-100 hover:border-school-orange/45 hover:text-school-black hover:bg-gray-50'
                }`}
              >
                All
              </button>
              {categoryTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => { setActiveSubTag(tag); setVisibleCount(12); }}
                  className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all border cursor-pointer ${
                    activeSubTag === tag
                      ? 'bg-school-orange border-school-orange text-white shadow-sm'
                      : 'bg-[#F9FAFB] text-school-gray border-gray-100 hover:border-school-orange/45 hover:text-school-black hover:bg-gray-50'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. MAIN MEDIA GRID CONTENT */}
      <section className="py-16 bg-white min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {paginatedItems.length === 0 ? (
            <div className="text-center py-24 text-gray-400 font-light border border-dashed border-gray-200 rounded-3xl bg-gray-50/50 animate-fade-in space-y-2">
              <p className="text-sm font-semibold">No media items found matching this filter selection.</p>
              <p className="text-xs">Try selecting a different tab or checking your search spelling.</p>
            </div>
          ) : (
            <>
              {/* Media Count Indicator */}
              <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-5 bg-school-orange rounded-full"></span>
                  <h3 className="text-lg font-heading font-extrabold text-school-black tracking-tight">
                    {activeCategory} Media ({displayedItems.length} items)
                  </h3>
                </div>
                <span className="text-[10px] text-gray-400 font-medium">
                  Showing {paginatedItems.length} of {displayedItems.length}
                </span>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in">
                {paginatedItems.map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => handleOpenPreview(item)}
                    className="group relative h-56 rounded-2xl overflow-hidden border border-gray-150 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white cursor-pointer"
                  >
                    {/* Media Thumbnail */}
                    <Image 
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (target.src !== item.fallback) {
                          target.src = item.fallback;
                        }
                      }}
                    />

                    {/* Media Type Float Tag */}
                    <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1">
                      {item.type === 'video' ? (
                        <span className="border border-white/20 bg-black/60 backdrop-blur-sm text-white text-[8px] font-bold px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                          <Play className="w-2.5 h-2.5 fill-current" /> Video
                        </span>
                      ) : (
                        <span className="border border-white/20 bg-black/60 backdrop-blur-sm text-white text-[8px] font-bold px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                          <ImageIcon className="w-2.5 h-2.5" /> Photo
                        </span>
                      )}
                    </div>

                    {/* Video Player Hover Indicator Overlay */}
                    {item.type === 'video' && (
                      <div className="absolute inset-0 bg-school-black/30 opacity-10 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                        <div className="w-12 h-12 bg-white/95 rounded-full flex items-center justify-center shadow-lg text-school-orange transform scale-90 group-hover:scale-105 transition-transform duration-300">
                          <Play className="w-5 h-5 fill-current ml-0.5 text-school-orange" />
                        </div>
                      </div>
                    )}

                    {/* Glassmorphic Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white z-10">
                      <span className="text-[7px] text-school-yellow font-bold uppercase tracking-widest mb-0.5 leading-none">
                        {item.tags.filter(t => t !== 'All').join(' • ')}
                      </span>
                      <h4 className="font-heading font-bold text-xs leading-tight mt-1 flex items-center gap-1.5">
                        {item.title}
                        {item.type === 'photo' && <Eye className="w-3.5 h-3.5 text-school-yellow" />}
                      </h4>
                      <p className="text-gray-300 text-[9px] line-clamp-2 mt-1 leading-relaxed font-light">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Trigger */}
              {hasMore && (
                <div className="flex justify-center pt-8 animate-fade-in">
                  <button
                    onClick={handleLoadMore}
                    className="px-6 py-3 rounded-xl bg-school-black text-white hover:bg-school-orange transition-all duration-300 font-bold text-xs uppercase tracking-wider shadow-md hover:scale-102 cursor-pointer active:scale-98"
                  >
                    Load More Items
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* 5. SSC RESULTS SHOWCASE SECTION */}
      {(activeCategory === 'All' || activeCategory === 'Achievements') && (
        <section className="py-24 bg-[#F9FAFB] border-y border-gray-100 animate-fade-in">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <div className="inline-flex items-center gap-2 text-school-orange font-semibold tracking-wide uppercase text-xs">
                <span className="w-6 h-0.5 bg-school-orange"></span> Academic Excellence
              </div>
              <h2 className="text-3xl font-heading font-extrabold text-school-black">
                SSC Toppers Showcase 2026
              </h2>
              <p className="text-gray-500 text-xs md:text-sm font-light">
                Celebrating the outstanding performance and academic success of our high-achieving students.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {TOPPERS.map((topper) => (
                <div 
                  key={topper.id}
                  className="group bg-white border border-gray-100 hover:border-school-orange/40 rounded-3xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 shadow-sm flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Profile image wrapper */}
                    <div className="relative w-28 h-28 mx-auto rounded-full overflow-hidden border-2 border-school-orange/20 group-hover:border-school-orange/50 transition-all duration-500 shadow-sm bg-gray-50">
                      <Image
                        src={topper.image}
                        alt={topper.name}
                        fill
                        className="object-cover group-hover:scale-102 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (target.src !== topper.fallback) {
                            target.src = topper.fallback;
                          }
                        }}
                      />
                    </div>

                    <div className="space-y-1">
                      <span className="inline-block px-2 py-0.5 rounded bg-school-yellow/10 border border-school-yellow/30 text-school-yellow text-[8px] font-bold uppercase tracking-wider">
                        {topper.year}
                      </span>
                      <h3 className="text-base font-bold font-heading text-school-black group-hover:text-school-orange transition-colors">
                        {topper.name}
                      </h3>
                    </div>

                    {/* Score / Grade */}
                    <div className="py-2.5 my-1.5 bg-[#F9FAFB] rounded-xl border border-gray-100">
                      <span className="block text-2xl font-black text-school-orange tracking-tight">
                        {topper.score}
                      </span>
                      <span className="text-[9px] text-school-gray font-bold uppercase tracking-wider block mt-0.5">
                        {topper.title}
                      </span>
                    </div>
                  </div>

                  <p className="text-[10px] text-school-orange font-bold uppercase tracking-wider flex items-center justify-center gap-1 mt-3">
                    <CheckCircle2 className="w-3.5 h-3.5 text-school-orange" /> {topper.rank}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. MEDIA & NEWSPAPER COVERAGE SECTION */}
      {(activeCategory === 'All' || activeCategory === 'Achievements') && (
        <section className="py-24 bg-white animate-fade-in">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center sm:text-left mb-12 space-y-3">
              <div className="inline-flex items-center gap-2 text-school-orange font-semibold tracking-wide uppercase text-xs">
                <span className="w-6 h-0.5 bg-school-orange"></span> KPS In Media
              </div>
              <h2 className="text-3xl font-heading font-extrabold text-school-black">
                Press & Newspaper Clippings
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {MEDIA_CLIPPINGS.map((clipping) => (
                <div 
                  key={clipping.id}
                  onClick={() => handleOpenClipping(clipping)}
                  className="group bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between shadow-sm cursor-pointer"
                >
                  <div className="relative h-52 bg-gray-50 border-b border-gray-100 overflow-hidden m-3 rounded-2xl">
                    <Image 
                      src={clipping.image}
                      alt={clipping.headline}
                      fill
                      className="object-cover group-hover:scale-103 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (target.src !== clipping.fallback) {
                          target.src = clipping.fallback;
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-school-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="inline-flex items-center gap-1.5 bg-white/95 text-school-orange text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-sm">
                        <Newspaper className="w-3.5 h-3.5" /> View Article
                      </span>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2 space-y-3">
                    <div className="flex justify-between items-center text-[9px] text-school-orange font-bold uppercase tracking-wider">
                      <span>{clipping.publication}</span>
                      <span className="text-school-gray font-medium">{clipping.date}</span>
                    </div>
                    <h4 className="font-heading font-extrabold text-sm text-school-black group-hover:text-school-orange transition-colors line-clamp-3 leading-snug">
                      &ldquo;{clipping.headline}&rdquo;
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 9. CINEMATIC PREVIEW EXPERIENCE / LIGHTBOX */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-50 bg-black/98 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 select-none"
          onClick={handleClosePreview}
        >
          {/* Close button */}
          <button 
            className="absolute top-6 right-6 text-white/80 hover:text-white p-3 rounded-full bg-white/5 hover:bg-white/15 transition-all z-50 border border-white/10 hover:border-white/20 active:scale-95 cursor-pointer animate-fade-in"
            onClick={handleClosePreview}
            aria-label="Close Preview"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left Arrow */}
          {displayedItems.length > 1 && (
            <button
              className="absolute left-4 md:left-8 text-white/80 hover:text-white p-3.5 rounded-full bg-white/5 hover:bg-white/15 transition-all z-50 border border-white/5 hover:border-white/20 active:scale-90 cursor-pointer animate-fade-in"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              aria-label="Previous Media"
            >
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>
          )}

          {/* Center Display */}
          <div 
            className="max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center relative z-40 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[50vh] md:h-[60vh] rounded-3xl overflow-hidden bg-black/40 border border-white/5 shadow-2xl flex items-center justify-center">
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
            
            {/* Details panel */}
            <div className="text-center mt-6 max-w-2xl px-4 space-y-3">
              <div className="flex justify-center items-center gap-2">
                {selectedItem.tags.filter(t => t !== 'All').map((t, idx) => (
                  <span key={idx} className="text-[9px] font-bold text-school-yellow bg-school-yellow/10 border border-school-yellow/20 px-3 py-1 rounded-full uppercase tracking-wider">
                    {t}
                  </span>
                ))}
                {selectedItem.type === 'video' && (
                  <span className="text-[9px] font-bold text-white bg-school-orange border border-school-orange/20 px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 animate-pulse">
                    <Play className="w-2.5 h-2.5 fill-current animate-pulse" /> Video Record
                  </span>
                )}
                <span className="text-[10px] text-gray-500 font-medium">
                  {currentIndex + 1} of {displayedItems.length}
                </span>
              </div>
              
              <h3 className="text-xl md:text-3xl font-heading font-extrabold text-white tracking-tight">
                {selectedItem.title}
              </h3>
              
              <p className="text-gray-300 text-xs md:text-sm font-light leading-relaxed">
                {selectedItem.desc}
              </p>
              
              <p className="text-[10px] text-gray-550 italic pt-1 hidden md:block">
                Press left/right arrow keys to navigate. Escape to exit.
              </p>
            </div>
          </div>

          {/* Right Arrow */}
          {displayedItems.length > 1 && (
            <button
              className="absolute right-4 md:right-8 text-white/80 hover:text-white p-3.5 rounded-full bg-white/5 hover:bg-white/15 transition-all z-50 border border-white/5 hover:border-white/20 active:scale-90 cursor-pointer animate-fade-in"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              aria-label="Next Media"
            >
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>
          )}
        </div>
      )}

      {/* 9.5 MEDIA CLIPPING PREVIEW EXPERIENCE */}
      {selectedClipping && (
        <div 
          className="fixed inset-0 z-50 bg-black/98 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
          onClick={handleClosePreview}
        >
          <button 
            className="absolute top-6 right-6 text-white/80 hover:text-white p-3 rounded-full bg-white/5 hover:bg-white/15 transition-all z-50 border border-white/10 cursor-pointer animate-fade-in"
            onClick={handleClosePreview}
            aria-label="Close Newspaper Clipping"
          >
            <X className="w-6 h-6" />
          </button>

          <div 
            className="max-w-4xl w-full max-h-[85vh] flex flex-col items-center justify-center relative z-40 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[55vh] md:h-[65vh] rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-2xl flex items-center justify-center">
              <Image
                src={selectedClipping.image}
                alt={selectedClipping.headline}
                fill
                className="object-contain"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src !== selectedClipping.fallback) {
                    target.src = selectedClipping.fallback;
                  }
                }}
              />
            </div>
            
            <div className="text-center mt-6 max-w-2xl px-4 space-y-2">
              <span className="inline-block px-3 py-1 rounded-full bg-school-orange/15 border border-school-orange/30 text-school-orange text-[9px] font-bold uppercase tracking-wider">
                {selectedClipping.publication} — {selectedClipping.date}
              </span>
              <h3 className="text-lg md:text-2xl font-heading font-extrabold text-white leading-snug">
                “{selectedClipping.headline}”
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
