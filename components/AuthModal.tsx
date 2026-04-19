
import React, { useState } from 'react';
import { X, Mail, Lock, User, Loader2, ArrowRight } from 'lucide-react';
import { supabase } from '../services/supabaseService';
import Logo from './Logo';

interface AuthModalProps {
  onClose: () => void;
  onSuccess: (user: any) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        onSuccess(data.user);
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName } }
        });
        if (error) throw error;
        onSuccess(data.user);
      }
    } catch (err: any) {
      const msg = String(err?.message || 'Authentication failed').toLowerCase();
      if (msg === 'failed to fetch' || msg.includes('fetch')) {
        setError(
          'Cannot reach Supabase. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel → Project Settings → Environment Variables. Get keys from supabase.com/dashboard → Settings → API.'
        );
      } else if (msg.includes('invalid api key') || msg.includes('invalid_api_key')) {
        setError(
          'Invalid Supabase key. In Vercel → Project Settings → Environment Variables, add VITE_SUPABASE_ANON_KEY with the anon key from supabase.com/dashboard → Settings → API (starts with eyJ...). Redeploy after adding.'
        );
      } else {
        setError(err?.message || 'Authentication failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-300">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-950 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-10">
          <div className="flex justify-center mb-8">
            <div className="p-3 bg-indigo-600 rounded-2xl text-white shadow-xl shadow-indigo-100">
              <Logo className="w-8 h-8" />
            </div>
          </div>

          <h2 className="text-3xl font-black text-slate-950 mb-2 text-center tracking-tighter uppercase italic">
            {isLogin ? 'Welcome Back' : 'Join AIWave'}
          </h2>
          <p className="text-slate-500 text-center text-sm font-medium mb-10">
            {isLogin ? 'Login to manage your AI agents' : 'Start your 14-day free trial today'}
          </p>
          <div className="goh-guidance p-3 mb-6 text-left">
            <p className="text-xs font-semibold mb-2">
              {isLogin
                ? 'Sign in to continue workflow setup, review calls, and manage automated follow-ups.'
                : 'Create your account first, then connect phone and workflow automations step by step.'}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="goh-action-btn px-3 py-1.5 rounded-lg text-xs font-semibold"
            >
              Skip for Now
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 bg-slate-100 border-none rounded-2xl font-bold text-sm tracking-widest uppercase focus:ring-2 focus:ring-indigo-500/20 transition-all"
                  required
                />
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="email" 
                placeholder="Email Address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-slate-100 border-none rounded-2xl font-bold text-sm tracking-widest uppercase focus:ring-2 focus:ring-indigo-500/20 transition-all"
                required
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-slate-100 border-none rounded-2xl font-bold text-sm tracking-widest uppercase focus:ring-2 focus:ring-indigo-500/20 transition-all"
                required
              />
            </div>

            {error && <p className="text-red-500 text-xs font-black uppercase tracking-widest text-center mt-2">{error}</p>}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-indigo-100 flex items-center justify-center hover:bg-indigo-700 active:scale-95 transition-all mt-6"
            >
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                <>
                  {isLogin ? 'Login Now' : 'Create Account'}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-xs font-bold text-slate-500 uppercase tracking-widest">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-indigo-600 hover:underline"
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
