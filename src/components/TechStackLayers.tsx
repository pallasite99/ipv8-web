import React, { useState } from 'react';
import { Layers, ChevronDown, CheckCircle2, RefreshCw, Activity } from 'lucide-react';

interface StackLayer {
  id: string;
  name: string;
  shortDesc: string;
  longDesc: string;
  status: 'active' | 'synced' | 'optimizing';
  metric: string;
  subSystems: string[];
}

export default function TechStackLayers() {
  const [activeLayerId, setActiveLayerId] = useState<string | null>('ai-intel');

  const layers: StackLayer[] = [
    {
      id: 'app-layer',
      name: '7. Application Layer',
      shortDesc: 'Supports autonomous AI agent handshakes, telemetry streams, and high-performance cross-border gRPC targets.',
      longDesc: 'The user-facing entry point of the protocol. Fully compliant with modern REST, WebTransport, and gRPC endpoints, introducing standard "ipv8://" URIs that enable any machine-learning agent to request native context tunnels.',
      status: 'active',
      metric: '4.2B tx/sec',
      subSystems: ['gRPC-over-v8', 'WASM Client Hooks', 'Warp-SaaS API Core', 'Intelligent URI Resolver']
    },
    {
      id: 'ai-intel',
      name: '6. AI Intelligence Layer',
      shortDesc: 'Executes lightweight sub-millisecond local neural inference to evaluate optimal transit trajectories.',
      longDesc: 'The neural engine of IPv8. Every packet is routed based on localized, small-scale context models that run directly inside the edge switch firmware. This predicts regional fiber congestion, cloud backplanes, and space-grid orbits.',
      status: 'optimizing',
      metric: '0.8ms Inference',
      subSystems: ['Routing-Weights-v2', 'Congestion Classifier', 'Adaptive Packet Balancer', 'Heuristic Matrix Resolver']
    },
    {
      id: 'routing-eng',
      name: '5. Cognitive Routing Engine',
      shortDesc: 'Manages terrestrial-to-orbital data split, executing dynamic multi-path packet multiplexing.',
      longDesc: 'Translates high-level destination addresses into actual physical trajectories. Supports seamless packet-level multiplexing, sending high-priority agent sync frames over satellite networks while streaming bulk file transfers through submarine cables.',
      status: 'active',
      metric: '1.4 PetaBytes/sec',
      subSystems: ['Orbital Multi-path Multiplexer', 'Self-Healing Topology Mesh', 'Sub-millisecond Packet Diverter']
    },
    {
      id: 'security-fab',
      name: '4. Security Fabric',
      shortDesc: 'Post-quantum key encapsulation (ML-KEM-1024) and identity handshake mechanisms.',
      longDesc: 'Natively integrates post-quantum encryption into layer 3. Generates ephemeral key pairs for each active packet stream. Hardware Security Modules (HSM) authenticate edge clients prior to address block allocation.',
      status: 'synced',
      metric: 'ML-KEM-1024 / Kyber',
      subSystems: ['Kyber Cryptographic Envelope', 'Dilithium Signature Verify', 'Hardware Anchor Validator', 'Session Ephemeral Keys']
    },
    {
      id: 'control-plane',
      name: '3. Global Control Plane',
      shortDesc: 'Decentralized spatial coordinate registers and sovereign sub-net delegation structures.',
      longDesc: 'Manages the global mapping of 1024-bit IP addresses. Replaces centralized ICANN databases with a high-performance distributed hash table (DHT) running on high-availability edge servers globally.',
      status: 'active',
      metric: 'DHT Sync < 1.2s',
      subSystems: ['Decentralized Address Registry', 'Sovereign Sub-net Delegate', 'Coordinate-Based Spatial Index']
    },
    {
      id: 'edge-orch',
      name: '2. Edge Orchestration Layer',
      shortDesc: 'Automates micro-gateway daemons and low-level WebAssembly proxies running at cell towers.',
      longDesc: 'Handles local device handoffs and cellular edge routing. Lightweight micro-gateway proxies reside in local cell towers, routing IoT streams from local grids to regional satellite arrays.',
      status: 'active',
      metric: '45KB Gateway Footprint',
      subSystems: ['IPv8-Edge-Daemon', 'WASM Packet Refactor', 'Hardware Kernel Driver', 'Local Cellular Handshake']
    },
    {
      id: 'phys-infra',
      name: '1. Physical Infrastructure Layer',
      shortDesc: 'Global fiber optics, orbital satellite arrays, and metropolitan carrier edge routers.',
      longDesc: 'The physical backbone. Integrates transoceanic fiber, global carrier terminals, private cloud backbone pipelines, and Low Earth Orbit (LEO) satellite links into a single, cohesive, software-defined space-to-earth physical carrier grid.',
      status: 'active',
      metric: 'Terrestrial & Orbital Fiber',
      subSystems: ['Subsea Optic Arrays', 'LEO Laser Satellite Mesh', 'Tier-1 Carrier Grid Interfaces', 'Modular Rack Switch v8']
    }
  ];

  const toggleLayer = (id: string) => {
    setActiveLayerId(activeLayerId === id ? null : id);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 text-left space-y-4">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-[10px] tracking-widest font-mono text-cyan-400 font-bold uppercase">Modular Architecture</span>
        <h3 className="text-2xl md:text-3xl font-display font-bold text-white mt-2">The IPv8 Integrated Stack</h3>
        <p className="text-gray-400 text-sm mt-2">
          Click on any architectural layer to expand its technical subsystems, real-time operating parameters, and active routing engines.
        </p>
      </div>

      <div className="space-y-3.5">
        {layers.map((layer) => {
          const isOpen = activeLayerId === layer.id;
          return (
            <div
              key={layer.id}
              className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? 'bg-gradient-to-r from-gray-950 to-cyan-950/15 border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.05)]'
                  : 'bg-gray-950/60 border-gray-850 hover:border-gray-800'
              }`}
            >
              {/* Trigger Button */}
              <button
                id={`techstack-btn-${layer.id}`}
                onClick={() => toggleLayer(layer.id)}
                className="w-full p-5 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  {/* Left Layer Icon indicator */}
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                    isOpen ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400' : 'bg-gray-900 border-gray-800 text-gray-500'
                  }`}>
                    <Layers size={15} />
                  </div>
                  <div>
                    <h4 className="text-sm md:text-base font-bold font-display text-white">
                      {layer.name}
                    </h4>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed max-w-xl">
                      {layer.shortDesc}
                    </p>
                  </div>
                </div>

                {/* Status badges */}
                <div className="flex items-center gap-3 shrink-0 ml-12 sm:ml-0">
                  <span className="text-[10px] font-mono bg-gray-900 border border-gray-800 px-2 py-0.5 rounded text-gray-400">
                    {layer.metric}
                  </span>
                  
                  {/* Status Bulb */}
                  <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      layer.status === 'active' ? 'bg-emerald-500 shadow-[0_0_6px_#10b981]' :
                      layer.status === 'synced' ? 'bg-blue-500 shadow-[0_0_6px_#3b82f6]' :
                      'bg-amber-500 shadow-[0_0_6px_#f59e0b]'
                    }`} />
                    <span className="text-[10px] font-mono text-gray-500 uppercase select-none">
                      {layer.status}
                    </span>
                  </div>

                  <ChevronDown
                    size={16}
                    className={`text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-cyan-400' : ''}`}
                  />
                </div>
              </button>

              {/* Expandable Panel */}
              {isOpen && (
                <div className="px-5 pb-6 pt-2 border-t border-gray-900 bg-gray-950/80 grid grid-cols-1 md:grid-cols-12 gap-6 transition-all">
                  
                  <div className="md:col-span-7 space-y-3">
                    <h5 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
                      Functional Details
                    </h5>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      {layer.longDesc}
                    </p>
                  </div>

                  <div className="md:col-span-5 space-y-3">
                    <h5 className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest">
                      Sub-Systems Running
                    </h5>
                    <div className="grid grid-cols-1 gap-2">
                      {layer.subSystems.map((sys, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-gray-400 font-mono">
                          <CheckCircle2 size={11} className="text-cyan-500" />
                          <span>{sys}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
