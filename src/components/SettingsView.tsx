import React, { useState } from 'react';
import { 
  ShieldCheck, 
  MessageSquare, 
  PhoneCall, 
  Eye, 
  Volume2, 
  BellRing, 
  Lock, 
  Smartphone, 
  Sliders, 
  CheckCircle2, 
  AlertTriangle,
  Play,
  Sparkles,
  Info,
  ChevronRight
} from 'lucide-react';
import { ElderSettings } from '../types';

interface SettingsViewProps {
  settings: ElderSettings;
  onUpdateSettings: (newSettings: Partial<ElderSettings>) => void;
  onTriggerSimulatedAlert: (type: 'sms' | 'zalo' | 'call') => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  settings,
  onUpdateSettings,
  onTriggerSimulatedAlert
}) => {
  const [testNotificationStatus, setTestNotificationStatus] = useState<string | null>(null);

  const handleTestAlert = (type: 'sms' | 'zalo' | 'call') => {
    setTestNotificationStatus(`Đã kích hoạt mô phỏng cảnh báo tự động cho: ${type.toUpperCase()}`);
    onTriggerSimulatedAlert(type);
    setTimeout(() => setTestNotificationStatus(null), 4000);
  };

  const playElderVoiceSample = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(
        'Lá Chắn Số đang bảo vệ bạn. Khi có cuộc gọi hoặc tin nhắn lạ yêu cầu chuyển tiền, ứng dụng sẽ tự động cảnh báo bằng giọng nói.'
      );
      utterance.lang = 'vi-VN';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className={`p-4 space-y-4 pb-24 ${settings.isElderMode ? 'text-base' : 'text-sm'}`}>
      {/* ------------------------------------------------------------- */}
      {/* 1. CHẾ ĐỘ THÂN THIỆN NGƯỜI CAO TUỔI (ELDER ACCESSIBILITY)     */}
      {/* ------------------------------------------------------------- */}
      <section className="p-4 rounded-3xl bg-gradient-to-br from-cyan-950/80 via-slate-900 to-slate-950 border-2 border-cyan-500/40 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
              <Eye className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-white text-base">Chế Độ Người Cao Tuổi</h2>
                <span className="text-[10px] bg-cyan-500 text-slate-950 font-bold px-2 py-0.5 rounded-full">
                  Dễ Dùng
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Chữ to rõ ràng, biểu tượng nổi bật, giọng nói đọc to cảnh báo
              </p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={settings.isElderMode}
              onChange={(e) => onUpdateSettings({ isElderMode: e.target.checked })}
              className="sr-only peer" 
            />
            <div className="w-14 h-8 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-cyan-500 shadow-inner"></div>
          </label>
        </div>

        {/* Voice Read Aloud Toggle */}
        <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Volume2 className="w-5 h-5 text-emerald-400" />
            <div>
              <span className="font-semibold text-slate-200 text-sm">Đọc To Cảnh Báo Bằng Giọng Nói</span>
              <p className="text-xs text-slate-400">Tự động phát âm thanh khi phát hiện nguy cơ</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={playElderVoiceSample}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 text-xs flex items-center gap-1 font-semibold"
              title="Nghe thử giọng đọc"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe thử</span>
            </button>

            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={settings.autoReadAloud}
                onChange={(e) => onUpdateSettings({ autoReadAloud: e.target.checked })}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500 shadow-inner"></div>
            </label>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. GIÁM SÁT TỰ ĐỘNG TIN NHẮN (SMS, ZALO, TELEGRAM)            */}
      {/* ------------------------------------------------------------- */}
      <section className="p-4 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2.5">
          <MessageSquare className="w-5 h-5 text-emerald-400" />
          <div>
            <h2 className="font-bold text-white text-sm">Tự Động Đọc & Cảnh Báo Tin Nhắn Đến</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Hệ thống sẽ chạy ngầm, tự động phân tích và cảnh báo ngay khi có tin nhắn lừa đảo gửi đến.
            </p>
          </div>
        </div>

        <div className="space-y-3 pt-1">
          {/* SMS Shield */}
          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-xs">
                SMS
              </div>
              <div>
                <span className="font-semibold text-slate-200 text-xs">Tin Nhắn SMS & Brandname Ngân hàng</span>
                <p className="text-[11px] text-slate-400">Phát hiện trạm BTS giả mạo chèn link độc</p>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={settings.smsAutoScan}
                onChange={(e) => onUpdateSettings({ smsAutoScan: e.target.checked })}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
            </label>
          </div>

          {/* Zalo Shield */}
          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-xs">
                Zalo
              </div>
              <div>
                <span className="font-semibold text-slate-200 text-xs">Tin Nhắn Ứng Dụng Zalo</span>
                <p className="text-[11px] text-slate-400">Cảnh báo link file .apk giả mạo VNeID, thuế</p>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={settings.zaloAutoScan}
                onChange={(e) => onUpdateSettings({ zaloAutoScan: e.target.checked })}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
          </div>

          {/* Telegram Shield */}
          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold text-xs">
                Tele
              </div>
              <div>
                <span className="font-semibold text-slate-200 text-xs">Hội Nhóm Telegram & Mạng Xã Hội</span>
                <p className="text-[11px] text-slate-400">Chặn bẫy tuyển CTV Shopee & sàn đầu tư ảo</p>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={settings.telegramAutoScan}
                onChange={(e) => onUpdateSettings({ telegramAutoScan: e.target.checked })}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-500"></div>
            </label>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3. NHẬN BIẾT & CẢNH BÁO CUỘC GỌI TRỰC TIẾP (CALL SCREENER)     */}
      {/* ------------------------------------------------------------- */}
      <section className="p-4 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2.5">
          <PhoneCall className="w-5 h-5 text-rose-400" />
          <div>
            <h2 className="font-bold text-white text-sm">Lá Chắn Cuộc Gọi Lạ & Giọng Nói AI (Deepfake)</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Phát hiện cuộc gọi dọa dẫm của Công an giả mạo hoặc báo con cấp cứu ngay trong lúc đàm thoại.
            </p>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
          <div>
            <span className="font-semibold text-slate-200 text-xs">Cảnh Báo Nổi Khi Đang Nghe Điện Thoại</span>
            <p className="text-[11px] text-slate-400">Tự động hiện bảng "CÚP MÁY NGAY" nếu phát hiện từ khóa lừa đảo</p>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={settings.liveCallMonitor}
              onChange={(e) => onUpdateSettings({ liveCallMonitor: e.target.checked })}
              className="sr-only peer" 
            />
            <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
          </label>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. MÔ PHỎNG THỬ NGHIỆM CẢNH BÁO TỰ ĐỘNG                      */}
      {/* ------------------------------------------------------------- */}
      <section className="p-4 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/30 border border-slate-800 space-y-3">
        <div className="flex items-center gap-2">
          <Play className="w-4 h-4 text-cyan-400" />
          <h2 className="font-bold text-slate-200 text-xs uppercase tracking-wider">
            Thử Nghiệm Phản Ứng Cảnh Báo Tự Động
          </h2>
        </div>
        <p className="text-xs text-slate-400">
          Bấm vào các nút bên dưới để xem cách Lá Chắn Số tự động bảo vệ bạn khi có tin nhắn hoặc cuộc gọi lừa đảo đến:
        </p>

        <div className="grid grid-cols-3 gap-2 pt-1">
          <button
            onClick={() => handleTestAlert('sms')}
            className="p-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex flex-col items-center gap-1.5 active:scale-95 transition-all"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>Giả Lập SMS</span>
          </button>

          <button
            onClick={() => handleTestAlert('zalo')}
            className="p-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-blue-300 border border-blue-500/30 text-xs font-bold flex flex-col items-center gap-1.5 active:scale-95 transition-all"
          >
            <Smartphone className="w-4 h-4 text-blue-400" />
            <span>Giả Lập Zalo</span>
          </button>

          <button
            onClick={() => handleTestAlert('call')}
            className="p-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-rose-300 border border-rose-500/30 text-xs font-bold flex flex-col items-center gap-1.5 active:scale-95 transition-all"
          >
            <PhoneCall className="w-4 h-4 text-rose-400" />
            <span>Giả Lập Cuộc Gọi</span>
          </button>
        </div>

        {testNotificationStatus && (
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs flex items-center gap-2 animate-bounce">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>{testNotificationStatus}</span>
          </div>
        )}
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 5. QUYỀN RIÊNG TƯ & AN TOÀN TUYỆT ĐỐI                         */}
      {/* ------------------------------------------------------------- */}
      <div className="p-3.5 rounded-2xl bg-slate-900/50 border border-slate-800 flex items-start gap-3 text-xs text-slate-400">
        <Lock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-slate-300">Cam Kết Bảo Mật Tuyệt Đối:</span> Dữ liệu tin nhắn cá nhân và âm thanh cuộc gọi chỉ được xử lý tạm thời trên bộ nhớ đệm thiết bị để phát hiện nguy cơ, hoàn toàn KHÔNG lưu trữ hay gửi về máy chủ bên thứ ba.
        </div>
      </div>
    </div>
  );
};
