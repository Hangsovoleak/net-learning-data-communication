/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Home, Radio, Layers, Zap, Network, 
  FileText, Award, BookOpen, Info, 
  CheckCircle, ChevronRight, X, Bookmark
} from 'lucide-react';
import { lessonsData } from '../data/lessons';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeLessonId: string;
  onNavigate: (id: string) => void;
  completedLessons: string[];
  bookmarksCount: number;
}

export default function Sidebar({
  isOpen,
  onClose,
  activeLessonId,
  onNavigate,
  completedLessons,
  bookmarksCount
}: SidebarProps) {
  
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Radio': return <Radio className="w-5 h-5" />;
      case 'Layers': return <Layers className="w-5 h-5" />;
      case 'Zap': return <Zap className="w-5 h-5" />;
      case 'Network': return <Network className="w-5 h-5" />;
      case 'FileText': return <FileText className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  const navItems = [
    { id: 'home', label: 'Welcome Dashboard', icon: <Home className="w-5 h-5" />, category: 'general' },
    { id: 'introduction', label: '1. Introduction', icon: <Radio className="w-5 h-5" />, category: 'lessons' },
    { id: 'dlc', label: '2. Data Link Control', icon: <Layers className="w-5 h-5" />, category: 'lessons' },
    { id: 'ppp', label: '3. Point-to-Point Protocols', icon: <Zap className="w-5 h-5" />, category: 'lessons' },
    { id: 'multiple-access', label: '4. Multiple Access Protocols', icon: <Network className="w-5 h-5" />, category: 'lessons' },
    { id: 'revision-notes', label: '5. Revision & formulas', icon: <FileText className="w-5 h-5" />, category: 'lessons' },
    { id: 'mcq-practice', label: 'MCQ Practice Engine', icon: <Award className="w-5 h-5" />, category: 'activities' },
    { id: 'glossary', label: 'Interactive Glossary', icon: <BookOpen className="w-5 h-5" />, category: 'activities' },
    { id: 'about', label: 'About Project', icon: <Info className="w-5 h-5" />, category: 'activities' },
  ];

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 flex flex-col w-64 bg-white dark:bg-slate-950 border-r border-slate-200/80 dark:border-slate-850 transition-transform duration-300 transform lg:translate-x-0 lg:static lg:h-[calc(100vh-4rem)]
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Mobile Sidebar Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-850 lg:hidden">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
              N
            </div>
            <span className="font-bold text-slate-800 dark:text-slate-200 tracking-tight text-sm">NetLearning</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Content */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
          
          {/* General Navigation */}
          <div>
            <span className="px-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-2">
              Core
            </span>
            <ul className="space-y-1">
              {navItems.filter(item => item.category === 'general').map(item => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      onNavigate(item.id);
                      onClose();
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium border transition-all duration-150 group
                      ${activeLessonId === item.id 
                        ? 'bg-slate-50 dark:bg-slate-900/60 border-slate-100 dark:border-slate-800/80 text-blue-600 dark:text-blue-400 font-semibold shadow-xs' 
                        : 'border-transparent text-slate-600 hover:text-slate-950 hover:bg-slate-50/60 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-900/40'}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`transition-colors ${activeLessonId === item.id ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 group-hover:text-blue-500 dark:group-hover:text-blue-400'}`}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity ${activeLessonId === item.id ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Lessons Curriculum */}
          <div>
            <span className="px-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-2">
              Curriculum Lessons
            </span>
            <ul className="space-y-1">
              {navItems.filter(item => item.category === 'lessons').map(item => {
                const isCompleted = completedLessons.includes(item.id);
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        onNavigate(item.id);
                        onClose();
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium border transition-all duration-150 group
                        ${activeLessonId === item.id 
                          ? 'bg-slate-50 dark:bg-slate-900/60 border-slate-100 dark:border-slate-800/80 text-blue-600 dark:text-blue-400 font-semibold shadow-xs' 
                          : 'border-transparent text-slate-600 hover:text-slate-950 hover:bg-slate-50/60 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-900/40'}
                      `}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className={`transition-colors ${activeLessonId === item.id ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 group-hover:text-blue-500 dark:group-hover:text-blue-400'}`}>
                          {item.icon}
                        </span>
                        <span className="truncate">{item.label}</span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0 ml-1">
                        {isCompleted && (
                          <CheckCircle className={`w-3.5 h-3.5 ${activeLessonId === item.id ? 'text-blue-600 dark:text-blue-400' : 'text-emerald-500 fill-emerald-50 dark:fill-slate-950'}`} />
                        )}
                        <ChevronRight className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity ${activeLessonId === item.id ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Interactivities and Practice */}
          <div>
            <span className="px-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-2">
              Activities & References
            </span>
            <ul className="space-y-1">
              {navItems.filter(item => item.category === 'activities').map(item => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      onNavigate(item.id);
                      onClose();
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium border transition-all duration-150 group
                      ${activeLessonId === item.id 
                        ? 'bg-slate-50 dark:bg-slate-900/60 border-slate-100 dark:border-slate-800/80 text-blue-600 dark:text-blue-400 font-semibold shadow-xs' 
                        : 'border-transparent text-slate-600 hover:text-slate-950 hover:bg-slate-50/60 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-900/40'}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`transition-colors ${activeLessonId === item.id ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 group-hover:text-blue-500 dark:group-hover:text-blue-400'}`}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </div>
                    {item.id === 'glossary' && bookmarksCount > 0 && (
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${activeLessonId === item.id ? 'bg-white text-blue-600' : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400'}`}>
                        {bookmarksCount}
                      </span>
                    )}
                    <ChevronRight className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity ${activeLessonId === item.id ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
                  </button>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Sidebar Footer with system info / progress summary */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-850 bg-slate-50/30 dark:bg-slate-900/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xs shrink-0">
              CCNA
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200 truncate">Cisco Academy</p>
              <p className="text-[9px] text-slate-400 dark:text-slate-500 truncate font-semibold uppercase tracking-wider">Theory & Labs Verified</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
