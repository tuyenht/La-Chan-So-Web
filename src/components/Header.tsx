import React from 'react';
import { ShieldCheck, PhoneCall, Bell, Sparkles, Settings, Eye, Volume2 } from 'lucide-react';
import { TabType, ElderSettings } from '../types';

interface HeaderProps {
  activeTab: TabType;
  settings: ElderSettings;
  onNavigateTab: (tab: TabType) => void;
  onOpenQuickScan: () => void;
  onToggleElderMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  activeTab, 
  settings,
  onNavigateTab,
  onOpenQuickScan,
  onToggleElderMode
}) => {
  return (
    <header className="sticky top-0 z-20 bg-slate-950/95 backdrop-blur-md px-4 py-2.5 border-b border-slate-800/80 flex items-center justify-between">
      {/* Brand Identity */}
      <div className="flex items-center gap-2.5">
        <div 
          onClick={() => onNavigateTab('dashboard')}
          className="cursor-pointer relative w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-teal-500 to-emerald-400 p-[1px] shadow-lg shadow-cyan-500/20 active:scale-95 transition-transform"
        >
          <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
          </div>
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-950" />
        </div>

        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="text-sm font-bold tracking-tight text-white flex items-center">
              LÁ CHẮN SỐ
            </h1>
            <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.2 rounded">
              PRO
            </span>
          </div>
          <p className="text-[11px] text-slate-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Giám sát SMS, Zalo & Cuộc gọi
          </p>
        </div>
      </div>

      {/* Action shortcuts */}
      <div className="flex items-center gap-1.5">
        {/* Elder Mode Toggle Button */}
        <button
          onClick={onToggleElderMode}
          className={`flex items-center gap-1 px-2 py-1.5 rounded-xl border text-xs font-bold transition-all ${
            settings.isElderMode
              ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/20'
              : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
          }`}
          title="Bật/tắt chế độ người cao tuổi (chữ to)"
        >
          <Eye className="w-3.5 h-3.5" />
          <span className="text-[11px]">{settings.isElderMode ? 'Chữ To' : 'Chuẩn'}</span>
        </button>

        {/* Quick scan trigger */}
        <button
          onClick={onOpenQuickScan}
          className="p-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 active:scale-95 transition-all shadow-sm"
          title="Quét bảo mật nhanh"
        >
          <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
        </button>

        {/* Settings button */}
        <button
          onClick={() => onNavigateTab('settings')}
          className={`p-2 rounded-xl border active:scale-95 transition-all ${
            activeTab === 'settings'
              ? 'bg-slate-800 text-cyan-400 border-cyan-500/40'
              : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border-slate-800'
          }`}
          title="Cài đặt giám sát tự động"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
