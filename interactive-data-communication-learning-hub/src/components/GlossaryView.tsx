import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { glossaryData } from '../data/glossary';

export default function GlossaryView() {
  const [query, setQuery] = useState('');
  
  const filteredGlossary = glossaryData.filter(g => 
    g.word.toLowerCase().includes(query.toLowerCase()) || 
    g.definition.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">Interactive Glossary Reference</h1>
        <p className="text-xs text-slate-500">Quickly search and scan standard computer networking formulas, protocols, acronyms, and guidelines.</p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Filter glossary (e.g. CRC, Polling, CSMA)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-5 py-2.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/30 shadow-xs"
        />
      </div>

      {/* Grid of cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredGlossary.map((item, index) => (
          <div key={index} className="p-5 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-2xl hover:border-blue-500/50 transition-colors shadow-xs space-y-3">
            <div className="flex justify-between items-start gap-2">
              <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-100">{item.word}</h3>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded uppercase bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-slate-400 shrink-0">
                {item.category}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              {item.definition}
            </p>
            {item.related && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {item.related.map((r, ri) => (
                  <span key={ri} className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-50/50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400">
                    #{r}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
        {filteredGlossary.length === 0 && (
          <div className="col-span-full py-16 text-center text-slate-400">
            <HelpCircle className="w-10 h-10 mx-auto stroke-[1.5] text-slate-300 dark:text-slate-700 mb-2" />
            <p className="text-xs font-bold">No match found for &ldquo;{query}&rdquo;</p>
          </div>
        )}
      </div>
    </div>
  );
}
