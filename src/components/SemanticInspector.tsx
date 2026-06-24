import React from 'react';
import { Cpu, Activity } from 'lucide-react';

interface SelectedPacket {
  id: number;
  path: number;
  x: number;
  color: string;
}

interface PacketDetails {
  legacy: {
    src: string;
    dst: string;
    proto: string;
    ports: string;
    hops: string;
    ttl: string;
    table: string;
    latency: string;
  };
  ipv8: {
    hash: string;
    vector: string;
    intent: string;
    cipher: string;
    hops: string;
    bypass: string;
    latency: string;
  };
}

interface SemanticInspectorProps {
  selectedPacket: SelectedPacket | null;
  isPaused: boolean;
  setIsPaused: (val: boolean) => void;
  bitstream: string[];
  packetDetails: PacketDetails | null;
}

export default function SemanticInspector({
  selectedPacket,
  isPaused,
  setIsPaused,
  bitstream,
  packetDetails
}: SemanticInspectorProps) {
  return (
    <div className="bg-gray-950/80 rounded-xl border border-gray-800/80 p-6 relative overflow-hidden text-left shadow-2xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 pb-3 border-b border-gray-900">
        <div className="flex items-center gap-2">
          <Cpu className="text-cyan-400 animate-pulse" size={18} />
          <h4 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
            🔬 Deep Packet Analysis (DPA) View
          </h4>
        </div>
        <div className="flex items-center gap-3">
          <button
            id="pause-sim-btn"
            onClick={() => setIsPaused(!isPaused)}
            className={`px-2.5 py-1 text-[10px] font-mono rounded border flex items-center gap-1.5 transition-all ${
              isPaused
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 font-bold'
                : 'bg-gray-900 border-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isPaused ? 'bg-amber-400 animate-pulse' : 'bg-green-400'}`} />
            {isPaused ? 'RESUME SIMULATION' : 'PAUSE SIMULATION'}
          </button>
          <span className="text-[10px] font-mono text-gray-500 uppercase">
            Status: <span className={isPaused ? 'text-amber-400 font-bold' : 'text-green-400'}>{isPaused ? 'Paused' : 'Monitoring'}</span>
          </span>
        </div>
      </div>

      {!selectedPacket || !packetDetails ? (
        <div className="h-44 flex flex-col items-center justify-center text-center text-gray-500 border border-dashed border-gray-900 rounded-lg bg-gray-950/40">
          <Activity className="text-cyan-500/20 animate-pulse mb-2" size={32} />
          <span className="text-xs font-mono font-semibold text-gray-400">cNAT Header Capture Engaged</span>
          <p className="text-[11px] text-gray-600 max-w-sm mt-1">
            Click on any active packet in the routing tracks above to freeze and inspect its full headers.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Live Decrypt stream on the left */}
          <div className="md:col-span-4 bg-black/50 border border-gray-900 rounded-lg p-3 font-mono text-[10px] flex flex-col h-44 overflow-hidden relative shadow-inner">
            <div className="text-cyan-400 font-bold mb-1 border-b border-gray-900 pb-1 flex justify-between">
              <span>[DEC_STREAM_HUD]</span>
              <span className="animate-pulse">● LIVE</span>
            </div>
            <div className="text-gray-500 flex-1 overflow-y-auto whitespace-pre leading-tight scrollbar-thin">
              {bitstream.map((line, i) => (
                <div key={i} className={i === bitstream.length - 1 ? 'text-cyan-300' : ''}>
                  {line}
                </div>
              ))}
            </div>
            <div className="absolute bottom-1 right-2 text-[8px] text-gray-600 uppercase">
              packet ID: {selectedPacket.id}
            </div>
          </div>

          {/* Comparison matrix on the right */}
          <div className="md:col-span-8 flex flex-col justify-between">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Legacy */}
              <div className="p-3 rounded-lg border bg-red-950/5 border-red-500/10 hover:border-red-500/20 transition-all">
                <div className="flex justify-between items-center mb-2 border-b border-red-500/10 pb-1">
                  <span className="text-[10px] font-mono font-bold text-red-400 uppercase">Legacy Header</span>
                  <span className="text-[9px] font-mono text-red-500">Plaintext</span>
                </div>
                <div className="space-y-1.5 font-mono text-[10px]">
                  <div className="flex justify-between"><span className="text-gray-500">Source IP:</span> <span className="text-red-300">{packetDetails.legacy.src}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Dest IP:</span> <span className="text-red-300">{packetDetails.legacy.dst}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Protocol:</span> <span className="text-red-300">{packetDetails.legacy.proto}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Ports:</span> <span className="text-red-300">{packetDetails.legacy.ports}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Hops / TTL:</span> <span className="text-red-300">{packetDetails.legacy.hops} / {packetDetails.legacy.ttl}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">BGP Queue:</span> <span className="text-red-400 font-semibold">{packetDetails.legacy.table}</span></div>
                </div>
              </div>

              {/* IPv8 */}
              <div className="p-3 rounded-lg border bg-cyan-950/5 border-cyan-500/10 hover:border-cyan-500/20 transition-all">
                <div className="flex justify-between items-center mb-2 border-b border-cyan-500/10 pb-1">
                  <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase">IPv8 Header</span>
                  <span className="text-[9px] font-mono text-emerald-400 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" /> ML-KEM-1024
                  </span>
                </div>
                <div className="space-y-1.5 font-mono text-[10px]">
                  <div className="flex justify-between"><span className="text-gray-500">Context Hash:</span> <span className="text-cyan-300 truncate max-w-[120px]" title={packetDetails.ipv8.hash}>{packetDetails.ipv8.hash}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Space Vector:</span> <span className="text-cyan-300">{packetDetails.ipv8.vector}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Intent Class:</span> <span className="text-purple-300 font-semibold">{packetDetails.ipv8.intent}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Security Key:</span> <span className="text-cyan-300 truncate max-w-[120px]" title={packetDetails.ipv8.cipher}>{packetDetails.ipv8.cipher}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Orbit Hops:</span> <span className="text-cyan-300">{packetDetails.ipv8.hops}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Bypass Tech:</span> <span className="text-emerald-400 font-semibold">{packetDetails.ipv8.bypass}</span></div>
                </div>
              </div>
            </div>

            {/* Latency Summary */}
            <div className="mt-3 text-[10px] font-mono text-gray-500 flex flex-col sm:flex-row justify-between items-center bg-gray-900/30 p-2 rounded border border-gray-900 gap-2">
              <span>Latency Comparison: <strong className="text-red-400">{packetDetails.legacy.latency}</strong> vs <strong className="text-cyan-400">{packetDetails.ipv8.latency}</strong></span>
              <span className="text-emerald-400">cNAT Acceleration: +{(parseFloat(packetDetails.legacy.latency) / parseFloat(packetDetails.ipv8.latency)).toFixed(1)}x</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
