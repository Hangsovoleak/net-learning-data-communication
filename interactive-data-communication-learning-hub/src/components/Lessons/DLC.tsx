/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, AlertTriangle, CheckCircle, Info, ChevronRight, Settings } from 'lucide-react';

export default function DLCLessonWidgets() {
  return (
    <div className="space-y-12">
      <StopAndWaitWidget />
      <SlidingWindowWidget />
    </div>
  );
}

// ==========================================
// 1. STOP-AND-WAIT SIMULATOR
// ==========================================
function StopAndWaitWidget() {
  const [mode, setMode] = useState<'success' | 'lost-frame' | 'lost-ack'>('success');
  const [isPlaying, setIsPlaying] = useState(false);
  const [animPhase, setAnimPhase] = useState<'idle' | 'sending-frame' | 'lost-frame-event' | 'ack-back' | 'lost-ack-event' | 'timeout' | 'retransmitting'>('idle');
  const [packetPos, setPacketPos] = useState(0); // 0 to 100
  const [ackPos, setAckPos] = useState(0); // 0 to 100
  const [timerVal, setTimerVal] = useState(0); // 0 to 100 (Timeout countdown)
  const [logs, setLogs] = useState<string[]>(['System initialized. Click "Start Simulation" below.']);
  const [frameSeq, setFrameSeq] = useState(0); // Alternate 0 and 1
  const [retryCount, setRetryCount] = useState(0);

  const requestRef = useRef<number | null>(null);
  const phaseRef = useRef(animPhase);
  phaseRef.current = animPhase;

  const appendLog = (msg: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString([], { hour12: false })}] ${msg}`]);
  };

  const handleStart = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    setRetryCount(0);
    startCycle();
  };

  const startCycle = () => {
    setPacketPos(0);
    setAckPos(0);
    setTimerVal(0);
    setAnimPhase('sending-frame');
    appendLog(`Sender transmits Frame sequence ${frameSeq}...`);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setAnimPhase('idle');
    setPacketPos(0);
    setAckPos(0);
    setTimerVal(0);
    setFrameSeq(0);
    setRetryCount(0);
    setLogs(['Simulation reset. Ready.']);
  };

  // Run the physics/timing loops
  useEffect(() => {
    if (!isPlaying) return;

    let interval: NodeJS.Timeout | null = null;

    if (animPhase === 'sending-frame') {
      interval = setInterval(() => {
        setPacketPos(prev => {
          const next = prev + 3;
          if (mode === 'lost-frame' && next >= 50) {
            clearInterval(interval!);
            setAnimPhase('lost-frame-event');
            appendLog(`[NOISE BURST] Frame sequence ${frameSeq} corrupted & lost on transmission medium!`);
            return 50;
          }
          if (next >= 100) {
            clearInterval(interval!);
            setAnimPhase('ack-back');
            appendLog(`Receiver successfully parsed Frame ${frameSeq}. Appending parity verification... OK! Sending ACK...`);
            return 100;
          }
          return next;
        });
      }, 50);
    } 
    else if (animPhase === 'lost-frame-event') {
      // Flash red packet, then vanish, then start countdown
      let count = 0;
      interval = setInterval(() => {
        count++;
        if (count >= 10) {
          clearInterval(interval!);
          setAnimPhase('timeout');
          appendLog(`Sender starts retransmission timer... waiting for ACK.`);
        }
      }, 100);
    }
    else if (animPhase === 'ack-back') {
      interval = setInterval(() => {
        setAckPos(prev => {
          const next = prev + 3;
          if (mode === 'lost-ack' && next >= 50) {
            clearInterval(interval!);
            setAnimPhase('lost-ack-event');
            appendLog(`[COLLISION] ACK packet destroyed halfway back to sender!`);
            return 50;
          }
          if (next >= 100) {
            clearInterval(interval!);
            setIsPlaying(false);
            setAnimPhase('idle');
            setFrameSeq(prev => (prev === 0 ? 1 : 0));
            appendLog(`[SUCCESS] Sender received ACK. Flow sliding window can proceed to next packet.`);
            return 100;
          }
          return next;
        });
      }, 50);
    }
    else if (animPhase === 'lost-ack-event') {
      let count = 0;
      interval = setInterval(() => {
        count++;
        if (count >= 10) {
          clearInterval(interval!);
          setAnimPhase('timeout');
          appendLog(`Sender timer running... no acknowledgement received.`);
        }
      }, 100);
    }
    else if (animPhase === 'timeout') {
      // Count down timerVal up to 100
      interval = setInterval(() => {
        setTimerVal(prev => {
          const next = prev + 5;
          if (next >= 100) {
            clearInterval(interval!);
            setAnimPhase('retransmitting');
            setRetryCount(r => r + 1);
            appendLog(`[TIMEOUT] TIMEOUT EXPIRED! No ACK received. Automatic Stop-and-Wait retransmission triggered!`);
            return 100;
          }
          return next;
        });
      }, 100);
    }
    else if (animPhase === 'retransmitting') {
      let count = 0;
      interval = setInterval(() => {
        count++;
        if (count >= 15) {
          clearInterval(interval!);
          // Retransmit - let's set back to send frame, but maybe successful now to resolve loop
          setPacketPos(0);
          setAckPos(0);
          setTimerVal(0);
          setAnimPhase('sending-frame');
          appendLog(`Retransmitting Frame sequence ${frameSeq} (Attempt #${retryCount + 1})`);
        }
      }, 100);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, animPhase, mode, frameSeq, retryCount]);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-2xl overflow-hidden shadow-xs">
      <div className="p-6 md:p-8 space-y-6">
        <div>
          <span className="text-[10px] bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
            Protocol Simulation #1
          </span>
          <h3 className="text-lg font-extrabold text-slate-800 dark:text-slate-100 mt-1">
            Stop-and-Wait ARQ Interactive Playground
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Choose a channel condition below and watch how the sender coordinates packet delivery using timers and ACKs.
          </p>
        </div>

        {/* Configurations Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-850">
          <button
            onClick={() => !isPlaying && setMode('success')}
            disabled={isPlaying}
            className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all
              ${mode === 'success' 
                ? 'bg-emerald-500 text-white border-transparent shadow-md' 
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}
              ${isPlaying ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <div className="font-bold">1. Successful Delivery</div>
            <div className="opacity-80 font-normal text-[10px] mt-0.5">Frame arrives cleanly; ACK returns safely.</div>
          </button>

          <button
            onClick={() => !isPlaying && setMode('lost-frame')}
            disabled={isPlaying}
            className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all
              ${mode === 'lost-frame' 
                ? 'bg-rose-500 text-white border-transparent shadow-md' 
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}
              ${isPlaying ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <div className="font-bold">2. Lost Frame (Noise)</div>
            <div className="opacity-80 font-normal text-[10px] mt-0.5">Packet collides mid-cable. Automatic timeout triggered.</div>
          </button>

          <button
            onClick={() => !isPlaying && setMode('lost-ack')}
            disabled={isPlaying}
            className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all
              ${mode === 'lost-ack' 
                ? 'bg-amber-500 text-white border-transparent shadow-md' 
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}
              ${isPlaying ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <div className="font-bold">3. Lost ACK Frame</div>
            <div className="opacity-80 font-normal text-[10px] mt-0.5">Frame is received, but return confirmation is lost.</div>
          </button>
        </div>

        {/* Visual Stage */}
        <div className="relative h-64 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-850 overflow-hidden flex flex-col justify-between p-4">
          
          {/* Top Indicators: Timeout Bar and Retransmit counter */}
          <div className="flex justify-between items-center z-10">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Timeout Timer:</span>
              <div className="w-24 bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-amber-500 h-full transition-all duration-100" 
                  style={{ width: `${timerVal}%` }} 
                />
              </div>
              {timerVal > 0 && <span className="text-[10px] font-bold text-amber-500">{timerVal}%</span>}
            </div>
            
            {retryCount > 0 && (
              <div className="px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-bold text-[10px]">
                Retransmit Count: {retryCount}
              </div>
            )}
          </div>

          {/* Node-to-Node Transmission line */}
          <div className="flex-1 flex items-center justify-between relative px-10">
            
            {/* Sender Node */}
            <div className="flex flex-col items-center gap-2 z-10">
              <div className={`w-16 h-16 rounded-2xl bg-white dark:bg-slate-900 border-2 flex flex-col items-center justify-center shadow-md transition-colors
                ${animPhase === 'sending-frame' || animPhase === 'retransmitting' ? 'border-blue-500 ring-4 ring-blue-50 dark:ring-blue-950/20' : 'border-slate-200 dark:border-slate-800'}
              `}>
                <span className="text-xl font-bold text-slate-700 dark:text-slate-300">S</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase">Sender</span>
              </div>
              <span className="text-[10px] font-bold text-slate-500">Seq: {frameSeq}</span>
            </div>

            {/* Cable Pathway */}
            <div className="absolute left-20 right-20 top-1/2 -translate-y-1/2 h-1 bg-slate-200 dark:bg-slate-800 rounded">
              
              {/* Dynamic Forward packet (Sender -> Receiver) */}
              {animPhase === 'sending-frame' && (
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-blue-500 text-white font-bold text-xs flex items-center justify-center shadow-lg shadow-blue-500/30 transition-all duration-75"
                  style={{ left: `calc(${packetPos}% - 16px)` }}
                >
                  F{frameSeq}
                </div>
              )}

              {/* Lost Frame event (explosive red flash) */}
              {animPhase === 'lost-frame-event' && (
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-rose-500 text-white font-bold text-[9px] flex items-center justify-center animate-ping"
                  style={{ left: `calc(50% - 20px)` }}
                >
                  COLLISION
                </div>
              )}

              {/* Dynamic Backward ACK packet (Receiver -> Sender) */}
              {animPhase === 'ack-back' && (
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-10 h-6 rounded bg-emerald-500 text-white font-bold text-[10px] flex items-center justify-center shadow-lg shadow-emerald-500/30 transition-all duration-75"
                  style={{ right: `calc(${ackPos}% - 20px)` }}
                >
                  ACK
                </div>
              )}

              {/* Lost ACK event */}
              {animPhase === 'lost-ack-event' && (
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-amber-500 text-white font-bold text-[9px] flex items-center justify-center animate-bounce"
                  style={{ right: `calc(50% - 16px)` }}
                >
                  LOST!
                </div>
              )}

            </div>

            {/* Receiver Node */}
            <div className="flex flex-col items-center gap-2 z-10">
              <div className={`w-16 h-16 rounded-2xl bg-white dark:bg-slate-900 border-2 flex flex-col items-center justify-center shadow-md transition-colors
                ${animPhase === 'ack-back' ? 'border-emerald-500 ring-4 ring-emerald-50 dark:ring-emerald-950/20' : 'border-slate-200 dark:border-slate-800'}
              `}>
                <span className="text-xl font-bold text-slate-700 dark:text-slate-300">R</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase">Receiver</span>
              </div>
              <span className="text-[10px] font-bold text-slate-500">Expects: {frameSeq}</span>
            </div>

          </div>

          {/* Bottom status line */}
          <div className="text-center z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm py-1.5 px-3 rounded-xl border border-slate-100 dark:border-slate-800/80">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Current state: {animPhase.replace('-', ' ').toUpperCase()}
            </span>
          </div>

        </div>

        {/* Live log Console */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Protocol Events Log</span>
            <button 
              onClick={() => setLogs(['Terminal cleared. Ready.'])}
              className="text-[10px] font-bold text-rose-500 hover:underline"
            >
              Clear Log
            </button>
          </div>
          <div className="h-28 overflow-y-auto bg-slate-950 rounded-xl p-3 font-mono text-[10px] text-emerald-400 space-y-1 scrollbar-thin scrollbar-thumb-slate-800">
            {logs.map((log, index) => (
              <div key={index} className="leading-relaxed">
                {log}
              </div>
            ))}
          </div>
        </div>

        {/* Action Triggers */}
        <div className="flex gap-2 justify-end">
          <button
            onClick={handleReset}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-950 text-xs font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-4 h-4" /> Reset
          </button>
          <button
            onClick={handleStart}
            disabled={isPlaying}
            className={`px-6 py-2.5 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 shadow-md transition-all
              ${isPlaying 
                ? 'bg-slate-400 dark:bg-slate-800 cursor-not-allowed shadow-none' 
                : 'bg-blue-600 hover:bg-blue-500 cursor-pointer shadow-blue-500/10'}
            `}
          >
            <Play className="w-4 h-4" /> {isPlaying ? 'Simulation Running...' : 'Start Simulation'}
          </button>
        </div>

      </div>
    </div>
  );
}


// ==========================================
// 2. SLIDING WINDOW SIMULATOR
// ==========================================
function SlidingWindowWidget() {
  const [windowSize, setWindowSize] = useState(3);
  const [currentStart, setCurrentStart] = useState(0); // Window index start (0-7)
  const [activeFrames, setActiveFrames] = useState<Array<'unsent' | 'in-transit' | 'received' | 'acknowledged'>>(() => 
    Array(12).fill('unsent')
  );
  const [logs, setLogs] = useState<string[]>(['Sliding Window sandbox configured.']);
  const [isSending, setIsSending] = useState(false);

  const appendLog = (msg: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString([], { hour12: false })}] ${msg}`]);
  };

  const handleSendBatch = () => {
    if (isSending) return;
    setIsSending(true);

    // Mark current window frames as 'in-transit'
    appendLog(`Sending batch of ${windowSize} pipeline frames starting at Index ${currentStart}...`);
    setActiveFrames(prev => {
      const copy = [...prev];
      for (let i = currentStart; i < currentStart + windowSize; i++) {
        if (i < 12) {
          copy[i] = 'in-transit';
        }
      }
      return copy;
    });

    // Animate to 'received'
    setTimeout(() => {
      setActiveFrames(prev => {
        const copy = [...prev];
        for (let i = currentStart; i < currentStart + windowSize; i++) {
          if (i < 12) {
            copy[i] = 'received';
          }
        }
        return copy;
      });
      appendLog(`Pipeline packets received. Sending dynamic acknowledgement bytes back...`);

      // Shifting windows
      setTimeout(() => {
        setActiveFrames(prev => {
          const copy = [...prev];
          for (let i = currentStart; i < currentStart + windowSize; i++) {
            if (i < 12) {
              copy[i] = 'acknowledged';
            }
          }
          return copy;
        });

        // Slide start pointer forward
        setCurrentStart(prev => {
          const next = Math.min(8, prev + windowSize);
          appendLog(`Acks arrived! Window slides forward from index ${prev} to ${next}.`);
          return next;
        });
        setIsSending(false);
      }, 1200);

    }, 1200);
  };

  const handleAckOne = () => {
    if (isSending || currentStart >= 8) return;
    setIsSending(true);

    const target = currentStart;
    appendLog(`Transmitting frame ${target}...`);
    
    setActiveFrames(prev => {
      const copy = [...prev];
      copy[target] = 'in-transit';
      return copy;
    });

    setTimeout(() => {
      setActiveFrames(prev => {
        const copy = [...prev];
        copy[target] = 'received';
        return copy;
      });

      setTimeout(() => {
        setActiveFrames(prev => {
          const copy = [...prev];
          copy[target] = 'acknowledged';
          return copy;
        });
        setCurrentStart(prev => {
          const next = Math.min(8, prev + 1);
          appendLog(`Ack received for frame ${target}. Window shifted by 1 unit.`);
          return next;
        });
        setIsSending(false);
      }, 800);
    }, 800);
  };

  const handleReset = () => {
    setCurrentStart(0);
    setActiveFrames(Array(12).fill('unsent'));
    setLogs(['Sliding Window link variables initialized. Ready.']);
    setIsSending(false);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-2xl overflow-hidden shadow-xs">
      <div className="p-6 md:p-8 space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
              Protocol Simulation #2
            </span>
            <h3 className="text-lg font-extrabold text-slate-800 dark:text-slate-100 mt-1">
              Sliding Window ARQ Flow Control
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Adjust the Window Size to observe pipelining throughput and window boundary shifting.
            </p>
          </div>

          {/* Window Size adjuster */}
          <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-100 dark:border-slate-850 self-start sm:self-center">
            <Settings className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Window Size:</span>
            <div className="flex items-center gap-1.5">
              {[2, 3, 4, 5].map((sz) => (
                <button
                  key={sz}
                  disabled={isSending}
                  onClick={() => {
                    setWindowSize(sz);
                    handleReset();
                    appendLog(`Configured window size boundary of W = ${sz}`);
                  }}
                  className={`w-7 h-7 rounded text-xs font-extrabold transition-all
                    ${windowSize === sz 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white dark:bg-slate-900 text-slate-600 hover:bg-slate-100'}
                  `}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sliding Buffer Visualiser */}
        <div className="p-6 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-850">
          
          <div className="space-y-4">
            {/* Top Indicator: Frame Buffer Index */}
            <div className="flex items-center justify-between px-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Frame Sequence Buffer (0 - 11)</span>
              <span className="text-[10px] font-bold text-blue-500">Current Window start: index {currentStart}</span>
            </div>

            {/* The Visual Slider Row */}
            <div className="relative p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex justify-between items-center overflow-x-auto min-w-max">
              
              {/* Sliding Box outline */}
              {currentStart < 12 && (
                <div 
                  className="absolute top-1 bottom-1 border-2 border-dashed border-blue-500 bg-blue-500/10 dark:bg-blue-500/5 rounded-xl transition-all duration-300"
                  style={{
                    left: `calc(${(currentStart / 12) * 100}% + 4px)`,
                    width: `calc(${(windowSize / 12) * 100}% - 8px)`
                  }}
                />
              )}

              {/* 12 Individual Frames */}
              {activeFrames.map((status, index) => {
                let frameStyle = "bg-slate-50 border-slate-200 text-slate-400";
                let statusLabel = "Unsent";

                if (status === 'in-transit') {
                  frameStyle = "bg-amber-100 text-amber-800 border-amber-300 animate-pulse";
                  statusLabel = "Sending";
                } else if (status === 'received') {
                  frameStyle = "bg-blue-100 text-blue-800 border-blue-300";
                  statusLabel = "Arrived";
                } else if (status === 'acknowledged') {
                  frameStyle = "bg-emerald-500 text-white border-transparent shadow-sm";
                  statusLabel = "ACK'd";
                }

                // Check if in active sliding window range
                const isInWindow = index >= currentStart && index < currentStart + windowSize;

                return (
                  <div 
                    key={index}
                    className={`relative w-12 h-16 rounded-xl border flex flex-col items-center justify-between p-2 font-mono transition-all z-10
                      ${frameStyle} ${isInWindow && status === 'unsent' ? 'ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-slate-950 font-bold' : ''}
                    `}
                  >
                    <span className="text-xs font-bold">{index}</span>
                    <span className="text-[7px] tracking-tight uppercase leading-none font-bold">
                      {statusLabel}
                    </span>
                    {isInWindow && status === 'unsent' && (
                      <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 text-[6px] font-bold px-1 rounded uppercase bg-blue-600 text-white">
                        Win
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Legend row */}
            <div className="flex flex-wrap gap-4 justify-center text-[10px] text-slate-500 font-semibold">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-slate-100 border border-slate-200 inline-block" /> Unsent Frame
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-amber-100 border border-amber-300 inline-block" /> In Transit
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-blue-100 border border-blue-300 inline-block" /> Received
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-emerald-500 inline-block" /> Acknowledged (ACK)
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded border-2 border-dashed border-blue-500 bg-blue-500/10 inline-block" /> Active Sliding Window
              </div>
            </div>

          </div>

        </div>

        {/* Real-world flow summary note */}
        <div className="flex items-start gap-3 p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40">
          <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">How Sliding Window ARQ maximizes Link Capacity:</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Unlike Stop-and-Wait which stays idle waiting for a single ACK, the sliding window pipeline lets us continuously pour up to <strong>{windowSize} packets</strong> onto the cable. This ensures the physical link bandwidth is fully saturated. Once the ACK for frame {currentStart} returns, the left boundary slides forward, opening up slots to transmit higher sequence packets.
            </p>
          </div>
        </div>

        {/* Log feed */}
        <div className="h-20 overflow-y-auto bg-slate-950 rounded-xl p-3 font-mono text-[9px] text-emerald-400 space-y-1 scrollbar-thin">
          {logs.map((log, index) => (
            <div key={index}>{log}</div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex gap-2 justify-end">
          <button
            onClick={handleReset}
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-950 text-xs font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Clear Buffer
          </button>
          <button
            onClick={handleAckOne}
            disabled={isSending || currentStart >= 8}
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 text-xs font-bold text-slate-800 dark:text-slate-300 flex items-center gap-1 disabled:opacity-50 transition-colors"
          >
            Send Frame {currentStart} <ChevronRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleSendBatch}
            disabled={isSending || currentStart >= 8}
            className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md flex items-center gap-1.5 disabled:opacity-50 transition-colors"
          >
            <Play className="w-3.5 h-3.5" /> Send Entire Window ({windowSize})
          </button>
        </div>

      </div>
    </div>
  );
}
