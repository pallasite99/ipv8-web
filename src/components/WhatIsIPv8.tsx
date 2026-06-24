import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, Sparkles, Binary, Compass, ShieldHalf } from 'lucide-react';

interface Pillar {
  id: string;
  title: string;
  badge: string;
  short: string;
  description: string;
  benefits: string[];
  metric: string;
  metricLabel: string;
}

export default function WhatIsIPv8() {
  const [activePillar, setActivePillar] = useState('ai-native');

  const pillars: Pillar[] = [
    {
      id: 'ai-native',
      title: 'AI-Native Networking Architecture',
      badge: 'Cognitive Core',
      short: 'Every routing path is a neural inference step, predicting congestion and optimizing transport routes before a packet is even generated.',
      description: 'IPv8 departs from the traditional static routing tables of the past. By embedding micro-inference targets in the packet headers, routers perform sub-millisecond predictions, mapping optimal pathing on a per-packet level across our global satellite and fiber network.',
      benefits: [
        'Predictive congestion dodging',
        'Dynamic path clustering for high-throughput agents',
        'Inherent protection against distributed routing loops'
      ],
      metric: '0ms',
      metricLabel: 'BGP Congestion Delays'
    },
    {
      id: 'self-optimizing',
      title: 'Self-Optimizing Packet Delivery',
      badge: 'Autonomous Flow',
      short: 'Packets contain adaptive feedback payloads. As they traverse nodes, they update local path weight databases.',
      description: 'Rather than relying on periodic global table updates which are slow and vulnerable to routing loops, IPv8 packets act as active probes. Each packet feeds real-time status data back to the routing nodes it touches, enabling sub-millisecond local network awareness.',
      benefits: [
        'Instant response to physical fiber failures',
        'Load balancing optimized for extreme burst situations',
        'Sub-harmonic satellite-to-ground routing fallback'
      ],
      metric: '60%',
      metricLabel: 'Reduction in Transit Hops'
    },
    {
      id: 'addressing',
      title: 'Intelligent Addressing System',
      badge: '1024-Bit Headers',
      short: 'A massive 1024-bit addressing layout that packs multi-dimensional AI semantic contexts, routing tags, and identity markers.',
      description: 'IPv6 provided addresses; IPv8 provides identity and semantic intent. Of the 1024 bits in an IPv8 header, 256 bits represent the unique cryptographic device signature, 512 bits define the operational neural context, and 256 bits handle orbital-to-ground coordinates.',
      benefits: [
        'Virtually infinite space (10^308 addresses)',
        'Direct machine-to-machine sub-net delegation',
        'Metadata-less routing utilizing encrypted spatial coordinates'
      ],
      metric: '10^308',
      metricLabel: 'Total Address Availability'
    },
    {
      id: 'routing',
      title: 'Dynamic Cognitive Routing Engine',
      badge: 'Global Pathing',
      short: 'An overlay mesh that unifies fiber, LEO satellite constellations, and local edge cells into a single cohesive, low-latency fabric.',
      description: 'Legacy networks separate mobile, orbital, and landline protocols. IPv8 unifies these layers. If a metropolitan fiber link experiences stress, traffic is split seamlessly: bulk data is delayed by microseconds, while real-time agent telemetry is routed via overhead LEO satellite.',
      benefits: [
        'Single integrated space-sea-ground protocol stack',
        'Multicast-by-default architecture for global state sync',
        'Deterministic latencies for surgical and aviation AI systems'
      ],
      metric: '99.9999%',
      metricLabel: 'Autonomous Path Uptime'
    },
    {
      id: 'security',
      title: 'Quantum-Ready Security Architecture',
      badge: 'Post-Quantum Shield',
      short: 'Identity-aware networking with ML-KEM and NTRU-Prime cryptographic encapsulation directly inside the layer-3 handshake.',
      description: 'With the arrival of quantum supremacy, existing RSA and ECC network locks are obsolete. IPv8 integrates post-quantum algorithms (ML-KEM-1024) natively in the core networking framework. Packets are cryptographically secured at rest on the wire, making passive decryption impossible.',
      benefits: [
        'Natively integrated Kyber/Dilithium cryptography',
        'Zero-trust hardware authentication for autonomous drones',
        'Self-expiring ephemeral transport keys per session'
      ],
      metric: '100%',
      metricLabel: 'Quantum Cryptographic Immunity'
    }
  ];

  const activeData = pillars.find(p => p.id === activePillar) || pillars[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-12 text-left">
      
      {/* Left side: Interactive Tab Pillar Buttons */}
      <div className="lg:col-span-5 space-y-3">
        {pillars.map((pillar) => {
          const isActive = pillar.id === activePillar;
          return (
            <button
              key={pillar.id}
              id={`pillar-tab-${pillar.id}`}
              onClick={() => setActivePillar(pillar.id)}
              className={`w-full p-4 rounded-xl text-left border transition-all flex items-start gap-4 ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-950/40 to-gray-950 border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.06)]'
                  : 'bg-gray-950/40 border-gray-950 hover:border-gray-800 hover:bg-gray-900/20'
              }`}
            >
              {/* Icon select */}
              <div className={`p-2 rounded-lg shrink-0 ${isActive ? 'bg-cyan-500/10 text-cyan-400' : 'bg-gray-900 text-gray-500'}`}>
                {pillar.id === 'ai-native' && <Brain size={20} />}
                {pillar.id === 'self-optimizing' && <Sparkles size={20} />}
                {pillar.id === 'addressing' && <Binary size={20} />}
                {pillar.id === 'routing' && <Compass size={20} />}
                {pillar.id === 'security' && <ShieldHalf size={20} />}
              </div>

              <div>
                <span className={`text-[10px] uppercase font-mono tracking-wider font-bold block ${isActive ? 'text-cyan-400' : 'text-gray-500'}`}>
                  {pillar.badge}
                </span>
                <h4 className="text-sm md:text-base font-bold font-display text-white mt-1">
                  {pillar.id === 'ai-native' ? 'AI-Native Core' :
                   pillar.id === 'self-optimizing' ? 'Self-Optimizing Delivery' :
                   pillar.id === 'addressing' ? '1024-Bit Address Space' :
                   pillar.id === 'routing' ? 'Cognitive Global Routing' :
                   'Quantum Security'}
                </h4>
                <p className="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                  {pillar.short}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Right side: Interactive Visual Details Card */}
      <div className="lg:col-span-7 bg-gray-950 rounded-2xl border border-gray-800 p-6 md:p-8 min-h-[460px] flex flex-col justify-between relative overflow-hidden">
        
        {/* Subtle decorative grid overlay */}
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
        
        {/* Animated ambient glow circles that change color based on tab */}
        <div className={`absolute -bottom-20 -right-20 w-[300px] h-[300px] rounded-full blur-[100px] opacity-20 transition-all duration-700 ${
          activePillar === 'security' ? 'bg-purple-600' : 'bg-cyan-600'
        }`} />

        <div className="relative z-10 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-900 pb-5">
            <div>
              <span className="text-[10px] tracking-widest font-mono text-cyan-400 font-bold uppercase bg-cyan-950/40 border border-cyan-500/10 px-2 py-0.5 rounded-full">
                {activePeltBadge(activePillar)}
              </span>
              <h3 className="text-xl md:text-2xl font-display font-bold text-white mt-2 leading-tight">
                {activeData.title}
              </h3>
            </div>
            {/* Massive Metric block */}
            <div className="text-left sm:text-right bg-gray-900/60 p-3 rounded-xl border border-gray-850 shrink-0 min-w-[140px]">
              <div className="text-xl md:text-2xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                {activeData.metric}
              </div>
              <div className="text-[10px] font-mono text-gray-500 uppercase mt-0.5">
                {activeData.metricLabel}
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-300 leading-relaxed">
            {activeData.description}
          </p>

          {/* Key Advantages / Bullet checkmarks */}
          <div className="space-y-3">
            <h5 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
              TECHNOLOGICAL BREAKTHROUGHS
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {activeData.benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0 shadow-[0_0_6px_#06b6d4]"></span>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live System Schematic Visualization Box */}
        <div className="relative z-10 border-t border-gray-900 pt-6 mt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-3">
            {/* Animated small visual pipeline mockup */}
            <div className="flex gap-1 h-3 items-end">
              <span className="w-1 bg-cyan-500 rounded-full animate-pulse h-1"></span>
              <span className="w-1 bg-cyan-400 rounded-full animate-pulse h-3" style={{ animationDelay: '0.2s' }}></span>
              <span className="w-1 bg-purple-500 rounded-full animate-pulse h-2" style={{ animationDelay: '0.4s' }}></span>
              <span className="w-1 bg-purple-400 rounded-full animate-pulse h-1.5" style={{ animationDelay: '0.6s' }}></span>
            </div>
            <span className="font-mono text-[11px] text-gray-400">
              Schematic Status: <strong className="text-emerald-400">NOMINAL STATE</strong>
            </span>
          </div>

          <div className="font-mono text-[10px] text-gray-500 bg-gray-900/40 px-2 py-1 rounded border border-gray-850">
            FRAME: SECURE-v8-NET
          </div>
        </div>

      </div>
    </div>
  );
}

function activePeltBadge(pill: string) {
  switch (pill) {
    case 'ai-native': return 'LAYER 3 INTELLIGENCE';
    case 'self-optimizing': return 'TELEMETRY-COGNITIVE';
    case 'addressing': return 'EXTENDED ADDR MASK';
    case 'routing': return 'LEO ORBIT LINK';
    case 'security': return 'PQ CRYPTOGRAPHY';
    default: return 'INTELLIGENT';
  }
}
