import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize, ChevronLeft, ChevronRight, Play, Info } from 'lucide-react';
import { SlideLayout } from './components/SlideLayout';
import { HpcDiagram, DistributedDiagram, ClusterDiagram, GridDiagram } from './components/Diagrams';
import { TeamMember } from './types';

// --- Data ---

const teamMembers: TeamMember[] = [
  { name: 'Dabhi Pranav', id: '1036' },
  { name: 'Parekh Ishit', id: '1183' },
  { name: 'Dodiya Manav', id: '1160' },
  { name: 'Yagnik Krupali', id: '1173' },
  { name: 'Pari', id: '----' },
];

const references = [
  "Hennessy, J. L., & Patterson, D. A. (2017). Computer Architecture: A Quantitative Approach. Morgan Kaufmann.",
  "Tanenbaum, A. S., & Van Steen, M. (2007). Distributed Systems: Principles and Paradigms. Pearson.",
  "Buyya, R. (1999). High Performance Cluster Computing: Architectures and Systems. Prentice Hall.",
  "Foster, I., & Kesselman, C. (2003). The Grid 2: Blueprint for a New Computing Infrastructure. Morgan Kaufmann.",
  "Top500.org. (2024). TOP500 Supercomputer Sites. [Online]."
];

// --- Slide Components ---

const IntroSlide = () => (
  <div className="flex flex-col items-center justify-center text-center h-full w-full p-12">
    <motion.div 
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.175, 0.885, 0.32, 1.275] }}
      className="mb-16"
    >
      <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 pb-4">
        Computing Paradigms
      </h1>
      <p className="text-2xl md:text-3xl text-slate-300 mt-2 font-light tracking-wide">
        High-Performance, Distributed, Cluster, and Grid
      </p>
    </motion.div>

    {/* Team Grid with Flexbox alignment for last row centering */}
    <div className="flex flex-wrap justify-center gap-6 w-full max-w-5xl">
      {teamMembers.map((member, idx) => (
        <motion.div
          key={member.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + idx * 0.1, duration: 0.5 }}
          className={`
            bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-cyan-500/50 transition-colors
            flex flex-col items-center justify-center
            w-[250px]
          `}
        >
          <div className="text-xl font-semibold text-slate-100">{member.name}</div>
          <div className="text-base text-cyan-400 font-mono mt-1">ID: {member.id}</div>
        </motion.div>
      ))}
    </div>
  </div>
);

const HPCIntroduction = () => (
  <SlideLayout title="High-Performance Computing" subtitle="Parallelism at Scale">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
      <div className="space-y-6 text-lg text-slate-300">
        <div className="bg-slate-800/40 p-6 rounded-lg border-l-4 border-cyan-500">
          <h3 className="text-xl font-bold text-white mb-2">Definition</h3>
          <p>Processing data and complex calculations at high speeds using supercomputers and parallel processing (measured in FLOPS).</p>
        </div>
        <ul className="space-y-4 text-base">
          <li className="flex items-start gap-3">
            <div className="mt-1.5 w-2 h-2 bg-cyan-400 rounded-full shrink-0" />
            <span><strong>Massive Parallelism:</strong> Utilization of thousands of processors to execute trillions of operations per second.</span>
          </li>
          <li className="flex items-start gap-3">
             <div className="mt-1.5 w-2 h-2 bg-cyan-400 rounded-full shrink-0" />
            <span><strong>Architecture:</strong> Compute nodes (CPU/GPU) linked via low-latency interconnects (InfiniBand).</span>
          </li>
          <li className="flex items-start gap-3">
             <div className="mt-1.5 w-2 h-2 bg-cyan-400 rounded-full shrink-0" />
            <span><strong>Workflow:</strong> Problem decomposition &rarr; Parallel execution &rarr; Result aggregation.</span>
          </li>
          <li className="flex items-start gap-3">
             <div className="mt-1.5 w-2 h-2 bg-cyan-400 rounded-full shrink-0" />
            <span><strong>Applications:</strong> Weather forecasting, molecular dynamics, nuclear simulations.</span>
          </li>
        </ul>
      </div>
      <div className="h-[350px]">
        <HpcDiagram />
      </div>
    </div>
  </SlideLayout>
);

const DistributedComp = () => (
  <SlideLayout title="Distributed Computing" subtitle="Decentralized Coordination">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
      <div className="order-2 lg:order-1 h-[350px]">
        <DistributedDiagram />
      </div>
      <div className="order-1 lg:order-2 space-y-6 text-lg text-slate-300">
        <div className="bg-slate-800/40 p-6 rounded-lg border-l-4 border-purple-500">
           <h3 className="text-xl font-bold text-white mb-2">Definition</h3>
           <p>A task is divided into subtasks and executed on multiple networked computers acting as a single coherent system.</p>
        </div>
        <ul className="space-y-4 text-base">
          <li className="flex items-start gap-3">
            <div className="mt-1.5 w-2 h-2 bg-purple-400 rounded-full shrink-0" />
            <span><strong>Transparency:</strong> Users perceive a single entity; system handles location and replication details.</span>
          </li>
          <li className="flex items-start gap-3">
             <div className="mt-1.5 w-2 h-2 bg-purple-400 rounded-full shrink-0" />
            <span><strong>Key Traits:</strong> Resource Sharing, Concurrency, Scalability, and Fault Tolerance.</span>
          </li>
          <li className="flex items-start gap-3">
             <div className="mt-1.5 w-2 h-2 bg-purple-400 rounded-full shrink-0" />
            <span><strong>Architecture:</strong>
                <span className="text-slate-400 block ml-1 text-sm">- Hardware (Nodes) &rarr; Middleware (RPC, RMI) &rarr; Apps.</span>
            </span>
          </li>
           <li className="flex items-start gap-3">
             <div className="mt-1.5 w-2 h-2 bg-purple-400 rounded-full shrink-0" />
            <span><strong>Types:</strong> Client-Server, Peer-to-Peer (P2P).</span>
          </li>
        </ul>
      </div>
    </div>
  </SlideLayout>
);

const ClusterComp = () => (
  <SlideLayout title="Cluster Computing" subtitle="Commodity & Homogeneity">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
      <div className="space-y-6 text-lg text-slate-300">
        <div className="bg-slate-800/40 p-6 rounded-lg border-l-4 border-green-500">
           <h3 className="text-xl font-bold text-white mb-2">Definition</h3>
           <p>Multiple computers (nodes) connected via high-speed LAN working together as a single, managed system.</p>
        </div>
        <ul className="space-y-4 text-base">
          <li className="flex items-start gap-3">
            <div className="mt-1.5 w-2 h-2 bg-green-400 rounded-full shrink-0" />
            <span><strong>Characteristics:</strong>
                <ul className="list-disc pl-4 mt-1 text-slate-400">
                    <li><strong>Parallel Processing:</strong> Load balancing across nodes.</li>
                    <li><strong>High Availability (HA):</strong> Redundancy for fault tolerance.</li>
                    <li><strong>SSI:</strong> Single System Image management.</li>
                </ul>
            </span>
          </li>
          <li className="flex items-start gap-3">
            <div className="mt-1.5 w-2 h-2 bg-green-400 rounded-full shrink-0" />
            <span><strong>Hardware:</strong> Typically built using cost-effective COTS components.</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="mt-1.5 w-2 h-2 bg-green-400 rounded-full shrink-0" />
            <span><strong>Cloud Context:</strong> Implemented via VMs or containers (e.g., Kubernetes).</span>
          </li>
        </ul>
      </div>
      <div className="h-[350px]">
        <ClusterDiagram />
      </div>
    </div>
  </SlideLayout>
);

const GridComp = () => (
  <SlideLayout title="Grid Computing" subtitle="Virtual Organizations">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
      <div className="order-2 lg:order-1 h-[350px]">
        <GridDiagram />
      </div>
      <div className="order-1 lg:order-2 space-y-6 text-lg text-slate-300">
        <div className="bg-slate-800/40 p-6 rounded-lg border-l-4 border-pink-500">
          <h3 className="text-xl font-bold text-white mb-2">Definition</h3>
          <p>Integrating geographically dispersed, heterogeneous, and loosely coupled resources into a unified system.</p>
        </div>
        <ul className="space-y-4 text-base">
          <li className="flex items-start gap-3">
            <div className="mt-1.5 w-2 h-2 bg-pink-400 rounded-full shrink-0" />
            <span><strong>Key Characteristics:</strong>
                 <ul className="list-disc pl-4 mt-1 text-slate-400">
                    <li><strong>Decentralized:</strong> Participating sites retain autonomy.</li>
                    <li><strong>Heterogeneity:</strong> Diverse hardware/OS support.</li>
                    <li><strong>Resource Sharing:</strong> Dynamic, multi-institutional pools.</li>
                 </ul>
            </span>
          </li>
          <li className="flex items-start gap-3">
            <div className="mt-1.5 w-2 h-2 bg-pink-400 rounded-full shrink-0" />
            <span><strong>Architecture:</strong> Layers &rarr; Fabric, Connectivity, Resource, Collective, Application.</span>
          </li>
        </ul>
      </div>
    </div>
  </SlideLayout>
);

const ComparisonMatrix = () => (
  <SlideLayout title="Paradigm Comparison" subtitle="Structural Differences">
    <div className="overflow-hidden rounded-xl border border-slate-700 shadow-2xl bg-slate-900/50 w-full h-full flex flex-col">
      <div className="overflow-auto flex-1">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead className="bg-slate-800 sticky top-0 z-10">
            <tr>
              <th className="p-4 text-slate-400 font-mono text-sm uppercase tracking-wider border-b border-slate-600">Feature</th>
              <th className="p-4 text-cyan-400 font-bold border-b border-slate-600 w-1/5">HPC</th>
              <th className="p-4 text-purple-400 font-bold border-b border-slate-600 w-1/5">Distributed</th>
              <th className="p-4 text-green-400 font-bold border-b border-slate-600 w-1/5">Cluster</th>
              <th className="p-4 text-pink-400 font-bold border-b border-slate-600 w-1/5">Grid</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50 text-slate-300 text-sm md:text-base">
            {[
              { f: "Coupling", h: "Very Tight", d: "Loose", c: "Tight/Loose", g: "Very Loose" },
              { f: "Latency", h: "Ultra Low", d: "High (WAN)", c: "Low (LAN)", g: "High (Internet)" },
              { f: "Nodes", h: "Specialized", d: "Autonomous", c: "Homogeneous", g: "Heterogeneous" },
              { f: "Management", h: "Centralized", d: "Decentralized", c: "Centralized Image", g: "Hierarchical/Broker" },
              { f: "Primary Goal", h: "Speed (FLOPS)", d: "Reliability/Scale", c: "Cost/Performance", g: "Collaboration" },
              { f: "Scalability", h: "Scale-up/out", d: "Scale-out", c: "Scale-out", g: "Scale-out" },
            ].map((row, i) => (
              <motion.tr 
                key={row.f}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="hover:bg-slate-800/30 transition-colors group"
              >
                <td className="p-4 font-semibold text-slate-200 bg-slate-900/20">{row.f}</td>
                <td className="p-4 group-hover:text-cyan-200 transition-colors">{row.h}</td>
                <td className="p-4 group-hover:text-purple-200 transition-colors">{row.d}</td>
                <td className="p-4 group-hover:text-green-200 transition-colors">{row.c}</td>
                <td className="p-4 group-hover:text-pink-200 transition-colors">{row.g}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 bg-slate-800/50 text-xs text-slate-400 border-t border-slate-700 flex gap-2 items-center">
        <Info size={14} />
        <span>Hover over rows for focus. Table compares typical architectural characteristics.</span>
      </div>
    </div>
  </SlideLayout>
);

const Conclusion = () => (
  <SlideLayout title="Summary & Application">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full items-center">
       <div className="space-y-6">
          <motion.div 
            initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.2}}
            className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700"
          >
             <h3 className="text-xl font-bold text-cyan-400 mb-2">Choose HPC/Cluster when:</h3>
             <ul className="list-disc pl-5 text-slate-300 space-y-1">
                <li>Problem requires massive inter-node communication.</li>
                <li>Strict latency requirements (Simulations).</li>
                <li>Single administrative domain is feasible.</li>
             </ul>
          </motion.div>
          <motion.div 
            initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.4}}
            className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700"
          >
             <h3 className="text-xl font-bold text-pink-400 mb-2">Choose Distributed/Grid when:</h3>
             <ul className="list-disc pl-5 text-slate-300 space-y-1">
                <li>Resources are geographically dispersed.</li>
                <li>Reliability and fault tolerance are paramount.</li>
                <li>Collaborating across different organizations.</li>
             </ul>
          </motion.div>
       </div>
       
       {/* Visual Replacement for Text */}
       <div className="flex items-center justify-center h-[350px] relative">
          <div className="absolute inset-0 bg-slate-900/30 rounded-full blur-3xl"></div>
          {/* Abstract Global Network SVG */}
          <motion.svg 
            viewBox="0 0 200 200" 
            className="w-full h-full max-w-sm drop-shadow-2xl"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
             <defs>
                <radialGradient id="globeGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#0f172a" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#1e293b" stopOpacity="0.2" />
                </radialGradient>
             </defs>
             <circle cx="100" cy="100" r="80" fill="url(#globeGrad)" stroke="#334155" strokeWidth="1" />
             
             {/* Nodes on globe */}
             {[...Array(8)].map((_, i) => (
                 <g key={i} transform={`rotate(${i * 45} 100 100)`}>
                    <line x1="100" y1="100" x2="100" y2="40" stroke="#06b6d4" strokeWidth="0.5" strokeOpacity="0.5" />
                    <circle cx="100" cy="40" r="3" fill="#06b6d4" />
                 </g>
             ))}
              {[...Array(6)].map((_, i) => (
                 <g key={`inner-${i}`} transform={`rotate(${i * 60 + 15} 100 100)`}>
                    <line x1="100" y1="100" x2="100" y2="60" stroke="#a855f7" strokeWidth="0.5" strokeOpacity="0.5" />
                    <circle cx="100" cy="60" r="2" fill="#a855f7" />
                 </g>
             ))}
             
             {/* Connections */}
             <path d="M100,40 Q140,60 100,160" fill="none" stroke="#22d3ee" strokeWidth="0.5" strokeOpacity="0.3" />
             <path d="M40,100 Q60,140 160,100" fill="none" stroke="#e879f9" strokeWidth="0.5" strokeOpacity="0.3" />

          </motion.svg>
          <div className="absolute font-mono text-xs text-slate-500 bottom-0 tracking-widest uppercase">Global Connectivity</div>
       </div>
    </div>
  </SlideLayout>
);

const ReferencesSlide = () => (
  <SlideLayout title="References">
    <div className="h-full flex flex-col justify-center">
      <ul className="space-y-4 max-w-4xl">
        {references.map((ref, i) => (
          <motion.li 
            key={i}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex gap-4 items-start text-slate-300 bg-slate-800/20 p-4 rounded-lg border border-transparent hover:border-slate-700 transition-colors"
          >
            <span className="text-cyan-500 font-mono text-sm shrink-0">[{i + 1}]</span>
            <p className="text-sm font-light leading-relaxed">{ref}</p>
          </motion.li>
        ))}
      </ul>
    </div>
  </SlideLayout>
);

const ThankYou = () => (
  <div className="flex flex-col items-center justify-center h-full text-center relative overflow-hidden w-full">
     <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
        <div className="w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-[100px] animate-pulse"></div>
     </div>
     
     <motion.h1 
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: "backOut" }}
      className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-purple-300 mb-8 z-10"
     >
      Thank You
     </motion.h1>
     
     <motion.div
       initial={{ y: 30, opacity: 0 }}
       animate={{ y: 0, opacity: 1 }}
       transition={{ delay: 0.5, duration: 0.5 }}
       className="z-10 space-y-4"
     >
       <p className="text-slate-300 text-2xl font-light">Any Questions?</p>
       <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full"></div>
     </motion.div>
  </div>
);

// --- Main App Component ---

const slides = [
  IntroSlide,
  HPCIntroduction,
  DistributedComp,
  ClusterComp,
  GridComp,
  ComparisonMatrix,
  Conclusion,
  ReferencesSlide,
  ThankYou
];

export default function App() {
  const [started, setStarted] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const startPresentation = () => {
    setStarted(true);
    setActiveSlide(0);
    if (containerRef.current) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.warn("Fullscreen blocked:", err);
      });
    }
  };

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => Math.min(prev + 1, slides.length - 1));
  }, []);

  const prevSlide = useCallback(() => {
    setActiveSlide((prev) => Math.max(prev - 1, 0));
  }, []);

  useEffect(() => {
    if (!started) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        if (e.shiftKey && e.key === ' ') {
            prevSlide();
        } else {
            nextSlide();
        }
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [started, nextSlide, prevSlide]);

  if (!started) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-inter">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Computing Paradigms</h1>
          <p className="text-slate-400 mb-8">Presentation Deck</p>
          
          <div className="bg-slate-800 p-4 rounded-lg text-left text-sm text-slate-300 mb-8 space-y-2">
            <p className="font-semibold text-slate-200 border-b border-slate-700 pb-2 mb-2">Controls:</p>
            <div className="flex justify-between"><span>Next</span> <span><kbd className="bg-slate-700 px-1.5 rounded">Space</kbd> / <kbd className="bg-slate-700 px-1.5 rounded">→</kbd></span></div>
            <div className="flex justify-between"><span>Prev</span> <span><kbd className="bg-slate-700 px-1.5 rounded">Shift+Space</kbd> / <kbd className="bg-slate-700 px-1.5 rounded">←</kbd></span></div>
          </div>

          <button 
            onClick={startPresentation}
            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-cyan-900/30"
          >
            <Play size={20} fill="currentColor" />
            Start Presentation
          </button>
        </div>
      </div>
    );
  }

  const SlideComponent = slides[activeSlide];

  return (
    <div 
      ref={containerRef}
      className="w-full h-screen bg-black flex items-center justify-center overflow-hidden"
    >
      {/* 16:9 Container */}
      <div className="w-full max-w-[177.78vh] aspect-video bg-slate-950 relative shadow-2xl overflow-hidden text-slate-100 flex flex-col">
        
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-slate-800 z-50">
          <motion.div 
            className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
            initial={{ width: 0 }}
            animate={{ width: `${((activeSlide + 1) / slides.length) * 100}%` }}
            transition={{ duration: 0.5, ease: "circOut" }}
          />
        </div>

        {/* Content Area */}
        <div className="flex-1 w-full h-full relative">
            <AnimatePresence mode="wait">
            <motion.div
                key={activeSlide}
                initial={{ opacity: 0, scale: 1.02, filter: 'blur(8px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.98, filter: 'blur(8px)' }}
                transition={{ duration: 0.4, ease: "anticipate" }}
                className="w-full h-full"
                onClick={(e) => {
                    // Prevent navigation when interacting with interactive diagrams
                    if ((e.target as HTMLElement).closest('button, input, [role="button"]')) return;
                    nextSlide();
                }}
            >
                <SlideComponent />
            </motion.div>
            </AnimatePresence>
        </div>

        {/* Navigation / Info Footer */}
        <div className="absolute bottom-6 right-6 flex items-center gap-4 z-50 pointer-events-auto opacity-0 hover:opacity-100 transition-opacity duration-300">
           <span className="text-slate-500 text-xs font-mono">{activeSlide + 1} / {slides.length}</span>
           <div className="h-4 w-px bg-slate-700"></div>
           <div className="flex gap-2">
            <button onClick={(e) => {e.stopPropagation(); prevSlide();}} className="p-2 bg-slate-800 hover:bg-slate-700 rounded-full text-slate-300 hover:text-white transition-colors" aria-label="Previous Slide">
                <ChevronLeft size={20} />
            </button>
            <button onClick={(e) => {e.stopPropagation(); nextSlide();}} className="p-2 bg-slate-800 hover:bg-slate-700 rounded-full text-slate-300 hover:text-white transition-colors" aria-label="Next Slide">
                <ChevronRight size={20} />
            </button>
            <button 
                onClick={(e) => { 
                e.stopPropagation(); 
                if (!document.fullscreenElement) containerRef.current?.requestFullscreen();
                else document.exitFullscreen();
                }}
                className="p-2 bg-slate-800 hover:bg-slate-700 rounded-full text-slate-300 hover:text-white transition-colors ml-2"
                aria-label="Toggle Fullscreen"
            >
                <Maximize size={20} />
            </button>
           </div>
        </div>
        
        {/* Permanent Slide Counter (Low opacity) */}
        <div className="absolute bottom-4 left-6 text-slate-700 font-mono text-xs select-none pointer-events-none z-40">
           Computing Paradigms • Slide {activeSlide + 1}
        </div>
      </div>
    </div>
  );
}