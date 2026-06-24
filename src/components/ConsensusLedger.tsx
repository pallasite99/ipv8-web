import React, { useState, useEffect, useRef } from 'react';
import { LedgerBlock, ConsensusPeer } from '../types';
import { 
  Database, 
  Network, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  Sparkles, 
  RefreshCw, 
  Check, 
  Fingerprint, 
  CheckCircle, 
  Compass, 
  Activity, 
  Plus, 
  Clock, 
  Terminal 
} from 'lucide-react';

const INITIAL_PEERS: ConsensusPeer[] = [
  { id: 'p1', name: 'LEO-STATION-ALPHA', pingMs: 14, vote: 'PENDING', coords: '45.10N / 123.40W', status: 'ONLINE' },
  { id: 'p2', name: 'GENEVA-GROUND-GW', pingMs: 22, vote: 'PENDING', coords: '46.20N / 6.14E', status: 'ONLINE' },
  { id: 'p3', name: 'TOKYO-CORE-NODE', pingMs: 19, vote: 'PENDING', coords: '35.67N / 139.65E', status: 'ONLINE' },
  { id: 'p4', name: 'MCMURDO-RELAY', pingMs: 41, vote: 'PENDING', coords: '77.84S / 166.66E', status: 'ONLINE' },
  { id: 'p5', name: 'LONDON-CORE-SWITCH', pingMs: 11, vote: 'PENDING', coords: '51.50N / 0.12W', status: 'ONLINE' }
];

const INITIAL_BLOCKS: LedgerBlock[] = [
  {
    height: 10424,
    hash: '8f2d9a1e0c4b3a...7f6d5e4c3b2a',
    prevHash: '4a3b2c1d0e9f8a...5b4c3d2e1f0a',
    timestamp: new Date(Date.now() - 15000).toLocaleTimeString(),
    epoch: 842,
    stateUpdate: 'Route optimized LEO Orbit AS-301 to Geneva GW',
    peersCount: 5,
    latencyMs: 24,
    validator: 'LEO-STATION-ALPHA'
  },
  {
    height: 10423,
    hash: '1a2b3c4d5e6f7a...8b9c0d1e2f3a',
    prevHash: '9f8e7d6c5b4a3a...2b1c0d9e8f7a',
    timestamp: new Date(Date.now() - 30000).toLocaleTimeString(),
    epoch: 841,
    stateUpdate: 'DDoS mitigation vector injected for orbital block AS-11',
    peersCount: 5,
    latencyMs: 31,
    validator: 'TOKYO-CORE-NODE'
  }
];

export default function ConsensusLedger() {
  const [blocks, setBlocks] = useState<LedgerBlock[]>(INITIAL_BLOCKS);
  const [peers, setPeers] = useState<ConsensusPeer[]>(INITIAL_PEERS);
  const [isAutoBuilding, setIsAutoBuilding] = useState(true);
  const [isBuilding, setIsBuilding] = useState(false);
  const [consensusStep, setConsensusStep] = useState<number>(0); // 0: Idle, 1: Proposing, 2: Collecting Votes, 3: Consensus Agreed, 4: Sealing Block
  const [builderLogs, setBuilderLogs] = useState<{ id: string; msg: string; type: string }[]>([
    { id: '0', msg: '⚙️ CONSENSUS-ENGINE: Sub-ledger running. Monitoring peer ping states.', type: 'info' }
  ]);
  const logsContainerRef = useRef<HTMLDivElement>(null);

  // Helper to append builder logs
  const addLog = (msg: string, type: 'info' | 'warn' | 'success' | 'danger' = 'info') => {
    setBuilderLogs(prev => [
      ...prev,
      { id: Math.random().toString(), msg: `[${new Date().toLocaleTimeString()}] ${msg}`, type }
    ]);
  };

  // Scroll logs container to bottom without scrolling parent window
  useEffect(() => {
    if (logsContainerRef.current) {
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
    }
  }, [builderLogs]);

  // Consensus cycle animation trigger
  const triggerConsensusCycle = async () => {
    if (isBuilding) return;
    setIsBuilding(true);
    setConsensusStep(1);
    
    // Step 1: Propose coordinate state update
    const randomUpdate = [
      'Refreshed ML-KEM-1024 entropy key for Tokyo peer link',
      'Cognitive routing spatial shift: bypassing AS-65413',
      'Low-Earth Orbit node validation vector AS-81 online',
      'Optimized packet queuing vectors on McMurdo microwave link',
      'Recalibrated sub-millisecond route matrices for EU gateways'
    ][Math.floor(Math.random() * 5)];

    addLog(`📢 PROP_PHASE: Proposing new routing coordinate state update: "${randomUpdate}"`, 'info');
    
    // Reset peer votes to PENDING
    setPeers(prev => prev.map(p => ({ ...p, vote: 'PENDING' })));

    // Step 2: Collecting votes
    await new Promise(resolve => setTimeout(resolve, 1500));
    setConsensusStep(2);
    addLog('🗳️ VOTE_PHASE: Broadcasting proposal to active peers. Seeking signature verification...', 'warn');

    // Simulate peer voting sequentially
    for (let i = 0; i < INITIAL_PEERS.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 400 + Math.random() * 400));
      setPeers(prev => {
        const next = [...prev];
        next[i] = { ...next[i], vote: 'VALID' };
        return next;
      });
      addLog(`✓ SIGNATURE: Peer [${INITIAL_PEERS[i].name}] verified state checksum. Latency: ${INITIAL_PEERS[i].pingMs}ms.`, 'info');
    }

    // Step 3: Consensus Agreed
    await new Promise(resolve => setTimeout(resolve, 800));
    setConsensusStep(3);
    const avgLatency = Math.round(peers.reduce((acc, p) => acc + p.pingMs, 0) / peers.length + Math.random() * 3);
    addLog(`🎉 CONSENSUS_AGREED: 100% agreement reached. Mean Peer-to-Peer Consensus Latency: ${avgLatency}ms.`, 'success');

    // Step 4: Sealing Block
    await new Promise(resolve => setTimeout(resolve, 1000));
    setConsensusStep(4);
    addLog('🔒 CRYPTO_SEAL: Forging block. Sealing cryptographic state with Keccak-256 hash envelope.', 'warn');

    // Create block
    await new Promise(resolve => setTimeout(resolve, 1000));
    const lastBlock = blocks[0];
    const newHeight = lastBlock ? lastBlock.height + 1 : 10000;
    const validatorName = peers[Math.floor(Math.random() * peers.length)].name;
    const randomHash = Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    
    const newBlock: LedgerBlock = {
      height: newHeight,
      hash: `${randomHash.substring(0, 14)}...${randomHash.substring(18, 32)}`,
      prevHash: lastBlock ? lastBlock.hash : 'genesis...0000',
      timestamp: new Date().toLocaleTimeString(),
      epoch: Math.floor(newHeight / 12),
      stateUpdate: randomUpdate,
      peersCount: peers.length,
      latencyMs: avgLatency,
      validator: validatorName
    };

    setBlocks(prev => [newBlock, ...prev.slice(0, 5)]); // limit local ledger view to last 6 blocks
    addLog(`💚 BLOCK_SEALED: Consolidated Block #${newHeight} created. Global sub-ledger synchronized successfully!`, 'success');

    // Back to idle
    setConsensusStep(0);
    setIsBuilding(false);
  };

  // Auto-trigger block proposals
  useEffect(() => {
    if (!isAutoBuilding) return;

    // Run first cycle in 3 seconds, then every 12 seconds
    const initialT = setTimeout(() => {
      triggerConsensusCycle();
    }, 4000);

    const interval = setInterval(() => {
      if (!isBuilding) {
        triggerConsensusCycle();
      }
    }, 15000);

    return () => {
      clearTimeout(initialT);
      clearInterval(interval);
    };
  }, [isAutoBuilding, isBuilding, blocks]);

  return (
    <div className="w-full rounded-2xl glass-panel border-purple-500/10 p-6 md:p-8 mt-8 text-left bg-gradient-to-b from-gray-950/90 to-gray-900/90 relative overflow-hidden">
      {/* Background aesthetics */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-4 border-b border-gray-800/80 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] tracking-widest font-mono text-purple-400 font-bold uppercase block">P2P State Synchronization</span>
            <span className="bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[9px] font-mono px-1.5 py-0.5 rounded-full flex items-center gap-1 animate-pulse">
              <Sparkles size={10} /> PHASE 3 ACTIVE
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-display font-bold text-white flex items-center gap-2">
            🔗 Decentralized State Ledger Consensus Engine
          </h3>
          <p className="text-gray-400 text-xs mt-1 max-w-2xl">
            Watch IPv8 routers dynamically coordinate routing maps, spatial telemetry coordinates, and cryptographic security handshakes peer-to-peer, bypassing centralized DNS completely.
          </p>
        </div>

        {/* Engine controls */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            id="toggle-consensus-auto-btn"
            onClick={() => setIsAutoBuilding(!isAutoBuilding)}
            className={`px-3 py-1.5 rounded border text-xs font-mono flex items-center gap-2 transition-all ${
              isAutoBuilding 
                ? 'bg-purple-500/10 border-purple-500/30 text-purple-400 font-bold' 
                : 'bg-gray-900 border-gray-800 text-gray-500'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${isAutoBuilding ? 'bg-purple-400 animate-ping' : 'bg-gray-600'}`} />
            {isAutoBuilding ? 'AUTO-PROPOSAL ACTIVE' : 'AUTO-PROPOSAL PAUSED'}
          </button>

          <button
            id="trigger-consensus-btn"
            onClick={triggerConsensusCycle}
            disabled={isBuilding}
            className={`px-3 py-1.5 rounded border text-xs font-mono flex items-center gap-1.5 transition-all ${
              isBuilding
                ? 'bg-gray-950 border-gray-900 text-gray-600 cursor-not-allowed'
                : 'bg-purple-500 hover:bg-purple-600 text-white border-transparent'
            }`}
          >
            <Plus size={14} className={isBuilding ? 'animate-spin' : ''} />
            PROPOSE STATE UPDATE
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">
        
        {/* Left Column: Peer Consensus Ring (Radar visual) */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-gray-950/40 border border-gray-800/40 p-5 rounded-xl relative overflow-hidden">
          <div className="mb-4">
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block mb-1">Peer Consensus Ring</span>
            <span className="text-xs text-gray-400 font-medium">Dynamic validation radar monitoring {peers.length} active routers.</span>
          </div>

          {/* Radar visualization using SVG */}
          <div className="h-64 flex items-center justify-center relative my-4">
            <svg className="w-60 h-60" viewBox="0 0 200 200">
              {/* Concentric rings */}
              <circle cx="100" cy="100" r="90" fill="none" stroke="#6b21a8" strokeOpacity="0.1" strokeDasharray="3 3" />
              <circle cx="100" cy="100" r="60" fill="none" stroke="#6b21a8" strokeOpacity="0.2" />
              <circle cx="100" cy="100" r="30" fill="none" stroke="#06b6d4" strokeOpacity="0.1" strokeDasharray="5 5" />

              {/* Sweeping laser arm during consensus phase */}
              {consensusStep > 0 && (
                <line 
                  x1="100" 
                  y1="100" 
                  x2={100 + 90 * Math.cos((consensusStep * 1.5) % (2 * Math.PI))} 
                  y2={100 + 90 * Math.sin((consensusStep * 1.5) % (2 * Math.PI))} 
                  stroke="#a855f7" 
                  strokeWidth="1.5" 
                  className="origin-center animate-[spin_5s_linear_infinite]"
                  style={{ transformOrigin: '100px 100px' }}
                />
              )}

              {/* Central Proposer Node */}
              <circle cx="100" cy="100" r="12" fill="#1e1b4b" stroke={consensusStep > 0 ? '#a855f7' : '#06b6d4'} strokeWidth="1.5" className="animate-pulse" />
              <text x="100" y="103" textAnchor="middle" fill="#06b6d4" fontSize="8" fontFamily="monospace" fontWeight="bold">cNAT</text>

              {/* Connecting lines & nodes for each peer */}
              {peers.map((peer, i) => {
                const angle = (i * 2 * Math.PI) / peers.length;
                const r = 80;
                const x = 100 + r * Math.cos(angle);
                const y = 100 + r * Math.sin(angle);

                return (
                  <g key={peer.id}>
                    {/* Connecting path line */}
                    <line 
                      x1="100" 
                      y1="100" 
                      x2={x} 
                      y2={y} 
                      stroke={peer.vote === 'VALID' ? '#a855f7' : '#374151'} 
                      strokeOpacity={peer.vote === 'VALID' ? '0.6' : '0.3'}
                      strokeWidth={peer.vote === 'VALID' ? '1.5' : '1'} 
                    />
                    
                    {/* Pulsing ring if voting */}
                    {consensusStep === 2 && peer.vote === 'PENDING' && (
                      <circle cx={x} cy={y} r="10" fill="none" stroke="#eab308" strokeWidth="1" className="animate-ping" />
                    )}

                    {/* Peer Node */}
                    <circle 
                      cx={x} 
                      cy={y} 
                      r="7" 
                      fill={
                        peer.vote === 'VALID' ? '#1e1b4b' : 
                        consensusStep === 2 ? '#422006' : '#111827'
                      } 
                      stroke={
                        peer.vote === 'VALID' ? '#a855f7' : 
                        consensusStep === 2 ? '#eab308' : '#4b5563'
                      } 
                      strokeWidth="1.5" 
                    />

                    {/* Text initials of the node inside node or adjacent */}
                    <text 
                      x={x} 
                      y={y + 16} 
                      textAnchor="middle" 
                      fill={peer.vote === 'VALID' ? '#a855f7' : '#9ca3af'} 
                      fontSize="6" 
                      fontFamily="monospace"
                    >
                      {peer.name.substring(0, 11)}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Float HUD statuses overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {consensusStep === 1 && (
                <span className="bg-purple-950/90 border border-purple-500/40 text-purple-400 font-mono text-[9px] px-2 py-1 rounded animate-pulse font-bold">
                  PROPOSAL BROADCAST
                </span>
              )}
              {consensusStep === 2 && (
                <span className="bg-amber-950/90 border border-amber-500/40 text-amber-400 font-mono text-[9px] px-2 py-1 rounded animate-pulse font-bold">
                  VOTE COLLATING...
                </span>
              )}
              {consensusStep === 3 && (
                <span className="bg-emerald-950/90 border border-emerald-500/40 text-emerald-400 font-mono text-[9px] px-2 py-1 rounded animate-bounce font-bold">
                  CONSENSUS REACHED
                </span>
              )}
              {consensusStep === 4 && (
                <span className="bg-cyan-950/90 border border-cyan-500/40 text-cyan-400 font-mono text-[9px] px-2 py-1 rounded animate-pulse font-bold">
                  SEALING BLOCK...
                </span>
              )}
            </div>
          </div>

          {/* Peers status details list */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            {peers.map(peer => (
              <div key={peer.id} className="p-1.5 rounded bg-black/40 border border-gray-900 flex justify-between items-center text-[9px] font-mono">
                <div className="flex items-center gap-1.5 truncate">
                  <span className={`w-1.5 h-1.5 rounded-full ${peer.status === 'ONLINE' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                  <span className="text-gray-400 truncate" title={peer.name}>{peer.name}</span>
                </div>
                <span className={peer.vote === 'VALID' ? 'text-purple-400 font-bold' : 'text-amber-500 animate-pulse'}>
                  {peer.vote}
                </span>
              </div>
            ))}
          </div>

        </div>

        {/* Right Column: Visual Ledger & Active Block Builder */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Active Block Builder HUD Console */}
          <div className="bg-black/60 border border-gray-800 rounded-xl p-4 font-mono text-[10px] flex flex-col justify-between h-44 relative shadow-inner">
            <div className="flex justify-between items-center border-b border-gray-900 pb-2 mb-2">
              <div className="flex items-center gap-1.5">
                <Terminal className="text-purple-400" size={12} />
                <span className="text-gray-400">ACTIVE PROPOSER CONSENSUS VERBOSE</span>
              </div>
              <span className="text-[8px] px-1.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-gray-500">
                PROTOCOL: P2P_LATENCY_SEAL_v1.0
              </span>
            </div>

            {/* Terminal logs body */}
            <div 
              ref={logsContainerRef}
              className="flex-1 overflow-y-auto whitespace-pre-wrap leading-tight space-y-1 select-all pr-1 scrollbar-thin"
            >
              {builderLogs.map(log => (
                <div key={log.id} className="flex gap-2">
                  <span className={
                    log.type === 'danger' ? 'text-red-400 font-bold' :
                    log.type === 'warn' ? 'text-amber-400' :
                    log.type === 'success' ? 'text-emerald-400 font-semibold' : 'text-purple-300'
                  }>
                    {log.msg}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-2 pt-2 border-t border-gray-900/60 flex justify-between items-center text-[8px] text-gray-600 uppercase select-none">
              <span>ACTIVE POOL: {peers.length} VERIFIERS</span>
              <span>STATE: {consensusStep === 0 ? 'IDLE' : 'VOTING'}</span>
            </div>
          </div>

          {/* Proof-of-Latency Visual Ledger Scrolling Cards */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block">CONSOLIDATED COORDINATE LEDGER</span>
              <span className="text-[9px] font-mono text-cyan-400 flex items-center gap-1">
                <Database size={10} /> Active Height: #{blocks[0]?.height || 0}
              </span>
            </div>

            {/* Horizontal Timeline Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {blocks.slice(0, 4).map((block, i) => (
                <div 
                  key={block.height}
                  className={`p-4 rounded-xl border bg-gray-950/50 transition-all duration-500 relative overflow-hidden flex flex-col justify-between h-40 ${
                    i === 0 
                      ? 'border-purple-500/40 shadow-lg shadow-purple-500/5 bg-gradient-to-br from-purple-950/10 to-gray-950/80 animate-fade-in' 
                      : 'border-gray-900 opacity-80 hover:opacity-100 hover:border-gray-800'
                  }`}
                >
                  {/* Ledger header */}
                  <div className="flex justify-between items-start border-b border-gray-900 pb-1.5 mb-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <Layers size={10} className="text-purple-400" />
                        <span className="text-xs font-mono font-bold text-white">BLOCK #{block.height}</span>
                      </div>
                      <span className="text-[8px] font-mono text-gray-600 block mt-0.5">EPOCH {block.epoch}</span>
                    </div>
                    {i === 0 && (
                      <span className="bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[8px] font-mono px-1.5 py-0.5 rounded-full flex items-center gap-1 animate-pulse font-bold">
                        ★ RECENTLY SEALED
                      </span>
                    )}
                  </div>

                  {/* Ledger coordinate update details */}
                  <div className="flex-1">
                    <p className="text-[11px] font-mono text-cyan-300 font-medium leading-normal line-clamp-2">
                      {block.stateUpdate}
                    </p>
                  </div>

                  {/* Ledger details metadata footer */}
                  <div className="border-t border-gray-900/60 pt-2 mt-2 space-y-1 text-[9px] font-mono text-gray-500">
                    <div className="flex justify-between">
                      <span>Proposing Leader:</span>
                      <span className="text-gray-300 font-semibold">{block.validator}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Hash Envelope:</span>
                      <span className="text-purple-400/80 font-semibold select-all truncate max-w-[120px]" title={block.hash}>
                        {block.hash}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Consensus Speed:</span>
                      <span className="text-emerald-400 font-bold">{block.latencyMs}ms</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
