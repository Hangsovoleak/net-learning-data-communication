/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Sun, Moon, Monitor, Bookmark, 
  Menu, X, BookOpen, Layers, Zap, Radio, 
  Network, FileText, ChevronRight, Award, Trash2
} from 'lucide-react';
import { glossaryData } from '../data/glossary';
import { lessonsData } from '../data/lessons';
import { GlossaryItem, Lesson } from '../types';

interface HeaderProps {
  onMenuToggle: () => void;
  activeLessonId: string;
  onNavigate: (view: string) => void;
  bookmarks: string[];
  onToggleBookmark: (lessonId: string) => void;
  completedLessonsCount: number;
  completedQuizzesCount: number;
}

export default function Header({
  onMenuToggle,
  activeLessonId,
  onNavigate,
  bookmarks,
  onToggleBookmark,
  completedLessonsCount,
  completedQuizzesCount
}: HeaderProps) {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showBookmarksDropdown, setShowBookmarksDropdown] = useState(false);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const bookmarkRef = useRef<HTMLDivElement>(null);

  // Load and apply theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' || 'system';
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (t: 'light' | 'dark' | 'system') => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    
    if (t === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(t);
    }
  };

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  // Close dropdowns on clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
      if (bookmarkRef.current && !bookmarkRef.current.contains(event.target as Node)) {
        setShowBookmarksDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter lessons & glossary for global search
  const searchResults: Array<{ type: 'lesson' | 'glossary'; title: string; subtitle: string; targetId: string }> = [];
  if (searchQuery.trim().length > 1) {
    const query = searchQuery.toLowerCase();
    
    // Search lessons
    lessonsData.forEach(lesson => {
      if (
        lesson.title.toLowerCase().includes(query) ||
        lesson.subtitle.toLowerCase().includes(query) ||
        lesson.description.toLowerCase().includes(query)
      ) {
        searchResults.push({
          type: 'lesson',
          title: lesson.title,
          subtitle: lesson.subtitle,
          targetId: lesson.id
        });
      }
    });

    // Search glossary
    glossaryData.forEach(item => {
      if (
        item.word.toLowerCase().includes(query) ||
        item.definition.toLowerCase().includes(query)
      ) {
        searchResults.push({
          type: 'glossary',
          title: item.word,
          subtitle: item.definition,
          targetId: 'glossary'
        });
      }
    });
  }

  const getLessonIcon = (iconName: string) => {
    switch (iconName) {
      case 'Radio': return <Radio className="w-4 h-4 text-blue-500" />;
      case 'Layers': return <Layers className="w-4 h-4 text-emerald-500" />;
      case 'Zap': return <Zap className="w-4 h-4 text-amber-500" />;
      case 'Network': return <Network className="w-4 h-4 text-indigo-500" />;
      case 'FileText': return <FileText className="w-4 h-4 text-rose-500" />;
      default: return <BookOpen className="w-4 h-4 text-blue-500" />;
    }
  };

  const getActiveTitle = () => {
    if (activeLessonId === 'home') return 'Learning Dashboard';
    if (activeLessonId === 'glossary') return 'Glossary & Keywords';
    if (activeLessonId === 'about') return 'About the Platform';
    const active = lessonsData.find(l => l.id === activeLessonId);
    return active ? active.title : 'Data Communication';
  };

  const totalItems = lessonsData.length + 3; // 4 lessons + revision + glossary + about + home
  const progressPercent = Math.min(
    100,
    Math.round(((completedLessonsCount + (completedQuizzesCount > 0 ? 1 : 0)) / 6) * 100)
  );

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-100 dark:border-slate-850 transition-colors duration-200 h-16">
      <div className="flex items-center justify-between h-full px-4 lg:px-8">
        
        {/* Left Side: Logo & Sidebar Toggle */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onMenuToggle}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-900 lg:hidden"
            aria-label="Toggle navigation sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 cursor-pointer select-none" onClick={() => onNavigate('home')}>
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
              N
            </div>
            <span className="hidden sm:block font-extrabold text-sm text-slate-800 dark:text-slate-100 tracking-tight leading-tight">
              NetLearning<br />
              <span className="text-blue-600 dark:text-blue-400 text-[10px] font-semibold">Academy Hub</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 ml-5 text-[11px] font-medium text-slate-400 dark:text-slate-500">
            <span>Curriculum</span>
            <ChevronRight className="w-3 h-3 text-slate-300 dark:text-slate-700" />
            <span className="px-2.5 py-0.5 rounded-full bg-slate-50/50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-semibold">{getActiveTitle()}</span>
          </div>
        </div>

        {/* Middle: Global Search bar */}
        <div ref={searchRef} className="relative flex-1 max-w-xs mx-4 sm:mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder="Search concepts..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchResults(true);
              }}
              onFocus={() => setShowSearchResults(true)}
              className="w-full pl-9 pr-8 py-1.5 text-xs rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/30 focus:bg-white dark:focus:bg-slate-900 focus:border-slate-300 dark:focus:border-slate-700 transition-all duration-150 shadow-xs"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Search Results Dropdown */}
          {showSearchResults && searchResults.length > 0 && (
            <div className="absolute top-11 left-0 right-0 max-h-96 overflow-y-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl p-1.5 z-50 animate-in fade-in slide-in-from-top-1.5 duration-100">
              <div className="px-2 py-1 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Matching Results ({searchResults.length})
              </div>
              <div className="mt-1 space-y-0.5">
                {searchResults.map((result, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      onNavigate(result.targetId);
                      setShowSearchResults(false);
                      setSearchQuery('');
                    }}
                    className="w-full flex items-start gap-2.5 p-2 rounded-lg text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <div className="mt-0.5 p-1 rounded bg-slate-100 dark:bg-slate-950">
                      {result.type === 'lesson' ? (
                        <BookOpen className="w-3.5 h-3.5 text-blue-500" />
                      ) : (
                        <FileText className="w-3.5 h-3.5 text-amber-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate flex items-center justify-between">
                        {result.title}
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded uppercase bg-slate-100 dark:bg-slate-800 text-slate-500">
                          {result.type}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                        {result.subtitle}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
          {showSearchResults && searchQuery.trim().length > 1 && searchResults.length === 0 && (
            <div className="absolute top-11 left-0 right-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl p-5 text-center z-50 text-slate-500 dark:text-slate-400">
              <p className="text-xs font-semibold">No concepts found for &ldquo;{searchQuery}&rdquo;</p>
              <p className="text-[10px] mt-0.5 text-slate-400">Try searching: &ldquo;Framing&rdquo;, &ldquo;ALOHA&rdquo;, or &ldquo;CRC&rdquo;</p>
            </div>
          )}
        </div>

        {/* Right Side: Theme, Bookmarks, and Progress */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Progress Indicator */}
          <div className="hidden lg:flex flex-col items-end gap-0.5">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Your Progress
            </span>
            <div className="flex items-center gap-2">
              <div className="w-20 bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden border border-slate-200/20">
                <div 
                  className="bg-blue-600 dark:bg-blue-500 h-full rounded-full transition-all duration-300" 
                  style={{ width: `${progressPercent}%` }} 
                />
              </div>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 font-mono">
                {progressPercent}%
              </span>
            </div>
          </div>

          {/* Bookmarks Manager */}
          <div ref={bookmarkRef} className="relative">
            <button
              onClick={() => setShowBookmarksDropdown(!showBookmarksDropdown)}
              className="p-2 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-900 relative transition-colors"
              title="Bookmarks"
            >
              <Bookmark className={`w-4 h-4 ${bookmarks.length > 0 ? 'fill-blue-500 text-blue-500' : ''}`} />
              {bookmarks.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-rose-500 rounded-full" />
              )}
            </button>

            {showBookmarksDropdown && (
              <div className="absolute right-0 top-11 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-3 z-50 animate-in fade-in slide-in-from-top-1.5 duration-100">
                <div className="flex items-center justify-between px-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Saved Bookmarks ({bookmarks.length})
                  </span>
                </div>
                {bookmarks.length === 0 ? (
                  <div className="py-8 text-center text-slate-400 dark:text-slate-500">
                    <Bookmark className="w-6 h-6 mx-auto stroke-[1.5] text-slate-300 dark:text-slate-700 mb-2" />
                    <p className="text-xs font-bold">No saved pages yet</p>
                    <p className="text-[10px] mt-0.5 px-4 text-slate-400">Click the bookmark icon inside any lesson to save it.</p>
                  </div>
                ) : (
                  <div className="mt-2 space-y-0.5 max-h-64 overflow-y-auto">
                    {bookmarks.map(lessonId => {
                      const lesson = lessonsData.find(l => l.id === lessonId);
                      if (!lesson) return null;
                      return (
                        <div key={lessonId} className="flex items-center gap-1 group">
                          <button
                            onClick={() => {
                              onNavigate(lessonId);
                              setShowBookmarksDropdown(false);
                            }}
                            className="flex-1 flex items-center gap-2 p-2 rounded-lg text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                          >
                            <span className="p-1 rounded bg-slate-100 dark:bg-slate-950">
                              {getLessonIcon(lesson.icon)}
                            </span>
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{lesson.title}</p>
                              <p className="text-[9px] text-slate-400 truncate">{lesson.difficulty} &bull; {lesson.estimatedTime}</p>
                            </div>
                          </button>
                          <button
                            onClick={() => onToggleBookmark(lessonId)}
                            className="p-1.5 rounded-lg text-slate-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 mr-1 opacity-0 group-hover:opacity-100 transition-all"
                            title="Remove bookmark"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Elegant Three-state Theme Toggle */}
          <div className="flex items-center bg-slate-50 dark:bg-slate-950 p-0.5 rounded-full border border-slate-150 dark:border-slate-850 shadow-xs">
            <button
              onClick={() => handleThemeChange('light')}
              className={`p-1 rounded-full transition-all ${theme === 'light' ? 'bg-white dark:bg-slate-900 text-amber-500 shadow-xs border border-slate-100 dark:border-slate-800' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
              title="Light Mode"
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleThemeChange('dark')}
              className={`p-1 rounded-full transition-all ${theme === 'dark' ? 'bg-slate-900 text-blue-500 shadow-xs border border-slate-800' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
              title="Dark Mode"
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleThemeChange('system')}
              className={`p-1 rounded-full transition-all ${theme === 'system' ? 'bg-white dark:bg-slate-900 text-indigo-500 shadow-xs border border-slate-100 dark:border-slate-800' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
              title="System Default"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Profile Badge initials */}
          <div className="w-7 h-7 rounded-full bg-slate-800 border-2 border-white dark:border-slate-700 shadow-xs flex items-center justify-center text-white text-[10px] font-extrabold select-none">
            EDU
          </div>

        </div>
      </div>
    </header>
  );
}
