'use client';

import { useState, useEffect } from 'react';
import { 
  Settings as SettingsIcon, 
  Lock, 
  Globe, 
  Phone, 
  Mail, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube, 
  Loader2, 
  CheckCircle, 
  AlertCircle 
} from 'lucide-react';

export default function AdminSettingsPage() {
  // Settings Form State
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');
  const [facebookUrl, setFacebookUrl] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [twitterUrl, setTwitterUrl] = useState('');

  // Password Form State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(true);
  const [savingSettings, setSavingSettings] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  // Toast
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    async function loadSettings() {
      try {
        const response = await fetch('/api/settings');
        const json = await response.json();
        if (json.status === 'success' && json.data) {
          setPhone(json.data.phone || '');
          setEmail(json.data.email || '');
          setInstagramUrl(json.data.instagramUrl || '');
          setFacebookUrl(json.data.facebookUrl || '');
          setYoutubeUrl(json.data.youtubeUrl || '');
          setLinkedinUrl(json.data.linkedinUrl || '');
          setTwitterUrl(json.data.twitterUrl || '');
        }
      } catch (error) {
        showToast('error', 'Failed to fetch settings');
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleSettingsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);

    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone,
          email,
          instagramUrl,
          facebookUrl,
          youtubeUrl,
          linkedinUrl,
          twitterUrl
        })
      });

      const json = await response.json();
      if (response.ok && json.status === 'success') {
        showToast('success', 'General settings saved successfully');
      } else {
        showToast('error', json.message || 'Failed to save settings');
      }
    } catch (err) {
      showToast('error', 'Network error occurred');
    } finally {
      setSavingSettings(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      showToast('error', 'New passwords do not match');
      return;
    }

    setSavingPassword(true);

    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword,
          newPassword
        })
      });

      const json = await response.json();
      if (response.ok && json.status === 'success') {
        showToast('success', 'Password updated successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        showToast('error', json.message || 'Failed to update password');
      }
    } catch (err) {
      showToast('error', 'Network error occurred');
    } finally {
      setSavingPassword(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-8 h-8 text-school-orange animate-spin" />
        <p className="text-xs text-gray-400 font-light">Loading portal settings...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      
      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl border animate-bounce ${
          toast.type === 'success' 
            ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border-emerald-250' 
            : 'bg-red-50 dark:bg-red-955 text-red-800 dark:text-red-300 border-red-250'
        }`}>
          {toast.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          <span className="text-xs font-bold">{toast.message}</span>
        </div>
      )}

      {/* 1. GENERAL & SOCIAL SETTINGS */}
      <div className="bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-2.5 border-b border-slate-50 dark:border-zinc-800/80 pb-3">
          <SettingsIcon className="w-5 h-5 text-school-orange" />
          <h3 className="text-base font-bold font-heading text-slate-800 dark:text-white">General & Social Settings</h3>
        </div>

        <form onSubmit={handleSettingsSubmit} className="space-y-6">
          
          {/* Contacts Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1">
              <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">School Contact Number *</label>
              <div className="relative">
                <input
                  required
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 text-xs rounded-xl border border-gray-250 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-school-orange/20 focus:border-school-orange dark:text-white font-medium"
                />
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">School Email Address *</label>
              <div className="relative">
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 text-xs rounded-xl border border-gray-250 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-school-orange/20 focus:border-school-orange dark:text-white font-medium"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>

          {/* Socials Section */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider border-b border-slate-50 dark:border-zinc-800/50 pb-2">Social Channels (Auto-Syncs Header/Footer)</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Facebook */}
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Facebook URL</label>
                <div className="relative">
                  <input
                    type="url"
                    value={facebookUrl}
                    onChange={(e) => setFacebookUrl(e.target.value)}
                    placeholder="https://facebook.com/..."
                    className="w-full pl-10 pr-4 py-3 text-xs rounded-xl border border-gray-250 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-school-orange/20 focus:border-school-orange dark:text-white font-medium"
                  />
                  <Facebook className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Twitter */}
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Twitter/X URL</label>
                <div className="relative">
                  <input
                    type="url"
                    value={twitterUrl}
                    onChange={(e) => setTwitterUrl(e.target.value)}
                    placeholder="https://twitter.com/..."
                    className="w-full pl-10 pr-4 py-3 text-xs rounded-xl border border-gray-250 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-school-orange/20 focus:border-school-orange dark:text-white font-medium"
                  />
                  <Twitter className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Instagram */}
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Instagram URL</label>
                <div className="relative">
                  <input
                    type="url"
                    value={instagramUrl}
                    onChange={(e) => setInstagramUrl(e.target.value)}
                    placeholder="https://instagram.com/..."
                    className="w-full pl-10 pr-4 py-3 text-xs rounded-xl border border-gray-250 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-school-orange/20 focus:border-school-orange dark:text-white font-medium"
                  />
                  <Instagram className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* LinkedIn */}
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">LinkedIn URL</label>
                <div className="relative">
                  <input
                    type="url"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    placeholder="https://linkedin.com/company/..."
                    className="w-full pl-10 pr-4 py-3 text-xs rounded-xl border border-gray-250 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-school-orange/20 focus:border-school-orange dark:text-white font-medium"
                  />
                  <Linkedin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* YouTube */}
              <div className="space-y-1 sm:col-span-2">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">YouTube Channel URL</label>
                <div className="relative">
                  <input
                    type="url"
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    placeholder="https://youtube.com/..."
                    className="w-full pl-10 pr-4 py-3 text-xs rounded-xl border border-gray-250 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-school-orange/20 focus:border-school-orange dark:text-white font-medium"
                  />
                  <Youtube className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={savingSettings}
              className="bg-school-black hover:bg-school-orange text-white px-5 py-3 rounded-xl text-xs font-bold cursor-pointer flex items-center gap-1.5 shadow-sm transition-all"
            >
              {savingSettings ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save System Settings'}
            </button>
          </div>

        </form>
      </div>

      {/* 2. PASSWORD ROTATION / SECURITY */}
      <div className="bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-2.5 border-b border-slate-50 dark:border-zinc-800/80 pb-3">
          <Lock className="w-5 h-5 text-school-red" />
          <h3 className="text-base font-bold font-heading text-slate-800 dark:text-white">Security & Password Rotation</h3>
        </div>

        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Current Password *</label>
            <input
              required
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 text-xs rounded-xl border border-gray-250 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-school-orange/20 focus:border-school-orange dark:text-white font-medium"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">New Password *</label>
              <input
                required
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 text-xs rounded-xl border border-gray-250 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-school-orange/20 focus:border-school-orange dark:text-white font-medium"
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Confirm New Password *</label>
              <input
                required
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 text-xs rounded-xl border border-gray-250 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-school-orange/20 focus:border-school-orange dark:text-white font-medium"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={savingPassword}
              className="bg-school-black hover:bg-school-orange text-white px-5 py-3 rounded-xl text-xs font-bold cursor-pointer flex items-center gap-1.5 shadow-sm transition-all"
            >
              {savingPassword ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Rotate Password'}
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}
