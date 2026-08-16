import React, { useState } from 'react';
import { PhoneMockup } from './components/PhoneMockup';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { DashboardView } from './components/DashboardView';
import { ScannerView } from './components/ScannerView';
import { AlertsView } from './components/AlertsView';
import { QuizHandbookView } from './components/QuizHandbookView';
import { ReportEmergencyView } from './components/ReportEmergencyView';
import { SettingsView } from './components/SettingsView';
import { QuickScanModal } from './components/QuickScanModal';
import { IncomingThreatModal, ThreatNotificationPayload } from './components/IncomingThreatModal';
import { BankFreezeModal } from './components/BankFreezeModal';
import { PocketSafetyCardModal } from './components/PocketSafetyCardModal';
import { FamilyGuardianModal } from './components/FamilyGuardianModal';
import { ThreatMapModal } from './components/ThreatMapModal';
import { TabType, ScannerSubTab, ScamAlert, ElderSettings } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [scannerSubTab, setScannerSubTab] = useState<ScannerSubTab>('image');
  const [selectedAlert, setSelectedAlert] = useState<ScamAlert | null>(null);
  const [isQuickScanOpen, setIsQuickScanOpen] = useState<boolean>(false);
  const [prefilledReport, setPrefilledReport] = useState<{ type: string; value: string; desc: string } | null>(null);

  // New Competition-Ready Modal States
  const [isBankFreezeOpen, setIsBankFreezeOpen] = useState(false);
  const [isPocketCardOpen, setIsPocketCardOpen] = useState(false);
  const [isFamilyGuardianOpen, setIsFamilyGuardianOpen] = useState(false);
  const [isThreatMapOpen, setIsThreatMapOpen] = useState(false);

  // Elder Mode & Auto Monitoring Settings State
  const [settings, setSettings] = useState<ElderSettings>({
    isElderMode: false,
    autoReadAloud: true,
    smsAutoScan: true,
    zaloAutoScan: true,
    telegramAutoScan: true,
    liveCallMonitor: true,
    dnsMalwareShield: true
  });

  // Simulated live intercept threat modal
  const [activeSimulatedThreat, setActiveSimulatedThreat] = useState<ThreatNotificationPayload | null>(null);

  const handleUpdateSettings = (newSettings: Partial<ElderSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const handleOpenScannerWithSubTab = (subTab: ScannerSubTab) => {
    setScannerSubTab(subTab);
    setActiveTab('scanner');
  };

  const handleSelectAlert = (alert: ScamAlert) => {
    setSelectedAlert(alert);
    setActiveTab('alerts');
  };

  const handleNavigateToReportWithData = (data?: { type: string; value: string; desc: string }) => {
    if (data) {
      setPrefilledReport(data);
    }
    setActiveTab('report');
  };

  // Trigger test simulated threats
  const handleTriggerSimulatedAlert = (type: 'sms' | 'zalo' | 'call') => {
    if (type === 'call') {
      setActiveSimulatedThreat({
        type: 'call',
        sender: '024.3825.xxxx (Mạo danh C02)',
        phone: '024.3825.xxxx',
        previewText: 'Tôi là cán bộ điều tra Bộ Công An. Bác đang dính vào đường dây ma túy 5 tỷ, cấm nói cho con cháu và chuyển tiền vào tài khoản bảo chứng ngay!',
        dangerReason: 'Giả danh Cơ quan Công An dọa án tù ép chuyển tiền',
        scamCategory: 'Mạo danh Công An dọa bắt tạm giam',
        spokenAudioText: 'Cảnh báo! Đây là cuộc gọi giả danh Công An lừa đảo. Bác hãy cúp máy ngay lập tức, không được chuyển bất kỳ đồng tiền nào!'
      });
    } else if (type === 'zalo') {
      setActiveSimulatedThreat({
        type: 'zalo',
        sender: 'Cán bộ Công an Phường (Zalo)',
        previewText: 'Bác ơi, tài khoản VNeID mức 2 của bác bị lỗi quê quán. Cháu gửi file này qua Zalo: dichvucong-vneid.apk, bác tải về cài đặt quét mặt gấp.',
        dangerReason: 'Mã độc chiếm quyền điều khiển điện thoại từ xa qua file .APK lạ',
        scamCategory: 'Lừa đảo cài đặt VNeID / Dịch vụ công giả mạo',
        spokenAudioText: 'Cảnh báo! Tin nhắn này gửi file mã độc giả mạo VNeID. Bác tuyệt đối không bấm vào link và không tải file APK về điện thoại!'
      });
    } else {
      setActiveSimulatedThreat({
        type: 'sms',
        sender: 'Vietcombank (BTS Giả mạo)',
        previewText: 'Vietcombank: Tai khoan quy khach vua dang nhap tai thiet bi la. Vui long truy cap http://vietcombank-login.xyz de xac thuc huy giao dich.',
        dangerReason: 'Trạm BTS giả mạo Brandname Ngân hàng chèn link câu mã OTP',
        scamCategory: 'Mạo danh tin nhắn SMS Ngân hàng',
        spokenAudioText: 'Cảnh báo! Tin nhắn này do trạm phát sóng giả mạo gửi đến. Bác tuyệt đối không bấm vào link trong tin nhắn!'
      });
    }
  };

  const handleBlockAndReportThreat = (threat: ThreatNotificationPayload) => {
    setActiveSimulatedThreat(null);
    setPrefilledReport({
      type: threat.type === 'call' ? 'phone' : threat.type === 'sms' ? 'sms' : 'url',
      value: threat.phone || threat.sender,
      desc: `${threat.scamCategory}: ${threat.previewText}`
    });
    setActiveTab('report');
  };

  return (
    <PhoneMockup activeTabTitle="Lá Chắn Số - CyberShield">
      {/* Top Application Header */}
      <Header 
        activeTab={activeTab}
        settings={settings}
        onNavigateTab={(tab) => setActiveTab(tab)}
        onOpenQuickScan={() => setIsQuickScanOpen(true)}
        onToggleElderMode={() => handleUpdateSettings({ isElderMode: !settings.isElderMode })}
      />

      {/* Main Tab Content View */}
      <main className="flex-1 w-full overflow-y-auto">
        {activeTab === 'dashboard' && (
          <DashboardView 
            settings={settings}
            onNavigateTab={(tab) => setActiveTab(tab)}
            onOpenScannerWithSubTab={handleOpenScannerWithSubTab}
            onOpenQuickScan={() => setIsQuickScanOpen(true)}
            onSelectAlert={handleSelectAlert}
            onOpenBankFreeze={() => setIsBankFreezeOpen(true)}
            onOpenPocketCard={() => setIsPocketCardOpen(true)}
            onOpenFamilyGuardian={() => setIsFamilyGuardianOpen(true)}
            onOpenThreatMap={() => setIsThreatMapOpen(true)}
          />
        )}

        {activeTab === 'scanner' && (
          <ScannerView 
            initialSubTab={scannerSubTab}
            settings={settings}
            onNavigateToReport={handleNavigateToReportWithData}
          />
        )}

        {activeTab === 'alerts' && (
          <AlertsView 
            selectedAlert={selectedAlert}
            settings={settings}
            onClearSelectedAlert={() => setSelectedAlert(null)}
            onSelectAlert={handleSelectAlert}
          />
        )}

        {activeTab === 'academy' && (
          <QuizHandbookView settings={settings} />
        )}

        {activeTab === 'report' && (
          <ReportEmergencyView initialReportData={prefilledReport} />
        )}

        {activeTab === 'settings' && (
          <SettingsView 
            settings={settings}
            onUpdateSettings={handleUpdateSettings}
            onTriggerSimulatedAlert={handleTriggerSimulatedAlert}
          />
        )}
      </main>

      {/* Persistent Bottom Mobile Navigation Bar */}
      <BottomNav 
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'alerts') setSelectedAlert(null);
          if (tab !== 'report') setPrefilledReport(null);
        }}
      />

      {/* Full Device Quick Scan Modal */}
      <QuickScanModal 
        isOpen={isQuickScanOpen}
        onClose={() => setIsQuickScanOpen(false)}
      />

      {/* Incoming Intercept Threat Notification Modal */}
      <IncomingThreatModal 
        threat={activeSimulatedThreat}
        settings={settings}
        onClose={() => setActiveSimulatedThreat(null)}
        onBlockAndReport={handleBlockAndReportThreat}
      />

      {/* 1-Tap Emergency Bank Freeze Modal */}
      <BankFreezeModal
        isOpen={isBankFreezeOpen}
        onClose={() => setIsBankFreezeOpen(false)}
      />

      {/* Pocket Safety Card Modal (6 Rules for Elders) */}
      <PocketSafetyCardModal
        isOpen={isPocketCardOpen}
        settings={settings}
        onClose={() => setIsPocketCardOpen(false)}
      />

      {/* Family Guardian Network Modal */}
      <FamilyGuardianModal
        isOpen={isFamilyGuardianOpen}
        onClose={() => setIsFamilyGuardianOpen(false)}
      />

      {/* Cyber Threat Map 63 Provinces Modal */}
      <ThreatMapModal
        isOpen={isThreatMapOpen}
        onClose={() => setIsThreatMapOpen(false)}
      />
    </PhoneMockup>
  );
}
