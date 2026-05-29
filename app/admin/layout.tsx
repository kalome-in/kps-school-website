'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Bell, 
  FileSpreadsheet, 
  Briefcase, 
  Image as ImageIcon, 
  MailOpen, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Moon, 
  Sun, 
  UserCircle 
} from 'lucide-react';
import { Logo } from '@/components/logo';

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SIDEBAR_ITEMS: SidebarItem[] = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Notifications', href: '/admin/notifications', icon: Bell },
  { label: 'Admissions', href: '/admin/admissions', icon: FileSpreadsheet },
  { label: 'Careers / Job Portal', href: '/admin/careers', icon: Briefcase },
  { label: 'Gallery', href: '/admin/gallery', icon: ImageIcon },
  { label: 'Contact Queries', href: '/admin/contact', icon: MailOpen },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('admin-theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const newVal = !darkMode;
    setDarkMode(newVal);
    localStorage.setItem('admin-theme', newVal ? 'dark' : 'light');
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'logout' }),
      });
      if (response.ok) {
        router.push('/admin/login');
        router.refresh();
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get active item label
  const activeItem = SIDEBAR_ITEMS.find(item => item.href === pathname) || SIDEBAR_ITEMS[0];

  return (
    <div className={`${darkMode ? 'dark' : ''} min-h-screen bg-slate-50 dark:bg-zinc-950 flex transition-colors duration-200`}>
      {/* 1. DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex flex-col w-64 bg-white dark:bg-zinc-900 border-r border-slate-150 dark:border-zinc-800 shrink-0">
        {/* Brand / Logo */}
        <div className="h-20 flex items-center gap-3 px-6 border-b border-slate-100 dark:border-zinc-800">
          <div className="bg-slate-50 dark:bg-zinc-800 p-1.5 rounded-xl border border-slate-100 dark:border-zinc-700 shadow-xs inline-flex">
            <Logo className="w-8 h-8" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-sm text-slate-800 dark:text-white tracking-tight uppercase leading-none">KPS Admin</span>
            <span className="text-[9px] font-bold text-school-orange tracking-wider uppercase mt-1">Management Portal</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto hide-scrollbar">
          {SIDEBAR_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                  isActive
                    ? 'bg-school-orange text-white shadow-md shadow-school-orange/15 scale-102'
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-zinc-800 hover:text-slate-800 dark:hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400 dark:text-slate-500'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout Section */}
        <div className="p-4 border-t border-slate-100 dark:border-zinc-800">
          <button
            onClick={handleLogout}
            disabled={loading}
            className="flex items-center gap-3 w-full px-4 py-3 text-sm font-bold text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all duration-200 cursor-pointer"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>{loading ? 'Logging out...' : 'Sign Out'}</span>
          </button>
        </div>
      </aside>

      {/* 2. MOBILE SIDEBAR OVERLAY */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setMobileOpen(false)}></div>

          {/* Drawer */}
          <aside className="relative flex flex-col w-64 max-w-xs bg-white dark:bg-zinc-900 h-full border-r border-slate-150 dark:border-zinc-800 animate-slide-in-left shadow-2xl">
            {/* Close button */}
            <button 
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white bg-slate-50 dark:bg-zinc-800 border border-slate-100 dark:border-zinc-700 rounded-lg cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Brand / Logo */}
            <div className="h-20 flex items-center gap-3 px-6 border-b border-slate-100 dark:border-zinc-800">
              <div className="bg-slate-50 dark:bg-zinc-800 p-1.5 rounded-xl border border-slate-100 dark:border-zinc-700 shadow-xs inline-flex">
                <Logo className="w-8 h-8" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-sm text-slate-800 dark:text-white tracking-tight uppercase leading-none">KPS Admin</span>
                <span className="text-[9px] font-bold text-school-orange tracking-wider uppercase mt-1">Management Portal</span>
              </div>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto hide-scrollbar">
              {SIDEBAR_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                      isActive
                        ? 'bg-school-orange text-white shadow-md shadow-school-orange/15'
                        : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-zinc-800 hover:text-slate-800 dark:hover:text-white'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400 dark:text-slate-500'}`} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Logout Section */}
            <div className="p-4 border-t border-slate-100 dark:border-zinc-800">
              <button
                onClick={() => { setMobileOpen(false); handleLogout(); }}
                disabled={loading}
                className="flex items-center gap-3 w-full px-4 py-3 text-sm font-bold text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all duration-200 cursor-pointer"
              >
                <LogOut className="w-4 h-4 shrink-0" />
                <span>{loading ? 'Logging out...' : 'Sign Out'}</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* 3. MAIN WRAPPER */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-20 bg-white dark:bg-zinc-900 border-b border-slate-150 dark:border-zinc-800 flex items-center justify-between px-4 sm:px-6 lg:px-8 transition-colors duration-200">
          <div className="flex items-center gap-3">
            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-zinc-800 border border-slate-100 dark:border-zinc-700 cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="text-lg sm:text-xl font-heading font-extrabold text-slate-800 dark:text-white tracking-tight">
              {activeItem?.label || 'Dashboard'}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white bg-slate-50 dark:bg-zinc-800 border border-slate-100 dark:border-zinc-750 hover:shadow-xs transition-all cursor-pointer"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </button>

            {/* Profile Dropdown Indicator */}
            <div className="flex items-center gap-2.5 border-l border-slate-100 dark:border-zinc-800 pl-4">
              <UserCircle className="w-8 h-8 text-slate-400 dark:text-slate-500" />
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-bold text-slate-800 dark:text-white leading-none">KPS Admin</span>
                <span className="text-[10px] text-gray-400 font-medium mt-0.5">Administrator</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Wrapper */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
