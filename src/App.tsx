/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ActiveTab, CardData, UserStats } from './types/game';
import { DEFAULT_CARDS } from './data/defaultCards';
import { Navbar } from './components/Navbar';
import { PhoneContainer } from './components/PhoneContainer';
import { PekistirmeMode } from './components/PekistirmeMode';
import { MatchingGridMode } from './components/MatchingGridMode';
import { CardDesigner } from './components/CardDesigner';
import { PrintableDeck } from './components/PrintableDeck';
import { RulesModal } from './components/RulesModal';
import { sound } from './utils/sound';

const INITIAL_STATS: UserStats = {
  score: 0,
  streak: 0,
  bestStreak: 0,
  totalAnswered: 0,
  firstTryCorrect: 0,
  hintsUsed: 0,
  matchingGamesWon: 0,
  customCardsCreated: 0
};

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('pekistirme');
  const [isMobileFrame, setIsMobileFrame] = useState(true);
  const [isMuted, setIsMuted] = useState(sound.getIsMuted());
  const [rulesModalOpen, setRulesModalOpen] = useState(false);

  // Load custom cards from localStorage
  const [customCards, setCustomCards] = useState<CardData[]>(() => {
    try {
      const saved = localStorage.getItem('uslu_custom_cards');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Load user stats from localStorage
  const [stats, setStats] = useState<UserStats>(() => {
    try {
      const saved = localStorage.getItem('uslu_user_stats');
      return saved ? JSON.parse(saved) : INITIAL_STATS;
    } catch {
      return INITIAL_STATS;
    }
  });

  // Persist custom cards
  useEffect(() => {
    try {
      localStorage.setItem('uslu_custom_cards', JSON.stringify(customCards));
    } catch {
      // Ignore
    }
  }, [customCards]);

  // Persist stats
  useEffect(() => {
    try {
      localStorage.setItem('uslu_user_stats', JSON.stringify(stats));
    } catch {
      // Ignore
    }
  }, [stats]);

  // Combined card deck: default MEB cards + user custom cards
  const allCards = [...DEFAULT_CARDS, ...customCards];

  // Add custom card
  const handleAddCard = (newCard: CardData) => {
    setCustomCards(prev => [newCard, ...prev]);
    setStats(prev => ({
      ...prev,
      customCardsCreated: prev.customCardsCreated + 1,
      score: prev.score + 50 // Bonus points for creating educational cards!
    }));
  };

  // Delete custom card
  const handleDeleteCard = (cardId: string) => {
    setCustomCards(prev => prev.filter(c => c.id !== cardId));
  };

  // Test card in pekistirme mode
  const handleTestCardInPekistirme = (card: CardData) => {
    setActiveTab('pekistirme');
  };

  const handleToggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        onTabChange={(tab) => {
          sound.playFlip();
          setActiveTab(tab);
        }}
        isMobileFrame={isMobileFrame}
        onToggleFrame={() => setIsMobileFrame(prev => !prev)}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenRules={() => setRulesModalOpen(true)}
      />

      {/* Main Content Area within PhoneContainer or Expanded Canvas */}
      <main className="flex-1 flex flex-col">
        {activeTab === 'yazdir' ? (
          <div className="py-6 px-4">
            <PrintableDeck cards={allCards} />
          </div>
        ) : (
          <PhoneContainer
            activeTab={activeTab}
            onTabChange={(tab) => {
              sound.playFlip();
              if (tab === 'kurallar') {
                setRulesModalOpen(true);
              } else {
                setActiveTab(tab);
              }
            }}
            isMobileFrame={isMobileFrame}
            onToggleFrame={() => setIsMobileFrame(prev => !prev)}
          >
            {activeTab === 'pekistirme' && (
              <PekistirmeMode
                cards={allCards}
                stats={stats}
                onUpdateStats={setStats}
                onSwitchToMatch={() => setActiveTab('eslesme')}
                onSwitchToDesigner={() => setActiveTab('atolye')}
              />
            )}

            {activeTab === 'eslesme' && (
              <MatchingGridMode
                cards={allCards}
                stats={stats}
                onUpdateStats={setStats}
                onSwitchToPekistirme={() => setActiveTab('pekistirme')}
              />
            )}

            {activeTab === 'atolye' && (
              <CardDesigner
                customCards={customCards}
                onAddCard={handleAddCard}
                onDeleteCard={handleDeleteCard}
                onTestCardInPekistirme={handleTestCardInPekistirme}
              />
            )}
          </PhoneContainer>
        )}
      </main>

      {/* 8th Grade Rules Modal */}
      <RulesModal
        isOpen={rulesModalOpen}
        onClose={() => setRulesModalOpen(false)}
      />
    </div>
  );
}
