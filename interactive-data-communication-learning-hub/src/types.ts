/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface RealWorldAnalogy {
  title: string;
  explanation: string;
  icon: string; // lucide icon name
}

export interface LessonSection {
  id: string;
  title: string;
  content: string; // Markdown or styled paragraph
  keyPoints?: string[];
}

export interface Lesson {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string; // lucide icon name
  difficulty: DifficultyLevel;
  estimatedTime: string; // e.g. "20 mins"
  definition: string;
  purpose: string;
  whyItMatters: string;
  analogy: RealWorldAnalogy;
  sections: LessonSection[];
  advantages: string[];
  disadvantages: string[];
  applications: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // 0-based index
  explanation: string;
  category: string; // links to lesson ID (e.g. "introduction", "dlc", "ppp", "multiple-access")
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  category: string; // links to lesson ID
}

export interface GlossaryItem {
  word: string;
  definition: string;
  category: string;
  related?: string[];
}

export interface UserProgress {
  completedLessons: string[]; // lesson IDs
  completedQuizzes: Record<string, number>; // quiz category -> max score achieved
  bookmarks: string[]; // bookmarked lesson IDs
}
