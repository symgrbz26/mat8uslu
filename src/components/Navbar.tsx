import React from 'react';
import { Volume2, VolumeX, Smartphone, Monitor, BookOpen } from 'lucide-react';
import { ActiveTab } from '../types/game';
import { sound } from '../utils/sound';

interface NavbarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  isMobileFrame: boolean;
  onToggleFrame: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenRules: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  isMobileFrame,
  onToggleFrame,
  isMuted,
  onToggleMute,
  onOpenRules,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md px-4 lg:px-8 py-3">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onTabChange('pekistirme')}
          className="text-left group cursor-pointer focus:outline-none"
        >
          <span className="text-lg md:text-xl font-bold tracking-tight text-white whitespace-nowrap shrink-0 flex items-center gap-2">
            <span className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center font-mono font-black text-white shadow-md shadow-indigo-500/20 text-sm">
              xⁿ
            </span>
            <span>ÜslüKart 8</span>
          </span>
        </button>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => onTabChange('pekistirme')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 hover:text-white ${
              activeTab === 'pekistirme'
                ? 'text-indigo-400 font-semibold border-b-2 border-indigo-400'
                : 'text-slate-400'
            }`}
          >
            Pekiştirme
          </button>
          <button
            onClick={() => onTabChange('eslesme')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 hover:text-white ${
              activeTab === 'eslesme'
                ? 'text-indigo-400 font-semibold border-b-2 border-indigo-400'
                : 'text-slate-400'
            }`}
          >
            Eş Bulma
          </button>
          <button
            onClick={() => onTabChange('atolye')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 hover:text-white ${
              activeTab === 'atolye'
                ? 'text-indigo-400 font-semibold border-b-2 border-indigo-400'
                : 'text-slate-400'
            }`}
          >
            Kart Atölyesi
          </button>
          <button
            onClick={() => onTabChange('yazdir')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 hover:text-white ${
              activeTab === 'yazdir'
                ? 'text-indigo-400 font-semibold border-b-2 border-indigo-400'
                : 'text-slate-400'
            }`}
          >
            Yazdır / Kartlar
          </button>
          <button
            onClick={onOpenRules}
            className="whitespace-nowrap shrink-0 transition-colors py-1 text-slate-400 hover:text-amber-400 flex items-center gap-1.5"
          >
            <BookOpen className="w-4 h-4" />
            <span>Kurallar</span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action area */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              onToggleMute();
              sound.playFlip();
            }}
            title={isMuted ? 'Sesi Aç' : 'Sesi Kapat'}
            aria-label={isMuted ? 'Sesi Aç' : 'Sesi Kapat'}
            className="p-2 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-lg hover:border-slate-700 transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          <button
            onClick={onToggleFrame}
            title={isMobileFrame ? 'Geniş Masaüstü Görünümüne Geç' : 'Mobil Telefon Görünümüne Geç'}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 border border-slate-800 rounded-lg hover:border-slate-700 hover:text-white transition-colors"
          >
            {isMobileFrame ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-indigo-400" />
                <span className="whitespace-nowrap">Geniş Mod</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-indigo-400" />
                <span className="whitespace-nowrap">Telefon Modu</span>
              </>
            )}
          </button>

          <button
            onClick={() => onTabChange('atolye')}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 shadow-sm shadow-indigo-600/30 transition-colors whitespace-nowrap shrink-0"
          >
            + Kart Tasarla
          </button>
        </div>
      </div>
    </header>
  );
};
