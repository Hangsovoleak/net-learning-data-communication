/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCw, Check, AlertCircle } from 'lucide-react';
import { Flashcard } from '../types';

interface FlashcardDeckProps {
  flashcards: Flashcard[];
}

export default function FlashcardDeck({ flashcards }: FlashcardDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studiedCards, setStudiedCards] = useState<Record<string, 'mastered' | 'review'>>({});

  if (flashcards.length === 0) {
    return (
      <div className="p-8 text-center bg-slate-50 dark:bg-slate-900 rounded-2xl text-slate-500">
        No flashcards available in this section.
      </div>
    );
  }

  const currentCard = flashcards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % flashcards.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    }, 150);
  };

  const handleMarkMastered = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setStudiedCards(prev => ({ ...prev, [id]: 'mastered' }));
    handleNext();
  };

  const handleMarkReview = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setStudiedCards(prev => ({ ...prev, [id]: 'review' }));
    handleNext();
  };

  const masteredCount = Object.values(studiedCards).filter(status => status === 'mastered').length;
  const reviewCount = Object.values(studiedCards).filter(status => status === 'review').length;

  return (
    <div className="max-w-xl mx-auto w-full px-2 py-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Interactive Flashcards
          </h3>
          <p className="text-xs text-slate-400">
            Click to flip and test your understanding
          </p>
        </div>
        <div className="flex gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
            <Check className="w-3.5 h-3.5" /> Mastered ({masteredCount})
          </span>
          <span className="px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" /> Review ({reviewCount})
          </span>
        </div>
      </div>

      {/* 3D Flashcard Container */}
      <div 
        onClick={() => setIsFlipped(!isFlipped)}
        className="relative h-64 w-full cursor-pointer group perspective-1000"
      >
        <div className={`
          relative w-full h-full duration-500 transform-style-3d transition-transform
          ${isFlipped ? 'rotate-y-180' : ''}
        `}>
          
          {/* Card Front */}
          <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl flex flex-col justify-between p-6">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
              <span>CARD {currentIndex + 1} OF {flashcards.length}</span>
              <span className="text-[10px] bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded uppercase tracking-wider">
                {currentCard.category}
              </span>
            </div>

            <div className="flex-1 flex items-center justify-center text-center px-4">
              <p className="text-lg md:text-xl font-bold text-slate-800 dark:text-slate-100 leading-snug">
                {currentCard.front}
              </p>
            </div>

            <div className="flex justify-center items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
              <RotateCw className="w-3.5 h-3.5" /> Click Card to Reveal Answer
            </div>
          </div>

          {/* Card Back */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl border-2 border-blue-500 bg-slate-50 dark:bg-slate-950 shadow-xl flex flex-col justify-between p-6">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
              <span className="text-blue-600 dark:text-blue-400 font-bold">REVEALED ANSWER</span>
              <span className="text-[10px] bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded uppercase">
                {currentCard.category}
              </span>
            </div>

            <div className="flex-1 flex items-center justify-center text-center px-4 overflow-y-auto my-3">
              <p className="text-sm md:text-base font-semibold text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed">
                {currentCard.back}
              </p>
            </div>

            <div className="flex gap-2 justify-center items-center">
              <button
                onClick={(e) => handleMarkReview(currentCard.id, e)}
                className="px-4 py-1.5 rounded-lg text-xs font-bold text-amber-600 bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/20 dark:hover:bg-amber-950/40 transition-colors"
              >
                Still Practicing
              </button>
              <button
                onClick={(e) => handleMarkMastered(currentCard.id, e)}
                className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors"
              >
                Got It! Mastered
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Navigation and Indicators */}
      <div className="flex items-center justify-between mt-4 px-2">
        <button
          onClick={handlePrev}
          className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Previous Card
        </button>
        <div className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
          <span>Card state:</span>
          {studiedCards[currentCard.id] === 'mastered' ? (
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
              <Check className="w-3.5 h-3.5" /> Mastered
            </span>
          ) : studiedCards[currentCard.id] === 'review' ? (
            <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-semibold">
              <AlertCircle className="w-3.5 h-3.5" /> Review
            </span>
          ) : (
            <span className="text-slate-400 font-medium">Not studied</span>
          )}
        </div>
        <button
          onClick={handleNext}
          className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          Next Card <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* CSS Utility for 3D Flips */}
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}
