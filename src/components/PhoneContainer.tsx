import React from 'react';
import { 
  Sparkles, 
  Layers, 
  Palette, 
  BookOpen, 
  Battery, 
  Wifi, 
  Signal,
  CheckCircle2
} from 'lucide-react';
import { ActiveTab } from '../types/game';

interface PhoneContainerProps {
  children: React.ReactNode;
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  isMobileFrame: boolean;
  onToggleFrame: () => void;
}

export const PhoneContainer: React.FC<PhoneContainerProps> = ({
  children,
  activeTab,
  onTabChange,
  isMobileFrame,
  onToggleFrame
}) => {
  const currentTime = '09:41';

  if (!isMobileFrame) {
    return (
      <div className="w-full min-h-[calc(100vh-65px)] pb-20 md:pb-8 pt-4 px-3 sm:px-6">
        {children}

        {/* Bottom Navigation for Mobile Screens */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 px-4 py-2 flex items-center justify-around">
          <button
            onClick={() => onTabChange('pekistirme')}
            className={`flex flex-col items-center gap-1 py-1 px-2 text-[10px] font-semibold transition-colors ${
              activeTab === 'pekistirme' ? 'text-indigo-400' : 'text-slate-400'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Pekiştir</span>
          </button>
          <button
            onClick={() => onTabChange('eslesme')}
            className={`flex flex-col items-center gap-1 py-1 px-2 text-[10px] font-semibold transition-colors ${
              activeTab === 'eslesme' ? 'text-indigo-400' : 'text-slate-400'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Eş Bulma</span>
          </button>
          <button
            onClick={() => onTabChange('atolye')}
            className={`flex flex-col items-center gap-1 py-1 px-2 text-[10px] font-semibold transition-colors ${
              activeTab === 'atolye' ? 'text-indigo-400' : 'text-slate-400'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>Atölye</span>
          </button>
          <button
            onClick={() => onTabChange('kurallar')}
            className={`flex flex-col items-center gap-1 py-1 px-2 text-[10px] font-semibold transition-colors ${
              activeTab === 'kurallar' ? 'text-indigo-400' : 'text-slate-400'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Kurallar</span>
          </button>
        </nav>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[calc(100vh-65px)] py-6 px-4 flex flex-col items-center justify-center">
      {/* Mobile Device Mockup Frame */}
      <div className="relative w-full max-w-[420px] bg-slate-900 border-[8px] border-slate-800 rounded-[48px] shadow-2xl overflow-hidden flex flex-col min-h-[820px]">
        {/* Device Status Bar */}
        <div className="w-full bg-slate-950 px-6 pt-3 pb-2 flex items-center justify-between text-xs text-slate-400 select-none shrink-0 border-b border-slate-900">
          <span className="font-semibold text-slate-200 text-xs font-mono">{currentTime}</span>
          {/* Dynamic pill / island */}
          <div className="h-4 w-20 rounded-full bg-slate-900 mx-auto -mt-1 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-slate-800" />
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-3.5 h-3.5 text-emerald-400" />
          </div>
        </div>

        {/* Device Content Area */}
        <div className="flex-1 overflow-y-auto p-3 bg-slate-950 text-slate-100 pb-20">
          {children}
        </div>

        {/* Mobile Device Bottom Tab Bar */}
        <div className="absolute bottom-0 left-0 right-0 z-30 bg-slate-950/95 backdrop-blur-md border-t border-slate-800/80 px-4 py-2.5 flex items-center justify-around">
          <button
            onClick={() => onTabChange('pekistirme')}
            className={`flex flex-col items-center gap-1 py-1 px-2 text-[11px] font-semibold transition-colors ${
              activeTab === 'pekistirme' ? 'text-indigo-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Pekiştir</span>
          </button>
          <button
            onClick={() => onTabChange('eslesme')}
            className={`flex flex-col items-center gap-1 py-1 px-2 text-[11px] font-semibold transition-colors ${
              activeTab === 'eslesme' ? 'text-indigo-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Eş Bulma</span>
          </button>
          <button
            onClick={() => onTabChange('atolye')}
            className={`flex flex-col items-center gap-1 py-1 px-2 text-[11px] font-semibold transition-colors ${
              activeTab === 'atolye' ? 'text-indigo-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>Atölye</span>
          </button>
          <button
            onClick={() => onTabChange('kurallar')}
            className={`flex flex-col items-center gap-1 py-1 px-2 text-[11px] font-semibold transition-colors ${
              activeTab === 'kurallar' ? 'text-indigo-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Kurallar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
