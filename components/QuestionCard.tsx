
import React from 'react';
import { QuestionResult } from '../types';

interface QuestionCardProps {
  result: QuestionResult;
  onCopy: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ result, onCopy }) => {
  return (
    <div className="bg-neutral-900 border border-indigo-900/30 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(79,70,229,0.1)] animate-fade-in text-center">
      <div className="p-1 bg-indigo-900/10 border-b border-indigo-900/20">
        <div className="flex justify-between items-center px-4 py-2">
          <span className="text-xs uppercase tracking-widest text-indigo-500 font-bold">Uncomfortable Question</span>
          <button 
            onClick={onCopy}
            className="text-neutral-400 hover:text-white text-sm transition-colors flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            نسخ السؤال
          </button>
        </div>
      </div>
      
      <div className="p-12 serif-news relative group">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-900/10 text-[12rem] font-serif select-none pointer-events-none group-hover:text-indigo-800/20 transition-colors duration-700">?</div>
        <h2 className="text-4xl md:text-5xl font-bold text-neutral-100 leading-tight tracking-tight drop-shadow-lg relative z-10">
          {result.question}
        </h2>
      </div>
    </div>
  );
};
