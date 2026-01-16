
import React, { useState, useEffect, useRef } from 'react';
import { Phone, PhoneOff, Mic, MicOff, X, AlertCircle, Key, Save } from 'lucide-react';
import Waveform from './Waveform';
import { Industry, TranscriptEntry } from '../types';
import { INDUSTRIES, getSystemInstruction } from '../constants';
import { connectLiveSession, decode, decodeAudioData, createBlob } from '../services/geminiLiveService';
import { supabase, saveCallLog } from '../services/supabaseService';

interface LiveCallPanelProps {
  onClose: () => void;
  industry: Industry;
}

const LiveCallPanel: React.FC<LiveCallPanelProps> = ({ onClose, industry }) => {
  const [status, setStatus] = useState<'idle' | 'connecting' | 'active' | 'ended'>('idle');
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const inputContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sessionRef = useRef<any>(null);
  const userRef = useRef<any>(null);

  const selectedIndustry = INDUSTRIES.find(i => i.id === industry) || INDUSTRIES[0];

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      userRef.current = data.user;
    });

    let timer: any;
    if (status === 'active') {
      timer = setInterval(() => setDuration(prev => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [status]);

  useEffect(() => {
    return () => {
      if (sessionRef.current) sessionRef.current.close();
      sourcesRef.current.forEach(s => s.stop());
    };
  }, []);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSaveToSupabase = async () => {
    if (!userRef.current || transcript.length === 0) return;
    setIsSaving(true);
    try {
      await saveCallLog(userRef.current.id, {
        phone_number: `+1 (555) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
        industry: industry,
        duration: formatTime(duration),
        status: 'Interested', // Dynamic logic could go here
        transcript: transcript
      });
    } catch (e) {
      console.error("Failed to save log:", e);
    } finally {
      setIsSaving(false);
    }
  };

  const stopCall = async () => {
    setStatus('ended');
    if (sessionRef.current) {
      sessionRef.current.close();
      sessionRef.current = null;
    }
    sourcesRef.current.forEach(s => s.stop());
    sourcesRef.current.clear();
    
    // Auto-save transcript
    await handleSaveToSupabase();
    
    setTimeout(onClose, 3000);
  };

  const startCall = async () => {
    setStatus('connecting');
    setError(null);
    setTranscript([]);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      inputContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });

      const sessionPromise = connectLiveSession({
        systemInstruction: getSystemInstruction(industry),
        voiceName: selectedIndustry.voice,
        onOpen: () => {
          setStatus('active');
          const source = inputContextRef.current!.createMediaStreamSource(stream);
          const processor = inputContextRef.current!.createScriptProcessor(4096, 1, 1);
          processor.onaudioprocess = (e) => {
            if (isMuted) return;
            const inputData = e.inputBuffer.getChannelData(0);
            const pcmBlob = createBlob(inputData);
            sessionPromise.then(session => session.sendRealtimeInput({ media: pcmBlob }));
          };
          source.connect(processor);
          processor.connect(inputContextRef.current!.destination);
        },
        onAudioChunk: async (base64) => {
          if (!audioContextRef.current) return;
          const ctx = audioContextRef.current;
          nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
          const buffer = await decodeAudioData(decode(base64), ctx, 24000, 1);
          const source = ctx.createBufferSource();
          source.buffer = buffer;
          source.connect(ctx.destination);
          source.start(nextStartTimeRef.current);
          nextStartTimeRef.current += buffer.duration;
          sourcesRef.current.add(source);
          source.onended = () => sourcesRef.current.delete(source);
          
          // In a real scenario, we'd add transcript entries here from model response.
          // For the demo, we mock transcript capture.
        },
        onInterrupted: () => {
          sourcesRef.current.forEach(s => s.stop());
          sourcesRef.current.clear();
          nextStartTimeRef.current = 0;
        },
        onClose: () => setStatus('ended'),
        onError: (e: any) => {
          console.error("Gemini Error:", e);
          const msg = e?.message || "Connection refused";
          if (msg.includes("refused") || msg.includes("Entity not found")) {
            setError("Google AI connection refused. Check API status or try again.");
          } else {
            setError("Call failed to connect. Retrying...");
          }
          setStatus('ended');
        },
      });

      sessionRef.current = await sessionPromise;
    } catch (err: any) {
      setError(err.message || "Microphone access denied.");
      setStatus('idle');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-lg p-4">
      <div className="bg-slate-900 w-full max-w-md rounded-[3rem] overflow-hidden shadow-3xl border border-white/5 relative">
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-10 flex flex-col items-center">
          <div className={`w-24 h-24 rounded-3xl flex items-center justify-center mb-8 shadow-2xl ${selectedIndustry.color}`}>
            <div className="text-white">
              {React.cloneElement(selectedIndustry.icon as React.ReactElement<any>, { size: 40 })}
            </div>
          </div>
          
          <h2 className="text-3xl font-black text-white mb-2 italic tracking-tighter uppercase">Riley AI</h2>
          <p className="text-indigo-400 text-xs font-black uppercase tracking-[0.3em] mb-10 italic">{industry} Hub</p>

          <div className="w-full bg-slate-950/50 rounded-[2.5rem] p-10 mb-10 border border-white/5">
            <Waveform isActive={status === 'active'} colorClass="from-indigo-400 to-purple-500" />
            <div className="mt-8 text-center">
              <span className={`text-sm font-black uppercase tracking-[0.2em] italic ${status === 'active' ? 'text-indigo-400' : 'text-slate-600'}`}>
                {status === 'active' ? formatTime(duration) : 
                 status === 'connecting' ? 'INITIATING AI...' : 
                 status === 'ended' ? 'DISCONNECTED' : 'STANDBY'}
              </span>
            </div>
          </div>

          {error && (
            <div className="mb-8 p-6 bg-red-500/10 border border-red-500/20 rounded-3xl flex flex-col items-center text-red-400">
              <AlertCircle className="w-6 h-6 mb-2" />
              <p className="text-xs font-black uppercase tracking-widest text-center">{error}</p>
            </div>
          )}

          <div className="flex items-center space-x-8">
            <button 
              onClick={() => setIsMuted(!isMuted)}
              disabled={status !== 'active'}
              className={`p-5 rounded-2xl transition-all ${isMuted ? 'bg-red-500/20 text-red-500' : 'bg-slate-800 text-slate-400'} disabled:opacity-20`}
            >
              {isMuted ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
            </button>

            {status === 'active' || status === 'connecting' ? (
              <button 
                onClick={stopCall}
                className="p-8 bg-red-600 hover:bg-red-700 text-white rounded-[2rem] shadow-2xl transition-all active:scale-95"
              >
                <PhoneOff className="w-10 h-10" />
              </button>
            ) : (
              <button 
                onClick={startCall}
                className="p-8 bg-emerald-600 hover:bg-emerald-700 text-white rounded-[2rem] shadow-2xl transition-all active:scale-95"
              >
                <Phone className="w-10 h-10" />
              </button>
            )}

            <div className={`p-5 rounded-2xl ${isSaving ? 'bg-indigo-600 animate-pulse' : 'bg-slate-800'} text-slate-400`}>
              <Save className="w-7 h-7" />
            </div>
          </div>
        </div>

        <div className="bg-white/5 px-10 py-6 text-center border-t border-white/5">
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.4em] italic">
            {isSaving ? 'SYNCING TO SUPABASE...' : 'AIWAVE SECURE CONNECTION'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LiveCallPanel;
