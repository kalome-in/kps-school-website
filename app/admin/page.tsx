'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Bell, 
  FileSpreadsheet, 
  Briefcase, 
  Image as ImageIcon, 
  Plus, 
  ArrowRight, 
  Settings as SettingsIcon, 
  UserPlus, 
  MessageSquare,
  Activity as ActivityIcon,
  ShieldCheck,
  Calendar,
  AlertTriangle
} from 'lucide-react';

interface Stats {
  totalNotices: number;
  publishedNotices: number;
  totalJobs: number;
  openJobs: number;
  totalAdmissions: number;
  totalQueries: number;
  unreadQueries: number;
  totalGallery: number;
}

interface Activity {
  id: number;
  text: string;
  timestamp: string;
  type: 'admission' | 'query' | 'notice' | 'job' | 'gallery' | 'settings' | 'auth';
}

interface Notice {
  id: number;
  title: string;
  category: string;
  date: string;
  priority: string;
}

export default function AdminDashboardHome() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOverview() {
      try {
        const response = await fetch('/api/admin/overview');
        const json = await response.json();
        if (json.status === 'success' && json.data) {
          setStats(json.data.stats);
          setActivities(json.data.recentActivity);
          setNotices(json.data.recentNotices);
        }
      } catch (error) {
        console.error('Error fetching dashboard overview:', error);
      } finally {
        setLoading(false);
      }
    }
    loadOverview();
  }, []);

  const formatActivityTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) + ' - ' + date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch {
      return 'Recent';
    }
  };

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'admission':
        return <UserPlus className="w-4 h-4 text-emerald-600 dark:text-emerald-450" />;
      case 'query':
        return <MessageSquare className="w-4 h-4 text-blue-600 dark:text-blue-450" />;
      case 'notice':
        return <Bell className="w-4 h-4 text-amber-500 dark:text-amber-450" />;
      case 'job':
        return <Briefcase className="w-4 h-4 text-orange-600 dark:text-orange-450" />;
      case 'gallery':
        return <ImageIcon className="w-4 h-4 text-indigo-650 dark:text-indigo-400" />;
      case 'settings':
        return <SettingsIcon className="w-4 h-4 text-slate-500 dark:text-slate-400" />;
      case 'auth':
        return <ShieldCheck className="w-4 h-4 text-indigo-650 dark:text-indigo-400" />;
      default:
        return <ActivityIcon className="w-4 h-4 text-slate-500" />;
    }
  };

  const getActivityBg = (type: Activity['type']) => {
    switch (type) {
      case 'admission':
        return 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/40';
      case 'query':
        return 'bg-blue-50 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900/40';
      case 'notice':
        return 'bg-amber-50 dark:bg-amber-950/20 border-amber-100 dark:border-amber-900/40';
      case 'job':
        return 'bg-orange-50 dark:bg-orange-950/20 border-orange-100 dark:border-orange-900/40';
      case 'gallery':
        return 'bg-indigo-50 dark:bg-indigo-950/20 border-indigo-100 dark:border-indigo-900/40';
      default:
        return 'bg-slate-50 dark:bg-zinc-800 border-slate-100 dark:border-zinc-700/60';
    }
  };

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        {/* Stats skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-32 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-3xl p-6 space-y-4">
              <div className="flex justify-between items-center">
                <div className="w-10 h-10 bg-slate-100 dark:bg-zinc-800 rounded-2xl"></div>
                <div className="w-12 h-6 bg-slate-100 dark:bg-zinc-800 rounded-lg"></div>
              </div>
              <div className="h-4 bg-slate-100 dark:bg-zinc-800 rounded-md w-2/3"></div>
            </div>
          ))}
        </div>

        {/* Content skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="h-44 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-3xl"></div>
            <div className="h-72 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-3xl"></div>
          </div>
          <div className="h-96 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-3xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* 1. STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Notices */}
        <div className="bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 rounded-3xl p-6 shadow-sm hover:scale-102 hover:shadow-md transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 rounded-2xl flex items-center justify-center text-amber-550 dark:text-amber-450 group-hover:scale-110 transition-transform">
              <Bell className="w-5 h-5" />
            </div>
            <span className="text-3xl font-black font-heading text-slate-800 dark:text-white tracking-tight">
              {stats?.totalNotices || 0}
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-350">Total Notices</h3>
            <p className="text-[11px] text-gray-400 mt-1">{stats?.publishedNotices || 0} currently published</p>
          </div>
        </div>

        {/* Admissions enquiries */}
        <div className="bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 rounded-3xl p-6 shadow-sm hover:scale-102 hover:shadow-md transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/40 rounded-2xl flex items-center justify-center text-school-red group-hover:scale-110 transition-transform">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <span className="text-3xl font-black font-heading text-slate-800 dark:text-white tracking-tight">
              {stats?.totalAdmissions || 0}
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-350">Admissions Inquiries</h3>
            <p className="text-[11px] text-gray-400 mt-1">Pending review & verification</p>
          </div>
        </div>

        {/* Careers postings */}
        <div className="bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 rounded-3xl p-6 shadow-sm hover:scale-102 hover:shadow-md transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 bg-orange-50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/40 rounded-2xl flex items-center justify-center text-school-orange group-hover:scale-110 transition-transform">
              <Briefcase className="w-5 h-5" />
            </div>
            <span className="text-3xl font-black font-heading text-slate-800 dark:text-white tracking-tight">
              {stats?.totalJobs || 0}
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-350">Job Postings</h3>
            <p className="text-[11px] text-gray-400 mt-1">{stats?.openJobs || 0} active openings</p>
          </div>
        </div>

        {/* Gallery images */}
        <div className="bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 rounded-3xl p-6 shadow-sm hover:scale-102 hover:shadow-md transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 rounded-2xl flex items-center justify-center text-indigo-650 dark:text-indigo-400 group-hover:scale-110 transition-transform">
              <ImageIcon className="w-5 h-5" />
            </div>
            <span className="text-3xl font-black font-heading text-slate-800 dark:text-white tracking-tight">
              {stats?.totalGallery || 0}
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-350">Gallery Media</h3>
            <p className="text-[11px] text-gray-400 mt-1">Uploaded campus albums</p>
          </div>
        </div>

      </div>

      {/* 2. BODY LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2-Columns */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Quick Actions Card */}
          <div className="bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
            <h3 className="text-base font-bold font-heading text-slate-800 dark:text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              
              <Link href="/admin/notifications?add=true" className="bg-slate-50 dark:bg-zinc-800 border border-slate-100 dark:border-zinc-700/65 p-4 rounded-2xl flex flex-col items-center justify-center text-center space-y-2 group hover:border-school-orange transition-all">
                <div className="w-9 h-9 bg-white dark:bg-zinc-900 rounded-xl border border-slate-100 dark:border-zinc-750 flex items-center justify-center text-slate-600 dark:text-slate-300 group-hover:bg-school-orange group-hover:text-white transition-colors shadow-xs">
                  <Plus className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Add Notice</span>
              </Link>
              
              <Link href="/admin/careers?add=true" className="bg-slate-50 dark:bg-zinc-800 border border-slate-100 dark:border-zinc-700/65 p-4 rounded-2xl flex flex-col items-center justify-center text-center space-y-2 group hover:border-school-orange transition-all">
                <div className="w-9 h-9 bg-white dark:bg-zinc-900 rounded-xl border border-slate-100 dark:border-zinc-750 flex items-center justify-center text-slate-600 dark:text-slate-300 group-hover:bg-school-orange group-hover:text-white transition-colors shadow-xs">
                  <Plus className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Post Vacancy</span>
              </Link>

              <Link href="/admin/gallery?add=true" className="bg-slate-50 dark:bg-zinc-800 border border-slate-100 dark:border-zinc-700/65 p-4 rounded-2xl flex flex-col items-center justify-center text-center space-y-2 group hover:border-school-orange transition-all">
                <div className="w-9 h-9 bg-white dark:bg-zinc-900 rounded-xl border border-slate-100 dark:border-zinc-750 flex items-center justify-center text-slate-600 dark:text-slate-300 group-hover:bg-school-orange group-hover:text-white transition-colors shadow-xs">
                  <Plus className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Add Gallery</span>
              </Link>

              <Link href="/admin/settings" className="bg-slate-50 dark:bg-zinc-800 border border-slate-100 dark:border-zinc-700/65 p-4 rounded-2xl flex flex-col items-center justify-center text-center space-y-2 group hover:border-school-orange transition-all">
                <div className="w-9 h-9 bg-white dark:bg-zinc-900 rounded-xl border border-slate-100 dark:border-zinc-750 flex items-center justify-center text-slate-600 dark:text-slate-300 group-hover:bg-school-orange group-hover:text-white transition-colors shadow-xs">
                  <SettingsIcon className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Settings</span>
              </Link>

            </div>
          </div>

          {/* Latest Notifications Table */}
          <div className="bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold font-heading text-slate-800 dark:text-white">Latest Announcements</h3>
              <Link href="/admin/notifications" className="text-xs font-bold text-school-orange hover:underline flex items-center gap-1">
                View All <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-zinc-800/80 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                    <th className="pb-3">Title</th>
                    <th className="pb-3">Category</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3">Priority</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-slate-50 dark:divide-zinc-800/50">
                  {notices.length > 0 ? (
                    notices.map((notice) => (
                      <tr key={notice.id} className="text-slate-700 dark:text-slate-300">
                        <td className="py-3.5 pr-4 font-medium line-clamp-1 max-w-[240px]">{notice.title}</td>
                        <td className="py-3.5">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md border border-slate-100 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-800 text-slate-500 dark:text-slate-400">
                            {notice.category}
                          </span>
                        </td>
                        <td className="py-3.5 text-xs text-slate-500 dark:text-slate-400">{notice.date}</td>
                        <td className="py-3.5">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                            notice.priority === 'High' 
                              ? 'bg-red-50 dark:bg-red-950/20 text-red-655 border border-red-100 dark:border-red-900/40' 
                              : notice.priority === 'Medium'
                              ? 'bg-amber-50 dark:bg-amber-955/20 text-amber-600 border border-amber-100 dark:border-amber-900/40'
                              : 'bg-slate-50 dark:bg-zinc-850 text-slate-500 border border-slate-100 dark:border-zinc-800'
                          }`}>
                            {notice.priority}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-6 text-center text-sm text-gray-400 font-light italic">
                        No announcements posted yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Column - Recent Activity */}
        <div className="bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 rounded-3xl p-6 shadow-sm flex flex-col">
          <div className="flex items-center gap-2 mb-4 border-b border-slate-50 dark:border-zinc-800/80 pb-3">
            <ActivityIcon className="w-5 h-5 text-school-orange" />
            <h3 className="text-base font-bold font-heading text-slate-800 dark:text-white">Recent Activity</h3>
          </div>

          <div className="flex-1 space-y-5 overflow-y-auto max-h-[450px] pr-2 hide-scrollbar">
            {activities.length > 0 ? (
              activities.map((act) => (
                <div key={act.id} className="flex gap-3 items-start group">
                  <div className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 shadow-xs ${getActivityBg(act.type)}`}>
                    {getActivityIcon(act.type)}
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 leading-normal break-words">
                      {act.text}
                    </p>
                    <span className="flex items-center gap-1 text-[9px] text-gray-400">
                      <Calendar className="w-3 h-3" /> {formatActivityTime(act.timestamp)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-12 text-gray-300 space-y-2">
                <AlertTriangle className="w-8 h-8 text-gray-300" />
                <p className="text-xs text-gray-400 font-light">No activities logged yet.</p>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
