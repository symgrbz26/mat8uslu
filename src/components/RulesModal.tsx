import React from 'react';
import { X, Sparkles, CheckCircle2, AlertTriangle, BookOpen } from 'lucide-react';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl max-h-[90vh] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-white">8. Sınıf Üslü Sayılar Kuralları</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* 1. Kural: İşaret Kuralları */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-indigo-400 font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>1. Negatif Sayıların Kuvvetleri ve Parantez Tuzağı</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs leading-relaxed text-slate-300">
              <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-800/40">
                <span className="font-semibold text-emerald-400 block mb-1">Parantez VAR: (-2)⁴ = +16</span>
                Çift üs parantezin dışındaysa eksi işareti de çift sayıda çarpılır, sonuç daima <strong className="text-white">POZİTİF</strong> olur.
              </div>
              <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-800/40">
                <span className="font-semibold text-rose-400 block mb-1">Parantez YOK: -2⁴ = -16</span>
                Üs sadece 2 sayısına aittir! Eksi işaret üsten etkilenmez ve önde kalır, sonuç <strong className="text-white">NEGATİF</strong> olur.
              </div>
            </div>
          </div>

          {/* 2. Kural: Negatif Üs */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-semibold">
              <AlertTriangle className="w-4 h-4" />
              <span>2. Negatif Üs (Kuvvet) Kuralı: Sayıyı Takla Attırır!</span>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              Üssün eksi olması sayının işaretini <strong className="text-rose-400">kesinlikle eksi yapmaz</strong>. Negatif üs sayıyı çarpmaya göre ters çevirir:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-700/60 text-center">
                <span className="text-slate-400 block text-[11px] mb-1">Formül</span>
                <span className="text-amber-300 font-semibold">a⁻ⁿ = 1 / aⁿ</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-700/60 text-center">
                <span className="text-slate-400 block text-[11px] mb-1">Örnek 1</span>
                <span className="text-amber-300 font-semibold">2⁻³ = 1/2³ = 1/8</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-700/60 text-center">
                <span className="text-slate-400 block text-[11px] mb-1">Kesir Örneği</span>
                <span className="text-amber-300 font-semibold">(1/3)⁻² = 3² = 9</span>
              </div>
            </div>
          </div>

          {/* 3. Kural: Çarpma ve Bölme */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>3. Çarpma ve Bölme İşlemleri</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
                <span className="font-semibold text-cyan-300">Tabanlar Eşitse:</span>
                <p className="text-slate-300">Çarpmada üsler <strong className="text-white">TOPLANIR</strong>: <code className="text-cyan-400 font-mono">aᵐ · aⁿ = aᵐ⁺ⁿ</code></p>
                <p className="text-slate-300">Bölmede üsler <strong className="text-white">ÇIKARILIR</strong>: <code className="text-cyan-400 font-mono">aᵐ / aⁿ = aᵐ⁻ⁿ</code></p>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
                <span className="font-semibold text-cyan-300">Üsler Eşitse:</span>
                <p className="text-slate-300">Çarpmada tabanlar çarpılır: <code className="text-cyan-400 font-mono">aⁿ · bⁿ = (a·b)ⁿ</code></p>
                <p className="text-slate-300">Bölmede tabanlar bölünür: <code className="text-cyan-400 font-mono">aⁿ / bⁿ = (a/b)ⁿ</code></p>
              </div>
            </div>
          </div>

          {/* 4. Kural: Üssün Üssü */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-purple-400 font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>4. Üssün Üssü: (aᵐ)ⁿ = aᵐ·ⁿ</span>
            </div>
            <p className="text-xs text-slate-300">
              Kuvvetin kuvveti alınırken üsler çarpılır. Örnek: <code className="text-purple-300 font-mono font-semibold">(2³)² = 2⁶ = 64</code>. Aynı zamanda tabanları eşitlemek için çok kullanılır (Örn: 8² = (2³)² = 2⁶).
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/80 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors"
          >
            Anladım, Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
