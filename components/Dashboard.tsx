
import React, { useState, useMemo, useEffect } from 'react';
import { 
  LayoutDashboard, Users, Calendar, Phone, Mail, 
  MessageSquare, Settings, Search, Bell, Plus,
  TrendingUp, CheckCircle2, AlertCircle, Clock,
  MoreVertical, Download, ExternalLink, Play, Menu, X, LogOut, RefreshCw
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MOCK_CALLS } from '../constants';
import Waveform from './Waveform';
import ConversationModal from './ConversationModal';
import { CallLog } from '../types';
import Logo from './Logo';
import { supabase, fetchCallLogs } from '../services/supabaseService';

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

const Dashboard: React.FC<DashboardProps> = ({ onBackToHome, onLogout, user }) => {
  const [activeTab, setActiveTab] = useState('Overview');
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
    <div className="flex flex-col h-full bg-slate-950 text-white">
      <div className="p-8 flex items-center justify-between">
        <button 
          onClick={onBackToHome}
          className="flex items-center space-x-3 group cursor-pointer"
        >
          <div className="p-1.5 bg-indigo-600 rounded-lg">
            <Logo className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-black italic tracking-tighter uppercase">AIWave</span>
        </button>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {['Overview', 'Clients', 'Appointments', 'Calls', 'Campaigns'].map((label) => (
          <button
            key={label}
            onClick={() => setActiveTab(label)}
            className={`w-full flex items-center space-x-3 px-5 py-4 rounded-2xl transition-all font-bold text-sm uppercase tracking-widest ${
              activeTab === label ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:bg-slate-900'
            }`}
          >
            <span className="capitalize">{label}</span>
          </button>
        ))}
      </nav>

      <div className="p-6">
        <button 
          onClick={onLogout}
          className="w-full flex items-center justify-center space-x-2 py-3 bg-white/5 text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/10"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden">
      <aside className="w-72 hidden lg:flex flex-col">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
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
              <button className="w-full py-5 bg-white text-slate-950 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-[1.02] transition-all italic">
                View All Calls
              </button>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm">
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
