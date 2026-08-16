import React from 'react';
import { 
  Home, 
  SearchCheck, 
  AlertTriangle, 
  BookOpen, 
  ShieldAlert,
  Settings
} from 'lucide-react';
import { TabType } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onSelectTab }) => {
  const navItems = [
    { id: 'dashboard' as TabType, label: 'Trang chủ', icon: Home },
    { id: 'scanner' as TabType, label: 'Thẩm định', icon: SearchCheck, badge: 'AI' },
    { id: 'alerts' as TabType, label: 'Cảnh báo', icon: AlertTriangle, count: 30 },
    { id: 'academy' as TabType, label: 'Thực chiến', icon: BookOpen },
    { id: 'report' as TabType, label: 'Tố giác', icon: ShieldAlert, highlight: true },
    { id: 'settings' as TabType, label: 'Cài đặt', icon: Settings },
  ];

  return (
    <nav className="sticky bottom-0 z-20 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800/90 px-1 py-1.5 flex items-center justify-around shadow-2xl">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            onClick={() => onSelectTab(item.id)}
            className={`
              relative flex flex-col items-center justify-center py-1 px-1.5 rounded-xl transition-all duration-200
              ${isActive 
                ? (item.highlight 
                    ? 'text-rose-400 font-bold' 
                    : 'text-cyan-400 font-bold')
                : 'text-slate-400 hover:text-slate-200'}
              active:scale-90
            `}
          >
            {/* Active Pill Indicator */}
            {isActive && (
              <div 
                className={`
                  absolute -top-1.5 w-6 h-1 rounded-full
                  ${item.highlight ? 'bg-rose-500 shadow-sm shadow-rose-500/50' : 'bg-cyan-400 shadow-sm shadow-cyan-400/50'}
                `} 
              />
            )}

            <div className="relative">
              <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : 'scale-100'} transition-transform`} />
              
              {/* Badge if any */}
              {item.badge && !isActive && (
                <span className="absolute -top-1.5 -right-2 text-[7px] font-bold bg-cyan-500 text-slate-950 px-1 rounded-full">
                  {item.badge}
                </span>
              )}
              {item.count && !isActive && (
                <span className="absolute -top-1.5 -right-2 text-[7px] font-bold bg-rose-500 text-white px-1 rounded-full">
                  {item.count}+
                </span>
              )}
            </div>

            <span className="text-[9px] sm:text-[10px] mt-1 tracking-tight">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
