'use client';

import { useState } from 'react';
import { PhoneCall, MessageCircle, MapPin, X, HelpCircle } from 'lucide-react';

export function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  const contactOptions = [
    {
      id: 'whatsapp',
      label: 'WhatsApp Us',
      icon: <MessageCircle className="w-5 h-5" />,
      href: 'https://wa.me/919848459246?text=Hi%2C%20I%20have%20an%20inquiry%20about%20Korutla%20Public%20School.',
      colorClass: 'bg-[#25D366] hover:bg-[#20ba5a] text-white',
      shadowClass: 'shadow-[#25D366]/20',
    },
    {
      id: 'call',
      label: 'Call School',
      icon: <PhoneCall className="w-5 h-5" />,
      href: 'tel:+919848459246',
      colorClass: 'bg-school-orange hover:bg-school-orange/90 text-white',
      shadowClass: 'shadow-school-orange/20',
    },
    {
      id: 'maps',
      label: 'Locate on Map',
      icon: <MapPin className="w-5 h-5" />,
      href: 'https://www.google.com/maps/place/Korutla+Public+School+E%2FM/@18.8264643,78.7083688,17z',
      colorClass: 'bg-[#3b82f6] hover:bg-[#2563eb] text-white',
      shadowClass: 'shadow-blue-500/20',
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expanded Menu Options */}
      <div 
        className={`flex flex-col items-end gap-3 mb-4 transition-all duration-300 origin-bottom ${
          isOpen 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-8 scale-90 pointer-events-none'
        }`}
      >
        {contactOptions.map((option, index) => (
          <div 
            key={option.id}
            className="flex items-center gap-3 group"
            style={{ transitionDelay: `${index * 50}ms` }}
          >
            {/* Tooltip Label */}
            <span className="bg-white text-school-black text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-150 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none select-none">
              {option.label}
            </span>
            
            {/* Floating Option Button */}
            <a
              href={option.href}
              target={option.id !== 'call' ? '_blank' : undefined}
              rel={option.id !== 'call' ? 'noopener noreferrer' : undefined}
              className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95 ${option.colorClass} ${option.shadowClass}`}
              title={option.label}
            >
              {option.icon}
            </a>
          </div>
        ))}
      </div>

      {/* Main Trigger Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center bg-school-black text-white shadow-xl hover:shadow-2xl border border-white/10 hover:bg-school-orange transition-all duration-300 hover:scale-105 active:scale-95 group relative overflow-hidden`}
        aria-label="Contact Quick Access Menu"
      >
        {/* Pulse Ripple Effect when closed */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-school-orange/30 animate-ping opacity-60"></span>
        )}
        
        {/* Main Icon with spin rotation */}
        <div className={`transition-transform duration-300 ${isOpen ? 'rotate-90' : 'rotate-0'}`}>
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <HelpCircle className="w-6 h-6 text-white group-hover:text-white" />
          )}
        </div>
      </button>
    </div>
  );
}
