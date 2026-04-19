
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Phone,
  LogOut,
  RefreshCw,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  ArrowLeft
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MOCK_CALLS } from '../constants';
import Waveform from './Waveform';
import ConversationModal from './ConversationModal';
import Logo from './Logo';
import { fetchCallLogs } from '../services/supabaseService';

interface DashboardProps {
  onBackToHome?: () => void;
  onLogout?: () => void;
  user?: any;
}

const chartData = [
  { name: 'Mon', calls: 24 },
  { name: 'Tue', calls: 32 },
  { name: 'Wed', calls: 45 },
  { name: 'Thu', calls: 38 },
  { name: 'Fri', calls: 52 },
  { name: 'Sat', calls: 60 },
  { name: 'Sun', calls: 48 },
];

const workflowTabs = [
  'My Profile',
  'Company',
  'Team',
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
];

const guidanceByTab: Record<string, string> = {
  'My Profile': 'Add your name, timezone, and contact details so ownership and notifications are clear across the team.',
  Company: 'Set your business name, hours, and brand voice so the assistant speaks consistently in every call flow.',
  Team: 'Invite teammates and assign permissions for sales, support, and admin access.',
  Snapshot: 'Review workspace health, key stats, and pending setup tasks before launching workflows.',
  'Phone Integration': 'Attach your business number and routing rules to answer calls, transfer when needed, or trigger voicemail AI.',
  'Email Services': 'Connect sender domains and templates to automate confirmations, reminders, and follow-up campaigns.',
  'LC - Premium Triggers & Actions': 'Enable premium triggers to automate advanced lead routing, tagging, and follow-up actions.',
  'Workflow AI': 'Build automations for missed calls, lead qualification, callback sequences, and follow-up tasks.',
  'Content AI': 'Generate scripts, responses, and campaign copy that align with your brand voice.',
  'Custom Menu Links': 'Design navigation shortcuts for the tools your team uses most often.',
  Stripe: 'Connect Stripe securely to collect deposits or payments directly from booking workflows.',
  'API Keys': 'Manage external API credentials for connected services and automations.',
  Affiliate: 'Set partner links and commissions so referrals can be tracked from call to closed sale.',
  Compliance: 'Configure recording consent, data retention, and policy notes for legal-safe communication.',
  Launchpad: 'Run final checks and publish your workflow stack when your onboarding is complete.',
  'Audit Logs': 'Review account activity to track changes, access, and security events.',
  Overview: 'Track call volume, booking trends, and make sure your AI receptionist is handling inbound leads correctly.',
};

const Dashboard: React.FC<DashboardProps> = ({ onBackToHome, onLogout, user }) => {
  const [activeTab, setActiveTab] = useState('My Profile');
  const [realCalls, setRealCalls] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCall, setSelectedCall] = useState<any | null>(null);
  const [filter, setFilter] = useState<'All' | 'Booked' | 'Interested' | 'Follow-up'>('All');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const loadData = async () => {
    if (!user) return;
    setIsLoading(true);
    const { data } = await fetchCallLogs(user.id);
    if (data) setRealCalls(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [user]);

  const displayCalls = useMemo(() => {
    const combined = [...realCalls];
    if (filter === 'All') return combined.length > 0 ? combined : MOCK_CALLS;
    return combined.filter(c => c.status === filter);
  }, [realCalls, filter]);

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#1f2737] text-white border-r border-slate-800">
      <div className="p-4 border-b border-slate-800">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center justify-center bg-white px-3 py-1.5 rounded-sm mb-3"
        >
          <Logo className="w-4 h-4 text-indigo-700" />
          <span className="ml-1 text-[10px] font-bold text-slate-900">Agency</span>
        </button>
        <button className="w-full flex items-center justify-between rounded-md bg-[#313c50] px-3 py-2 text-xs font-semibold text-slate-100">
          <span>Click here to switch</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-300" />
        </button>
        <button
          onClick={onBackToHome}
          className="mt-3 inline-flex items-center gap-1 rounded-sm bg-[#2d3748] px-2.5 py-1 text-xs font-semibold text-white hover:bg-[#37445a]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Go Back
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-3">
        <div className="px-3 mb-2">
          <p className="text-white text-xl font-semibold mb-2">Settings</p>
          {workflowTabs.slice(0, 3).map((label) => (
            <button
              key={label}
              onClick={() => setActiveTab(label)}
              className={`w-full text-left px-2.5 py-1.5 text-sm rounded-sm transition-colors ${
                activeTab === label ? 'bg-[#313c50] text-white' : 'text-slate-200 hover:bg-[#2b3547]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mb-2">
          <div className="px-3 py-1 bg-[#161d2a] border-y border-slate-800">
            <p className="text-white text-xl font-semibold">Billing</p>
          </div>
          <div className="px-3 pt-1">
            {workflowTabs.slice(3).map((label) => (
              <button
                key={label}
                onClick={() => setActiveTab(label)}
                className={`w-full text-left px-2.5 py-1.5 text-sm rounded-sm transition-colors ${
                  activeTab === label ? 'bg-[#313c50] text-white' : 'text-slate-200 hover:bg-[#2b3547]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="p-3 border-t border-slate-800">
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center space-x-2 py-2.5 bg-[#313c50] text-slate-200 rounded-md text-xs font-semibold hover:bg-[#3b4860]"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  const activeGuidance = guidanceByTab[activeTab] || guidanceByTab.Overview;

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden">
      <aside className="w-[280px] hidden lg:flex flex-col">
        <SidebarContent />
      </aside>

      <main className="flex-1 overflow-y-auto relative">
        <header className="sticky top-0 bg-white/80 backdrop-blur-xl border-b border-slate-200 z-40 px-10 py-5 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <h1 className="text-xl font-black uppercase italic tracking-tighter text-slate-950">{activeTab}</h1>
            <button onClick={loadData} className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-black italic tracking-tighter uppercase">{user?.email?.split('@')[0] || 'Admin'}</p>
              <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest">{user?.email}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl border-2 border-white shadow-lg overflow-hidden bg-slate-200">
              <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.email}`} alt="User" />
            </div>
          </div>
        </header>

        <div className="p-10 max-w-7xl mx-auto space-y-10">
          <section className="goh-card p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <h2 className="text-2xl font-black tracking-tight text-slate-900">{activeTab} Setup Guide</h2>
              <button className="goh-action-btn px-4 py-2 rounded-xl text-sm font-semibold">
                Skip This Step
              </button>
            </div>
            <p className="text-slate-600 mb-5">{activeGuidance}</p>
            <div className="goh-guidance p-4 flex flex-wrap items-center justify-between gap-3">
              <span className="text-sm font-semibold">
                This section helps you build an end-to-end workflow from account creation to live calls and follow-up automation.
              </span>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors">
                Continue Setup
              </button>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['Create Account', 'Connect Calling', 'Activate Workflow'].map((title, idx) => (
              <div key={title} className="goh-soft-card p-5">
                <p className="text-[11px] uppercase tracking-widest text-indigo-600 font-bold mb-2">Step {idx + 1}</p>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-600 mb-4">
                  {idx === 0 && 'Register your workspace and assign your first admin to manage settings and permissions.'}
                  {idx === 1 && 'Attach your business number so the AI receptionist can answer and route calls automatically.'}
                  {idx === 2 && 'Turn on automations for reminders, missed-call callbacks, and lead nurturing messages.'}
                </p>
                <div className="flex items-center justify-between">
                  <button className="text-indigo-700 font-semibold text-sm inline-flex items-center gap-1 hover:text-indigo-800">
                    Open Step <ArrowRight className="w-4 h-4" />
                  </button>
                  <button className="text-slate-500 text-sm hover:text-slate-700">Skip</button>
                </div>
              </div>
            ))}
          </section>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 goh-card p-10">
              <h3 className="text-2xl font-black text-slate-950 italic tracking-tighter uppercase mb-8">AI Booking Trend</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                    <Tooltip contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 10px 20px rgba(0,0,0,0.1)'}} />
                    <Area type="monotone" dataKey="calls" stroke="#6366f1" strokeWidth={4} fill="url(#colorCalls)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-slate-950 p-10 rounded-[2.5rem] text-white flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-8">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-red-400">Live Status</span>
                </div>
                <h4 className="font-black text-xl italic tracking-tighter uppercase mb-2">Automated Reception</h4>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-10">Monitoring incoming traffic</p>
                <Waveform isActive={true} colorClass="from-indigo-400 to-purple-500" />
              </div>
              <div className="space-y-2">
                <button className="w-full py-4 bg-white text-slate-950 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-[1.02] transition-all italic">
                  View All Calls
                </button>
                <button className="w-full py-3 bg-slate-900 border border-slate-700 text-slate-300 rounded-2xl font-semibold text-sm hover:bg-slate-800 transition-colors">
                  Skip Live Preview
                </button>
              </div>
            </div>
          </div>

          <div className="goh-card overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
              <h3 className="text-2xl font-black text-slate-950 italic tracking-tighter uppercase">Supabase Call Database</h3>
              <div className="flex space-x-2">
                {['All', 'Booked', 'Interested'].map(f => (
                  <button 
                    key={f}
                    onClick={() => setFilter(f as any)}
                    className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${filter === f ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-200 text-slate-400'}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div className="px-8 py-4 border-b border-slate-100 bg-slate-50/70 flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm text-slate-600">
                Open any call to review transcript quality, booking intent, and how your workflow moved the lead.
              </p>
              <button className="goh-action-btn px-3 py-1.5 rounded-lg text-sm font-medium">Skip Call Review</button>
            </div>
            <div className="divide-y divide-slate-50">
              {displayCalls.map((call: any) => (
                <div 
                  key={call.id} 
                  onClick={() => setSelectedCall(call)}
                  className="p-8 hover:bg-slate-50 transition-all flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center space-x-6">
                    <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-black text-lg text-slate-950 italic">{call.phone_number || call.phoneNumber}</p>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{call.industry} • {call.created_at ? new Date(call.created_at).toLocaleTimeString() : call.timestamp}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${call.status === 'Booked' ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-100 text-indigo-700'}`}>
                    {call.status}
                  </span>
                </div>
              ))}
              {displayCalls.length === 0 && (
                <div className="p-20 text-center text-slate-300 font-black uppercase tracking-widest text-sm">
                  No Voice Records Found
                </div>
              )}
            </div>
          </div>

          <section className="goh-card p-6 md:p-8">
            <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
              <h3 className="text-xl font-bold text-slate-900">Useful Workflow Components</h3>
              <button className="goh-action-btn px-3 py-2 rounded-lg text-sm font-medium">Skip Components</button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                ['Form Builder', 'Capture caller and lead information before routing.'],
                ['Pipeline', 'Track each lead from first call to payment.'],
                ['Automation', 'Send SMS/email reminders based on call outcome.'],
                ['Reporting', 'Measure conversions and optimize your scripts.'],
              ].map(([title, desc]) => (
                <button
                  key={title}
                  className="text-left goh-soft-card p-4 hover:border-indigo-300 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-slate-900">{title}</span>
                    <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                  </div>
                  <p className="text-sm text-slate-600">{desc}</p>
                </button>
              ))}
            </div>
          </section>
        </div>

        {selectedCall && (
          <ConversationModal 
            call={{
              id: selectedCall.id,
              phoneNumber: selectedCall.phone_number || selectedCall.phoneNumber,
              duration: selectedCall.duration,
              status: selectedCall.status,
              timestamp: selectedCall.created_at ? new Date(selectedCall.created_at).toLocaleString() : selectedCall.timestamp,
              industry: selectedCall.industry,
              transcript: selectedCall.transcript || selectedCall.transcript_json || []
            }} 
            onClose={() => setSelectedCall(null)} 
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
