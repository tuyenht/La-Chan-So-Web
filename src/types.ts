export type TabType = 'dashboard' | 'scanner' | 'alerts' | 'academy' | 'report' | 'settings';

export type ScannerSubTab = 'image' | 'call' | 'sms' | 'url' | 'bank' | 'apk' | 'qr' | 'phone_lookup' | 'deepfake_lab' | 'future_ai';

export interface ElderSettings {
  isElderMode: boolean; // Chế độ chữ to, tương phản cao, thao tác 1 chạm
  autoReadAloud: boolean; // Tự động đọc cảnh báo bằng giọng nói tiếng Việt
  smsAutoScan: boolean; // Tự động quét tin nhắn SMS đến
  zaloAutoScan: boolean; // Tự động quét link và tin nhắn Zalo
  telegramAutoScan: boolean; // Tự động quét nhóm Telegram
  liveCallMonitor: boolean; // Nhận biết cuộc gọi lạ & cảnh báo khi đang nghe
  dnsMalwareShield: boolean; // Lá chắn tên miền độc hại
}

export interface BankHotline {
  code: string;
  name: string;
  shortName: string;
  hotline: string;
  secondaryHotline?: string;
  emergencyLockMethod: string;
  appLockSteps: string[];
  logoBg: string;
  logoUrl?: string;
}

export interface PhoneLookupResult {
  phoneNumber: string;
  carrierOrCountry: string;
  riskLevel: 'DANGER' | 'SUSPICIOUS' | 'SAFE';
  threatScore: number;
  reportCount: number;
  tags: string[];
  scamPatterns: string[];
  callerIdSpoofed: boolean;
  recommendation: string;
  elderAdvice: string;
}

export interface QrScanResult {
  rawContent: string;
  type: 'VIETQR' | 'URL' | 'APP_INSTALL' | 'WIFI' | 'TEXT' | 'UNKNOWN';
  isSafe: boolean;
  threatScore: number;
  vietQrData?: {
    bankCode?: string;
    bankName?: string;
    accountNumber?: string;
    accountHolder?: string;
    amount?: number;
    memo?: string;
    isBlacklistedAccount?: boolean;
  };
  detectedRisks: string[];
  recommendation: string;
}

export interface DeepfakeLabResult {
  isDeepfake: boolean;
  confidenceScore: number; // 0-100
  type: 'DEEPVOICE' | 'FACE_SWAP' | 'LIP_SYNC' | 'DIFFUSION_IMAGE' | 'SAFE';
  analysisDetails: {
    spectralAnomaly: string;
    blinkingCadence: string;
    lipSyncOffsetMs: string;
    lightingConsistency: string;
    compressionArtifacts: string;
  };
  riskSummary: string;
  actionGuide: string;
  elderAudioVoiceExplain: string;
}

export interface FamilyGuardianMember {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  avatarColor: string;
  isProtected: boolean;
  status: 'safe' | 'alert' | 'offline';
  lastChecked: string;
  threatsInterceptedToday: number;
}

export interface ProvinceThreatStat {
  code: string;
  name: string;
  region: 'Bắc' | 'Trung' | 'Nam';
  threatCount: number;
  primaryThreat: string;
  alertLevel: 'high' | 'medium' | 'low';
}

export interface SecurityScore {
  score: number; // 0 - 100
  status: 'critical' | 'warning' | 'good' | 'excellent';
  lastScan: string;
  threatsBlocked: number;
  activeProtections: number;
  totalProtections: number;
}

export interface ScamAlert {
  id: string;
  title: string;
  category: 'deepfake' | 'vneid' | 'fake_bank' | 'job_scam' | 'gift_trap' | 'blackmail' | 'emergency_kid' | 'crypto_scam' | 'sim_block' | 'other';
  riskLevel: 'high' | 'critical' | 'medium';
  date: string;
  source: string;
  summary: string;
  tactics: string[];
  recommendation: string;
  reportedCount: number;
  elderAudioGuide?: string;
  targetVictims?: string;
}

export interface BlacklistAccount {
  accountNumber: string;
  bankName: string;
  accountHolder: string;
  reportsCount: number;
  riskLevel: 'danger' | 'warning';
  scamType: string;
  lastReportDate: string;
  verifiedByNCSC?: boolean;
}

export interface ImageAnalysisResult {
  isScam: boolean;
  threatScore: number; // 0 - 100
  scamType: string;
  extractedTextSummary: string;
  detectedRedFlags: string[];
  tacticsAnalysis: string;
  recommendations: string[];
  elderSafetyTip?: string;
}

export interface UrlCheckResult {
  url: string;
  domain: string;
  isSafe: boolean;
  threatScore: number;
  threatType?: string;
  impersonatedBrand?: string;
  reasons: string[];
  certificateStatus: 'valid' | 'suspicious' | 'none';
  domainAge?: string;
  knownMalicious: boolean;
  recommendation: string;
  domainRiskDetails?: string;
  elderFriendlyExplain?: string;
}

export interface SmsAnalysisResult {
  content: string;
  isScam: boolean;
  threatScore: number;
  scamCategory?: string;
  detectedKeywords: string[];
  tactics: string[];
  impersonatedEntity?: string;
  recommendations: string[];
  detailedExplanation?: string;
  simpleAudioVoiceGuide?: string;
}

export interface CallAnalysisResult {
  isDangerousCall: boolean;
  dangerLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'SAFE';
  threatScore: number;
  scamScenario: string;
  urgencyFactor: string;
  immediateAction: string;
  alertVoiceSpoken: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  scenario: string;
  senderOrCaller?: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
  elderTip?: string;
}

export interface InteractiveDrill {
  id: string;
  title: string;
  category: string;
  callerName: string;
  callerPhone: string;
  initialDialogue: string;
  options: {
    text: string;
    isSafe: boolean;
    feedback: string;
    elderAdvice: string;
  }[];
}

export interface SecurityArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  iconName: string;
  summary: string;
  content: string[];
  keyRules: string[];
}

export interface EmergencyContact {
  name: string;
  phone: string;
  agency: string;
  description: string;
  available: string;
  badgeColor: string;
}

export interface ReportItem {
  id: string;
  type: 'url' | 'phone' | 'bank' | 'image' | 'sms' | 'app';
  target: string;
  description: string;
  contactPhone?: string;
  submittedAt: string;
  status: 'processing' | 'verified' | 'investigating';
  threatLevel: 'high' | 'critical' | 'medium';
}
