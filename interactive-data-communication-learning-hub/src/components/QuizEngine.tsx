/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Check, X, Award, RotateCcw, HelpCircle, 
  ChevronRight, ArrowRight, BookOpen, AlertCircle 
} from 'lucide-react';
import { QuizQuestion } from '../types';

interface QuizEngineProps {
  questions: QuizQuestion[];
  category: string;
  onQuizComplete: (category: string, score: number) => void;
  savedMaxScore?: number;
}

export default function QuizEngine({
  questions,
  category,
  onQuizComplete,
  savedMaxScore = 0
}: QuizEngineProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [answersHistory, setAnswersHistory] = useState<Array<{ questionIndex: number; selected: number; isCorrect: boolean }>>([]);

  if (questions.length === 0) {
    return (
      <div className="text-center p-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
        <HelpCircle className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-700 mb-2" />
        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">No Questions Available</h4>
        <p className="text-xs text-slate-400 mt-1">This quiz category is empty.</p>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  const handleOptionSelect = (optionIndex: number) => {
    if (isAnswered) return;
    setSelectedOption(optionIndex);
    setIsAnswered(true);

    const isCorrect = optionIndex === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setAnswersHistory(prev => [
      ...prev, 
      { questionIndex: currentIndex, selected: optionIndex, isCorrect }
    ]);
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
      onQuizComplete(category, score);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
    setAnswersHistory([]);
  };

  const getRank = (finalScore: number, total: number) => {
    const ratio = finalScore / total;
    if (ratio >= 0.9) return { title: 'Network Architect', desc: 'Flawless! You possess an absolute mastery of these protocol mechanisms.', color: 'text-blue-600 dark:text-blue-400' };
    if (ratio >= 0.7) return { title: 'Systems Administrator', desc: 'Great job! You have a solid command of data communication structures.', color: 'text-emerald-600 dark:text-emerald-400' };
    if (ratio >= 0.5) return { title: 'Network Aspirant', desc: 'Good effort, but you should review specific protocol sections again.', color: 'text-amber-600 dark:text-amber-400' };
    return { title: 'Signal Apprentice', desc: 'Keep practicing! Review the animation flowcharts and retry.', color: 'text-rose-600 dark:text-rose-400' };
  };

  const totalQuestions = questions.length;
  const rank = getRank(score, totalQuestions);

  return (
    <div className="w-full max-w-xl mx-auto">
      {!quizFinished ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-2xl shadow-sm overflow-hidden transition-all duration-300">
          
          {/* Progress Header */}
          <div className="px-5 py-3.5 bg-slate-50/50 dark:bg-slate-950/40 border-b border-slate-100 dark:border-slate-850 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400">
                Question {currentIndex + 1} of {totalQuestions}
              </span>
              {savedMaxScore > 0 && (
                <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500">
                  Best Record: {savedMaxScore}/{totalQuestions}
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-24 bg-slate-100 dark:bg-slate-800 h-1 rounded-full overflow-hidden">
                <div 
                  className="bg-blue-600 h-full transition-all duration-300 animate-pulse"
                  style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
                />
              </div>
              <span className="text-[10px] font-bold text-slate-400 font-mono">
                {Math.round(((currentIndex + 1) / totalQuestions) * 100)}%
              </span>
            </div>
          </div>

          {/* Question Box */}
          <div className="p-5 md:p-6 space-y-5">
            <h3 className="text-sm md:text-base font-extrabold text-slate-800 dark:text-slate-100 leading-snug">
              {currentQuestion.question}
            </h3>

            {/* Options list */}
            <div className="space-y-2.5">
              {currentQuestion.options.map((option, i) => {
                let btnStyle = "border-slate-200/60 dark:border-slate-850 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50/50 dark:hover:bg-slate-950/40";
                let iconEl = null;

                if (isAnswered) {
                  if (i === currentQuestion.correctAnswer) {
                    btnStyle = "border-emerald-500/40 bg-emerald-50/20 dark:bg-emerald-950/10 text-emerald-800 dark:text-emerald-400 font-bold";
                    iconEl = <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />;
                  } else if (i === selectedOption) {
                    btnStyle = "border-rose-500/40 bg-rose-50/20 dark:bg-rose-950/10 text-rose-800 dark:text-rose-400 font-bold";
                    iconEl = <X className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />;
                  } else {
                    btnStyle = "border-slate-100 dark:border-slate-900 bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-600 opacity-50";
                  }
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleOptionSelect(i)}
                    disabled={isAnswered}
                    className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left text-xs transition-all duration-150 relative cursor-pointer ${btnStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-5.5 h-5.5 rounded flex items-center justify-center text-[10px] font-bold border transition-colors
                        ${isAnswered && i === currentQuestion.correctAnswer 
                          ? 'bg-emerald-500 text-white border-transparent' 
                          : isAnswered && i === selectedOption
                            ? 'bg-rose-500 text-white border-transparent'
                            : 'bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800'}
                      `}>
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{option}</span>
                    </div>
                    {iconEl}
                  </button>
                );
              })}
            </div>

            {/* Explanatory box */}
            {isAnswered && (
              <div className="p-4 rounded-xl bg-blue-50/30 dark:bg-blue-950/10 border border-blue-100/40 dark:border-blue-900/30 space-y-1.5 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="flex items-center gap-2 text-[10px] font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">
                  <AlertCircle className="w-3.5 h-3.5" /> Explanation:
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  {currentQuestion.explanation}
                </p>
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="px-5 py-3.5 bg-slate-50/50 dark:bg-slate-950/40 border-t border-slate-100 dark:border-slate-850 flex justify-end">
            <button
              onClick={handleNext}
              disabled={!isAnswered}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all duration-150
                ${isAnswered 
                  ? 'bg-blue-600 text-white shadow-sm hover:bg-blue-500 cursor-pointer hover:translate-y-[-1px]' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'}
              `}
            >
              {currentIndex + 1 === totalQuestions ? 'Finish Quiz' : 'Next Question'}
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      ) : (
        /* Results View */
        <div className="bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-2xl shadow-sm p-6 md:p-8 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto border border-blue-100/30 shadow-xs">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h3 className="text-lg font-extrabold text-slate-800 dark:text-slate-100">
              Quiz Finished!
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              You scored <span className="font-bold text-slate-800 dark:text-slate-200">{score}</span> out of <span className="font-bold text-slate-800 dark:text-slate-200">{totalQuestions}</span> questions correctly.
            </p>
          </div>

          {/* Visual Progress Pie/Bar */}
          <div className="max-w-xs mx-auto p-4 rounded-xl bg-slate-50/50 dark:bg-slate-950/30 border border-slate-100 dark:border-slate-850 space-y-2">
            <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-mono">
              {Math.round((score / totalQuestions) * 100)}%
            </div>
            <div className={`text-[10px] font-bold uppercase tracking-wider ${rank.color}`}>
              {rank.title}
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed px-4 font-medium">
              {rank.desc}
            </p>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              onClick={handleReset}
              className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-950 text-xs font-bold text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Retry Quiz
            </button>
          </div>

          {/* Historical Review Checklist */}
          <div className="text-left pt-6 border-t border-slate-100 dark:border-slate-850 space-y-3">
            <h4 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Answers Review Checklist
            </h4>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {answersHistory.map((item, i) => (
                <div 
                  key={i}
                  className={`flex items-start gap-3 p-3 rounded-xl border text-[11px] font-medium
                    ${item.isCorrect 
                      ? 'bg-emerald-50/10 dark:bg-emerald-950/5 border-emerald-100/40 dark:border-emerald-900/20 text-slate-700 dark:text-slate-300' 
                      : 'bg-rose-50/10 dark:bg-rose-950/5 border-rose-100/40 dark:border-rose-900/20 text-slate-700 dark:text-slate-300'}
                  `}
                >
                  <span className={`w-4.5 h-4.5 rounded-full flex items-center justify-center shrink-0 text-[9px] font-bold text-white
                    ${item.isCorrect ? 'bg-emerald-500' : 'bg-rose-500'}
                  `}>
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-extrabold text-slate-800 dark:text-slate-200">{questions[item.questionIndex].question}</p>
                    <p className="mt-1 text-slate-400 font-medium">
                      Your answer: <span className="font-bold text-slate-600 dark:text-slate-300">{questions[item.questionIndex].options[item.selected]}</span>
                      {!item.isCorrect && (
                        <span> &bull; Correct: <span className="font-bold text-emerald-600 dark:text-emerald-400">{questions[item.questionIndex].options[questions[item.questionIndex].correctAnswer]}</span></span>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
