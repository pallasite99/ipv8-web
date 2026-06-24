import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, ShieldAlert, Zap, Globe, Cpu, Server, Radio, Orbit, KeyRound } from 'lucide-react';
import { ThreatType } from '../types';
import SemanticInspector from './SemanticInspector';
import ThreatSimulator from './ThreatSimulator';
import ConsensusLedger from './ConsensusLedger';

type RoutingProtocol = 'legacy' | 'ipv8';

export default function InteractiveArchitecture() {
  const [protocol, setProtocol] = useState<RoutingProtocol>('ipv8');
  const [congested, setCongested] = useState(false);
  const [activeThreat, setActiveThreat] = useState<ThreatType>('none');
  const [packets, setPackets] = useState<{ id: number; path: number; x: number; color: string; isMalicious?: boolean }[]>([]);
  const [latency, setLatency] = useState(14);
  const [packetLoss, setPacketLoss] = useState(0);
  const [energyUse, setEnergyUse] = useState(40);
  const [hops, setHops] = useState(3);

  const packetIdRef = useRef(0);

  // Phase 1: Deep Packet Analysis (DPA) state
  const [isPaused, setIsPaused] = useState(false);
  const isPausedRef = useRef(false);
  const [selectedPacket, setSelectedPacket] = useState<{ id: number; path: number; x: number; color: string } | null>(null);
  const [bitstream, setBitstream] = useState<string[]>([]);

  // Sync isPaused state to ref to avoid stale closure issues in intervals
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  // Rolling bitstream decoder logs simulation
  useEffect(() => {
    if (!selectedPacket) {
      setBitstream([]);
      return;
    }

    setBitstream([
      "INITIALIZING cNAT TRANSCEIVER...",
      "TUNING ML-KEM-1024 DECRYPTER...",
      "OK: SYNCHRONIZED SECURITY SEED"
    ]);

    const interval = setInterval(() => {
      if (isPausedRef.current) return;
      setBitstream(prev => {
        const nextLines = [...prev];
        if (nextLines.length > 7) nextLines.shift();

        const hex = '0123456789ABCDEF';
        let randomStr = '';
        for (let i = 0; i < 24; i++) {
          randomStr += hex[Math.floor(Math.random() * 16)];
        }

        const prefixes = ["RX_BLOCK", "TX_VECTOR", "KEM_SEED", "NAT_TRANS", "SIG_AUTH", "CIPH_IV"];
        const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        nextLines.push(`[${prefix}] 0x${randomStr.substring(0, 8)}...${randomStr.substring(16)}`);
        return nextLines;
      });
    }, 180);

    return () => clearInterval(interval);
  }, [selectedPacket]);

  // Generate dynamic, deterministic headers for inspection
  const getPacketDetails = (p: { id: number; path: number; color: string }) => {
    const intents = ['API_DISPATCH', 'QUANTUM_TUNNEL', 'LEDGER_SYNC'];
    const selectedIntent = intents[p.path] || 'API_DISPATCH';

    const hashHex = `0x8aef${(p.id * 137).toString(16).padEnd(8, 'a').substring(0, 8)}...3e2a`;
    const vectorStr = `[${(Math.sin(p.id) * 0.9).toFixed(3)}, ${(Math.cos(p.id) * 0.9).toFixed(3)}, ${(Math.sin(p.id * 2) * 0.5).toFixed(3)}]`;
    const kemKey = `ML-KEM-1024-0x${(p.id * 983).toString(16).padEnd(4, '0').substring(0, 4)}...fd21`;

    const legacyIpSrc = `192.168.12.${(p.id % 254) + 1}`;
    const legacyIpDst = `104.244.42.${((p.id * 7) % 254) + 1}`;
    const legacyProto = p.path === 1 ? 'UDP' : 'TCP (TLS 1.3)';
    const legacyPorts = p.path === 0 ? '443 → 443' : p.path === 1 ? '5001 → 5001' : '80 → 80';

    const ipv8Latency = `${(10 + (p.id % 5)).toFixed(1)}ms`;
    const legacyLatency = `${(80 + (p.id % 40) + (congested ? 150 : 0))}ms`;

    return {
      legacy: {
        src: legacyIpSrc,
        dst: legacyIpDst,
        proto: legacyProto,
        ports: legacyPorts,
        hops: congested ? '12 Hops' : '8 Hops',
        ttl: `${64 - (p.id % 8)}`,
        table: congested ? 'BGP Congested Queue' : 'BGP Static Route',
        latency: legacyLatency
      },
      ipv8: {
        hash: hashHex,
        vector: vectorStr,
        intent: selectedIntent,
        cipher: kemKey,
        hops: '2 Hops (Low-Earth Orbit)',
        bypass: congested ? 'Active Satellite Rerouting' : 'Direct Autonomous Peer',
        latency: ipv8Latency
      }
    };
  };

  // Simulation physics
  useEffect(() => {
    // Clear packets on protocol change or threat trigger to prevent mixed/orphaned packets
    setPackets([]);
    setSelectedPacket(null);

    const interval = setInterval(() => {
      if (isPausedRef.current) return;
      
      // If DDoS is active and protocol is legacy, we spam malicious packets!
      const isDDoSStorm = activeThreat === 'orbital_ddos' && protocol === 'legacy';
      
      if (isDDoSStorm) {
        setPackets(prev => {
          const next = [...prev];
          [0, 1, 2].forEach(pIndex => {
            next.push({
              id: packetIdRef.current++,
              path: pIndex,
              x: 0,
              color: '#ef4444', // Malicious ddos red
              isMalicious: true
            });
          });
          return next;
        });
      } else {
        // Normal Spawning
        const randomPath = Math.floor(Math.random() * 3);
        const color = protocol === 'ipv8' 
          ? (randomPath === 0 ? '#06b6d4' : randomPath === 1 ? '#8b5cf6' : '#3b82f6')
          : '#ef4444'; // Legacy is red

        // If DDoS is active on IPv8, spawn gray malicious packets that will get vaporized at the node
        if (activeThreat === 'orbital_ddos' && protocol === 'ipv8' && Math.random() > 0.4) {
          setPackets(prev => [
            ...prev,
            { id: packetIdRef.current++, path: randomPath, x: 0, color: '#6b7280', isMalicious: true }
          ]);
        } else {
          setPackets(prev => [...prev, { id: packetIdRef.current++, path: randomPath, x: 0, color }]);
        }
      }
    }, activeThreat === 'orbital_ddos' && protocol === 'legacy' ? 120 : 400);

    return () => clearInterval(interval);
  }, [protocol, activeThreat]);

  // Handle packet animations and scoring stats
  useEffect(() => {
    const animationInterval = setInterval(() => {
      if (isPausedRef.current) return;
      setPackets(prev => {
        return prev
          .map(p => {
            // Packets move forward
            let speed = protocol === 'ipv8' ? 5 : 3;
            
            // Legacy packets crawl/freeze during congestion or threats
            if (congested && protocol === 'legacy') {
              if (p.x > 38 && p.x < 55) {
                speed = 0.5; // very slow
              }
            }

            if (activeThreat === 'bgp_hijack' && protocol === 'legacy' && p.path === 1) {
              // Stuck or captured at AS-65413 rogue sink
              if (p.x >= 45 && p.x < 55) {
                speed = 0.2;
              }
            }

            if (activeThreat === 'orbital_ddos' && protocol === 'legacy') {
              // Overflow BGP buffers
              if (p.x > 38 && p.x < 65) {
                speed = 1.0;
              }
            }

            return { ...p, x: p.x + speed };
          })
          .filter(p => {
            // In IPv8, vaporize malicious DDoS packets at the cNAT rate limiter shield (x=50)
            if (protocol === 'ipv8' && p.isMalicious && p.x >= 45 && p.x <= 55) {
              return false; // filtered/absorbed
            }
            return p.x < 100;
          });
      });
    }, 40);

    return () => clearInterval(animationInterval);
  }, [protocol, congested, activeThreat]);

  // Adjust live metrics based on protocol, congestion state, and active threat
  useEffect(() => {
    if (protocol === 'ipv8') {
      setHops(activeThreat === 'bgp_hijack' ? 3 : 2);
      setEnergyUse(activeThreat === 'orbital_ddos' ? 52 : congested ? 45 : 38);
      setPacketLoss(0);
      setLatency(
        activeThreat === 'orbital_ddos' ? 19 :
        activeThreat === 'bgp_hijack' ? 14 :
        congested ? 18 : 12
      );
    } else {
      // Legacy
      setHops(activeThreat === 'bgp_hijack' ? 15 : congested ? 12 : 8);
      setEnergyUse(
        activeThreat === 'orbital_ddos' ? 480 :
        activeThreat === 'bgp_hijack' ? 180 :
        congested ? 120 : 92
      );
      setPacketLoss(
        activeThreat === 'orbital_ddos' ? 84 :
        activeThreat === 'bgp_hijack' ? 62 :
        congested ? 18 : 1.2
      );
      setLatency(
        activeThreat === 'orbital_ddos' ? 1420 :
        activeThreat === 'bgp_hijack' ? 640 :
        congested ? 240 : 88
      );
    }
  }, [protocol, congested, activeThreat]);

  // Connected systems we render
  const systems = [
    { name: "AI Agents", icon: Cpu, desc: "Autonomous reasoning entities" },
    { name: "Satellites", icon: Orbit, desc: "LEO orbital satellite routers" },
    { name: "Autonomous Vehicles", icon: Zap, desc: "Edge-computed navigation arrays" },
    { name: "Robotics Platforms", icon: Radio, desc: "Industrial IoT actuators" },
    { name: "Smart Cities", icon: Globe, desc: "Metropolitan sensory nodes" },
    { name: "Cloud Infrastructure", icon: Server, desc: "Hyper-distributed nodes" },
  ];

  return (
    <div className="w-full rounded-2xl glass-panel border-cyan-500/10 p-6 md:p-8 mt-12 text-left">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
        <div>
          <span className="text-[10px] tracking-widest font-mono text-cyan-400 font-bold uppercase block mb-1">Interactive Sandbox</span>
          <h3 className="text-2xl md:text-3xl font-display font-bold text-white">Visual Architecture Simulator</h3>
          <p className="text-gray-400 text-sm mt-1 max-w-2xl">
            Compare Legacy IPv4/IPv6 packet delivery with IPv8's cognitive intelligence layer under real-world congestion scenarios.
          </p>
        </div>

        {/* Simulator controls */}
        <div className="flex flex-wrap gap-3 items-center w-full lg:w-auto">
          {/* Protocol Toggle */}
          <div className="bg-gray-950 p-1 rounded-lg border border-gray-800 flex gap-1">
            <button
              id="proto-toggle-legacy"
              onClick={() => setProtocol('legacy')}
              className={`px-3 py-1.5 text-xs font-mono rounded-md transition-all ${
                protocol === 'legacy'
                  ? 'bg-red-500/10 text-red-400 border border-red-500/20 font-bold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              IPv4 / IPv6 BGP
            </button>
            <button
              id="proto-toggle-ipv8"
              onClick={() => setProtocol('ipv8')}
              className={`px-3 py-1.5 text-xs font-mono rounded-md transition-all ${
                protocol === 'ipv8'
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              IPv8 Cognitive
            </button>
          </div>

          {/* Congestion injector */}
          <button
            id="inject-congestion-btn"
            onClick={() => setCongested(!congested)}
            className={`px-3 py-1.5 text-xs font-mono rounded-lg border flex items-center gap-1.5 transition-all ${
              congested 
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 font-bold animate-pulse'
                : 'bg-gray-950 border-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            <ShieldAlert size={14} />
            {congested ? 'Congestion Injected!' : 'Inject Congestion'}
          </button>
        </div>
      </div>

      {/* Simulator canvas grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Simulation Sandbox Visualization */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="bg-gray-950/80 rounded-xl border border-gray-800/80 p-6 flex flex-col justify-between relative overflow-hidden min-h-[300px]">
            
            <div className="absolute top-2 right-2 text-[10px] font-mono text-gray-600 uppercase select-none">
              Interactive routing grid (click packets to inspect)
            </div>

            {/* Grid bg */}
            <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

            {/* Simulator Core Diagram */}
            <div className="relative z-10 w-full flex flex-col justify-center flex-1 py-4">
              
              {/* Source Label */}
              <div className="flex justify-between items-center px-2 mb-4 font-mono text-xs text-gray-500">
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Edge Client</span>
                <span className="flex items-center gap-1">Connected IoT/SaaS Swarm <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span></span>
              </div>

              {/* The routes */}
              <div className="space-y-8 relative">
                
                {/* Orbital Satellite DDoS Laser Beam Overlay */}
                {activeThreat === 'orbital_ddos' && (
                  <div className="absolute inset-0 flex justify-center pointer-events-none z-10">
                    <div className="absolute top-1 flex flex-col items-center">
                      <span className="text-[7px] font-mono font-bold text-red-500 bg-red-950/90 border border-red-500/30 px-1 py-0.5 rounded animate-pulse">
                        🛰️ HIJACKED ORBITAL BEAM
                      </span>
                    </div>
                    {/* Glowing Laser beam connecting top down to Node 2 */}
                    <div className="w-0.5 h-full bg-gradient-to-b from-red-500 via-red-500/60 to-red-400/20 animate-pulse shadow-[0_0_8px_#ef4444]" />
                  </div>
                )}

                {[0, 1, 2].map(pathIndex => (
                  <div key={pathIndex} className="relative h-6 flex items-center">
                    
                    {/* Background Path Line */}
                    <div className="absolute left-0 right-0 h-1 bg-gray-800 rounded">
                      {/* Glowing pulse if IPv8 */}
                      {protocol === 'ipv8' && (
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 animate-pulse rounded" />
                      )}
                      {/* Red pulse if legacy BGP hijack on Path 1 */}
                      {activeThreat === 'bgp_hijack' && protocol === 'legacy' && pathIndex === 1 && (
                        <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-red-600 animate-pulse rounded" />
                      )}
                    </div>

                    {/* Nodes along the paths */}
                    {/* Node 1: Left */}
                    <div className="absolute left-10 w-4 h-4 rounded-full bg-gray-800 border-2 border-gray-600 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                    </div>

                    {/* Node 2: Middle (BGP Bottleneck / Intelligent Router) */}
                    <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
                      {/* Flashing alerts based on active threat */}
                      {activeThreat === 'bgp_hijack' && pathIndex === 1 && (
                        <div className={`absolute -top-6 text-[8px] font-mono px-1 rounded uppercase tracking-wider animate-bounce ${
                          protocol === 'legacy' 
                            ? 'text-red-400 bg-red-950 border border-red-500/40' 
                            : 'text-emerald-400 bg-emerald-950 border border-emerald-500/40'
                        }`}>
                          {protocol === 'legacy' ? '💀 Rogue Hijack Sink' : '🛡️ Autonomous Bypass'}
                        </div>
                      )}

                      {activeThreat === 'orbital_ddos' && pathIndex === 1 && (
                        <div className={`absolute -top-6 text-[8px] font-mono px-1 rounded uppercase tracking-wider animate-pulse ${
                          protocol === 'legacy'
                            ? 'text-red-400 bg-red-950 border border-red-500/40'
                            : 'text-cyan-400 bg-cyan-950 border border-cyan-500/40'
                        }`}>
                          {protocol === 'legacy' ? '🔥 DDoS Flood' : '🛡️ Rate Limiter Active'}
                        </div>
                      )}

                      {activeThreat === 'quantum_decrypt' && pathIndex === 1 && (
                        <div className={`absolute -top-6 text-[8px] font-mono px-1 rounded uppercase tracking-wider ${
                          protocol === 'legacy'
                            ? 'text-red-400 bg-red-950 border border-red-500/40 animate-pulse'
                            : 'text-purple-400 bg-purple-950 border border-purple-500/40 animate-pulse'
                        }`}>
                          {protocol === 'legacy' ? '🔓 Keys Decrypted' : '🔒 ML-KEM Rotated'}
                        </div>
                      )}

                      {/* Default congested indicator when no threat is active */}
                      {activeThreat === 'none' && congested && pathIndex === 1 && protocol === 'legacy' ? (
                        <div className="absolute -top-6 text-[9px] font-mono text-red-400 bg-red-950/90 border border-red-500/30 px-1 rounded uppercase animate-bounce">
                          BGP Congested
                        </div>
                      ) : null}

                      {/* Physical Node Visual Representation */}
                      {protocol === 'ipv8' ? (
                        <div className={`relative w-6 h-6 rounded-lg border flex items-center justify-center transition-all shadow-lg ${
                          activeThreat === 'bgp_hijack' && pathIndex === 1
                            ? 'bg-emerald-500/20 border-emerald-400 shadow-emerald-500/20'
                            : activeThreat === 'quantum_decrypt'
                            ? 'bg-purple-500/20 border-purple-400 shadow-purple-500/20'
                            : activeThreat === 'orbital_ddos'
                            ? 'bg-cyan-500/20 border-cyan-400 shadow-cyan-500/20'
                            : congested
                            ? 'bg-amber-500/20 border-amber-400'
                            : 'bg-cyan-500/20 border-cyan-400'
                        }`}>
                          {activeThreat === 'quantum_decrypt' ? (
                            <span className="animate-spin text-purple-400 text-[8px] font-bold">🔒</span>
                          ) : (
                            <Activity size={10} className={
                              activeThreat === 'bgp_hijack' && pathIndex === 1 ? 'text-emerald-400' :
                              activeThreat === 'orbital_ddos' ? 'text-cyan-400' :
                              congested ? 'text-amber-400' : 'text-cyan-400'
                            } />
                          )}

                          {/* Outer shield visualization for IPv8 DDoS protection */}
                          {activeThreat === 'orbital_ddos' && (
                            <span className="absolute -inset-1.5 border border-cyan-400/40 rounded-lg animate-ping opacity-70" />
                          )}
                        </div>
                      ) : (
                        // Legacy Nodes
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          activeThreat === 'bgp_hijack' && pathIndex === 1
                            ? 'bg-red-600/30 border-red-500 animate-pulse'
                            : activeThreat === 'orbital_ddos'
                            ? 'bg-red-700 border-red-500 animate-ping'
                            : activeThreat === 'quantum_decrypt'
                            ? 'bg-red-800/40 border-red-600 animate-pulse'
                            : congested
                            ? 'bg-red-500/30 border-red-500 animate-pulse'
                            : 'bg-gray-700 border-gray-500'
                        }`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${
                            activeThreat !== 'none' || congested ? 'bg-red-500' : 'bg-gray-400'
                          }`} />
                        </div>
                      )}
                    </div>

                    {/* Node 3: Right */}
                    <div className="absolute right-10 w-4 h-4 rounded-full bg-gray-800 border-2 border-gray-600 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                    </div>

                    {/* Render packets traveling this specific path */}
                    {packets
                      .filter(p => p.path === pathIndex)
                      .map(p => {
                        const isSelected = selectedPacket?.id === p.id;
                        return (
                          <div
                            key={p.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedPacket(p);
                            }}
                            className={`absolute w-3.5 h-3.5 rounded-full cursor-pointer transition-all hover:scale-150 flex items-center justify-center`}
                            style={{
                              left: `${p.x}%`,
                              zIndex: isSelected ? 30 : 20,
                            }}
                          >
                            {/* Pulsing ring for active selection */}
                            {isSelected && (
                              <span className="absolute w-6 h-6 rounded-full border border-cyan-400 animate-ping opacity-75" />
                            )}
                            <div
                              className="w-2.5 h-2.5 rounded-full"
                              style={{
                                backgroundColor: p.color,
                                boxShadow: isSelected 
                                  ? `0 0 12px 4px ${p.color}, 0 0 0 2.5px rgba(255, 255, 255, 0.45)` 
                                  : `0 0 8px ${p.color}`,
                              }}
                            />
                          </div>
                        );
                      })}
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Legend description */}
            <div className="border-t border-gray-900 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex gap-4 text-xs font-mono text-gray-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#06b6d4] inline-block shadow-[0_0_6px_#06b6d4]" />
                  IPv8 AI-Packet
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#8b5cf6] inline-block shadow-[0_0_6px_#8b5cf6]" />
                  Quantum Secured
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444] inline-block shadow-[0_0_6px_#ef4444]" />
                  Legacy Packet
                </span>
              </div>

              <div className="text-xs text-gray-500 font-mono">
                {protocol === 'ipv8' ? (
                  <span className="text-cyan-400 font-bold">✓ IPv8 is routing via Satellite networks around congestion blocks.</span>
                ) : (
                  <span className="text-red-400">⚠️ Legacy protocols stuck in standard BGP queues.</span>
                )}
              </div>
            </div>

          </div>

          {/* Deep Packet Inspector (DPA) Sub-Component */}
          <SemanticInspector
            selectedPacket={selectedPacket}
            isPaused={isPaused}
            setIsPaused={setIsPaused}
            bitstream={bitstream}
            packetDetails={selectedPacket ? getPacketDetails(selectedPacket) : null}
          />
        </div>

        {/* Live Simulator Performance Stats */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-4">
          <div className="bg-gray-950/80 rounded-xl border border-gray-800/80 p-5 flex-1 flex flex-col justify-center">
            <p className="text-[10px] tracking-widest font-mono text-cyan-400 font-bold uppercase mb-4">LIVE SCENARIO METRICS</p>
            
            <div className="space-y-4">
              {/* Metric 1: Latency */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-900/60 border border-gray-800/50">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-md bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                    <Zap size={16} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">End-to-End Latency</div>
                    <div className="text-[10px] text-gray-500 font-mono">Time in transit</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-xl font-mono font-bold ${protocol === 'ipv8' ? 'text-cyan-400' : 'text-red-400'}`}>
                    {latency}ms
                  </span>
                </div>
              </div>

              {/* Metric 2: Packet Loss */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-900/60 border border-gray-800/50">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-md bg-purple-500/10 flex items-center justify-center text-purple-400">
                    <ShieldAlert size={16} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Packet Loss Rate</div>
                    <div className="text-[10px] text-gray-500 font-mono">Dropped transmissions</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-xl font-mono font-bold ${packetLoss > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {packetLoss}%
                  </span>
                </div>
              </div>

              {/* Metric 3: Energy Efficiency */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-900/60 border border-gray-800/50">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-md bg-blue-500/10 flex items-center justify-center text-blue-400">
                    <Activity size={16} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Power Coefficient</div>
                    <div className="text-[10px] text-gray-500 font-mono">Watts per Gigabyte</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xl font-mono font-bold text-gray-100">
                    {energyUse} W
                  </span>
                </div>
              </div>

              {/* Metric 4: Route Hops */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-900/60 border border-gray-800/50">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-md bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                    <Server size={16} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Network Hops</div>
                    <div className="text-[10px] text-gray-500 font-mono">Intermediate systems</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xl font-mono font-bold text-gray-100">
                    {hops}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick explainer note */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/30 to-purple-950/30 border border-cyan-500/10 text-xs text-gray-300 leading-relaxed">
            <span className="font-bold text-cyan-400">Under the Hood:</span> IPv8 headers encapsulate <strong>1024-bit predictive contexts</strong> that allow individual network routing nodes to run lightweight AI inference. In contrast to static BGP tables, the packet itself suggests its optimum bypass trajectory.
          </div>
        </div>

      </div>

      {/* Speculative Sec-Ops Cyber Attack & Quantum Defense Simulator Panel (Phase 2) */}
      <ThreatSimulator 
        activeThreat={activeThreat} 
        setActiveThreat={setActiveThreat} 
        protocol={protocol}
      />

      {/* Distributed State Ledger Consensus Simulator (Phase 3) */}
      <ConsensusLedger />

      {/* Connected Systems Grid */}
      <div className="mt-12 border-t border-gray-800/60 pt-8">
        <h4 className="text-sm font-mono text-cyan-400 uppercase tracking-widest font-bold mb-6 text-center">
          INTELLIGENT NETWORKING LAYER FOR CONNECTED SYSTEMS
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {systems.map((sys, idx) => {
            const IconComp = sys.icon;
            return (
              <div key={idx} className="bg-gray-900/40 p-4 rounded-xl border border-gray-800/80 hover:border-cyan-500/30 transition-all flex flex-col items-center text-center group">
                <div className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:text-cyan-300 transition-all mb-3">
                  <IconComp size={20} />
                </div>
                <h5 className="text-xs font-bold text-gray-100 font-display">{sys.name}</h5>
                <p className="text-[10px] text-gray-500 mt-1">{sys.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
