import React, { useState, useEffect, useRef } from 'react';
import { 
  PhoneCall, 
  ShieldAlert, 
  Send, 
  CheckCircle2, 
  UploadCloud, 
  AlertOctagon,
  FileCheck,
  Building,
  Info,
  Clock,
  Trash2,
  Image as ImageIcon,
  Check,
  Copy,
  FileText
} from 'lucide-react';
import { EMERGENCY_CONTACTS } from '../data/mockData';
import { ReportItem } from '../types';

interface ReportEmergencyViewProps {
  initialReportData?: {
    type: string;
    value: string;
    desc: string;
  } | null;
}

export const ReportEmergencyView: React.FC<ReportEmergencyViewProps> = ({ initialReportData }) => {
  const [activeSubView, setActiveSubView] = useState<'hotline' | 'form' | 'history'>('hotline');

  // Form State
  const [reportType, setReportType] = useState<string>(initialReportData?.type || 'url');
  const [targetValue, setTargetValue] = useState<string>(initialReportData?.value || '');
  const [description, setDescription] = useState<string>(initialReportData?.desc || '');
  const [contactPhone, setContactPhone] = useState<string>('');
  const [attachedImageBase64, setAttachedImageBase64] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Local saved reports history
  const [reportHistory, setReportHistory] = useState<ReportItem[]>(() => {
    try {
      const saved = localStorage.getItem('cybershield_user_reports');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      {
        id: 'LCS-847291',
        type: 'url',
        target: 'https://vneid-xacthuc.xyz',
        description: 'Trang web mạo danh Bộ Công An lừa cài đặt file APK độc hại.',
        submittedAt: '14/08/2026 09:30',
        status: 'verified',
        threatLevel: 'critical',
      }
    ];
  });

  useEffect(() => {
    if (initialReportData) {
      setReportType(initialReportData.type || 'url');
      setTargetValue(initialReportData.value || '');
      setDescription(initialReportData.desc || '');
      setActiveSubView('form');
    }
  }, [initialReportData]);

  const handleImageAttach = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setAttachedImageBase64(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetValue.trim() || !description.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const ticketId = `LCS-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedTicket(ticketId);

      const newReport: ReportItem = {
        id: ticketId,
        type: reportType as any,
        target: targetValue.trim(),
        description: description.trim(),
        contactPhone: contactPhone.trim() || undefined,
        submittedAt: new Date().toLocaleString('vi-VN'),
        status: 'processing',
        threatLevel: 'high',
      };

      const updated = [newReport, ...reportHistory];
      setReportHistory(updated);
      try {
        localStorage.setItem('cybershield_user_reports', JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }
    }, 900);
  };

  const handleResetForm = () => {
    setSubmittedTicket(null);
    setTargetValue('');
    setDescription('');
    setContactPhone('');
    setAttachedImageBase64(null);
  };

  return (
    <div className="p-4 space-y-4 pb-8">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
            <AlertOctagon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Khẩn Cấp & Tố Giác Lừa Đảo</h2>
            <p className="text-xs text-slate-400">Đường dây nóng cơ quan chức năng & gửi báo cáo trực tiếp</p>
          </div>
        </div>
      </div>

      {/* 3-Way Switcher */}
      <div className="grid grid-cols-3 gap-1 p-1 bg-slate-900 rounded-xl border border-slate-800">
        <button
          onClick={() => setActiveSubView('hotline')}
          className={`py-2 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition-all ${
            activeSubView === 'hotline'
              ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span>Hotline 24/7</span>
        </button>

        <button
          onClick={() => setActiveSubView('form')}
          className={`py-2 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition-all ${
            activeSubView === 'form'
              ? 'bg-cyan-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Send className="w-3.5 h-3.5" />
          <span>Gửi Tố Giác</span>
        </button>

        <button
          onClick={() => setActiveSubView('history')}
          className={`py-2 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition-all ${
            activeSubView === 'history'
              ? 'bg-emerald-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Hồ Sơ ({reportHistory.length})</span>
        </button>
      </div>

      {/* ============================================================= */}
      {/* 1. HOTLINE LIST                                               */}
      {/* ============================================================= */}
      {activeSubView === 'hotline' && (
        <div className="space-y-3">
          <div className="p-3 rounded-2xl bg-rose-950/30 border border-rose-500/40 text-rose-200 text-xs flex items-start gap-2">
            <Info className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <strong>Lưu ý khẩn cấp:</strong> Nếu bạn vừa chuyển tiền cho kẻ lừa đảo trong vòng 30 phút, hãy gọi ngay đường dây nóng ngân hàng của bạn để yêu cầu khóa thẻ/đóng băng tài khoản ngay lập tức!
            </div>
          </div>

          <div className="space-y-2.5">
            {EMERGENCY_CONTACTS.map((item, idx) => (
              <div 
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 space-y-2 shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-white leading-tight">
                      {item.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">{item.agency}</p>
                  </div>

                  <a
                    href={`tel:${item.phone.replace(/\s+/g, '')}`}
                    className="px-3 py-1.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-rose-500/20 active:scale-95 transition-transform"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Gọi {item.phone}</span>
                  </a>
                </div>

                <p className="text-[11px] text-slate-300 bg-slate-950/60 p-2 rounded-xl border border-slate-800/80">
                  {item.description}
                </p>

                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-0.5">
                  <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                    <Clock className="w-3 h-3" /> {item.available}
                  </span>
                  <span>Đầu số chính thống</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================= */}
      {/* 2. REPORT SUBMISSION FORM                                     */}
      {/* ============================================================= */}
      {activeSubView === 'form' && (
        <div className="space-y-4">
          {!submittedTicket ? (
            <form onSubmit={handleSubmitReport} className="p-4 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3.5 shadow-xl">
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">
                  Loại đối tượng lừa đảo:
                </label>
                <div className="grid grid-cols-4 gap-1">
                  <button
                    type="button"
                    onClick={() => setReportType('url')}
                    className={`py-1.5 rounded-lg text-[11px] font-semibold border ${
                      reportType === 'url' ? 'bg-cyan-500 text-slate-950 border-cyan-400' : 'bg-slate-950 border-slate-800 text-slate-300'
                    }`}
                  >
                    Link Web
                  </button>
                  <button
                    type="button"
                    onClick={() => setReportType('phone')}
                    className={`py-1.5 rounded-lg text-[11px] font-semibold border ${
                      reportType === 'phone' ? 'bg-cyan-500 text-slate-950 border-cyan-400' : 'bg-slate-950 border-slate-800 text-slate-300'
                    }`}
                  >
                    SĐT Lạ
                  </button>
                  <button
                    type="button"
                    onClick={() => setReportType('bank')}
                    className={`py-1.5 rounded-lg text-[11px] font-semibold border ${
                      reportType === 'bank' ? 'bg-cyan-500 text-slate-950 border-cyan-400' : 'bg-slate-950 border-slate-800 text-slate-300'
                    }`}
                  >
                    STK Bank
                  </button>
                  <button
                    type="button"
                    onClick={() => setReportType('image')}
                    className={`py-1.5 rounded-lg text-[11px] font-semibold border ${
                      reportType === 'image' ? 'bg-cyan-500 text-slate-950 border-cyan-400' : 'bg-slate-950 border-slate-800 text-slate-300'
                    }`}
                  >
                    Ảnh Bill/Giấy
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">
                  {reportType === 'url' ? 'Địa chỉ Link web độc hại:' : (reportType === 'phone' ? 'Số điện thoại gọi/nhắn tin:' : (reportType === 'bank' ? 'Số tài khoản & Tên ngân hàng:' : 'Tên thủ đoạn trong ảnh:'))}
                </label>
                <input
                  type="text"
                  required
                  value={targetValue}
                  onChange={(e) => setTargetValue(e.target.value)}
                  placeholder={reportType === 'url' ? 'https://...' : (reportType === 'phone' ? '0988...' : '102938... (Vietcombank)')}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">
                  Mô tả hành vi / bằng chứng lừa đảo:
                </label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Mô tả chi tiết: đối tượng tự xưng là ai, yêu cầu chuyển bao nhiêu tiền, dụ dỗ làm nhiệm vụ..."
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">
                  Số điện thoại của bạn (nhận thông báo xử lý - không bắt buộc):
                </label>
                <input
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="0912345678"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
                />
              </div>

              {/* Upload Screenshot attachment */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageAttach(file);
                }}
              />

              {!attachedImageBase64 ? (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="p-3 border border-dashed border-slate-700 rounded-xl bg-slate-950/60 text-center flex items-center justify-center gap-2 cursor-pointer text-slate-400 hover:text-slate-200 hover:border-cyan-400 transition-all"
                >
                  <UploadCloud className="w-4 h-4 text-cyan-400" />
                  <span className="text-[11px]">Đính kèm ảnh chụp màn hình bằng chứng</span>
                </div>
              ) : (
                <div className="relative p-2 bg-slate-950 rounded-xl border border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src={attachedImageBase64} alt="Attached" className="w-10 h-10 object-cover rounded-lg" />
                    <span className="text-[11px] text-emerald-400 font-semibold">Đã đính kèm ảnh bằng chứng</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAttachedImageBase64(null)}
                    className="p-1 text-rose-400 hover:text-rose-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-400 hover:to-red-500 disabled:opacity-50 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-rose-500/25 active:scale-95"
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? 'Đang mã hóa và gửi hồ sơ...' : 'Gửi Tố Giác Tới NCSC & Bộ Công An'}
              </button>
            </form>
          ) : (
            /* Ticket confirmation view */
            <div className="p-5 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 text-center space-y-4 shadow-xl">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-sm font-bold text-white">ĐÃ TIẾP NHẬN TỐ GIÁC THÀNH CÔNG</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Mã hồ sơ tra cứu của bạn:
                </p>
                <div className="inline-block font-mono text-sm font-bold text-cyan-400 bg-slate-950 px-3 py-1 rounded-lg border border-cyan-500/30 mt-1">
                  {submittedTicket}
                </div>
              </div>

              <p className="text-[11px] text-slate-300 leading-relaxed bg-slate-950/80 p-3 rounded-2xl border border-slate-800 text-left">
                Hồ sơ đã được mã hóa an toàn và chuyển tiếp đến hệ thống tiếp nhận của <strong>Trung tâm Giám sát an toàn không gian mạng quốc gia (NCSC)</strong> để đưa đối tượng vào danh sách đen giám sát.
              </p>

              <button
                onClick={handleResetForm}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all"
              >
                Gửi thêm báo cáo khác
              </button>
            </div>
          )}
        </div>
      )}

      {/* ============================================================= */}
      {/* 3. REPORT HISTORY                                             */}
      {/* ============================================================= */}
      {activeSubView === 'history' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Danh sách các hồ sơ tố giác bạn đã gửi:</span>
            <span className="text-cyan-400 font-semibold">{reportHistory.length} hồ sơ</span>
          </div>

          <div className="space-y-2.5">
            {reportHistory.map((report) => (
              <div 
                key={report.id}
                className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-cyan-400">
                    {report.id}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    report.status === 'verified' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {report.status === 'verified' ? 'Đã xác thực & Chặn' : 'Đang xử lý thẩm định'}
                  </span>
                </div>

                <div className="text-xs font-semibold text-slate-200 break-all">
                  Mục tiêu: <span className="text-rose-400">{report.target}</span>
                </div>

                <p className="text-[11px] text-slate-400 line-clamp-2">
                  {report.description}
                </p>

                <div className="text-[10px] text-slate-500 flex items-center justify-between pt-1 border-t border-slate-800/80">
                  <span>Gửi lúc: {report.submittedAt}</span>
                  <span className="text-slate-400">NCSC Tiếp nhận</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
