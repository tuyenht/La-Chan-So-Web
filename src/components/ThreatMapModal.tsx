import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Flame, 
  ShieldAlert, 
  Filter, 
  TrendingUp, 
  Radio,
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import { SAMPLE_PROVINCE_THREATS } from '../data/mockData';
import { ProvinceThreatStat } from '../types';

interface ThreatMapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ThreatMapModal: React.FC<ThreatMapModalProps> = ({ isOpen, onClose }) => {
  const [selectedRegion, setSelectedRegion] = useState<'All' | 'Bắc' | 'Trung' | 'Nam'>('All');
  const [selectedProvince, setSelectedProvince] = useState<ProvinceThreatStat | null>(null);

  if (!isOpen) return null;

  const filteredProvinces = SAMPLE_PROVINCE_THREATS.filter(p => 
    selectedRegion === 'All' ? true : p.region === selectedRegion
  );

  const totalThreats = SAMPLE_PROVINCE_THREATS.reduce((sum, p) => sum + p.threatCount, 0);

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-slate-950 border border-slate-800 rounded-t-3xl sm:rounded-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-purple-950/80 via-slate-900 to-slate-950 border-b border-purple-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <Radio className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-base font-black text-white">BẢN ĐỒ TỘI PHẠM MẠNG</h2>
                <span className="text-[10px] bg-purple-500 text-white font-black px-1.5 py-0.5 rounded">
                  LIVE 63 TỈNH
                </span>
              </div>
              <p className="text-xs text-purple-300">
                Dữ liệu giám sát không gian mạng theo thời gian thực tại Việt Nam
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stats Strip */}
        <div className="p-3 bg-slate-900 border-b border-slate-800 grid grid-cols-3 gap-2 text-center">
          <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 block">Vụ việc ghi nhận</span>
            <strong className="text-sm font-black text-rose-400">{totalThreats.toLocaleString('vi-VN')}</strong>
          </div>
          <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 block">Điểm nóng số 1</span>
            <strong className="text-sm font-black text-amber-400">TP. Hồ Chí Minh</strong>
          </div>
          <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 block">Thủ đoạn hàng đầu</span>
            <strong className="text-xs font-bold text-cyan-400">Fake VNeID & Bill</strong>
          </div>
        </div>

        {/* Region Filter */}
        <div className="p-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs text-slate-400 font-semibold">Khu vực:</span>
          </div>

          <div className="flex gap-1">
            {(['All', 'Bắc', 'Trung', 'Nam'] as const).map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                  selectedRegion === reg
                    ? 'bg-purple-500 text-white shadow-md'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                }`}
              >
                {reg === 'All' ? 'Toàn Quốc' : `Miền ${reg}`}
              </button>
            ))}
          </div>
        </div>

        {/* Provinces List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {filteredProvinces.map((prov) => (
            <div
              key={prov.code}
              onClick={() => setSelectedProvince(prov)}
              className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-purple-500/50 cursor-pointer active:scale-[0.99] transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${prov.alertLevel === 'high' ? 'bg-rose-500 animate-ping' : prov.alertLevel === 'medium' ? 'bg-amber-500' : 'bg-cyan-500'}`} />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold text-white">{prov.name}</h3>
                    <span className="text-[9px] px-1.5 rounded bg-slate-800 text-slate-300">
                      Miền {prov.region}
                    </span>
                  </div>
                  <p className="text-[11px] text-rose-300/80 mt-0.5">
                    Thủ đoạn rộ: <span className="text-white font-medium">{prov.primaryThreat}</span>
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-black text-white block">
                  {prov.threatCount.toLocaleString('vi-VN')}
                </span>
                <span className="text-[9px] text-slate-400">báo cáo tuần qua</span>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Province Details Submodal */}
        {selectedProvince && (
          <div className="p-4 bg-slate-900 border-t border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-rose-400" />
                Cảnh báo an ninh địa bàn: {selectedProvince.name}
              </h4>
              <button
                onClick={() => setSelectedProvince(null)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Đóng
              </button>
            </div>
            <p className="text-xs text-slate-300">
              Tại <strong className="text-white">{selectedProvince.name}</strong>, tội phạm mạng đang tập trung tấn công bằng hình thức <strong className="text-rose-400">{selectedProvince.primaryThreat}</strong>. Người dân cần đặc biệt cảnh giác với người lạ xưng là Công an gọi điện dọa án hoặc gửi link tải app ngoài kho ứng dụng.
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-950 flex justify-end">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs"
          >
            Đóng bản đồ
          </button>
        </div>
      </div>
    </div>
  );
};
