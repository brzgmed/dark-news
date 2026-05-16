
import React from 'react';
import { CitizenTestResult } from '../types';

interface CitizenTestCardProps {
  result: CitizenTestResult;
  onCopy: () => void;
}

export const CitizenTestCard: React.FC<CitizenTestCardProps> = ({ result, onCopy }) => {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl animate-fade-in">
      <div className="p-1 bg-emerald-900/10 border-b border-emerald-900/20">
        <div className="flex justify-between items-center px-4 py-2">
          <span className="text-xs uppercase tracking-widest text-emerald-600 font-bold">Citizen Critique</span>
          <button 
            onClick={onCopy}
            className="text-neutral-400 hover:text-white text-sm transition-colors flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            نسخ النص
          </button>
        </div>
      </div>
      
      <div className="p-8 space-y-6 serif-news">
        <section className="text-neutral-400 italic text-xl border-r-2 border-emerald-800 pr-4">
          <p>"{result.complaint}"</p>
        </section>

        <section className="text-neutral-300 text-lg leading-relaxed">
          <p>{result.complicity}</p>
        </section>

        <section className="text-2xl text-neutral-100 leading-relaxed font-bold">
          <p>{result.reveal}</p>
        </section>

        <footer className="pt-6 border-t border-neutral-800">
          <p className="text-2xl font-bold text-emerald-500 text-center tracking-tight">
            {result.absurdConclusion}
          </p>
        </footer>
      </div>
    </div>
  );
};
