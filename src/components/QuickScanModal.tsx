import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  X, 
  Lock, 
  Wifi, 
  FileCheck, 
  Globe, 
  Smartphone 
} from 'lucide-react';

interface QuickScanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickScanModal: React.FC<QuickScanModalProps> = ({ isOpen, onClose }) => {
  const [scanStep, setScanStep] = useState<number>(0);
  const [isDone, setIsDone] = useState<boolean>(false);

  const steps = [
    { label: 'Kiểm tra đường truyền DNS & chứng chỉ mã hóa...', icon: Wifi },
    { label: 'Quét cơ sở dữ liệu tên miền lừa đảo NCSC...', icon: Globe },
    { label: 'Phân tích quyền trợ năng & tệp tin đáng ngờ...', icon: Smartphone },
    { label: 'Kiểm tra bộ lọc tin nhắn rác & Brandname...', icon: FileCheck },
    { label: 'Đồng bộ danh sách đen tài khoản ngân hàng...', icon: Lock },
  ];

  useEffect(() => {
    if (!isOpen) {
      setScanStep(0);
      setIsDone(false);
      return;
    }

    const interval = setInterval(() => {
      setScanStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setIsDone(true);
          return prev;
        }
      });
    }, 600);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-xs bg-slate-900 border border-slate-700 rounded-3xl p-5 text-center space-y-4 shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Animated Scanner Radar / Checkmark */}
        <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
          {!isDone ? (
            <>
              <div className="absolute inset-0 rounded-full border-2 border-cyan-500/30 animate-ping" />
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-emerald-400 p-[2px] shadow-lg shadow-cyan-500/30">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-cyan-400 animate-spin" style={{ animationDuration: '4s' }} />
                </div>
              </div>
            </>
          ) : (
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center animate-in zoom-in-50 duration-300">
              <ShieldCheck className="w-10 h-10" />
            </div>
          )}
        </div>

        <div>
          <h3 className="text-sm font-bold text-white">
            {isDone ? 'QUÉT BẢO MẬT HOÀN TẤT' : 'ĐANG QUÉT BẢO MẬT THIẾT BỊ'}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {isDone ? 'Hệ thống của bạn an toàn 100%' : 'Vui lòng giữ ứng dụng mở...'}
          </p>
        </div>

        {/* Scan Steps Progress */}
        <div className="space-y-2 text-left text-xs bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isCompleted = isDone || scanStep > idx;
            const isCurrent = !isDone && scanStep === idx;

            return (
              <div 
                key={idx} 
                className={`flex items-center gap-2.5 transition-all ${
                  isCompleted 
                    ? 'text-emerald-400 font-medium' 
                    : isCurrent 
                    ? 'text-cyan-300 font-bold animate-pulse' 
                    : 'text-slate-500'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                ) : (
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                )}
                <span className="text-[11px] truncate">{s.label}</span>
              </div>
            );
          })}
        </div>

        {isDone && (
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 active:scale-95 transition-transform"
          >
            ĐÓNG & TIẾP TỤC
          </button>
        )}
      </div>
    </div>
  );
};
