import React, { useState } from 'react';
import { 
  X, 
  Volume2, 
  VolumeX, 
  Share2, 
  Download, 
  ShieldCheck, 
  Bookmark, 
  CheckCircle2, 
  Heart,
  Sparkles,
  Smartphone,
  KeyRound,
  PhoneCall,
  MessageCircle,
  Image as ImageIcon,
  Loader2,
  Copy
} from 'lucide-react';
import { POCKET_SAFETY_CARD_RULES } from '../data/mockData';
import { ElderSettings } from '../types';
import { generateSafetyCardPosterBlob } from '../utils/generateSafetyCardPoster';

interface PocketSafetyCardModalProps {
  isOpen: boolean;
  settings: ElderSettings;
  onClose: () => void;
}

export const PocketSafetyCardModal: React.FC<PocketSafetyCardModalProps> = ({
  isOpen,
  settings,
  onClose
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [shareSuccessMessage, setShareSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setShareSuccessMessage(msg);
    setTimeout(() => setShareSuccessMessage(null), 3500);
  };

  const handleSpeakAll = () => {
    if (!('speechSynthesis' in window)) return;

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    window.speechSynthesis.cancel();
    const speechScript = `6 lời dặn an toàn số cốt lõi cho ông bà và cha mẹ:
Lời dặn thứ nhất: Công an không gọi điện dọa bắt hay đòi tiền.
Lời dặn thứ hai: Tuyệt đối không cài file chấm A P K ngoài kho ứng dụng.
Lời dặn thứ ba: Không bao giờ đọc mã O T P cho bất kỳ ai.
Lời dặn thứ tư: Ai hỏi mượn tiền qua mạng, hãy gọi lại số điện thoại thường để kiểm chứng.
Lời dặn thứ năm: Nghe tin con cấp cứu, bình tĩnh gọi nhà trường và bệnh viện.
Lời dặn thứ sáu: Chỉ giao hàng khi ứng dụng ngân hàng của mình đã báo cộng tiền thực tế.`;

    const u = new SpeechSynthesisUtterance(speechScript);
    u.lang = 'vi-VN';
    u.rate = 0.85;
    u.onend = () => setIsPlayingAudio(false);
    u.onerror = () => setIsPlayingAudio(false);
    window.speechSynthesis.speak(u);
    setIsPlayingAudio(true);
  };

  // Generate Image and Share via Native Phone Share Sheet (Zalo, Messenger, SMS, etc.)
  const handleShareImage = async () => {
    setIsGeneratingImage(true);
    try {
      const { blob, dataUrl } = await generateSafetyCardPosterBlob();
      const imageFile = new File([blob], 'The_An_Toan_So_Bo_Tui.png', { type: 'image/png' });

      // Check if native Web Share API with files is supported (mobile phones)
      if (navigator.canShare && navigator.canShare({ files: [imageFile] })) {
        try {
          await navigator.share({
            title: '🛡️ Thẻ An Toàn Số Bỏ Túi - 6 Lời Dặn Cho Gia Đình',
            text: '6 lời dặn an toàn phòng chống lừa đảo trực tuyến cho Ông Bà & Bố Mẹ!',
            files: [imageFile]
          });
          showToast('Đã mở bảng chia sẻ ứng dụng trên điện thoại!');
          return;
        } catch (shareErr: any) {
          if (shareErr.name !== 'AbortError') {
            console.log('Share canceled or fallback needed:', shareErr);
          }
        }
      }

      // Fallback if browser doesn't support file sharing: Trigger direct download
      triggerDownload(dataUrl, 'The_An_Toan_So_Bo_Tui.png');
      showToast('Đã tải ảnh Thẻ An Toàn HD về máy để gửi qua Zalo/Messenger!');
    } catch (err) {
      console.error('Error generating card poster:', err);
      handleCopyText();
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleDownloadWallpaper = async () => {
    setIsGeneratingImage(true);
    try {
      const { dataUrl } = await generateSafetyCardPosterBlob();
      triggerDownload(dataUrl, 'The_An_Toan_So_Hinh_Nen_Dien_Thoai.png');
      showToast('Đã tải ảnh HD tỷ lệ 9:16 - Hãy cài làm hình nền cho bố mẹ/ông bà nhé!');
    } catch (err) {
      console.error('Error downloading wallpaper:', err);
      showToast('Lỗi khi xuất ảnh, vui lòng thử lại.');
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const triggerDownload = (dataUrl: string, filename: string) => {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleCopyText = () => {
    const text = `🛡️ 6 LỜI DẶN AN TOÀN SỐ BỎ TÚI CHO GIA ĐÌNH:
1. CÔNG AN KHÔNG GỌI ĐIỆN DỌA BẮT: Không làm việc qua Zalo, không đòi chuyển tiền vào tài khoản bảo chứng.
2. KHÔNG CÀI FILE .APK LẠ: Chỉ cài app từ Google Play / App Store.
3. KHÔNG ĐỌC MÃ OTP: Mã OTP là chìa khóa két sắt cá nhân.
4. HỎI MƯỢN TIỀN: Gọi lại số điện thoại SIM thật để nghe giọng.
5. BÁO CON CẤP CỨU: Gọi ngay nhà trường và bệnh viện xác minh.
6. CHỈ GIAO HÀNG KHI APP BÁO CỘNG TIỀN: Không tin ảnh chụp màn hình Fake Bill.
---
🚨 Tổng đài khẩn cấp: 1800 6666 (NCSC) - 113 (Cảnh sát)`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setIsCopied(true);
      showToast('Đã sao chép 6 lời dặn vào bộ nhớ tạm!');
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-slate-950 border border-slate-800 rounded-t-3xl sm:rounded-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-cyan-950/80 via-slate-900 to-slate-950 border-b border-cyan-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Heart className="w-6 h-6 text-rose-400 fill-rose-400/20" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-base font-black text-white">THẺ AN TOÀN SỐ BỎ TÚI</h2>
                <span className="text-[10px] bg-cyan-500 text-slate-950 font-black px-1.5 py-0.5 rounded">
                  GIA ĐÌNH
                </span>
              </div>
              <p className="text-xs text-cyan-300">
                6 lời dặn ngắn gọn cho Ông Bà, Bố Mẹ & Con Cháu
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              if (isPlayingAudio && 'speechSynthesis' in window) {
                window.speechSynthesis.cancel();
              }
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action notification toast */}
        {shareSuccessMessage && (
          <div className="px-4 py-2 bg-emerald-500/20 border-b border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{shareSuccessMessage}</span>
          </div>
        )}

        {/* Audio narration bar & Copy Quick Action */}
        <div className="p-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-2">
          <button
            onClick={handleSpeakAll}
            className={`flex-1 px-3 py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
              isPlayingAudio 
                ? 'bg-rose-500 text-white animate-pulse' 
                : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-md shadow-cyan-500/20'
            }`}
          >
            {isPlayingAudio ? (
              <>
                <VolumeX className="w-4 h-4" />
                <span>Dừng đọc to</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4" />
                <span>Đọc to 6 lời dặn bằng giọng nói</span>
              </>
            )}
          </button>

          <button
            onClick={handleCopyText}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5 border border-slate-700 active:scale-95 transition-all shrink-0"
          >
            {isCopied ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Đã chép text!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-300" />
                <span>Sao chép text</span>
              </>
            )}
          </button>
        </div>

        {/* Rules Cards List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {POCKET_SAFETY_CARD_RULES.map((rule) => (
            <div
              key={rule.number}
              className={`p-3.5 rounded-2xl bg-gradient-to-r ${rule.color} border transition-all shadow-md`}
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-950/70 border border-white/10 flex items-center justify-center font-black text-sm text-white shrink-0 shadow-inner">
                  {rule.number}
                </div>
                <div>
                  <h3 className="text-sm font-black tracking-wide text-white">
                    {rule.title}
                  </h3>
                  <p className="text-xs text-slate-200 mt-1 leading-relaxed">
                    {rule.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Practical Tips for Children & Grandchildren */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/40 border border-cyan-500/30 space-y-3 shadow-lg">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <h4 className="text-xs font-black text-white uppercase tracking-wide">
                4 Hành Động Thiết Thực Dành Cho Con Cháu:
              </h4>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                <Smartphone className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-cyan-300 block font-bold">1. Đặt làm hình nền khóa điện thoại</strong>
                  <span className="text-slate-300 text-[11px] leading-relaxed">
                    Bấm tải ảnh thẻ HD bên dưới và cài làm hình nền khóa cho máy ông bà/bố mẹ để mỗi lần mở máy đều nhìn thấy lời dặn.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                <KeyRound className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-amber-300 block font-bold">2. Quy ước "Mật khẩu gia đình"</strong>
                  <span className="text-slate-300 text-[11px] leading-relaxed">
                    Đặt một từ khóa bí mật (ví dụ tên một món ăn, ngày đặc biệt). Nếu ai gọi điện/video dọa án hoặc mượn tiền mà không nói đúng mật khẩu thì 100% là Deepfake lừa đảo!
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                <PhoneCall className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-emerald-300 block font-bold">3. Cài phím gọi khẩn cấp SOS</strong>
                  <span className="text-slate-300 text-[11px] leading-relaxed">
                    Lưu số điện thoại của con cháu vào phím gọi nhanh số 1 hoặc gắn biểu tượng gọi nhanh ngoài màn hình chính của người lớn tuổi.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                <MessageCircle className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-purple-300 block font-bold">4. Gửi vào nhóm Zalo gia đình</strong>
                  <span className="text-slate-300 text-[11px] leading-relaxed">
                    Chia sẻ ảnh thẻ an toàn vào nhóm gia đình để cả nhà cùng bàn luận và cảnh giác trước các thủ đoạn mới.
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Action Buttons for Grandchildren */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={handleDownloadWallpaper}
                disabled={isGeneratingImage}
                className="p-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all"
              >
                <ImageIcon className="w-4 h-4 text-cyan-400" />
                <span>Tải ảnh hình nền HD</span>
              </button>

              <button
                onClick={handleCopyText}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all"
              >
                {isCopied ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Đã sao chép!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Sao chép tin nhắn</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-950 flex items-center gap-2">
          <button
            onClick={handleShareImage}
            disabled={isGeneratingImage}
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-md shadow-cyan-500/20 active:scale-[0.98] transition-all"
          >
            <Share2 className="w-4 h-4" />
            <span>Chia sẻ ảnh cảnh báo (Zalo / Tin nhắn)</span>
          </button>

          <button
            onClick={() => {
              if (isPlayingAudio && 'speechSynthesis' in window) {
                window.speechSynthesis.cancel();
              }
              onClose();
            }}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

