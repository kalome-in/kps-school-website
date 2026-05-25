import { NoticeBoard } from '@/components/notice-board';

export const metadata = {
  title: 'Notices & Announcements | Korutla Public School',
  description: 'Important circulars, exam schedules, and holiday announcements from Korutla Public School.',
};

export default function NoticesPage() {
  return (
    <div className="w-full bg-white min-h-screen pb-24">
      {/* Header */}
      <section className="relative h-[45vh] min-h-[350px] flex items-center justify-center overflow-hidden bg-school-black">
        <div className="absolute inset-0 bg-dot-pattern opacity-20"></div>
        <div className="relative z-10 text-center px-4 max-w-3xl space-y-4">
          <span className="inline-block px-3 py-1 rounded-md bg-white/5 text-school-orange font-semibold text-xs tracking-wider uppercase border border-white/10 backdrop-blur-sm">
            Board
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white tracking-tight">Notice Board</h1>
          <p className="text-sm md:text-base text-gray-400 max-w-xl mx-auto font-light leading-relaxed">
            Stay informed with the latest updates, circulars, and schedules.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="bg-white rounded-2xl border border-gray-200/60 p-6 md:p-8 shadow-sm">
          <NoticeBoard />
        </div>
      </section>

    </div>
  );
}
