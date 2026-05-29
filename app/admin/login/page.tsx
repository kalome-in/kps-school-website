'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, AlertCircle, Loader2 } from 'lucide-react';
import { Logo } from '@/components/logo';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'login', username, password }),
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        router.push('/admin');
        router.refresh();
      } else {
        setError(data.message || 'Invalid username or password');
      }
    } catch (err) {
      setError('A network error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 bg-dot-pattern">
      <div className="w-full max-w-md bg-white rounded-3xl border border-gray-150 shadow-xl overflow-hidden p-8 space-y-8 transition-all hover:shadow-2xl">
        {/* Header/Logo */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="bg-school-light p-3 rounded-2xl border border-gray-100 shadow-xs inline-flex">
            <Logo className="w-16 h-16" />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-bold font-heading text-school-black tracking-tight uppercase">KPS Portal</h1>
            <p className="text-xs text-school-gray tracking-wider uppercase font-semibold">Administrative Dashboard</p>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3.5 rounded-2xl flex items-center gap-3 text-sm animate-shake">
            <AlertCircle className="w-5 h-5 shrink-0 text-red-650" />
            <span className="font-medium">{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Username</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                <User className="w-4 h-4" />
              </span>
              <input
                required
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-school-orange/20 focus:border-school-orange outline-none bg-gray-50/50 focus:bg-white transition-all font-medium"
                placeholder="Enter admin username"
                disabled={loading}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Password</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                <Lock className="w-4 h-4" />
              </span>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-school-orange/20 focus:border-school-orange outline-none bg-gray-50/50 focus:bg-white transition-all font-medium"
                placeholder="••••••••"
                disabled={loading}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-school-black hover:bg-school-orange text-white font-bold py-3.5 rounded-xl transition-all shadow-md flex justify-center items-center gap-2 cursor-pointer disabled:opacity-75 text-sm uppercase tracking-wider active:scale-98"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Verifying...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="text-center">
          <p className="text-[10px] text-gray-400 font-light leading-relaxed">
            Authorized administrative access only. Logins and actions are audited.<br />
            &copy; {new Date().getFullYear()} Korutla Public School.
          </p>
        </div>
      </div>
    </div>
  );
}
