import React, { useState, useEffect, useRef } from 'react';
import { ThreatType, MitigationLog } from '../types';
import { 
  ShieldAlert, 
  KeyRound, 
  Radio, 
  ShieldCheck, 
  Terminal, 
  RotateCcw, 
  AlertTriangle, 
  CheckCircle,
  TrendingDown,
  Activity,
  Sparkles
} from 'lucide-react';

interface ThreatSimulatorProps {
  activeThreat: ThreatType;
  setActiveThreat: (threat: ThreatType) => void;
  protocol: 'legacy' | 'ipv8';
}

export default function ThreatSimulator({ activeThreat, setActiveThreat, protocol }: ThreatSimulatorProps) {
  const [logs, setLogs] = useState<MitigationLog[]>([]);
  const [legacyIntegrity, setLegacyIntegrity] = useState(100);
  const [ipv8Integrity, setIpv8Integrity] = useState(100);
  const [statusText, setStatusText] = useState<'DORMANT' | 'CRITICAL' | 'MITIGATING' | 'SECURED'>('DORMANT');
  const logsContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logs locally to the terminal container
  useEffect(() => {
    if (logsContainerRef.current) {
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
    }
  }, [logs]);

  // Threat triggers and logs rollout simulation
  useEffect(() => {
    // Clear logs or set default based on threat
    if (activeThreat === 'none') {
      setLegacyIntegrity(100);
      setIpv8Integrity(100);
      setStatusText('DORMANT');
      setLogs([
        {
          id: 'init',
          timestamp: new Date().toLocaleTimeString(),
          type: 'success',
          message: '🛡️ SEC-OPS: System idle. Sentinel active. Integrity optimal.'
        }
      ]);
      return;
    }

    setStatusText('CRITICAL');
    setLegacyIntegrity(100);
    setIpv8Integrity(100);

    const threatConfigs = {
      bgp_hijack: {
        title: 'BGP Hijack Attack Injected',
        steps: [
          { delay: 100, type: 'warn' as const, msg: '🚨 DETECT: Route divergence anomaly on autonomous system AS-65413.' },
          { delay: 800, type: 'danger' as const, msg: '🔴 ALERT: Unauthorized BGP path injection matching active prefix list.' },
          { delay: 1600, type: 'danger' as const, msg: '⚠️ Legacy Impact: 100% of standard TCP traffic hijacked. Forwarding to rogue sink 192.0.2.1.' },
          { delay: 2400, type: 'info' as const, msg: '⚡ IPv8 Defense: Autonomous cNAT path deviation triggered. Recalculating spatial vectors.' },
          { delay: 3200, type: 'info' as const, msg: '⚡ IPv8 Defense: Rerouting packet streams via Low-Earth Orbit (LEO) satellite peers.' },
          { delay: 4000, type: 'success' as const, msg: '🟢 IPv8 Status: Bypass verified. 100% delivery maintained around compromised AS.' },
          { delay: 4500, type: 'success' as const, msg: '✅ SYSTEM SAFE: Threat isolated. IPv8 Cognitive Layer fully mitigated the hijack.' }
        ],
        legacyTarget: 14,
        ipv8Target: 98,
        mitigationStatus: 'MITIGATING' as const,
        securedStatus: 'SECURED' as const
      },
      quantum_decrypt: {
        title: 'Quantum Cryptanalysis Injected',
        steps: [
          { delay: 100, type: 'warn' as const, msg: '🚨 DETECT: Coherent optical interference and wave phase shifting on link-4.' },
          { delay: 800, type: 'danger' as const, msg: '🔴 ALERT: High-qubit quantum emulator executing Shor\'s algorithm on transit data.' },
          { delay: 1600, type: 'danger' as const, msg: '⚠️ Legacy Impact: RSA-2048 handshakes cracked. Private keys compromised. Stream exposed.' },
          { delay: 2400, type: 'info' as const, msg: '⚡ IPv8 Defense: Initiating ML-KEM-1024 post-quantum cryptographic exchange.' },
          { delay: 3200, type: 'info' as const, msg: '⚡ IPv8 Defense: Rotating security keys and entropy seeds every 120ms.' },
          { delay: 4000, type: 'success' as const, msg: '🟢 IPv8 Status: Quantum-safe handshakes complete. Symmetric encryption isolated.' },
          { delay: 4500, type: 'success' as const, msg: '✅ SYSTEM SAFE: Shor\'s factoring defeated. IPv8 encrypted envelope secure.' }
        ],
        legacyTarget: 0,
        ipv8Target: 100,
        mitigationStatus: 'MITIGATING' as const,
        securedStatus: 'SECURED' as const
      },
      orbital_ddos: {
        title: 'Orbital DDoS Sweep Injected',
        steps: [
          { delay: 100, type: 'warn' as const, msg: '🚨 DETECT: Anomalous ingress traffic flood on high-latitude ground gateways.' },
          { delay: 800, type: 'danger' as const, msg: '🔴 ALERT: Compromised satellite network launching coordinate flood (1.2 Tbps payload).' },
          { delay: 1600, type: 'danger' as const, msg: '⚠️ Legacy Impact: Gateway queue buffer overflow. BGP routers crashing. 85% packet loss.' },
          { delay: 2400, type: 'info' as const, msg: '⚡ IPv8 Defense: Initiating spatial ingress filtering. Rate limiting hostile IPs.' },
          { delay: 3200, type: 'info' as const, msg: '⚡ IPv8 Defense: Dispersing valid user flows through distributed spatial orbit paths.' },
          { delay: 4000, type: 'success' as const, msg: '🟢 IPv8 Status: DDoS flood isolated at perimeter. Clean packets bypassing freely.' },
          { delay: 4500, type: 'success' as const, msg: '✅ SYSTEM SAFE: Ground stations online. Rate-limiting operational.' }
        ],
        legacyTarget: 8,
        ipv8Target: 95,
        mitigationStatus: 'MITIGATING' as const,
        securedStatus: 'SECURED' as const
      }
    }[activeThreat];

    if (!threatConfigs) return;

    // Reset logs with initial warning
    setLogs([
      {
        id: 'start',
        timestamp: new Date().toLocaleTimeString(),
        type: 'danger',
        message: `🔥 THREAT ENGAGED: ${threatConfigs.title}!`
      }
    ]);

    // Setup timers to roll out logs and decrease/increase integrity values
    const timers: NodeJS.Timeout[] = [];

    // Decaying/Stabilizing meters
    const interval = setInterval(() => {
      // Degrade legacy
      setLegacyIntegrity(prev => {
        if (prev > threatConfigs.legacyTarget) {
          return Math.max(threatConfigs.legacyTarget, prev - 4);
        }
        return prev;
      });

      // Degrade then restore/mitigate IPv8
      setIpv8Integrity(prev => {
        if (prev > 80 && logs.length < 5) {
          // slight momentary dip before mitigation
          return Math.max(82, prev - 2);
        } else if (prev < threatConfigs.ipv8Target) {
          return Math.min(threatConfigs.ipv8Target, prev + 3);
        }
        return prev;
      });
    }, 100);

    // Rollout logs
    threatConfigs.steps.forEach(step => {
      const t = setTimeout(() => {
        setLogs(prev => [
          ...prev,
          {
            id: Math.random().toString(),
            timestamp: new Date().toLocaleTimeString(),
            type: step.type,
            message: step.msg
          }
        ]);

        if (step.msg.startsWith('⚡')) {
          setStatusText(threatConfigs.mitigationStatus);
        } else if (step.msg.startsWith('✅')) {
          setStatusText(threatConfigs.securedStatus);
        }
      }, step.delay);
      timers.push(t);
    });

    return () => {
      clearInterval(interval);
      timers.forEach(clearTimeout);
    };
  }, [activeThreat]);

  // Color mapping for status indicator
  const getStatusBadgeColor = () => {
    switch (statusText) {
      case 'DORMANT':
        return 'bg-gray-900 border-gray-800 text-gray-400';
      case 'CRITICAL':
        return 'bg-red-500/10 border-red-500/30 text-red-400 animate-pulse font-bold';
      case 'MITIGATING':
        return 'bg-amber-500/10 border-amber-500/30 text-amber-400 font-bold';
      case 'SECURED':
        return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 font-bold';
      default:
        return 'bg-gray-900 border-gray-800 text-gray-400';
    }
  };

  return (
    <div className="w-full rounded-2xl glass-panel border-cyan-500/10 p-6 md:p-8 mt-8 text-left bg-gradient-to-b from-gray-950/90 to-gray-900/90 relative overflow-hidden">
      {/* Decorative cyber grid lines */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-4 border-b border-gray-800/80 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] tracking-widest font-mono text-cyan-400 font-bold uppercase block">Speculative Sec-Ops</span>
            <span className="bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[9px] font-mono px-1.5 py-0.5 rounded-full flex items-center gap-1 animate-pulse">
              <Sparkles size={10} /> PHASE 2 ACTIVE
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-display font-bold text-white flex items-center gap-2">
            🛡️ Threat Injection & Quantum Defense Sandbox
          </h3>
          <p className="text-gray-400 text-xs mt-1 max-w-2xl">
            Inject protocol vulnerabilities to witness defensive self-healing and compare how standard networks collapse vs. how IPv8 cognitive routing survives.
          </p>
        </div>

        {/* Global Security Status badge */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-gray-500 uppercase">Threat Status:</span>
          <div className={`px-3 py-1 rounded-md border text-xs font-mono flex items-center gap-2 ${getStatusBadgeColor()}`}>
            <span className={`w-2 h-2 rounded-full ${
              statusText === 'DORMANT' ? 'bg-gray-500' :
              statusText === 'CRITICAL' ? 'bg-red-500 animate-ping' :
              statusText === 'MITIGATING' ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'
            }`} />
            {statusText}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10 items-stretch">
        {/* Left Column: Attack Injectors */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-4 bg-gray-950/40 border border-gray-800/40 p-5 rounded-xl">
          <div>
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block mb-3">SELECT SPECVULNERABILITY TRIGGER</span>
            <div className="space-y-3">
              {/* Threat 1 */}
              <button
                id="inject-bgp-btn"
                onClick={() => setActiveThreat('bgp_hijack')}
                className={`w-full p-3.5 rounded-lg border text-left font-mono text-xs flex items-start gap-3 transition-all ${
                  activeThreat === 'bgp_hijack'
                    ? 'bg-red-500/10 border-red-500/50 text-white shadow-lg shadow-red-500/5'
                    : 'bg-gray-900/60 border-gray-800 text-gray-400 hover:text-white hover:border-gray-700'
                }`}
              >
                <div className={`p-1.5 rounded-md ${activeThreat === 'bgp_hijack' ? 'bg-red-500/20 text-red-400' : 'bg-gray-800 text-gray-500'}`}>
                  <ShieldAlert size={16} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold">1. BGP Hijack Attack</span>
                    {activeThreat === 'bgp_hijack' && <span className="text-[9px] text-red-400 animate-pulse">● ENGAGED</span>}
                  </div>
                  <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
                    Inject falsified route advertisements to divert client-server sessions to rogue intercept nodes.
                  </p>
                </div>
              </button>

              {/* Threat 2 */}
              <button
                id="inject-quantum-btn"
                onClick={() => setActiveThreat('quantum_decrypt')}
                className={`w-full p-3.5 rounded-lg border text-left font-mono text-xs flex items-start gap-3 transition-all ${
                  activeThreat === 'quantum_decrypt'
                    ? 'bg-red-500/10 border-red-500/50 text-white shadow-lg shadow-red-500/5'
                    : 'bg-gray-900/60 border-gray-800 text-gray-400 hover:text-white hover:border-gray-700'
                }`}
              >
                <div className={`p-1.5 rounded-md ${activeThreat === 'quantum_decrypt' ? 'bg-red-500/20 text-red-400' : 'bg-gray-800 text-gray-500'}`}>
                  <KeyRound size={16} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold">2. Quantum Cryptanalysis</span>
                    {activeThreat === 'quantum_decrypt' && <span className="text-[9px] text-red-400 animate-pulse">● ENGAGED</span>}
                  </div>
                  <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
                    Hostile quantum computer attempts real-time private key factoring on standard RSA traffic streams.
                  </p>
                </div>
              </button>

              {/* Threat 3 */}
              <button
                id="inject-ddos-btn"
                onClick={() => setActiveThreat('orbital_ddos')}
                className={`w-full p-3.5 rounded-lg border text-left font-mono text-xs flex items-start gap-3 transition-all ${
                  activeThreat === 'orbital_ddos'
                    ? 'bg-red-500/10 border-red-500/50 text-white shadow-lg shadow-red-500/5'
                    : 'bg-gray-900/60 border-gray-800 text-gray-400 hover:text-white hover:border-gray-700'
                }`}
              >
                <div className={`p-1.5 rounded-md ${activeThreat === 'orbital_ddos' ? 'bg-red-500/20 text-red-400' : 'bg-gray-800 text-gray-500'}`}>
                  <Radio size={16} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold">3. Orbital DDoS Sweep</span>
                    {activeThreat === 'orbital_ddos' && <span className="text-[9px] text-red-400 animate-pulse">● ENGAGED</span>}
                  </div>
                  <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
                    Hijacked satellite network streams coordinate 1.2 Terabits of junk packets to inundate ground links.
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Reset button */}
          <button
            id="disarm-threat-btn"
            onClick={() => setActiveThreat('none')}
            disabled={activeThreat === 'none'}
            className={`w-full py-2 px-4 rounded-lg font-mono text-xs flex items-center justify-center gap-2 border transition-all ${
              activeThreat === 'none'
                ? 'bg-gray-950 border-gray-900 text-gray-600 cursor-not-allowed'
                : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20'
            }`}
          >
            <RotateCcw size={14} />
            DISARM & RESET THREAT AGENTS
          </button>
        </div>

        {/* Right Column: Comparative Defense Meters & Real-time Logs Console */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          
          {/* Defense Integrity Gauges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-950/40 border border-gray-800/40 p-4 rounded-xl">
            {/* Legacy Meter */}
            <div className="p-3 bg-red-950/5 border border-red-500/10 rounded-lg flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-mono font-bold text-red-400 uppercase">Legacy BGP Defense</span>
                  {legacyIntegrity < 50 ? (
                    <TrendingDown size={14} className="text-red-400 animate-bounce" />
                  ) : (
                    <Activity size={14} className="text-red-500/40" />
                  )}
                </div>
                <div className="flex items-baseline gap-1.5 my-1">
                  <span className="text-2xl font-mono font-bold text-red-300">{legacyIntegrity}%</span>
                  <span className="text-[9px] font-mono text-gray-500">Security Index</span>
                </div>
              </div>
              {/* Progress bar */}
              <div className="w-full h-1.5 bg-gray-900 rounded-full overflow-hidden mt-2">
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${
                    legacyIntegrity < 30 ? 'bg-red-500 shadow-[0_0_8px_#ef4444]' :
                    legacyIntegrity < 75 ? 'bg-amber-500 shadow-[0_0_8px_#f59e0b]' : 'bg-gray-600'
                  }`}
                  style={{ width: `${legacyIntegrity}%` }}
                />
              </div>
              <span className="text-[9px] font-mono text-red-400 mt-2 block">
                {legacyIntegrity === 100 ? '✓ Ready / Secure' : 
                 legacyIntegrity === 0 ? '❌ COMPLETE COMPROMISE' : 
                 `⚠️ Protocol failure under attack`}
              </span>
            </div>

            {/* IPv8 Meter */}
            <div className="p-3 bg-cyan-950/5 border border-cyan-500/10 rounded-lg flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase">IPv8 Cognitive Shield</span>
                  <ShieldCheck size={14} className={ipv8Integrity > 90 ? "text-cyan-400 animate-pulse" : "text-amber-400"} />
                </div>
                <div className="flex items-baseline gap-1.5 my-1">
                  <span className="text-2xl font-mono font-bold text-cyan-300">{ipv8Integrity}%</span>
                  <span className="text-[9px] font-mono text-gray-500">Autonomous Index</span>
                </div>
              </div>
              {/* Progress bar */}
              <div className="w-full h-1.5 bg-gray-900 rounded-full overflow-hidden mt-2">
                <div 
                  className="h-full rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4] transition-all duration-300"
                  style={{ width: `${ipv8Integrity}%` }}
                />
              </div>
              <span className="text-[9px] font-mono text-cyan-400 mt-2 block">
                {ipv8Integrity > 95 ? '✓ Full Immunity (Self-Healing)' : 
                 ipv8Integrity > 80 ? '⚡ Rerouting & Key Rotating' : 
                 '⚠️ Mitigating Ingress...'}
              </span>
            </div>
          </div>

          {/* Intrusive Mitigation HUD Console Logs */}
          <div className="flex-1 bg-black/60 border border-gray-800 rounded-xl p-4 font-mono text-[10px] flex flex-col justify-between h-48 relative shadow-inner">
            <div className="flex justify-between items-center border-b border-gray-900 pb-2 mb-2">
              <div className="flex items-center gap-1.5">
                <Terminal className="text-cyan-400" size={12} />
                <span className="text-gray-400">cNAT MITIGATION RECON HUD</span>
              </div>
              <span className="text-[8px] px-1.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-gray-500">
                LOGGING STATEFUL HANDSHAKES
              </span>
            </div>

            {/* Terminal Body */}
            <div 
              ref={logsContainerRef}
              className="flex-1 overflow-y-auto whitespace-pre-wrap leading-tight space-y-1 select-all pr-1 scrollbar-thin"
            >
              {logs.map(log => (
                <div key={log.id} className="flex gap-2">
                  <span className="text-gray-600 select-none">[{log.timestamp}]</span>
                  <span className={
                    log.type === 'danger' ? 'text-red-400 font-bold' :
                    log.type === 'warn' ? 'text-amber-400' :
                    log.type === 'success' ? 'text-emerald-400 font-semibold' : 'text-cyan-300'
                  }>
                    {log.message}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-2 pt-2 border-t border-gray-900/60 flex justify-between items-center text-[8px] text-gray-600 uppercase select-none">
              <span>Security Hub: V2.4.1</span>
              <span>Buffer Status: Clean</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
