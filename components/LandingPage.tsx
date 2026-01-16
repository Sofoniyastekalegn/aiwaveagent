
import React, { useState } from 'react';
import { 
  ChevronRight, Play, CheckCircle2, Star, Layout, 
  Calendar, MessageSquare, BarChart3, Globe, Mail, 
  Menu, X, Phone, ShieldCheck, Zap, ArrowRight 
} from 'lucide-react';
import { Industry } from '../types';
import { INDUSTRIES } from '../constants';
import LiveCallPanel from './LiveCallPanel';
import Logo from './Logo';

const LandingPage: React.FC<{ onGetStarted: () => void }> = ({ onGetStarted }) => {
  const [showDemo, setShowDemo] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState<Industry>(Industry.BARBER);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    { 
      icon: <MessageSquare className="w-6 h-6 text-indigo-600" />, 
      title: "AI Voice Agents", 
      desc: "Human-like voice assistants that answer calls, book appointments, and handle FAQs 24/7." 
    },
    { 
      icon: <Calendar className="w-6 h-6 text-emerald-600" />, 
      title: "Automated Booking", 
      desc: "Sync with calendars, assign staff, and send automated SMS/Email reminders seamlessly." 
    },
    { 
      icon: <Zap className="w-6 h-6 text-purple-600" />, 
      title: "Workflow Automation", 
      desc: "Trigger personalized sequences based on client actions to maximize conversion." 
    },
    { 
      icon: <Globe className="w-6 h-6 text-blue-600" />, 
      title: "Website Builder", 
      desc: "High-converting funnel and website builder designed specifically for service industries." 
    },
    { 
      icon: <BarChart3 className="w-6 h-6 text-pink-600" />, 
      title: "Advanced Reports", 
      desc: "Track every call, booking, and campaign dollar with professional SaaS dashboards." 
    },
    { 
      icon: <ShieldCheck className="w-6 h-6 text-amber-600" />, 
      title: "14-Day Trial", 
      desc: "Start today with zero commitment and see the automation power for yourself." 
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform">
              <Logo className="w-6 h-6" />
            </div>
            <span className="text-xl md:text-2xl font-black text-slate-900 tracking-tighter uppercase italic">
              AIWaveAgency
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10 text-slate-600 font-bold text-sm uppercase tracking-widest">
            <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
            <a href="#industries" className="hover:text-indigo-600 transition-colors">Solutions</a>
            <a href="#support" className="hover:text-indigo-600 transition-colors">Support</a>
            <button 
              onClick={onGetStarted}
              className="bg-indigo-600 text-white px-8 py-3 rounded-full font-black hover:bg-indigo-700 active:scale-95 transition-all shadow-xl shadow-indigo-100 uppercase tracking-widest text-xs"
            >
              LAUNCH APP
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-slate-900 active:bg-slate-100 rounded-xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav Drawer */}
        <div className={`md:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-100 transition-all duration-500 ease-in-out ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'}`}>
          <div className="p-8 space-y-6">
            <a href="#features" onClick={() => setIsMenuOpen(false)} className="block text-xl font-black text-slate-900 uppercase tracking-tighter italic">Features</a>
            <a href="#industries" onClick={() => setIsMenuOpen(false)} className="block text-xl font-black text-slate-900 uppercase tracking-tighter italic">Solutions</a>
            <a href="#support" onClick={() => setIsMenuOpen(false)} className="block text-xl font-black text-slate-900 uppercase tracking-tighter italic">Support</a>
            <button 
              onClick={() => { setIsMenuOpen(false); onGetStarted(); }}
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm"
            >
              Login to Platform
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 text-xs font-black uppercase tracking-widest mb-10 border border-indigo-100 shadow-sm">
            <Star className="w-3 h-3 mr-2 fill-current" />
            The #1 AI Operating System for Service Businesses
          </div>
          
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-slate-950 mb-8 leading-[0.95] tracking-tighter italic uppercase">
            SCALE WITHOUT <br />
            <span className="text-indigo-600">LIMITS</span>
          </h1>
          
          <p className="text-lg sm:text-2xl text-slate-600 max-w-4xl mx-auto mb-14 font-medium leading-relaxed px-4">
            Ditch the old phone systems. Our AI Voice Agents answer, book, and close clients for MedSpas, Barbers, and Clinics—while you sleep.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto px-6">
            <button 
              onClick={onGetStarted}
              className="w-full sm:w-auto bg-indigo-600 text-white px-12 py-5 rounded-2xl text-xl font-black hover:bg-indigo-700 active:scale-95 transition-all shadow-2xl shadow-indigo-200 flex items-center justify-center uppercase tracking-tighter italic"
            >
              Get Started Free <ChevronRight className="ml-2 w-6 h-6" />
            </button>
            <button 
              onClick={() => setShowDemo(true)}
              className="w-full sm:w-auto bg-white border-2 border-slate-200 text-slate-900 px-12 py-5 rounded-2xl text-xl font-black hover:bg-slate-50 active:scale-95 transition-all flex items-center justify-center shadow-lg uppercase tracking-tighter italic"
            >
              <Play className="mr-3 w-6 h-6 fill-slate-900" /> Live Demo
            </button>
          </div>

          {/* Device Showcase (High-End Polish) */}
          <div id="industries" className="mt-24 w-full max-w-6xl mx-auto px-4 perspective-1000">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[3rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative bg-slate-950 rounded-[3rem] p-4 sm:p-10 shadow-3xl overflow-hidden border border-slate-800">
                <div className="text-center mb-12">
                  <h3 className="text-indigo-400 font-black uppercase tracking-[0.3em] text-xs sm:text-sm mb-10">Select Solution to Test Riley AI</h3>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-16 px-4">
                    {INDUSTRIES.map((ind) => (
                      <button
                        key={ind.id}
                        onClick={() => setSelectedIndustry(ind.id)}
                        className={`group relative flex items-center space-x-3 p-4 sm:p-5 rounded-2xl border transition-all active:scale-[0.97] ${
                          selectedIndustry === ind.id 
                            ? 'bg-white border-white text-slate-950 shadow-2xl' 
                            : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-indigo-500 hover:bg-slate-900'
                        }`}
                      >
                        <div className={`shrink-0 p-2 rounded-xl ${selectedIndustry === ind.id ? 'bg-indigo-600 text-white' : 'bg-slate-800 group-hover:bg-slate-700'}`}>
                          {ind.icon}
                        </div>
                        <span className="font-black text-xs sm:text-sm tracking-tighter uppercase italic">{ind.id}</span>
                      </button>
                    ))}
                  </div>

                  <div className="flex flex-col items-center">
                    <button 
                      onClick={() => setShowDemo(true)}
                      className="relative w-28 h-28 sm:w-32 sm:h-32 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-3xl shadow-indigo-600/50 hover:scale-105 active:scale-90 transition-all group"
                    >
                      <Phone className="w-12 h-12 group-hover:rotate-12 transition-transform duration-500" />
                    </button>
                    <p className="mt-8 font-black text-indigo-400 text-sm tracking-widest uppercase italic animate-pulse">Call Riley AI...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl sm:text-6xl font-black text-slate-950 mb-6 leading-[0.95] tracking-tighter uppercase italic">
                BUILT FOR THE <br />
                <span className="text-indigo-600">REAL WORLD</span>
              </h2>
              <p className="text-xl text-slate-600 font-medium">No complex setup. No hiring required. Just pure automated growth.</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-200 hover:border-indigo-500 hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-500 group">
                <div className="mb-8 p-5 bg-slate-50 rounded-2xl w-fit group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-sm">{f.icon}</div>
                <h3 className="text-2xl font-black text-slate-950 mb-4 tracking-tighter uppercase italic">{f.title}</h3>
                <p className="text-slate-600 leading-relaxed font-medium">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="support" className="bg-white text-slate-600 pt-32 pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            <div className="col-span-1 lg:col-span-1">
              <div className="flex items-center space-x-2 mb-8">
                <div className="p-1.5 bg-indigo-600 rounded-lg text-white">
                  <Logo className="w-6 h-6" />
                </div>
                <span className="text-2xl font-black text-slate-950 tracking-tighter uppercase italic">AIWaveAgency</span>
              </div>
              <p className="font-medium leading-relaxed mb-8">
                The enterprise-grade AI Operating System for modern service businesses. Scale your outreach and booking without increasing headcount.
              </p>
            </div>
            
            <div className="col-span-1">
              <h4 className="text-slate-950 font-black uppercase tracking-widest text-sm mb-10 italic">Support Center</h4>
              <div className="space-y-6">
                <div>
                  <p className="text-indigo-600 text-[10px] font-black uppercase tracking-widest mb-2">CEO / Operations</p>
                  <a href="mailto:joel@aiwaveagency.com" className="text-slate-950 hover:text-indigo-600 transition-colors block text-lg font-bold">joel@aiwaveagency.com</a>
                </div>
                <div>
                  <p className="text-indigo-600 text-[10px] font-black uppercase tracking-widest mb-2">Technical Success</p>
                  <a href="mailto:sofoniyastekalegn@gmail.com" className="text-slate-950 hover:text-indigo-600 transition-colors block text-lg font-bold">sofoniyastekalegn@gmail.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {showDemo && <LiveCallPanel industry={selectedIndustry} onClose={() => setShowDemo(false)} />}
    </div>
  );
};

export default LandingPage;
