
import React from 'react';
import { X, Phone, User, Bot, Clock, Download, Share2 } from 'lucide-react';
import { CallLog } from '../types';

interface ConversationModalProps {
  call: CallLog;
  onClose: () => void;
}

const ConversationModal: React.FC<ConversationModalProps> = ({ call, onClose }) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-end sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div 
        className="w-full max-w-lg h-full sm:h-[90vh] bg-white sm:rounded-[2.5rem] shadow-2xl flex flex-col animate-in slide-in-from-right duration-500 overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-black text-slate-900">{call.phoneNumber}</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{call.industry} • {call.timestamp}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all active:scale-90"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-3 border-b border-slate-100 text-center py-4 bg-white">
          <div className="border-r border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Duration</p>
            <p className="text-sm font-black text-slate-900">{call.duration}</p>
          </div>
          <div className="border-r border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Status</p>
            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
              call.status === 'Booked' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
            }`}>
              {call.status}
            </span>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Agent</p>
            <p className="text-sm font-black text-slate-900 italic">Riley v2.0</p>
          </div>
        </div>

        {/* Chat / Transcript Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30">
          {call.transcript?.map((entry, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col ${entry.role === 'ai' ? 'items-start' : 'items-end'} animate-in slide-in-from-bottom-2 duration-300`}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-center space-x-2 mb-1 px-1">
                {entry.role === 'ai' ? (
                  <>
                    <Bot className="w-3 h-3 text-indigo-600" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Riley AI</span>
                  </>
                ) : (
                  <>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Client</span>
                    <User className="w-3 h-3 text-slate-600" />
                  </>
                )}
                <span className="text-[9px] text-slate-300">{entry.time}</span>
              </div>
              <div 
                className={`max-w-[85%] px-4 py-3 rounded-[1.5rem] text-sm font-medium shadow-sm transition-all hover:shadow-md ${
                  entry.role === 'ai' 
                    ? 'bg-white text-slate-700 border border-slate-100 rounded-tl-none' 
                    : 'bg-indigo-600 text-white rounded-tr-none'
                }`}
              >
                {entry.text}
              </div>
            </div>
          ))}
          {(!call.transcript || call.transcript.length === 0) && (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
              <Clock className="w-12 h-12 opacity-20" />
              <p className="font-bold text-sm">Transcription processing...</p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-white border-t border-slate-100 flex items-center space-y-4 flex-col sm:flex-row sm:space-y-0 sm:space-x-4">
          <button className="w-full sm:flex-1 py-3 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center hover:bg-slate-800 transition-all active:scale-95 shadow-xl shadow-slate-200">
            <Download className="w-4 h-4 mr-2" /> Download Audio
          </button>
          <button className="w-full sm:w-auto p-3 bg-slate-100 text-slate-600 rounded-2xl hover:bg-slate-200 active:scale-95 transition-all">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConversationModal;
