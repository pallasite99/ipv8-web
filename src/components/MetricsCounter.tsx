import React, { useEffect, useState } from 'react';

interface MetricProps {
  target: number;
  suffix: string;
  decimals?: number;
  duration?: number;
}

function AnimatedNumber({ target, suffix, decimals = 0, duration = 1500 }: MetricProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(progress * target);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [target, duration]);

  return (
    <span>
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default function MetricsCounter() {
  const metrics = [
    {
      title: "Supported Devices",
      subtitle: "Designed for distributed AI agents and cellular IoT meshes.",
      component: <AnimatedNumber target={10} suffix=" Billion+" decimals={0} />
    },
    {
      title: "Protocol Reliability",
      subtitle: "Autonomous self-healing route paths across LEO satellites.",
      component: <AnimatedNumber target={99.999} suffix="%" decimals={3} />
    },
    {
      title: "Reduced Latency",
      subtitle: "Smart pathing skips legacy fiber bottlenecks & BGP tables.",
      component: <AnimatedNumber target={60} suffix="% Lower" decimals={0} />
    },
    {
      title: "Reduced Energy Footprint",
      subtitle: "Lightweight byte headers omit redundant legacy headers.",
      component: <AnimatedNumber target={40} suffix="% Reduction" decimals={0} />
    },
    {
      title: "Active Edge Regions",
      subtitle: "Core routing centers in high-density carrier terminals.",
      component: <AnimatedNumber target={500} suffix="+" decimals={0} />
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 mt-12 text-left">
      {metrics.map((m, idx) => (
        <div
          key={idx}
          className={`bg-gray-950/60 p-6 rounded-2xl border border-gray-850 hover:border-cyan-500/20 transition-all flex flex-col justify-between ${
            idx === 4 ? 'col-span-2 lg:col-span-1' : ''
          }`}
        >
          <div>
            <h5 className="text-[10px] tracking-widest font-mono text-cyan-400 font-bold uppercase mb-3">
              {m.title}
            </h5>
            <p className="text-gray-400 text-xs leading-relaxed">
              {m.subtitle}
            </p>
          </div>
          <div className="text-2xl md:text-3xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400 mt-6 select-none font-mono">
            {m.component}
          </div>
        </div>
      ))}
    </div>
  );
}
