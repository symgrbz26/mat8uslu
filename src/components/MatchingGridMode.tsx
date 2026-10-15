import React, { useState, useEffect, useMemo, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  RefreshCw, 
  Timer, 
  MousePointerClick, 
  Trophy, 
  Flame, 
  HelpCircle,
  Eye,
  CheckCircle2
} from 'lucide-react';
import { CardData, MatchTile, TopicCategory, UserStats } from '../types/game';
import { sound } from '../utils/sound';
import { TOPIC_LABELS } from '../data/defaultCards';

interface MatchingGridModeProps {
  cards: CardData[];
  stats: UserStats;
  onUpdateStats: (updater: (prev: UserStats) => UserStats) => void;
  onSwitchToPekistirme: () => void;
}

export const MatchingGridMode: React.FC<MatchingGridModeProps> = ({
  cards,
  stats,
  onUpdateStats,
  onSwitchToPekistirme
}) => {
  const [selectedTopic, setSelectedTopic] = useState<TopicCategory>('all');
  const [pairCount, setPairCount] = useState<number>(6); // 6 pairs = 12 tiles (3x4 grid)
  const [tiles, setTiles] = useState<MatchTile[]>([]);
  const [flippedUids, setFlippedUids] = useState<string[]>([]);
  const [isLocked, setIsLocked] = useState(false);
  const [moves, setMoves] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [lastHint, setLastHint] = useState<string | null>(null);

  const timerRef = useRef<number | null>(null);

  // Filter available cards by topic
  const eligibleCards = useMemo(() => {
    if (selectedTopic === 'all') return cards;
    if (selectedTopic === 'ozel_kartlar') return cards.filter(c => c.isCustom);
    const filtered = cards.filter(c => c.topic === selectedTopic);
    return filtered.length >= 4 ? filtered : cards;
  }, [cards, selectedTopic]);

  // Generate new board
  const setupGame = () => {
    // Pick pairs
    const shuffledCards = [...eligibleCards].sort(() => Math.random() - 0.5);
    const chosenCards = shuffledCards.slice(0, pairCount);

    const generatedTiles: MatchTile[] = [];

    chosenCards.forEach((card, idx) => {
      // Expression tile
      generatedTiles.push({
        uid: `exp-${card.id}-${idx}`,
        cardId: card.id,
        type: 'expression',
        content: card.expression,
        subtext: 'Üslü İfade',
        matched: false,
        colorTheme: card.colorTheme
      });

      // Value tile
      generatedTiles.push({
        uid: `val-${card.id}-${idx}`,
        cardId: card.id,
        type: 'value',
        content: card.value,
        subtext: 'Değeri',
        matched: false,
        colorTheme: card.colorTheme
      });
    });

    // Shuffle tiles
    setTiles(generatedTiles.sort(() => Math.random() - 0.5));
    setFlippedUids([]);
    setIsLocked(false);
    setMoves(0);
    setTimerSeconds(0);
    setIsGameActive(true);
    setGameWon(false);
    setLastHint(null);
  };

  useEffect(() => {
    setupGame();
  }, [selectedTopic, pairCount]);

  // Timer tick
  useEffect(() => {
    if (isGameActive && !gameWon) {
      timerRef.current = window.setInterval(() => {
        setTimerSeconds(s => s + 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isGameActive, gameWon]);

  // Handle Tile Click
  const handleTileClick = (tile: MatchTile) => {
    if (isLocked || tile.matched || flippedUids.includes(tile.uid)) return;

    sound.playFlip();

    if (flippedUids.length === 0) {
      setFlippedUids([tile.uid]);
    } else if (flippedUids.length === 1) {
      const firstUid = flippedUids[0];
      const firstTile = tiles.find(t => t.uid === firstUid);
      if (!firstTile) return;

      const newFlipped = [firstUid, tile.uid];
      setFlippedUids(newFlipped);
      setMoves(m => m + 1);

      // Check Match
      if (firstTile.cardId === tile.cardId && firstTile.type !== tile.type) {
        // MATCH!
        sound.playCorrect();
        sound.triggerHaptic('success');
        setLastHint(null);

        // Mark tiles as matched
        setTiles(prev =>
          prev.map(t =>
            t.uid === firstTile.uid || t.uid === tile.uid
              ? { ...t, matched: true }
              : t
          )
        );

        setFlippedUids([]);

        // Award score
        const points = 150 + Math.max(0, 50 - moves * 2);
        onUpdateStats(prev => ({
          ...prev,
          score: prev.score + points,
          streak: prev.streak + 1,
          bestStreak: Math.max(prev.bestStreak, prev.streak + 1)
        }));

        // Check if all matched
        const remainingUnmatched = tiles.filter(
          t => t.uid !== firstTile.uid && t.uid !== tile.uid && !t.matched
        );

        if (remainingUnmatched.length === 0) {
          // WON!
          setTimeout(() => {
            sound.playFanfare();
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 }
            });
            setGameWon(true);
            setIsGameActive(false);
            onUpdateStats(prev => ({
              ...prev,
              matchingGamesWon: prev.matchingGamesWon + 1
            }));
          }, 300);
        }
      } else {
        // NO MATCH
        // Show hint to reinforce learning!
        setIsLocked(true);
        sound.playWrong();
        sound.triggerHaptic('error');

        // Find the matched card hint for the first tile
        const matchingCard = cards.find(c => c.id === firstTile.cardId);
        if (matchingCard) {
          setLastHint(`İpucu: "${firstTile.content}" ifadesi için kuralları hatırla! ${matchingCard.hint}`);
        }

        setTimeout(() => {
          setFlippedUids([]);
          setIsLocked(false);
        }, 1200);
      }
    }
  };

  // Peek all tiles briefly
  const handlePeekHint = () => {
    if (isLocked || gameWon) return;
    sound.playHint();
    setIsLocked(true);
    const allUids = tiles.map(t => t.uid);
    setFlippedUids(allUids);
    onUpdateStats(prev => ({
      ...prev,
      hintsUsed: prev.hintsUsed + 1
    }));
    setTimeout(() => {
      setFlippedUids([]);
      setIsLocked(false);
    }, 1500);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4 px-2 sm:px-0">
      {/* Top Header: Topic & Settings */}
      <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
        <div className="relative flex-1">
          <select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value as TopicCategory)}
            aria-label="Konu Filtresi"
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-medium"
          >
            {Object.entries(TOPIC_LABELS).map(([key, label]) => (
              <option key={key} value={key} className="bg-slate-900 text-slate-200">
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Tile count toggle: 4 pairs (8 tiles) or 6 pairs (12 tiles) */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setPairCount(4)}
            className={`px-2 py-1 text-[11px] font-semibold rounded ${
              pairCount === 4 ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            8 Kart
          </button>
          <button
            onClick={() => setPairCount(6)}
            className={`px-2 py-1 text-[11px] font-semibold rounded ${
              pairCount === 6 ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            12 Kart
          </button>
        </div>
      </div>

      {/* Stats Bar: Timer, Moves, Peek */}
      <div className="grid grid-cols-3 gap-2 px-1 text-center">
        <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center gap-1.5">
          <Timer className="w-3.5 h-3.5 text-indigo-400" />
          <span className="font-mono text-xs font-bold text-white tabular-nums">
            {formatTime(timerSeconds)}
          </span>
        </div>
        <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center gap-1.5">
          <MousePointerClick className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-mono text-xs font-bold text-white tabular-nums">
            {moves} Hamle
          </span>
        </div>
        <button
          onClick={handlePeekHint}
          disabled={isLocked || gameWon}
          className="p-2 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white flex items-center justify-center gap-1.5 transition-colors disabled:opacity-40"
        >
          <Eye className="w-3.5 h-3.5 text-cyan-400" />
          <span>Göz At</span>
        </button>
      </div>

      {/* Memory Grid Canvas */}
      <div 
        className={`grid ${
          pairCount === 4 ? 'grid-cols-2 sm:grid-cols-4 gap-3' : 'grid-cols-3 sm:grid-cols-4 gap-2.5'
        } min-h-[380px]`}
      >
        {tiles.map((tile) => {
          const isFlipped = flippedUids.includes(tile.uid) || tile.matched;
          return (
            <div
              key={tile.uid}
              className="perspective-1000 aspect-[3/4] w-full"
            >
              <div
                onClick={() => handleTileClick(tile)}
                className={`relative w-full h-full rounded-xl transition-all duration-300 transform-style-3d cursor-pointer ${
                  isFlipped ? 'rotate-y-180' : ''
                } ${tile.matched ? 'opacity-85' : 'hover:scale-[1.02] active:scale-95'}`}
              >
                {/* Tile Back (Facing Player Initially) */}
                <div className="absolute inset-0 w-full h-full backface-hidden rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700 flex flex-col items-center justify-center p-2 shadow-md">
                  <div className="w-8 h-8 rounded-lg bg-indigo-950/70 border border-indigo-500/30 flex items-center justify-center font-mono font-bold text-indigo-400 text-sm">
                    xⁿ
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium mt-2">
                    Dokun & Aç
                  </span>
                </div>

                {/* Tile Front (Revealed on Click) */}
                <div
                  className={`absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-xl p-2.5 flex flex-col justify-between border shadow-lg ${
                    tile.matched
                      ? 'bg-emerald-950/80 border-emerald-500/60 shadow-emerald-500/20'
                      : 'bg-slate-900 border-indigo-500/50'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-slate-400 font-mono text-[9px] uppercase tracking-wider">
                      {tile.subtext}
                    </span>
                    {tile.matched && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    )}
                  </div>

                  <div className="my-auto text-center px-1">
                    <span className="font-mono text-base sm:text-lg font-bold text-white break-words">
                      {tile.content}
                    </span>
                  </div>

                  <div className="text-[9px] text-center text-slate-500 font-mono">
                    {tile.type === 'expression' ? 'İfade' : 'Değer'}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pedagogical Dynamic Hint on Mismatch */}
      {lastHint && !gameWon && (
        <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 text-amber-200 text-xs space-y-1 animate-in fade-in">
          <div className="flex items-center gap-1.5 font-semibold text-amber-400">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Eşleşmedi!</span>
          </div>
          <p className="text-[11px] leading-relaxed text-amber-100/90 pl-5">
            {lastHint}
          </p>
        </div>
      )}

      {/* Game Won Dialog */}
      {gameWon && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-emerald-500/40 text-center space-y-4 shadow-2xl animate-in zoom-in-95 duration-200">
          <div className="w-14 h-14 mx-auto rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Trophy className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white">Harika! Tüm Eşleri Buldun</h3>
            <p className="text-xs text-slate-400">
              {moves} hamlede ve {formatTime(timerSeconds)} sürede tüm üslü ifadeleri değerleriyle eşleştirdin.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-left p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px]">Toplam Puan</span>
              <span className="font-mono font-bold text-indigo-400 text-base">{stats.score}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Kazanılan Oyunlar</span>
              <span className="font-mono font-bold text-emerald-400 text-base">{stats.matchingGamesWon}</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <button
              onClick={setupGame}
              className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Yeni Oyun Başlat</span>
            </button>
            <button
              onClick={onSwitchToPekistirme}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-950 border border-slate-800 hover:bg-slate-850 text-slate-300 text-xs font-semibold transition-all"
            >
              Pekiştirme Moduna Dön
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
