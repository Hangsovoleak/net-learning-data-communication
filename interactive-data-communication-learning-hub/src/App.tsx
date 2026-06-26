/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Radio, Layers, Zap, Network, FileText, 
  BookOpen, Info, Bookmark, Award, CheckCircle, 
  Clock, ArrowRight, Book, Check, Mail, PhoneCall, 
  Megaphone, Users, Trash2, HelpCircle, GraduationCap, ChevronRight
} from 'lucide-react';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import FlashcardDeck from './components/FlashcardDeck';
import QuizEngine from './components/QuizEngine';
import GlossaryView from './components/GlossaryView';
import LessonLayout from './components/LessonLayout';

import { lessonsData, flashcardsData } from './data/lessons';
import { quizzesData } from './data/quizzes';
import { Lesson, UserProgress } from './types';

export default function App() {
  const [activeView, setActiveView] = useState<string>('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Local storage synchronized progress state
  const [progress, setProgress] = useState<UserProgress>({
    completedLessons: [],
    completedQuizzes: {},
    bookmarks: []
  });

  // Load progress from Local Storage
  useEffect(() => {
    const saved = localStorage.getItem('netlearning_progress');
    if (saved) {
      try {
        setProgress(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse user progress', e);
      }
    }
  }, []);

  // Save progress helper
  const saveProgress = (newProgress: UserProgress) => {
    setProgress(newProgress);
    localStorage.setItem('netlearning_progress', JSON.stringify(newProgress));
  };

  // Toggle bookmark callback
  const handleToggleBookmark = (lessonId: string) => {
    const updated = [...progress.bookmarks];
    const index = updated.indexOf(lessonId);
    if (index > -1) {
      updated.splice(index, 1);
    } else {
      updated.push(lessonId);
    }
    saveProgress({ ...progress, bookmarks: updated });
  };

  // Toggle completion callback
  const handleToggleCompletion = (lessonId: string) => {
    const updated = [...progress.completedLessons];
    const index = updated.indexOf(lessonId);
    if (index > -1) {
      updated.splice(index, 1);
    } else {
      updated.push(lessonId);
    }
    saveProgress({ ...progress, completedLessons: updated });
  };

  // Quiz completion callback
  const handleQuizComplete = (category: string, score: number) => {
    const updatedQuizzes = { ...progress.completedQuizzes };
    const currentBest = updatedQuizzes[category] || 0;
    if (score > currentBest) {
      updatedQuizzes[category] = score;
    }
    saveProgress({ ...progress, completedQuizzes: updatedQuizzes });
  };

  // Helper to map icon names to Lucide icons
  const renderIcon = (iconName: string, className = "w-6 h-6") => {
    switch (iconName) {
      case 'Radio': return <Radio className={className} />;
      case 'Layers': return <Layers className={className} />;
      case 'Zap': return <Zap className={className} />;
      case 'Network': return <Network className={className} />;
      case 'FileText': return <FileText className={className} />;
      case 'Mail': return <Mail className={className} />;
      case 'PhoneCall': return <PhoneCall className={className} />;
      case 'Megaphone': return <Megaphone className={className} />;
      case 'Users': return <Users className={className} />;
      default: return <Book className={className} />;
    }
  };

  // Calculations for dashboard
  const completedLessonsCount = progress.completedLessons.length;
  const completedQuizzesCount = Object.keys(progress.completedQuizzes).length;
  
  // Total completed steps out of curriculum
  const totalCompletedPercent = Math.min(100, Math.round(((completedLessonsCount + (completedQuizzesCount > 0 ? 1 : 0)) / 6) * 100));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-200">
      
      {/* Top Banner Navigation */}
      <Header 
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        activeLessonId={activeView}
        onNavigate={setActiveView}
        bookmarks={progress.bookmarks}
        onToggleBookmark={handleToggleBookmark}
        completedLessonsCount={completedLessonsCount}
        completedQuizzesCount={completedQuizzesCount}
      />

      {/* Main Core Layout (Sidebar + Main Content Scrollable Pane) */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Navigation Sidebar Drawer */}
        <Sidebar 
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          activeLessonId={activeView}
          onNavigate={setActiveView}
          completedLessons={progress.completedLessons}
          bookmarksCount={progress.bookmarks.length}
        />

        {/* Scrollable central content section */}
        <main className="flex-1 overflow-y-auto px-4 md:px-8 py-8 h-[calc(100vh-4rem)]">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* VIEW 1: HOME PAGE (WELCOME DASHBOARD) */}
            {activeView === 'home' && (
              <div className="space-y-12 animate-in fade-in duration-300">
                
                {/* Hero section */}
                <div className="relative rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-8 md:p-12 overflow-hidden shadow-xl border border-blue-900/30">
                  {/* Subtle vector background overlay */}
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />
                  
                  <div className="relative z-10 grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
                    <div className="md:col-span-3 space-y-6">
                      <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 font-semibold text-xs tracking-wider uppercase inline-block">
                        Interactive Cisco-Vibe Academy
                      </span>
                      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
                        Interactive Data Communication Learning Hub
                      </h1>
                      <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-lg">
                        Master Data Link Control, Point-to-Point Protocols, and Multiple Access using beautiful animated simulators, interactive comparison blocks, and immediate feedback quizzes.
                      </p>
                      
                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={() => setActiveView('introduction')}
                          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:scale-102 transition-all cursor-pointer"
                        >
                          Start Curriculum Lesson 1 <ArrowRight className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setActiveView('mcq-practice')}
                          className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs hover:scale-102 transition-all cursor-pointer"
                        >
                          Test Practice MCQs
                        </button>
                      </div>
                    </div>

                    {/* Animated Networking SVG Illustration */}
                    <div className="md:col-span-2 flex justify-center">
                      <svg className="w-48 h-48 md:w-56 md:h-56 text-blue-500" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="animate-spin-slow" />
                        <circle cx="100" cy="100" r="40" stroke="currentColor" strokeWidth="2" />
                        
                        {/* Server nodes */}
                        <circle cx="100" cy="30" r="16" className="fill-slate-900 stroke-blue-500" strokeWidth="2" />
                        <rect x="94" y="24" width="12" height="12" className="fill-blue-500" />

                        <circle cx="40" cy="140" r="14" className="fill-slate-900 stroke-emerald-500" strokeWidth="2" />
                        <circle cx="160" cy="140" r="14" className="fill-slate-900 stroke-amber-500" strokeWidth="2" />

                        {/* Connection cables */}
                        <line x1="100" y1="46" x2="100" y2="60" stroke="currentColor" strokeWidth="2" />
                        <line x1="40" y1="126" x2="72" y2="100" stroke="currentColor" strokeWidth="2" />
                        <line x1="160" y1="126" x2="128" y2="100" stroke="currentColor" strokeWidth="2" />

                        {/* Floating packets */}
                        <circle cx="100" cy="80" r="4" className="fill-blue-400 animate-ping" />
                        <circle cx="65" cy="115" r="4" className="fill-emerald-400 animate-bounce" />
                        <circle cx="135" cy="115" r="4" className="fill-amber-400 animate-pulse" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Statistics panel */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-2xl shadow-xs flex items-center gap-4 hover:shadow-sm transition-all">
                    <div className="p-3 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 rounded-xl">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xl font-bold">{completedLessonsCount}/5</p>
                      <p className="text-xs text-slate-400 font-medium">Lessons Completed</p>
                    </div>
                  </div>

                  <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-2xl shadow-xs flex items-center gap-4 hover:shadow-sm transition-all">
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded-xl">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xl font-bold">{completedQuizzesCount}</p>
                      <p className="text-xs text-slate-400 font-medium">Quizzes Attempted</p>
                    </div>
                  </div>

                  <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-2xl shadow-xs flex items-center gap-4 hover:shadow-sm transition-all">
                    <div className="p-3 bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 rounded-xl">
                      <Bookmark className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xl font-bold">{progress.bookmarks.length}</p>
                      <p className="text-xs text-slate-400 font-medium">Bookmarked Lessons</p>
                    </div>
                  </div>
                </div>

                {/* Core Curriculum Roadmap Flowchart */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-2xl p-6 md:p-8 space-y-6 shadow-xs">
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider">
                      Curriculum Learning Path Flowchart
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      We recommend starting at the foundations and progressing through logical layers sequentially.
                    </p>
                  </div>

                  {/* Flowchart row */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4 relative">
                    
                    {lessonsData.map((lesson, idx) => {
                      const isDone = progress.completedLessons.includes(lesson.id);
                      return (
                        <div 
                          key={lesson.id} 
                          onClick={() => setActiveView(lesson.id)}
                          className={`relative p-4 rounded-xl border text-center cursor-pointer hover:shadow-md hover:translate-y-[-2px] transition-all flex flex-col items-center justify-between space-y-3
                            ${isDone 
                              ? 'bg-emerald-50/20 dark:bg-emerald-950/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-400 shadow-xs' 
                              : 'bg-slate-50/50 dark:bg-slate-950/40 border-slate-200/60 dark:border-slate-850 hover:border-blue-500/50'}
                          `}
                        >
                          <div className={`p-2 rounded-lg text-white ${isDone ? 'bg-emerald-500' : 'bg-blue-600'}`}>
                            {renderIcon(lesson.icon, "w-4 h-4")}
                          </div>

                          <div className="text-xs">
                            <p className="font-extrabold leading-tight text-slate-800 dark:text-slate-200">{lesson.title.split(' ').slice(0, 3).join(' ')}...</p>
                            <span className="text-[9px] font-bold text-slate-400 block mt-0.5">{lesson.estimatedTime}</span>
                          </div>

                          <div className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${isDone ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600' : 'bg-slate-100 dark:bg-slate-900 text-slate-400'}`}>
                            {isDone ? 'COMPLETED' : 'TODO'}
                          </div>
                        </div>
                      );
                    })}

                  </div>
                </div>

                {/* Bookmark list quick link launcher */}
                {progress.bookmarks.length > 0 && (
                  <div className="bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-2xl p-6 md:p-8 space-y-4 shadow-xs">
                    <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
                      <Bookmark className="w-3.5 h-3.5 text-blue-500" /> Bookmarked Lessons Quick Launcher
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {progress.bookmarks.map(id => {
                        const lesson = lessonsData.find(l => l.id === id);
                        if (!lesson) return null;
                        return (
                          <div 
                            key={id}
                            onClick={() => setActiveView(id)}
                            className="p-3 bg-slate-50/50 dark:bg-slate-950/30 border border-slate-200/60 dark:border-slate-850 hover:border-blue-500/50 rounded-xl flex items-center justify-between cursor-pointer transition-all hover:translate-x-1 group"
                          >
                            <div className="flex items-center gap-2.5">
                              {renderIcon(lesson.icon, "w-4 h-4 text-blue-500")}
                              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate">{lesson.title}</span>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* VIEW 2: DETAILED LESSON VIEWS (Introduction, DLC, PPP, Multiple Access, Revision-Notes) */}
            {lessonsData.some(l => l.id === activeView) && (() => {
              const lesson = lessonsData.find(l => l.id === activeView) as Lesson;
              const isCompleted = progress.completedLessons.includes(lesson.id);
              const isBookmarked = progress.bookmarks.includes(lesson.id);
              const lessonQuizzes = quizzesData.filter(q => q.category === lesson.id);

              return (
                <LessonLayout
                  lessonId={lesson.id}
                  onToggleBookmark={handleToggleBookmark}
                  onToggleCompletion={handleToggleCompletion}
                  isBookmarked={isBookmarked}
                  isCompleted={isCompleted}
                  progress={progress}
                  onQuizComplete={handleQuizComplete}
                  lessonQuizzes={lessonQuizzes}
                />
              );
            })()}

            {/* VIEW 3: PRACTICE EXAM ENGINE */}
            {activeView === 'mcq-practice' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div className="text-center space-y-2">
                  <span className="px-2.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-extrabold text-[9px] uppercase tracking-wider">Unified Exam Arena</span>
                  <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">Multiple Choice Question Playground</h1>
                  <p className="text-xs text-slate-500 max-w-md mx-auto font-medium">Prepare for CCNA and university data networking exams with our interactive 40-question curriculum practice library.</p>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-2xl p-6 md:p-8 shadow-xs">
                  <QuizEngine 
                    questions={quizzesData} 
                    category="all" 
                    onQuizComplete={handleQuizComplete}
                    savedMaxScore={progress.completedQuizzes["all"] || 0}
                  />
                </div>
              </div>
            )}

            {/* VIEW 4: GLOSSARY SEARCH */}
            {activeView === 'glossary' && <GlossaryView />}

            {/* VIEW 5: ABOUT THE PLATFORM */}
            {activeView === 'about' && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-2xl p-8 md:p-12 shadow-xs space-y-6 animate-in fade-in duration-300">
                <div className="text-center space-y-2 border-b border-slate-100 dark:border-slate-800 pb-6">
                  <div className="w-14 h-14 rounded-full bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto border border-blue-100 dark:border-blue-900/30 shadow-xs">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <h1 className="text-xl md:text-2xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">Interactive Data Communication Learning Hub</h1>
                  <p className="text-[10px] text-slate-400 font-bold">Version 1.0.0 &bull; Creative Commons Academic License</p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-xs uppercase text-slate-400 tracking-wider">Concept & Architecture</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    This platform was designed as an interactive alternative to heavy static textbooks. By blending high-density comparative tables with fully animated physical layer simulations and visual protocol flowcharts, we make complex data-link regulations easy and enjoyable to learn.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-xs uppercase text-slate-400 tracking-wider">Technical Stack</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    Built natively on high-speed <strong>React 19 with Vite</strong>, completely styled with <strong>Tailwind CSS</strong>, and powered by <strong>Lucide-react</strong> vector sets. All interactive protocol diagrams are styled using modern responsive HTML, CSS, and SVG elements to keep them lightweight, fast, and fully accessible.
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
                  <p className="text-xs text-slate-500 font-medium">Design crafted for CCNA computer science students globally.</p>
                </div>
              </div>
            )}

          </div>
        </main>

      </div>
    </div>
  );
}
