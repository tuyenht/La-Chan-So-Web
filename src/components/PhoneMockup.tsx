import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Wifi, 
  Battery, 
  Signal, 
  Sparkles, 
  Monitor, 
  Smartphone,
  ExternalLink,
  Info
} from 'lucide-react';

interface PhoneMockupProps {
  children: React.ReactNode;
  activeTabTitle?: string;
  onQuickScan?: () => void;
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({ 
  children,
  activeTabTitle = 'Lá Chắn Số',
}) => {
  const [currentTime, setCurrentTime] = useState<string>('09:41');
  const [batteryLevel] = useState<number>(98);
  const [isDynamicIslandExpanded, setIsDynamicIslandExpanded] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-screen h-[100dvh] overflow-hidden bg-slate-950 flex items-center justify-center font-sans antialiased text-slate-100 select-none">
      
      {/* DESKTOP BACKGROUND ONLY: Dark Slate / Black gradient + 2 Soft Glowing Cyber Orbs */}
      <div className="hidden md:block absolute inset-0 bg-gradient-to-br from-slate-950 via-[#0a0f1d] to-black overflow-hidden pointer-events-none">
        {/* Cyber Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(#38bdf8 1px, transparent 1px), linear-gradient(to right, #38bdf8 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Glow Orb 1: Cyber Cyan (Top-Left / Center) */}
        <div className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[130px] animate-pulse" style={{ animationDuration: '8s' }} />

        {/* Glow Orb 2: Emerald Green (Bottom-Right) */}
        <div className="absolute -bottom-24 -right-24 w-[520px] h-[520px] bg-emerald-500/20 rounded-full blur-[140px] animate-pulse" style={{ animationDuration: '10s' }} />

        {/* Desktop Ambient Helper Banner */}
        <aside aria-label="Desktop Context" className="absolute top-6 left-8 flex items-center gap-3 bg-slate-900/80 backdrop-blur-md border border-slate-800/80 px-4 py-2 rounded-2xl shadow-xl">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <ShieldCheck className="w-5 h-5 text-slate-950 font-bold" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-200 tracking-wide flex items-center gap-2">
              LÁ CHẮN SỐ <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">Mobile-First</span>
            </div>
            <div className="text-[11px] text-slate-400">Không gian bảo vệ an toàn số cá nhân</div>
          </div>
        </aside>

        {/* Desktop Device Indicator Badge */}
        <aside aria-label="Mode Indicator" className="absolute bottom-6 left-8 flex items-center gap-2 bg-slate-900/60 border border-slate-800/60 px-3.5 py-1.5 rounded-xl text-[11px] text-slate-400">
          <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
          <span>Khung chuẩn mô phỏng: <strong>390 × 844 px</strong></span>
        </aside>

        <aside aria-label="Security Status" className="absolute top-6 right-8 hidden lg:flex items-center gap-2 text-xs text-slate-400 bg-slate-900/70 border border-slate-800/80 px-3.5 py-2 rounded-xl">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Hệ thống giám sát NCSC: <strong>Đang kết nối 24/7</strong></span>
        </aside>
      </div>

      {/* ========================================================================= */}
      {/* PHONE WRAPPER & CHASSIS CONTAINER                                         */}
      {/* Mobile: 100% width, 100% height, zero margins, native app experience      */}
      {/* Desktop: 390px x 844px fixed phone body with thick bezel & 3D shadow     */}
      {/* ========================================================================= */}
      <div 
        id="phone-chassis"
        className="
          relative
          w-full h-full md:w-[390px] md:h-[844px]
          md:max-h-[calc(100vh-2rem)]
          md:rounded-[44px]
          bg-slate-950
          md:border-[10px] md:border-[#1e293b]
          md:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_0_2px_#334155,0_0_40px_rgba(6,182,212,0.15)]
          flex flex-col
          overflow-hidden
          z-10
          transition-all duration-300
        "
      >
        {/* DESKTOP PHYSICAL BUTTON ACCENTS (Side volume and power buttons) */}
        <div className="hidden md:block absolute -left-[14px] top-28 w-[4px] h-12 bg-slate-600 rounded-l-md pointer-events-none" />
        <div className="hidden md:block absolute -left-[14px] top-44 w-[4px] h-12 bg-slate-600 rounded-l-md pointer-events-none" />
        <div className="hidden md:block absolute -right-[14px] top-32 w-[4px] h-16 bg-slate-600 rounded-r-md pointer-events-none" />

        {/* ------------------------------------------------------------- */}
        {/* PHONE TOP STATUS BAR & DYNAMIC ISLAND / NOTCH                */}
        {/* ------------------------------------------------------------- */}
        <div 
          id="phone-status-bar"
          className="relative shrink-0 w-full pt-2 pb-1.5 px-6 flex items-center justify-between z-30 bg-slate-950/95 backdrop-blur-md border-b border-slate-900/60"
        >
          {/* Clock */}
          <div className="w-16 text-left text-xs font-semibold tracking-tight text-slate-200">
            {currentTime}
          </div>

          {/* Simulated Dynamic Island / Camera Notch */}
          <div 
            onClick={() => setIsDynamicIslandExpanded(!isDynamicIslandExpanded)}
            className={`
              cursor-pointer
              transition-all duration-300 ease-out
              bg-black border border-slate-800/80 rounded-full
              flex items-center justify-center gap-2
              hover:border-cyan-500/40
              ${isDynamicIslandExpanded ? 'px-3 py-1 w-44 shadow-lg shadow-cyan-500/10' : 'w-24 h-5 px-2'}
            `}
            title="Trạng thái lá chắn"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-slate-950 animate-ping" />
            </div>
            {isDynamicIslandExpanded ? (
              <span className="text-[10px] font-medium text-emerald-400 whitespace-nowrap">
                Lá chắn: Hoạt động
              </span>
            ) : (
              <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700/60 ml-auto" />
            )}
          </div>

          {/* Right Status Icons (Signal, Wifi, Battery) */}
          <div className="w-16 flex items-center justify-end gap-1.5 text-slate-300">
            <Signal className="w-3.5 h-3.5 text-slate-300" />
            <Wifi className="w-3.5 h-3.5 text-slate-300" />
            <div className="flex items-center gap-0.5">
              <span className="text-[10px] font-medium text-slate-300">{batteryLevel}%</span>
              <Battery className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* INNER SCROLLABLE CONTENT VIEWPORT                            */}
        {/* Strictly scrollable ONLY inside this phone screen box        */}
        {/* ------------------------------------------------------------- */}
        <div 
          id="phone-scroll-viewport"
          className="
            flex-1 w-full
            overflow-y-auto overflow-x-hidden
            overscroll-contain
            bg-slate-950 text-slate-100
            flex flex-col
            scroll-smooth
          "
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#334155 transparent'
          }}
        >
          {children}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* PHONE BOTTOM HOME INDICATOR BAR                               */}
        {/* ------------------------------------------------------------- */}
        <div 
          id="phone-home-indicator"
          className="shrink-0 w-full py-1.5 bg-slate-950/95 flex justify-center items-center pointer-events-none z-30 border-t border-slate-900/40"
        >
          <div className="w-32 h-1 bg-slate-600/60 rounded-full" />
        </div>

      </div>
    </div>
  );
};
