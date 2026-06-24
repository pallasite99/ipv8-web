import React, { useState, useRef } from 'react';
import { Terminal, Copy, Check, Play, Cpu, GitBranch, Download, ExternalLink } from 'lucide-react';

interface CodeSnippet {
  id: string;
  name: string;
  lang: string;
  code: string;
  output: string;
}

export default function DeveloperConsole() {
  const [activeTab, setActiveTab] = useState<'typescript' | 'rust' | 'go' | 'python'>('rust');
  const [activeSnippetId, setActiveSnippetId] = useState('resolve');
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    "// IPv8 Sandbox Engine Ready.",
    "// Select an endpoint, language, and click 'Run Sandbox Request' to execute."
  ]);

  const runIdRef = useRef(0);

  const snippets: Record<string, Record<string, CodeSnippet>> = {
    resolve: {
      typescript: {
        id: 'resolve',
        name: 'Resolve Route',
        lang: 'typescript',
        code: `import { IPv8Client } from '@ipv8/sdk';

const client = new IPv8Client({
  endpoint: "ipv8://nrt-edge.v8.net",
  authKey: process.env.IPV8_AUTH_KEY
});

// Resolve an AI-native address with live contextual routing
const route = await client.resolve({
  destination: "agent://autonomous-logistics.v8",
  context: {
    priority: "low-latency",
    model: "llama-3-routing-v2",
    payloadSizeGb: 0.15
  }
});

console.log(\`Resolved via \${route.hops} hops in \${route.latency}ms\`);`,
        output: `{
  "status": "success",
  "data": {
    "protocol": "IPv8",
    "address": "v8://00ff:4a92:be12:9944:77af::logistics:01",
    "route": {
      "hops": 2,
      "latency_ms": 11.4,
      "optimized_path": ["nrt-edge.v8.net", "sat-orbit-99", "sfo-edge.v8.net"],
      "encryption": "quantum-ready-kyber",
      "energy_efficiency_saved_pct": 52.4
    }
  }
}`
      },
      rust: {
        id: 'resolve',
        name: 'Resolve Route',
        lang: 'rust',
        code: `use ipv8_sdk::{IPv8Client, RouteRequest, Priority};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = IPv8Client::connect("ipv8://nrt-edge.v8.net").await?;
    
    // Request path optimization for autonomous agent
    let request = RouteRequest::new("agent://autonomous-logistics.v8")
        .priority(Priority::LowLatency)
        .attach_inference_context("routing-v2");
        
    let route = client.resolve_route(request).await?;
    println!("Resolved route: Hops = {}, Latency = {}ms", route.hops, route.latency_ms);
    Ok(())
}`,
        output: `{
  "status": "success",
  "data": {
    "protocol": "IPv8",
    "address": "v8://00ff:4a92:be12:9944:77af::logistics:01",
    "route": {
      "hops": 2,
      "latency_ms": 11.4,
      "optimized_path": ["nrt-edge.v8.net", "sat-orbit-99", "sfo-edge.v8.net"],
      "encryption": "quantum-ready-kyber",
      "energy_efficiency_saved_pct": 52.4
    }
  }
}`
      },
      go: {
        id: 'resolve',
        name: 'Resolve Route',
        lang: 'go',
        code: `package main

import (
	"context"
	"fmt"
	"github.com/ipv8/ipv8-go-sdk"
)

func main() {
	client, _ := ipv8.NewClient("ipv8://nrt-edge.v8.net")
	
	ctx := context.Background()
	route, _ := client.Resolve(ctx, &ipv8.RouteOptions{
		Destination: "agent://autonomous-logistics.v8",
		ContextModel: "routing-v2",
	})
	
	fmt.Printf("Optimized Route latency: %fms via %d hops\\n", route.LatencyMs, len(route.Path))
}`,
        output: `{
  "status": "success",
  "data": {
    "protocol": "IPv8",
    "address": "v8://00ff:4a92:be12:9944:77af::logistics:01",
    "route": {
      "hops": 2,
      "latency_ms": 11.4,
      "optimized_path": ["nrt-edge.v8.net", "sat-orbit-99", "sfo-edge.v8.net"],
      "encryption": "quantum-ready-kyber",
      "energy_efficiency_saved_pct": 52.4
    }
  }
}`
      },
      python: {
        id: 'resolve',
        name: 'Resolve Route',
        lang: 'python',
        code: `from ipv8 import IPv8Client, Priority

client = IPv8Client("ipv8://nrt-edge.v8.net")

# Core asynchronous resolution of IPv8 intelligent path
async def get_route():
    route = await client.resolve(
        destination="agent://autonomous-logistics.v8",
        priority=Priority.LOW_LATENCY,
        context_inference=True
    )
    print(f"Route optimized: Hops={route.hops}, Latency={route.latency_ms}ms")`,
        output: `{
  "status": "success",
  "data": {
    "protocol": "IPv8",
    "address": "v8://00ff:4a92:be12:9944:77af::logistics:01",
    "route": {
      "hops": 2,
      "latency_ms": 11.4,
      "optimized_path": ["nrt-edge.v8.net", "sat-orbit-99", "sfo-edge.v8.net"],
      "encryption": "quantum-ready-kyber",
      "energy_efficiency_saved_pct": 52.4
    }
  }
}`
      }
    },
    tunnel: {
      typescript: {
        id: 'tunnel',
        name: 'Quantum Tunnel',
        lang: 'typescript',
        code: `import { IPv8Client } from '@ipv8/sdk';

const client = new IPv8Client({ endpoint: "ipv8://lhr-edge.v8.net" });

// Establish a post-quantum cryptographic tunnel session
const tunnel = await client.createTunnel({
  target: "v8://00ff:4a92:be12:9944::datacenter",
  cryptography: "ML-KEM-1024",
  forwardSecrecy: "quantum-ephemeral"
});

console.log(\`Tunnel live with ID: \${tunnel.id}\`);`,
        output: `{
  "status": "secured",
  "session": {
    "id": "tun_q981fca7298ab",
    "cryptographic_standard": "ML-KEM-1024 (Post-Quantum Key Encapsulation)",
    "entropy_level_bits": 512,
    "handshake_latency_ms": 4.1,
    "shield_status": "active"
  }
}`
      },
      rust: {
        id: 'tunnel',
        name: 'Quantum Tunnel',
        lang: 'rust',
        code: `use ipv8_sdk::{IPv8Client, CryptographyAlgorithm};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = IPv8Client::connect("ipv8://lhr-edge.v8.net").await?;
    
    let tunnel = client.create_tunnel()
        .target("v8://00ff:4a92:be12:9944::datacenter")
        .cryptography(CryptographyAlgorithm::MlKem1024)
        .establish()
        .await?;
        
    println!("Post-quantum key exchange successful. Session ID: {}", tunnel.session_id);
    Ok(())
}`,
        output: `{
  "status": "secured",
  "session": {
    "id": "tun_q981fca7298ab",
    "cryptographic_standard": "ML-KEM-1024 (Post-Quantum Key Encapsulation)",
    "entropy_level_bits": 512,
    "handshake_latency_ms": 4.1,
    "shield_status": "active"
  }
}`
      },
      go: {
        id: 'tunnel',
        name: 'Quantum Tunnel',
        lang: 'go',
        code: `package main

import (
	"context"
	"fmt"
	"github.com/ipv8/ipv8-go-sdk"
)

func main() {
	client, _ := ipv8.NewClient("ipv8://lhr-edge.v8.net")
	
	tunnel, _ := client.CreateTunnel(context.Background(), &ipv8.TunnelConfig{
		Target:         "v8://00ff:4a92:be12:9944::datacenter",
		CryptoStandard: ipv8.MLKEM1024,
	})
	
	fmt.Printf("Tunnel established! Alg: %s, ID: %s\\n", tunnel.Algorithm, tunnel.ID)
}`,
        output: `{
  "status": "secured",
  "session": {
    "id": "tun_q981fca7298ab",
    "cryptographic_standard": "ML-KEM-1024 (Post-Quantum Key Encapsulation)",
    "entropy_level_bits": 512,
    "handshake_latency_ms": 4.1,
    "shield_status": "active"
  }
}`
      },
      python: {
        id: 'tunnel',
        name: 'Quantum Tunnel',
        lang: 'python',
        code: `from ipv8 import IPv8Client, CryptoStandard

client = IPv8Client("ipv8://lhr-edge.v8.net")

async def establish_secure_link():
    tunnel = await client.create_tunnel(
        target="v8://00ff:4a92:be12:9944::datacenter",
        crypto=CryptoStandard.ML_KEM_1024
    )
    print(f"Tunnel verified. Cryptography: {tunnel.cryptography_type}")`,
        output: `{
  "status": "secured",
  "session": {
    "id": "tun_q981fca7298ab",
    "cryptographic_standard": "ML-KEM-1024 (Post-Quantum Key Encapsulation)",
    "entropy_level_bits": 512,
    "handshake_latency_ms": 4.1,
    "shield_status": "active"
  }
}`
      }
    }
  };

  const handleCopy = () => {
    const currentCode = snippets[activeSnippetId][activeTab].code;
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const runSandbox = () => {
    if (isRunning) return;
    setIsRunning(true);
    runIdRef.current += 1;
    const currentRunId = runIdRef.current;

    setTerminalOutput(["[CONNECTING] Connecting to IPv8 gateway edge: ipv8://nrt-edge.v8.net..."]);

    const steps = [
      () => "[SHAKEHAND] Exchanging quantum-safe ephemeral keys (Kyber-1024)... OK",
      () => `[RESOLVING] Invoking contextual neural resolution engine... (Mode: ${activeSnippetId === 'resolve' ? 'Predictive' : 'Crypto'})`,
      () => "[INFERENCE] Attached LLM-routing-v2 weights. Packet optimization complete.",
      () => `[SUCCESS] Query returned successfully with HTTP 200 (IPv8 over native fiber).`
    ];

    let currentStep = 0;
    const runStep = () => {
      if (currentRunId !== runIdRef.current) return;
      if (currentStep < steps.length) {
        const message = steps[currentStep]();
        setTerminalOutput(prev => [...prev, message]);
        currentStep++;
        setTimeout(runStep, 600);
      } else {
        // Append response JSON
        const output = snippets[activeSnippetId]?.[activeTab]?.output || "// Connection closed.";
        setTerminalOutput(prev => [
          ...prev,
          "",
          "// RESPONSE BODY:",
          output
        ]);
        setIsRunning(false);
      }
    };

    setTimeout(runStep, 600);
  };

  return (
    <div className="w-full rounded-2xl glass-panel border-cyan-500/10 p-6 md:p-8 mt-12 text-left relative overflow-hidden">
      
      <div className="absolute top-0 right-0 w-[400px] h-[400px] radial-glow-cyan opacity-20 -z-10 translate-x-1/2 -translate-y-1/2" />

      {/* Title block */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div>
          <span className="text-[10px] tracking-widest font-mono text-purple-400 font-bold uppercase block mb-1">Developer Portal</span>
          <h3 className="text-2xl md:text-3xl font-display font-bold text-white">Built for Autonomous Code</h3>
          <p className="text-gray-400 text-sm mt-1 max-w-xl">
            Integrate intelligent routing, context encapsulation, and quantum tunnels directly in your software stack with low-footprint SDKs.
          </p>
        </div>

        {/* GitHub & Docs links */}
        <div className="flex flex-wrap gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-xs font-mono rounded-lg border border-gray-800 bg-gray-950 text-gray-300 hover:text-white hover:border-gray-700 flex items-center gap-1.5 transition-all"
          >
            <GitBranch size={14} />
            <span>ipv8-net/sdk-core</span>
            <ExternalLink size={12} className="text-gray-500" />
          </a>
          <a
            href="#downloads"
            className="px-4 py-2 text-xs font-mono rounded-lg bg-cyan-500 hover:bg-cyan-600 text-gray-950 font-semibold flex items-center gap-1.5 transition-all shadow-lg shadow-cyan-500/15"
          >
            <Download size={14} />
            <span>Get CLI v1.4</span>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Code Editor Panel */}
        <div className="lg:col-span-7 bg-gray-950 rounded-xl border border-gray-800 flex flex-col overflow-hidden">
          
          {/* Editor Header */}
          <div className="bg-gray-900 px-4 py-3 flex justify-between items-center border-b border-gray-800">
            {/* Left side: endpoint picker tabs */}
            <div className="flex gap-2">
              <button
                id="dev-route-resolve"
                onClick={() => {
                  runIdRef.current += 1;
                  setIsRunning(false);
                  setActiveSnippetId('resolve');
                  setTerminalOutput(["// IPv8 Sandbox Engine Ready.", "// Select an endpoint, language, and click 'Run Sandbox Request' to execute."]);
                }}
                className={`px-3 py-1 text-xs font-mono rounded-md transition-all ${
                  activeSnippetId === 'resolve'
                    ? 'bg-gray-800 text-white font-bold'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                POST /resolve
              </button>
              <button
                id="dev-route-tunnel"
                onClick={() => {
                  runIdRef.current += 1;
                  setIsRunning(false);
                  setActiveSnippetId('tunnel');
                  setTerminalOutput(["// IPv8 Sandbox Engine Ready.", "// Select an endpoint, language, and click 'Run Sandbox Request' to execute."]);
                }}
                className={`px-3 py-1 text-xs font-mono rounded-md transition-all ${
                  activeSnippetId === 'tunnel'
                    ? 'bg-gray-800 text-white font-bold'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                POST /tunnel
              </button>
            </div>

            {/* Language Selection */}
            <div className="flex gap-2.5">
              {(['typescript', 'rust', 'go', 'python'] as const).map(lang => (
                <button
                  key={lang}
                  id={`lang-btn-${lang}`}
                  onClick={() => {
                    runIdRef.current += 1;
                    setIsRunning(false);
                    setActiveTab(lang);
                    setTerminalOutput(["// IPv8 Sandbox Engine Ready.", "// Select an endpoint, language, and click 'Run Sandbox Request' to execute."]);
                  }}
                  className={`text-xs font-mono capitalize transition-all ${
                    activeTab === lang
                      ? 'text-cyan-400 font-bold border-b border-cyan-400'
                      : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {lang === 'typescript' ? 'TS' : lang}
                </button>
              ))}
            </div>
          </div>

          {/* Editor Content Area */}
          <div className="p-5 flex-1 font-mono text-xs leading-relaxed text-cyan-100 overflow-x-auto min-h-[220px] relative">
            <button
              id="copy-code-btn"
              onClick={handleCopy}
              className="absolute top-4 right-4 p-1.5 bg-gray-900 border border-gray-800 hover:border-gray-700 text-gray-400 hover:text-white rounded transition-all"
              title="Copy snippet"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
            </button>
            <pre className="text-gray-300">
              <code>{snippets[activeSnippetId][activeTab].code}</code>
            </pre>
          </div>

          {/* Run bar */}
          <div className="bg-gray-900/60 p-3.5 border-t border-gray-850 flex justify-between items-center">
            <div className="text-[10px] font-mono text-gray-500">
              Language environment: <span className="text-gray-300 capitalize font-bold">{activeTab}</span>
            </div>
            <button
              id="run-sandbox-btn"
              onClick={runSandbox}
              disabled={isRunning}
              className={`px-4 py-2 text-xs font-mono rounded-lg flex items-center gap-2 transition-all ${
                isRunning
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                  : 'bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 font-bold hover:shadow-[0_0_12px_rgba(6,182,212,0.2)]'
              }`}
            >
              <Play size={12} fill="currentColor" />
              {isRunning ? 'Executing...' : 'Run Sandbox Request'}
            </button>
          </div>

        </div>

        {/* Live Terminal Output Panel */}
        <div className="lg:col-span-5 bg-gray-950 rounded-xl border border-gray-800 flex flex-col overflow-hidden">
          
          {/* Terminal Header */}
          <div className="bg-gray-900 px-4 py-3 border-b border-gray-800 flex items-center gap-2">
            <Terminal size={14} className="text-purple-400" />
            <span className="text-xs font-mono font-bold text-gray-300">Developer Interactive Sandbox CLI</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-auto" />
          </div>

          {/* Terminal Logs */}
          <div className="p-4 flex-1 bg-[#02050b] font-mono text-[11px] text-gray-400 leading-snug space-y-1.5 overflow-y-auto max-h-[340px] min-h-[220px]">
            {terminalOutput.map((line, idx) => (
              <div
                key={idx}
                className={
                  line.startsWith('[SUCCESS]')
                    ? 'text-emerald-400'
                    : line.startsWith('// RESPONSE BODY:') || line.startsWith('{') || line.startsWith('}') || line.startsWith(' ') || line.includes('"status"')
                    ? 'text-cyan-300/90'
                    : line.startsWith('[CONNECTING]') || line.startsWith('[SHAKEHAND]') || line.startsWith('[RESOLVING]') || line.startsWith('[INFERENCE]')
                    ? 'text-purple-400'
                    : 'text-gray-500'
                }
              >
                {line}
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Feature block highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-gray-800">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
            <Cpu size={18} />
          </div>
          <div>
            <h5 className="text-sm font-bold text-gray-100 font-display">Embedded WebAssembly</h5>
            <p className="text-xs text-gray-400 leading-relaxed mt-0.5">
              Our ultra-light client-side agent operates with 45KB runtime footprint. Compile-to-anything target.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
            <Terminal size={18} />
          </div>
          <div>
            <h5 className="text-sm font-bold text-gray-100 font-display">Command Line SDK</h5>
            <p className="text-xs text-gray-400 leading-relaxed mt-0.5">
              Deploy secure gateways in single commands: <code>ipv8 up --region us-east</code>. Instant peer registration.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
            <GitBranch size={18} />
          </div>
          <div>
            <h5 className="text-sm font-bold text-gray-100 font-display">Open Schema Spec</h5>
            <p className="text-xs text-gray-400 leading-relaxed mt-0.5">
              Fully RFC-draft compliant. Transparent address translation layers to map existing IPv6 and IPv4 blocks.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
