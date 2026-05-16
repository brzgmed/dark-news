
import React from 'react';
import { ManResult } from '../types';

interface ManCardProps {
  result: ManResult;
  onCopy: () => void;
}

export const ManCard: React.FC<ManCardProps> = ({ result, onCopy }) => {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl animate-fade-in">
      <div className="p-1 bg-neutral-700/20 border-b border-neutral-800">
        <div className="flex justify-between items-center px-4 py-2">
          <span className="text-xs uppercase tracking-widest text-neutral-400 font-bold">The Ordinary Man</span>
          <button 
            onClick={onCopy}
            className="text-neutral-400 hover:text-white text-sm transition-colors flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            نسخ المونولوغ
          </button>
        </div>
      </div>
      
      <div className="p-8 space-y-8 serif-news">
        <section className="relative">
          <div className="absolute -top-4 -right-4 text-neutral-800 text-6xl font-serif">"</div>
          <p className="text-2xl text-neutral-200 leading-relaxed whitespace-pre-wrap italic">
            {result.monologue}
          </p>
        </section>

        <footer className="pt-6 border-t border-neutral-800">
          <p className="text-xl font-bold text-neutral-500 text-center tracking-tight">
            {result.conclusion}
          </p>
        </footer>
      </div>
    </div>
  );
};
