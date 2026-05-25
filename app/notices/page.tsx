import { Bell, Download, Search } from 'lucide-react';

export const metadata = {
  title: 'Notices & Announcements | Korutla Public School',
  description: 'Important circulars, exam schedules, and holiday announcements from Korutla Public School.',
};

export default function NoticesPage() {
  const notices = [
    { id: 1, title: 'Half-Yearly Examination Timetable Released for Grades I to X', date: 'Oct 20, 2026', tag: 'Exam', file: true },
    { id: 2, title: 'School will remain closed on Oct 24th due to Diwali Festival', date: 'Oct 18, 2026', tag: 'Holiday', file: false },
    { id: 3, title: 'Parent-Teacher Meeting scheduled for coming Saturday', date: 'Oct 15, 2026', tag: 'Circular', file: false },
    { id: 4, title: 'Transport fee revision for the academic year 2026-2027', date: 'Oct 10, 2026', tag: 'Admin', file: true },
    { id: 5, title: 'Guidelines for the upcoming Science Olympiad participation', date: 'Oct 05, 2026', tag: 'Academic', file: true },
    { id: 6, title: 'Winter uniform mandate starting from November 1st', date: 'Oct 01, 2026', tag: 'Circular', file: false },
  ];

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
          
          {/* Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
            <div className="relative w-full sm:w-96">
              <input 
                type="text" 
                placeholder="Search notices..." 
                className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-school-orange focus:ring-1 focus:ring-school-orange transition-all"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
            
            <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
              {['All', 'Exam', 'Holiday', 'Circular', 'Admin'].map(filter => (
                <button key={filter} className="whitespace-nowrap px-4 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-500 hover:bg-school-orange hover:text-white hover:border-school-orange transition-colors">
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* List */}
          <div className="space-y-4">
            {notices.map((notice) => (
              <div key={notice.id} className="flex flex-col sm:flex-row items-center gap-4 p-5 rounded-xl border border-gray-100 hover:border-school-orange/45 transition-all group bg-white">
                <div className="w-10 h-10 rounded-lg bg-school-orange/5 border border-school-orange/10 flex items-center justify-center shrink-0">
                  <Bell className="w-4 h-4 text-school-orange" />
                </div>
                
                <div className="flex-1 text-center sm:text-left space-y-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                    <span className="text-[10px] font-bold text-gray-400">{notice.date}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      notice.tag === 'Exam' ? 'bg-red-50 text-red-700 border border-red-100' :
                      notice.tag === 'Holiday' ? 'bg-green-50 text-green-700 border border-green-100' :
                      notice.tag === 'Academic' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                      'bg-gray-50 text-gray-500 border border-gray-100'
                    }`}>
                      {notice.tag}
                    </span>
                  </div>
                  <h3 className="font-heading font-semibold text-school-black text-base">{notice.title}</h3>
                </div>

                <div className="shrink-0 mt-4 sm:mt-0">
                  {notice.file ? (
                     <button className="flex items-center gap-2 px-4 py-2 bg-school-orange/5 border border-school-orange/10 hover:bg-school-orange hover:text-white text-xs font-semibold rounded-lg transition-colors text-school-orange">
                       <Download className="w-3.5 h-3.5" /> Download PDF
                     </button>
                  ) : (
                     <button className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-school-orange hover:underline transition-colors">
                       Read More
                     </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center pt-8 border-t border-gray-50">
             <button className="text-gray-400 hover:text-school-orange font-semibold text-xs tracking-wider uppercase transition-colors">
               Load More Notices
             </button>
          </div>
        </div>
      </section>

    </div>
  );
}
