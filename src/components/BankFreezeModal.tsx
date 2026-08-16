import React, { useState } from 'react';
import { 
  X, 
  PhoneCall, 
  ShieldAlert, 
  Search, 
  Copy, 
  CheckCircle2, 
  ExternalLink, 
  Lock, 
  MessageSquare, 
  AlertTriangle, 
  Flame, 
  ArrowRight,
  Info,
  Layers,
  Sparkles,
  Smartphone,
  Send,
  CreditCard,
  PhoneForwarded,
  Clock
} from 'lucide-react';
import { VIETNAM_BANKS_HOTLINES } from '../data/mockData';
import { BANK_BRAND_DATA, getSmsHref } from '../data/bankBrandData';
import { BankHotline } from '../types';
import { BankLogo } from './BankLogo';

interface BankFreezeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FilterCategory = 'all' | 'sms' | 'big4' | 'free1800' | 'ewallet';

export const BankFreezeModal: React.FC<BankFreezeModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [selectedBank, setSelectedBank] = useState<BankHotline | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [customLast4Digits, setCustomLast4Digits] = useState('');
  const [smsLockMode, setSmsLockMode] = useState<'all' | 'specific'>('all');

  if (!isOpen) return null;

  const filteredBanks = VIETNAM_BANKS_HOTLINES.filter(bank => {
    const brand = BANK_BRAND_DATA[bank.code];
    
    // Text search
    const matchesSearch = 
      bank.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bank.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bank.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bank.hotline.includes(searchQuery);

    if (!matchesSearch) return false;

    // Category filter
    if (activeFilter === 'sms') {
      return !!brand?.smsConfig || bank.emergencyLockMethod.toLowerCase().includes('gửi');
    }
    if (activeFilter === 'big4') {
      return ['VCB', 'BIDV', 'CTG', 'VBA'].includes(bank.code);
    }
    if (activeFilter === 'free1800') {
      return bank.hotline.startsWith('1800');
    }
    if (activeFilter === 'ewallet') {
      return ['MOMO', 'VTM'].includes(bank.code);
    }

    return true;
  });

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Compute live SMS body and recipient for selected bank
  const selectedBrand = selectedBank ? BANK_BRAND_DATA[selectedBank.code] : null;
  const currentSmsConfig = selectedBrand?.smsConfig;

  let activeSmsBody = currentSmsConfig?.defaultBody || '';
  if (currentSmsConfig) {
    if (smsLockMode === 'all') {
      activeSmsBody = currentSmsConfig.allCardsBody;
    } else if (smsLockMode === 'specific' && currentSmsConfig.specificCardPrefix) {
      const digits = customLast4Digits.trim() || 'xxxx';
      activeSmsBody = `${currentSmsConfig.specificCardPrefix} ${digits}`;
    }
  }

  const activeSmsHref = currentSmsConfig ? getSmsHref(currentSmsConfig.recipient, activeSmsBody) : '#';

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-slate-950 border border-slate-800 rounded-t-3xl sm:rounded-3xl max-h-[94vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-rose-950/95 via-slate-900 to-slate-950 border-b border-rose-500/30 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0">
              <ShieldAlert className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-base font-black text-white">KHÓA TÀI KHOẢN & THẺ KHẨN CẤP</h2>
                <span className="text-[10px] bg-rose-500 text-white font-black px-1.5 py-0.5 rounded shadow-sm animate-pulse">
                  24/7
                </span>
              </div>
              <p className="text-xs text-rose-300">
                1-Chạm mở SMS tự điền cú pháp hoặc Gọi Hotline bấm phím 1
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="p-3 border-b border-slate-800 bg-slate-900/80 space-y-2.5 shrink-0">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm ngân hàng (Vietcombank, MB, Techcombank, 1900...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs p-1"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                activeFilter === 'all'
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                  : 'bg-slate-950 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800'
              }`}
            >
              Tất cả ({VIETNAM_BANKS_HOTLINES.length})
            </button>
            <button
              onClick={() => setActiveFilter('sms')}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                activeFilter === 'sms'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-black'
                  : 'bg-slate-950 text-amber-300 hover:bg-slate-800 border border-amber-500/30'
              }`}
            >
              ✉️ Khóa bằng SMS (1-Chạm)
            </button>
            <button
              onClick={() => setActiveFilter('big4')}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                activeFilter === 'big4'
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                  : 'bg-slate-950 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800'
              }`}
            >
              🏛️ Big 4 Nhà Nước
            </button>
            <button
              onClick={() => setActiveFilter('free1800')}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                activeFilter === 'free1800'
                  ? 'bg-emerald-500 text-slate-950 font-black shadow-md shadow-emerald-500/20'
                  : 'bg-slate-950 text-emerald-300 hover:bg-slate-800 border border-emerald-500/30'
              }`}
            >
              📞 Miễn Cước (1800)
            </button>
            <button
              onClick={() => setActiveFilter('ewallet')}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                activeFilter === 'ewallet'
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                  : 'bg-slate-950 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800'
              }`}
            >
              📱 Ví Điện Tử
            </button>
          </div>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto p-3.5 space-y-3">
          {/* Quick Notice */}
          <div className="p-3 rounded-2xl bg-gradient-to-r from-rose-950/60 via-slate-900 to-slate-950 border border-rose-500/40 flex items-start gap-2.5 shadow-md">
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-200 leading-relaxed">
              <strong className="text-rose-400 font-bold block mb-0.5">QUY TẮC PHONG TỎA TRONG 30 PHÚT VÀNG:</strong>
              • Nếu ngân hàng hỗ trợ SMS: Nhấn <strong className="text-amber-300">"✉️ Mở SMS"</strong> để gửi lệnh khóa tức thì.<br />
              • Nếu gọi Hotline: Lắng nghe và <strong className="text-white font-bold">BẤM PHÍM 1</strong> để kích hoạt hệ thống tự động khóa thẻ ngay, không cần đợi nhân viên.
            </div>
          </div>

          {/* Banks Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredBanks.map((bank) => {
              const brand = BANK_BRAND_DATA[bank.code];
              const accentGradient = brand?.accentGradient || 'from-slate-900 via-slate-900 to-slate-950 border-slate-800';
              const smsConfig = brand?.smsConfig;
              const isFreeHotline = bank.hotline.startsWith('1800');
              const quickSmsHref = smsConfig ? getSmsHref(smsConfig.recipient, smsConfig.defaultBody) : undefined;

              return (
                <div
                  key={bank.code}
                  className={`p-3.5 rounded-2xl bg-gradient-to-br ${accentGradient} border border-slate-800 hover:border-rose-400/80 transition-all flex flex-col justify-between shadow-lg relative overflow-hidden group`}
                >
                  {/* Card Top: Wide crisp official bank logo + Badges */}
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <BankLogo 
                        code={bank.code} 
                        name={bank.shortName} 
                        logoUrl={bank.logoUrl} 
                        logoBg={bank.logoBg} 
                        variant="wide"
                        size="md" 
                      />

                      <div className="flex items-center gap-1.5">
                        {smsConfig && (
                          <span className="text-[9px] font-extrabold bg-amber-500 text-slate-950 px-1.5 py-0.5 rounded shadow-sm">
                            SMS 1-CHẠM
                          </span>
                        )}
                        {isFreeHotline && (
                          <span className="text-[9px] font-extrabold bg-emerald-500 text-slate-950 px-1.5 py-0.5 rounded shadow-sm">
                            MIỄN PHÍ
                          </span>
                        )}
                        <span className="text-[10px] font-bold text-slate-300 bg-slate-950/80 border border-slate-700/60 px-2 py-0.5 rounded-lg font-mono">
                          {bank.code}
                        </span>
                      </div>
                    </div>

                    {/* Bank Info */}
                    <div className="mt-2.5 space-y-1">
                      <div className="flex items-baseline justify-between">
                        <h3 className="text-sm font-black text-white group-hover:text-cyan-300 transition-colors">
                          {bank.shortName}
                        </h3>
                        <button
                          onClick={() => {
                            setSelectedBank(bank);
                            setCustomLast4Digits('');
                            setSmsLockMode('all');
                          }}
                          className="text-[11px] text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-0.5 p-0.5"
                        >
                          Chi tiết <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                      
                      <p className="text-[11px] text-slate-400 leading-tight">
                        {bank.name}
                      </p>

                      {/* Fast Lock Instruction (Fully readable, no truncation) */}
                      <div className="pt-1.5">
                        {smsConfig ? (
                          <div className="p-2 rounded-xl bg-slate-950/80 border border-amber-500/30 text-[11px] text-amber-200">
                            <div className="flex items-center justify-between text-[10px] font-bold text-amber-400 mb-0.5">
                              <span>✉️ CÚ PHÁP KHÓA SMS:</span>
                              <span className="font-mono text-white bg-amber-500/20 px-1.5 py-0.2 rounded border border-amber-500/40">
                                Gửi {smsConfig.recipient}
                              </span>
                            </div>
                            <div className="font-mono font-bold text-white tracking-wide bg-slate-900/90 px-2 py-1 rounded border border-slate-800 select-all">
                              {smsConfig.defaultBody}
                            </div>
                          </div>
                        ) : (
                          <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-300">
                            <div className="flex items-center gap-1 text-[10px] font-bold text-cyan-400 mb-0.5">
                              <PhoneForwarded className="w-3 h-3" />
                              <span>HƯỚNG DẪN KHÓA NHANH:</span>
                            </div>
                            <div className="text-slate-300 leading-snug">
                              {brand.ivrPrompt || bank.emergencyLockMethod}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom: Fast Action Buttons */}
                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-col gap-2">
                    {/* If bank supports SMS: Primary 1-Tap SMS Button */}
                    {smsConfig && quickSmsHref && (
                      <a
                        href={quickSmsHref}
                        className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 active:scale-95 transition-all"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>MỞ SMS GỬI "{smsConfig.defaultBody}"</span>
                      </a>
                    )}

                    {/* Emergency Call Button + Copy */}
                    <div className="flex items-center gap-2">
                      <a
                        href={`tel:${bank.hotline}`}
                        className={`flex-1 py-2.5 px-3 rounded-xl text-white font-black text-xs flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all ${
                          smsConfig
                            ? 'bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200'
                            : 'bg-gradient-to-r from-rose-600 via-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 shadow-rose-600/30'
                        }`}
                      >
                        <PhoneCall className="w-4 h-4 animate-bounce" />
                        <span>GỌI {bank.hotline}</span>
                      </a>

                      <button
                        onClick={() => handleCopy(bank.hotline)}
                        className="p-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 shrink-0 transition-colors"
                        title="Sao chép số tổng đài"
                      >
                        {copiedText === bank.hotline ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredBanks.length === 0 && (
            <div className="p-8 text-center space-y-2">
              <p className="text-slate-400 text-xs">Không tìm thấy ngân hàng khớp với từ khóa "{searchQuery}".</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilter('all');
                }}
                className="px-3 py-1.5 bg-slate-800 text-cyan-400 rounded-xl text-xs font-bold"
              >
                Xem tất cả ngân hàng
              </button>
            </div>
          )}
        </div>

        {/* Bank Detail Sub-Modal */}
        {selectedBank && (
          <div className="absolute inset-0 bg-slate-950/98 backdrop-blur-md p-4 flex flex-col justify-between animate-in fade-in duration-150 z-20">
            <div className="space-y-4 overflow-y-auto pr-1">
              
              {/* Header inside detail */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 shrink-0">
                <div className="flex items-center gap-3">
                  <BankLogo 
                    code={selectedBank.code} 
                    name={selectedBank.shortName} 
                    logoUrl={selectedBank.logoUrl} 
                    logoBg={selectedBank.logoBg} 
                    variant="wide"
                    size="lg" 
                  />
                  <div>
                    <h3 className="text-base font-black text-white">{selectedBank.shortName}</h3>
                    <p className="text-xs text-slate-400">{selectedBank.name}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedBank(null)}
                  className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 1. SMS FAST ACTION CARD (If bank supports SMS) */}
              {currentSmsConfig && (
                <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-950/50 via-slate-900 to-slate-950 border border-amber-500/50 shadow-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black">
                        <Send className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-amber-400 uppercase tracking-wide">
                          Khóa thẻ khẩn cấp qua SMS (Nhanh nhất)
                        </h4>
                        <p className="text-[10px] text-amber-200/80">
                          {currentSmsConfig.note}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-lg border border-amber-500/40">
                      Gửi {currentSmsConfig.recipient}
                    </span>
                  </div>

                  {/* Mode Selector (Khóa tất cả vs Khóa thẻ cụ thể) */}
                  {currentSmsConfig.specificCardPrefix && (
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <button
                        onClick={() => setSmsLockMode('all')}
                        className={`p-2 rounded-xl border font-bold text-left transition-all ${
                          smsLockMode === 'all'
                            ? 'bg-amber-500/20 border-amber-500 text-white'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900'
                        }`}
                      >
                        <div className="flex items-center gap-1 text-[11px]">
                          <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                          <span>Khóa TOÀN BỘ thẻ</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono block mt-0.5">
                          {currentSmsConfig.allCardsBody}
                        </span>
                      </button>

                      <button
                        onClick={() => setSmsLockMode('specific')}
                        className={`p-2 rounded-xl border font-bold text-left transition-all ${
                          smsLockMode === 'specific'
                            ? 'bg-amber-500/20 border-amber-500 text-white'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900'
                        }`}
                      >
                        <div className="flex items-center gap-1 text-[11px]">
                          <CreditCard className="w-3.5 h-3.5 text-amber-400" />
                          <span>Khóa 1 thẻ cụ thể</span>
                        </div>
                        <span className="text-[10px] text-slate-400 block mt-0.5">
                          Theo 4 số cuối thẻ
                        </span>
                      </button>
                    </div>
                  )}

                  {/* Input 4 digits if in specific mode */}
                  {smsLockMode === 'specific' && currentSmsConfig.specificCardPrefix && (
                    <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800">
                      <CreditCard className="w-4 h-4 text-slate-400 shrink-0" />
                      <input
                        type="text"
                        maxLength={4}
                        placeholder="Nhập 4 số cuối in trên mặt thẻ (VD: 1234)"
                        value={customLast4Digits}
                        onChange={(e) => setCustomLast4Digits(e.target.value.replace(/\D/g, ''))}
                        className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none font-mono"
                      />
                    </div>
                  )}

                  {/* Preview Box & 1-Tap CTA */}
                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between gap-2">
                    <div>
                      <div className="text-[10px] text-slate-400">Nội dung tin nhắn sẽ gửi:</div>
                      <div className="text-sm font-black text-amber-400 font-mono select-all">
                        {activeSmsBody}
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopy(activeSmsBody)}
                      className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold flex items-center gap-1 shrink-0"
                    >
                      {copiedText === activeSmsBody ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                      <span>Chép cú pháp</span>
                    </button>
                  </div>

                  {/* Big SMS Action Button */}
                  <a
                    href={activeSmsHref}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/30 active:scale-95 transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>MỞ ỨNG DỤNG SMS GỬI "{activeSmsBody}" NGAY</span>
                  </a>
                </div>
              )}

              {/* 2. Hotline Emergency Panel */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-rose-950/40 to-slate-900 border border-rose-500/40 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-300">Tổng Đài Khóa Khẩn Cấp (24/7):</span>
                  <span className="text-[10px] bg-rose-500/20 text-rose-300 font-bold px-2 py-0.5 rounded border border-rose-500/30">
                    Bấm phím 1 để khóa tự động
                  </span>
                </div>
                
                <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <div>
                    <span className="text-base font-black text-white font-mono">{selectedBank.hotline}</span>
                    <p className="text-[10px] text-slate-400">
                      {selectedBrand?.ivrPrompt || 'Hệ thống khóa thẻ tự động 24/7'}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleCopy(selectedBank.hotline)}
                      className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold flex items-center gap-1"
                    >
                      {copiedText === selectedBank.hotline ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>Chép số</span>
                    </button>
                    <a
                      href={`tel:${selectedBank.hotline}`}
                      className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold flex items-center gap-1"
                    >
                      <PhoneCall className="w-3.5 h-3.5 animate-bounce" />
                      <span>Gọi ngay</span>
                    </a>
                  </div>
                </div>

                {selectedBank.secondaryHotline && (
                  <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-slate-800/80">
                    <span>Hotline dự phòng khi nghẽn mạng:</span>
                    <a href={`tel:${selectedBank.secondaryHotline}`} className="font-mono text-cyan-400 hover:underline">
                      {selectedBank.secondaryHotline}
                    </a>
                  </div>
                )}
              </div>

              {/* 3. App Lock Step-by-Step Guide */}
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                    <Lock className="w-4 h-4" />
                    <span>Các Bước Tự Khóa Trên App ({selectedBank.shortName}):</span>
                  </div>
                  <span className="text-[10px] text-slate-400">Trực tiếp trên điện thoại</span>
                </div>
                
                <div className="space-y-2">
                  {selectedBank.appLockSteps.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-300 bg-slate-950/60 p-2 rounded-xl border border-slate-800/80">
                      <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px] font-black shrink-0 border border-cyan-500/30">
                        {idx + 1}
                      </span>
                      <span className="font-medium">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-slate-800 flex gap-2 shrink-0">
              <a
                href={`tel:${selectedBank.hotline}`}
                className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-600/30 active:scale-95 transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                <span>GỌI KHẨN CẤP {selectedBank.hotline}</span>
              </a>
              <button
                onClick={() => setSelectedBank(null)}
                className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs"
              >
                Quay lại
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
