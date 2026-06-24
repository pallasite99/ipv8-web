import React, { useRef, useEffect, useState } from 'react';

interface Node3D {
  name: string;
  lat: number; // in radians
  lon: number; // in radians
  x: number;
  y: number;
  z: number;
  px: number; // projected x
  py: number; // projected y
}

interface Packet {
  fromIndex: number;
  toIndex: number;
  progress: number;
  speed: number;
  color: string;
}

export default function NetworkGlobe() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const hoveredNodeRef = useRef<string | null>(null);
  const [activeRoutingCount, setActiveRoutingCount] = useState(1482);
  const [logs, setLogs] = useState<string[]>([
    "System init: IPv8 global overlay mesh active.",
    "Route optimized: SFO -> NRT via autonomous stratospheric satellite. [-54ms latency]",
    "Identity verified: Autonomous Agent #8812 quantum-secured at London Edge.",
    "Congestion avoided: Redirection of 1.4 Tbps IoT traffic around Frankfurt storm nodes."
  ]);

  // Initial nodes on a sphere
  const locations = [
    { name: "San Francisco", lat: 37.7749 * Math.PI / 180, lon: -122.4194 * Math.PI / 180 },
    { name: "Tokyo", lat: 35.6762 * Math.PI / 180, lon: 139.6503 * Math.PI / 180 },
    { name: "London", lat: 51.5074 * Math.PI / 180, lon: -0.1278 * Math.PI / 180 },
    { name: "Sydney", lat: -33.8688 * Math.PI / 180, lon: 151.2093 * Math.PI / 180 },
    { name: "Frankfurt", lat: 50.1109 * Math.PI / 180, lon: 8.6821 * Math.PI / 180 },
    { name: "São Paulo", lat: -23.5505 * Math.PI / 180, lon: -46.6333 * Math.PI / 180 },
    { name: "Singapore", lat: 1.3521 * Math.PI / 180, lon: 103.8198 * Math.PI / 180 },
    { name: "Cape Town", lat: -33.9249 * Math.PI / 180, lon: 18.4241 * Math.PI / 180 },
  ];

  useEffect(() => {
    // Generate some log items dynamically
    const interval = setInterval(() => {
      const actions = [
        "Dynamic rerouting executed: Cape Town -> Singapore via Low Earth Orbit Link #14.",
        "Zero Trust handshake complete: Smart Grid Segment #49A.",
        "Packet level compression: 40% reduction in telemetry stream to São Paulo Hub.",
        "Sub-orbital autonomous node synced in space grid: SAT-IPv8-99.",
        "Quantum-resistant tunnel established: Tokyo -> SFO. Entropy rating: 100%.",
        "Autonomous vehicle swarm #41 delegated local IP block (256,000 sub-addresses)."
      ];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      setLogs(prev => [randomAction, ...prev.slice(0, 4)]);
      setActiveRoutingCount(prev => prev + Math.floor(Math.random() * 7) - 3);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = canvas.width;
    let height = canvas.height;

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      width = canvas.width;
      height = canvas.height;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // 3D rotation parameters
    let angleY = 0.003; // automatic spin
    let angleX = 0.0005;
    let rotationY = 0;
    let rotationX = 0.3; // starting tilt

    // Sphere representation: dots to draw the sphere
    const sphereDots: {x: number, y: number, z: number}[] = [];
    const numDots = 180;
    for (let i = 0; i < numDots; i++) {
      const phi = Math.acos(-1 + (2 * i) / numDots);
      const theta = Math.sqrt(numDots * Math.PI) * phi;
      sphereDots.push({
        x: Math.cos(theta) * Math.sin(phi),
        y: Math.sin(theta) * Math.sin(phi),
        z: Math.cos(phi)
      });
    }

    // Convert geographic locations to 3D points
    const nodes: Node3D[] = locations.map(loc => {
      const r = 1.0; // sphere radius factor
      return {
        name: loc.name,
        lat: loc.lat,
        lon: loc.lon,
        x: r * Math.cos(loc.lat) * Math.cos(loc.lon),
        y: r * Math.sin(loc.lat),
        z: r * Math.cos(loc.lat) * Math.sin(loc.lon),
        px: 0,
        py: 0
      };
    });

    // Setup active packets traveling along the nodes
    const packets: Packet[] = [
      { fromIndex: 0, toIndex: 1, progress: 0.1, speed: 0.015, color: "#06b6d4" },
      { fromIndex: 1, toIndex: 4, progress: 0.4, speed: 0.010, color: "#8b5cf6" },
      { fromIndex: 2, toIndex: 6, progress: 0.7, speed: 0.012, color: "#3b82f6" },
      { fromIndex: 5, toIndex: 0, progress: 0.2, speed: 0.018, color: "#0ea5e9" },
      { fromIndex: 7, toIndex: 3, progress: 0.0, speed: 0.008, color: "#8b5cf6" },
    ];

    // Interaction values
    let mouseX = 0;
    let mouseY = 0;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) * window.devicePixelRatio;
      mouseY = (e.clientY - rect.top) * window.devicePixelRatio;

      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        rotationY += deltaX * 0.005;
        rotationX += deltaY * 0.005;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      } else {
        // Detect hovering over nodes
        let foundNode: string | null = null;
        const radius = Math.min(width, height) * 0.35;
        const cx = width / 2;
        const cy = height / 2;

        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          if (n.z > 0) { // only on front side
            const dx = mouseX - n.px;
            const dy = mouseY - n.py;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 15) {
              foundNode = n.name;
              break;
            }
          }
        }
        if (hoveredNodeRef.current !== foundNode) {
          hoveredNodeRef.current = foundNode;
          setHoveredNode(foundNode);
        }
      }
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Rotate automated continuous rotation if not dragging
      if (!isDragging) {
        rotationY += angleY;
        rotationX += angleX;
      }

      const radius = Math.min(width, height) * 0.36;
      const cx = width / 2;
      const cy = height / 2;

      // Rotation matrices
      const cosY = Math.cos(rotationY);
      const sinY = Math.sin(rotationY);
      const cosX = Math.cos(rotationX);
      const sinX = Math.sin(rotationX);

      // Helper for 3D rotation projection
      const project = (x3d: number, y3d: number, z3d: number) => {
        // Rotate Y
        let x1 = x3d * cosY - z3d * sinY;
        let z1 = x3d * sinY + z3d * cosY;

        // Rotate X
        let y2 = y3d * cosX - z1 * sinX;
        let z2 = y3d * sinX + z1 * cosX;

        return {
          x: cx + x1 * radius,
          y: cy + y2 * radius,
          z: z2 // for depth cueing and back-face sorting
        };
      };

      // 1. Draw glowing background aura
      const radialGlow = ctx.createRadialGradient(cx, cy, radius * 0.4, cx, cy, radius * 1.3);
      radialGlow.addColorStop(0, 'rgba(11, 25, 44, 0.4)');
      radialGlow.addColorStop(0.5, 'rgba(10, 20, 50, 0.2)');
      radialGlow.addColorStop(0.8, 'rgba(6, 182, 212, 0.05)');
      radialGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = radialGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.3, 0, Math.PI * 2);
      ctx.fill();

      // 2. Draw sphere wireframe grid dots (behind nodes)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      sphereDots.forEach(dot => {
        const proj = project(dot.x, dot.y, dot.z);
        // Depth cueing: larger/brighter dots on front, smaller/dimmer on back
        if (proj.z > -0.2) {
          const size = (proj.z + 1.2) * 1.1;
          const alpha = (proj.z + 1) * 0.3;
          ctx.fillStyle = `rgba(14, 165, 233, ${alpha})`;
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          const size = (proj.z + 1.2) * 0.7;
          ctx.fillStyle = `rgba(15, 23, 42, 0.15)`;
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // 3. Draw connection arcs between nodes (only drawing on front-side is cleaner, but let's draw connections with transparency)
      nodes.forEach((n, idx) => {
        const projStart = project(n.x, n.y, n.z);
        n.px = projStart.x;
        n.py = projStart.y;

        // Draw connections to nearby nodes or specific logical topologies
        for (let j = idx + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const projEnd = project(other.x, other.y, other.z);

          // Only draw if at least one of them is on the front side or with low alpha
          const avgZ = (projStart.z + projEnd.z) / 2;
          const alpha = (avgZ + 1.2) * 0.09;

          if (alpha > 0.02) {
            ctx.strokeStyle = idx % 2 === 0 ? `rgba(6, 182, 212, ${alpha})` : `rgba(139, 92, 246, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(projStart.x, projStart.y);
            // Draw a subtle quadratic curve to mimic Earth surface arcs
            const midX = (projStart.x + projEnd.x) / 2;
            const midY = (projStart.y + projEnd.y) / 2 - (radius * 0.12 * Math.max(0.2, avgZ + 0.8));
            ctx.quadraticCurveTo(midX, midY, projEnd.x, projEnd.y);
            ctx.stroke();
          }
        }
      });

      // 4. Update and Draw packets
      packets.forEach(p => {
        p.progress += p.speed;
        if (p.progress >= 1.0) {
          p.progress = 0;
          // Randomize destinations slightly for visual variety
          p.fromIndex = Math.floor(Math.random() * nodes.length);
          p.toIndex = Math.floor(Math.random() * nodes.length);
          while (p.fromIndex === p.toIndex) {
            p.toIndex = Math.floor(Math.random() * nodes.length);
          }
        }

        const startNode = nodes[p.fromIndex];
        const endNode = nodes[p.toIndex];

        const startProj = project(startNode.x, startNode.y, startNode.z);
        const endProj = project(endNode.x, endNode.y, endNode.z);

        const avgZ = (startProj.z + endProj.z) / 2;

        if (avgZ > -0.4) {
          // Calculate quadratic arc points
          const t = p.progress;
          const midX = (startProj.x + endProj.x) / 2;
          const midY = (startProj.y + endProj.y) / 2 - (radius * 0.12 * Math.max(0.2, avgZ + 0.8));

          // Quadratic Bezier formula
          const x = (1 - t) * (1 - t) * startProj.x + 2 * (1 - t) * t * midX + t * t * endProj.x;
          const y = (1 - t) * (1 - t) * startProj.y + 2 * (1 - t) * t * midY + t * t * endProj.y;

          // Packet point
          const size = (avgZ + 1.2) * 2.5;
          ctx.shadowBlur = 8;
          ctx.shadowColor = p.color;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();

          // Reset shadow for next draws
          ctx.shadowBlur = 0;
        }
      });

      // 5. Draw the actual Node hubs
      nodes.forEach(n => {
        const proj = project(n.x, n.y, n.z);
        if (proj.z > -0.2) {
          const isHovered = hoveredNodeRef.current === n.name;
          const size = isHovered ? 8 : 4.5;
          const ringSize = isHovered ? 16 : 9;

          // Outer pulsing ring
          const ringAlpha = (proj.z + 1) * 0.4;
          ctx.strokeStyle = `rgba(6, 182, 212, ${ringAlpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, ringSize + Math.sin(Date.now() * 0.006) * 1.5, 0, Math.PI * 2);
          ctx.stroke();

          // Inner solid dot
          ctx.fillStyle = isHovered ? '#06b6d4' : '#38bdf8';
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, size, 0, Math.PI * 2);
          ctx.fill();

          // Label
          if (proj.z > 0.1) {
            ctx.fillStyle = isHovered ? '#ffffff' : '#9ca3af';
            ctx.font = isHovered ? '600 11px Inter, sans-serif' : '500 9px Inter, sans-serif';
            ctx.fillText(n.name, proj.x + size + 5, proj.y + 3);
          }
        }
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener('mousedown', onMouseDown);
      canvas.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative w-full h-[32rem] md:h-[38rem] flex items-center justify-center overflow-hidden">
      {/* HUD metrics dashboard overlay */}
      <div id="ipv8-globe-hud" className="absolute top-4 left-4 z-10 p-3 rounded-lg glass-panel max-w-[260px] text-left border-cyan-500/10 pointer-events-none md:pointer-events-auto">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          <p className="text-[10px] tracking-widest font-mono text-cyan-400 font-bold uppercase">IPv8 OVERLAY MESH</p>
        </div>
        <h4 className="text-lg font-bold font-display text-white">Live Node Map</h4>
        <p className="text-xs text-gray-400 mt-1 leading-relaxed">
          Dragging rotates the Earth. Glowing arcs show real-time autonomous packet transfers across quantum channels.
        </p>

        <div className="mt-4 pt-3 border-t border-gray-800 flex justify-between">
          <div>
            <div className="text-[10px] font-mono text-gray-500 uppercase">Routing Paths</div>
            <div className="text-md font-bold font-mono text-cyan-400">{activeRoutingCount.toLocaleString()}</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-mono text-gray-500 uppercase">Avg Latency</div>
            <div className="text-md font-bold font-mono text-purple-400">14.2 ms</div>
          </div>
        </div>
      </div>

      {/* Floating HUD status log */}
      <div id="ipv8-globe-logs" className="absolute bottom-4 right-4 z-10 p-4 rounded-lg glass-panel max-w-[340px] text-left border-purple-500/10 hidden md:block select-none">
        <p className="text-[9px] tracking-widest font-mono text-purple-400 font-bold uppercase mb-2">AUTONOMOUS ORCHESTRATION FEED</p>
        <div className="space-y-2 h-[120px] overflow-hidden">
          {logs.map((log, idx) => (
            <div key={idx} className="text-[10.5px] font-mono leading-snug text-gray-300 flex gap-1.5 transition-all duration-500">
              <span className="text-cyan-400 select-none">&gt;</span>
              <span className={idx === 0 ? "text-cyan-200" : "text-gray-400"}>{log}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Actual interactive node tooltip */}
      {hoveredNode && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-950/95 border border-cyan-500/40 text-white rounded px-3 py-1.5 text-xs font-mono shadow-2xl z-20 pointer-events-none">
          <span className="text-cyan-400 font-bold">Node Connected:</span> {hoveredNode} Edge
        </div>
      )}

      {/* Canvas */}
      <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
    </div>
  );
}
