
import React from 'react';
import { DialogueResult } from '../types';

interface DialogueCardProps {
  result: DialogueResult;
  onCopy: () => void;
}

export const DialogueCard: React.FC<DialogueCardProps> = ({ result, onCopy }) => {
  return (
    <div className="bg-neutral-900 border border-violet-900/30 rounded-xl overflow-hidden shadow-2xl animate-fade-in">
      <div className="p-1 bg-violet-900/10 border-b border-violet-900/20">
        <div className="flex justify-between items-center px-4 py-2">
          <span className="text-xs uppercase tracking-widest text-violet-500 font-bold">Social Satire Dialogue</span>
          <button 
            onClick={onCopy}
            className="text-neutral-400 hover:text-white text-sm transition-colors flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            نسخ الحوار
          </button>
        </div>
      </div>
      
      <div className="p-8 space-y-6 serif-news">
        <header className="text-center mb-8">
          <h2 className="text-3xl font-bold text-violet-400 border-b border-violet-900/40 pb-4 inline-block px-8">
            {result.title}
          </h2>
        </header>

        <div className="space-y-4 max-w-2xl mx-auto">
          {result.lines.map((line, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col ${idx % 2 === 0 ? 'items-start' : 'items-end'}`}
            >
              <span className={`text-[10px] uppercase font-bold mb-1 tracking-tighter ${idx % 2 === 0 ? 'text-violet-600 ml-2' : 'text-neutral-600 mr-2'}`}>
                {line.speaker}
              </span>
              <div className={`px-4 py-3 rounded-2xl text-lg leading-relaxed ${
                idx % 2 === 0 
                  ? 'bg-neutral-800 text-neutral-200 rounded-tr-none border-l-2 border-violet-800' 
                  : 'bg-violet-950/20 text-neutral-100 rounded-tl-none border-r-2 border-violet-900'
              }`}>
                {line.text}
              </div>
            </div>
          ))}
        </div>

        <footer className="pt-10 text-center">
          <div className="inline-block h-1 w-12 bg-violet-900/30 rounded-full"></div>
        </footer>
      </div>
    </div>
  );
};
