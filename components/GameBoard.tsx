import React from 'react';
import type { Card as CardType } from '../types';
import Card from './Card';

interface GameBoardProps {
  cards: CardType[];
  onCardClick: (card: CardType) => void;
  gridCols: string;
  isChecking: boolean;
}

const GameBoard: React.FC<GameBoardProps> = ({ cards, onCardClick, gridCols, isChecking }) => {
  return (
    <div className={`grid ${gridCols} gap-2 sm:gap-4 max-w-2xl mx-auto`}>
      {cards.map((card) => (
        <Card
          key={card.uniqueId}
          card={card}
          onClick={() => onCardClick(card)}
          isDisabled={isChecking}
        />
      ))}
    </div>
  );
};

export default GameBoard;
