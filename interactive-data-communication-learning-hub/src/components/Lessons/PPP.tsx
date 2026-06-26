/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, Play, Key, ArrowRight, RefreshCw, Layers } from 'lucide-react';

export default function PPPLessonWidgets() {
  return (
    <div className="space-y-12">
      <FrameBreakdownWidget />
      <AuthHandshakeWidget />
      <ComparisonTableWidget />
    </div>
  );
}

// ==========================================
// 1. INTERACTIVE FRAME BREAKDOWN
// ==========================================
function FrameBreakdownWidget() {
  const [frameType, setFrameType] = useState<'ppp' | 'hdlc'>('ppp');
  const [activeField, setActiveField] = useState<string | null>('flag1');

  const pppFields = [
    { id: 'flag1', name: 'Flag', size: '1 byte', binary: '01111110', desc: 'Indicates the absolute beginning of the frame. Establishes node synchronization.', color: 'bg-rose-500/10 border-rose-500 hover:bg-rose-500/20 text-rose-700 dark:text-rose-400' },
    { id: 'addr', name: 'Address', size: '1 byte', binary: '11111111', desc: 'Broadcast address (0xFF). Since PPP is a direct point-to-point physical connection, individual addressing is unnecessary.', color: 'bg-blue-500/10 border-blue-500 hover:bg-blue-500/20 text-blue-700 dark:text-blue-400' },
    { id: 'ctrl', name: 'Control', size: '1 byte', binary: '00000011', desc: 'Default value (0x03) indicating unnumbered user data. Negates flow control responsibilities at this point.', color: 'bg-emerald-500/10 border-emerald-500 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400' },
    { id: 'proto', name: 'Protocol', size: '2 bytes', binary: '00000000 00100001', desc: 'Identifies the network-layer protocol carried in the payload (e.g. 0x0021 for IPv4, 0x0057 for IPv6, 0x8021 for IPCP).', color: 'bg-amber-500/10 border-amber-500 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400' },
    { id: 'payload', name: 'Payload (Data)', size: 'Variable', binary: 'User data bits...', desc: 'Contains the actual encapsulated network-layer packet (datagram) being transported. Default size is 1500 bytes (MTU).', color: 'bg-indigo-500/10 border-indigo-500 hover:bg-indigo-500/20 text-indigo-700 dark:text-indigo-400' },
    { id: 'fcs', name: 'FCS (Checksum)', size: '2 or 4 bytes', binary: '16-bit / 32-bit CRC', desc: 'Frame Check Sequence. Appended Cyclic Redundancy Check (CRC) remainder used to verify data bit integrity.', color: 'bg-violet-500/10 border-violet-500 hover:bg-violet-500/20 text-violet-700 dark:text-violet-400' },
    { id: 'flag2', name: 'Flag', size: '1 byte', binary: '01111110', desc: 'Indicates the absolute termination of the frame. Prepares line for subsequent transmission synchronization.', color: 'bg-rose-500/10 border-rose-500 hover:bg-rose-500/20 text-rose-700 dark:text-rose-400' }
  ];

  const hdlcFields = [
    { id: 'flag1', name: 'Flag', size: '1 byte', binary: '01111110', desc: 'Establishes frame boundaries. Bit stuffing is performed to prevent data from mimicking this Flag.', color: 'bg-rose-500/10 border-rose-500 hover:bg-rose-500/20 text-rose-700 dark:text-rose-400' },
    { id: 'addr', name: 'Address', size: '1 byte', binary: 'Dynamic byte', desc: 'Represents secondary station addresses on multi-point links. On point-to-point networks, it defaults to broadcast.', color: 'bg-blue-500/10 border-blue-500 hover:bg-blue-500/20 text-blue-700 dark:text-blue-400' },
    { id: 'ctrl', name: 'Control', size: '1 or 2 bytes', binary: 'Format dependent', desc: 'Specifies frame roles. Can be I-Frame (User Data), S-Frame (Supervisory ACKs/NAKs), or U-Frame (Unnumbered link setup).', color: 'bg-emerald-500/10 border-emerald-500 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400' },
    { id: 'payload', name: 'Information', size: 'Variable', binary: 'User data bits...', desc: 'The net payload containing network-layer control information or raw client packets.', color: 'bg-indigo-500/10 border-indigo-500 hover:bg-indigo-500/20 text-indigo-700 dark:text-indigo-400' },
    { id: 'fcs', name: 'FCS (Checksum)', size: '2 bytes', binary: '16-bit CRC', desc: 'Frame Check Sequence representing the CRC division residue. If receiving checksum deviates, frame is dropped.', color: 'bg-violet-500/10 border-violet-500 hover:bg-violet-500/20 text-violet-700 dark:text-violet-400' },
    { id: 'flag2', name: 'Flag', size: '1 byte', binary: '01111110', desc: 'Concludes the HDLC frame. Serves to release physical link focus back to carrier sensing.', color: 'bg-rose-500/10 border-rose-500 hover:bg-rose-500/20 text-rose-700 dark:text-rose-400' }
  ];

  const fields = frameType === 'ppp' ? pppFields : hdlcFields;
  const activeDetail = fields.find(f => f.id === activeField) || fields[0];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-2xl overflow-hidden shadow-xs p-6 md:p-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <span className="text-[10px] bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
            Point-to-Point Frame Structure
          </span>
          <h3 className="text-lg font-extrabold text-slate-800 dark:text-slate-100 mt-1">
            Interactive Frame Format Inspector
          </h3>
          <p className="text-xs text-slate-500">
            Compare the byte fields of PPP and HDLC. Click on individual blocks to inspect headers.
          </p>
        </div>

        {/* Frame Toggle */}
        <div className="flex bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800 self-start sm:self-center">
          <button
            onClick={() => { setFrameType('ppp'); setActiveField('flag1'); }}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${frameType === 'ppp' ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            PPP Frame Format
          </button>
          <button
            onClick={() => { setFrameType('hdlc'); setActiveField('flag1'); }}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${frameType === 'hdlc' ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            HDLC Frame Format
          </button>
        </div>
      </div>

      {/* Interactive Blocks Layout */}
      <div className="space-y-3">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide px-1">
          Visual Byte Stream Map:
        </div>
        
        {/* Responsive horizontal block container */}
        <div className="grid grid-cols-12 gap-1.5 md:gap-2.5 p-3 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-850">
          {fields.map((field, idx) => {
            // Compute bootstrap grid spans based on PPP/HDLC fields
            let colSpan = "col-span-1";
            if (field.id === 'payload') colSpan = "col-span-3";
            else if (field.id === 'proto') colSpan = "col-span-2";
            else if (field.id === 'fcs') colSpan = "col-span-2";
            else colSpan = "col-span-1 sm:col-span-1";

            // If we have fewer blocks, stretch nicely
            if (frameType === 'hdlc' && field.id === 'payload') colSpan = "col-span-4";
            if (frameType === 'hdlc' && field.id === 'ctrl') colSpan = "col-span-2";

            const isActive = activeField === field.id;

            return (
              <button
                key={field.id}
                onClick={() => setActiveField(field.id)}
                className={`h-16 md:h-20 border-2 rounded-xl flex flex-col justify-center items-center p-1.5 text-center transition-all cursor-pointer ${colSpan} ${field.color}
                  ${isActive ? 'ring-4 ring-blue-500/20 border-blue-500 scale-102 font-bold shadow-md' : 'border-dashed border-slate-300 dark:border-slate-800'}
                `}
              >
                <span className="text-[10px] md:text-xs tracking-tight font-extrabold truncate w-full">{field.name}</span>
                <span className="text-[8px] opacity-70 font-mono font-medium truncate w-full mt-0.5">{field.size}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Field Inspector Inspector Card */}
      <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-200">
        <div className="space-y-1.5 md:col-span-1">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Field Name:</div>
          <h4 className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
            {activeDetail.name} Field
          </h4>
          <div className="flex gap-2 pt-1.5">
            <span className="px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-[10px] font-semibold text-slate-600 dark:text-slate-300">
              Size: {activeDetail.size}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-[10px] font-semibold text-slate-600 dark:text-slate-300 font-mono">
              Hex equivalent
            </span>
          </div>
        </div>

        <div className="space-y-1.5 md:col-span-1">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Binary Pattern:</div>
          <p className="font-mono text-xs text-slate-800 dark:text-emerald-400 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-2 rounded-xl inline-block max-w-full truncate font-bold">
            {activeDetail.binary}
          </p>
        </div>

        <div className="space-y-1.5 md:col-span-1">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Functional Role:</div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            {activeDetail.desc}
          </p>
        </div>
      </div>

    </div>
  );
}

// ==========================================
// 2. PAP VS CHAP HANDSHAKE SIMULATOR
// ==========================================
function AuthHandshakeWidget() {
  const [activeProto, setActiveProto] = useState<'pap' | 'chap'>('pap');
  const [isPlaying, setIsPlaying] = useState(false);
  const [phase, setPhase] = useState<'idle' | 'challenge' | 'response' | 'plain-send' | 'success-reply'>('idle');
  const [logs, setLogs] = useState<string[]>(['Click "Run Handshake Simulation" to see authentication.']);
  const [packetLabel, setPacketLabel] = useState('');
  const [packetPos, setPacketPos] = useState(0); // 0 (User) to 100 (Server)

  const appendLog = (msg: string) => {
    setLogs(prev => [...prev, `[Handshake] ${msg}`]);
  };

  const handleStart = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    setPacketPos(0);
    setLogs([]);

    if (activeProto === 'pap') {
      // PAP: Simple 2-way handshake
      setPhase('plain-send');
      setPacketLabel('User: "bob" | Pass: "12345"');
      appendLog('PAP handshaking initiated.');
      appendLog('[WARNING] WARNING: Client preparing to transmit RAW password strings over direct cable...');
      
      animatePacket(true, () => {
        setPhase('success-reply');
        setPacketLabel('ACCESS GRANTED (PAP ACK)');
        appendLog('Server matched username/password credentials. Replying Access-Accept...');
        
        animatePacket(false, () => {
          setPhase('idle');
          setIsPlaying(false);
          appendLog('[SUCCESS] PAP handshake completed successfully. (But password was fully visible to sniffer eavesdropping!).');
        });
      });
    } else {
      // CHAP: Secure 3-way challenge handshake
      setPhase('challenge');
      setPacketLabel('Challenge: "chal-7789a"');
      appendLog('CHAP 3-way handshaking initiated.');
      appendLog('Server generates and transmits a random Challenge string...');
      
      animatePacket(false, () => {
        setPhase('response');
        setPacketLabel('MD5 Hash: "8f2c3d11b..."');
        appendLog('Client received challenge.');
        appendLog('Client combines challenge + client secret, computes MD5 hash locally...');
        appendLog('[SECURE] Client transmits ONLY the computed MD5 Hash. Password stays safe in memory!');
        
        animatePacket(true, () => {
          setPhase('success-reply');
          setPacketLabel('ACCESS GRANTED (CHAP ACK)');
          appendLog('Server executes matching challenge MD5 formula locally... HASHES MATCH!');
          appendLog('Server replies with CHAP-Success validation packet.');
          
          animatePacket(false, () => {
            setPhase('idle');
            setIsPlaying(false);
            appendLog('[SUCCESS] Secure CHAP Handshake completed. Zero clear-text data was exposed to hackers.');
          });
        });
      });
    }
  };

  const animatePacket = (toServer: boolean, callback: () => void) => {
    setPacketPos(toServer ? 0 : 100);
    let interval = setInterval(() => {
      setPacketPos(prev => {
        if (toServer) {
          if (prev >= 100) {
            clearInterval(interval);
            callback();
            return 100;
          }
          return prev + 5;
        } else {
          if (prev <= 0) {
            clearInterval(interval);
            callback();
            return 0;
          }
          return prev - 5;
        }
      });
    }, 40);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-2xl overflow-hidden shadow-xs p-6 md:p-8 space-y-6">
      
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <span className="text-[10px] bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
            PPP Authentication Comparison
          </span>
          <h3 className="text-lg font-extrabold text-slate-800 dark:text-slate-100 mt-1">
            PAP vs CHAP Handshake Simulator
          </h3>
          <p className="text-xs text-slate-500">
            Compare why Password Authentication Protocol (PAP) is insecure, while CHAP provides dynamic security.
          </p>
        </div>

        {/* Auth Toggle */}
        <div className="flex bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800 self-start sm:self-center">
          <button
            onClick={() => { setActiveProto('pap'); setLogs(['Terminal cleared. Click Play.']); }}
            disabled={isPlaying}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeProto === 'pap' ? 'bg-rose-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'} ${isPlaying ? 'opacity-40' : 'cursor-pointer'}`}
          >
            PAP (Plain Handshake)
          </button>
          <button
            onClick={() => { setActiveProto('chap'); setLogs(['Terminal cleared. Click Play.']); }}
            disabled={isPlaying}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeProto === 'chap' ? 'bg-emerald-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'} ${isPlaying ? 'opacity-40' : 'cursor-pointer'}`}
          >
            CHAP (Secure Challenge)
          </button>
        </div>
      </div>

      {/* Visual stage */}
      <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-850 relative">
        
        {/* Warning Shields */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
          {activeProto === 'pap' ? (
            <div className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 font-bold text-[10px] flex items-center gap-1.5 animate-pulse">
              <ShieldAlert className="w-3.5 h-3.5" /> PAP: Clear-text Vulnerability
            </div>
          ) : (
            <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold text-[10px] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" /> CHAP: 3-Way Hash Protection
            </div>
          )}
        </div>

        {/* Nodes and Packet lane */}
        <div className="h-44 flex items-center justify-between relative px-6 md:px-16 mt-4">
          
          {/* Client Node */}
          <div className="flex flex-col items-center gap-2 z-10">
            <div className="w-14 h-14 rounded-full bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 flex items-center justify-center shadow">
              <Key className="w-6 h-6 text-blue-500" />
            </div>
            <div className="text-center">
              <p className="text-[10px] font-bold text-slate-800 dark:text-slate-200 leading-none">Client PC</p>
              <p className="text-[8px] text-slate-400 mt-0.5">bob / secret123</p>
            </div>
          </div>

          {/* Physical Link wire */}
          <div className="absolute left-24 right-24 top-1/2 -translate-y-1/2 h-1 bg-slate-200 dark:bg-slate-850 rounded">
            
            {/* Moving packet */}
            {isPlaying && (
              <div 
                className={`absolute top-1/2 -translate-y-1/2 px-3 py-1 rounded-lg text-[9px] font-mono font-bold text-white shadow-lg transition-all duration-75 min-w-max text-center
                  ${phase === 'plain-send' ? 'bg-rose-500 shadow-rose-500/20' : ''}
                  ${phase === 'challenge' ? 'bg-blue-500 shadow-blue-500/20' : ''}
                  ${phase === 'response' ? 'bg-emerald-500 shadow-emerald-500/20' : ''}
                  ${phase === 'success-reply' ? 'bg-emerald-600 shadow-emerald-500/20' : ''}
                `}
                style={{ left: `calc(${packetPos}% - 50px)` }}
              >
                {packetLabel}
              </div>
            )}

          </div>

          {/* Router Server Node */}
          <div className="flex flex-col items-center gap-2 z-10">
            <div className="w-14 h-14 rounded-full bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 flex items-center justify-center shadow">
              <Layers className="w-6 h-6 text-indigo-500" />
            </div>
            <div className="text-center">
              <p className="text-[10px] font-bold text-slate-800 dark:text-slate-200 leading-none">AAA Auth Server</p>
              <p className="text-[8px] text-slate-400 mt-0.5">Verification database</p>
            </div>
          </div>

        </div>

      </div>

      {/* Log Console */}
      <div className="h-28 overflow-y-auto bg-slate-950 rounded-xl p-3 font-mono text-[10px] text-emerald-400 space-y-1">
        {logs.map((log, index) => (
          <div key={index} className="leading-relaxed">{log}</div>
        ))}
      </div>

      {/* Trigger Buttons */}
      <div className="flex justify-end gap-2">
        <button
          onClick={handleStart}
          disabled={isPlaying}
          className={`px-5 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-1 shadow-md transition-all
            ${isPlaying 
              ? 'bg-slate-400 dark:bg-slate-800 cursor-not-allowed shadow-none' 
              : activeProto === 'pap'
                ? 'bg-rose-600 hover:bg-rose-500 shadow-rose-500/10'
                : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/10'}
          `}
        >
          <Play className="w-4 h-4" /> {isPlaying ? 'Authenticating...' : 'Run Handshake Simulation'}
        </button>
      </div>

    </div>
  );
}

// ==========================================
// 3. COMPARISON TABLE WIDGET
// ==========================================
function ComparisonTableWidget() {
  const compData = [
    { feature: 'Bit/Byte Orientation', ppp: 'Character/Byte-Oriented (standard Software links)', hdlc: 'Bit-Oriented (uses strict hardware flags)', highlight: false },
    { feature: 'Multi-Protocol Support', ppp: 'Yes (via NCP, maps IP, IPv6, AppleTalk together)', hdlc: 'No (typically vendor-specific single protocol payloads)', highlight: true },
    { feature: 'Built-in Authentication', ppp: 'Yes (supports robust PAP and CHAP handshakes)', hdlc: 'No authentication features built-in', highlight: true },
    { feature: 'Flow & Error Control', ppp: 'No (relies completely on upper layers like TCP)', hdlc: 'Yes (uses sliding window S-Frames and numbering)', highlight: false },
    { feature: 'Link Configuration negotiation', ppp: 'Yes (via Link Control Protocol LCP parameters)', hdlc: 'No negotiation; pre-configured at boot', highlight: false },
    { feature: 'Dominant Modern Usage', ppp: 'DSL lines (PPPoE), dial-up, global ISP links', hdlc: 'Legacy WAN nodes, frame relay, avionics', highlight: false },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-2xl overflow-hidden shadow-xs p-6 md:p-8 space-y-4">
      <div>
        <h3 className="text-base font-extrabold text-slate-800 dark:text-slate-100">
          PPP vs HDLC Comparative Analysis
        </h3>
        <p className="text-xs text-slate-500">
          Understanding why PPP became the standardized engine for consumer internet connections.
        </p>
      </div>

      <div className="overflow-x-auto border border-slate-100 dark:border-slate-800 rounded-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-950 border-b border-slate-150 dark:border-slate-800 text-xs font-bold text-slate-500 dark:text-slate-400">
              <th className="p-4">Structural Metric</th>
              <th className="p-4 bg-blue-500/5 text-blue-700 dark:text-blue-400">PPP (Point-to-Point Protocol)</th>
              <th className="p-4">HDLC (High-Level Data Link)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
            {compData.map((row, index) => (
              <tr 
                key={index} 
                className={`transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-950/20
                  ${row.highlight ? 'bg-amber-500/5 font-semibold' : ''}
                `}
              >
                <td className="p-4 font-bold text-slate-800 dark:text-slate-200">{row.feature}</td>
                <td className="p-4 bg-blue-500/5 text-slate-700 dark:text-slate-300 font-medium">{row.ppp}</td>
                <td className="p-4 text-slate-600 dark:text-slate-400">{row.hdlc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
