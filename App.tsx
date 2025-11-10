import React, { useState, useEffect, useCallback } from 'react';
import GameBoard from './components/GameBoard';
import GameStatus from './components/GameStatus';
import Modal from './components/Modal';
import { EMOJIS, LEVEL_CONFIG } from './constants';
import type { Card } from './types';

const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export default function App() {
  const [level, setLevel] = useState(1);
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<Card[]>([]);
  const [moves, setMoves] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const [isLevelComplete, setIsLevelComplete] = useState(false);
  
  const maxLevel = LEVEL_CONFIG.length;

  const setupLevel = useCallback((currentLevel: number) => {
    const config = LEVEL_CONFIG.find(l => l.level === currentLevel);
    if (!config) {
      console.error(`Level ${currentLevel} configuration not found.`);
      return;
    }

    const selectedEmojis = shuffleArray(EMOJIS).slice(0, config.pairs);
    const cardPairs: Card[] = selectedEmojis.flatMap((emoji, index) => {
      const cardBase = { id: index, content: emoji, isFlipped: false, isMatched: false };
      return [
        { ...cardBase, uniqueId: index * 2 },
        { ...cardBase, uniqueId: index * 2 + 1 },
      ];
    });

    setCards(shuffleArray(cardPairs));
    setFlippedCards([]);
    setMoves(0);
    setIsChecking(false);
    setIsLevelComplete(false);
  }, []);

  useEffect(() => {
    setupLevel(level);
  }, [level, setupLevel]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      setIsChecking(true);
      setMoves(prev => prev + 1);
      const [firstCard, secondCard] = flippedCards;
      
      if (firstCard.id === secondCard.id) {
        setCards(prevCards =>
          prevCards.map(card =>
            card.id === firstCard.id ? { ...card, isMatched: true } : card
          )
        );
        setFlippedCards([]);
        setIsChecking(false);
      } else {
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map(card =>
              (card.uniqueId === firstCard.uniqueId || card.uniqueId === secondCard.uniqueId)
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
          setIsChecking(false);
        }, 1000);
      }
    }
  }, [flippedCards]);

  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.isMatched)) {
      setTimeout(() => {
        setIsLevelComplete(true);
      }, 500);
    }
  }, [cards]);

  const handleCardClick = useCallback((clickedCard: Card) => {
    if (isChecking || clickedCard.isFlipped || clickedCard.isMatched || flippedCards.length === 2) {
      return;
    }

    setCards(prevCards =>
      prevCards.map(card =>
        card.uniqueId === clickedCard.uniqueId ? { ...card, isFlipped: true } : card
      )
    );
    setFlippedCards(prev => [...prev, clickedCard]);
  }, [isChecking, flippedCards.length]);

  const handleNextLevel = useCallback(() => {
    if (level < maxLevel) {
      setLevel(prev => prev + 1);
    } else {
      setLevel(1);
    }
    setIsLevelComplete(false);
  }, [level, maxLevel]);

  const handleRestart = useCallback(() => {
    if (level === 1) {
        setupLevel(1);
    } else {
        setLevel(1);
    }
  }, [level, setupLevel]);

  const currentConfig = LEVEL_CONFIG.find(config => config.level === level) || LEVEL_CONFIG[0];
  const isGameWon = isLevelComplete && level === maxLevel;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">
            메모리 마스터
          </h1>
        </header>
        
        <GameStatus level={level} moves={moves} onRestart={handleRestart} />
        
        <GameBoard 
          cards={cards} 
          onCardClick={handleCardClick} 
          gridCols={currentConfig.gridCols}
          isChecking={isChecking}
        />

        <Modal isOpen={isLevelComplete} title={isGameWon ? "게임 클리어!" : `레벨 ${level} 완료!`}>
          <div className="mt-6">
            <p className="mb-6 text-lg">
              {isGameWon ? "모든 레벨을 완료했습니다! 대단해요!" : "다음 레벨에 도전하세요!"}
            </p>
            <button 
              onClick={handleNextLevel}
              className="w-full px-6 py-3 bg-cyan-500 hover:bg-cyan-400 rounded-lg text-slate-900 font-bold text-lg transition-colors duration-200"
            >
              {isGameWon ? "처음부터 다시하기" : "다음 레벨"}
            </button>
          </div>
        </Modal>
      </div>
    </main>
  );
}
