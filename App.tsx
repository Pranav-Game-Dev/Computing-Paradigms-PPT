import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { SlideLayout } from './components/SlideLayout';
import { ClusterDiagram, GridDiagram } from './components/Diagrams';
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
  "Tanenbaum, A. S., & Van Steen, M. (2007). Distributed Systems: Principles and Paradigms.",
  "Foster, I., & Kesselman, C. (2003). The Grid 2: Blueprint for a New Computing Infrastructure.",
  "Buyya, R. (1999). High Performance Cluster Computing: Architectures and Systems.",
  "Top500.org. (2024). TOP500 Supercomputer Sites."
];

// --- Slide Components ---

const IntroSlide = () => (
  <div className="flex flex-col items-center justify-center text-center h-full">
    <motion.div 
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: "backOut" }}
      className="mb-12"
    >
      <h1 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 pb-2">
        Computing Paradigms
      </h1>
      <p className="text-2xl md:text-3xl text-slate-300 mt-4 font-light">
        High-Performance, Distributed, Cluster, and Grid
      </p>
    </motion.div>

    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
      {teamMembers.map((member, idx) => (
        <motion.div
          key={member.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + idx * 0.1 }}
          className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 hover:border-cyan-500/50 transition-colors"
        >
          <div className="text-lg font-semibold text-slate-100">{member.name}</div>
          <div className="text-sm text-cyan-400 font-mono">ID: {member.id}</div>
        </motion.div>
      ))}
    </div>
  </div>
);

const HPCIntroduction = () => (
  <SlideLayout title="High-Performance Computing (HPC)" subtitle="The Quest for Speed">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div className="space-y-6 text-lg text-slate-300">
        <p>
          <strong className="text-cyan-400">Definition:</strong> The use of supercomputers and parallel processing techniques to solve complex computational problems.
        </p>
        <ul className="list-disc pl-6 space-y-3 marker:text-purple-500">
          <li>Focuses on <span className="text-white font-bold">performance</span> (FLOPS).</li>
          <li>Used for weather forecasting, molecular modeling, and physical simulations.</li>
          <li>Historically relies on specialized hardware (Vector processors, GPUs).</li>
        </ul>
      </div>
      <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent"></div>
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="flex gap-2">
            {[1,2,3,4].map(i => (
              <motion.div 
                key={i}
                animate={{ height: [20, 60, 30, 80, 40] }}
                transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.1 }}
                className="w-8 bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-sm"
              />
            ))}
          </div>
          <p className="font-mono text-sm text-cyan-200">Processing...</p>
        </div>
      </div>
    </div>
  </SlideLayout>
);

const DistributedComp = () => (
  <SlideLayout title="Distributed Computing" subtitle="Divide and Conquer">
    <div className="flex flex-col gap-8 text-lg text-slate-300">
      <p>
        A field of computer science that studies systems consisting of autonomous computers that communicate through a computer network.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Transparency", desc: "System appears as a single entity to users." },
          { title: "Scalability", desc: "Easily add resources to handle load." },
          { title: "Reliability", desc: "No single point of failure." },
        ].map((item, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.2 }}
            className="bg-slate-800/50 p-6 rounded-lg border-l-4 border-purple-500"
          >
            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
            <p className="text-slate-400">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </SlideLayout>
);

const ClusterComp = () => (
  <SlideLayout title="Cluster Computing" subtitle="Strength in Numbers">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
      <div className="space-y-4 text-slate-300">
        <p>A set of loosely or tightly connected computers that work together so that, in many respects, they can be viewed as a single system.</p>
        <ul className="space-y-2">
          <li className="flex items-center gap-2"><div className="w-2 h-2 bg-cyan-500 rounded-full"/> <strong>COTS:</strong> Commercial Off-The-Shelf hardware.</li>
          <li className="flex items-center gap-2"><div className="w-2 h-2 bg-cyan-500 rounded-full"/> <strong>LAN:</strong> Typically connected via high-speed local networks.</li>
          <li className="flex items-center gap-2"><div className="w-2 h-2 bg-cyan-500 rounded-full"/> <strong>SSI:</strong> Single System Image middleware.</li>
          <li className="flex items-center gap-2"><div className="w-2 h-2 bg-cyan-500 rounded-full"/> <strong>Examples:</strong> Beowulf clusters.</li>
        </ul>
      </div>
      <div className="bg-slate-900/50 rounded-xl p-8 border border-slate-700">
        <ClusterDiagram />
      </div>
    </div>
  </SlideLayout>
);

const GridComp = () => (
  <SlideLayout title="Grid Computing" subtitle="The Virtual Supercomputer">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
      <div className="order-2 md:order-1 bg-slate-900/50 rounded-xl p-8 border border-slate-700">
        <GridDiagram />
      </div>
      <div className="order-1 md:order-2 space-y-4 text-slate-300">
        <p>A distributed architecture of large numbers of distinct systems to solve a single complex problem.</p>
        <ul className="space-y-2">
          <li className="flex items-center gap-2"><div className="w-2 h-2 bg-purple-500 rounded-full"/> <strong>Heterogeneous:</strong> Different OS, hardware, policies.</li>
          <li className="flex items-center gap-2"><div className="w-2 h-2 bg-purple-500 rounded-full"/> <strong>Virtual Orgs:</strong> Dynamic collections of individuals/institutions.</li>
          <li className="flex items-center gap-2"><div className="w-2 h-2 bg-purple-500 rounded-full"/> <strong>Wide Area:</strong> Distributed across geography.</li>
        </ul>
      </div>
    </div>
  </SlideLayout>
);

const Comparison = () => (
  <SlideLayout title="Cluster vs. Grid" subtitle="Key Differences">
    <div className="overflow-hidden rounded-xl border border-slate-700 shadow-2xl">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-800 text-slate-200">
            <th className="p-4 border-b border-slate-700">Feature</th>
            <th className="p-4 border-b border-slate-700 text-cyan-400">Cluster Computing</th>
            <th className="p-4 border-b border-slate-700 text-purple-400">Grid Computing</th>
          </tr>
        </thead>
        <tbody className="bg-slate-800/30 text-slate-300">
          {[
            { f: "Coupling", c: "Tightly Coupled", g: "Loosely Coupled" },
            { f: "Hardware", c: "Homogeneous (mostly)", g: "Heterogeneous" },
            { f: "Management", c: "Centralized", g: "Decentralized" },
            { f: "Network", c: "LAN (Low Latency)", g: "WAN (High Latency)" },
            { f: "Security", c: "Single Domain trust", g: "Cross-Domain trust" }
          ].map((row, i) => (
            <motion.tr 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="border-b border-slate-700/50 hover:bg-slate-700/30"
            >
              <td className="p-4 font-semibold text-white">{row.f}</td>
              <td className="p-4">{row.c}</td>
              <td className="p-4">{row.g}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  </SlideLayout>
);

const Conclusion = () => (
  <SlideLayout title="Conclusion">
    <div className="flex flex-col gap-6 text-xl text-slate-300 max-w-3xl">
      <p>
        While <span className="text-cyan-400 font-bold">HPC</span> pushes the boundaries of raw processing speed, distributed paradigms like <span className="text-purple-400 font-bold">Grid</span> and <span className="text-cyan-400 font-bold">Cluster</span> computing allow us to scale beyond the physical limits of a single machine.
      </p>
      <div className="p-6 bg-slate-800 rounded-lg border-l-4 border-green-500">
        <p className="italic text-slate-200">
          "The network is the computer."
        </p>
      </div>
      <p>
        Understanding these paradigms is essential for modern cloud architecture, big data processing, and scientific research.
      </p>
    </div>
  </SlideLayout>
);

const ReferencesSlide = () => (
  <SlideLayout title="References">
    <div className="space-y-4">
      {references.map((ref, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="flex gap-4 items-start text-slate-300 bg-slate-800/30 p-4 rounded hover:bg-slate-800/60 transition-colors"
        >
          <span className="text-cyan-500 font-mono">[{i + 1}]</span>
          <p className="text-sm md:text-base">{ref}</p>
        </motion.div>
      ))}
    </div>
  </SlideLayout>
);

const ThankYou = () => (
  <div className="flex flex-col items-center justify-center h-full text-center relative overflow-hidden">
     <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
        <div className="w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-[100px] animate-pulse"></div>
     </div>
     
     <motion.h1 
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-purple-300 mb-8 z-10"
     >
      Thank You
     </motion.h1>
     
     <motion.div
       initial={{ y: 50, opacity: 0 }}
       animate={{ y: 0, opacity: 1 }}
       transition={{ delay: 0.5 }}
       className="z-10"
     >
       <p className="text-slate-400 text-xl">Any Questions?</p>
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
  Comparison,
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
    // Attempt fullscreen
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
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Computing Paradigms</h1>
          <p className="text-slate-400 mb-8">Interactive Presentation</p>
          
          <div className="bg-slate-800 p-4 rounded-lg text-left text-sm text-slate-300 mb-8 space-y-2">
            <p className="font-semibold text-slate-200 border-b border-slate-700 pb-2 mb-2">Controls:</p>
            <div className="flex justify-between"><span>Next</span> <kbd className="bg-slate-700 px-2 rounded">Space</kbd> or <kbd className="bg-slate-700 px-2 rounded">→</kbd></div>
            <div className="flex justify-between"><span>Prev</span> <kbd className="bg-slate-700 px-2 rounded">Shift+Space</kbd> or <kbd className="bg-slate-700 px-2 rounded">←</kbd></div>
          </div>

          <button 
            onClick={startPresentation}
            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-cyan-900/20"
          >
            <Play size={24} fill="currentColor" />
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
      {/* 16:9 Aspect Ratio Container */}
      <div className="w-full max-w-[177.78vh] aspect-video bg-slate-950 relative shadow-2xl overflow-hidden text-slate-100">
        
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-slate-800 z-50">
          <motion.div 
            className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
            initial={{ width: 0 }}
            animate={{ width: `${((activeSlide + 1) / slides.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Slide Render Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="w-full h-full"
            onClick={nextSlide} // Click to advance
          >
            <SlideComponent />
          </motion.div>
        </AnimatePresence>

        {/* Floating Controls */}
        <div className="absolute bottom-6 right-6 flex gap-2 z-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={(e) => { e.stopPropagation(); prevSlide(); }} 
            className="p-2 bg-slate-800/80 hover:bg-slate-700 rounded-full backdrop-blur text-white"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); nextSlide(); }}
            className="p-2 bg-slate-800/80 hover:bg-slate-700 rounded-full backdrop-blur text-white"
          >
            <ChevronRight size={24} />
          </button>
          <button 
             onClick={(e) => { 
               e.stopPropagation(); 
               if (!document.fullscreenElement) containerRef.current?.requestFullscreen();
               else document.exitFullscreen();
             }}
             className="p-2 bg-slate-800/80 hover:bg-slate-700 rounded-full backdrop-blur text-white ml-2"
          >
            <Maximize size={24} />
          </button>
        </div>

        {/* Slide Counter */}
        <div className="absolute bottom-6 left-6 text-slate-600 font-mono text-sm z-50 select-none pointer-events-none">
          {activeSlide + 1} / {slides.length}
        </div>
      </div>
    </div>
  );
}