import React from 'react';
import type { Card as CardType } from '../types';

interface CardProps {
  card: CardType;
  onClick: (card: CardType) => void;
  isDisabled: boolean;
}

const Card: React.FC<CardProps> = ({ card, onClick, isDisabled }) => {
  const handleClick = () => {
    if (!isDisabled && !card.isFlipped && !card.isMatched) {
      onClick(card);
    }
  };

  const commonClasses = "absolute w-full h-full rounded-lg flex items-center justify-center [backface-visibility:hidden] transition-all duration-500 shadow-lg";

  return (
    <div
      className={`aspect-square [perspective:1000px] cursor-pointer group ${isDisabled ? 'cursor-wait' : ''}`}
      onClick={handleClick}
    >
      <div
        className={`relative w-full h-full duration-700 [transform-style:preserve-3d] ${
          card.isFlipped || card.isMatched ? '[transform:rotateY(180deg)]' : ''
        } ${card.isMatched ? 'opacity-40 scale-95' : ''}`}
      >
        {/* Card Back */}
        <div
          className={`${commonClasses} bg-slate-700 border-2 border-slate-600 group-hover:bg-slate-600 group-hover:border-cyan-500 text-3xl font-bold text-cyan-400`}
        >
          ?
        </div>
        {/* Card Front */}
        <div
          className={`${commonClasses} bg-slate-800 border-2 border-cyan-500 [transform:rotateY(180deg)]`}
        >
          <span className="text-4xl sm:text-5xl" style={{ textShadow: '0 0 10px rgba(0, 255, 255, 0.5)' }}>
            {card.content}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
