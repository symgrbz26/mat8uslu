import React from 'react';
import { RotateCw, CheckCircle2, Lightbulb, Sparkles } from 'lucide-react';
import { CardData, CardTheme } from '../types/game';

interface CardItemProps {
  card: CardData;
  isFlipped: boolean;
  onFlipToggle?: () => void;
  isShaking?: boolean;
  showFlipHint?: boolean;
  mode?: 'study' | 'preview';
}

const THEME_STYLES: Record<CardTheme, {
  bg: string;
  border: string;
  accent: string;
  glow: string;
  badge: string;
}> = {
  indigo: {
    bg: 'from-slate-900 via-indigo-950/60 to-slate-900',
    border: 'border-indigo-500/30 group-hover:border-indigo-400/60',
    accent: 'text-indigo-400',
    glow: 'shadow-indigo-500/10',
    badge: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30'
  },
  emerald: {
    bg: 'from-slate-900 via-emerald-950/60 to-slate-900',
    border: 'border-emerald-500/30 group-hover:border-emerald-400/60',
    accent: 'text-emerald-400',
    glow: 'shadow-emerald-500/10',
    badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
  },
  amber: {
    bg: 'from-slate-900 via-amber-950/60 to-slate-900',
    border: 'border-amber-500/30 group-hover:border-amber-400/60',
    accent: 'text-amber-400',
    glow: 'shadow-amber-500/10',
    badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30'
  },
  rose: {
    bg: 'from-slate-900 via-rose-950/60 to-slate-900',
    border: 'border-rose-500/30 group-hover:border-rose-400/60',
    accent: 'text-rose-400',
    glow: 'shadow-rose-500/10',
    badge: 'bg-rose-500/15 text-rose-300 border-rose-500/30'
  },
  purple: {
    bg: 'from-slate-900 via-purple-950/60 to-slate-900',
    border: 'border-purple-500/30 group-hover:border-purple-400/60',
    accent: 'text-purple-400',
    glow: 'shadow-purple-500/10',
    badge: 'bg-purple-500/15 text-purple-300 border-purple-500/30'
  },
  cyan: {
    bg: 'from-slate-900 via-cyan-950/60 to-slate-900',
    border: 'border-cyan-500/30 group-hover:border-cyan-400/60',
    accent: 'text-cyan-400',
    glow: 'shadow-cyan-500/10',
    badge: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30'
  }
};

export const CardItem: React.FC<CardItemProps> = ({
  card,
  isFlipped,
  onFlipToggle,
  isShaking = false,
  showFlipHint = true,
  mode = 'study'
}) => {
  const theme = THEME_STYLES[card.colorTheme] || THEME_STYLES.indigo;

  return (
    <div
      className={`perspective-1000 w-full max-w-sm mx-auto select-none ${
        isShaking ? 'animate-shake' : ''
      }`}
    >
      <div
        className={`relative w-full h-[360px] sm:h-[400px] transition-transform duration-500 transform-style-3d cursor-pointer ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        onClick={onFlipToggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onFlipToggle?.();
          }
        }}
        aria-label={`Üslü Sayı Kartı: ${card.expression}. Arka yüzü görmek için tıklayın.`}
      >
        {/* ===================== FRONT FACE (ÖN YÜZ: ÜSLÜ İFADE) ===================== */}
        <div
          className={`absolute inset-0 w-full h-full backface-hidden rounded-2xl p-6 flex flex-col justify-between border bg-gradient-to-b ${theme.bg} ${theme.border} shadow-xl ${theme.glow}`}
        >
          {/* Card Top Metadata */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>8. Sınıf Matematik</span>
            </span>
            <div className="flex items-center gap-2">
              <span className="text-slate-400 capitalize">{card.difficulty}</span>
              <span className="text-slate-600">·</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onFlipToggle?.();
                }}
                className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Kartı Çevir"
              >
                <RotateCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card Middle: Main Math Expression */}
          <div className="my-auto text-center space-y-3">
            <div className="text-xs font-semibold text-slate-400 tracking-wider uppercase">
              Üslü İfade
            </div>
            <div className="py-2">
              <span className="font-mono text-4xl sm:text-5xl font-bold tracking-tight text-white drop-shadow-md">
                {card.expression}
              </span>
            </div>
            {card.expressionSubtext && (
              <p className="text-xs text-slate-300 max-w-[260px] mx-auto leading-relaxed">
                {card.expressionSubtext}
              </p>
            )}
          </div>

          {/* Card Bottom: Flip hint affordance */}
          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1 text-[11px] text-slate-500">
              Cevap kartın arkasında
            </span>
            {showFlipHint && (
              <div className="flex items-center gap-1.5 text-indigo-400 font-medium">
                <RotateCw className="w-3.5 h-3.5 animate-spin-slow" />
                <span>Çevirip İncele</span>
              </div>
            )}
          </div>
        </div>

        {/* ===================== BACK FACE (ARKA YÜZ: CEVAP & DETAYLI ÇÖZÜM) ===================== */}
        <div
          className={`absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl p-6 flex flex-col justify-between border bg-slate-900/95 border-emerald-500/40 shadow-xl shadow-emerald-500/10 text-slate-100`}
        >
          {/* Back Top */}
          <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-800">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Kartın Arka Sayfası · Çözüm</span>
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onFlipToggle?.();
              }}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Ön Yüze Dön"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>

          {/* Back Middle: Result & Step-by-Step Solution */}
          <div className="my-auto space-y-3.5 overflow-y-auto pr-1">
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-400 block">Soru İfadesi</span>
                <span className="font-mono text-sm font-semibold text-slate-200">{card.expression}</span>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-emerald-400 block font-semibold">Sonuç Değeri</span>
                <span className="font-mono text-2xl font-bold text-white tracking-wide">
                  = {card.value}
                </span>
              </div>
            </div>

            {/* Step-by-Step Breakdown */}
            <div className="space-y-1.5 text-xs">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <span>Adım Adım Pekiştirme Çözümü:</span>
              </div>
              <div className="space-y-1 bg-slate-950/50 p-3 rounded-lg border border-slate-800/80">
                {card.solutionSteps.map((step, idx) => (
                  <p key={idx} className="text-slate-300 leading-relaxed font-mono text-[11px]">
                    {step}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Back Bottom */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span className="text-[11px] text-emerald-400/90 font-medium flex items-center gap-1">
              ✓ Bilgi Pekiştirildi
            </span>
            <span className="text-[11px] text-slate-500">
              Dokunarak çevir
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
