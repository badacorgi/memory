import React from 'react';

interface GameStatusProps {
  level: number;
  moves: number;
  onRestart: () => void;
}

const GameStatus: React.FC<GameStatusProps> = ({ level, moves, onRestart }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mb-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700 gap-4">
      <div className="flex items-center gap-4 sm:gap-8">
        <div className="text-center sm:text-left">
          <div className="text-sm text-slate-400">레벨</div>
          <div className="font-bold text-2xl text-cyan-400">{level}</div>
        </div>
        <div className="text-center sm:text-left">
          <div className="text-sm text-slate-400">뒤집은 횟수</div>
          <div className="font-bold text-2xl text-white">{moves}</div>
        </div>
      </div>
      <button
        onClick={onRestart}
        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-semibold transition-colors duration-200 w-full sm:w-auto"
      >
        다시 시작
      </button>
    </div>
  );
};

export default GameStatus;
