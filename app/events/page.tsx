import Image from 'next/image';
import { Calendar, MapPin, Clock } from 'lucide-react';

export const metadata = {
  title: 'Events | Korutla Public School',
  description: 'Stay updated with the latest events, sports, and celebrations at Korutla Public School.',
};

export default function EventsPage() {
  const upcomingEvents = [
    {
      title: 'Annual Science Exhibition 2026',
      date: 'Oct 15, 2026',
      time: '09:00 AM - 04:00 PM',
      location: 'School Auditorium',
      desc: 'Students will showcase their innovative science projects and working models. Parents are welcome to visit.',
      image: 'seed/event1/800/600',
      tag: 'Academic'
    },
    {
      title: 'Inter-School Sports Meet',
      date: 'Nov 05, 2026',
      time: '08:00 AM - 05:00 PM',
      location: 'Main Sports Arena',
      desc: 'Our school hosts the regional inter-school sports competition featuring athletics, basketball, and more.',
      image: 'seed/event2/800/600',
      tag: 'Sports'
    },
    {
      title: 'Cultural Fest - Diwali Celebrations',
      date: 'Oct 22, 2026',
      time: '10:00 AM - 01:00 PM',
      location: 'Campus Ground',
      desc: 'Pre-Diwali celebrations including rangoli competitions, cultural dances, and a special assembly.',
      image: 'seed/event3/800/600',
      tag: 'Cultural'
    }
  ];

  const pastEvents = [
    { title: 'Independence Day', date: 'Aug 15, 2026', image: 'seed/pastevent1/600/400' },
    { title: 'Investiture Ceremony', date: 'Jul 20, 2026', image: 'seed/pastevent2/600/400' },
    { title: 'Environment Day Drive', date: 'Jun 05, 2026', image: 'seed/pastevent3/600/400' },
    { title: 'Art & Craft Exhibition', date: 'May 10, 2026', image: 'seed/pastevent4/600/400' },
  ];

  return (
    <div className="w-full bg-white pb-24">
      {/* Header */}
      <section className="relative h-[45vh] min-h-[350px] flex items-center justify-center overflow-hidden bg-school-black">
        <div className="absolute inset-0 bg-dot-pattern opacity-20"></div>
        <Image 
          src="https://picsum.photos/seed/events/1920/1080" 
          alt="Events KPS" 
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
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white tracking-tight">School Events</h1>
          <p className="text-sm md:text-base text-gray-400 max-w-xl mx-auto font-light leading-relaxed">
            Life at Korutla Public School goes beyond the classroom walls. Discover our vibrant campus activities.
          </p>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20">
        <div className="bg-white rounded-2xl border border-gray-200/60 p-6 md:p-10 shadow-sm relative z-20">
          <div className="inline-flex items-center gap-2 text-school-orange font-semibold tracking-wide uppercase text-xs mb-8">
            <span className="w-6 h-0.5 bg-school-orange"></span> Upcoming Events
          </div>
          
          <div className="space-y-12">
            {upcomingEvents.map((event, i) => (
              <div key={i} className="flex flex-col lg:flex-row gap-8 border-b border-gray-100 pb-12 last:border-0 last:pb-0 group">
                <div className="w-full lg:w-2/5 relative h-64 lg:h-72 rounded-2xl overflow-hidden shrink-0 shadow-sm border border-gray-100">
                  <Image 
                    src={`https://picsum.photos/${event.image}`} 
                    alt={event.title} 
                    fill
                    className="object-cover group-hover:scale-103 transition-transform duration-75"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 border border-white/20 bg-black/45 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-wider">
                    {event.tag}
                  </div>
                </div>
                <div className="flex flex-col justify-center flex-1 space-y-4">
                  <h3 className="text-xl md:text-2xl font-heading font-bold text-school-black group-hover:text-school-orange transition-colors duration-200">{event.title}</h3>
                  <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs text-gray-500 font-medium">
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-school-orange" /> {event.date}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-school-orange" /> {event.time}</span>
                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-school-orange" /> {event.location}</span>
                  </div>
                  <p className="text-gray-400 leading-relaxed text-xs md:text-sm font-light">
                    {event.desc}
                  </p>
                  <div className="pt-2">
                     <button className="bg-school-orange/5 border border-school-orange/10 hover:bg-school-orange hover:text-white text-school-orange px-5 py-2 text-xs font-semibold rounded-lg transition-colors">
                        Mark Calendar
                     </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-school-black">Event Gallery</h2>
          <p className="text-gray-400 text-sm md:text-base font-light">Glimpses of recent celebrations and activities.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pastEvents.map((event, i) => (
            <div key={i} className="group relative rounded-2xl overflow-hidden aspect-[4/5] shadow-sm border border-gray-100">
              <Image 
                src={`https://picsum.photos/${event.image}`} 
                alt={event.title} 
                fill
                className="object-cover group-hover:scale-103 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-school-black/90 via-school-black/20 to-transparent flex flex-col justify-end p-6">
                 <span className="text-school-orange text-[10px] font-bold uppercase tracking-wider mb-1">{event.date}</span>
                 <h4 className="text-white font-heading font-bold text-base">{event.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
