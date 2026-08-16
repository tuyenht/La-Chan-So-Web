import React from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Search, 
  MessageSquareWarning, 
  CreditCard, 
  Flame, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Scan, 
  Sparkles, 
  Lock, 
  Globe2, 
  Smartphone,
  ChevronRight,
  Camera,
  Upload,
  PhoneCall,
  Volume2,
  PhoneForwarded,
  LifeBuoy,
  Users,
  MapPin,
  Heart,
  QrCode,
  Activity,
  AlertTriangle
} from 'lucide-react';
import { HOT_ALERTS, EMERGENCY_CONTACTS } from '../data/mockData';
import { TabType, ScannerSubTab, ScamAlert, ElderSettings } from '../types';

interface DashboardViewProps {
  settings: ElderSettings;
  onNavigateTab: (tab: TabType) => void;
  onOpenScannerWithSubTab: (subTab: ScannerSubTab) => void;
  onOpenQuickScan: () => void;
  onSelectAlert: (alert: ScamAlert) => void;
  onOpenBankFreeze: () => void;
  onOpenPocketCard: () => void;
  onOpenFamilyGuardian: () => void;
  onOpenThreatMap: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  settings,
  onNavigateTab,
  onOpenScannerWithSubTab,
  onOpenQuickScan,
  onSelectAlert,
  onOpenBankFreeze,
  onOpenPocketCard,
  onOpenFamilyGuardian,
  onOpenThreatMap
}) => {
  return (
    <div className={`p-4 space-y-4 pb-24 ${settings.isElderMode ? 'text-base' : 'text-sm'}`}>
      
      {/* ------------------------------------------------------------- */}
      {/* 1. HERO SECURITY SHIELD METER & INSTANT HEALTH                */}
      {/* ------------------------------------------------------------- */}
      <section aria-label="Security Status" className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border-2 border-cyan-500/30 p-4 shadow-xl">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Animated Shield Meter */}
          <div className="relative my-2 flex items-center justify-center">
            <div className="absolute w-28 h-28 rounded-full border border-cyan-500/20 animate-ping" style={{ animationDuration: '3s' }} />
            <div className="absolute w-24 h-24 rounded-full border border-emerald-500/30" />
            
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyan-600 via-teal-500 to-emerald-400 p-[2px] shadow-lg shadow-cyan-500/25">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex flex-col items-center justify-center">
                <ShieldCheck className="w-8 h-8 text-emerald-400" />
                <span className="text-xs font-bold text-slate-100 mt-0.5">96/100</span>
              </div>
            </div>
          </div>

          <div className="mt-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Lá Chắn Đang Bảo Vệ Bạn
            </span>
            <h2 className="text-base font-black text-white mt-1">Hệ Thống An Toàn Quốc Gia 24/7</h2>
            <p className="text-xs text-slate-400 max-w-xs mt-0.5">
              Tự động giám sát cuộc gọi, mã QR, SMS & file APK lạ
            </p>
          </div>

          {/* Top 2 Primary Action Buttons */}
          <div className="w-full mt-4 grid grid-cols-2 gap-2">
            <button
              onClick={() => onOpenScannerWithSubTab('image')}
              className="py-3 px-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 font-black text-xs tracking-wide flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-500/20 active:scale-[0.98] transition-all"
            >
              <Camera className="w-4 h-4" />
              <span>SOI ẢNH / BILL GIẢ</span>
            </button>

            <button
              onClick={onOpenQuickScan}
              className="py-3 px-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-xs tracking-wide flex items-center justify-center gap-1.5 border border-slate-700 active:scale-[0.98] transition-all"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>QUÉT TOÀN DIỆN</span>
            </button>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. EMERGENCY RED STRIP: 1-TAP BANK FREEZE & POCKET CARD        */}
      {/* ------------------------------------------------------------- */}
      <section aria-label="Quick Lifelines" className="grid grid-cols-2 gap-2">
        <button
          onClick={onOpenBankFreeze}
          className="p-3 rounded-2xl bg-gradient-to-br from-rose-950 via-rose-900 to-slate-950 border border-rose-500/50 hover:border-rose-400 text-left active:scale-95 transition-all shadow-md shadow-rose-950/40 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/30">
              <Lock className="w-4 h-4 animate-pulse" />
            </div>
            <span className="text-[9px] bg-rose-500 text-white font-black px-1.5 py-0.5 rounded">
              SOS KHẨN
            </span>
          </div>
          <div className="mt-2">
            <h3 className="text-xs font-black text-white leading-tight">Khóa Thẻ 1 Chạm</h3>
            <p className="text-[10px] text-rose-300/80 mt-0.5">Cú pháp & Hotline 16 ngân hàng</p>
          </div>
        </button>

        <button
          onClick={onOpenPocketCard}
          className="p-3 rounded-2xl bg-gradient-to-br from-cyan-950 via-slate-900 to-slate-950 border border-cyan-500/50 hover:border-cyan-400 text-left active:scale-95 transition-all shadow-md shadow-cyan-950/40 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
              <Heart className="w-4 h-4 text-rose-400 fill-rose-400/30" />
            </div>
            <span className="text-[9px] bg-cyan-500 text-slate-950 font-black px-1.5 py-0.5 rounded">
              ÔNG BÀ
            </span>
          </div>
          <div className="mt-2">
            <h3 className="text-xs font-black text-white leading-tight">Thẻ An Toàn Bỏ Túi</h3>
            <p className="text-[10px] text-cyan-300/80 mt-0.5">6 lời dặn cốt lõi có đọc to</p>
          </div>
        </button>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3. INNOVATIVE PILLARS: GUARDIAN NETWORK & THREAT MAP          */}
      {/* ------------------------------------------------------------- */}
      <section aria-label="Advanced Shields" className="grid grid-cols-2 gap-2">
        <button
          onClick={onOpenFamilyGuardian}
          className="p-3 rounded-2xl bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 border border-emerald-500/40 hover:border-emerald-400 text-left active:scale-95 transition-all shadow-md flex items-center gap-2.5"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white">Vòng Tròn Gia Đình</h3>
            <p className="text-[10px] text-slate-400 leading-tight mt-0.5">Báo động đẩy tới con cháu</p>
          </div>
        </button>

        <button
          onClick={onOpenThreatMap}
          className="p-3 rounded-2xl bg-gradient-to-br from-purple-950 via-slate-900 to-slate-950 border border-purple-500/40 hover:border-purple-400 text-left active:scale-95 transition-all shadow-md flex items-center gap-2.5"
        >
          <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white">Bản Đồ 63 Tỉnh</h3>
            <p className="text-[10px] text-slate-400 leading-tight mt-0.5">Điểm nóng an ninh mạng</p>
          </div>
        </button>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. CORE FRAUD PREVENTION TOOLS                                */}
      {/* ------------------------------------------------------------- */}
      <section aria-label="Core Tools" className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Công Cụ Thẩm Định & Ngăn Chặn (AI)
          </h2>
          <button 
            onClick={() => onNavigateTab('scanner')}
            className="text-[11px] text-cyan-400 hover:underline flex items-center gap-0.5"
          >
            Mở toàn bộ <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* Featured Deepfake Lab Promo */}
        <div
          onClick={() => onOpenScannerWithSubTab('deepfake_lab')}
          className="cursor-pointer p-3.5 rounded-2xl bg-gradient-to-r from-purple-950/70 via-slate-900 to-slate-900 border border-purple-500/40 hover:border-purple-400 active:scale-[0.99] transition-all shadow-lg flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Activity className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-xs font-bold text-white">Phòng Giám Định Pháp Y Deepfake AI</h3>
                <span className="text-[9px] bg-purple-500 text-white font-bold px-1.5 rounded">MỚI</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Phân tích độ lệch phổ âm thanh, chớp mắt và khẩu hình môi
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-purple-400" />
        </div>

        {/* Grid Tools */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {/* Tool 1: QR Check */}
          <div
            onClick={() => onOpenScannerWithSubTab('qr')}
            className="cursor-pointer group p-3 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-teal-500/50 active:scale-95 transition-all shadow-md flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                <QrCode className="w-4 h-4" />
              </div>
              <span className="text-[9px] font-semibold text-teal-400 bg-teal-500/10 px-1.5 py-0.2 rounded">
                VietQR
              </span>
            </div>
            <div className="mt-2">
              <h3 className="text-xs font-bold text-slate-100 group-hover:text-teal-300">Soi Mã QR VietQR</h3>
              <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">Chống mã QR dán đè</p>
            </div>
          </div>

          {/* Tool 2: Phone Lookup */}
          <div
            onClick={() => onOpenScannerWithSubTab('phone_lookup')}
            className="cursor-pointer group p-3 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 active:scale-95 transition-all shadow-md flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <PhoneForwarded className="w-4 h-4" />
              </div>
              <span className="text-[9px] font-semibold text-amber-400 bg-amber-500/10 px-1.5 py-0.2 rounded">
                Wangiri
              </span>
            </div>
            <div className="mt-2">
              <h3 className="text-xs font-bold text-slate-100 group-hover:text-amber-300">Tra Cứu Đầu Số SĐT</h3>
              <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">Chống nháy máy trừ tiền</p>
            </div>
          </div>

          {/* Tool 3: Call Screener */}
          <div
            onClick={() => onOpenScannerWithSubTab('call')}
            className="cursor-pointer group p-3 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-rose-500/50 active:scale-95 transition-all shadow-md flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                <PhoneCall className="w-4 h-4" />
              </div>
              <span className="text-[9px] font-semibold text-rose-400 bg-rose-500/10 px-1.5 py-0.2 rounded">
                Dọa Bắt
              </span>
            </div>
            <div className="mt-2">
              <h3 className="text-xs font-bold text-slate-100 group-hover:text-rose-300">Soi Cuộc Gọi Lạ</h3>
              <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">Kịch bản giả Công An</p>
            </div>
          </div>

          {/* Tool 4: Bank Account */}
          <div
            onClick={() => onOpenScannerWithSubTab('bank')}
            className="cursor-pointer group p-3 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 active:scale-95 transition-all shadow-md flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <CreditCard className="w-4 h-4" />
              </div>
              <span className="text-[9px] font-semibold text-cyan-400 bg-cyan-500/10 px-1.5 py-0.2 rounded">
                Sổ Đen
              </span>
            </div>
            <div className="mt-2">
              <h3 className="text-xs font-bold text-slate-100 group-hover:text-cyan-300">Tra STK Ngân Hàng</h3>
              <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">Check tài khoản rác</p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 5. HOT SCAM ALERTS (BỘ CÔNG AN & NCSC)                         */}
      {/* ------------------------------------------------------------- */}
      <section aria-label="Hot Alerts" className="space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-rose-400 animate-bounce" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Cảnh Báo Nóng Bộ Công An & NCSC
            </h2>
          </div>
          <button
            onClick={() => onNavigateTab('alerts')}
            className="text-[11px] text-cyan-400 hover:underline"
          >
            Xem tất cả (30+)
          </button>
        </div>

        <div className="space-y-2">
          {HOT_ALERTS.slice(0, 2).map((alert) => (
            <div
              key={alert.id}
              onClick={() => onSelectAlert(alert)}
              className="cursor-pointer p-3 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-900/60 border border-slate-800 hover:border-slate-700 active:scale-[0.99] transition-all flex items-start gap-3"
            >
              <div className="w-2 h-2 rounded-full bg-rose-500 mt-1.5 shrink-0 animate-ping" />
              <div className="flex-1">
                <div className="flex items-center justify-between text-[10px] text-slate-400 mb-0.5">
                  <span className="font-semibold text-rose-400 bg-rose-500/10 px-1.5 py-0.2 rounded">
                    {alert.riskLevel.toUpperCase()}
                  </span>
                  <span>{alert.date}</span>
                </div>
                <h3 className="text-xs font-bold text-slate-100 line-clamp-1">
                  {alert.title}
                </h3>
                <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">
                  {alert.summary}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 6. EMERGENCY HOTLINES (1800 6666 & 113)                       */}
      {/* ------------------------------------------------------------- */}
      <section aria-label="Emergency" className="p-3.5 rounded-2xl bg-gradient-to-r from-rose-950/40 via-slate-900 to-slate-950 border border-rose-500/30 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LifeBuoy className="w-4 h-4 text-rose-400" />
            <h2 className="text-xs font-bold text-white">Đường Dây Nóng Khẩn Cấp (24/7)</h2>
          </div>
          <span className="text-[10px] text-emerald-400 font-semibold">Miễn cước gọi</span>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <a
            href="tel:18006666"
            className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-left flex items-center justify-between"
          >
            <div>
              <span className="text-[10px] text-slate-400 block font-semibold">Tổng đài NCSC</span>
              <strong className="text-sm font-black text-cyan-400">1800 6666</strong>
            </div>
            <PhoneForwarded className="w-4 h-4 text-cyan-400" />
          </a>

          <a
            href="tel:113"
            className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-left flex items-center justify-between"
          >
            <div>
              <span className="text-[10px] text-slate-400 block font-semibold">Cảnh Sát 113</span>
              <strong className="text-sm font-black text-rose-400">113</strong>
            </div>
            <PhoneForwarded className="w-4 h-4 text-rose-400" />
          </a>
        </div>
      </section>
    </div>
  );
};
