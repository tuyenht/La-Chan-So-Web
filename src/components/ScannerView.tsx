import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, 
  Upload, 
  Globe2, 
  MessageSquareWarning, 
  CreditCard, 
  Smartphone, 
  PhoneCall, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Volume2, 
  Copy, 
  RotateCcw, 
  ArrowRight,
  ShieldCheck,
  ShieldAlert,
  Send,
  Loader2,
  Lock,
  Search,
  PlusCircle,
  FileSearch,
  ExternalLink,
  Mic,
  MicOff,
  Radio,
  QrCode,
  PhoneForwarded,
  Activity,
  Binary,
  Layers,
  HelpCircle,
  Share2
} from 'lucide-react';
import { 
  ScannerSubTab, 
  ImageAnalysisResult, 
  UrlCheckResult, 
  SmsAnalysisResult, 
  CallAnalysisResult, 
  BlacklistAccount, 
  ElderSettings,
  QrScanResult,
  PhoneLookupResult,
  DeepfakeLabResult
} from '../types';
import { INITIAL_BLACKLIST_ACCOUNTS, THREAT_PHONE_DATABASE } from '../data/mockData';
import { BankLogo } from './BankLogo';

interface ScannerViewProps {
  initialSubTab?: ScannerSubTab;
  settings: ElderSettings;
  onNavigateToReport: (data?: { type: string; value: string; desc: string }) => void;
}

export const ScannerView: React.FC<ScannerViewProps> = ({
  initialSubTab = 'image',
  settings,
  onNavigateToReport
}) => {
  const [activeSubTab, setActiveSubTab] = useState<ScannerSubTab>(initialSubTab);

  // 1. Image state
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isImageAnalyzing, setIsImageAnalyzing] = useState(false);
  const [imageResult, setImageResult] = useState<ImageAnalysisResult | null>(null);
  const [imagePromptNote, setImagePromptNote] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // 2. QR Code state
  const [qrText, setQrText] = useState('');
  const [qrImagePreview, setQrImagePreview] = useState<string | null>(null);
  const [isQrAnalyzing, setIsQrAnalyzing] = useState(false);
  const [qrResult, setQrResult] = useState<QrScanResult | null>(null);
  const qrFileInputRef = useRef<HTMLInputElement>(null);

  // 3. Call Screener state
  const [callTranscript, setCallTranscript] = useState('');
  const [callerPhoneInput, setCallerPhoneInput] = useState('');
  const [isCallAnalyzing, setIsCallAnalyzing] = useState(false);
  const [callResult, setCallResult] = useState<CallAnalysisResult | null>(null);

  // 4. Phone Lookup state
  const [phoneLookupInput, setPhoneLookupInput] = useState('');
  const [isPhoneLookingUp, setIsPhoneLookingUp] = useState(false);
  const [phoneLookupResult, setPhoneLookupResult] = useState<PhoneLookupResult | null>(null);

  // 5. Deepfake Lab state
  const [deepfakeDesc, setDeepfakeDesc] = useState('');
  const [deepfakeAudioTranscript, setDeepfakeAudioTranscript] = useState('');
  const [isDeepfakeAnalyzing, setIsDeepfakeAnalyzing] = useState(false);
  const [deepfakeResult, setDeepfakeResult] = useState<DeepfakeLabResult | null>(null);

  // 6. SMS/Chat state
  const [smsText, setSmsText] = useState('');
  const [smsSource, setSmsSource] = useState<'sms' | 'zalo' | 'tele'>('sms');
  const [isSmsAnalyzing, setIsSmsAnalyzing] = useState(false);
  const [smsResult, setSmsResult] = useState<SmsAnalysisResult | null>(null);

  // 7. URL state
  const [urlInput, setUrlInput] = useState('');
  const [isUrlAnalyzing, setIsUrlAnalyzing] = useState(false);
  const [urlResult, setUrlResult] = useState<UrlCheckResult | null>(null);

  // 8. Bank Account state
  const [bankQuery, setBankQuery] = useState('');
  const [blacklistList, setBlacklistList] = useState<BlacklistAccount[]>(INITIAL_BLACKLIST_ACCOUNTS);
  const [bankSearchResult, setBankSearchResult] = useState<{ found: boolean; account?: BlacklistAccount } | null>(null);
  const [showAddBankModal, setShowAddBankModal] = useState(false);
  const [newAccNumber, setNewAccNumber] = useState('');
  const [newBankName, setNewBankName] = useState('Vietcombank');
  const [newAccHolder, setNewAccHolder] = useState('');
  const [newScamType, setNewScamType] = useState('Lừa đảo chuyển tiền mua hàng / Việc làm');

  // 9. APK Inspector state
  const [apkFileName, setApkFileName] = useState('');
  const [apkResult, setApkResult] = useState<any>(null);
  const [isApkScanning, setIsApkScanning] = useState(false);

  // Voice narration helper
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'vi-VN';
      u.rate = 0.9;
      window.speechSynthesis.speak(u);
    }
  };

  useEffect(() => {
    if (initialSubTab) {
      setActiveSubTab(initialSubTab);
    }
  }, [initialSubTab]);

  // Handle Image File Selection
  const handleImageFile = (file: File) => {
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
      setImageResult(null);
    };
    reader.readAsDataURL(file);
  };

  const handlePasteImage = (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        if (file) handleImageFile(file);
      }
    }
  };

  // 1. Analyze Image
  const handleAnalyzeImage = async () => {
    if (!imagePreview) return;
    setIsImageAnalyzing(true);
    setImageResult(null);

    try {
      const res = await fetch('/api/analyze-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: imagePreview,
          userPrompt: imagePromptNote
        })
      });

      const json = await res.json();
      if (json.success && json.data) {
        setImageResult(json.data);
        if (settings.autoReadAloud && json.data.elderSafetyTip) {
          speakText(json.data.elderSafetyTip);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsImageAnalyzing(false);
    }
  };

  // 2. Analyze QR Code
  const handleScanQr = async () => {
    if (!qrText.trim() && !qrImagePreview) return;
    setIsQrAnalyzing(true);
    setQrResult(null);

    try {
      const res = await fetch('/api/analyze-qr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          qrContent: qrText,
          imageBase64: qrImagePreview
        })
      });

      const json = await res.json();
      if (json.success && json.data) {
        setQrResult(json.data);
        if (settings.autoReadAloud && json.data.recommendation) {
          speakText(json.data.recommendation);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsQrAnalyzing(false);
    }
  };

  // 3. Analyze Call
  const handleAnalyzeCall = async () => {
    if (!callTranscript.trim()) return;
    setIsCallAnalyzing(true);
    setCallResult(null);

    try {
      const res = await fetch('/api/analyze-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transcript: callTranscript,
          callerPhone: callerPhoneInput
        })
      });

      const json = await res.json();
      if (json.success && json.data) {
        setCallResult(json.data);
        if (settings.autoReadAloud && json.data.alertVoiceSpoken) {
          speakText(json.data.alertVoiceSpoken);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsCallAnalyzing(false);
    }
  };

  // 4. Lookup Phone
  const handlePhoneLookup = async () => {
    if (!phoneLookupInput.trim()) return;
    setIsPhoneLookingUp(true);
    setPhoneLookupResult(null);

    try {
      const res = await fetch('/api/lookup-phone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: phoneLookupInput })
      });

      const json = await res.json();
      if (json.success && json.data) {
        setPhoneLookupResult(json.data);
        if (settings.autoReadAloud && json.data.elderAdvice) {
          speakText(json.data.elderAdvice);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsPhoneLookingUp(false);
    }
  };

  // 5. Deepfake Lab Analyze
  const handleAnalyzeDeepfake = async () => {
    if (!deepfakeDesc.trim() && !deepfakeAudioTranscript.trim()) return;
    setIsDeepfakeAnalyzing(true);
    setDeepfakeResult(null);

    try {
      const res = await fetch('/api/analyze-deepfake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userDescription: deepfakeDesc,
          audioTranscript: deepfakeAudioTranscript
        })
      });

      const json = await res.json();
      if (json.success && json.data) {
        setDeepfakeResult(json.data);
        if (settings.autoReadAloud && json.data.elderAudioVoiceExplain) {
          speakText(json.data.elderAudioVoiceExplain);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeepfakeAnalyzing(false);
    }
  };

  // 6. Analyze SMS
  const handleAnalyzeSms = async () => {
    if (!smsText.trim()) return;
    setIsSmsAnalyzing(true);
    setSmsResult(null);

    try {
      const res = await fetch('/api/analyze-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: smsText,
          source: smsSource
        })
      });

      const json = await res.json();
      if (json.success && json.data) {
        setSmsResult(json.data);
        if (settings.autoReadAloud && json.data.simpleAudioVoiceGuide) {
          speakText(json.data.simpleAudioVoiceGuide);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSmsAnalyzing(false);
    }
  };

  // 7. Analyze URL
  const handleAnalyzeUrl = async () => {
    if (!urlInput.trim()) return;
    setIsUrlAnalyzing(true);
    setUrlResult(null);

    try {
      const res = await fetch('/api/analyze-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: urlInput })
      });

      const json = await res.json();
      if (json.success && json.data) {
        setUrlResult(json.data);
        if (settings.autoReadAloud && json.data.recommendation) {
          speakText(json.data.recommendation);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUrlAnalyzing(false);
    }
  };

  // 8. Search Bank
  const handleSearchBank = () => {
    const clean = bankQuery.trim().toLowerCase();
    if (!clean) return;

    const found = blacklistList.find(
      acc => acc.accountNumber.toLowerCase().includes(clean) ||
             acc.accountHolder.toLowerCase().includes(clean)
    );

    if (found) {
      setBankSearchResult({ found: true, account: found });
      if (settings.autoReadAloud) {
        speakText(`Cảnh báo! Số tài khoản ${found.accountNumber} nằm trong danh sách đen lừa đảo với ${found.reportsCount} lượt tố cáo.`);
      }
    } else {
      setBankSearchResult({ found: false });
      if (settings.autoReadAloud) {
        speakText('Số tài khoản này chưa có trong danh sách đen, nhưng bác vẫn cần cẩn thận đối chiếu tên chính chủ trước khi chuyển nhé.');
      }
    }
  };

  // 9. Scan APK
  const handleScanApk = (name: string) => {
    setApkFileName(name);
    setIsApkScanning(true);
    setApkResult(null);

    setTimeout(() => {
      const isMalicious = name.toLowerCase().includes('vneid') || name.toLowerCase().includes('chinhphu') || name.toLowerCase().includes('thue');
      setApkResult({
        appName: name,
        isMalicious: isMalicious,
        dangerLevel: isMalicious ? 'CỰC KỲ NGUY HIỂM' : 'AN TOÀN',
        dangerousPermissions: isMalicious ? [
          'android.permission.BIND_ACCESSIBILITY_SERVICE (Quyền trợ năng - Tự bấm màn hình chuyển tiền)',
          'android.permission.RECEIVE_SMS (Đọc trộm mã OTP ngân hàng)',
          'android.permission.SYSTEM_ALERT_WINDOW (Lớp phủ màn hình giả mạo)'
        ] : ['android.permission.INTERNET (Kết nối mạng cơ bản)'],
        verdict: isMalicious 
          ? 'MÃ ĐỘC CHIẾM QUYỀN ĐIỆN THOẠI! Tệp APK này mạo danh Cổng Dịch Vụ Công/VNeID để đánh cắp tiền trong tài khoản.'
          : 'Gói ứng dụng không chứa quyền can thiệp sâu nguy hiểm.'
      });
      setIsApkScanning(false);
      if (settings.autoReadAloud && isMalicious) {
        speakText('Cảnh báo nguy hiểm! Tệp này chứa mã độc cướp quyền điện thoại. Hãy gỡ cài đặt và bật chế độ máy bay ngay lập tức!');
      }
    }, 1200);
  };

  return (
    <div onPaste={handlePasteImage} className={`p-4 space-y-4 pb-24 ${settings.isElderMode ? 'text-base' : 'text-sm'}`}>
      
      {/* ------------------------------------------------------------- */}
      {/* SUB-TABS NAVIGATION (9 High-Impact Tools)                     */}
      {/* ------------------------------------------------------------- */}
      <div className="overflow-x-auto scrollbar-none pb-1">
        <div className="flex gap-1.5 p-1 bg-slate-900/90 rounded-2xl border border-slate-800 min-w-max">
          <button
            onClick={() => setActiveSubTab('image')}
            className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
              activeSubTab === 'image'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Soi Ảnh/Bill</span>
          </button>

          <button
            onClick={() => setActiveSubTab('qr')}
            className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
              activeSubTab === 'qr'
                ? 'bg-teal-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Soi Mã QR</span>
          </button>

          <button
            onClick={() => setActiveSubTab('call')}
            className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
              activeSubTab === 'call'
                ? 'bg-rose-500 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Soi Cuộc Gọi</span>
          </button>

          <button
            onClick={() => setActiveSubTab('phone_lookup')}
            className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
              activeSubTab === 'phone_lookup'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <PhoneForwarded className="w-3.5 h-3.5" />
            <span>Tra Cứu SĐT</span>
          </button>

          <button
            onClick={() => setActiveSubTab('deepfake_lab')}
            className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
              activeSubTab === 'deepfake_lab'
                ? 'bg-purple-500 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Lab Deepfake</span>
          </button>

          <button
            onClick={() => setActiveSubTab('sms')}
            className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
              activeSubTab === 'sms'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <MessageSquareWarning className="w-3.5 h-3.5" />
            <span>Tin Nhắn</span>
          </button>

          <button
            onClick={() => setActiveSubTab('url')}
            className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
              activeSubTab === 'url'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Globe2 className="w-3.5 h-3.5" />
            <span>Check Link</span>
          </button>

          <button
            onClick={() => setActiveSubTab('bank')}
            className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
              activeSubTab === 'bank'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Sổ Đen STK</span>
          </button>

          <button
            onClick={() => setActiveSubTab('apk')}
            className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
              activeSubTab === 'apk'
                ? 'bg-indigo-500 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Soi App APK</span>
          </button>
        </div>
      </div>

      {/* ============================================================= */}
      {/* 1. SUB-TAB: IMAGE & FAKE BILL SCANNER                         */}
      {/* ============================================================= */}
      {activeSubTab === 'image' && (
        <div className="space-y-4">
          <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Camera className="w-5 h-5 text-cyan-400" />
              Soi Ảnh, Bill Ngân Hàng & Giấy Triệu Tập
            </h2>
            <p className="text-xs text-slate-400">
              AI OCR quét chữ, phát hiện font số giả mạo, dấu đỏ cơ quan ghép và hóa đơn biến động ảo
            </p>

            {imagePreview ? (
              <div className="relative rounded-2xl overflow-hidden border border-cyan-500/40 bg-slate-950 flex flex-col items-center justify-center p-2">
                <img 
                  src={imagePreview} 
                  alt="Ảnh thẩm định" 
                  className="max-h-64 object-contain rounded-xl"
                />
                <button
                  onClick={() => { setImagePreview(null); setImageResult(null); }}
                  className="absolute top-3 right-3 px-3 py-1 bg-slate-900/80 hover:bg-slate-800 text-rose-400 text-xs font-bold rounded-lg border border-slate-700"
                >
                  Xóa ảnh
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => cameraInputRef.current?.click()}
                  className="p-5 rounded-2xl bg-gradient-to-br from-cyan-950/60 to-slate-900 border-2 border-dashed border-cyan-500/50 hover:border-cyan-400 flex flex-col items-center justify-center gap-2 text-center active:scale-95 transition-all"
                >
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                    <Camera className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-white">Chụp Bằng Camera</span>
                  <span className="text-[10px] text-slate-400">Chụp giấy tờ, bill chuyển tiền</span>
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border-2 border-dashed border-slate-700 hover:border-slate-500 flex flex-col items-center justify-center gap-2 text-center active:scale-95 transition-all"
                >
                  <div className="w-12 h-12 rounded-2xl bg-slate-800 text-slate-300 flex items-center justify-center">
                    <Upload className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-white">Tải Ảnh Từ Máy</span>
                  <span className="text-[10px] text-slate-400">Hỗ trợ dán ảnh (Ctrl+V)</span>
                </button>

                <input 
                  type="file" 
                  accept="image/*" 
                  capture="environment"
                  ref={cameraInputRef} 
                  onChange={(e) => e.target.files?.[0] && handleImageFile(e.target.files[0])}
                  className="hidden" 
                />
                <input 
                  type="file" 
                  accept="image/*" 
                  ref={fileInputRef} 
                  onChange={(e) => e.target.files?.[0] && handleImageFile(e.target.files[0])}
                  className="hidden" 
                />
              </div>
            )}

            {imagePreview && (
              <button
                onClick={handleAnalyzeImage}
                disabled={isImageAnalyzing}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 active:scale-[0.98] transition-all"
              >
                {isImageAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>AI Đang Phân Tích Pixel & OCR Chữ...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>BẮT ĐẦU THẨM ĐỊNH ẢNH</span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Image Result */}
          {imageResult && (
            <div className={`p-4 rounded-3xl border-2 space-y-4 ${
              imageResult.isScam 
                ? 'bg-gradient-to-b from-rose-950/70 via-slate-900 to-slate-950 border-rose-500/60 shadow-xl' 
                : 'bg-gradient-to-b from-emerald-950/70 via-slate-900 to-slate-950 border-emerald-500/60 shadow-xl'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {imageResult.isScam ? (
                    <ShieldAlert className="w-7 h-7 text-rose-400 animate-bounce" />
                  ) : (
                    <ShieldCheck className="w-7 h-7 text-emerald-400" />
                  )}
                  <div>
                    <h3 className="text-sm font-black text-white">
                      {imageResult.isScam ? 'CẢNH BÁO NGUY HIỂM / LÀM GIẢ' : 'HÌNH ẢNH AN TOÀN'}
                    </h3>
                    <span className="text-xs text-slate-400">{imageResult.scamType}</span>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-xl text-xs font-black ${
                  imageResult.threatScore > 70 ? 'bg-rose-500 text-white' : 'bg-emerald-500 text-slate-950'
                }`}>
                  {imageResult.threatScore}/100
                </span>
              </div>

              {imageResult.elderSafetyTip && (
                <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5">
                  <Volume2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs text-amber-300 font-bold block mb-0.5">Lời dặn dễ hiểu cho Ông Bà:</strong>
                    <p className="text-xs text-slate-200">{imageResult.elderSafetyTip}</p>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Dấu Hiệu Bất Thường:</h4>
                <div className="space-y-1.5">
                  {imageResult.detectedRedFlags.map((flag, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-rose-300 flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <span>{flag}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => onNavigateToReport({ type: 'image', value: 'Bằng chứng ảnh', desc: `${imageResult.scamType}: ${imageResult.tacticsAnalysis}` })}
                  className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <ShieldAlert className="w-4 h-4" />
                  <span>Tố Giác Bằng Chứng Này</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============================================================= */}
      {/* 2. SUB-TAB: QR CODE & VIETQR SCANNER                          */}
      {/* ============================================================= */}
      {activeSubTab === 'qr' && (
        <div className="space-y-4">
          <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <QrCode className="w-5 h-5 text-teal-400" />
              Soi Mã QR & VietQR Chống Dán Đè
            </h2>
            <p className="text-xs text-slate-400">
              Phát hiện mã QR bị dán đè tại quầy thu ngân, QR giả mạo dẫn link tải app mã độc hoặc sàn ảo
            </p>

            <div className="space-y-2">
              {qrImagePreview ? (
                <div className="relative rounded-2xl overflow-hidden border border-teal-500/40 bg-slate-950 p-2 flex flex-col items-center">
                  <img src={qrImagePreview} alt="Mã QR" className="max-h-48 rounded-xl object-contain" />
                  <button
                    onClick={() => setQrImagePreview(null)}
                    className="mt-2 text-xs text-rose-400 font-bold hover:underline"
                  >
                    Đổi ảnh QR khác
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => qrFileInputRef.current?.click()}
                  className="w-full py-4 rounded-2xl bg-slate-950 border-2 border-dashed border-slate-700 hover:border-teal-500 flex flex-col items-center justify-center gap-1.5 text-slate-300 active:scale-98 transition-all"
                >
                  <QrCode className="w-8 h-8 text-teal-400" />
                  <span className="text-xs font-bold text-white">Chọn hoặc Chụp Ảnh Mã QR</span>
                  <span className="text-[10px] text-slate-400">Hỗ trợ mã VietQR, ZaloPay, MoMo, App Link</span>
                </button>
              )}

              <input
                type="file"
                accept="image/*"
                ref={qrFileInputRef}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const r = new FileReader();
                    r.onload = (ev) => setQrImagePreview(ev.target?.result as string);
                    r.readAsDataURL(file);
                  }
                }}
                className="hidden"
              />

              <div className="pt-2">
                <input
                  type="text"
                  placeholder="Hoặc dán chuỗi ký tự mã QR / Link QR vào đây..."
                  value={qrText}
                  onChange={(e) => setQrText(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                />
              </div>

              <button
                onClick={handleScanQr}
                disabled={isQrAnalyzing || (!qrText && !qrImagePreview)}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-400 hover:from-teal-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {isQrAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Đang Giám Định Mã QR...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>GIÁM ĐỊNH MÃ QR NGAY</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* QR Result */}
          {qrResult && (
            <div className={`p-4 rounded-3xl border-2 space-y-3 ${
              !qrResult.isSafe ? 'bg-rose-950/60 border-rose-500' : 'bg-emerald-950/40 border-emerald-500'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {!qrResult.isSafe ? (
                    <ShieldAlert className="w-6 h-6 text-rose-400 animate-bounce" />
                  ) : (
                    <ShieldCheck className="w-6 h-6 text-emerald-400" />
                  )}
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      {qrResult.isSafe ? 'MÃ QR AN TOÀN' : 'CẢNH BÁO MÃ QR NGUY HIỂM'}
                    </h3>
                    <span className="text-xs text-slate-400">Loại: {qrResult.type}</span>
                  </div>
                </div>
                <span className="text-xs font-black px-2.5 py-1 rounded-xl bg-slate-900 text-white">
                  Rủi ro: {qrResult.threatScore}/100
                </span>
              </div>

              {qrResult.vietQrData && (
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3 text-xs">
                  <BankLogo 
                    code={qrResult.vietQrData.bankCode || 'VCB'} 
                    name={qrResult.vietQrData.bankName} 
                    variant="wide"
                    size="md" 
                  />
                  <div className="flex-1 space-y-1">
                    <div className="text-teal-400 font-bold">Thông tin tài khoản thụ hưởng (VietQR):</div>
                    <div className="text-slate-200">Ngân hàng: <strong>{qrResult.vietQrData.bankName || qrResult.vietQrData.bankCode}</strong></div>
                    <div className="text-slate-200">Số tài khoản: <strong>{qrResult.vietQrData.accountNumber}</strong></div>
                    <div className="text-slate-200">Chủ tài khoản: <strong>{qrResult.vietQrData.accountHolder}</strong></div>
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                {qrResult.detectedRisks.map((risk, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-950/80 text-xs text-rose-300 flex items-center gap-2 border border-slate-800">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>{risk}</span>
                  </div>
                ))}
              </div>

              <p className="text-xs text-slate-200 font-semibold bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
                👉 Lời khuyên: {qrResult.recommendation}
              </p>
            </div>
          )}
        </div>
      )}

      {/* ============================================================= */}
      {/* 3. SUB-TAB: CALL SCREENER & SCAM TACTICS                      */}
      {/* ============================================================= */}
      {activeSubTab === 'call' && (
        <div className="space-y-4">
          <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <PhoneCall className="w-5 h-5 text-rose-400" />
              Soi Cuộc Gọi & Kịch Bản Đe Dọa
            </h2>
            <p className="text-xs text-slate-400">
              Nhận diện kịch bản mạo danh Công An dọa án ma túy, báo con cấp cứu viện phí, hoặc dọa khóa SIM 2 tiếng
            </p>

            <div className="space-y-2">
              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">Số điện thoại gọi đến (nếu có):</label>
                <input
                  type="text"
                  placeholder="Ví dụ: 024.3825.xxxx hoặc +224..."
                  value={callerPhoneInput}
                  onChange={(e) => setCallerPhoneInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">Nội dung đối tượng vừa nói qua điện thoại:</label>
                <textarea
                  rows={3}
                  placeholder="Ví dụ: 'Tôi là đại úy Nam ở Cục Cảnh sát C02, bác đang liên quan đường dây ma túy rửa tiền 5 tỷ, yêu cầu chuyển tiền vào tài khoản bảo chứng...'"
                  value={callTranscript}
                  onChange={(e) => setCallTranscript(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                />
              </div>

              {/* Sample quick buttons */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setCallerPhoneInput('024.3825.xxxx');
                    setCallTranscript('Tôi là cán bộ điều tra Bộ Công An. Số CCCD của bác đang dính vào đường dây ma túy 5 tỷ, cấm nói cho con cháu và chuyển tiền vào tài khoản bảo chứng gấp!');
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 text-[10px] text-rose-300 hover:bg-slate-700 border border-slate-700"
                >
                  Mẫu: Giả Công An dọa bắt
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCallerPhoneInput('0903.xxx.xxx');
                    setCallTranscript('Alo bố à, con đang cấp cứu ở bệnh viện Chợ Rẫy cần 30 triệu mổ gấp, bố chuyển ngay vào số tài khoản bác sĩ này nhé!');
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 text-[10px] text-amber-300 hover:bg-slate-700 border border-slate-700"
                >
                  Mẫu: Con đang cấp cứu
                </button>
              </div>

              <button
                onClick={handleAnalyzeCall}
                disabled={isCallAnalyzing || !callTranscript.trim()}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-600/25 active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {isCallAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>AI Đang Nhận Diện Kịch Bản Đe Dọa...</span>
                  </>
                ) : (
                  <>
                    <PhoneCall className="w-5 h-5" />
                    <span>SOI CUỘC GỌI NGAY</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Call Result */}
          {callResult && (
            <div className={`p-4 rounded-3xl border-2 space-y-3 ${
              callResult.isDangerousCall ? 'bg-rose-950/80 border-rose-500' : 'bg-emerald-950/40 border-emerald-500'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {callResult.isDangerousCall ? (
                    <ShieldAlert className="w-7 h-7 text-rose-400 animate-bounce" />
                  ) : (
                    <ShieldCheck className="w-7 h-7 text-emerald-400" />
                  )}
                  <div>
                    <h3 className="text-sm font-black text-white">{callResult.dangerLevel}: {callResult.scamScenario}</h3>
                    <p className="text-xs text-rose-300 font-bold">{callResult.immediateAction}</p>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950 border border-rose-500/40 text-xs text-slate-200">
                <strong className="text-rose-400 block mb-1">Cảnh báo giọng nói:</strong>
                {callResult.alertVoiceSpoken}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============================================================= */}
      {/* 4. SUB-TAB: PHONE NUMBER & PREFIX LOOKUP                      */}
      {/* ============================================================= */}
      {activeSubTab === 'phone_lookup' && (
        <div className="space-y-4">
          <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <PhoneForwarded className="w-5 h-5 text-amber-400" />
              Tra Cứu Đầu Số & SĐT Lừa Đảo / Hút Cước
            </h2>
            <p className="text-xs text-slate-400">
              Tra cứu số điện thoại lạ, đầu số vệ tinh quốc tế (+224, +231, +252, +881) nháy máy lừa gọi lại trừ tiền
            </p>

            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Nhập số điện thoại (ví dụ: +224..., 024.xxx, 098...)"
                  value={phoneLookupInput}
                  onChange={(e) => setPhoneLookupInput(e.target.value)}
                  className="flex-1 px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
                <button
                  onClick={handlePhoneLookup}
                  disabled={isPhoneLookingUp || !phoneLookupInput.trim()}
                  className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 disabled:opacity-50"
                >
                  {isPhoneLookingUp ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                  <span>Tra Cứu</span>
                </button>
              </div>

              {/* Known threat prefixes quick list */}
              <div className="space-y-1.5 pt-2">
                <span className="text-[11px] font-semibold text-slate-400 block">Đầu số vệ tinh quốc tế tuyệt đối KHÔNG gọi lại:</span>
                <div className="grid grid-cols-2 gap-1.5">
                  {THREAT_PHONE_DATABASE.slice(0, 4).map((t, idx) => (
                    <button
                      key={idx}
                      onClick={() => setPhoneLookupInput(t.prefix)}
                      className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-left text-[11px] text-slate-300 flex items-center justify-between"
                    >
                      <strong className="text-rose-400">{t.prefix}</strong>
                      <span className="text-[10px] text-slate-400">{t.country}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Phone Result */}
          {phoneLookupResult && (
            <div className={`p-4 rounded-3xl border-2 space-y-3 ${
              phoneLookupResult.riskLevel === 'DANGER' ? 'bg-rose-950/70 border-rose-500' : 'bg-slate-900 border-slate-800'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black text-white">{phoneLookupResult.phoneNumber}</h3>
                  <span className="text-xs text-slate-400">Khu vực: {phoneLookupResult.carrierOrCountry}</span>
                </div>
                <span className={`text-xs font-black px-2.5 py-1 rounded-xl ${
                  phoneLookupResult.riskLevel === 'DANGER' ? 'bg-rose-500 text-white' : 'bg-amber-500 text-slate-950'
                }`}>
                  {phoneLookupResult.riskLevel} ({phoneLookupResult.threatScore}/100)
                </span>
              </div>

              <div className="flex flex-wrap gap-1">
                {phoneLookupResult.tags.map((tag, idx) => (
                  <span key={idx} className="text-[10px] bg-slate-950 text-rose-300 px-2 py-0.5 rounded-md border border-slate-800">
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-xs text-slate-200 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                💡 {phoneLookupResult.elderAdvice}
              </p>
            </div>
          )}
        </div>
      )}

      {/* ============================================================= */}
      {/* 5. SUB-TAB: DEEPFAKE FORENSIC LAB (AI Vision & Spectral)       */}
      {/* ============================================================= */}
      {activeSubTab === 'deepfake_lab' && (
        <div className="space-y-4">
          <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-purple-400" />
              Phòng Giám Định Pháp Y Deepfake AI & Giọng Nói
            </h2>
            <p className="text-xs text-slate-400">
              Phân tích độ lệch phổ âm thanh, bất thường chớp mắt, lệch khẩu hình môi và ánh sáng viền khuôn mặt
            </p>

            <div className="space-y-2">
              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">Mô tả cuộc gọi video hoặc âm thanh nghi vấn:</label>
                <textarea
                  rows={2}
                  placeholder="Ví dụ: 'Cuộc gọi video Facebook từ tài khoản con gái đang du học, hình ảnh cử động giật giật, miệng nói không khớp tiếng, gọi 10 giây rồi tắt giục chuyển 20 triệu...'"
                  value={deepfakeDesc}
                  onChange={(e) => setDeepfakeDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              <button
                onClick={handleAnalyzeDeepfake}
                disabled={isDeepfakeAnalyzing || !deepfakeDesc.trim()}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-600/25 active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {isDeepfakeAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>AI Đang Phân Tích Dấu Vết Pháp Y...</span>
                  </>
                ) : (
                  <>
                    <Binary className="w-5 h-5" />
                    <span>GIÁM ĐỊNH PHÁP Y DEEPFAKE</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Deepfake Result */}
          {deepfakeResult && (
            <div className={`p-4 rounded-3xl border-2 space-y-3 ${
              deepfakeResult.isDeepfake ? 'bg-purple-950/70 border-purple-500' : 'bg-emerald-950/40 border-emerald-500'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black text-white">
                    {deepfakeResult.isDeepfake ? 'PHÁT HIỆN DẤU HIỆU GIẢ MẠO DEEPFAKE AI' : 'KHÔNG PHÁT HIỆN DEEPFAKE'}
                  </h3>
                  <span className="text-xs text-purple-300">Công nghệ: {deepfakeResult.type}</span>
                </div>
                <span className="text-xs font-black px-2.5 py-1 rounded-xl bg-purple-500 text-white">
                  Độ tin cậy: {deepfakeResult.confidenceScore}%
                </span>
              </div>

              {/* Forensics parameters breakdown */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Lệch phổ âm thanh:</span>
                  <span className="text-purple-300 font-bold">{deepfakeResult.analysisDetails.spectralAnomaly}</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Khẩu hình môi (Lip-sync):</span>
                  <span className="text-purple-300 font-bold">{deepfakeResult.analysisDetails.lipSyncOffsetMs}</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Tần suất chớp mắt:</span>
                  <span className="text-purple-300 font-bold">{deepfakeResult.analysisDetails.blinkingCadence}</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Ánh sáng khuôn mặt:</span>
                  <span className="text-purple-300 font-bold">{deepfakeResult.analysisDetails.lightingConsistency}</span>
                </div>
              </div>

              <p className="text-xs text-slate-200 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                🛡️ Lời khuyên hành động: {deepfakeResult.actionGuide}
              </p>
            </div>
          )}
        </div>
      )}

      {/* ============================================================= */}
      {/* 6. SUB-TAB: SMS & CHAT FRAUD DETECTOR                         */}
      {/* ============================================================= */}
      {activeSubTab === 'sms' && (
        <div className="space-y-4">
          <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <MessageSquareWarning className="w-5 h-5 text-emerald-400" />
              Kiểm Tra Tin Nhắn SMS / Zalo / Telegram
            </h2>
            <p className="text-xs text-slate-400">
              Phân tích tin nhắn Brandname mạo danh ngân hàng từ trạm BTS giả, tin nhắn dụ làm CTV Shopee/TikTok
            </p>

            <div className="space-y-2">
              <textarea
                rows={3}
                placeholder="Dán nội dung tin nhắn SMS hoặc tin nhắn Zalo vào đây..."
                value={smsText}
                onChange={(e) => setSmsText(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />

              <button
                onClick={handleAnalyzeSms}
                disabled={isSmsAnalyzing || !smsText.trim()}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {isSmsAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>AI Đang Phân Tích Tâm Lý & Cạm Bẫy...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>KIỂM TRA TIN NHẮN</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {smsResult && (
            <div className={`p-4 rounded-3xl border-2 space-y-3 ${
              smsResult.isScam ? 'bg-rose-950/70 border-rose-500' : 'bg-emerald-950/40 border-emerald-500'
            }`}>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-white">
                  {smsResult.isScam ? 'CẢNH BÁO TIN NHẮN LỪA ĐẢO' : 'TIN NHẮN BÌNH THƯỜNG'}
                </h3>
                <span className="text-xs font-black px-2 py-0.5 rounded bg-slate-900 text-white">
                  {smsResult.threatScore}/100
                </span>
              </div>
              <p className="text-xs text-slate-200">{smsResult.detailedExplanation}</p>
            </div>
          )}
        </div>
      )}

      {/* ============================================================= */}
      {/* 7. SUB-TAB: URL & DOMAIN PHISHING CHECKER                     */}
      {/* ============================================================= */}
      {activeSubTab === 'url' && (
        <div className="space-y-4">
          <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Globe2 className="w-5 h-5 text-cyan-400" />
              Soi Tên Miền & Link Web Giả Mạo
            </h2>
            <p className="text-xs text-slate-400">
              Kiểm tra tên miền đuôi lạ (.top, .xyz, .site) giả danh Cổng Dịch vụ công, VNeID hoặc Ngân hàng
            </p>

            <div className="space-y-2">
              <input
                type="text"
                placeholder="Dán đường link (ví dụ: http://dichvucong-vneid.xyz)..."
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />

              <button
                onClick={handleAnalyzeUrl}
                disabled={isUrlAnalyzing || !urlInput.trim()}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {isUrlAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Đang Thẩm Định Tên Miền...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>KIỂM TRA ĐƯỜNG LINK</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {urlResult && (
            <div className={`p-4 rounded-3xl border-2 space-y-3 ${
              !urlResult.isSafe ? 'bg-rose-950/70 border-rose-500' : 'bg-emerald-950/40 border-emerald-500'
            }`}>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-white">
                  {urlResult.isSafe ? 'TÊN MIỀN AN TOÀN' : 'CẢNH BÁO TÊN MIỀN GIẢ MẠO'}
                </h3>
                <span className="text-xs font-black px-2 py-0.5 rounded bg-slate-900 text-white">
                  Rủi ro: {urlResult.threatScore}/100
                </span>
              </div>
              <p className="text-xs text-slate-200">{urlResult.recommendation}</p>
            </div>
          )}
        </div>
      )}

      {/* ============================================================= */}
      {/* 8. SUB-TAB: BLACKLIST BANK ACCOUNTS                           */}
      {/* ============================================================= */}
      {activeSubTab === 'bank' && (
        <div className="space-y-4">
          <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-amber-400" />
              Tra Cứu Sổ Đen STK Ngân Hàng Lừa Đảo
            </h2>
            <p className="text-xs text-slate-400">
              Cơ sở dữ liệu tài khoản ngân hàng "rác" đứng tên thuê bị cộng đồng tố giác
            </p>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Nhập số tài khoản ngân hàng..."
                value={bankQuery}
                onChange={(e) => setBankQuery(e.target.value)}
                className="flex-1 px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
              <button
                onClick={handleSearchBank}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
              >
                Tra Cứu
              </button>
            </div>
          </div>

          {bankSearchResult && (
            <div className={`p-4 rounded-3xl border-2 space-y-3 ${
              bankSearchResult.found ? 'bg-rose-950/70 border-rose-500' : 'bg-emerald-950/40 border-emerald-500'
            }`}>
              {bankSearchResult.found && bankSearchResult.account ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-3 pb-2 border-b border-rose-500/30">
                    <BankLogo 
                      code={bankSearchResult.account.bankName} 
                      name={bankSearchResult.account.bankName} 
                      variant="wide"
                      size="md" 
                    />
                    <div>
                      <h3 className="text-sm font-black text-rose-400">CẢNH BÁO: TÀI KHOẢN ĐEN!</h3>
                      <p className="text-xs text-slate-300 font-semibold">{bankSearchResult.account.bankName}</p>
                    </div>
                  </div>
                  <div className="text-xs text-slate-200 space-y-1">
                    <p>Số TK: <strong className="text-white font-mono">{bankSearchResult.account.accountNumber}</strong></p>
                    <p>Chủ TK: <strong className="text-amber-300">{bankSearchResult.account.accountHolder}</strong></p>
                    <p>Đã bị tố giác: <strong className="text-rose-400">{bankSearchResult.account.reportsCount} lần</strong></p>
                    <p>Thủ đoạn: {bankSearchResult.account.scamType}</p>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-sm font-bold text-emerald-400">Chưa có trong danh sách đen</h3>
                  <p className="text-xs text-slate-300 mt-1">Tuy nhiên bạn vẫn cần đối chiếu đúng tên người nhận trước khi chuyển tiền.</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ============================================================= */}
      {/* 9. SUB-TAB: APK & MALWARE INSPECTOR                          */}
      {/* ============================================================= */}
      {activeSubTab === 'apk' && (
        <div className="space-y-4">
          <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-indigo-400" />
              Soi File APK Lạ & Quyền Trợ Năng Độc Hại
            </h2>
            <p className="text-xs text-slate-400">
              Kiểm tra các file cài đặt ngoài luồng được gửi qua Zalo/Telegram (ví dụ: VNeID giả, Thuế điện tử giả)
            </p>

            <div className="space-y-2">
              <span className="text-[11px] font-semibold text-slate-400">Thử nghiệm quét các tệp tin APK:</span>
              <button
                onClick={() => handleScanApk('vneid-dichvucong-chinhphu.apk')}
                className="w-full p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700 text-xs text-rose-300 text-left flex items-center justify-between"
              >
                <span>📦 vneid-dichvucong-chinhphu.apk (File giả mạo)</span>
                <span className="text-[10px] bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded font-bold">Quét thử</span>
              </button>
            </div>
          </div>

          {apkResult && (
            <div className={`p-4 rounded-3xl border-2 space-y-3 ${
              apkResult.isMalicious ? 'bg-rose-950/50 border-rose-500' : 'bg-emerald-950/30 border-emerald-500'
            }`}>
              <h3 className="font-bold text-white text-sm">{apkResult.appName}</h3>
              <p className="text-xs text-slate-200">{apkResult.verdict}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
