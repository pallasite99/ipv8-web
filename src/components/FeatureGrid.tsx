import React from 'react';
import { Brain, Settings, ShieldCheck, Zap, Globe, Lock } from 'lucide-react';

interface FeatureCard {
  title: string;
  description: string;
  badge?: string;
  icon: React.ElementType;
  highlightColor: string;
}

export default function FeatureGrid() {
  const features: FeatureCard[] = [
    {
      title: "AI-Powered Routing",
      description: "Dynamically predicts congestion patterns and autonomously optimizes packets. Leverages contextual metadata inside 1024-bit headers.",
      badge: "Real-time Inference",
      icon: Brain,
      highlightColor: "group-hover:text-cyan-400 group-hover:border-cyan-500/30"
    },
    {
      title: "Autonomous Infrastructure",
      description: "Self-healing global topology. Automatically routing packets around physical fiber cuts, seismic breaks, and solar flare congestion.",
      badge: "Self-healing",
      icon: Settings,
      highlightColor: "group-hover:text-amber-400 group-hover:border-amber-500/30"
    },
    {
      title: "Global Scale",
      description: "Designed for trillions of concurrent autonomous agents, aerospace networks, smart sensors, and interplanetary communication links.",
      badge: "Infinite Scope",
      icon: Globe,
      highlightColor: "group-hover:text-blue-400 group-hover:border-blue-500/30"
    },
    {
      title: "Zero Trust Security",
      description: "Identity-aware networking directly at Layer 3. Standard hardware cryptographic verification on every single packet exchange.",
      badge: "Native Identity",
      icon: ShieldCheck,
      highlightColor: "group-hover:text-purple-400 group-hover:border-purple-500/30"
    },
    {
      title: "Edge Native",
      description: "Built for decentralized edge AI models and low-power distributed actuators. Zero central coordinator overhead.",
      badge: "Ultra-low Overhead",
      icon: Zap,
      highlightColor: "group-hover:text-cyan-300 group-hover:border-cyan-300/30"
    },
    {
      title: "Quantum Ready",
      description: "Standard ML-KEM post-quantum cryptographic envelopes. Future-proof security layer immune to algorithmic decryptors.",
      badge: "NIST ML-KEM",
      icon: Lock,
      highlightColor: "group-hover:text-rose-400 group-hover:border-rose-500/30"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 text-left">
      {features.map((feat, idx) => {
        const Icon = feat.icon;
        return (
          <div
            key={idx}
            className="group relative rounded-xl glass-panel p-6 transition-all duration-300 hover:translate-y-[-4px] hover:bg-gray-950/80 hover:border-cyan-500/30 shadow-sm"
          >
            {/* Top right floating badge */}
            {feat.badge && (
              <span className="absolute top-4 right-4 text-[9px] font-mono uppercase bg-gray-900 border border-gray-850 px-2 py-0.5 rounded-full text-gray-500">
                {feat.badge}
              </span>
            )}

            {/* Icon Block */}
            <div className={`w-12 h-12 rounded-lg bg-gray-900/80 border border-gray-800/80 flex items-center justify-center text-gray-400 mb-6 transition-all duration-300 ${feat.highlightColor}`}>
              <Icon size={22} className="transition-transform duration-300 group-hover:scale-110" />
            </div>

            {/* Feature Content */}
            <h4 className="text-lg font-display font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
              {feat.title}
            </h4>
            <p className="text-sm text-gray-400 leading-relaxed mt-2">
              {feat.description}
            </p>

            {/* Read more indicator */}
            <div className="mt-5 flex items-center gap-1.5 text-xs font-mono text-gray-500 group-hover:text-cyan-400 transition-all">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-700 group-hover:bg-cyan-400 transition-colors"></span>
              <span>Fully Integrated Spec</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
