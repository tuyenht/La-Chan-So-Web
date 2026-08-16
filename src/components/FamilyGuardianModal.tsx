import React, { useState } from 'react';
import { 
  X, 
  Users, 
  ShieldCheck, 
  UserPlus, 
  PhoneCall, 
  BellRing, 
  CheckCircle2, 
  AlertTriangle, 
  HeartHandshake, 
  Sparkles,
  Smartphone,
  ShieldAlert
} from 'lucide-react';
import { SAMPLE_FAMILY_GUARDIANS } from '../data/mockData';
import { FamilyGuardianMember } from '../types';

interface FamilyGuardianModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FamilyGuardianModal: React.FC<FamilyGuardianModalProps> = ({ isOpen, onClose }) => {
  const [guardians, setGuardians] = useState<FamilyGuardianMember[]>(SAMPLE_FAMILY_GUARDIANS);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newRelationship, setNewRelationship] = useState('Bà nội');
  const [newPhone, setNewPhone] = useState('');
  const [simulatedAlertTriggered, setSimulatedAlertTriggered] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAddGuardian = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newPhone.trim()) return;

    const newMember: FamilyGuardianMember = {
      id: 'fam-' + Date.now(),
      name: newName,
      relationship: newRelationship,
      phone: newPhone,
      avatarColor: 'from-emerald-400 to-teal-500',
      isProtected: true,
      status: 'safe',
      lastChecked: 'Vừa thêm',
      threatsInterceptedToday: 0
    };

    setGuardians([...guardians, newMember]);
    setNewName('');
    setNewPhone('');
    setShowAddForm(false);
  };

  const handleSimulateSOS = (member: FamilyGuardianMember) => {
    setSimulatedAlertTriggered(`Đã gửi cảnh báo khẩn cấp tới con cháu: "${member.name} vừa nhận được cuộc gọi mạo danh Công An đòi chuyển tiền"`);
    setTimeout(() => setSimulatedAlertTriggered(null), 5000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-slate-950 border border-slate-800 rounded-t-3xl sm:rounded-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-950 border-b border-emerald-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-base font-black text-white">VÒNG TRÒN BẢO VỆ GIA ĐÌNH</h2>
                <span className="text-[10px] bg-emerald-500 text-slate-950 font-black px-1.5 py-0.5 rounded">
                  GUARDIAN
                </span>
              </div>
              <p className="text-xs text-emerald-300">
                Tự động gửi cảnh báo cho con cháu khi người thân nhận tin nhắn/cuộc gọi lừa đảo
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

        {/* Action Trigger Banner */}
        {simulatedAlertTriggered && (
          <div className="p-3 bg-rose-950/90 border-b border-rose-500/50 flex items-start gap-2.5 animate-bounce">
            <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-200">
              <strong className="text-rose-400 block font-bold">CẢNH BÁO KHẨN ĐÃ KÍCH HOẠT:</strong>
              {simulatedAlertTriggered}
            </div>
          </div>
        )}

        {/* Content List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {/* Mechanism Explainer */}
          <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-start gap-3">
            <HeartHandshake className="w-6 h-6 text-cyan-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300">
              <span className="font-bold text-white block mb-0.5">Cơ chế Bảo Vệ Liên Thế Hệ:</span>
              Khi thiết bị của Ông Bà/Bố Mẹ nhận cuộc gọi dọa án ma túy hoặc tin nhắn chứa file APK lạ, hệ thống sẽ tự động gửi thông báo đẩy (Push SOS) ngay lập tức đến điện thoại của con cháu để kịp thời can thiệp.
            </div>
          </div>

          {/* Members List */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Thành Viên Đang Được Bảo Vệ ({guardians.length})
              </h3>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="text-xs font-bold text-cyan-400 hover:underline flex items-center gap-1"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>{showAddForm ? 'Hủy' : 'Thêm người thân'}</span>
              </button>
            </div>

            {/* Add Member Form */}
            {showAddForm && (
              <form onSubmit={handleAddGuardian} className="p-3.5 rounded-2xl bg-slate-900 border border-cyan-500/40 space-y-3 animate-in fade-in duration-150">
                <h4 className="text-xs font-bold text-white">Thêm Thiết Bị Người Thân Cần Giám Sát</h4>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Quan hệ</label>
                    <select
                      value={newRelationship}
                      onChange={(e) => setNewRelationship(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                    >
                      <option value="Bà nội">Bà nội</option>
                      <option value="Ông nội">Ông nội</option>
                      <option value="Bà ngoại">Bà ngoại</option>
                      <option value="Ông ngoại">Ông ngoại</option>
                      <option value="Mẹ">Mẹ</option>
                      <option value="Bố">Bố</option>
                      <option value="Con cái">Con cái</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Họ và tên</label>
                    <input
                      type="text"
                      placeholder="Ví dụ: Bà Mai (76 tuổi)"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Số điện thoại</label>
                  <input
                    type="tel"
                    placeholder="0912.xxx.xxx"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20"
                >
                  Kết Nối Thiết Bị Bảo Vệ
                </button>
              </form>
            )}

            {/* List */}
            {guardians.map((member) => (
              <div
                key={member.id}
                className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-2xl bg-gradient-to-tr ${member.avatarColor} text-white font-bold text-xs flex items-center justify-center shadow-md`}>
                    {member.relationship.slice(0, 2)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-bold text-white">{member.name}</h4>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {member.relationship}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                      <span>SĐT: {member.phone}</span>
                      <span>•</span>
                      <span className="text-emerald-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Lá chắn đang bật
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleSimulateSOS(member)}
                    className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 active:scale-95 transition-all text-[10px] font-bold flex items-center gap-1"
                    title="Thử nghiệm báo động SOS tới con cháu"
                  >
                    <BellRing className="w-3.5 h-3.5" />
                    <span>Test SOS</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-950 flex justify-end">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs"
          >
            Đóng mạng lưới bảo vệ
          </button>
        </div>
      </div>
    </div>
  );
};
