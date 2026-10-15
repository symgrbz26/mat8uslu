import React, { useState } from 'react';
import { Printer, Filter, BookOpen, Layers } from 'lucide-react';
import { CardData, TopicCategory } from '../types/game';
import { TOPIC_LABELS } from '../data/defaultCards';

interface PrintableDeckProps {
  cards: CardData[];
}

export const PrintableDeck: React.FC<PrintableDeckProps> = ({ cards }) => {
  const [selectedTopic, setSelectedTopic] = useState<TopicCategory>('all');
  const [viewSide, setViewSide] = useState<'both' | 'front' | 'back'>('both');

  const filtered = selectedTopic === 'all'
    ? cards
    : selectedTopic === 'ozel_kartlar'
      ? cards.filter(c => c.isCustom)
      : cards.filter(c => c.topic === selectedTopic);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 px-2 sm:px-0">
      {/* Control Strip (Hidden in print) */}
      <div className="print:hidden p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Printer className="w-4 h-4 text-indigo-400" />
            <span>Fiziksel Kart & Çalışma Kağıdı Baskı Modu</span>
          </h2>
          <p className="text-xs text-slate-400">
            Sınıfta kart kesme etkinliği veya fiziksel eş bulma oyunu için A4 formatında yazdırabilirsiniz.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Topic filter */}
          <select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value as TopicCategory)}
            aria-label="Konu Seçin"
            className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            {Object.entries(TOPIC_LABELS).map(([k, label]) => (
              <option key={k} value={k}>
                {label}
              </option>
            ))}
          </select>

          {/* Print button */}
          <button
            onClick={handlePrint}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 shadow-sm transition-colors flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Yazdır (Print)</span>
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 print:grid-cols-2 print:gap-3">
        {filtered.map((card) => (
          <div
            key={card.id}
            className="rounded-2xl border border-slate-800 bg-slate-900/90 print:bg-white print:text-black print:border-black p-4 flex flex-col justify-between space-y-3 min-h-[220px] shadow-md page-break-inside-avoid"
          >
            {/* Front Representation */}
            {(viewSide === 'both' || viewSide === 'front') && (
              <div className="space-y-1.5 pb-2 border-b border-slate-800 print:border-slate-300">
                <div className="flex items-center justify-between text-[11px] text-slate-400 print:text-slate-600">
                  <span className="font-semibold uppercase tracking-wider">
                    Ön Yüz: Soru
                  </span>
                  <span>8. Sınıf</span>
                </div>
                <div className="text-center py-2">
                  <span className="font-mono text-3xl font-bold text-white print:text-black">
                    {card.expression}
                  </span>
                </div>
                {card.expressionSubtext && (
                  <p className="text-[11px] text-center text-slate-300 print:text-slate-700">
                    {card.expressionSubtext}
                  </p>
                )}
              </div>
            )}

            {/* Back Representation */}
            {(viewSide === 'both' || viewSide === 'back') && (
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-emerald-400 print:text-emerald-700 uppercase tracking-wider">
                    Arka Yüz: Çözüm
                  </span>
                  <span className="font-mono font-bold text-emerald-400 print:text-black text-sm">
                    = {card.value}
                  </span>
                </div>
                <div className="space-y-0.5 text-[10px] text-slate-300 print:text-slate-800 font-mono bg-slate-950/60 print:bg-slate-100 p-2 rounded-lg">
                  {card.solutionSteps.map((step, idx) => (
                    <div key={idx}>{step}</div>
                  ))}
                </div>
              </div>
            )}

            <div className="text-[10px] text-slate-500 print:text-slate-500 flex items-center justify-between pt-1">
              <span>{card.difficulty}</span>
              <span>ÜslüKart 8.Sınıf</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
