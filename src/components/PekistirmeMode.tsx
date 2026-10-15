import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { 
  Lightbulb, 
  RotateCw, 
  ArrowRight, 
  Sparkles, 
  Flame, 
  Trophy, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Filter
} from 'lucide-react';
import { CardData, TopicCategory, UserStats } from '../types/game';
import { CardItem } from './CardItem';
import { sound } from '../utils/sound';
import { TOPIC_LABELS } from '../data/defaultCards';

interface PekistirmeModeProps {
  cards: CardData[];
  stats: UserStats;
  onUpdateStats: (updater: (prev: UserStats) => UserStats) => void;
  onSwitchToMatch: () => void;
  onSwitchToDesigner: () => void;
}

export const PekistirmeMode: React.FC<PekistirmeModeProps> = ({
  cards,
  stats,
  onUpdateStats,
  onSwitchToMatch,
  onSwitchToDesigner
}) => {
  const [selectedTopic, setSelectedTopic] = useState<TopicCategory>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [disabledOptions, setDisabledOptions] = useState<string[]>([]);
  const [isAnsweredCorrectly, setIsAnsweredCorrectly] = useState(false);
  const [firstTryFailed, setFirstTryFailed] = useState(false);
  const [questionCompleted, setQuestionCompleted] = useState(false);
  const [deckCompleted, setDeckCompleted] = useState(false);

  // Filter cards by category
  const filteredCards = useMemo(() => {
    if (selectedTopic === 'all') return cards;
    if (selectedTopic === 'ozel_kartlar') return cards.filter(c => c.isCustom);
    return cards.filter(c => c.topic === selectedTopic);
  }, [cards, selectedTopic]);

  const currentCard = filteredCards[currentIndex] || filteredCards[0];

  // Options shuffled for current question
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  // When card or index changes, generate randomized choices
  useEffect(() => {
    if (!currentCard) return;
    setIsFlipped(false);
    setShowHint(false);
    setDisabledOptions([]);
    setIsAnsweredCorrectly(false);
    setFirstTryFailed(false);
    setQuestionCompleted(false);

    const allOpts = Array.from(new Set([currentCard.value, ...currentCard.wrongOptions]));
    // Shuffle options
    const shuffled = [...allOpts].sort(() => Math.random() - 0.5);
    setShuffledOptions(shuffled);
  }, [currentCard, currentIndex, selectedTopic]);

  // Handle Option Click
  const handleSelectOption = (chosenValue: string) => {
    if (isAnsweredCorrectly || !currentCard) return;

    if (chosenValue === currentCard.value) {
      // CORRECT ANSWER!
      sound.playCorrect();
      sound.triggerHaptic('success');
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.65 }
      });

      setIsAnsweredCorrectly(true);
      setQuestionCompleted(true);
      setIsFlipped(true); // Automatically flip to back to show solution & consolidate knowledge!

      const pointsEarned = firstTryFailed ? 60 : 100 + stats.streak * 10;
      onUpdateStats(prev => ({
        ...prev,
        score: prev.score + pointsEarned,
        streak: prev.streak + 1,
        bestStreak: Math.max(prev.bestStreak, prev.streak + 1),
        totalAnswered: prev.totalAnswered + 1,
        firstTryCorrect: prev.firstTryCorrect + (firstTryFailed ? 0 : 1)
      }));
    } else {
      // WRONG ANSWER!
      // Requirement: "yanlış cevap verince diğer soruya geçmesin ancak ipucu versin ve tekrar cevap hakkı tanısın."
      sound.playWrong();
      sound.triggerHaptic('error');

      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);

      setShowHint(true);
      setFirstTryFailed(true);
      setDisabledOptions(prev => [...prev, chosenValue]);

      onUpdateStats(prev => ({
        ...prev,
        streak: 0,
        hintsUsed: prev.hintsUsed + 1
      }));
    }
  };

  const handleNextQuestion = () => {
    sound.playFlip();
    if (currentIndex + 1 < filteredCards.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      sound.playFanfare();
      setDeckCompleted(true);
    }
  };

  const handleRestartDeck = () => {
    sound.playFlip();
    setCurrentIndex(0);
    setDeckCompleted(false);
    setIsFlipped(false);
    setShowHint(false);
    setDisabledOptions([]);
    setIsAnsweredCorrectly(false);
  };

  if (!currentCard || filteredCards.length === 0) {
    return (
      <div className="p-8 text-center max-w-md mx-auto space-y-4">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
          <HelpCircle className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-white">Bu Kategoride Henüz Kart Yok</h3>
        <p className="text-xs text-slate-400">
          Özel kart tasarlayarak kendi sorularınızı ekleyebilir veya diğer konulara göz atabilirsiniz.
        </p>
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => setSelectedTopic('all')}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
          >
            Tüm Kartları Göster
          </button>
          <button
            onClick={onSwitchToDesigner}
            className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors"
          >
            Kart Tasarla
          </button>
        </div>
      </div>
    );
  }

  // Deck Completed Screen
  if (deckCompleted) {
    return (
      <div className="p-6 max-w-md mx-auto text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
        <div className="w-20 h-20 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
          <Trophy className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">Tebrikler! Deste Tamamlandı</h2>
          <p className="text-xs text-slate-400">
            Seçilen konudaki tüm üslü sayı kartlarını çözdün ve bilgilerini pekiştirdin.
          </p>
        </div>

        {/* Score Summary Box */}
        <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-slate-900 border border-slate-800 text-left">
          <div>
            <span className="text-[11px] text-slate-400 block">Kazanılan Puan</span>
            <span className="text-xl font-bold font-mono text-indigo-400 tabular-nums">
              {stats.score}
            </span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block">En İyi Seri</span>
            <span className="text-xl font-bold font-mono text-amber-400 tabular-nums">
              🔥 {stats.bestStreak}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5">
          <button
            onClick={handleRestartDeck}
            className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Desteyi Yeniden Çöz</span>
          </button>
          <button
            onClick={onSwitchToMatch}
            className="w-full py-3 px-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 text-xs font-semibold transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Eş Bulma Oyununa Geç</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-4 px-2 sm:px-0">
      {/* Top Header: Topic selector & Stats */}
      <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
        {/* Topic dropdown */}
        <div className="relative flex-1">
          <select
            value={selectedTopic}
            onChange={(e) => {
              setSelectedTopic(e.target.value as TopicCategory);
              setCurrentIndex(0);
            }}
            aria-label="Konu Seçimi"
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-medium"
          >
            {Object.entries(TOPIC_LABELS).map(([key, label]) => (
              <option key={key} value={key} className="bg-slate-900 text-slate-200">
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Live Score & Streak */}
        <div className="flex items-center gap-3 shrink-0 pl-1">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block leading-tight">Puan</span>
            <span className="text-xs font-bold font-mono text-indigo-400 tabular-nums">
              {stats.score}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block leading-tight">Seri</span>
            <span className="text-xs font-bold font-mono text-amber-400 tabular-nums flex items-center gap-0.5">
              <Flame className="w-3 h-3 text-amber-500" />
              {stats.streak}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span className="font-mono text-[11px] tabular-nums">
          Kart {currentIndex + 1} / {filteredCards.length}
        </span>
        <button
          onClick={() => {
            sound.playFlip();
            setIsFlipped(prev => !prev);
          }}
          className="text-indigo-400 hover:text-indigo-300 text-[11px] flex items-center gap-1 font-medium"
        >
          <RotateCw className="w-3 h-3" />
          <span>{isFlipped ? 'Ön Yüzü Göster' : 'Arka Sayfayı Çevir'}</span>
        </button>
      </div>

      {/* Interactive 3D Card Display */}
      <CardItem
        card={currentCard}
        isFlipped={isFlipped}
        onFlipToggle={() => {
          sound.playFlip();
          setIsFlipped(prev => !prev);
        }}
        isShaking={isShaking}
        showFlipHint={!isAnsweredCorrectly}
      />

      {/* Answering Area */}
      <div className="space-y-3 pt-1">
        {/* Choices Label */}
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-semibold text-slate-300">
            {isAnsweredCorrectly 
              ? '✓ Doğru Eşleşti! Kartın arkasındaki çözümü inceleyin' 
              : 'Bu üslü ifadenin değeri hangisidir?'}
          </span>
          {!isAnsweredCorrectly && !showHint && (
            <button
              onClick={() => {
                sound.playHint();
                setShowHint(true);
                onUpdateStats(prev => ({ ...prev, hintsUsed: prev.hintsUsed + 1 }));
              }}
              className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium transition-colors"
            >
              <Lightbulb className="w-3 h-3" />
              <span>İpucu İste</span>
            </button>
          )}
        </div>

        {/* 4 Multi-Choice Option Buttons */}
        {!isAnsweredCorrectly ? (
          <div className="grid grid-cols-2 gap-2.5">
            {shuffledOptions.map((option, idx) => {
              const isDisabled = disabledOptions.includes(option);
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(option)}
                  disabled={isDisabled}
                  className={`py-3 px-4 rounded-xl text-sm font-mono font-bold transition-all min-h-[50px] flex items-center justify-center relative ${
                    isDisabled
                      ? 'bg-slate-900/50 border border-rose-500/30 text-rose-400 line-through opacity-50 cursor-not-allowed'
                      : 'bg-slate-900 border border-slate-700/80 hover:border-indigo-500 hover:bg-slate-850 text-white shadow-md active:scale-95'
                  }`}
                >
                  <span className="tabular-nums">{option}</span>
                </button>
              );
            })}
          </div>
        ) : (
          /* Next Question Button after correct answer */
          <div className="space-y-2">
            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Doğru cevap! Çözüm adımlarını okuyup pekiştirdiysen devam et.</span>
            </div>
            <button
              onClick={handleNextQuestion}
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 active:scale-98"
            >
              <span>Sonraki Soruya Geç</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Pedagogical Hint Box (Appears on wrong answer or when hint is requested) */}
        {showHint && !isAnsweredCorrectly && (
          <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/40 text-amber-200 text-xs space-y-2 animate-in fade-in duration-200">
            <div className="flex items-center gap-1.5 font-semibold text-amber-400">
              <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Yanlış Cevap! İpucunu İncele ve Tekrar Dene:</span>
            </div>
            <p className="text-[12px] leading-relaxed text-amber-100/90 pl-5 font-sans">
              {currentCard.hint}
            </p>
            <div className="pl-5 pt-1 text-[11px] text-amber-300/80 italic">
              ↳ Diğer soruya geçilmedi; kuralları hatırlayıp tekrar bir şık seçebilirsiniz.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
