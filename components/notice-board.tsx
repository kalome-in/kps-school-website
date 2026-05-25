'use client';

import { useState, useEffect } from 'react';
import { Bell, Download, Search, Loader2 } from 'lucide-react';

interface Notice {
  id: number;
  title: string;
  date: string;
  tag: string;
  fileUrl?: string;
}

interface NoticeBoardProps {
  limit?: number;
}

export function NoticeBoard({ limit }: NoticeBoardProps) {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [visibleCount, setVisibleCount] = useState(limit || 6);

  useEffect(() => {
    async function fetchNotices() {
      try {
        const response = await fetch('/api/notices');
        if (!response.ok) throw new Error('Failed to fetch');
        const res = await response.json();
        setNotices(res.data || []);
      } catch (err) {
        console.error('Error loading notices:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchNotices();
  }, []);

  const filteredNotices = notices.filter((notice) => {
    const matchesSearch = notice.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' || notice.tag.toLowerCase() === activeFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const displayedNotices = filteredNotices.slice(0, visibleCount);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <Loader2 className="w-8 h-8 text-school-orange animate-spin" />
        <p className="text-sm text-gray-400 font-light">Loading Notice Board...</p>
      </div>
    );
  }

  // Simplified view for homepage (when limit is provided)
  if (limit) {
    return (
      <div className="space-y-4">
        {displayedNotices.length > 0 ? (
          displayedNotices.map((notice, i) => (
            <div
              key={notice.id || i}
              className="bg-white p-5 rounded-xl border border-gray-100 border-l-[3px] border-l-school-yellow hover:border-l-school-orange hover:shadow-sm transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[10px] font-bold bg-[#F9FAFB] text-school-gray px-2 py-0.5 rounded border border-gray-100">
                  {notice.date}
                </span>
                <span className="text-[10px] font-bold text-school-orange uppercase tracking-wider">
                  {notice.tag}
                </span>
              </div>
              <p className="font-medium text-school-black text-sm leading-relaxed group-hover:text-school-orange transition-colors">
                {notice.title}
              </p>
              {notice.fileUrl && (
                <a
                  href={notice.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-2 text-[10px] font-bold text-school-red hover:underline"
                >
                  <Download className="w-3 h-3" /> View Attachment
                </a>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-sm text-gray-400 font-light">
            No active announcements.
          </div>
        )}
      </div>
    );
  }

  // Full view for Notices page
  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notices..."
            className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-school-orange focus:ring-1 focus:ring-school-orange transition-all"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          {['All', 'Exam', 'Holiday', 'Circular', 'Admin', 'Academic'].map((filter) => (
            <button
              key={filter}
              onClick={() => {
                setActiveFilter(filter);
                setVisibleCount(6); // reset pagination count
              }}
              className={`whitespace-nowrap px-4 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                activeFilter === filter
                  ? 'bg-school-orange text-white border-school-orange shadow-sm'
                  : 'border-gray-200 text-gray-500 hover:bg-gray-50'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {displayedNotices.length > 0 ? (
          displayedNotices.map((notice) => (
            <div
              key={notice.id}
              className="flex flex-col sm:flex-row items-center gap-4 p-5 rounded-xl border border-gray-100 hover:border-school-orange/45 transition-all group bg-white shadow-xs hover:shadow-sm"
            >
              <div className="w-10 h-10 rounded-lg bg-school-orange/5 border border-school-orange/10 flex items-center justify-center shrink-0 group-hover:bg-school-orange/10 transition-colors">
                <Bell className="w-4 h-4 text-school-orange" />
              </div>

              <div className="flex-1 text-center sm:text-left space-y-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                  <span className="text-[10px] font-bold text-gray-400">{notice.date}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                      notice.tag === 'Exam'
                        ? 'bg-red-50 text-red-700 border-red-100'
                        : notice.tag === 'Holiday'
                        ? 'bg-green-50 text-green-700 border-green-100'
                        : notice.tag === 'Academic'
                        ? 'bg-blue-50 text-blue-700 border-blue-100'
                        : 'bg-gray-50 text-gray-500 border-gray-100'
                    }`}
                  >
                    {notice.tag}
                  </span>
                </div>
                <h3 className="font-heading font-semibold text-school-black text-base group-hover:text-school-orange transition-colors duration-200">
                  {notice.title}
                </h3>
              </div>

              <div className="shrink-0 mt-4 sm:mt-0">
                {notice.fileUrl ? (
                  <a
                    href={notice.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-school-orange/5 border border-school-orange/10 hover:bg-school-orange hover:text-white text-xs font-semibold rounded-lg transition-colors text-school-orange"
                  >
                    <Download className="w-3.5 h-3.5" /> View Notice
                  </a>
                ) : (
                  <span className="text-xs text-gray-300 font-light italic px-2">No attachment</span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 border border-dashed border-gray-200 rounded-xl bg-[#F9FAFB]/50">
            <Bell className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-400 font-light">No notices found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Pagination / Load More */}
      {filteredNotices.length > visibleCount && (
        <div className="mt-8 text-center pt-8 border-t border-gray-50">
          <button
            onClick={() => setVisibleCount((prev) => prev + 6)}
            className="text-school-black hover:text-school-orange font-bold text-xs tracking-wider uppercase transition-colors"
          >
            Load More Notices
          </button>
        </div>
      )}
    </div>
  );
}
