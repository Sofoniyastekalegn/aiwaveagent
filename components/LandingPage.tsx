
import React, { useState } from 'react';
import { 
  ChevronRight, Play, Star,
  Calendar, MessageSquare, BarChart3, Globe, Mail, User, Building2, Workflow,
  Menu, X, Phone, ShieldCheck, Zap,
  ChevronDown, ArrowLeft, Bot, Mic, MessageCircle, CalendarClock, Send
} from 'lucide-react';
import { Industry } from '../types';
import { INDUSTRIES } from '../constants';
import LiveCallPanel from './LiveCallPanel';
import Logo from './Logo';

const settingsNavItems = ['My Profile', 'Company', 'Team'] as const;
const billingNavItems = [
  'Snapshot',
  'Phone Integration',
  'Email Services',
  'LC - Premium Triggers & Actions',
  'Workflow AI',
  'Content AI',
  'Affiliate',
  'Custom Menu Links',
  'Stripe',
  'API Keys',
  'Compliance',
  'Launchpad',
  'Audit Logs',
] as const;

const LandingPage: React.FC<{ onGetStarted: () => void }> = ({ onGetStarted }) => {
  const [showDemo, setShowDemo] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState<Industry>(Industry.BARBER);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSidebarItem, setActiveSidebarItem] = useState<string>('My Profile');

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

  const ghlItems = [
    ...settingsNavItems,
    ...billingNavItems,
  ];

  const scrollToId = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSidebarNav = (label: string) => {
    setActiveSidebarItem(label);
    setSidebarOpen(false);
    scrollToId('workflow-menu');
  };

  const demoCards = {
    profile: [
      ['Name', 'Sofoniyas Tekalegn'],
      ['Role', 'Agency Owner'],
      ['Timezone', 'Africa/Addis_Ababa'],
      ['Support Number', '+251 91 234 5678'],
    ],
    email: [
      ['Domain', 'mail.aiwaveagency.com'],
      ['Warmup Status', 'Active - 94% deliverability'],
      ['Primary Sequence', 'Lead Follow-up (3 Touch)'],
      ['Daily Limit', '250 emails/day'],
    ],
    workflow: [
      ['Trigger', 'Missed inbound call'],
      ['Action 1', 'Send SMS callback in 60 seconds'],
      ['Action 2', 'Send email with booking link'],
      ['Action 3', 'Assign lead owner in pipeline'],
    ],
  };

  const renderShowcasePanel = () => {
    const isProfile = activeSidebarItem === 'My Profile';
    const isEmail = activeSidebarItem === 'Email Services';
    const isWorkflow = activeSidebarItem === 'Workflow AI';

    const panelTitle = isProfile
      ? 'My Profile Demo'
      : isEmail
      ? 'Email Services Demo'
      : isWorkflow
      ? 'Workflow AI Demo'
      : `${activeSidebarItem} Demo`;

    const panelText = isProfile
      ? 'Sample user account details that show how profile settings control ownership, timezone, and contact behavior.'
      : isEmail
      ? 'Sample email setup inspired by GoHighLevel and n8n workflows, focused on deliverability and automation messaging.'
      : isWorkflow
      ? 'Sample AI workflow that handles missed calls and auto-follows leads with SMS + email until booking.'
      : 'This is a sample page preview so visitors can explore the product UX without sign in.';

    const rows = isProfile ? demoCards.profile : isEmail ? demoCards.email : isWorkflow ? demoCards.workflow : [];

    return (
      <section className="goh-card p-6 sm:p-8 md:p-10 mb-6">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-indigo-600 mb-2">No Sign-In Showcase</p>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{panelTitle}</h3>
          </div>
          <button className="goh-action-btn px-4 py-2 rounded-lg text-sm font-semibold">Skip Demo</button>
        </div>
        <p className="text-slate-600 mb-6">{panelText}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          {rows.length > 0 ? (
            rows.map(([label, value]) => (
              <div key={label} className="goh-soft-card p-4">
                <p className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-2">{label}</p>
                <p className="text-slate-900 font-semibold">{value}</p>
              </div>
            ))
          ) : (
            <>
              <div className="goh-soft-card p-4">
                <p className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-2">Module</p>
                <p className="text-slate-900 font-semibold">{activeSidebarItem}</p>
              </div>
              <div className="goh-soft-card p-4">
                <p className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-2">Status</p>
                <p className="text-slate-900 font-semibold">Demo mode active</p>
              </div>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="goh-soft-card p-3 flex items-center gap-2"><User className="w-4 h-4 text-indigo-600" /> <span className="text-sm font-medium">User Profile</span></div>
          <div className="goh-soft-card p-3 flex items-center gap-2"><Building2 className="w-4 h-4 text-indigo-600" /> <span className="text-sm font-medium">Company Info</span></div>
          <div className="goh-soft-card p-3 flex items-center gap-2"><Mail className="w-4 h-4 text-indigo-600" /> <span className="text-sm font-medium">Email Engine</span></div>
          <div className="goh-soft-card p-3 flex items-center gap-2"><Workflow className="w-4 h-4 text-indigo-600" /> <span className="text-sm font-medium">AI Workflow</span></div>
        </div>
      </section>
    );
  };

  const deepDiveByModule: Record<string, { title: string; summary: string; items: Array<{ label: string; value: string }> }> = {
    'My Profile': {
      title: 'User Profile Page',
      summary: 'Set owner identity, availability, and communication preferences used across automations.',
      items: [
        { label: 'Display Name', value: 'Sofoniyas Tekalegn' },
        { label: 'Working Hours', value: 'Mon - Sat, 8:00 AM to 7:00 PM' },
        { label: 'Default Response Channel', value: 'Voice + SMS' },
      ],
    },
    'Email Services': {
      title: 'Email Automation Page',
      summary: 'Manage sender reputation, templates, and campaign logic for warm leads and missed calls.',
      items: [
        { label: 'Automation 1', value: 'Missed Call Follow-up in 2 mins' },
        { label: 'Automation 2', value: 'No Reply Reminder after 24 hours' },
        { label: 'Open Rate', value: '52% in last 7 days' },
      ],
    },
    'Workflow AI': {
      title: 'Workflow AI Builder',
      summary: 'Visual n8n-style workflow orchestration for voice, chatbot, and text automation.',
      items: [
        { label: 'Trigger', value: 'Incoming call / website chatbot lead' },
        { label: 'Decision', value: 'Intent detection: booking vs support' },
        { label: 'Outcome', value: 'Book on calendar + notify team in Slack' },
      ],
    },
    'Phone Integration': {
      title: 'Voice + Text Routing',
      summary: 'Configure Twilio or SIP routing for inbound calls, SMS fallback, and call recording.',
      items: [
        { label: 'Primary Number', value: '+1 (415) 555-0134' },
        { label: 'Fallback', value: 'Text booking link if call missed' },
        { label: 'Recording', value: 'Enabled with compliance notice' },
      ],
    },
    Snapshot: {
      title: 'Executive Snapshot',
      summary: 'Quick performance overview of voice calls, chatbot conversations, and calendar bookings.',
      items: [
        { label: 'Booked Today', value: '18 appointments' },
        { label: 'Avg First Response', value: '43 seconds' },
        { label: 'Pipeline Value', value: '$12,450' },
      ],
    },
  };

  const renderDeepDivePage = () => {
    const page = deepDiveByModule[activeSidebarItem] ?? {
      title: `${activeSidebarItem} Page`,
      summary: 'Demo content for this module with realistic sample data and onboarding guidance.',
      items: [
        { label: 'Module', value: activeSidebarItem },
        { label: 'Status', value: 'Configured in demo mode' },
        { label: 'Last Updated', value: '2 minutes ago' },
      ],
    };

    return (
      <section className="goh-card p-6 sm:p-8 md:p-10 mb-6">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-indigo-600 mb-2">Deep Dive Demo Page</p>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{page.title}</h3>
            <p className="text-slate-600 mt-3">{page.summary}</p>
          </div>
          <button className="goh-action-btn px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap">Skip Page</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          {page.items.map((item) => (
            <div key={item.label} className="goh-soft-card p-4">
              <p className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-2">{item.label}</p>
              <p className="text-slate-900 font-semibold">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <div className="goh-soft-card p-5">
            <h4 className="font-bold text-slate-900 mb-4">Automation Journey</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2"><Bot className="w-4 h-4 text-indigo-600" /> Chatbot captures user intent from website chat.</div>
              <div className="flex items-center gap-2"><Mic className="w-4 h-4 text-indigo-600" /> Voice agent answers inbound calls with AI script.</div>
              <div className="flex items-center gap-2"><MessageCircle className="w-4 h-4 text-indigo-600" /> SMS fallback sent when caller drops before booking.</div>
              <div className="flex items-center gap-2"><Send className="w-4 h-4 text-indigo-600" /> Email reminder sequence starts automatically.</div>
              <div className="flex items-center gap-2"><CalendarClock className="w-4 h-4 text-indigo-600" /> Calendar slot reserved and confirmation sent.</div>
            </div>
          </div>

          <div className="goh-soft-card p-5">
            <h4 className="font-bold text-slate-900 mb-4">Sample Calendar & Messaging</h4>
            <div className="space-y-3 text-sm text-slate-700">
              <p><span className="font-semibold text-slate-900">09:00</span> - AI booked consultation (Dental Clinic)</p>
              <p><span className="font-semibold text-slate-900">11:30</span> - Text reminder sent with map link</p>
              <p><span className="font-semibold text-slate-900">14:15</span> - Chatbot lead converted to call</p>
              <p><span className="font-semibold text-slate-900">16:00</span> - Follow-up email for no-show recovery</p>
            </div>
            <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors">
              Open Full Workflow Demo
            </button>
          </div>
        </div>
      </section>
    );
  };

  const SidebarPanel = ({ className = '' }: { className?: string }) => (
    <div className={`flex flex-col h-full bg-[#1f2737] text-white border-r border-slate-800 ${className}`}>
      <div className="p-3 sm:p-4 border-b border-slate-800 shrink-0">
        <button
          type="button"
          onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setSidebarOpen(false); }}
          className="inline-flex items-center justify-center bg-white px-2.5 py-1 rounded-sm mb-3 w-full max-w-[140px]"
        >
          <Logo className="w-4 h-4 text-indigo-700 shrink-0" />
          <span className="ml-1 text-[10px] font-bold text-slate-900 truncate">Agency</span>
        </button>
        <button
          type="button"
          className="w-full flex items-center justify-between rounded-md bg-[#313c50] px-3 py-2 text-xs font-semibold text-slate-100"
        >
          <span className="truncate pr-2">Click here to switch</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-300 shrink-0" />
        </button>
        <button
          type="button"
          onClick={() => { scrollToId('support'); setSidebarOpen(false); }}
          className="mt-3 inline-flex items-center gap-1 rounded-sm bg-[#2d3748] px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-[#37445a] w-full sm:w-auto"
        >
          <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
          Go Back
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto overscroll-contain py-2 min-h-0">
        <div className="px-2 sm:px-3 mb-2">
          <p className="text-white text-lg sm:text-xl font-semibold mb-2 px-1">Settings</p>
          <div className="space-y-0.5">
            {settingsNavItems.map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => handleSidebarNav(label)}
                className={`w-full text-left px-2.5 py-2 text-sm rounded-sm transition-colors ${
                  activeSidebarItem === label ? 'bg-[#313c50] text-white' : 'text-slate-200 hover:bg-[#2b3547]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-2">
          <div className="px-2 sm:px-3 py-1.5 bg-[#161d2a] border-y border-slate-800">
            <p className="text-white text-lg sm:text-xl font-semibold">Billing</p>
          </div>
          <div className="px-2 sm:px-3 pt-1 space-y-0.5">
            {billingNavItems.map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => handleSidebarNav(label)}
                className={`w-full text-left px-2.5 py-2 text-sm rounded-sm transition-colors leading-snug ${
                  activeSidebarItem === label ? 'bg-[#313c50] text-white' : 'text-slate-200 hover:bg-[#2b3547]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f3f5fb] font-sans selection:bg-indigo-100 selection:text-indigo-900 flex">
      {/* Desktop: GoHighLevel-style left rail */}
      <aside className="hidden lg:flex w-[260px] xl:w-[280px] shrink-0 sticky top-0 h-screen z-30">
        <SidebarPanel className="w-full" />
      </aside>

      {/* Mobile / tablet: sidebar overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-[60] transition-opacity duration-200 ${
          sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!sidebarOpen}
      >
        <button
          type="button"
          className="absolute inset-0 bg-slate-950/50"
          onClick={() => setSidebarOpen(false)}
        />
        <div
          className={`absolute left-0 top-0 bottom-0 w-[min(280px,88vw)] shadow-2xl transform transition-transform duration-200 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <SidebarPanel className="w-full h-full" />
        </div>
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar — main column only (beside sidebar on lg+) */}
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shrink-0">
          <div className="h-16 sm:h-20 px-3 sm:px-6 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <button
                type="button"
                className="lg:hidden p-2 rounded-lg text-slate-900 hover:bg-slate-100 shrink-0"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
              <button
                type="button"
                className="flex items-center gap-2 min-w-0 group"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <div className="p-1.5 sm:p-2 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-100 group-hover:scale-105 transition-transform shrink-0">
                  <Logo className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="text-base sm:text-xl md:text-2xl font-black text-slate-900 tracking-tighter uppercase italic truncate">
                  AIWaveAgency
                </span>
              </button>
            </div>

            <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-slate-600 font-bold text-xs lg:text-sm uppercase tracking-widest shrink-0">
              <a href="#features" className="hover:text-indigo-600 transition-colors whitespace-nowrap">Features</a>
              <a href="#industries" className="hover:text-indigo-600 transition-colors whitespace-nowrap">Solutions</a>
              <a href="#support" className="hover:text-indigo-600 transition-colors whitespace-nowrap">Support</a>
              <button
                type="button"
                onClick={onGetStarted}
                className="bg-indigo-600 text-white px-5 lg:px-8 py-2.5 rounded-full font-black hover:bg-indigo-700 active:scale-95 transition-all shadow-lg shadow-indigo-100 uppercase tracking-widest text-[10px] lg:text-xs whitespace-nowrap"
              >
                LAUNCH APP
              </button>
            </nav>

            <div className="flex md:hidden items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={onGetStarted}
                className="bg-indigo-600 text-white px-3 py-2 rounded-full font-black text-[10px] uppercase tracking-widest"
              >
                LAUNCH
              </button>
              <button
                type="button"
                className="p-2 rounded-lg text-slate-900 hover:bg-slate-100"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Page links"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          <div
            className={`md:hidden overflow-hidden transition-all duration-300 border-t border-slate-100 ${
              isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
            }`}
          >
            <div className="px-4 py-4 flex flex-col gap-3 bg-white">
              <a href="#features" onClick={() => setIsMenuOpen(false)} className="text-sm font-black text-slate-900 uppercase tracking-tight">
                Features
              </a>
              <a href="#industries" onClick={() => setIsMenuOpen(false)} className="text-sm font-black text-slate-900 uppercase tracking-tight">
                Solutions
              </a>
              <a href="#support" onClick={() => setIsMenuOpen(false)} className="text-sm font-black text-slate-900 uppercase tracking-tight">
                Support
              </a>
            </div>
          </div>
        </header>

        <main className="flex-1 min-w-0">
      {/* Hero Section */}
      <section className="relative pt-8 sm:pt-12 lg:pt-14 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-10 overflow-hidden">
        <div className="max-w-5xl xl:max-w-6xl flex flex-col items-start text-left">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 text-xs font-black uppercase tracking-widest mb-10 border border-indigo-100 shadow-sm">
            <Star className="w-3 h-3 mr-2 fill-current" />
            The #1 AI Operating System for Service Businesses
          </div>
          
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-slate-950 mb-8 leading-[0.95] tracking-tighter italic uppercase">
            SCALE WITHOUT <br />
            <span className="text-indigo-600">LIMITS</span>
          </h1>
          
          <p className="text-lg sm:text-2xl text-slate-600 max-w-4xl mb-14 font-medium leading-relaxed">
            Ditch the old phone systems. Our AI Voice Agents answer, book, and close clients for MedSpas, Barbers, and Clinics—while you sleep.
          </p>

          <div className="goh-guidance p-4 sm:p-5 max-w-4xl w-full mb-10 text-left">
            <p className="text-sm sm:text-base font-semibold mb-3">
              Guided onboarding: create your account, connect your phone, launch automations, and monitor calls from one workflow dashboard.
            </p>
            <div className="flex flex-wrap gap-3">
              <button onClick={onGetStarted} className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors">
                Start Guided Setup
              </button>
              <button className="goh-action-btn px-4 py-2 rounded-lg text-sm font-semibold">
                Skip Intro
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 w-full sm:w-auto">
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
          <div id="industries" className="mt-24 w-full max-w-6xl ml-0 perspective-1000">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[3rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative bg-slate-950 rounded-[3rem] p-4 sm:p-10 shadow-3xl overflow-hidden border border-slate-800">
                <div className="text-left mb-12">
                  <h3 className="text-indigo-400 font-black uppercase tracking-[0.3em] text-xs sm:text-sm mb-10">Select Solution to Test Riley AI</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
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

                  <div className="flex flex-col items-start">
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

      <section id="workflow-menu" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-10">
        <div className="max-w-5xl xl:max-w-6xl goh-card p-6 sm:p-8 md:p-10 text-left">
          {renderShowcasePanel()}
          {renderDeepDivePage()}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-indigo-600 mb-2">GoHighLevel-style Navigation Demo</p>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">Workflow Menu Structure</h2>
            </div>
            <button className="goh-action-btn px-4 py-2 rounded-lg text-sm font-semibold">Skip Menu Setup</button>
          </div>
          <p className="text-slate-600 mb-8">
            Each menu item represents a setup page with practical guidance so your team knows how to configure accounts, calling, integrations, billing, and automation.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
            {ghlItems.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setActiveSidebarItem(item);
                  scrollToId('workflow-menu');
                }}
                className="text-left goh-soft-card p-4 hover:border-indigo-300 hover:shadow-sm transition-all"
              >
                <p className="font-semibold text-slate-900 mb-1">{item}</p>
                <p className="text-sm text-slate-600 mb-3">
                  Open demo page with sample data and guidance for this workflow section.
                </p>
                <span className="text-xs text-indigo-700 font-semibold">Open Demo</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 sm:py-28 lg:py-32 bg-slate-50 relative overflow-hidden">
        <div className="max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl sm:text-6xl font-black text-slate-950 mb-6 leading-[0.95] tracking-tighter uppercase italic">
                BUILT FOR THE <br />
                <span className="text-indigo-600">REAL WORLD</span>
              </h2>
              <p className="text-xl text-slate-600 font-medium">No complex setup. No hiring required. Just pure automated growth.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
      <footer id="support" className="bg-white text-slate-600 pt-20 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-10">
        <div className="max-w-5xl xl:max-w-6xl mx-auto">
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
        </main>
      </div>
    </div>
  );
};

export default LandingPage;
