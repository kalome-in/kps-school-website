'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, MapPin, Phone, Mail } from 'lucide-react';
import { Logo } from '@/components/logo';

export function Footer() {
  const [settings, setSettings] = useState({
    instagramUrl: '#',
    facebookUrl: '#',
    youtubeUrl: '#',
    linkedinUrl: '#',
    twitterUrl: '#',
    phone: '+91 98484 59246, 99894 09246',
    email: 'kpskorutla@gmail.com',
  });

  useEffect(() => {
    async function loadSettings() {
      try {
        const response = await fetch('/api/settings');
        const json = await response.json();
        if (json.status === 'success' && json.data) {
          setSettings(prev => ({
            ...prev,
            instagramUrl: json.data.instagramUrl || '#',
            facebookUrl: json.data.facebookUrl || '#',
            youtubeUrl: json.data.youtubeUrl || '#',
            linkedinUrl: json.data.linkedinUrl || '#',
            twitterUrl: json.data.twitterUrl || '#',
            phone: json.data.phone || prev.phone,
            email: json.data.email || prev.email,
          }));
        }
      } catch (error) {
        console.error('Error fetching settings for footer:', error);
      }
    }
    loadSettings();
  }, []);

  return (
    <footer className="bg-school-black text-white pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand & About */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 inline-block">
              <div className="bg-white p-1.5 rounded-xl inline-flex shadow-sm">
                <Logo className="w-10 h-10" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-lg text-white leading-tight tracking-tight">KORUTLA</span>
                <span className="font-heading font-semibold text-[9px] tracking-widest text-school-gray uppercase">Public School</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mt-4">
              <span className="text-school-yellow font-bold">EMPOWER.</span>{" "}
              <span className="text-school-orange font-bold">EDUCATE.</span>{" "}
              <span className="text-school-red font-bold">ELEVATE.</span>{" "}
              Managed by Kalam Dreams Educational Society. Established in 2016, KPS builds a strong foundation for the leaders of tomorrow.
            </p>
            <div className="flex gap-4 pt-2">
              {settings.facebookUrl && settings.facebookUrl !== '#' && (
                <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:bg-school-orange hover:text-white transition-colors border border-white/5">
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {settings.twitterUrl && settings.twitterUrl !== '#' && (
                <a href={settings.twitterUrl} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:bg-school-orange hover:text-white transition-colors border border-white/5">
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {settings.instagramUrl && settings.instagramUrl !== '#' && (
                <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:bg-school-orange hover:text-white transition-colors border border-white/5">
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {settings.linkedinUrl && settings.linkedinUrl !== '#' && (
                <a href={settings.linkedinUrl} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:bg-school-orange hover:text-white transition-colors border border-white/5">
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {settings.youtubeUrl && settings.youtubeUrl !== '#' && (
                <a href={settings.youtubeUrl} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:bg-school-orange hover:text-white transition-colors border border-white/5">
                  <Youtube className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-xs tracking-widest uppercase mb-6 text-white border-b border-white/5 pb-3">Quick Links</h3>
            <ul className="space-y-3">
              {['About School', 'Academics', 'Admissions', 'Notices', 'Careers'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(' ', '')}`} className="text-gray-400 hover:text-school-orange transition-colors text-sm flex items-center gap-2">
                    <span className="text-school-gray">—</span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Facilities */}
          <div>
            <h3 className="font-heading font-semibold text-xs tracking-widest uppercase mb-6 text-white border-b border-white/5 pb-3">Facilities</h3>
            <ul className="space-y-3">
              {['Smart Classrooms', 'Science Labs', 'Library', 'Sports Arena', 'Transport'].map((item) => (
                <li key={item}>
                  <Link href="/facilities" className="text-gray-400 hover:text-school-orange transition-colors text-sm flex items-center gap-2">
                    <span className="text-school-gray">—</span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-semibold text-xs tracking-widest uppercase mb-6 text-white border-b border-white/5 pb-3">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm text-gray-400 items-start">
                <MapPin className="w-4 h-4 text-school-orange shrink-0 mt-0.5" />
                <span>Jhansi Road, Near Geetha Bhavan,<br />Korutla – 505326,<br />District Jagtial, Telangana</span>
              </li>
              <li className="flex gap-3 text-sm text-gray-400 items-center">
                <Phone className="w-4 h-4 text-school-orange shrink-0" />
                <span>{settings.phone}</span>
              </li>
              <li className="flex gap-3 text-sm text-gray-400 items-center">
                <Mail className="w-4 h-4 text-school-orange shrink-0" />
                <span>{settings.email}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 text-xs text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} Korutla Public School. All rights reserved.</p>
          <p>Designed & Developed by <span className="text-school-orange font-medium hover:underline cursor-pointer">Kalome</span></p>
        </div>
      </div>
    </footer>
  );
}
