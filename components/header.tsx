'use client';

import Link from 'next/link';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { useState } from 'react';
import { Logo } from '@/components/logo';

const MENU_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Academics', href: '/academics' },
  { label: 'Facilities', href: '/facilities' },
  { label: 'Admissions', href: '/admissions' },
  { label: 'Notices', href: '/notices' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      {/* Top Bar */}
      <div className="bg-school-black text-white py-2 px-4 shadow-sm border-b border-white/5">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center text-xs sm:text-sm font-medium">
          <div className="flex gap-4">
            <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-school-gray" /> +91 98484 59246 / 99894 09246</span>
            <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-school-gray" /> kpskorutla@gmail.com</span>
          </div>
          <div className="hidden sm:block uppercase tracking-widest font-bold text-[10px] sm:text-xs">
            <span className="text-school-yellow">Empower.</span>{" "}
            <span className="text-school-orange">Educate.</span>{" "}
            <span className="text-school-red">Elevate.</span>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex shrink-0 items-center">
            <Link href="/" className="flex items-center gap-3">
              <Logo className="w-12 h-12" />
              <div className="flex flex-col">
                <span className="font-heading font-bold text-xl text-school-black leading-tight tracking-tight">KORUTLA</span>
                <span className="font-heading font-semibold text-[10px] tracking-widest text-[#757575] uppercase">Public School</span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-1 lg:space-x-4">
            {MENU_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-school-gray hover:text-school-orange px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex">
            <Link
              href="/admissions"
              className="bg-school-black hover:bg-school-orange text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm hover:shadow"
            >
              Apply Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-school-gray hover:text-school-black hover:bg-gray-100 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="block w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="block w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {MENU_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-school-gray hover:text-school-orange hover:bg-school-light block px-3 py-3 rounded-md text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/admissions"
              className="bg-school-black text-white hover:bg-school-orange block px-3 py-3 rounded-lg text-base font-semibold mt-4 text-center transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Apply Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
