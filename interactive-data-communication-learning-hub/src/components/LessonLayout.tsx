import React, { useState } from 'react';
import { 
  BookOpen,
  Lightbulb,
  CircleHelp,
  Network,
  Router,
  Monitor,
  Server,
  ShieldCheck,
  ShieldAlert,
  TriangleAlert,
  CheckCircle2,
  XCircle,
  Info,
  Cable,
  ArrowRight,
  ArrowDown,
  ArrowLeftRight,
  Send,
  Package,
  Layers,
  Database,
  FileText,
  Workflow,
  Play,
  Pause,
  RotateCcw,
  Search,
  Bookmark,
  Star,
  GraduationCap,
  Brain,
  Clock,
  Eye,
  EyeOff,
  Table,
  BarChart3,
  GitCompare,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  CircleX,
  Check
} from 'lucide-react';
import { Lesson, UserProgress } from '../types';
import DLCLessonWidgets from './Lessons/DLC';
import PPPLessonWidgets from './Lessons/PPP';
import MultipleAccessLessonWidgets from './Lessons/MultipleAccess';

interface LessonLayoutProps {
  lessonId: string;
  onToggleBookmark: (id: string) => void;
  onToggleCompletion: (id: string) => void;
  isBookmarked: boolean;
  isCompleted: boolean;
  progress: UserProgress;
  onQuizComplete: (category: string, score: number) => void;
  lessonQuizzes: any[];
}

export default function LessonLayout({
  lessonId,
  onToggleBookmark,
  onToggleCompletion,
  isBookmarked,
  isCompleted,
  progress,
}: LessonLayoutProps) {
  // Local state for the interactive quick revision (reveal answer toggles)
  const [revealedRevision, setRevealedRevision] = useState<Record<string, boolean>>({});

  const toggleRevision = (key: string) => {
    setRevealedRevision(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // State for simple introduction slide show animation
  const [introStep, setIntroStep] = useState(0);

  // Content databases customized to the exact layout and style constraints
  if (lessonId === 'introduction') {
    return (
      <div className="space-y-12 animate-in fade-in duration-300">
        
        {/* Topic Title & Header */}
        <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-wider">
                Lesson 1
              </span>
              <span className="text-xs text-slate-400 font-semibold">• 15 min read</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Network className="h-6 w-6 text-blue-500" /> Introduction to Data Communication
            </h1>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              The basic way devices share information across a network.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-center shrink-0">
            <button
              onClick={() => onToggleBookmark('introduction')}
              className={`p-2 py-1.5 rounded-xl border flex items-center gap-1.5 text-xs font-bold transition-all hover:translate-y-[-1px] cursor-pointer
                ${isBookmarked
                  ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 border-blue-500/20'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50'}
              `}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-blue-500 text-blue-500' : ''}`} />
              {isBookmarked ? 'Saved' : 'Save'}
            </button>

            <button
              onClick={() => onToggleCompletion('introduction')}
              className={`p-2 py-1.5 rounded-xl border flex items-center gap-1.5 text-xs font-bold transition-all hover:translate-y-[-1px] cursor-pointer
                ${isCompleted
                  ? 'bg-emerald-600 text-white border-transparent shadow-xs'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50'}
              `}
            >
              <Check className="w-3.5 h-3.5" />
              {isCompleted ? 'Completed' : 'Complete'}
            </button>
          </div>
        </div>

        {/* What is it? & Why do we need it? */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-2xl shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-500" /> What is it?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Data communication is the exchange of information between two devices.
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              It uses a physical connection like a cable or wireless waves.
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              It helps computers, phones, and servers talk to each other.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-2xl shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <CircleHelp className="h-5 w-5 text-emerald-500" /> Why do we need it?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Imagine if computers could not talk to each other. You would have to use a USB flash drive to copy files every time.
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Data communication connects the world.
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              It lets us share files, stream movies, and browse websites instantly.
            </p>
          </div>
        </div>

        {/* Key Idea (Colored Card with custom checkmarks) */}
        <div className="p-6 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border-l-4 border-blue-500 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
            <Lightbulb className="h-5 w-5 text-amber-500" /> Key Idea
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div className="flex items-center gap-2 text-xs font-extrabold text-slate-700 dark:text-slate-200">
              <Check className="h-4 w-4 text-emerald-500 shrink-0" /> Connects devices
            </div>
            <div className="flex items-center gap-2 text-xs font-extrabold text-slate-700 dark:text-slate-200">
              <Check className="h-4 w-4 text-emerald-500 shrink-0" /> Moves digital bits (0s and 1s)
            </div>
            <div className="flex items-center gap-2 text-xs font-extrabold text-slate-700 dark:text-slate-200">
              <Check className="h-4 w-4 text-emerald-500 shrink-0" /> Uses cables or wireless waves
            </div>
            <div className="flex items-center gap-2 text-xs font-extrabold text-slate-700 dark:text-slate-200">
              <Check className="h-4 w-4 text-emerald-500 shrink-0" /> Follows strict communication rules
            </div>
          </div>
        </div>

        {/* How does it work? (Step-by-Step flow) */}
        <div className="p-6 md:p-8 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-2xl shadow-xs space-y-6">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Workflow className="h-5 w-5 text-blue-500" /> How does it work?
          </h3>
          <div className="flex flex-col md:flex-row items-stretch justify-between gap-4">
            <div className="flex-1 p-4 bg-slate-50 dark:bg-slate-950 rounded-xl space-y-1.5 border border-slate-100 dark:border-slate-850">
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Step 1</p>
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Create Message</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">The sender computer creates the message (like a chat text or file).</p>
            </div>
            <div className="flex items-center justify-center text-slate-300 dark:text-slate-700 font-bold text-lg">↓</div>
            <div className="flex-1 p-4 bg-slate-50 dark:bg-slate-950 rounded-xl space-y-1.5 border border-slate-100 dark:border-slate-850">
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Step 2</p>
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Translate into Bits</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">The computer converts the message into 0s and 1s.</p>
            </div>
            <div className="flex items-center justify-center text-slate-300 dark:text-slate-700 font-bold text-lg">↓</div>
            <div className="flex-1 p-4 bg-slate-50 dark:bg-slate-950 rounded-xl space-y-1.5 border border-slate-100 dark:border-slate-850">
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Step 3</p>
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Transmit over Medium</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">The bits travel through copper wires, fiber cables, or airwaves.</p>
            </div>
            <div className="flex items-center justify-center text-slate-300 dark:text-slate-700 font-bold text-lg">↓</div>
            <div className="flex-1 p-4 bg-slate-50 dark:bg-slate-950 rounded-xl space-y-1.5 border border-slate-100 dark:border-slate-850">
              <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Final Result</p>
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Receive and Read</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">The receiver gets the bits and translates them back into the original message.</p>
            </div>
          </div>
        </div>

        {/* Visual Example beside Explanation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 p-6 md:p-8 rounded-2xl shadow-xs">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <FileText className="h-5 w-5 text-indigo-500" /> Visual Example
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              We connect a laptop to a home router, which communicates with a network switch, and finally sends the data packet to another computer.
            </p>
            <div className="space-y-2 pt-2 text-xs">
              <div className={`p-3 rounded-lg font-bold border transition-all ${introStep === 0 ? 'bg-blue-50 dark:bg-blue-950 border-blue-400 text-blue-700 dark:text-blue-300' : 'bg-slate-50/50 dark:bg-slate-950 border-transparent text-slate-400'}`}>
                1. Laptop initiates packet transfer
              </div>
              <div className={`p-3 rounded-lg font-bold border transition-all ${introStep === 1 ? 'bg-blue-50 dark:bg-blue-950 border-blue-400 text-blue-700 dark:text-blue-300' : 'bg-slate-50/50 dark:bg-slate-950 border-transparent text-slate-400'}`}>
                2. Router forwards data across networks
              </div>
              <div className={`p-3 rounded-lg font-bold border transition-all ${introStep === 2 ? 'bg-blue-50 dark:bg-blue-950 border-blue-400 text-blue-700 dark:text-blue-300' : 'bg-slate-50/50 dark:bg-slate-950 border-transparent text-slate-400'}`}>
                3. Switch directs frames to the correct destination
              </div>
            </div>
            <button 
              onClick={() => setIntroStep(prev => (prev + 1) % 3)}
              className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              Step Animation <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Interactive Flow Illustration */}
          <div className="p-6 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-850 flex flex-col items-center justify-center space-y-6">
            <span className="text-[9px] font-bold tracking-wider text-slate-400 uppercase bg-slate-100 dark:bg-slate-900 px-2.5 py-1 rounded">Interactive Flow Simulator</span>
            
            <div className="flex items-center justify-between w-full max-w-sm relative">
              {/* Connector wires */}
              <div className="absolute top-5 left-8 right-8 h-1 bg-slate-200 dark:bg-slate-800 -z-10" />
              {/* Floating animated packet */}
              <div 
                className="absolute top-3 w-5 h-5 rounded-full bg-blue-500 text-[10px] font-bold text-white flex items-center justify-center shadow-lg transition-all duration-1000" 
                style={{
                  left: introStep === 0 ? '5%' : introStep === 1 ? '50%' : '90%',
                  transform: 'translateX(-50%)'
                }}
              >
                <Package className="w-3.5 h-3.5 text-white" />
              </div>

              <div className="flex flex-col items-center gap-1.5">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs border ${introStep === 0 ? 'bg-blue-600 text-white border-transparent' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-850 text-slate-500'}`}>
                  Laptop
                </div>
              </div>

              <div className="flex flex-col items-center gap-1.5">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs border ${introStep === 1 ? 'bg-blue-600 text-white border-transparent' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-850 text-slate-500'}`}>
                  Router
                </div>
              </div>

              <div className="flex flex-col items-center gap-1.5">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs border ${introStep === 2 ? 'bg-blue-600 text-white border-transparent' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-850 text-slate-500'}`}>
                  PC
                </div>
              </div>
            </div>

            <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 text-center leading-relaxed">
              {introStep === 0 && "Laptop bundles your photo into binary bits."}
              {introStep === 1 && "Router receives bits and chooses the fastest pathway."}
              {introStep === 2 && "Destination PC reads the bits and opens your photo!"}
            </p>
          </div>
        </div>

        {/* Real-life Analogy & Examples */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-2xl shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-purple-500 shrink-0" /> Real-life Analogy
            </h3>
            <div className="p-4 bg-purple-50/50 dark:bg-purple-950/20 border-l-4 border-purple-500 rounded-r-xl space-y-2">
              <h4 className="text-xs font-bold text-purple-950 dark:text-purple-300">Sending a Letter in the Mail</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                Your letter is the <strong className="text-purple-600 dark:text-purple-400">Data</strong>.
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                The envelope format is the <strong className="text-purple-600 dark:text-purple-400">Protocol (Rules)</strong>.
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                The delivery truck is the <strong className="text-purple-600 dark:text-purple-400">Transmission Medium</strong>.
              </p>
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-2xl shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Info className="h-5 w-5 text-amber-500 shrink-0" /> Example
            </h3>
            <div className="p-4 bg-orange-50/50 dark:bg-orange-950/20 border-l-4 border-orange-500 rounded-r-xl space-y-2">
              <h4 className="text-xs font-bold text-orange-950 dark:text-orange-300">Sending a Photo on Your Phone</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                The photo is split into tiny pieces called packets.
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                It is sent over the airwaves.
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                It reassembles instantly on your friend&apos;s phone.
              </p>
            </div>
          </div>
        </div>

        {/* Key Terms */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Layers className="h-5 w-5 text-sky-500 shrink-0" /> Key Terms
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-xl shadow-xs space-y-1.5">
              <h4 className="font-extrabold text-xs text-blue-600 dark:text-blue-400">Sender</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                The computer or device that creates and transmits the data.
              </p>
            </div>
            <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-xl shadow-xs space-y-1.5">
              <h4 className="font-extrabold text-xs text-blue-600 dark:text-blue-400">Receiver</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                The device that gets the data and reads the message.
              </p>
            </div>
            <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-xl shadow-xs space-y-1.5">
              <h4 className="font-extrabold text-xs text-blue-600 dark:text-blue-400">Medium</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                The physical path (cables or wireless airwaves) that carries the data.
              </p>
            </div>
            <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-xl shadow-xs space-y-1.5">
              <h4 className="font-extrabold text-xs text-blue-600 dark:text-blue-400">Protocol</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                The strict set of rules that devices must agree on to understand each other.
              </p>
            </div>
          </div>
        </div>

        {/* Important Points & Common Mistakes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/20 border-l-4 border-emerald-500 rounded-r-xl space-y-3">
            <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="h-5 w-5 text-emerald-500" /> Important Points
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 font-medium list-disc pl-4">
              <li>Multiple connections (Redundancy) prevent link downtime.</li>
              <li>Protocols are strict agreements.</li>
              <li>Without protocols, computers connect but cannot understand each other.</li>
            </ul>
          </div>

          <div className="p-4 bg-rose-50/50 dark:bg-rose-950/20 border-l-4 border-rose-500 rounded-r-xl space-y-3">
            <h4 className="text-xs font-bold text-rose-800 dark:text-rose-400 flex items-center gap-1">
              <TriangleAlert className="h-5 w-5 text-rose-500" /> Common Mistakes
            </h4>
            <div className="text-xs text-slate-700 dark:text-slate-300 font-medium space-y-2">
              <p>
                <strong>Mistake:</strong> Confusing <span className="text-rose-500">Medium</span> and <span className="text-rose-500">Protocol</span>.
              </p>
              <p>
                <strong>Clarification:</strong> The Medium is the road (cables). The Protocol is the driving rule (staying on the correct side).
              </p>
            </div>
          </div>
        </div>

        {/* Memory Tip */}
        <div className="p-4 bg-purple-50/50 dark:bg-purple-950/20 border-l-4 border-purple-500 rounded-r-xl flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-xs text-purple-950 dark:text-purple-300">Memory Tip</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Think of <strong className="text-purple-600">Protocol</strong> like a common language. If two people connect on a call but speak different languages, they cannot communicate!
            </p>
          </div>
        </div>

        {/* Summary (Max 5 bullets, no paragraphs) */}
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-2xl shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" /> Summary
          </h3>
          <ul className="space-y-2 pl-5 list-disc text-xs text-slate-600 dark:text-slate-400 font-medium">
            <li>Data communication is the exchange of data between two devices.</li>
            <li>It requires five key parts: Sender, Receiver, Message, Medium, and Protocol.</li>
            <li>Data flows in three directions: Simplex (one-way), Half-Duplex (alternate), and Full-Duplex (simultaneous).</li>
            <li>Network topology defines how devices are wired together (Star, Ring, Mesh).</li>
            <li>Standardization guarantees different companies can build hardware that works together.</li>
          </ul>
        </div>

        {/* Quick Revision (Flashcard Reveal style) */}
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-2xl shadow-xs space-y-6">
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <CircleHelp className="h-5 w-5 text-blue-500 shrink-0" /> Quick Revision
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Click any card to reveal the answer. Great for pre-test revision!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Revision Q1 */}
            <div 
              onClick={() => toggleRevision('intro1')}
              className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 cursor-pointer hover:border-blue-500/50 transition-all space-y-3"
            >
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-extrabold text-blue-600 uppercase">Question 1</span>
                <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                  {revealedRevision['intro1'] ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  {revealedRevision['intro1'] ? 'Hide Answer' : 'Show Answer'}
                </span>
              </div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-100">
                What are the five core parts of a data communication system?
              </p>
              {revealedRevision['intro1'] && (
                <div className="pt-3 border-t border-dashed border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 font-medium animate-in slide-in-from-top-1">
                  The five parts are: 1. Message (data), 2. Sender, 3. Receiver, 4. Medium (wire/airwaves), and 5. Protocol (the rules).
                </div>
              )}
            </div>

            {/* Revision Q2 */}
            <div 
              onClick={() => toggleRevision('intro2')}
              className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 cursor-pointer hover:border-blue-500/50 transition-all space-y-3"
            >
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-extrabold text-blue-600 uppercase">Question 2</span>
                <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                  {revealedRevision['intro2'] ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  {revealedRevision['intro2'] ? 'Hide Answer' : 'Show Answer'}
                </span>
              </div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-100">
                What is the main advantage of a Mesh network topology?
              </p>
              {revealedRevision['intro2'] && (
                <div className="pt-3 border-t border-dashed border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 font-medium animate-in slide-in-from-top-1">
                  Mesh has maximum redundancy. If one cable breaks, data can take alternative paths, keeping communication active.
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    );
  }

  if (lessonId === 'dlc') {
    return (
      <div className="space-y-12 animate-in fade-in duration-300">
        
        {/* Topic Title & Header */}
        <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-wider">
                Lesson 2
              </span>
              <span className="text-xs text-slate-400 font-semibold">• 25 min read</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Package className="h-6 w-6 text-blue-500" /> Data Link Control (DLC)
            </h1>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              Managing flow, framing, and errors over a single node-to-node link.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-center shrink-0">
            <button
              onClick={() => onToggleBookmark('dlc')}
              className={`p-2 py-1.5 rounded-xl border flex items-center gap-1.5 text-xs font-bold transition-all hover:translate-y-[-1px] cursor-pointer
                ${isBookmarked
                  ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 border-blue-500/20'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50'}
              `}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-blue-500 text-blue-500' : ''}`} />
              {isBookmarked ? 'Saved' : 'Save'}
            </button>

            <button
              onClick={() => onToggleCompletion('dlc')}
              className={`p-2 py-1.5 rounded-xl border flex items-center gap-1.5 text-xs font-bold transition-all hover:translate-y-[-1px] cursor-pointer
                ${isCompleted
                  ? 'bg-emerald-600 text-white border-transparent shadow-xs'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50'}
              `}
            >
              <Check className="w-3.5 h-3.5" />
              {isCompleted ? 'Completed' : 'Complete'}
            </button>
          </div>
        </div>

        {/* What is it? & Why do we need it? */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-2xl shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-500" /> What is it?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Data Link Control (DLC) is a set of rules that ensures safe communication over a single link.
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              It works at the Data Link Layer (Layer 2).
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              It takes raw physical bits and groups them into clean packages.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-2xl shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <CircleHelp className="h-5 w-5 text-emerald-500" /> Why do we need it?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Physical links are noisy. Data gets distorted or lost on cables.
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              If a fast computer sends data too quickly, a slow computer&apos;s buffer memory overflows.
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              DLC controls transmission speed and automatically checks and requests corrections for errors.
            </p>
          </div>
        </div>

        {/* Key Idea (Colored Card with custom checkmarks) */}
        <div className="p-6 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border-l-4 border-emerald-500 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
            <Lightbulb className="h-5 w-5 text-amber-500" /> Key Idea
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div className="flex items-center gap-2 text-xs font-extrabold text-slate-700 dark:text-slate-200">
              <Check className="h-4 w-4 text-emerald-500 shrink-0" /> Organizes data into Frames
            </div>
            <div className="flex items-center gap-2 text-xs font-extrabold text-slate-700 dark:text-slate-200">
              <Check className="h-4 w-4 text-emerald-500 shrink-0" /> Detects and flags errors
            </div>
            <div className="flex items-center gap-2 text-xs font-extrabold text-slate-700 dark:text-slate-200">
              <Check className="h-4 w-4 text-emerald-500 shrink-0" /> Controls the speed of transmission
            </div>
            <div className="flex items-center gap-2 text-xs font-extrabold text-slate-700 dark:text-slate-200">
              <Check className="h-4 w-4 text-emerald-500 shrink-0" /> Ensures robust link reliability
            </div>
          </div>
        </div>

        {/* How does it work? (Step-by-Step flow) */}
        <div className="p-6 md:p-8 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-2xl shadow-xs space-y-6">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Workflow className="h-5 w-5 text-blue-500" /> How does it work?
          </h3>
          <div className="flex flex-col md:flex-row items-stretch justify-between gap-4">
            <div className="flex-1 p-4 bg-slate-50 dark:bg-slate-950 rounded-xl space-y-1.5 border border-slate-100 dark:border-slate-850">
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Step 1</p>
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Framing</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">The sender groups raw bits into packages with starting/ending flags.</p>
            </div>
            <div className="flex items-center justify-center text-slate-300 dark:text-slate-700 font-bold text-lg">↓</div>
            <div className="flex-1 p-4 bg-slate-50 dark:bg-slate-950 rounded-xl space-y-1.5 border border-slate-100 dark:border-slate-850">
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Step 2</p>
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Flow Control</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">The sender checks if the receiver buffer is ready to accept a frame.</p>
            </div>
            <div className="flex items-center justify-center text-slate-300 dark:text-slate-700 font-bold text-lg">↓</div>
            <div className="flex-1 p-4 bg-slate-50 dark:bg-slate-950 rounded-xl space-y-1.5 border border-slate-100 dark:border-slate-850">
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Step 3</p>
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Error Checking</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">The sender computes a check value (like CRC) and appends it to the packet.</p>
            </div>
            <div className="flex items-center justify-center text-slate-300 dark:text-slate-700 font-bold text-lg">↓</div>
            <div className="flex-1 p-4 bg-slate-50 dark:bg-slate-950 rounded-xl space-y-1.5 border border-slate-100 dark:border-slate-850">
              <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Final Result</p>
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Acknowledgment</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">The receiver confirms the math is correct and sends back an ACK confirmation.</p>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-2xl shadow-xs space-y-4">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-blue-500 shrink-0" /> Quick Protocol Feature Comparison
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800">
                  <th className="py-2.5 font-bold text-slate-800 dark:text-slate-200">Feature</th>
                  <th className="py-2.5 font-bold text-slate-800 dark:text-slate-200">Flow Control</th>
                  <th className="py-2.5 font-bold text-slate-800 dark:text-slate-200">Error Control</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-850">
                <tr>
                  <td className="py-2 text-slate-800 dark:text-slate-200 font-extrabold">Primary Purpose</td>
                  <td className="py-2 text-slate-500 dark:text-slate-400 font-medium">Controls transmission speed</td>
                  <td className="py-2 text-slate-500 dark:text-slate-400 font-medium">Detects and corrects flipped bits</td>
                </tr>
                <tr>
                  <td className="py-2 text-slate-800 dark:text-slate-200 font-extrabold">Prevents</td>
                  <td className="py-2 text-slate-500 dark:text-slate-400 font-medium">Receiver buffer overflow</td>
                  <td className="py-2 text-slate-500 dark:text-slate-400 font-medium">Lost, damaged, or duplicate frames</td>
                </tr>
                <tr>
                  <td className="py-2 text-slate-800 dark:text-slate-200 font-extrabold">Key Methods</td>
                  <td className="py-2 text-slate-500 dark:text-slate-400 font-medium">Stop-and-Wait, Sliding Window</td>
                  <td className="py-2 text-slate-500 dark:text-slate-400 font-medium">CRC, Checksums, Parity check</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Visual Example (Interactive DLC Widget integrated here!) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Play className="h-5 w-5 text-emerald-500" /> Interactive Simulator & Visual Examples
            </h3>
            <span className="text-[10px] font-bold text-blue-500 bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-800 px-2.5 py-0.5 rounded-full">Interactive Demo</span>
          </div>
          <DLCLessonWidgets />
        </div>

        {/* Real-life Analogy & Examples */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-2xl shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-purple-500 shrink-0" /> Real-life Analogy
            </h3>
            <div className="p-4 bg-purple-50/50 dark:bg-purple-950/20 border-l-4 border-purple-500 rounded-r-xl space-y-2">
              <h4 className="text-xs font-bold text-purple-950 dark:text-purple-300">Pouring Water into a Bottle</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                If you pour water into a bottleneck too quickly, it overflows.
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                You must watch the bottle fill and adjust your pouring rate.
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                This is how <strong className="text-purple-600">Flow Control</strong> works between machines!
              </p>
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-2xl shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Info className="h-5 w-5 text-amber-500 shrink-0" /> Example
            </h3>
            <div className="p-4 bg-orange-50/50 dark:bg-orange-950/20 border-l-4 border-orange-500 rounded-r-xl space-y-2">
              <h4 className="text-xs font-bold text-orange-950 dark:text-orange-300">A Laptop Sending Pages to a Printer</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                The laptop prints the first page.
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                It pauses and waits for the printer to say &ldquo;I&apos;m ready for the next page.&rdquo;
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                This ensures the printer doesn&apos;t run out of memory!
              </p>
            </div>
          </div>
        </div>

        {/* Key Terms */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Layers className="h-5 w-5 text-sky-500 shrink-0" /> Key Terms
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
            <div className="p-3.5 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-xl shadow-xs space-y-1">
              <h4 className="font-extrabold text-xs text-blue-600 dark:text-blue-400">Frame</h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                A logically packaged bundle of data sent across a network.
              </p>
            </div>
            <div className="p-3.5 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-xl shadow-xs space-y-1">
              <h4 className="font-extrabold text-xs text-blue-600 dark:text-blue-400">ACK</h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                Acknowledgment: A message saying &ldquo;I received your data.&rdquo;
              </p>
            </div>
            <div className="p-3.5 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-xl shadow-xs space-y-1">
              <h4 className="font-extrabold text-xs text-blue-600 dark:text-blue-400">NAK</h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                Negative Acknowledgment: &ldquo;Error detected, please send it again.&rdquo;
              </p>
            </div>
            <div className="p-3.5 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-xl shadow-xs space-y-1">
              <h4 className="font-extrabold text-xs text-blue-600 dark:text-blue-400">Bit Stuffing</h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                Inserting a 0-bit to ensure text never matches frame markers.
              </p>
            </div>
            <div className="p-3.5 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-xl shadow-xs space-y-1">
              <h4 className="font-extrabold text-xs text-blue-600 dark:text-blue-400">Sliding Window</h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                Allowing multiple packages to travel in a continuous pipe.
              </p>
            </div>
          </div>
        </div>

        {/* Important Points & Common Mistakes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/20 border-l-4 border-emerald-500 rounded-r-xl space-y-3">
            <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="h-5 w-5 text-emerald-500" /> Important Points
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 font-medium list-disc pl-4">
              <li>Flow Control controls pacing speed.</li>
              <li>Error Control fixes transmission problems.</li>
              <li>Framing divides continuous data streams into logical, numbered blocks.</li>
            </ul>
          </div>

          <div className="p-4 bg-rose-50/50 dark:bg-rose-950/20 border-l-4 border-rose-500 rounded-r-xl space-y-3">
            <h4 className="text-xs font-bold text-rose-800 dark:text-rose-400 flex items-center gap-1">
              <TriangleAlert className="h-5 w-5 text-rose-500" /> Common Mistakes
            </h4>
            <div className="text-xs text-slate-700 dark:text-slate-300 font-medium space-y-2">
              <p>
                <strong>Mistake:</strong> Thinking Flow Control and Error Control do the same thing.
              </p>
              <p>
                <strong>Clarification:</strong> Flow Control manages rate. Error Control manages frame accuracy and fixes flipped data bits.
              </p>
            </div>
          </div>
        </div>

        {/* Memory Tip */}
        <div className="p-4 bg-purple-50/50 dark:bg-purple-950/20 border-l-4 border-purple-500 rounded-r-xl flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-xs text-purple-950 dark:text-purple-300">Memory Tip</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Imagine <strong className="text-purple-600">Sliding Window</strong> like multiple packages moving on a conveyor belt, rather than waiting for each courier to return!
            </p>
          </div>
        </div>

        {/* Summary (Max 5 bullets, no paragraphs) */}
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-2xl shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" /> Summary
          </h3>
          <ul className="space-y-2 pl-5 list-disc text-xs text-slate-600 dark:text-slate-400 font-medium">
            <li>DLC converts raw physical channels into error-free transmission lines.</li>
            <li>Framing wraps payloads inside start/stop boundary bytes.</li>
            <li>Stop-and-Wait forces a one-by-one check, causing wire idleness.</li>
            <li>Sliding window speeds things up by letting multiple packets travel together.</li>
            <li>Cyclic Redundancy Checks (CRC) use polynomial divisions to spot corrupt bits.</li>
          </ul>
        </div>

        {/* Quick Revision (Flashcard Reveal style) */}
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-2xl shadow-xs space-y-6">
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <CircleHelp className="h-5 w-5 text-blue-500 shrink-0" /> Quick Revision
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Click any card to reveal the answer. Great for pre-test revision!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Revision Q1 */}
            <div 
              onClick={() => toggleRevision('dlc1')}
              className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 cursor-pointer hover:border-blue-500/50 transition-all space-y-3"
            >
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-extrabold text-blue-600 uppercase">Question 1</span>
                <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                  {revealedRevision['dlc1'] ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  {revealedRevision['dlc1'] ? 'Hide Answer' : 'Show Answer'}
                </span>
              </div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-100">
                Why is Bit Stuffing necessary in HDLC framing?
              </p>
              {revealedRevision['dlc1'] && (
                <div className="pt-3 border-t border-dashed border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 font-medium animate-in slide-in-from-top-1">
                  If the data naturally contains the flag pattern (01111110), the receiver would think the frame ended early. Bit stuffing inserts extra bits to break up this pattern.
                </div>
              )}
            </div>

            {/* Revision Q2 */}
            <div 
              onClick={() => toggleRevision('dlc2')}
              className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 cursor-pointer hover:border-blue-500/50 transition-all space-y-3"
            >
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-extrabold text-blue-600 uppercase">Question 2</span>
                <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                  {revealedRevision['dlc2'] ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  {revealedRevision['dlc2'] ? 'Hide Answer' : 'Show Answer'}
                </span>
              </div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-100">
                What does CRC stand for and what is its benefit?
              </p>
              {revealedRevision['dlc2'] && (
                <div className="pt-3 border-t border-dashed border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 font-medium animate-in slide-in-from-top-1">
                  Cyclic Redundancy Check. It is a highly efficient division check that catches over 99.9% of burst line errors.
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    );
  }

  if (lessonId === 'ppp') {
    return (
      <div className="space-y-12 animate-in fade-in duration-300">
        
        {/* Topic Title & Header */}
        <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-wider">
                Lesson 3
              </span>
              <span className="text-xs text-slate-400 font-semibold">• 20 min read</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Layers className="h-6 w-6 text-blue-500" /> Point-to-Point Protocols
            </h1>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              Connecting and authenticating two adjacent devices directly.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-center shrink-0">
            <button
              onClick={() => onToggleBookmark('ppp')}
              className={`p-2 py-1.5 rounded-xl border flex items-center gap-1.5 text-xs font-bold transition-all hover:translate-y-[-1px] cursor-pointer
                ${isBookmarked
                  ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 border-blue-500/20'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50'}
              `}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-blue-500 text-blue-500' : ''}`} />
              {isBookmarked ? 'Saved' : 'Save'}
            </button>

            <button
              onClick={() => onToggleCompletion('ppp')}
              className={`p-2 py-1.5 rounded-xl border flex items-center gap-1.5 text-xs font-bold transition-all hover:translate-y-[-1px] cursor-pointer
                ${isCompleted
                  ? 'bg-emerald-600 text-white border-transparent shadow-xs'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50'}
              `}
            >
              <Check className="w-3.5 h-3.5" />
              {isCompleted ? 'Completed' : 'Complete'}
            </button>
          </div>
        </div>

        {/* What is it? & Why do we need it? */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-2xl shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-500" /> What is it?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Point-to-Point Protocol (PPP) is a set of rules for direct communication between two adjacent computers.
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              It sets up and manages a direct cable, fiber, or phone link connection.
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              It handles identity checks before allowing network traffic flow.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-2xl shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <CircleHelp className="h-5 w-5 text-emerald-500" /> Why do we need it?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              When connecting to your ISP, they must check your credentials and make sure you paid.
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Standard LAN technologies don&apos;t have login features.
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              PPP securely establishes links, checks logins, and maps IP traffic seamlessly.
            </p>
          </div>
        </div>

        {/* Key Idea (Colored Card with custom checkmarks) */}
        <div className="p-6 rounded-2xl bg-orange-50/50 dark:bg-orange-950/20 border-l-4 border-orange-500 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 flex items-center gap-1.5">
            <Lightbulb className="h-5 w-5 text-amber-500" /> Key Idea
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div className="flex items-center gap-2 text-xs font-extrabold text-slate-700 dark:text-slate-200">
              <Check className="h-4 w-4 text-emerald-500 shrink-0" /> Direct node-to-node link
            </div>
            <div className="flex items-center gap-2 text-xs font-extrabold text-slate-700 dark:text-slate-200">
              <Check className="h-4 w-4 text-emerald-500 shrink-0" /> Authenticates user credentials
            </div>
            <div className="flex items-center gap-2 text-xs font-extrabold text-slate-700 dark:text-slate-200">
              <Check className="h-4 w-4 text-emerald-500 shrink-0" /> Configures multi-protocol data
            </div>
            <div className="flex items-center gap-2 text-xs font-extrabold text-slate-700 dark:text-slate-200">
              <Check className="h-4 w-4 text-emerald-500 shrink-0" /> Optimizes link settings dynamically
            </div>
          </div>
        </div>

        {/* How does it work? (Step-by-Step flow) */}
        <div className="p-6 md:p-8 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-2xl shadow-xs space-y-6">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Workflow className="h-5 w-5 text-blue-500" /> How does it work?
          </h3>
          <div className="flex flex-col md:flex-row items-stretch justify-between gap-4">
            <div className="flex-1 p-4 bg-slate-50 dark:bg-slate-950 rounded-xl space-y-1.5 border border-slate-100 dark:border-slate-850">
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Step 1</p>
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Link Establishment</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">LCP (Link Control Protocol) packets negotiate link parameters and formats.</p>
            </div>
            <div className="flex items-center justify-center text-slate-300 dark:text-slate-700 font-bold text-lg">↓</div>
            <div className="flex-1 p-4 bg-slate-50 dark:bg-slate-950 rounded-xl space-y-1.5 border border-slate-100 dark:border-slate-850">
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Step 2</p>
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Authentication</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">The server checks the password using PAP (plain) or CHAP (hashed puzzle).</p>
            </div>
            <div className="flex items-center justify-center text-slate-300 dark:text-slate-700 font-bold text-lg">↓</div>
            <div className="flex-1 p-4 bg-slate-50 dark:bg-slate-950 rounded-xl space-y-1.5 border border-slate-100 dark:border-slate-850">
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Step 3</p>
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Network Config</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">NCP maps IP protocols (assigning IP addresses) over the active PPP channel.</p>
            </div>
            <div className="flex items-center justify-center text-slate-300 dark:text-slate-700 font-bold text-lg">↓</div>
            <div className="flex-1 p-4 bg-slate-50 dark:bg-slate-950 rounded-xl space-y-1.5 border border-slate-100 dark:border-slate-850">
              <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Final Result</p>
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Safe Tunnel</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Data flows securely directly between the nodes.</p>
            </div>
          </div>
        </div>

        {/* Visual Example (Interactive PPP Widget here!) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Play className="h-5 w-5 text-emerald-500 shrink-0" /> Interactive Authentication Handshakes
            </h3>
            <span className="text-[10px] font-bold text-blue-500 bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-800 px-2.5 py-0.5 rounded-full">PPP Live Demo</span>
          </div>
          <PPPLessonWidgets />
        </div>

        {/* Comparison Table */}
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-2xl shadow-xs space-y-4">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <GitCompare className="h-4 w-4 text-purple-500 shrink-0" /> Login Security Handshakes: PAP vs CHAP
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800">
                  <th className="py-2.5 font-bold text-slate-800 dark:text-slate-200">Feature</th>
                  <th className="py-2.5 font-bold text-slate-800 dark:text-slate-200">PAP Handshake</th>
                  <th className="py-2.5 font-bold text-slate-800 dark:text-slate-200">CHAP Handshake</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-850">
                <tr>
                  <td className="py-2 text-slate-800 dark:text-slate-200 font-extrabold">Handshake Type</td>
                  <td className="py-2 text-slate-500 dark:text-slate-400 font-medium">Simple 2-Way Handshake</td>
                  <td className="py-2 text-slate-500 dark:text-slate-400 font-medium">Secure 3-Way Handshake</td>
                </tr>
                <tr>
                  <td className="py-2 text-slate-800 dark:text-slate-200 font-extrabold">Password Over Wire</td>
                  <td className="py-2 text-rose-500 font-bold">Yes, in Plain Text (Insecure)</td>
                  <td className="py-2 text-emerald-600 font-bold">No, Password is never transmitted!</td>
                </tr>
                <tr>
                  <td className="py-2 text-slate-800 dark:text-slate-200 font-extrabold">Method</td>
                  <td className="py-2 text-slate-500 dark:text-slate-400 font-medium">Send password, get accept/reject</td>
                  <td className="py-2 text-slate-500 dark:text-slate-400 font-medium">Send random challenge, hash response</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Real-life Analogy & Examples */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-2xl shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-purple-500 shrink-0" /> Real-life Analogy
            </h3>
            <div className="p-4 bg-purple-50/50 dark:bg-purple-950/20 border-l-4 border-purple-500 rounded-r-xl space-y-2">
              <h4 className="text-xs font-bold text-purple-950 dark:text-purple-300">Entering a Secure Building</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                You walk to the entrance and greet the desk guard (Link Setup).
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                You show your badge or swipe an ID card (Authentication).
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                The guard points you to the correct office room (Network Routing).
              </p>
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-2xl shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Info className="h-5 w-5 text-amber-500 shrink-0" /> Example
            </h3>
            <div className="p-4 bg-orange-50/50 dark:bg-orange-950/20 border-l-4 border-orange-500 rounded-r-xl space-y-2">
              <h4 className="text-xs font-bold text-orange-950 dark:text-orange-300">Home Broadband DSL Connections</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                Your home modem dials your Internet Provider.
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                It uses PPPoE (PPP over Ethernet) to log in.
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                Once verified, the provider allocates your home IP address.
              </p>
            </div>
          </div>
        </div>

        {/* Key Terms */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Layers className="h-5 w-5 text-sky-500 shrink-0" /> Key Terms
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-xl shadow-xs space-y-1.5">
              <h4 className="font-extrabold text-xs text-blue-600 dark:text-blue-400">LCP</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                Link Control Protocol: Sets up, tests, and closes physical connections.
              </p>
            </div>
            <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-xl shadow-xs space-y-1.5">
              <h4 className="font-extrabold text-xs text-blue-600 dark:text-blue-400">NCP</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                Network Control Protocol: Sets up and binds IP settings over the link.
              </p>
            </div>
            <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-xl shadow-xs space-y-1.5">
              <h4 className="font-extrabold text-xs text-blue-600 dark:text-blue-400">PAP</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                Password Authentication Protocol: Basic, insecure plain-text login.
              </p>
            </div>
            <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-xl shadow-xs space-y-1.5">
              <h4 className="font-extrabold text-xs text-blue-600 dark:text-blue-400">CHAP</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                Challenge Handshake Protocol: Safe login utilizing dynamic hash puzzles.
              </p>
            </div>
          </div>
        </div>

        {/* Important Points & Common Mistakes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/20 border-l-4 border-emerald-500 rounded-r-xl space-y-3">
            <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="h-5 w-5 text-emerald-500" /> Important Points
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 font-medium list-disc pl-4">
              <li>CHAP is always chosen over PAP for security.</li>
              <li>LCP handles parameters before authentication.</li>
              <li>NCP handles assigning IP addresses after authentication.</li>
            </ul>
          </div>

          <div className="p-4 bg-rose-50/50 dark:bg-rose-950/20 border-l-4 border-rose-500 rounded-r-xl space-y-3">
            <h4 className="text-xs font-bold text-rose-800 dark:text-rose-400 flex items-center gap-1">
              <TriangleAlert className="h-5 w-5 text-rose-500" /> Common Mistakes
            </h4>
            <div className="text-xs text-slate-700 dark:text-slate-300 font-medium space-y-2">
              <p>
                <strong>Mistake:</strong> Believing CHAP transmits the plain text password over the line.
              </p>
              <p>
                <strong>Clarification:</strong> CHAP never transmits passwords. It uses MD5 mathematical hashes to prove identity.
              </p>
            </div>
          </div>
        </div>

        {/* Memory Tip */}
        <div className="p-4 bg-purple-50/50 dark:bg-purple-950/20 border-l-4 border-purple-500 rounded-r-xl flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-xs text-purple-950 dark:text-purple-300">Memory Tip</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Think of <strong className="text-purple-600">CHAP</strong> like a bouncer asking a math riddle only you and he know the answer to, rather than you shouting your password out loud!
            </p>
          </div>
        </div>

        {/* Summary (Max 5 bullets, no paragraphs) */}
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-2xl shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" /> Summary
          </h3>
          <ul className="space-y-2 pl-5 list-disc text-xs text-slate-600 dark:text-slate-400 font-medium">
            <li>PPP establishes secure, direct communication tunnels between adjacent nodes.</li>
            <li>Link Setup is split into LCP, Authentication, and NCP.</li>
            <li>LCP coordinates line testing, frame compression, and parameters.</li>
            <li>PAP login is simple but highly unsafe (plain-text transmission).</li>
            <li>CHAP secures authentication by verifying dynamic, encrypted response handshakes.</li>
          </ul>
        </div>

        {/* Quick Revision (Flashcard Reveal style) */}
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-2xl shadow-xs space-y-6">
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <CircleHelp className="h-5 w-5 text-blue-500 shrink-0" /> Quick Revision
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Click any card to reveal the answer. Great for pre-test revision!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Revision Q1 */}
            <div 
              onClick={() => toggleRevision('ppp1')}
              className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 cursor-pointer hover:border-blue-500/50 transition-all space-y-3"
            >
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-extrabold text-blue-600 uppercase">Question 1</span>
                <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                  {revealedRevision['ppp1'] ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  {revealedRevision['ppp1'] ? 'Hide Answer' : 'Show Answer'}
                </span>
              </div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-100">
                What does NCP do in a PPP negotiation?
              </p>
              {revealedRevision['ppp1'] && (
                <div className="pt-3 border-t border-dashed border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 font-medium animate-in slide-in-from-top-1">
                  Network Control Protocol configures the specific network layer protocol parameters (such as negotiating and assigning an IP address over the PPP connection).
                </div>
              )}
            </div>

            {/* Revision Q2 */}
            <div 
              onClick={() => toggleRevision('ppp2')}
              className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 cursor-pointer hover:border-blue-500/50 transition-all space-y-3"
            >
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-extrabold text-blue-600 uppercase">Question 2</span>
                <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                  {revealedRevision['ppp2'] ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  {revealedRevision['ppp2'] ? 'Hide Answer' : 'Show Answer'}
                </span>
              </div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-100">
                How many devices are involved in a Point-to-Point link?
              </p>
              {revealedRevision['ppp2'] && (
                <div className="pt-3 border-t border-dashed border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 font-medium animate-in slide-in-from-top-1">
                  Exactly two devices. Because there are only two endpoints on the line, no addressing headers (routing) are needed to find destinations!
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    );
  }

  if (lessonId === 'multiple-access') {
    return (
      <div className="space-y-12 animate-in fade-in duration-300">
        
        {/* Topic Title & Header */}
        <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-wider">
                Lesson 4
              </span>
              <span className="text-xs text-slate-400 font-semibold">• 30 min read</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Network className="h-6 w-6 text-blue-500" /> Multiple Access Protocols
            </h1>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              Coordinating how multiple devices share a single communication channel.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-center shrink-0">
            <button
              onClick={() => onToggleBookmark('multiple-access')}
              className={`p-2 py-1.5 rounded-xl border flex items-center gap-1.5 text-xs font-bold transition-all hover:translate-y-[-1px] cursor-pointer
                ${isBookmarked
                  ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 border-blue-500/20'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50'}
              `}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-blue-500 text-blue-500' : ''}`} />
              {isBookmarked ? 'Saved' : 'Save'}
            </button>

            <button
              onClick={() => onToggleCompletion('multiple-access')}
              className={`p-2 py-1.5 rounded-xl border flex items-center gap-1.5 text-xs font-bold transition-all hover:translate-y-[-1px] cursor-pointer
                ${isCompleted
                  ? 'bg-emerald-600 text-white border-transparent shadow-xs'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50'}
              `}
            >
              <Check className="w-3.5 h-3.5" />
              {isCompleted ? 'Completed' : 'Complete'}
            </button>
          </div>
        </div>

        {/* What is it? & Why do we need it? */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-2xl shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-500" /> What is it?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Multiple Access Protocols are set rules that govern shared communication lines.
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              They coordinate sharing over wireless (Wi-Fi) or shared Ethernet cables.
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              They make sure every device gets a fair turn to transmit data.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-2xl shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <CircleHelp className="h-5 w-5 text-emerald-500" /> Why do we need it?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              If two wireless devices talk at the exact same instant, their signals crash.
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              This is called a Collision, which scrambles the messages into useless noise.
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Multiple Access protocols act as a digital traffic controller to prevent crashes.
            </p>
          </div>
        </div>

        {/* Key Idea (Colored Card with custom checkmarks) */}
        <div className="p-6 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border-l-4 border-purple-500 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
            <Lightbulb className="h-5 w-5 text-amber-500" /> Key Idea
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div className="flex items-center gap-2 text-xs font-extrabold text-slate-700 dark:text-slate-200">
              <Check className="h-4 w-4 text-emerald-500 shrink-0" /> Coordinates shared lines
            </div>
            <div className="flex items-center gap-2 text-xs font-extrabold text-slate-700 dark:text-slate-200">
              <Check className="h-4 w-4 text-emerald-500 shrink-0" /> Prevents signal collisions
            </div>
            <div className="flex items-center gap-2 text-xs font-extrabold text-slate-700 dark:text-slate-200">
              <Check className="h-4 w-4 text-emerald-500 shrink-0" /> Allocates channels fairly
            </div>
            <div className="flex items-center gap-2 text-xs font-extrabold text-slate-700 dark:text-slate-200">
              <Check className="h-4 w-4 text-emerald-500 shrink-0" /> Maximizes channel throughput
            </div>
          </div>
        </div>

        {/* How does it work? (Step-by-Step flow) */}
        <div className="p-6 md:p-8 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-2xl shadow-xs space-y-6">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Workflow className="h-5 w-5 text-blue-500" /> How does it work?
          </h3>
          <div className="flex flex-col md:flex-row items-stretch justify-between gap-4">
            <div className="flex-1 p-4 bg-slate-50 dark:bg-slate-950 rounded-xl space-y-1.5 border border-slate-100 dark:border-slate-850">
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Step 1</p>
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Check Medium</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">The device listens to the line to detect if anyone else is actively talking.</p>
            </div>
            <div className="flex items-center justify-center text-slate-300 dark:text-slate-700 font-bold text-lg">↓</div>
            <div className="flex-1 p-4 bg-slate-50 dark:bg-slate-950 rounded-xl space-y-1.5 border border-slate-100 dark:border-slate-850">
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Step 2</p>
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Access Coordination</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Follow protocol rules: wait for silent slots, tokens, or reserve time.</p>
            </div>
            <div className="flex items-center justify-center text-slate-300 dark:text-slate-700 font-bold text-lg">↓</div>
            <div className="flex-1 p-4 bg-slate-50 dark:bg-slate-950 rounded-xl space-y-1.5 border border-slate-100 dark:border-slate-850">
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Step 3</p>
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Transmit Packet</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">The device pushes its logical data frame onto the shared air or cable.</p>
            </div>
            <div className="flex items-center justify-center text-slate-300 dark:text-slate-700 font-bold text-lg">↓</div>
            <div className="flex-1 p-4 bg-slate-50 dark:bg-slate-950 rounded-xl space-y-1.5 border border-slate-100 dark:border-slate-850">
              <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Final Result</p>
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Crash Management</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">If two talk anyway, they stop immediately, wait a random time, and try again.</p>
            </div>
          </div>
        </div>

        {/* Visual Example (Interactive Multiple Access Widget here!) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Play className="h-5 w-5 text-emerald-500 shrink-0" /> Shared Media Collision Simulators
            </h3>
            <span className="text-[10px] font-bold text-blue-500 bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-800 px-2.5 py-0.5 rounded-full">Interactive Grid</span>
          </div>
          <MultipleAccessLessonWidgets />
        </div>

        {/* Real-life Analogy & Examples */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-2xl shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-purple-500 shrink-0" /> Real-life Analogy
            </h3>
            <div className="p-4 bg-purple-50/50 dark:bg-purple-950/20 border-l-4 border-purple-500 rounded-r-xl space-y-2">
              <h4 className="text-xs font-bold text-purple-950 dark:text-purple-300">A Busy School Classroom Discussion</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                If everyone shouts out answers simultaneously, nobody is understood.
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                Instead, you listen for a pause in the room before speaking.
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                Or wait for the teacher to raise a pointer and call on you!
              </p>
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-2xl shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Info className="h-5 w-5 text-amber-500 shrink-0" /> Example
            </h3>
            <div className="p-4 bg-orange-50/50 dark:bg-orange-950/20 border-l-4 border-orange-500 rounded-r-xl space-y-2">
              <h4 className="text-xs font-bold text-orange-950 dark:text-orange-300">Laptops Connecting to Cafe Wi-Fi</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                Multiple customers upload files to the same router.
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                Wi-Fi uses CSMA/CA (Collision Avoidance) protocols.
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                This stops their uploads from scrambling each other in mid-air!
              </p>
            </div>
          </div>
        </div>

        {/* Key Terms */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Layers className="h-5 w-5 text-sky-500 shrink-0" /> Key Terms
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
            <div className="p-3.5 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-xl shadow-xs space-y-1">
              <h4 className="font-extrabold text-xs text-blue-600 dark:text-blue-400">Collision</h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                When signals transmit together and corrupt into noise.
              </p>
            </div>
            <div className="p-3.5 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-xl shadow-xs space-y-1">
              <h4 className="font-extrabold text-xs text-blue-600 dark:text-blue-400">CSMA/CD</h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                Collision Detection: Listen, transmit, stop if a collision happens (Wired).
              </p>
            </div>
            <div className="p-3.5 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-xl shadow-xs space-y-1">
              <h4 className="font-extrabold text-xs text-blue-600 dark:text-blue-400">CSMA/CA</h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                Collision Avoidance: Negotiate slots before sending (Wireless Wi-Fi).
              </p>
            </div>
            <div className="p-3.5 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-xl shadow-xs space-y-1">
              <h4 className="font-extrabold text-xs text-blue-600 dark:text-blue-400">Token Passing</h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                Collision-free method where only the token holder speaks.
              </p>
            </div>
            <div className="p-3.5 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-xl shadow-xs space-y-1">
              <h4 className="font-extrabold text-xs text-blue-600 dark:text-blue-400">CDMA</h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                Code Division: Share same band but separate using math codes.
              </p>
            </div>
          </div>
        </div>

        {/* Important Points & Common Mistakes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/20 border-l-4 border-emerald-500 rounded-r-xl space-y-3">
            <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="h-5 w-5 text-emerald-500" /> Important Points
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 font-medium list-disc pl-4">
              <li>Wired lines listen while sending (Collision Detection).</li>
              <li>Wireless antennas cannot listen while sending (Collision Avoidance).</li>
              <li>Slotted ALOHA doubles Pure ALOHA efficiency by forcing timed slots.</li>
            </ul>
          </div>

          <div className="p-4 bg-rose-50/50 dark:bg-rose-950/20 border-l-4 border-rose-500 rounded-r-xl space-y-3">
            <h4 className="text-xs font-bold text-rose-800 dark:text-rose-400 flex items-center gap-1">
              <TriangleAlert className="h-5 w-5 text-rose-500" /> Common Mistakes
            </h4>
            <div className="text-xs text-slate-700 dark:text-slate-300 font-medium space-y-2">
              <p>
                <strong>Mistake:</strong> Confusing <span className="text-rose-500">CSMA/CD</span> with <span className="text-rose-500">CSMA/CA</span>.
              </p>
              <p>
                <strong>Clarification:</strong> CSMA/CD acts *after* collisions (Wired). CSMA/CA reserves air slots *before* transmitting (Wireless).
              </p>
            </div>
          </div>
        </div>

        {/* Memory Tip */}
        <div className="p-4 bg-purple-50/50 dark:bg-purple-950/20 border-l-4 border-purple-500 rounded-r-xl flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-xs text-purple-950 dark:text-purple-300">Memory Tip</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Think of <strong className="text-purple-600">CDMA</strong> like 10 couples talking in one room, but each couple speaks a completely different language. They hear noise, but easily parse their own partner!
            </p>
          </div>
        </div>

        {/* Summary (Max 5 bullets, no paragraphs) */}
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-2xl shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" /> Summary
          </h3>
          <ul className="space-y-2 pl-5 list-disc text-xs text-slate-600 dark:text-slate-400 font-medium">
            <li>Multiple Access coordinates sharing over a single physical broadcast medium.</li>
            <li>Random Access (ALOHA, CSMA) handles signal collisions reactively.</li>
            <li>CSMA/CD is designed for wired links; CSMA/CA is designed for wireless links.</li>
            <li>Controlled access (Polling, Tokens) guarantees zero collisions.</li>
            <li>Channelization slices bandwidth using Frequency (FDMA), Time (TDMA), or Code (CDMA).</li>
          </ul>
        </div>

        {/* Quick Revision (Flashcard Reveal style) */}
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-2xl shadow-xs space-y-6">
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <CircleHelp className="h-5 w-5 text-blue-500 shrink-0" /> Quick Revision
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Click any card to reveal the answer. Great for pre-test revision!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Revision Q1 */}
            <div 
              onClick={() => toggleRevision('ma1')}
              className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 cursor-pointer hover:border-blue-500/50 transition-all space-y-3"
            >
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-extrabold text-blue-600 uppercase">Question 1</span>
                <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                  {revealedRevision['ma1'] ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  {revealedRevision['ma1'] ? 'Hide Answer' : 'Show Answer'}
                </span>
              </div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-100">
                Why can&apos;t Wi-Fi networks easily detect collisions?
              </p>
              {revealedRevision['ma1'] && (
                <div className="pt-3 border-t border-dashed border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 font-medium animate-in slide-in-from-top-1">
                  The local transmit signal completely drowns out any distant collision signal, making collision avoidance (CSMA/CA) the only feasible solution.
                </div>
              )}
            </div>

            {/* Revision Q2 */}
            <div 
              onClick={() => toggleRevision('ma2')}
              className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 cursor-pointer hover:border-blue-500/50 transition-all space-y-3"
            >
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-extrabold text-blue-600 uppercase">Question 2</span>
                <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                  {revealedRevision['ma2'] ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  {revealedRevision['ma2'] ? 'Hide Answer' : 'Show Answer'}
                </span>
              </div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-100">
                How does Token Passing prevent packet collisions?
              </p>
              {revealedRevision['ma2'] && (
                <div className="pt-3 border-t border-dashed border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 font-medium animate-in slide-in-from-top-1">
                  Since there is only one token in the loop, and only the token holder can speak, it is physically impossible for two stations to transmit simultaneously!
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    );
  }

  // Fallback / default revision view styled with the exact same visual cleanliness
  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-blue-500" /> Revision & Cheat Sheets
        </h1>
        <p className="text-xs text-slate-500 leading-relaxed">
          The full Data Communication curriculum summarized in high-density revision blocks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-2xl shadow-xs space-y-3">
          <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Brain className="h-4 w-4 text-emerald-500 shrink-0" /> Theoretical Limits & Capacities
          </h3>
          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
            <li className="p-2 bg-slate-50 dark:bg-slate-950 rounded border border-slate-100 dark:border-slate-850">
              <strong className="text-blue-600 dark:text-blue-400">Shannon Capacity:</strong> C = B * log2(1 + SNR). Determines maximum theoretical data rate of a noisy channel.
            </li>
            <li className="p-2 bg-slate-50 dark:bg-slate-950 rounded border border-slate-100 dark:border-slate-850">
              <strong className="text-blue-600 dark:text-blue-400">Nyquist Bit Rate:</strong> BitRate = 2 * Bandwidth * log2(L). Maximum rate for a noiseless channel.
            </li>
            <li className="p-2 bg-slate-50 dark:bg-slate-950 rounded border border-slate-100 dark:border-slate-850">
              <strong className="text-blue-600 dark:text-blue-400">ALOHA Efficiencies:</strong> Pure ALOHA is ~18.4% efficient. Slotted ALOHA doubles this to ~36.8%.
            </li>
          </ul>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-2xl shadow-xs space-y-3">
          <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Layers className="h-4 w-4 text-amber-500 shrink-0" /> OSI Model Layers
          </h3>
          <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 font-medium">
            <li className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-extrabold">4</span> Transport Layer (TCP/UDP)</li>
            <li className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-extrabold">3</span> Network Layer (IP routing)</li>
            <li className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-extrabold">2</span> Data Link Layer (DLC, PPP, Frames)</li>
            <li className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-extrabold">1</span> Physical Layer (Wires, Bit streams)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
