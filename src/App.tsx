import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Network, 
  ArrowRight, 
  BookOpen, 
  Terminal, 
  ShieldCheck, 
  Orbit, 
  ExternalLink,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

// Modular Feature Components
import NetworkGlobe from './components/NetworkGlobe';
import WhatIsIPv8 from './components/WhatIsIPv8';
import MetricsCounter from './components/MetricsCounter';
import FeatureGrid from './components/FeatureGrid';
import InteractiveArchitecture from './components/InteractiveArchitecture';
import UseCases from './components/UseCases';
import TechStackLayers from './components/TechStackLayers';
import DeveloperConsole from './components/DeveloperConsole';
import Testimonials from './components/Testimonials';
import WhitepaperModal from './components/WhitepaperModal';

export default function App() {
  const [isWhitepaperOpen, setIsWhitepaperOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 relative selection:bg-cyan-500/30 selection:text-white">
      
      {/* Absolute Ambient Background Lights */}
      <div className="absolute top-0 left-0 w-full h-[800px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/30 via-cyan-950/10 to-transparent -z-10 pointer-events-none" />
      <div className="absolute top-[1200px] right-0 w-[500px] h-[500px] bg-purple-950/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute top-[2800px] left-0 w-[600px] h-[600px] bg-cyan-950/10 rounded-full blur-[140px] -z-10 pointer-events-none" />
      
      {/* 1. Header (Sticky navigation) */}
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-gray-900/60 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/10">
              <Network size={18} className="text-gray-950 font-bold" />
            </div>
            <span className="text-lg font-display font-extrabold tracking-tight text-white flex items-center gap-1.5">
              IPv8 <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping shrink-0"></span>
            </span>
          </div>

          {/* Desktop Navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-wider font-bold text-gray-400">
            <button id="nav-what-is" onClick={() => scrollToSection('what-is')} className="hover:text-cyan-400 transition-colors">What is IPv8?</button>
            <button id="nav-features" onClick={() => scrollToSection('features')} className="hover:text-cyan-400 transition-colors">Core Tech</button>
            <button id="nav-sandbox" onClick={() => scrollToSection('sandbox')} className="hover:text-cyan-400 transition-colors">Sandbox</button>
            <button id="nav-use-cases" onClick={() => scrollToSection('use-cases')} className="hover:text-cyan-400 transition-colors">Use Cases</button>
            <button id="nav-developer" onClick={() => scrollToSection('developer')} className="hover:text-cyan-400 transition-colors">SDK</button>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button
              id="header-whitepaper-btn"
              onClick={() => setIsWhitepaperOpen(true)}
              className="px-3.5 py-1.5 text-xs font-mono font-bold bg-gray-950 hover:bg-gray-900 border border-gray-800 text-gray-300 rounded-lg transition-all"
            >
              Whitepaper
            </button>
            <button
              id="header-explore-btn"
              onClick={() => scrollToSection('sandbox')}
              className="px-4 py-1.5 text-xs font-mono font-bold bg-cyan-500 hover:bg-cyan-600 text-gray-950 rounded-lg transition-all shadow-md shadow-cyan-500/10"
            >
              Explore Node Map
            </button>
          </div>

          {/* Mobile menu trigger */}
          <button
            id="mobile-menu-trigger"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 md:hidden text-gray-400 hover:text-white hover:bg-gray-900 border border-gray-850 rounded-lg transition-all"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

        </div>

        {/* Mobile menu panel */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden border-t border-gray-900 bg-gray-950 p-4 space-y-3 font-mono text-xs font-bold text-gray-400"
            >
              <button onClick={() => scrollToSection('what-is')} className="w-full text-left py-2 hover:text-cyan-400">What is IPv8?</button>
              <button onClick={() => scrollToSection('features')} className="w-full text-left py-2 hover:text-cyan-400">Core Tech</button>
              <button onClick={() => scrollToSection('sandbox')} className="w-full text-left py-2 hover:text-cyan-400">Sandbox</button>
              <button onClick={() => scrollToSection('use-cases')} className="w-full text-left py-2 hover:text-cyan-400">Use Cases</button>
              <button onClick={() => scrollToSection('developer')} className="w-full text-left py-2 hover:text-cyan-400">SDK</button>
              
              <div className="pt-4 border-t border-gray-900 flex flex-col gap-2.5">
                <button
                  onClick={() => { setIsMobileMenuOpen(false); setIsWhitepaperOpen(true); }}
                  className="w-full py-2 bg-gray-900 border border-gray-800 text-center text-gray-200 rounded"
                >
                  Technical Whitepaper
                </button>
                <button
                  onClick={() => scrollToSection('sandbox')}
                  className="w-full py-2 bg-cyan-500 text-gray-950 text-center rounded"
                >
                  Explore Node Map
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 md:space-y-32 py-12 md:py-20">

        {/* 2. HERO SECTION */}
        <section id="hero-section" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center text-left">
          
          <div className="lg:col-span-6 space-y-6">
            
            {/* Announcement badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-950/35 border border-cyan-500/10 rounded-full">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shrink-0"></span>
              <span className="text-[10px] tracking-widest font-mono text-cyan-400 uppercase font-bold">
                Announcing IPv8 Core Standard
              </span>
            </div>

            {/* Title display */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-display font-extrabold tracking-tight text-white leading-[1.1] select-none">
              IPv8 — The Internet Protocol Built for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 font-display">AI Age</span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-xl">
              Move beyond traditional networking. IPv8 introduces intelligent routing, autonomous optimization, built-in security, and limitless scalability for the next generation of connected systems.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                id="hero-primary-cta"
                onClick={() => scrollToSection('features')}
                className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-gray-950 font-bold font-mono text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-lg shadow-cyan-500/10 cursor-pointer"
              >
                <span>Explore IPv8</span>
                <ArrowRight size={14} />
              </button>
              <button
                id="hero-secondary-cta"
                onClick={() => setIsWhitepaperOpen(true)}
                className="px-6 py-3 bg-gray-950 hover:bg-gray-900 border border-gray-800 text-gray-300 font-bold font-mono text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <BookOpen size={14} className="text-cyan-400" />
                <span>Read Technical Whitepaper</span>
              </button>
            </div>

            {/* Highlights ticker */}
            <div className="pt-6 border-t border-gray-900/80 flex flex-wrap gap-x-8 gap-y-4 text-xs font-mono text-gray-500">
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-cyan-500" />
                <span>Post-Quantum ML-KEM Standard</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Terminal size={14} className="text-purple-500" />
                <span>Contextual AI-Packets</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Orbit size={14} className="text-blue-500" />
                <span>Space-Sea-Ground Cohesion</span>
              </div>
            </div>

          </div>

          {/* Interactive Network Globe Frame */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            {/* Neon backlighting effect behind globe */}
            <div className="absolute w-[360px] h-[360px] bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none -z-10" />
            <div className="w-full max-w-xl glass-panel rounded-2xl border border-gray-900 p-2 overflow-hidden shadow-2xl shadow-cyan-950/20">
              <NetworkGlobe />
            </div>
          </div>

        </section>


        {/* 3. WHAT IS IPv8 SECTION */}
        <section id="what-is" className="border-t border-gray-900/60 pt-16">
          <div className="text-left max-w-3xl mb-12">
            <span className="text-[10px] tracking-widest font-mono text-cyan-400 font-bold uppercase">Architectural Evolution</span>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white mt-2 leading-tight">
              The Evolution of Packet Delivery
            </h2>
            <p className="text-gray-400 text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
              Standard TCP/IP protocols route packet headers mechanically. IPv8 layers context aware inference directly over dynamic fiber and satellite grids.
            </p>
          </div>

          <WhatIsIPv8 />
        </section>


        {/* 4. PERFORMANCE METRICS */}
        <section id="metrics" className="border-t border-gray-900/60 pt-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[10px] tracking-widest font-mono text-cyan-400 font-bold uppercase">Performance Audits</span>
            <h3 className="text-2xl md:text-3xl font-display font-bold text-white mt-2">
              Empirical Fleet Benchmarks
            </h3>
            <p className="text-gray-400 text-sm mt-2 leading-relaxed">
              Real-world deployment statistics derived from live simulations running across our 500+ edge-backbone regions.
            </p>
          </div>

          <MetricsCounter />
        </section>


        {/* 5. CORE FEATURES SECTION */}
        <section id="features" className="border-t border-gray-900/60 pt-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div className="text-left max-w-2xl">
              <span className="text-[10px] tracking-widest font-mono text-cyan-400 font-bold uppercase">Technical Advantages</span>
              <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white mt-2 leading-tight">
                Designed for Autonomous Scale
              </h2>
              <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                A streamlined L3 framing architecture designed for extreme packet safety, self-healing pathing, and cryptographic longevity.
              </p>
            </div>
            <button
              onClick={() => scrollToSection('developer')}
              className="px-4 py-2 text-xs font-mono text-cyan-400 hover:text-white border border-cyan-500/20 bg-cyan-950/10 hover:bg-cyan-950/30 rounded-lg transition-all shrink-0 self-start md:self-end"
            >
              Read RFC Specs
            </button>
          </div>

          <FeatureGrid />
        </section>


        {/* 6. VISUAL ARCHITECTURE SECTION */}
        <section id="sandbox" className="border-t border-gray-900/60 pt-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[10px] tracking-widest font-mono text-cyan-400 font-bold uppercase">Topology Comparison</span>
            <h3 className="text-2xl md:text-3xl font-display font-bold text-white mt-2">
              Live Network Routing Sandbox
            </h3>
            <p className="text-gray-400 text-sm mt-2 leading-relaxed">
              Inject routing bottlenecks to visualize how IPv8 automatically redirects packets across satellite links, while legacy protocols get stuck in standard BGP queues.
            </p>
          </div>

          <InteractiveArchitecture />
        </section>


        {/* 7. USE CASES SECTION */}
        <section id="use-cases" className="border-t border-gray-900/60 pt-16">
          <div className="text-left max-w-3xl mb-12">
            <span className="text-[10px] tracking-widest font-mono text-cyan-400 font-bold uppercase">Enterprise Verticals</span>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white mt-2 leading-tight">
              Powering Sovereign Connected Industries
            </h2>
            <p className="text-gray-400 text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
              Whether synchronizing orbital satellite coordinates or managing factory actuator commands, IPv8 provides deterministic reliability.
            </p>
          </div>

          <UseCases />
        </section>


        {/* 8. TECHNOLOGY STACK SECTION */}
        <section id="tech-stack" className="border-t border-gray-900/60 pt-16">
          <TechStackLayers />
        </section>


        {/* 9. DEVELOPER SECTION */}
        <section id="developer" className="border-t border-gray-900/60 pt-16">
          <DeveloperConsole />
        </section>


        {/* 10. TESTIMONIALS SECTION */}
        <section id="testimonials" className="border-t border-gray-900/60 pt-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[10px] tracking-widest font-mono text-cyan-400 font-bold uppercase">Industry Endorsements</span>
            <h3 className="text-2xl md:text-3xl font-display font-bold text-white mt-2">
              Enterprise Success Audits
            </h3>
            <p className="text-gray-400 text-sm mt-2 leading-relaxed">
              See how autonomous intelligence firms, municipal utilities, and satellite fleets run production-level traffic over the IPv8 network.
            </p>
          </div>

          <Testimonials />
        </section>


        {/* FAQ Section */}
        <section id="faq-section" className="border-t border-gray-900/60 pt-16 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
            
            <div className="lg:col-span-4">
              <span className="text-[10px] tracking-widest font-mono text-cyan-400 font-bold uppercase">Clarifications</span>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-white mt-2">
                Frequently Asked Specifications
              </h3>
              <p className="text-gray-400 text-xs mt-2 leading-relaxed">
                Have lingering technical doubts regarding address translation, backward compatibility, or satellite handovers? Explore our detailed FAQ matrix.
              </p>
            </div>

            <div className="lg:col-span-8 space-y-6">
              
              <div className="p-5 rounded-xl bg-gray-950 border border-gray-850">
                <h5 className="text-sm font-bold text-white font-display">Is IPv8 backward compatible with IPv4 and IPv6?</h5>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                  Yes. IPv8 includes a native hardware translation layer called **Context NAT (cNAT)**. This encapsulates incoming legacy packets and assigns them a synthetic 512-bit semantic suffix based on static context heuristics, allowing transparent back-and-forth mapping on active carriers.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-gray-950 border border-gray-850">
                <h5 className="text-sm font-bold text-white font-display">Does the AI-routing layer introduce massive processing delays?</h5>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                  On the contrary. The local neural model running inside the switches uses highly quantized, single-bit (binary) weights. This executes in under <strong>0.1 microseconds</strong> inside standard carrier-grade ASIC/FPGA boards, which is substantially faster than searching massive legacy BGP address tables.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-gray-950 border border-gray-850">
                <h5 className="text-sm font-bold text-white font-display">How does IPv8 handle high physical vibration in space/satellites?</h5>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                  Rather than binding an address to a rigid landline router, IPv8 spatial coordinates utilize Keplerian vector coordinates. If a satellite swings out of range, the neighboring nodes calculate the mathematical trajectory drift and update adjacent peer links predictive matrices.
                </p>
              </div>

            </div>

          </div>
        </section>


        {/* Pre-Footer Newsletter CTA */}
        <section id="newsletter" className="bg-gradient-to-r from-cyan-950/25 to-purple-950/25 rounded-2xl border border-cyan-500/10 p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />
          
          <span className="text-[10px] tracking-widest font-mono text-cyan-400 font-bold uppercase">Deployment Registration</span>
          <h3 className="text-2xl md:text-3xl font-display font-bold text-white mt-2">Ready to Upgrade Your Network Infrastructure?</h3>
          <p className="text-gray-400 text-sm mt-2 max-w-xl mx-auto leading-relaxed">
            Get assigned an official v8 address sub-block and register your enterprise AI clusters on the global sovereign cognitive network.
          </p>

          <form onSubmit={(e) => { e.preventDefault(); alert("Simulation registration: Your enterprise has been waitlisted for v8 sub-blocks!"); }} className="mt-8 max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input
              id="newsletter-email-input"
              type="email"
              required
              placeholder="Enter corporate email address"
              className="flex-1 px-4 py-3 bg-gray-950 rounded-lg border border-gray-800 text-xs text-gray-100 placeholder-gray-600 focus:outline-none focus:border-cyan-500 font-mono"
            />
            <button
              id="newsletter-submit-btn"
              type="submit"
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-gray-950 font-bold font-mono text-xs rounded-lg transition-all shadow-lg shadow-cyan-500/15"
            >
              Get Waitlisted Block
            </button>
          </form>
        </section>

      </main>

      {/* 11. FOOTER */}
      <footer className="border-t border-gray-900 bg-gray-950/80 pt-16 pb-8 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          
          {/* Brand Col */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center">
                <Network size={16} className="text-gray-950" />
              </div>
              <span className="text-md font-display font-extrabold text-white">IPv8 Enterprise</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed max-w-xs">
              Sovereign, AI-native layer-3 network protocol built for orbital networks, autonomous vehicle telemetry, and distributed intelligence fleets.
            </p>
            <div className="text-[10px] text-gray-500 font-mono uppercase">
              v1.4.12 • SECURE OVERLAY INTERNET
            </div>
          </div>

          {/* Column 2: Tech Specs */}
          <div className="space-y-3">
            <h5 className="text-xs font-mono font-bold text-white uppercase tracking-wider">Specifications</h5>
            <div className="grid gap-2 text-xs text-gray-400 font-mono">
              <a href="#what-is" className="hover:text-cyan-400 transition-colors">RFC Draft Standard</a>
              <a href="#features" className="hover:text-cyan-400 transition-colors">1024-Bit Framing</a>
              <a href="#sandbox" className="hover:text-cyan-400 transition-colors">BGP Bypass Tech</a>
              <a href="#tech-stack" className="hover:text-cyan-400 transition-colors">ML-KEM Cryptography</a>
            </div>
          </div>

          {/* Column 3: SDK Portal */}
          <div className="space-y-3">
            <h5 className="text-xs font-mono font-bold text-white uppercase tracking-wider">Developer Portal</h5>
            <div className="grid gap-2 text-xs text-gray-400 font-mono">
              <a href="#developer" className="hover:text-cyan-400 transition-colors">Rust SDK</a>
              <a href="#developer" className="hover:text-cyan-400 transition-colors">TypeScript Client</a>
              <a href="#developer" className="hover:text-cyan-400 transition-colors">Go Library</a>
              <a href="#developer" className="hover:text-cyan-400 transition-colors">Python Connector</a>
            </div>
          </div>

          {/* Column 4: Documents */}
          <div className="space-y-3">
            <h5 className="text-xs font-mono font-bold text-white uppercase tracking-wider">Resources</h5>
            <div className="grid gap-2 text-xs text-gray-400 font-mono">
              <button onClick={() => setIsWhitepaperOpen(true)} className="hover:text-cyan-400 transition-colors text-left">Technical Whitepaper</button>
              <a href="#metrics" className="hover:text-cyan-400 transition-colors">Performance Audits</a>
              <a href="#testimonials" className="hover:text-cyan-400 transition-colors">Enterprise Stories</a>
              <a href="#faq-section" className="hover:text-cyan-400 transition-colors">FAQ Matrix</a>
            </div>
          </div>

          {/* Column 5: Legal */}
          <div className="space-y-3">
            <h5 className="text-xs font-mono font-bold text-white uppercase tracking-wider">Sovereign Layer</h5>
            <div className="grid gap-2 text-xs text-gray-400 font-mono">
              <a href="#privacy" className="hover:text-cyan-400 transition-colors">Privacy Charter</a>
              <a href="#terms" className="hover:text-cyan-400 transition-colors">Standard Block Terms</a>
              <a href="#governance" className="hover:text-cyan-400 transition-colors">v8 Council</a>
              <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact Carrier</a>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-gray-900/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-gray-500">
          <div>
            © 2026 IPv8 Core Foundation. All rights reserved. Built for the Connected AI Era.
          </div>
          <div className="flex gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Primary Node Online</span>
            </span>
            <span className="text-gray-600">|</span>
            <span>Local Time: UTC+7</span>
          </div>
        </div>
      </footer>

      {/* 12. TECHNICAL WHITEPAPER READER MODAL */}
      <WhitepaperModal isOpen={isWhitepaperOpen} onClose={() => setIsWhitepaperOpen(false)} />

    </div>
  );
}
