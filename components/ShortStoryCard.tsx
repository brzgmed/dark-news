
import React from 'react';
import { SatiricalStoryResult } from '../types';

interface ShortStoryCardProps {
  result: SatiricalStoryResult;
  onCopy: () => void;
}

export const ShortStoryCard: React.FC<ShortStoryCardProps> = ({ result, onCopy }) => {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl animate-fade-in">
      <div className="p-1 bg-neutral-800 border-b border-neutral-700">
        <div className="flex justify-between items-center px-4 py-2">
          <span className="text-xs uppercase tracking-widest text-neutral-500 font-bold">Literary Noir</span>
          <button 
            onClick={onCopy}
            className="text-neutral-400 hover:text-white text-sm transition-colors flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            نسخ القصة
          </button>
        </div>
      </div>
      
      <div className="p-8 space-y-8 serif-news">
        <header className="text-center border-b border-neutral-800 pb-6">
          <h2 className="text-3xl font-bold text-white tracking-tight">{result.title}</h2>
        </header>

        <section className="text-xl text-neutral-300 leading-relaxed whitespace-pre-wrap">
          {result.content}
        </section>

        <footer className="pt-8 border-t border-neutral-800">
          <p className="text-2xl font-bold text-red-600 text-center italic tracking-tight">
            {result.conclusion}
          </p>
        </footer>
      </div>
    </div>
  );
};
