import React, { useState } from 'react';
import { 
  Palette, 
  RotateCw, 
  Plus, 
  Trash2, 
  Check, 
  Sparkles, 
  Lightbulb, 
  Layers,
  ArrowRight
} from 'lucide-react';
import { CardData, CardTheme, DifficultyLevel, TopicCategory } from '../types/game';
import { CardItem } from './CardItem';
import { sound } from '../utils/sound';

interface CardDesignerProps {
  customCards: CardData[];
  onAddCard: (card: CardData) => void;
  onDeleteCard: (cardId: string) => void;
  onTestCardInPekistirme: (card: CardData) => void;
}

const MATH_SYMBOLS = [
  '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹', '⁰',
  '⁻¹', '⁻²', '⁻³', '⁻⁴', '⁻⁵',
  '·', '/', '(', ')', '+', '-'
];

const THEMES: { id: CardTheme; label: string; colorClass: string }[] = [
  { id: 'indigo', label: 'İndigo', colorClass: 'bg-indigo-600' },
  { id: 'emerald', label: 'Zümrüt', colorClass: 'bg-emerald-600' },
  { id: 'amber', label: 'Kehribar', colorClass: 'bg-amber-600' },
  { id: 'rose', label: 'Yakut', colorClass: 'bg-rose-600' },
  { id: 'purple', label: 'Ametist', colorClass: 'bg-purple-600' },
  { id: 'cyan', label: 'Turkuaz', colorClass: 'bg-cyan-600' }
];

export const CardDesigner: React.FC<CardDesignerProps> = ({
  customCards,
  onAddCard,
  onDeleteCard,
  onTestCardInPekistirme
}) => {
  // Form State
  const [expression, setExpression] = useState('(-4)²');
  const [expressionSubtext, setExpressionSubtext] = useState('Parantezli Negatif Taban Çift Üs');
  const [value, setValue] = useState('16');
  const [wrong1, setWrong1] = useState('-16');
  const [wrong2, setWrong2] = useState('-8');
  const [wrong3, setWrong3] = useState('8');
  const [topic, setTopic] = useState<TopicCategory>('temel_kuvvet');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('orta');
  const [colorTheme, setColorTheme] = useState<CardTheme>('indigo');
  const [hint, setHint] = useState('💡 İpucu: Negatif sayının parantez dışındaki çift kuvveti daima pozitiftir!');
  const [step1, setStep1] = useState('1. Adım: (-4) sayısını iki defa kendisiyle çarp: (-4) · (-4)');
  const [step2, setStep2] = useState('2. Adım: Eksi ile eksinin çarpımı artıdır: +16');
  const [step3, setStep3] = useState('Sonuç: 16');

  // Preview flip state
  const [previewFlipped, setPreviewFlipped] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Active focused input for symbol insertion
  const [lastFocusedField, setLastFocusedField] = useState<'expression' | 'value' | 'hint'>('expression');

  // Insert symbol at current field
  const handleInsertSymbol = (sym: string) => {
    sound.playFlip();
    if (lastFocusedField === 'expression') {
      setExpression(prev => prev + sym);
    } else if (lastFocusedField === 'value') {
      setValue(prev => prev + sym);
    } else {
      setHint(prev => prev + sym);
    }
  };

  // Preview card object
  const previewCard: CardData = {
    id: 'preview-temp',
    expression: expression || 'aⁿ',
    expressionSubtext: expressionSubtext,
    value: value || '?',
    topic: topic,
    difficulty: difficulty,
    hint: hint || 'İpucu hazırlandı.',
    solutionSteps: [step1, step2, step3].filter(s => s.trim().length > 0),
    wrongOptions: [wrong1, wrong2, wrong3].filter(s => s.trim().length > 0),
    colorTheme: colorTheme,
    isCustom: true
  };

  // Handle Save
  const handleSaveCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expression.trim() || !value.trim()) return;

    sound.playCorrect();
    const newCard: CardData = {
      id: `custom-${Date.now()}`,
      expression: expression.trim(),
      expressionSubtext: expressionSubtext.trim(),
      value: value.trim(),
      topic: topic,
      difficulty: difficulty,
      hint: hint.trim() || 'İpucu: Üslü sayı kurallarını tekrar gözden geçir.',
      solutionSteps: [step1, step2, step3].filter(s => s.trim().length > 0),
      wrongOptions: [wrong1, wrong2, wrong3].filter(s => s.trim().length > 0),
      colorTheme: colorTheme,
      isCustom: true,
      createdAt: Date.now()
    };

    onAddCard(newCard);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  // Quick Template load
  const loadTemplate = (type: 'negatif' | 'carpma' | 'kesir') => {
    sound.playFlip();
    if (type === 'negatif') {
      setExpression('4⁻²');
      setExpressionSubtext('Negatif Üs Ters Çevirme');
      setValue('1/16');
      setWrong1('-16');
      setWrong2('-8');
      setWrong3('1/8');
      setTopic('negatif_us');
      setDifficulty('kolay');
      setColorTheme('emerald');
      setHint('💡 İpucu: Negatif üs sayıyı paydaya indirir: a⁻ⁿ = 1/aⁿ. 4⁻² = 1/4² = 1/16.');
      setStep1('1. Adım: a⁻ⁿ = 1/aⁿ kuralını uygula: 1/4²');
      setStep2('2. Adım: 4² = 16 olarak hesapla');
      setStep3('Sonuç: 1/16');
    } else if (type === 'carpma') {
      setExpression('3⁴ · 3⁻²');
      setExpressionSubtext('Tabanları Eşit Üslü Çarpma');
      setValue('9');
      setWrong1('27');
      setWrong2('3');
      setWrong3('81');
      setTopic('carpma_bolme');
      setDifficulty('orta');
      setColorTheme('amber');
      setHint('💡 İpucu: Tabanlar eşit olduğunda çarpma işleminde üsler toplanır: 4 + (-2) = 2.');
      setStep1('1. Adım: Taban 3 aynen kalır, üsler toplanır: 4 + (-2) = 2');
      setStep2('2. Adım: 3² = 9');
      setStep3('Sonuç: 9');
    } else {
      setExpression('(2/3)⁻²');
      setExpressionSubtext('Rasyonel Sayının Negatif Kuvveti');
      setValue('9/4');
      setWrong1('4/9');
      setWrong2('-9/4');
      setWrong3('6/4');
      setTopic('negatif_us');
      setDifficulty('zor');
      setColorTheme('purple');
      setHint('💡 İpucu: Kesirli sayının negatif kuvveti alınırken pay ve payda yer değiştirir: (a/b)⁻ⁿ = (b/a)ⁿ.');
      setStep1('1. Adım: Kesir takla atar: (3/2)²');
      setStep2('2. Adım: Hem payın hem paydanın karesi alınır: 3² / 2² = 9/4');
      setStep3('Sonuç: 9/4');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 pb-12 px-2 sm:px-0">
      {/* Studio Header */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Kart Tasarım Atölyesi</span>
          </h2>
          <p className="text-xs text-slate-400">
            Kendi üslü sayı sorularınızı ve çözümlü arka sayfalarını tasarlayın.
          </p>
        </div>

        {/* Quick templates */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => loadTemplate('negatif')}
            className="px-2 py-1 text-[11px] bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded text-slate-300 transition-colors"
          >
            Örnek: Negatif
          </button>
          <button
            type="button"
            onClick={() => loadTemplate('carpma')}
            className="px-2 py-1 text-[11px] bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded text-slate-300 transition-colors"
          >
            Örnek: Çarpma
          </button>
        </div>
      </div>

      {/* Live 3D Preview Box */}
      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span className="font-semibold text-slate-300">Canlı 3D Kart Önizlemesi</span>
          <button
            type="button"
            onClick={() => {
              sound.playFlip();
              setPreviewFlipped(prev => !prev);
            }}
            className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-medium"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>{previewFlipped ? 'Ön Yüzü Gör' : 'Arka Sayfayı Çevir'}</span>
          </button>
        </div>

        <CardItem
          card={previewCard}
          isFlipped={previewFlipped}
          onFlipToggle={() => {
            sound.playFlip();
            setPreviewFlipped(prev => !prev);
          }}
          mode="preview"
        />
      </div>

      {/* Math Symbols Quick Toolbar */}
      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
        <div className="text-[11px] text-slate-400 font-medium flex items-center justify-between">
          <span>Hızlı Matematik Simgeleri (Dokunarak Ekle):</span>
          <span className="text-[10px] text-indigo-400">Aktif alan: {lastFocusedField}</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {MATH_SYMBOLS.map((sym, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleInsertSymbol(sym)}
              className="h-8 min-w-[32px] px-2 rounded-lg bg-slate-950 border border-slate-700/80 hover:border-indigo-400 text-white font-mono text-sm font-semibold hover:bg-slate-800 active:scale-95 transition-all"
            >
              {sym}
            </button>
          ))}
        </div>
      </div>

      {/* Design Form */}
      <form onSubmit={handleSaveCard} className="space-y-4">
        {/* Expression & Value (Front & Back essentials) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 block">
              1. Kart Ön Yüzü: Üslü İfade *
            </label>
            <input
              type="text"
              required
              value={expression}
              onFocus={() => setLastFocusedField('expression')}
              onChange={(e) => setExpression(e.target.value)}
              placeholder="Örn: (-2)⁴ veya 2⁻³"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-sm font-mono font-bold text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 block">
              2. Kart Arka Yüzü: Doğru Değeri *
            </label>
            <input
              type="text"
              required
              value={value}
              onFocus={() => setLastFocusedField('value')}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Örn: 16 veya 1/8"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-sm font-mono font-bold text-emerald-400 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Subtitle / Topic Category */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="space-y-1 sm:col-span-1">
            <label className="text-xs font-semibold text-slate-300 block">
              Kategori
            </label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value as TopicCategory)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="temel_kuvvet">Temel Kuvvet & İşaretler</option>
              <option value="negatif_us">Negatif Üs & Ters Çevirme</option>
              <option value="carpma_bolme">Çarpma & Bölme</option>
              <option value="ussun_ussu">Üssün Üssü</option>
            </select>
          </div>

          <div className="space-y-1 sm:col-span-1">
            <label className="text-xs font-semibold text-slate-300 block">
              Zorluk
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as DifficultyLevel)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="kolay">Kolay Seviye</option>
              <option value="orta">Orta Seviye</option>
              <option value="zor">Zor (LGS Tarzı)</option>
            </select>
          </div>

          <div className="space-y-1 sm:col-span-1">
            <label className="text-xs font-semibold text-slate-300 block">
              Kazanım Başlığı
            </label>
            <input
              type="text"
              value={expressionSubtext}
              onChange={(e) => setExpressionSubtext(e.target.value)}
              placeholder="Örn: Parantez kuralı"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Card Theme Color Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 block flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-indigo-400" />
            <span>Kart Renk Teması</span>
          </label>
          <div className="grid grid-cols-6 gap-2">
            {THEMES.map((th) => (
              <button
                key={th.id}
                type="button"
                onClick={() => {
                  sound.playFlip();
                  setColorTheme(th.id);
                }}
                className={`py-2 px-1 rounded-xl border text-center transition-all ${
                  colorTheme === th.id
                    ? 'border-white bg-slate-800 shadow-md ring-2 ring-indigo-500/50'
                    : 'border-slate-800 bg-slate-950 hover:bg-slate-900'
                }`}
              >
                <div className={`w-4 h-4 rounded-full mx-auto mb-1 ${th.colorClass}`} />
                <span className="text-[10px] text-slate-300 block truncate font-medium">
                  {th.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Distractor wrong choices for Pekleştirme mode */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 block">
            Çeldirici Yanlış Şıklar (Öğrencinin yanılabileceği 3 değer):
          </label>
          <div className="grid grid-cols-3 gap-2">
            <input
              type="text"
              value={wrong1}
              onChange={(e) => setWrong1(e.target.value)}
              placeholder="Yanlış 1"
              className="bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-2 text-xs font-mono text-slate-300 focus:border-indigo-500"
            />
            <input
              type="text"
              value={wrong2}
              onChange={(e) => setWrong2(e.target.value)}
              placeholder="Yanlış 2"
              className="bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-2 text-xs font-mono text-slate-300 focus:border-indigo-500"
            />
            <input
              type="text"
              value={wrong3}
              onChange={(e) => setWrong3(e.target.value)}
              placeholder="Yanlış 3"
              className="bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-2 text-xs font-mono text-slate-300 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Pedagogical Hint */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300 block flex items-center gap-1.5">
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span>Öğrenci Yanlış Cevap Verdiğinde Gösterilecek İpucu</span>
          </label>
          <textarea
            rows={2}
            value={hint}
            onFocus={() => setLastFocusedField('hint')}
            onChange={(e) => setHint(e.target.value)}
            placeholder="İpucu: Negatif üs kuralı..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-amber-200 focus:outline-none focus:border-amber-500 font-sans"
          />
        </div>

        {/* Step-by-Step Solution Breakdown on Back */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 block">
            Kartın Arka Sayfasındaki Çözüm Adımları (Pekiştirme için):
          </label>
          <input
            type="text"
            value={step1}
            onChange={(e) => setStep1(e.target.value)}
            placeholder="1. Adım açıklaması"
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-slate-300 focus:border-indigo-500"
          />
          <input
            type="text"
            value={step2}
            onChange={(e) => setStep2(e.target.value)}
            placeholder="2. Adım açıklaması"
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-slate-300 focus:border-indigo-500"
          />
          <input
            type="text"
            value={step3}
            onChange={(e) => setStep3(e.target.value)}
            placeholder="3. Adım / Sonuç özeti"
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-slate-300 focus:border-indigo-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 active:scale-98"
        >
          {savedSuccess ? (
            <>
              <Check className="w-4 h-4 text-emerald-300" />
              <span>Kart Başarıyla Desteye Eklendi!</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              <span>Kartı Desteye Ekle & Kaydet</span>
            </>
          )}
        </button>
      </form>

      {/* List of Custom Designed Cards */}
      {customCards.length > 0 && (
        <div className="space-y-3 pt-6 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>Tasarladığım Özel Kartlar ({customCards.length})</span>
            </h3>
          </div>

          <div className="space-y-2">
            {customCards.map((card) => (
              <div
                key={card.id}
                className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3 hover:border-slate-700 transition-colors"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-base font-bold text-white">
                      {card.expression}
                    </span>
                    <span className="text-slate-500">➔</span>
                    <span className="font-mono text-sm font-semibold text-emerald-400">
                      = {card.value}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    {card.expressionSubtext || card.hint}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => onTestCardInPekistirme(card)}
                    className="px-2.5 py-1 text-xs font-medium text-indigo-300 bg-indigo-950/60 border border-indigo-500/30 rounded-lg hover:bg-indigo-900/60 transition-colors flex items-center gap-1"
                  >
                    <span>Oyna</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      sound.playWrong();
                      onDeleteCard(card.id);
                    }}
                    className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors"
                    title="Kartı Sil"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
