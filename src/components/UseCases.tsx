import React, { useState } from 'react';
import { Network, Car, Factory, Globe, Shield, Rocket, Server, Building2 } from 'lucide-react';

interface UseCase {
  id: string;
  title: string;
  icon: React.ElementType;
  brief: string;
  longDesc: string;
  metric: string;
  metricLabel: string;
  latencySaved: string;
  nodesConnected: string;
  securityRating: string;
}

export default function UseCases() {
  const [activeId, setActiveId] = useState('enterprise-ai');

  const cases: UseCase[] = [
    {
      id: 'enterprise-ai',
      title: 'Enterprise AI Networks',
      icon: Network,
      brief: 'Real-time synchronization of decentralized large language model states across global clusters.',
      longDesc: 'Enterprise operations rely on high-frequency weights syncing. IPv8 uses smart multicast pipelines to stream neural increments to over 10,000 global edge shards concurrently, bypassing localized firewalls and reducing state divergence by over 80%.',
      metric: '0.4ms',
      metricLabel: 'Sync Delay Target',
      latencySaved: '72% Lower',
      nodesConnected: '500k+ Shards',
      securityRating: 'Quantum Shielded'
    },
    {
      id: 'autonomous-transport',
      title: 'Autonomous Transportation',
      icon: Car,
      brief: 'Sub-millisecond V2X (Vehicle-to-Everything) communication grids with space fallback.',
      longDesc: 'Autonomous vehicle safety requires absolute routing guarantees. IPv8 unifies terrestrial 5G/6G grids and Low Earth Orbit (LEO) satellite routing under a single addressing space, keeping vehicle telemetry flowing with zero handover delay.',
      metric: '99.99999%',
      metricLabel: 'Safety Link Uptime',
      latencySaved: '60% Lower',
      nodesConnected: '12M+ Vehicles',
      securityRating: 'ASIL-D Certified'
    },
    {
      id: 'industrial-iot',
      title: 'Industrial IoT & Robotics',
      icon: Factory,
      brief: 'Ultra-low latency control networks connecting millions of heavy actuators and smart sensors.',
      longDesc: 'Factory floors utilize IPv8 for real-time robotic coordination. By embedding low-level command loops directly inside the IPv8 contextual header, PLC controls bypass traditional translation stacks, reducing mechanical drift and heat.',
      metric: '40%',
      metricLabel: 'Reduced Power Draw',
      latencySaved: '55% Lower',
      nodesConnected: '400M+ Devices',
      securityRating: 'Hardware-Assigned'
    },
    {
      id: 'smart-cities',
      title: 'Smart Cities & Grids',
      icon: Building2,
      brief: 'Autonomous municipal mesh grids balancing load, traffic, and clean energy distribution.',
      longDesc: 'Smart cities utilize IPv8 to secure and optimize municipal meters, street grid sensors, and water valves. Individual neighborhood grids dynamically cluster and self-heal in the event of hardware failure.',
      metric: '60%',
      metricLabel: 'Grid Load Balance',
      latencySaved: '45% Lower',
      nodesConnected: '1.2B+ Sensors',
      securityRating: 'NIST Encrypted'
    },
    {
      id: 'cloud-computing',
      title: 'Distributed Cloud Networks',
      icon: Server,
      brief: 'Hyper-scalable, borderless multi-tenant virtualization layers for extreme cloud computing.',
      longDesc: 'Unify AWS, Google Cloud, Azure, and local bare-metal edge regions into a single seamless overlay. Applications communicate directly over a private v8 backplane, avoiding complex NAT routers and virtual private clouds (VPCs).',
      metric: '2.5 Tbps',
      metricLabel: 'Inter-Cloud Backplane',
      latencySaved: '68% Lower',
      nodesConnected: '40k+ Sub-nets',
      securityRating: 'Zero-Trust Tunnel'
    },
    {
      id: 'space-comms',
      title: 'Space & Satellite Networks',
      icon: Rocket,
      brief: 'Direct routing across Low Earth Orbit constellations, orbital arrays, and land receivers.',
      longDesc: 'IPv8 natively handles physical motion. Space routing layers use adaptive orbital coordinate addressing rather than hardcoded physical paths. A packet sent to a moving satellite automatically follows the path of least gravity resistance.',
      metric: '32,000 km',
      metricLabel: 'Max Active Range',
      latencySaved: '50% Lower',
      nodesConnected: '4,500 Satellites',
      securityRating: 'Radiation-Hard'
    },
    {
      id: 'defense-networks',
      title: 'Defense & Secure Systems',
      icon: Shield,
      brief: 'EMP-hardened, self-healing communication overlays with post-quantum military encryption.',
      longDesc: 'For national defense, IPv8 offers decentralized, zero-dependency communication networks. In the event of catastrophic landline loss, tactical units construct peer-to-peer cognitive tunnels utilizing any available satellite wave band.',
      metric: '0.0s',
      metricLabel: 'Disruption Handover',
      latencySaved: '80% Lower',
      nodesConnected: 'Classified',
      securityRating: 'Type-1 NSA Equivalent'
    },
    {
      id: 'global-comms',
      title: 'Global Telecommunications',
      icon: Globe,
      brief: 'Consumer mobile carrier backhaul routing optimized for planetary high-definition audio/video.',
      longDesc: 'Telecom backbones operate 40% faster on IPv8. Voice packets get localized routing priority tags, resolving static jitter, echoing, and cross-ocean echo artifacts in premium teleconferencing systems.',
      metric: '4K Sync',
      metricLabel: 'Audio-Visual Sync Rate',
      latencySaved: '65% Lower',
      nodesConnected: '4.2B+ Handsets',
      securityRating: 'Kyber Standard'
    }
  ];

  const activeCase = cases.find(c => c.id === activeId) || cases[0];
  const ActiveIcon = activeCase.icon;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-12 text-left">
      
      {/* Tab Menu - Left Column */}
      <div className="lg:col-span-5 flex flex-col gap-2 max-h-[500px] overflow-y-auto pr-2">
        {cases.map((item) => {
          const ItemIcon = item.icon;
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              id={`usecase-tab-${item.id}`}
              onClick={() => setActiveId(item.id)}
              className={`p-3.5 rounded-xl text-left border flex items-center gap-3.5 transition-all shrink-0 ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-950/20 to-gray-950 border-cyan-500/20'
                  : 'bg-gray-950/20 border-gray-950 hover:border-gray-800 hover:bg-gray-900/10'
              }`}
            >
              <div className={`p-2 rounded-lg ${isActive ? 'bg-cyan-500/10 text-cyan-400' : 'bg-gray-900 text-gray-500'}`}>
                <ItemIcon size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-gray-200 truncate font-display">{item.title}</h4>
                <p className="text-[11px] text-gray-500 truncate mt-0.5">{item.brief}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Diagnostic Dashboard - Right Column */}
      <div className="lg:col-span-7 bg-gray-950 rounded-2xl border border-gray-850 p-6 md:p-8 flex flex-col justify-between relative overflow-hidden min-h-[460px]">
        
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />

        <div className="relative z-10 space-y-6">
          {/* Header block with Icon */}
          <div className="flex items-center gap-4 border-b border-gray-900 pb-5">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <ActiveIcon size={24} />
            </div>
            <div>
              <span className="text-[10px] tracking-widest font-mono text-cyan-400 font-bold uppercase">USE CASE ASSESSMENT</span>
              <h3 className="text-xl md:text-2xl font-display font-bold text-white mt-1">
                {activeCase.title}
              </h3>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-300 leading-relaxed">
            {activeCase.longDesc}
          </p>

          {/* Diagnostic metrics bento grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            
            <div className="bg-gray-900/60 p-4 rounded-xl border border-gray-850">
              <div className="text-[10px] font-mono text-gray-500 uppercase">Target SLA Metric</div>
              <div className="text-lg font-mono font-bold text-cyan-400 mt-1">{activeCase.metric}</div>
              <div className="text-[9px] text-gray-500 mt-0.5">{activeCase.metricLabel}</div>
            </div>

            <div className="bg-gray-900/60 p-4 rounded-xl border border-gray-850">
              <div className="text-[10px] font-mono text-gray-500 uppercase">Latency Reduction</div>
              <div className="text-lg font-mono font-bold text-purple-400 mt-1">{activeCase.latencySaved}</div>
              <div className="text-[9px] text-gray-500 mt-0.5">VS standard IPv6</div>
            </div>

            <div className="bg-gray-900/60 p-4 rounded-xl border border-gray-850 col-span-2 sm:col-span-1">
              <div className="text-[10px] font-mono text-gray-500 uppercase">Mesh Capacity</div>
              <div className="text-lg font-mono font-bold text-gray-100 mt-1">{activeCase.nodesConnected}</div>
              <div className="text-[9px] text-gray-500 mt-0.5">Active edge clusters</div>
            </div>

          </div>
        </div>

        {/* Live Security Stamp */}
        <div className="relative z-10 border-t border-gray-900 pt-6 mt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-mono">
          <div className="text-gray-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block shadow-[0_0_6px_#10b981]"></span>
            <span>Handshake Standard:</span>
            <span className="text-gray-200 font-bold">{activeCase.securityRating}</span>
          </div>

          <div className="text-[10px] text-gray-500 uppercase bg-gray-900/40 px-2 py-1 rounded border border-gray-850">
            SECURE ROUTE VERIFIED
          </div>
        </div>

      </div>
    </div>
  );
}
