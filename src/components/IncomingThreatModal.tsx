import React, { useEffect } from 'react';
import { 
  AlertTriangle, 
  PhoneOff, 
  Trash2, 
  Volume2, 
  X, 
  ShieldAlert, 
  CheckCircle2, 
  PhoneCall, 
  MessageSquare, 
  Smartphone,
  ExternalLink
} from 'lucide-react';
import { ElderSettings } from '../types';

export interface ThreatNotificationPayload {
  type: 'sms' | 'zalo' | 'call';
  sender: string;
  phone?: string;
  previewText: string;
  dangerReason: string;
  scamCategory: string;
  spokenAudioText: string;
}

interface IncomingThreatModalProps {
  threat: ThreatNotificationPayload | null;
  settings: ElderSettings;
  onClose: () => void;
  onBlockAndReport: (threat: ThreatNotificationPayload) => void;
}

export const IncomingThreatModal: React.FC<IncomingThreatModalProps> = ({
  threat,
  settings,
  onClose,
  onBlockAndReport
}) => {
  useEffect(() => {
    if (threat && settings.autoReadAloud && 'speechSynthesis' in window) {
      // Cancel previous speech if any
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(threat.spokenAudioText);
      utterance.lang = 'vi-VN';
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  }, [threat, settings.autoReadAloud]);

  if (!threat) return null;

  const playVoice = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(threat.spokenAudioText);
      utterance.lang = 'vi-VN';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-sm rounded-3xl bg-gradient-to-b from-rose-950 via-slate-900 to-slate-950 border-2 border-rose-500 shadow-2xl p-5 text-center space-y-4 overflow-hidden">
        {/* Radar Pulse Effect */}
        <div className="absolute -top-10 -right-10 w-36 h-36 bg-rose-500/20 rounded-full blur-2xl animate-pulse pointer-events-none" />

        {/* Top Badges */}
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-black tracking-wide uppercase">
            <AlertTriangle className="w-4 h-4 text-rose-400 animate-bounce" />
            CẢNH BÁO LỪA ĐẢO TỨC THÌ
          </span>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Big Alert Icon */}
        <div className="mx-auto w-20 h-20 rounded-3xl bg-rose-500/20 border-2 border-rose-500 flex items-center justify-center text-rose-400 shadow-lg shadow-rose-500/30">
          {threat.type === 'call' ? (
            <PhoneCall className="w-10 h-10 animate-pulse text-rose-400" />
          ) : threat.type === 'zalo' ? (
            <Smartphone className="w-10 h-10 animate-bounce text-rose-400" />
          ) : (
            <MessageSquare className="w-10 h-10 text-rose-400" />
          )}
        </div>

        {/* Header Titles */}
        <div>
          <h2 className="text-lg font-black text-white leading-tight">
            {threat.type === 'call' ? 'CUỘC GỌI NGUY HIỂM!' : 'TIN NHẮN LỪA ĐẢO VỪA ĐẾN!'}
          </h2>
          <p className="text-xs font-semibold text-rose-300 mt-1">
            {threat.scamCategory}
          </p>
        </div>

        {/* Intercepted Content Box */}
        <div className="p-3.5 rounded-2xl bg-slate-950/90 border border-rose-500/30 text-left space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-bold text-slate-200">Từ: {threat.sender}</span>
            <span className="text-rose-400 font-bold">RỦI RO CAO</span>
          </div>
          <p className="text-xs text-slate-300 italic line-clamp-3 bg-slate-900/60 p-2 rounded-xl border border-slate-800">
            "{threat.previewText}"
          </p>
          <div className="text-[11px] text-amber-300 flex items-start gap-1.5 pt-1">
            <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-amber-400 mt-0.5" />
            <span>{threat.dangerReason}</span>
          </div>
        </div>

        {/* Voice Play Button */}
        <button
          onClick={playVoice}
          className="w-full py-2.5 px-3 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 text-xs font-bold flex items-center justify-center gap-2"
        >
          <Volume2 className="w-4 h-4 text-cyan-400" />
          <span>Bấm để nghe giọng nói hướng dẫn</span>
        </button>

        {/* Elder-friendly Action Buttons */}
        <div className="space-y-2 pt-1">
          {threat.type === 'call' ? (
            <button
              onClick={onClose}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-black text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-rose-600/30 active:scale-95 transition-all"
            >
              <PhoneOff className="w-5 h-5" />
              <span>CÚP MÁY NGAY LẬP TỨC</span>
            </button>
          ) : (
            <button
              onClick={onClose}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-black text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-rose-600/30 active:scale-95 transition-all"
            >
              <Trash2 className="w-5 h-5" />
              <span>KHÔNG BẤM LINK - XÓA TIN NHẮN</span>
            </button>
          )}

          <button
            onClick={() => onBlockAndReport(threat)}
            className="w-full py-2.5 rounded-xl bg-slate-800/70 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5"
          >
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>Chặn số & Báo cáo lên NCSC</span>
          </button>
        </div>
      </div>
    </div>
  );
};
