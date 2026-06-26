/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Monitor, ShieldAlert, Cpu, Sparkles, Radio, Watch, CircleDot } from 'lucide-react';

export default function MultipleAccessLessonWidgets() {
  return (
    <div className="space-y-12">
      <RandomAccessCollisionSimulator />
      <ControlledAccessSimulator />
      <ChannelizationVisualizer />
    </div>
  );
}

// ==========================================
// 1. RANDOM ACCESS COLLISION SIMULATOR
// ==========================================
function RandomAccessCollisionSimulator() {
  const [protocol, setProtocol] = useState<'pure' | 'slotted' | 'csma-cd' | 'csma-ca'>('pure');
  const [isPlaying, setIsPlaying] = useState(false);
  const [logs, setLogs] = useState<string[]>(['Select protocol and click "Play Simulation".']);
  
  // Animation positions (0 to 100)
  const [pc1Pos, setPc1Pos] = useState(0);
  const [pc3Pos, setPc3Pos] = useState(0);
  const [pc4Pos, setPc4Pos] = useState(0); // For CSMA/CA RTS

  const [collisionActive, setCollisionActive] = useState(false);
  const [backoff1, setBackoff1] = useState(0);
  const [backoff3, setBackoff3] = useState(0);

  // States
  const [pc1State, setPc1State] = useState<'idle' | 'sensing' | 'sending' | 'collision' | 'backoff' | 'success'>('idle');
  const [pc3State, setPc3State] = useState<'idle' | 'sensing' | 'sending' | 'collision' | 'backoff' | 'success'>('idle');
  const [pc4State, setPc4State] = useState<'idle' | 'rts' | 'cts' | 'sending' | 'success'>('idle');

  const appendLog = (msg: string) => {
    setLogs(prev => [...prev, `[Medium] ${msg}`]);
  };

  const handlePlay = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    setCollisionActive(false);
    setPc1Pos(0);
    setPc3Pos(0);
    setPc4Pos(0);
    setBackoff1(0);
    setBackoff3(0);
    setLogs([]);

    if (protocol === 'pure') {
      appendLog('Pure ALOHA: PCs transmit instantly when they have data. No carrier sensing.');
      setPc1State('sending');
      setPc3State('sending');
      appendLog('PC 1 and PC 3 start sending frames simultaneously...');

      // Animate collision
      let p = 0;
      const interval = setInterval(() => {
        p += 4;
        setPc1Pos(p);
        setPc3Pos(p);

        if (p >= 50 && p < 54) {
          setCollisionActive(true);
          setPc1State('collision');
          setPc3State('collision');
          appendLog('[COLLISION] COLLISION DETECTED! Packets collided in the physical wire center (Overlapping signals create noise).');
        }

        if (p >= 100) {
          clearInterval(interval);
          setCollisionActive(false);
          // Set backoff timers
          setPc1State('backoff');
          setPc3State('backoff');
          setBackoff1(3.2);
          setBackoff3(1.8);
          appendLog('Sender PCs wait random Exponential Backoff times to avoid another instant collision.');

          // Countdown backoffs
          let cd = 0;
          const cdInterval = setInterval(() => {
            cd++;
            setBackoff1(prev => Math.max(0, parseFloat((prev - 0.2).toFixed(1))));
            setBackoff3(prev => Math.max(0, parseFloat((prev - 0.2).toFixed(1))));

            if (cd >= 16) {
              clearInterval(cdInterval);
              // Retry PC3 (smaller backoff succeeds first)
              setPc3State('sending');
              setPc3Pos(0);
              appendLog('PC 3 backoff expired first. Re-sending Frame...');
              
              let p2 = 0;
              const successInterval = setInterval(() => {
                p2 += 5;
                setPc3Pos(p2);
                if (p2 >= 100) {
                  clearInterval(successInterval);
                  setPc3State('success');
                  setPc1State('idle');
                  setIsPlaying(false);
                  appendLog('[SUCCESS] PC 3 packet successfully traversed the link without collision.');
                }
              }, 40);
            }
          }, 200);
        }
      }, 40);
    } 
    else if (protocol === 'slotted') {
      appendLog('Slotted ALOHA: Transmissions restricted to strict slot borders. Vulnerable window halved.');
      appendLog('Time Slot boundary reached! Both stations attempt sending...');
      setPc1State('sending');
      setPc3State('sending');

      let p = 0;
      const interval = setInterval(() => {
        p += 5;
        setPc1Pos(p);
        setPc3Pos(p);

        if (p >= 50 && p < 55) {
          setCollisionActive(true);
          setPc1State('collision');
          setPc3State('collision');
          appendLog('[COLLISION] COLLISION! Both nodes sent packets in the exact same slot. Data destroyed.');
        }

        if (p >= 100) {
          clearInterval(interval);
          setCollisionActive(false);
          setPc1State('backoff');
          setPc3State('backoff');
          setBackoff1(2.0);
          setBackoff3(4.0);

          let cd = 0;
          const cdInterval = setInterval(() => {
            cd++;
            setBackoff1(prev => Math.max(0, parseFloat((prev - 0.5).toFixed(1))));
            setBackoff3(prev => Math.max(0, parseFloat((prev - 0.5).toFixed(1))));

            if (cd >= 4) {
              clearInterval(cdInterval);
              appendLog('Next Time Slot border reached! PC 1 backoff expired, transmitting frame...');
              setPc1State('sending');
              setPc1Pos(0);

              let p2 = 0;
              const successInterval = setInterval(() => {
                p2 += 5;
                setPc1Pos(p2);
                if (p2 >= 100) {
                  clearInterval(successInterval);
                  setPc1State('success');
                  setPc3State('idle');
                  setIsPlaying(false);
                  appendLog('[SUCCESS] PC 1 completed transmission cleanly in Time Slot 2.');
                }
              }, 40);
            }
          }, 500);
        }
      }, 40);
    } 
    else if (protocol === 'csma-cd') {
      appendLog('CSMA/CD: Carrier Sense Multiple Access with Collision Detection. "Listen before talk".');
      setPc1State('sensing');
      appendLog('PC 1 senses the carrier... silent. PC 1 starts transmitting.');
      
      setTimeout(() => {
        setPc1State('sending');
        let p = 0;
        const interval = setInterval(() => {
          p += 4;
          setPc1Pos(p);

          if (p === 20) {
            setPc3State('sensing');
            appendLog('PC 3 also wants to talk, senses wire. Since PC 1 wave hasn\'t reached PC 3 yet, it hears silence & starts transmitting!');
            setPc3State('sending');
          }

          if (p >= 20) {
            setPc3Pos(prev => prev + 5);
          }

          if (p >= 48 && p < 52) {
            setCollisionActive(true);
            setPc1State('collision');
            setPc3State('collision');
            appendLog('[COLLISION] Collision! Stations immediately detect raw voltage mismatch on copper backbone wire.');
            appendLog('Sender stations immediately cease transmission and broadcast high-energy JAM signals!');
          }

          if (p >= 90) {
            clearInterval(interval);
            setCollisionActive(false);
            setPc1State('backoff');
            setPc3State('backoff');
            setBackoff1(1.5);
            setBackoff3(3.0);
            setIsPlaying(false);
            appendLog('Both stations backoff. Collision resolved early due to CD detection cessation.');
          }
        }, 50);
      }, 600);
    } 
    else if (protocol === 'csma-ca') {
      appendLog('CSMA/CA: Collision Avoidance for wireless (Wi-Fi). 4-way RTS/CTS Handshake.');
      setPc4State('rts');
      appendLog('PC 4 senses wireless medium. Medium idle. Transmitting RTS (Request to Send)...');

      let p = 0;
      const rtsInterval = setInterval(() => {
        p += 5;
        setPc4Pos(p);
        if (p >= 100) {
          clearInterval(rtsInterval);
          setPc4State('cts');
          setPc1State('idle');
          setPc3State('idle');
          appendLog('Access Point receives RTS. Sending back CTS (Clear to Send) block. Other nodes hear CTS & remain silent.');

          setTimeout(() => {
            setPc4State('sending');
            setPc4Pos(100);
            appendLog('PC 4 receives CTS. Safe virtual channel secured. Streaming massive wireless payload safely...');

            let p2 = 100;
            const flowInterval = setInterval(() => {
              p2 -= 5;
              setPc4Pos(p2);
              if (p2 <= 0) {
                clearInterval(flowInterval);
                setPc4State('success');
                setIsPlaying(false);
                appendLog('[SUCCESS] Wireless transmission complete without any packet collisions.');
              }
            }, 30);

          }, 1000);
        }
      }, 40);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCollisionActive(false);
    setPc1Pos(0);
    setPc3Pos(0);
    setPc4Pos(0);
    setBackoff1(0);
    setBackoff3(0);
    setPc1State('idle');
    setPc3State('idle');
    setPc4State('idle');
    setLogs(['Simulator variables cleared. Ready.']);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-lg p-6 md:p-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <span className="text-[10px] bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
            Media Access Control (MAC)
          </span>
          <h3 className="text-lg font-extrabold text-slate-800 dark:text-slate-100 mt-1">
            Random Access Collision Sandbox
          </h3>
          <p className="text-xs text-slate-500">
            Compare collisions, sensing thresholds, jam sequences, and backoff wait times on shared media channels.
          </p>
        </div>

        {/* Protocol Selector */}
        <div className="flex flex-wrap bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800 gap-1">
          {['pure', 'slotted', 'csma-cd', 'csma-ca'].map((p) => (
            <button
              key={p}
              disabled={isPlaying}
              onClick={() => { setProtocol(p as any); handleReset(); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all uppercase
                ${protocol === p 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'}
                ${isPlaying ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              {p.replace('-', '/')}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Bus Stage */}
      <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-850 relative min-h-[220px] flex flex-col justify-between">
        
        {/* Slotted columns if slotted active */}
        {protocol === 'slotted' && (
          <div className="absolute inset-0 flex justify-around pointer-events-none opacity-20">
            <div className="border-r-2 border-dashed border-blue-500 h-full w-0" />
            <div className="border-r-2 border-dashed border-blue-500 h-full w-0" />
            <div className="border-r-2 border-dashed border-blue-500 h-full w-0" />
          </div>
        )}

        {/* Nodes Grid */}
        <div className="flex justify-between items-center px-4 md:px-12 pt-4">
          
          {/* PC 1 (Left Sender) */}
          <div className="flex flex-col items-center gap-1.5 z-10">
            <div className={`w-12 h-12 rounded-xl border-2 flex flex-col items-center justify-center bg-white dark:bg-slate-900 transition-all
              ${pc1State === 'sending' ? 'border-blue-500 scale-105 shadow-md shadow-blue-500/10' : ''}
              ${pc1State === 'collision' ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/20' : ''}
              ${pc1State === 'backoff' ? 'border-amber-500' : ''}
              ${pc1State === 'success' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20' : 'border-slate-200 dark:border-slate-800'}
            `}>
              <Monitor className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              <span className="text-[8px] font-bold">PC 1</span>
            </div>
            {pc1State === 'backoff' && (
              <span className="text-[8px] font-bold text-amber-500 flex items-center gap-0.5 animate-pulse">
                <Watch className="w-2.5 h-2.5" /> Backoff: {backoff1}s
              </span>
            )}
            {pc1State === 'sensing' && (
              <span className="text-[8px] font-semibold text-blue-500 animate-pulse">Sensing Carrier...</span>
            )}
            {pc1State === 'success' && (
              <span className="text-[8px] font-bold text-emerald-500">ACK OK!</span>
            )}
          </div>

          {/* Access Point Node in center (for CA RTS/CTS) */}
          {protocol === 'csma-ca' && (
            <div className="flex flex-col items-center gap-1.5 z-10">
              <div className={`w-12 h-12 rounded-full border-2 bg-indigo-50 dark:bg-indigo-950/30 flex items-center justify-center border-indigo-500 shadow-md`}>
                <Radio className="w-5 h-5 text-indigo-500 animate-bounce" />
              </div>
              <span className="text-[8px] font-bold text-indigo-500">Access Point</span>
            </div>
          )}

          {/* PC 3 (Right Sender) */}
          <div className="flex flex-col items-center gap-1.5 z-10">
            <div className={`w-12 h-12 rounded-xl border-2 flex flex-col items-center justify-center bg-white dark:bg-slate-900 transition-all
              ${pc3State === 'sending' ? 'border-blue-500 scale-105 shadow-md shadow-blue-500/10' : ''}
              ${pc3State === 'collision' ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/20' : ''}
              ${pc3State === 'backoff' ? 'border-amber-500' : ''}
              ${pc3State === 'success' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20' : 'border-slate-200 dark:border-slate-800'}
            `}>
              <Monitor className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              <span className="text-[8px] font-bold">PC 3</span>
            </div>
            {pc3State === 'backoff' && (
              <span className="text-[8px] font-bold text-amber-500 flex items-center gap-0.5 animate-pulse">
                <Watch className="w-2.5 h-2.5" /> Backoff: {backoff3}s
              </span>
            )}
            {pc3State === 'sensing' && (
              <span className="text-[8px] font-semibold text-blue-500 animate-pulse">Sensing Carrier...</span>
            )}
            {pc3State === 'success' && (
              <span className="text-[8px] font-bold text-emerald-500">ACK OK!</span>
            )}
          </div>

          {/* Wireless PC 4 (Shown for CSMA/CA) */}
          {protocol === 'csma-ca' && (
            <div className="flex flex-col items-center gap-1.5 z-10">
              <div className={`w-12 h-12 rounded-xl border-2 flex flex-col items-center justify-center bg-white dark:bg-slate-900 transition-all
                ${pc4State === 'rts' || pc4State === 'sending' ? 'border-blue-500 scale-105 shadow-md shadow-blue-500/10' : ''}
                ${pc4State === 'success' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20' : 'border-slate-200 dark:border-slate-800'}
              `}>
                <Monitor className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                <span className="text-[8px] font-bold">PC 4 (Wi-Fi)</span>
              </div>
              {pc4State === 'rts' && <span className="text-[8px] font-bold text-blue-500">Sending RTS</span>}
              {pc4State === 'cts' && <span className="text-[8px] font-bold text-amber-500">CTS Secured!</span>}
              {pc4State === 'success' && <span className="text-[8px] font-bold text-emerald-500">Success!</span>}
            </div>
          )}

        </div>

        {/* Physical Bus Backbone */}
        <div className="h-20 flex items-center justify-between relative px-10 md:px-20">
          
          <div className="absolute left-10 right-10 h-1 bg-slate-300 dark:bg-slate-800 rounded">
            
            {/* PC 1 Wave traveling right */}
            {pc1State === 'sending' && (
              <div 
                className="absolute w-4 h-4 rounded-full bg-blue-500 animate-ping"
                style={{ left: `${pc1Pos}%` }}
              />
            )}

            {/* PC 3 Wave traveling left */}
            {pc3State === 'sending' && (
              <div 
                className="absolute w-4 h-4 rounded-full bg-blue-500 animate-ping"
                style={{ right: `${pc3Pos}%` }}
              />
            )}

            {/* PC 4 RTS packet (Wireless) */}
            {pc4State === 'rts' && (
              <div 
                className="absolute w-3 h-3 rounded-full bg-blue-500"
                style={{ right: `${100 - pc4Pos}%` }}
              />
            )}

            {/* Collision burst */}
            {collisionActive && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 rounded-full bg-rose-500 text-white font-extrabold text-[9px] shadow-lg shadow-rose-500/30 flex items-center gap-1 animate-bounce z-20">
                <ShieldAlert className="w-3 h-3" /> COLLISION BLAST
              </div>
            )}

          </div>

        </div>

        {/* Legend */}
        <div className="flex gap-4 justify-center text-[9px] text-slate-400 font-bold">
          <div className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-white border border-slate-200" /> Idle</div>
          <div className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-blue-500" /> Transmitting</div>
          <div className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-rose-500 animate-pulse" /> Collision</div>
          <div className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-amber-500" /> Backoff waiting</div>
        </div>

      </div>

      {/* Logs and Action Panel */}
      <div className="h-24 overflow-y-auto bg-slate-950 rounded-xl p-3 font-mono text-[9px] text-emerald-400 space-y-1">
        {logs.map((log, index) => (
          <div key={index} className="leading-relaxed">{log}</div>
        ))}
      </div>

      <div className="flex justify-end gap-2">
        <button
          onClick={handleReset}
          className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-950 text-xs font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1.5 transition-colors"
        >
          <RotateCcw className="w-4 h-4" /> Reset
        </button>
        <button
          onClick={handlePlay}
          disabled={isPlaying}
          className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md flex items-center gap-1.5 disabled:opacity-50 transition-colors"
        >
          <Play className="w-4 h-4" /> Play Collision Simulation
        </button>
      </div>

    </div>
  );
}

// ==========================================
// 2. CONTROLLED ACCESS RING SIMULATOR
// ==========================================
function ControlledAccessSimulator() {
  const [mode, setMode] = useState<'token-passing' | 'polling'>('token-passing');
  const [activeTokenIdx, setActiveTokenIdx] = useState(0); // 0 to 4
  const [isSimulating, setIsSimulating] = useState(false);
  const [stationHasData, setStationHasData] = useState<number | null>(2); // Station 2 wants to transmit
  const [logs, setLogs] = useState<string[]>(['Token Passing active. Select a PC to load buffer.']);

  const appendLog = (msg: string) => {
    setLogs(prev => [...prev, `[Access] ${msg}`]);
  };

  const ringStations = [0, 1, 2, 3, 4];

  // Token rotation loop
  useEffect(() => {
    if (mode !== 'token-passing' || !isSimulating) return;

    const interval = setInterval(() => {
      setActiveTokenIdx(prev => {
        const next = (prev + 1) % 5;
        
        if (next === stationHasData) {
          clearInterval(interval);
          appendLog(`[TOKEN] Token arrived at Station ${next}. Data buffer loaded! Transmitting frame...`);
          
          setTimeout(() => {
            appendLog(`[SUCCESS] Frame successfully processed and delivered by ring circle. Releasing Token...`);
            setStationHasData(null);
            
            // Resume token passing after frame completes
            setTimeout(() => {
              setIsSimulating(true);
            }, 600);

          }, 1500);

          return next;
        }

        appendLog(`Passing golden Token to Station ${next}...`);
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isSimulating, mode, stationHasData]);

  // Polling loop
  useEffect(() => {
    if (mode !== 'polling' || !isSimulating) return;

    let idx = 0;
    const interval = setInterval(() => {
      if (idx > 4) {
        clearInterval(interval);
        setIsSimulating(false);
        appendLog(`Polling round complete.`);
        return;
      }

      appendLog(`Master Hub polls Station ${idx}: "Do you have frames to send?"`);
      setActiveTokenIdx(idx);

      if (idx === stationHasData) {
        clearInterval(interval);
        appendLog(`Station ${idx} responds: YES! Sending data frame to Master...`);
        
        setTimeout(() => {
          appendLog(`Master confirms receipt. Resuming remaining polls...`);
          setStationHasData(null);
          idx++;
          
          setTimeout(() => {
            setIsSimulating(true);
          }, 800);
        }, 1200);
      } else {
        appendLog(`Station ${idx} responds: "No data."`);
        idx++;
      }
    }, 1200);

    return () => clearInterval(interval);
  }, [isSimulating, mode, stationHasData]);

  const handleStart = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setLogs([`Starting ${mode === 'token-passing' ? 'Ring Rotation' : 'Sequential Master Poll'}`]);
  };

  const handleStop = () => {
    setIsSimulating(false);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-lg p-6 md:p-8 space-y-6">
      
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <span className="text-[10px] bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
            Controlled Collision-Free Access
          </span>
          <h3 className="text-lg font-extrabold text-slate-800 dark:text-slate-100 mt-1">
            Token Passing & Polling Ring
          </h3>
          <p className="text-xs text-slate-500">
            Learn how deterministic collision-free protocols allocate transmission rights logically.
          </p>
        </div>

        {/* Toggle Mode */}
        <div className="flex bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800 self-start sm:self-center">
          <button
            onClick={() => { setMode('token-passing'); handleStop(); setStationHasData(2); }}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${mode === 'token-passing' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Token Passing Ring
          </button>
          <button
            onClick={() => { setMode('polling'); handleStop(); setStationHasData(3); }}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${mode === 'polling' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Master Polling
          </button>
        </div>
      </div>

      {/* Visual Ring Stage */}
      <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-850 relative h-64 flex items-center justify-center">
        
        {/* Token passing Circle map */}
        {mode === 'token-passing' ? (
          <div className="relative w-44 h-44 border-4 border-dashed border-slate-200 dark:border-slate-800 rounded-full flex items-center justify-center">
            
            {/* Station circular positions */}
            {ringStations.map((node) => {
              // Position on circle using simple trig
              const angle = (node * 2 * Math.PI) / 5 - Math.PI / 2;
              const x = Math.cos(angle) * 75;
              const y = Math.sin(angle) * 75;

              const isTokenHere = activeTokenIdx === node;
              const isLoaded = stationHasData === node;

              return (
                <div
                  key={node}
                  onClick={() => !isSimulating && setStationHasData(node)}
                  className={`absolute w-12 h-12 rounded-xl border-2 flex flex-col items-center justify-center bg-white dark:bg-slate-900 shadow cursor-pointer transition-all
                    ${isTokenHere ? 'border-yellow-500 scale-105 ring-4 ring-yellow-500/20' : 'border-slate-200 dark:border-slate-800'}
                  `}
                  style={{ transform: `translate(${x}px, ${y}px)` }}
                  title="Click to queue data packet"
                >
                  <span className="text-[10px] font-mono font-bold">PC {node}</span>
                  {isLoaded && <span className="text-[7px] font-bold text-red-500 animate-pulse">Buffer</span>}
                  {isTokenHere && <span className="text-[7px] font-bold text-yellow-500 uppercase">Token</span>}
                </div>
              );
            })}

            {/* Moving central token indicator */}
            <div className="w-12 h-12 rounded-full bg-yellow-500/10 border-2 border-yellow-500 flex items-center justify-center text-yellow-600 dark:text-yellow-400 font-extrabold text-xs animate-spin-slow">
              TOKEN
            </div>

          </div>
        ) : (
          /* Polling star map */
          <div className="relative w-44 h-44 flex items-center justify-center">
            
            {/* Master Center node */}
            <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white border border-transparent shadow flex flex-col items-center justify-center z-10">
              <Cpu className="w-5 h-5 text-indigo-100" />
              <span className="text-[8px] font-extrabold uppercase">Master Hub</span>
            </div>

            {/* Slave satellites */}
            {[0, 1, 2, 3].map((node) => {
              const angle = (node * 2 * Math.PI) / 4;
              const x = Math.cos(angle) * 70;
              const y = Math.sin(angle) * 70;

              const isPolled = activeTokenIdx === node;
              const isLoaded = stationHasData === node;

              return (
                <div
                  key={node}
                  onClick={() => !isSimulating && setStationHasData(node)}
                  className={`absolute w-10 h-10 rounded-xl border-2 flex flex-col items-center justify-center bg-white dark:bg-slate-900 shadow cursor-pointer transition-all
                    ${isPolled ? 'border-indigo-500 ring-4 ring-indigo-500/20' : 'border-slate-200 dark:border-slate-800'}
                  `}
                  style={{ transform: `translate(${x}px, ${y}px)` }}
                >
                  <span className="text-[8px] font-bold">Node {node}</span>
                  {isLoaded && <span className="text-[6px] font-bold text-red-500">Queued</span>}
                </div>
              );
            })}

          </div>
        )}

      </div>

      {/* Logs */}
      <div className="h-20 overflow-y-auto bg-slate-950 rounded-xl p-3 font-mono text-[9px] text-emerald-400 space-y-1">
        {logs.map((log, index) => (
          <div key={index}>{log}</div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex justify-end gap-2">
        <button
          onClick={handleStop}
          className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-850 hover:bg-slate-100 text-xs font-bold text-slate-600 dark:text-slate-400"
        >
          Stop Simulation
        </button>
        <button
          onClick={handleStart}
          className="px-6 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md"
        >
          Start Access Loop
        </button>
      </div>

    </div>
  );
}

// ==========================================
// 3. CHANNELIZATION SPECTRAL VISUALIZER
// ==========================================
function ChannelizationVisualizer() {
  const [activeMode, setActiveMode] = useState<'fdma' | 'tdma' | 'cdma'>('fdma');

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-lg p-6 md:p-8 space-y-6">
      
      <div>
        <span className="text-[10px] bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
          Spectral Multiplexing Channelization
        </span>
        <h3 className="text-lg font-extrabold text-slate-800 dark:text-slate-100 mt-1">
          Frequency, Time, and Code Slices
        </h3>
        <p className="text-xs text-slate-500">
          Observe how the same physical medium bandwidth is split under FDMA, TDMA, and CDMA configurations.
        </p>
      </div>

      {/* Mode selectors */}
      <div className="grid grid-cols-3 gap-2">
        {(['fdma', 'tdma', 'cdma'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setActiveMode(m)}
            className={`py-3 rounded-2xl border text-center transition-all cursor-pointer
              ${activeMode === m 
                ? 'bg-indigo-600 text-white border-transparent shadow-md font-bold' 
                : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100'}
            `}
          >
            <span className="text-xs uppercase font-extrabold tracking-wider">{m}</span>
            <span className="block text-[8px] opacity-75 font-normal">
              {m === 'fdma' ? 'Frequency Division' : m === 'tdma' ? 'Time Division' : 'Code Division'}
            </span>
          </button>
        ))}
      </div>

      {/* Visual representations */}
      <div className="p-6 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-850 h-56 flex flex-col justify-between overflow-hidden">
        
        {activeMode === 'fdma' && (
          <div className="flex-1 flex flex-col justify-around h-full space-y-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase">FDMA: Channel divided into non-overlapping frequency bands</p>
            {[
              { label: 'Freq Channel 1 (User A)', color: 'bg-rose-500 shadow-rose-500/20' },
              { label: 'Freq Channel 2 (User B)', color: 'bg-blue-500 shadow-blue-500/20' },
              { label: 'Freq Channel 3 (User C)', color: 'bg-emerald-500 shadow-emerald-500/20' },
              { label: 'Freq Channel 4 (User D)', color: 'bg-purple-500 shadow-purple-500/20' },
            ].map((band, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="w-24 text-[8px] font-bold text-slate-500 truncate">{band.label}</span>
                <div className="flex-1 h-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-full relative overflow-hidden">
                  {/* Flowing horizontal waves */}
                  <div className={`absolute top-0 bottom-0 left-0 w-3/4 rounded-full ${band.color} animate-pulse`} />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeMode === 'tdma' && (
          <div className="flex-1 flex flex-col justify-between h-full">
            <p className="text-[10px] font-bold text-slate-400 uppercase">TDMA: Users share frequency but alternate on dedicated time slots</p>
            
            <div className="flex-1 flex items-center justify-around gap-2 px-4 mt-2">
              {[
                { slot: 'Slot 1: User A', active: true, color: 'bg-rose-500 text-white' },
                { slot: 'Slot 2: User B', active: false, color: 'bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400' },
                { slot: 'Slot 3: User C', active: false, color: 'bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400' },
                { slot: 'Slot 4: User D', active: false, color: 'bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400' },
              ].map((t, idx) => (
                <div key={idx} className={`w-24 h-24 rounded-2xl flex flex-col items-center justify-center p-2 text-center border transition-all ${t.color} ${t.active ? 'scale-105 shadow-md shadow-rose-500/10 border-rose-400' : ''}`}>
                  <span className="text-[9px] font-bold uppercase">Slot {idx+1}</span>
                  <span className="text-[8px] font-mono mt-1 block">{t.active ? '● TRANSMITTING' : 'IDLE'}</span>
                  <span className="text-[7px] opacity-75 mt-0.5">{idx*25}ms - {(idx+1)*25}ms</span>
                </div>
              ))}
            </div>

            <p className="text-[8px] text-slate-400 text-center animate-pulse mt-2">Time frames shift sequentially (Slot 1 -&gt; Slot 2 -&gt; Slot 3...)</p>
          </div>
        )}

        {activeMode === 'cdma' && (
          <div className="flex-1 flex flex-col justify-around h-full">
            <p className="text-[10px] font-bold text-slate-400 uppercase">CDMA: All share same frequency/time; modulations are multiplied by unique orthogonal codes</p>
            
            <div className="grid grid-cols-4 gap-2 mt-2">
              {[
                { name: 'User A', code: '[+1, -1, +1, -1]', wave: 'text-rose-500 bg-rose-50 dark:bg-rose-950/20' },
                { name: 'User B', code: '[+1, +1, -1, -1]', wave: 'text-blue-500 bg-blue-50 dark:bg-blue-950/20' },
                { name: 'User C', code: '[+1, -1, -1, +1]', wave: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20' },
                { name: 'User D', code: '[+1, +1, +1, +1]', wave: 'text-purple-500 bg-purple-50 dark:bg-purple-950/20' },
              ].map((user, idx) => (
                <div key={idx} className={`p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 text-center ${user.wave}`}>
                  <span className="text-[9px] font-bold block">{user.name}</span>
                  <span className="text-[8px] font-mono opacity-80 block mt-1">Chip Spreading Code:</span>
                  <span className="text-[9px] font-mono font-bold">{user.code}</span>
                </div>
              ))}
            </div>

            <div className="p-2 rounded-xl bg-slate-900 border border-slate-850 text-center text-indigo-400 font-mono text-[9px] font-bold uppercase flex items-center justify-center gap-1.5 animate-pulse mt-2">
              <Sparkles className="w-3.5 h-3.5 text-yellow-500" /> Transmitting composite vector: S = (A*C_a) + (B*C_b) + (C*C_c)...
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
