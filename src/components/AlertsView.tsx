import React, { useState } from 'react';
import { 
  Flame, 
  Search, 
  ShieldAlert, 
  ChevronRight, 
  X, 
  Volume2, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle,
  Send,
  Filter
} from 'lucide-react';
import { HOT_ALERTS } from '../data/mockData';
import { ScamAlert, ElderSettings } from '../types';

interface AlertsViewProps {
  selectedAlert: ScamAlert | null;
  settings?: ElderSettings;
  onClearSelectedAlert: () => void;
  onSelectAlert?: (alert: ScamAlert) => void;
}

export const AlertsView: React.FC<AlertsViewProps> = ({
  selectedAlert,
  settings,
  onClearSelectedAlert,
  onSelectAlert
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'vi-VN';
      u.rate = 0.9;
      window.speechSynthesis.speak(u);
    }
  };

  const filteredAlerts = HOT_ALERTS.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          alert.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          alert.source.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeCategoryFilter === 'all') return matchesSearch;
    if (activeCategoryFilter === 'deepfake') return matchesSearch && (alert.category === 'deepfake' || alert.category === 'vneid');
    if (activeCategoryFilter === 'finance') return matchesSearch && (alert.category === 'job_scam' || alert.category === 'crypto_scam' || alert.category === 'fake_bank');
    if (activeCategoryFilter === 'psychology') return matchesSearch && (alert.category === 'emergency_kid' || alert.category === 'gift_trap' || alert.category === 'other');
    return matchesSearch;
  });

  return (
    <div className={`p-4 space-y-4 pb-24 ${settings?.isElderMode ? 'text-base' : 'text-sm'}`}>
      {/* ------------------------------------------------------------- */}
      {/* 1. SEARCH & CATEGORY FILTER TABS                              */}
      {/* ------------------------------------------------------------- */}
      <div className="space-y-2">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm thủ đoạn: VNeID, Fake bill, Con cấp cứu, CTV..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-rose-500 shadow-inner"
          />
        </div>

        {/* Categories Bar */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          <button
            onClick={() => setActiveCategoryFilter('all')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
              activeCategoryFilter === 'all'
                ? 'bg-rose-500 text-white shadow-md'
                : 'bg-slate-900 text-slate-400 border border-slate-800'
            }`}
          >
            Tất cả (30+)
          </button>
          <button
            onClick={() => setActiveCategoryFilter('deepfake')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
              activeCategoryFilter === 'deepfake'
                ? 'bg-rose-500 text-white shadow-md'
                : 'bg-slate-900 text-slate-400 border border-slate-800'
            }`}
          >
            Công nghệ cao & Giả Công An
          </button>
          <button
            onClick={() => setActiveCategoryFilter('finance')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
              activeCategoryFilter === 'finance'
                ? 'bg-rose-500 text-white shadow-md'
                : 'bg-slate-900 text-slate-400 border border-slate-800'
            }`}
          >
            Đầu tư & Tuyển CTV Shopee
          </button>
          <button
            onClick={() => setActiveCategoryFilter('psychology')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
              activeCategoryFilter === 'psychology'
                ? 'bg-rose-500 text-white shadow-md'
                : 'bg-slate-900 text-slate-400 border border-slate-800'
            }`}
          >
            Con cấp cứu & Bẫy tình cảm
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. SELECTED ALERT DETAIL POPUP / CARD                         */}
      {/* ------------------------------------------------------------- */}
      {selectedAlert ? (
        <div className="p-4 rounded-3xl bg-gradient-to-b from-rose-950/60 via-slate-900 to-slate-950 border-2 border-rose-500 shadow-2xl space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded-full bg-rose-500 text-slate-950 font-black text-[10px] tracking-wider uppercase">
              CẢNH BÁO BỘ CÔNG AN
            </span>
            <button
              onClick={onClearSelectedAlert}
              className="p-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div>
            <h2 className="text-base font-black text-white leading-tight">
              {selectedAlert.title}
            </h2>
            <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
              <span>Nguồn: {selectedAlert.source}</span>
              <span>{selectedAlert.reportedCount} người đã báo cáo</span>
            </div>
          </div>

          {/* Elder voice read button */}
          <button
            onClick={() => speak(`${selectedAlert.title}. ${selectedAlert.summary}. Lời khuyên: ${selectedAlert.recommendation}`)}
            className="w-full py-2 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 text-xs font-bold flex items-center justify-center gap-2"
          >
            <Volume2 className="w-4 h-4 text-cyan-400" />
            <span>Đọc to cảnh báo này cho người già nghe</span>
          </button>

          {/* Summary Box */}
          <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 leading-relaxed">
            {selectedAlert.summary}
          </div>

          {/* Tactics */}
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-rose-300">Thủ đoạn đối tượng thực hiện:</span>
            <ul className="space-y-1">
              {selectedAlert.tactics.map((t, idx) => (
                <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommendation */}
          <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 space-y-1">
            <span className="text-xs font-bold text-emerald-300">Biện pháp phòng ngừa chuẩn:</span>
            <p className="text-xs text-emerald-200 font-semibold leading-relaxed">
              {selectedAlert.recommendation}
            </p>
          </div>

          <button
            onClick={onClearSelectedAlert}
            className="w-full py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs"
          >
            Đóng Chi Tiết
          </button>
        </div>
      ) : (
        /* ------------------------------------------------------------- */
        /* 3. ALERTS LIST                                                */
        /* ------------------------------------------------------------- */
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>Tìm thấy {filteredAlerts.length} thủ đoạn</span>
            <span>Cập nhật liên tục từ NCSC</span>
          </div>

          {filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              onClick={() => onSelectAlert ? onSelectAlert(alert) : null}
              className="cursor-pointer p-3.5 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-900/70 border border-slate-800 hover:border-rose-500/50 active:scale-[0.99] transition-all flex items-start gap-3 shadow-md"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500 mt-1.5 shrink-0 animate-pulse" />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full">
                    {alert.riskLevel.toUpperCase()}
                  </span>
                  <span className="text-slate-400">{alert.source}</span>
                </div>
                <h3 className="text-xs font-bold text-white line-clamp-1">
                  {alert.title}
                </h3>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {alert.summary}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500 shrink-0 mt-3" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
