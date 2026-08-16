import React, { useState } from 'react';

export interface BankSmsConfig {
  recipient: string;
  defaultBody: string;
  allCardsBody: string;
  specificCardPrefix?: string;
  note: string;
}

export interface BankBrandInfo {
  code: string;
  name: string;
  shortName: string;
  primaryColor: string; // Hex or Tailwind class
  accentGradient: string;
  badgeBg: string;
  textColor: string;
  category: 'big4' | 'private' | 'ewallet';
  tagLabel?: string;
  logoUrl: string;
  emergencySms?: string;
  smsConfig?: BankSmsConfig;
  ivrPrompt?: string;
  appLockGuide?: string[];
}

export function getSmsHref(recipient: string, body: string): string {
  const isIOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const separator = isIOS ? '&' : '?';
  return `sms:${recipient}${separator}body=${encodeURIComponent(body)}`;
}

export const BANK_BRAND_DATA: Record<string, BankBrandInfo> = {
  VCB: {
    code: 'VCB',
    name: 'Ngân hàng TMCP Ngoại thương Việt Nam',
    shortName: 'Vietcombank',
    primaryColor: '#005826',
    accentGradient: 'from-emerald-950 via-slate-900 to-slate-950 border-emerald-500/40',
    badgeBg: 'bg-[#005826]',
    textColor: 'text-emerald-400',
    category: 'big4',
    tagLabel: 'Big 4 Nhà Nước',
    logoUrl: 'https://api.vietqr.io/img/VCB.png',
    emergencySms: 'VCB KHOATHE ALL gửi 6167',
    smsConfig: {
      recipient: '6167',
      defaultBody: 'VCB KHOATHE ALL',
      allCardsBody: 'VCB KHOATHE ALL',
      specificCardPrefix: 'VCB KT',
      note: 'Khóa toàn bộ thẻ phát hành tại Vietcombank ngay tức thì'
    },
    ivrPrompt: 'Gọi 1900545413 bấm Phím 1 (Khóa thẻ khẩn cấp tự động)'
  },
  MB: {
    code: 'MB',
    name: 'Ngân hàng TMCP Quân Đội',
    shortName: 'MB Bank',
    primaryColor: '#0033A0',
    accentGradient: 'from-blue-950 via-slate-900 to-slate-950 border-blue-500/40',
    badgeBg: 'bg-[#0033A0]',
    textColor: 'text-blue-400',
    category: 'private',
    tagLabel: 'Khóa Tự Động IVR',
    logoUrl: 'https://api.vietqr.io/img/MB.png',
    ivrPrompt: 'Gọi 1900545426 bấm Phím 1 để kích hoạt khóa thẻ tự động IVR 24/7'
  },
  TCB: {
    code: 'TCB',
    name: 'Ngân hàng TMCP Kỹ Thương Việt Nam',
    shortName: 'Techcombank',
    primaryColor: '#E30613',
    accentGradient: 'from-red-950 via-slate-900 to-slate-950 border-red-500/40',
    badgeBg: 'bg-[#E30613]',
    textColor: 'text-rose-400',
    category: 'private',
    tagLabel: 'Miễn Cước 1800',
    logoUrl: 'https://api.vietqr.io/img/TCB.png',
    ivrPrompt: 'Gọi 1800588822 (miễn cước) bấm Phím 1 để khóa thẻ khẩn cấp'
  },
  BIDV: {
    code: 'BIDV',
    name: 'Ngân hàng TMCP Đầu tư và Phát triển VN',
    shortName: 'BIDV',
    primaryColor: '#007256',
    accentGradient: 'from-teal-950 via-slate-900 to-slate-950 border-teal-500/40',
    badgeBg: 'bg-[#007256]',
    textColor: 'text-teal-400',
    category: 'big4',
    tagLabel: 'Big 4 Nhà Nước',
    logoUrl: 'https://api.vietqr.io/img/BIDV.png',
    ivrPrompt: 'Gọi 19009247 bấm Phím 1 để khóa khẩn cấp tự động'
  },
  VBA: {
    code: 'VBA',
    name: 'Ngân hàng Nông nghiệp & PT Nông thôn VN',
    shortName: 'Agribank',
    primaryColor: '#8B0000',
    accentGradient: 'from-rose-950 via-slate-900 to-slate-950 border-red-600/40',
    badgeBg: 'bg-[#8B0000]',
    textColor: 'text-red-400',
    category: 'big4',
    tagLabel: 'Big 4 Nhà Nước',
    logoUrl: 'https://api.vietqr.io/img/VBA.png',
    emergencySms: 'VBA KHOATHE gửi 8149',
    smsConfig: {
      recipient: '8149',
      defaultBody: 'VBA KHOATHE',
      allCardsBody: 'VBA KHOATHE',
      specificCardPrefix: 'VBA KHOATHE',
      note: 'Khóa thẻ qua tổng đài tin nhắn Agribank 8149'
    },
    ivrPrompt: 'Gọi 1900558818 bấm Phím 1 khóa thẻ'
  },
  CTG: {
    code: 'CTG',
    name: 'Ngân hàng TMCP Công Thương Việt Nam',
    shortName: 'VietinBank',
    primaryColor: '#003B70',
    accentGradient: 'from-sky-950 via-slate-900 to-slate-950 border-sky-500/40',
    badgeBg: 'bg-[#003B70]',
    textColor: 'text-sky-400',
    category: 'big4',
    tagLabel: 'Big 4 Nhà Nước',
    logoUrl: 'https://api.vietqr.io/img/ICB.png',
    emergencySms: 'CTG KHOATHE ALL gửi 8149',
    smsConfig: {
      recipient: '8149',
      defaultBody: 'CTG KHOATHE ALL',
      allCardsBody: 'CTG KHOATHE ALL',
      specificCardPrefix: 'CTG KHOATHE',
      note: 'Khóa khẩn cấp mọi thẻ VietinBank qua tổng đài 8149'
    },
    ivrPrompt: 'Gọi 1900558868 bấm Phím 1 khóa thẻ khẩn cấp'
  },
  VPB: {
    code: 'VPB',
    name: 'Ngân hàng TMCP Việt Nam Thịnh Vượng',
    shortName: 'VPBank',
    primaryColor: '#009E49',
    accentGradient: 'from-emerald-950 via-slate-900 to-slate-950 border-emerald-500/40',
    badgeBg: 'bg-[#009E49]',
    textColor: 'text-emerald-400',
    category: 'private',
    tagLabel: 'Khóa 24/7',
    logoUrl: 'https://api.vietqr.io/img/VPB.png',
    ivrPrompt: 'Gọi 1900545415 nhánh 1 để khóa thẻ tự động 24/7'
  },
  ACB: {
    code: 'ACB',
    name: 'Ngân hàng TMCP Á Châu',
    shortName: 'ACB',
    primaryColor: '#005BAA',
    accentGradient: 'from-blue-950 via-slate-900 to-slate-950 border-blue-500/40',
    badgeBg: 'bg-[#005BAA]',
    textColor: 'text-blue-400',
    category: 'private',
    tagLabel: 'Phím 1 Khóa Nhanh',
    logoUrl: 'https://api.vietqr.io/img/ACB.png',
    ivrPrompt: 'Gọi 1900545486 nhấn Phím 1 để khóa thẻ ngay'
  },
  TPB: {
    code: 'TPB',
    name: 'Ngân hàng TMCP Tiên Phong',
    shortName: 'TPBank',
    primaryColor: '#5A2D81',
    accentGradient: 'from-purple-950 via-slate-900 to-slate-950 border-purple-500/40',
    badgeBg: 'bg-[#5A2D81]',
    textColor: 'text-purple-400',
    category: 'private',
    tagLabel: 'Khóa Tự Động App',
    logoUrl: 'https://api.vietqr.io/img/TPB.png',
    ivrPrompt: 'Gọi 1900585885 bấm Phím 1 khóa thẻ tức thì'
  },
  STB: {
    code: 'STB',
    name: 'Ngân hàng TMCP Sài Gòn Thương Tín',
    shortName: 'Sacombank',
    primaryColor: '#005CA9',
    accentGradient: 'from-blue-950 via-slate-900 to-slate-950 border-blue-500/40',
    badgeBg: 'bg-[#005CA9]',
    textColor: 'text-blue-400',
    category: 'private',
    tagLabel: 'Miễn Cước 1800',
    logoUrl: 'https://api.vietqr.io/img/STB.png',
    emergencySms: 'STB KHOA gửi 8149',
    smsConfig: {
      recipient: '8149',
      defaultBody: 'STB KHOA',
      allCardsBody: 'STB KHOA',
      specificCardPrefix: 'STB KHOA',
      note: 'Khóa thẻ Sacombank qua tổng đài 8149 hoặc gọi 1800 5858 88'
    },
    ivrPrompt: 'Gọi 1800585888 (miễn phí) bấm Phím 1 để khóa thẻ'
  },
  OCB: {
    code: 'OCB',
    name: 'Ngân hàng TMCP Phương Đông',
    shortName: 'OCB',
    primaryColor: '#008744',
    accentGradient: 'from-emerald-950 via-slate-900 to-slate-950 border-emerald-500/40',
    badgeBg: 'bg-[#008744]',
    textColor: 'text-emerald-400',
    category: 'private',
    tagLabel: 'Miễn Cước 1800',
    logoUrl: 'https://api.vietqr.io/img/OCB.png',
    ivrPrompt: 'Tổng đài miễn cước 1800 6678 bấm Phím 1'
  },
  VIB: {
    code: 'VIB',
    name: 'Ngân hàng TMCP Quốc Tế Việt Nam',
    shortName: 'VIB',
    primaryColor: '#004A99',
    accentGradient: 'from-amber-950 via-slate-900 to-slate-950 border-amber-500/40',
    badgeBg: 'bg-[#004A99]',
    textColor: 'text-amber-400',
    category: 'private',
    tagLabel: 'Miễn Cước 1800',
    logoUrl: 'https://api.vietqr.io/img/VIB.png',
    ivrPrompt: 'Tổng đài miễn cước 1800 8180 bấm Phím 1 để khóa khẩn cấp'
  },
  HDB: {
    code: 'HDB',
    name: 'Ngân hàng TMCP Phát triển TP.HCM',
    shortName: 'HDBank',
    primaryColor: '#ED1C24',
    accentGradient: 'from-yellow-950 via-slate-900 to-slate-950 border-yellow-500/40',
    badgeBg: 'bg-[#ED1C24]',
    textColor: 'text-yellow-400',
    category: 'private',
    tagLabel: 'Khóa Tức Thì',
    logoUrl: 'https://api.vietqr.io/img/HDB.png',
    ivrPrompt: 'Gọi 19006060 bấm Phím 1 khóa khẩn cấp'
  },
  MSB: {
    code: 'MSB',
    name: 'Ngân hàng TMCP Hàng Hải Việt Nam',
    shortName: 'MSB',
    primaryColor: '#FF5000',
    accentGradient: 'from-orange-950 via-slate-900 to-slate-950 border-orange-500/40',
    badgeBg: 'bg-[#FF5000]',
    textColor: 'text-orange-400',
    category: 'private',
    tagLabel: 'Khóa 24/7',
    logoUrl: 'https://api.vietqr.io/img/MSB.png',
    ivrPrompt: 'Gọi 19006083 hoặc thao tác trên app MSB mBank'
  },
  SHB: {
    code: 'SHB',
    name: 'Ngân hàng TMCP Sài Gòn - Hà Nội',
    shortName: 'SHB',
    primaryColor: '#F58220',
    accentGradient: 'from-orange-950 via-slate-900 to-slate-950 border-orange-500/40',
    badgeBg: 'bg-[#F58220]',
    textColor: 'text-orange-400',
    category: 'private',
    tagLabel: 'Phím 1 Khóa Nhanh',
    logoUrl: 'https://api.vietqr.io/img/SHB.png',
    emergencySms: 'SHB KHOATHE gửi 6089',
    smsConfig: {
      recipient: '6089',
      defaultBody: 'SHB KHOATHE ALL',
      allCardsBody: 'SHB KHOATHE ALL',
      specificCardPrefix: 'SHB KHOATHE',
      note: 'Khóa thẻ tự động qua đầu số 6089'
    },
    ivrPrompt: 'Gọi 1900588856 nhấn Phím 1 khóa thẻ tự động 24/7'
  },
  SEAB: {
    code: 'SEAB',
    name: 'Ngân hàng TMCP Đông Nam Á',
    shortName: 'SeABank',
    primaryColor: '#ED1C24',
    accentGradient: 'from-rose-950 via-slate-900 to-slate-950 border-red-500/40',
    badgeBg: 'bg-[#ED1C24]',
    textColor: 'text-rose-400',
    category: 'private',
    tagLabel: 'SeAMobile 24/7',
    logoUrl: 'https://api.vietqr.io/img/SEAB.png',
    ivrPrompt: 'Gọi 1900555587 hoặc mở app SeAMobile để khóa thẻ'
  },
  LPB: {
    code: 'LPB',
    name: 'Ngân hàng TMCP Lộc Phát Việt Nam',
    shortName: 'LPBank',
    primaryColor: '#FFC20E',
    accentGradient: 'from-amber-950 via-slate-900 to-slate-950 border-amber-500/40',
    badgeBg: 'bg-[#003B70]',
    textColor: 'text-amber-400',
    category: 'private',
    tagLabel: 'Miễn Cước 1800',
    logoUrl: 'https://api.vietqr.io/img/LPB.png',
    ivrPrompt: 'Tổng đài miễn phí 1800 577 758 bấm Phím 1 để khóa thẻ'
  },
  MOMO: {
    code: 'MOMO',
    name: 'Ví Điện Tử MoMo',
    shortName: 'MoMo',
    primaryColor: '#A50064',
    accentGradient: 'from-pink-950 via-slate-900 to-slate-950 border-pink-500/40',
    badgeBg: 'bg-[#A50064]',
    textColor: 'text-pink-400',
    category: 'ewallet',
    tagLabel: 'Ví Điện Tử',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png',
    ivrPrompt: 'Gọi 1900545441 bấm Phím 1 để khóa tài khoản ví tự động'
  },
  VTM: {
    code: 'VTM',
    name: 'Tổng Công ty Dịch vụ Số Viettel',
    shortName: 'Viettel Money',
    primaryColor: '#EE0033',
    accentGradient: 'from-rose-950 via-slate-900 to-slate-950 border-red-500/40',
    badgeBg: 'bg-[#EE0033]',
    textColor: 'text-rose-400',
    category: 'ewallet',
    tagLabel: 'Miễn Cước 1800',
    logoUrl: 'https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-Viettel-Money-V.png',
    ivrPrompt: 'Tổng đài miễn cước 1800 9000 bấm Phím 1 để khóa khẩn cấp'
  }
};

