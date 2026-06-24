import React from 'react';
import { Quote, Activity, CheckCircle, Award } from 'lucide-react';

interface TestimonialCard {
  quote: string;
  author: string;
  role: string;
  company: string;
  improvement: string;
  metric: string;
  useCase: string;
}

export default function Testimonials() {
  const reviews: TestimonialCard[] = [
    {
      quote: "Migrating our global logistics fleet to IPv8 allowed our fleet coordinates to sync in sub-millisecond windows. We eliminated satellite handoff drops completely, even across oceanic dead-zones.",
      author: "Hana Shirota",
      role: "VP of Autonomous Engineering",
      company: "Orbit-Loom Logistics Co.",
      improvement: "Latency Reduction",
      metric: "62% Saved",
      useCase: "Fleet Orchestration"
    },
    {
      quote: "IPv8 is the first networking protocol that treats AI agents as first-class citizens. By embedding cryptographic signatures inside Layer 3, we eliminated 99% of our gateway authorization overhead.",
      author: "Dr. Marcus Vane",
      role: "Director of Cybernetic Infrastructure",
      company: "Sovereign AI Labs",
      improvement: "Handshake Overhead",
      metric: "99% Reduced",
      useCase: "Agent-to-Agent Mesh"
    },
    {
      quote: "During regional seismic disturbances, IPv8’s autonomous self-healing layers bypassed fractured physical trunk-lines in microseconds. The protocol literally routed around continental hardware cuts.",
      author: "Elena Rostova",
      role: "Chief Network Architect",
      company: "Metropolis Smart Grid",
      improvement: "Failover Time",
      metric: "0.2ms Dynamic Route",
      useCase: "Self-healing Utility Mesh"
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12 text-left">
      {reviews.map((r, idx) => (
        <div
          key={idx}
          className="bg-gray-950/60 rounded-xl border border-gray-850 p-6 flex flex-col justify-between hover:border-cyan-500/20 transition-all duration-300 relative group"
        >
          {/* Quote icon background ornament */}
          <Quote size={40} className="absolute top-4 right-4 text-gray-900/40 select-none group-hover:text-cyan-500/5 transition-colors" />

          <div className="space-y-4">
            {/* Header: Customer Info */}
            <div className="flex justify-between items-center pb-4 border-b border-gray-900">
              <div>
                <h4 className="text-sm font-bold text-gray-100 font-display">{r.company}</h4>
                <p className="text-[10px] font-mono text-cyan-400 mt-0.5">{r.useCase}</p>
              </div>
              <span className="text-[9px] font-mono bg-cyan-950/30 text-cyan-400 border border-cyan-500/10 px-2 py-0.5 rounded-full uppercase font-bold">
                Enterprise Case
              </span>
            </div>

            {/* Quote body */}
            <p className="text-xs md:text-sm text-gray-300 leading-relaxed italic">
              "{r.quote}"
            </p>
          </div>

          {/* Profile & Metric Foot */}
          <div className="mt-6 pt-4 border-t border-gray-900 flex justify-between items-end">
            <div>
              <div className="text-xs font-bold text-white">{r.author}</div>
              <div className="text-[10px] text-gray-500">{r.role}</div>
            </div>

            <div className="text-right bg-gray-900/40 p-2 rounded-lg border border-gray-850">
              <span className="text-[9px] font-mono text-gray-500 uppercase block leading-none">{r.improvement}</span>
              <span className="text-xs font-mono font-bold text-emerald-400 inline-block mt-1">{r.metric}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
