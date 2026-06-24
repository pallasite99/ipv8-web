import React, { useState, useEffect } from 'react';
import { X, BookOpen, Download, Copy, Check, ChevronRight } from 'lucide-react';

interface WhitepaperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WhitepaperModal({ isOpen, onClose }: WhitepaperModalProps) {
  const [activeChapter, setActiveChapter] = useState('intro');
  const [copied, setCopied] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const chapters = [
    {
      id: 'intro',
      title: '1. Introduction & Executive Summary',
      content: `The modern internet protocol suite (IPv4 and IPv6) was engineered for deterministic client-server requests. Routing topology has historically assumed static physical nodes, terrestrial links, and slow table handovers (via BGP and OSPF). 

The emergence of decentralized machine intelligence, autonomous drone networks, high-density IoT, and Low Earth Orbit (LEO) satellite communications has pushed standard IP architectures past their limits. Common pain points include BGP routing storms, high handoff latency, redundant frame headers, and cryptographic obsolescence in a post-quantum computing era.

IPv8 introduces an intelligent, cognitive layer-3 packet transport system that embeds micro-inference weights directly inside packet headers. Rather than treating routes as static hardcoded links, IPv8 considers routing paths as dynamic trajectories modeled autonomously by localized routing nodes in real-time.`
    },
    {
      id: 'address',
      title: '2. The 1024-Bit Semantic Address Map',
      content: `Unlike IPv6 (128-bit) and IPv4 (32-bit), an IPv8 address spans 1024 bits. This massive scale is structured into multi-dimensional fields designed for high-context routing:

- Device Cryptographic Signature (256 bits): A hardware-anchored secure identifier.
- AI Context Weight Descriptor (512 bits): A semantic representation of the packet content, priority class, and target agent capabilities.
- Orbital & Terrestrial Coordinates (256 bits): A dynamic spatial coordinate system mapped using three-dimensional planetary vectors.

This address layout permits stateless packet resolution. A router does not require massive lookups; it performs a local dot-product calculation between the packet context weights and its neighbor routing capability indexes.`
    },
    {
      id: 'routing',
      title: '3. Cognitive Path Multiplexing',
      content: `IPv8 treats packet routing as a continuous optimization problem. The path calculation follows a predictive model:

P_opt = argmin ( L_t * C_t + E_t * P_t )

Where:
- L_t represents the predicted link latency.
- C_t represents packet priority weight.
- E_t represents the energetic cost of transit (watts per gigabyte).
- P_t represents the congestion threat index.

Local switches running lightweight WebAssembly (WASM) neural micro-models continuously adjust neighbor node scores, executing lightning-fast route diversions around congested regions in microseconds.`
    },
    {
      id: 'crypto',
      title: '4. Post-Quantum Security Fabric',
      content: `Passive network eavesdropping presents a fatal vulnerability for autonomous systems. IPv8 resolves this by integrating post-quantum cryptography natively at Layer 3.

All connections utilize ML-KEM-1024 (Kyber) and ML-DSA-87 (Dilithium) to establish ephemeral, self-expiring transit tunnels. The identity of every edge agent is confirmed before packet delivery begins, protecting critical enterprise infrastructures from spoofing and man-in-the-middle attacks.`
    }
  ];

  const handleCopyChapter = () => {
    const text = chapters.find(c => c.id === activeChapter)?.content || '';
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="whitepaper-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-5xl h-[85vh] md:h-[85vh] bg-gray-950 border border-gray-800 rounded-2xl flex flex-col md:flex-row overflow-y-auto md:overflow-hidden shadow-2xl">
        
        {/* Left Side: Chapters List Drawer */}
        <div className="w-full md:w-80 bg-gray-900/60 border-b md:border-b-0 md:border-r border-gray-800 flex flex-col justify-between shrink-0">
          <div>
            <div className="p-5 border-b border-gray-850 flex items-center gap-2.5">
              <BookOpen size={18} className="text-cyan-400" />
              <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display">Technical Spec</h4>
            </div>

            <div className="p-3 space-y-1">
              {chapters.map((ch) => (
                <button
                  key={ch.id}
                  id={`whitepaper-chapter-${ch.id}`}
                  onClick={() => setActiveChapter(ch.id)}
                  className={`w-full p-3 rounded-lg text-left text-xs font-mono transition-all flex items-center justify-between ${
                    activeChapter === ch.id
                      ? 'bg-cyan-500/10 text-cyan-400 font-bold border border-cyan-500/20'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-gray-900'
                  }`}
                >
                  <span className="truncate">{ch.title}</span>
                  <ChevronRight size={12} className={activeChapter === ch.id ? 'text-cyan-400' : 'text-gray-600'} />
                </button>
              ))}
            </div>
          </div>

          {/* Footer of sidebar */}
          <div className="p-4 border-t border-gray-850 bg-gray-950">
            <button
              id="whitepaper-download-pdf"
              onClick={() => alert("Simulation download: 'IPv8_Whitepaper_v1.4.pdf' saved to local device!")}
              className="w-full py-2 bg-cyan-500 hover:bg-cyan-600 text-gray-950 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all"
            >
              <Download size={13} />
              <span>Download PDF (4.2 MB)</span>
            </button>
          </div>
        </div>

        {/* Right Side: Chapter Reading Pane */}
        <div className="flex-1 flex flex-col min-w-0">
          
          {/* Reader Top Bar */}
          <div className="p-4 border-b border-gray-850 flex items-center justify-between bg-gray-950">
            <span className="text-[10px] font-mono text-gray-500 uppercase">
              REVISION 1.4.12 • JUNE 2026
            </span>
            
            <div className="flex items-center gap-3">
              <button
                id="whitepaper-copy-chapter"
                onClick={handleCopyChapter}
                className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-900 border border-gray-850 rounded transition-all"
                title="Copy Chapter text"
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              </button>
              <button
                id="whitepaper-close-modal"
                onClick={onClose}
                className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-900 border border-gray-850 rounded transition-all"
              >
                <X size={15} />
              </button>
            </div>
          </div>

          {/* Reading Pane Content */}
          <div className="p-6 md:p-8 overflow-y-visible md:overflow-y-auto flex-1 text-left prose prose-invert max-w-none">
            <h3 className="text-lg md:text-xl font-display font-bold text-white border-b border-gray-900 pb-4 mb-6">
              {chapters.find(c => c.id === activeChapter)?.title}
            </h3>

            <div className="text-sm text-gray-300 leading-relaxed space-y-4 whitespace-pre-wrap font-sans">
              {chapters.find(c => c.id === activeChapter)?.content}
            </div>

            {/* Simulated Architecture Diagrams in Whitepaper */}
            {activeChapter === 'address' && (
              <div className="mt-8 p-4 bg-gray-900/40 rounded-xl border border-gray-850 font-mono text-[10px] leading-snug text-gray-400 space-y-2">
                <div className="text-center text-cyan-400 font-bold border-b border-gray-800 pb-2 mb-2 uppercase">
                  1024-BIT HEADER LAYOUT
                </div>
                <div className="grid grid-cols-12 gap-1 text-center font-bold">
                  <div className="col-span-3 bg-cyan-950/40 border border-cyan-500/20 py-2 rounded">
                    DEVICE SIGNATURE<br />(256 bits)
                  </div>
                  <div className="col-span-6 bg-purple-950/40 border border-purple-500/20 py-2 rounded">
                    AI CONTEXT / PRIORITY WEIGHT MATRIX<br />(512 bits)
                  </div>
                  <div className="col-span-3 bg-blue-950/40 border border-blue-500/20 py-2 rounded">
                    SPATIAL COORDS<br />(256 bits)
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
