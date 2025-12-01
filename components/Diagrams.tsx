import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Play, Pause, Settings2 } from 'lucide-react';

// --- Shared Types & Components ---

interface DiagramProps {
  isPlaying: boolean;
  speed: number;
}

const Tooltip = ({ content, x, y }: { content: string; x: number; y: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className="absolute z-50 bg-slate-900 border border-slate-700 text-slate-200 text-xs px-2 py-1 rounded shadow-xl pointer-events-none whitespace-nowrap"
    style={{ left: x, top: y, transform: 'translate(-50%, -120%)' }}
  >
    {content}
  </motion.div>
);

const LegendItem = ({ color, label }: { color: string; label: string }) => (
  <div className="flex items-center gap-2 text-xs text-slate-400">
    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
    <span>{label}</span>
  </div>
);

// --- Shell Component ---

interface InteractiveDiagramProps {
  title: string;
  caption: string;
  children: (props: DiagramProps) => React.ReactNode;
  legendItems?: { color: string; label: string }[];
}

export const InteractiveDiagram: React.FC<InteractiveDiagramProps> = ({ title, caption, children, legendItems }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const prefersReducedMotion = useReducedMotion();

  // Auto-pause if reduced motion preference is detected
  useEffect(() => {
    if (prefersReducedMotion) setIsPlaying(false);
  }, [prefersReducedMotion]);

  return (
    <div className="flex flex-col h-full w-full bg-slate-900/50 rounded-xl border border-slate-700 overflow-hidden shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-slate-700 bg-slate-800/50">
        <h3 className="font-semibold text-slate-200 text-sm flex items-center gap-2">
          <Settings2 size={16} className="text-cyan-400" />
          {title}
        </h3>
        <div className="flex items-center gap-2">
           {/* Speed Controls */}
          <div className="flex bg-slate-800 rounded p-0.5 border border-slate-600">
            {[0.5, 1, 2].map((s) => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className={`px-2 py-0.5 text-[10px] font-mono rounded ${speed === s ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
                aria-label={`Set speed to ${s}x`}
              >
                {s}x
              </button>
            ))}
          </div>
          {/* Play/Pause */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 rounded bg-cyan-600 hover:bg-cyan-500 text-white transition-colors"
            aria-label={isPlaying ? "Pause animation" : "Play animation"}
          >
            {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
          </button>
        </div>
      </div>

      {/* Visualization Area */}
      <div className="relative flex-1 bg-slate-950/50 overflow-hidden group flex items-center justify-center">
        {children({ isPlaying, speed })}
      </div>

      {/* Footer / Legend */}
      <div className="p-3 bg-slate-800/30 border-t border-slate-700 flex flex-col md:flex-row gap-3 md:items-center justify-between text-xs">
        <p className="text-slate-400 italic">{caption}</p>
        {legendItems && (
           <div className="flex gap-4 flex-wrap">
             {legendItems.map((item, i) => <LegendItem key={i} {...item} />)}
           </div>
        )}
      </div>
    </div>
  );
};

// --- Specific Visualization Contents ---

const HpcContent: React.FC<DiagramProps> = ({ isPlaying, speed }) => {
  const [activeNode, setActiveNode] = useState<number | null>(null);

  return (
    <div className="w-full h-full flex items-center justify-center relative p-4">
      <svg viewBox="0 0 400 200" className="w-full h-full max-w-lg">
        {/* Interconnect Mesh */}
        <g stroke="#1e293b" strokeWidth="2">
          {[0, 1, 2, 3].map(row => 
            <line key={`r-${row}`} x1="100" y1={40 + row * 40} x2="300" y2={40 + row * 40} />
          )}
          {[0, 1, 2, 3].map(col => 
            <line key={`c-${col}`} x1={100 + col * 66} y1="40" x2={100 + col * 66} y2="160" />
          )}
        </g>

        {/* Nodes */}
        {Array.from({ length: 16 }).map((_, i) => {
          const row = Math.floor(i / 4);
          const col = i % 4;
          const x = 100 + col * 66;
          const y = 40 + row * 40;
          
          return (
            <motion.g 
              key={i}
              onHoverStart={() => setActiveNode(i)}
              onHoverEnd={() => setActiveNode(null)}
              tabIndex={0}
              className="cursor-pointer outline-none"
              aria-label={`Node ${i + 1}: ${activeNode === i ? 'Active' : 'Idle'}`}
            >
              <rect 
                x={x - 20} y={y - 15} width="40" height="30" rx="4"
                fill="#0f172a" stroke={activeNode === i ? '#22d3ee' : '#334155'} strokeWidth="2"
              />
              <motion.rect
                x={x - 16} y={y - 11} width="32" height="22" rx="2"
                fill="#06b6d4"
                initial={{ opacity: 0.1 }}
                animate={{ opacity: isPlaying ? [0.1, 0.8, 0.1] : 0.1 }}
                transition={{ duration: 1 / speed, delay: i * 0.05, repeat: Infinity, repeatDelay: 1 }}
              />
            </motion.g>
          )
        })}
        
        {/* Active Data Flow Animation */}
        {isPlaying && (
          <motion.circle 
             cx="50" cy="100" r="6" fill="#ef4444"
             animate={{ 
               cx: [50, 200, 200, 350],
               opacity: [0, 1, 0, 0] 
             }}
             transition={{ duration: 2 / speed, repeat: Infinity, ease: "linear" }}
          />
        )}
      </svg>
      <AnimatePresence>
        {activeNode !== null && (
           <Tooltip x={50} y={50} content={`Node ${activeNode + 1}: Active`} />
        )}
      </AnimatePresence>
    </div>
  );
};

const DistributedContent: React.FC<DiagramProps> = ({ isPlaying, speed }) => {
  const [hovered, setHovered] = useState<string | null>(null);
  
  const services = [
    { id: 'A', x: 100, y: 100, label: 'Auth' },
    { id: 'B', x: 200, y: 50, label: 'Data' },
    { id: 'C', x: 300, y: 100, label: 'Web' },
    { id: 'D', x: 200, y: 150, label: 'Log' },
  ];

  return (
    <div className="w-full h-full flex items-center justify-center relative p-4">
       <svg viewBox="0 0 400 200" className="w-full h-full max-w-lg">
          {/* Network Cloud BG */}
          <path d="M50,100 Q100,20 200,20 T350,100 T200,180 T50,100" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
          
          {/* Links */}
          <line x1="100" y1="100" x2="200" y2="50" stroke="#475569" strokeWidth="1" />
          <line x1="200" y1="50" x2="300" y2="100" stroke="#475569" strokeWidth="1" />
          <line x1="300" y1="100" x2="200" y2="150" stroke="#475569" strokeWidth="1" />
          <line x1="200" y1="150" x2="100" y2="100" stroke="#475569" strokeWidth="1" />

          {/* Services */}
          {services.map(s => (
            <g 
              key={s.id} 
              onMouseEnter={() => setHovered(s.id)}
              onMouseLeave={() => setHovered(null)}
              tabIndex={0}
              className="outline-none cursor-help"
            >
              <circle cx={s.x} cy={s.y} r="25" fill="#1e293b" stroke={hovered === s.id ? '#d8b4fe' : '#a855f7'} strokeWidth="2" />
              <text x={s.x} y={s.y} dy="4" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontWeight="bold">{s.label}</text>
            </g>
          ))}

          {/* Messages */}
          {isPlaying && (
            <>
              <motion.circle r="4" fill="#fbbf24"
                animate={{ cx: [100, 200], cy: [100, 50], opacity: [1, 1] }}
                transition={{ duration: 1.5 / speed, repeat: Infinity }}
              />
              <motion.circle r="4" fill="#fbbf24"
                animate={{ cx: [200, 300], cy: [50, 100], opacity: [1, 1] }}
                transition={{ duration: 1.5 / speed, delay: 0.5, repeat: Infinity }}
              />
               <motion.circle r="4" fill="#fbbf24"
                animate={{ cx: [300, 200], cy: [100, 150], opacity: [1, 1] }}
                transition={{ duration: 1.5 / speed, delay: 1, repeat: Infinity }}
              />
            </>
          )}
       </svg>
       <AnimatePresence>
        {hovered && (
           <Tooltip x={50} y={50} content={`Service ${hovered}: Active`} />
        )}
       </AnimatePresence>
    </div>
  );
};

const ClusterContent: React.FC<DiagramProps> = ({ isPlaying, speed }) => {
  const [hovered, setHovered] = useState<string | null>(null);
  
  return (
    <div className="w-full h-full flex items-center justify-center relative p-4">
      <svg viewBox="0 0 400 200" className="w-full h-full max-w-lg">
         {/* Connections */}
         <path d="M200,50 L200,90" stroke="#475569" strokeWidth="2" />
         <path d="M50,150 L200,90 L350,150" stroke="#475569" strokeWidth="2" />
         <path d="M150,150 L200,90 L250,150" stroke="#475569" strokeWidth="2" />
         
         {/* Switch */}
         <rect x="160" y="80" width="80" height="20" rx="4" fill="#334155" />
         <text x="200" y="94" textAnchor="middle" fill="#94a3b8" fontSize="10">SWITCH</text>

         {/* Head Node */}
         <g 
           onMouseEnter={() => setHovered('HEAD')} onMouseLeave={() => setHovered(null)}
           className="cursor-pointer"
         >
            <rect x="170" y="10" width="60" height="40" rx="4" fill="#1e293b" stroke={hovered === 'HEAD' ? '#86efac' : '#22c55e'} strokeWidth="2" />
            <text x="200" y="35" textAnchor="middle" fill="#fff" fontSize="10">HEAD</text>
         </g>

         {/* Workers */}
         {[50, 150, 250, 350].map((x, i) => (
            <g key={i} onMouseEnter={() => setHovered(`W${i}`)} onMouseLeave={() => setHovered(null)} className="cursor-pointer">
               <rect x={x - 20} y={150} width="40" height="30" rx="2" fill="#1e293b" stroke="#475569" strokeWidth="2" />
               <motion.rect 
                  x={x - 16} y={154} width="32" height="22" rx="1" fill="#22c55e"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isPlaying ? [0, 0.5, 0] : 0 }}
                  transition={{ duration: 1 / speed, delay: i * 0.2, repeat: Infinity }}
               />
            </g>
         ))}
         
         {/* Job Packet */}
         {isPlaying && (
           <motion.circle r="4" fill="#fff"
             animate={{ cx: [200, 200, 50], cy: [50, 90, 150] }}
             transition={{ duration: 1.5 / speed, repeat: Infinity, ease: "linear" }}
           />
         )}
      </svg>
       <AnimatePresence>
        {hovered === 'HEAD' && <Tooltip x={50} y={20} content="Manager / Scheduler" />}
        {hovered?.startsWith('W') && <Tooltip x={50} y={20} content="Worker Node" />}
       </AnimatePresence>
    </div>
  );
};

const GridContent: React.FC<DiagramProps> = ({ isPlaying, speed }) => {
  const [hovered, setHovered] = useState<string | null>(null);
  
  return (
    <div className="w-full h-full flex items-center justify-center relative p-4">
      <svg viewBox="0 0 400 200" className="w-full h-full max-w-lg">
         {/* Middleware / Internet */}
         <ellipse cx="200" cy="100" rx="60" ry="30" fill="none" stroke="#334155" strokeDasharray="4 4" />
         
         {/* Broker */}
         <g onMouseEnter={() => setHovered('BROKER')} onMouseLeave={() => setHovered(null)}>
            <polygon points="200,80 220,100 200,120 180,100" fill="#1e293b" stroke="#f472b6" strokeWidth="2" />
            <text x="200" y="104" textAnchor="middle" fill="#f472b6" fontSize="8">BROKER</text>
         </g>

         {/* Resources (Heterogeneous) */}
         {/* Site A (Server) */}
         <g transform="translate(60, 60)" onMouseEnter={() => setHovered('Site A')} onMouseLeave={() => setHovered(null)}>
            <rect width="30" height="40" fill="#1e293b" stroke="#60a5fa" strokeWidth="2" />
            <path d="M0,20 L30,20" stroke="#60a5fa" />
         </g>
         <path d="M90,80 L160,100" stroke="#475569" strokeDasharray="2 2" />

         {/* Site B (PC) */}
         <g transform="translate(320, 60)" onMouseEnter={() => setHovered('Site B')} onMouseLeave={() => setHovered(null)}>
            <rect width="40" height="30" fill="#1e293b" stroke="#60a5fa" strokeWidth="2" rx="4"/>
            <rect y="32" x="10" width="20" height="5" fill="#60a5fa" />
         </g>
         <path d="M320,80 L240,100" stroke="#475569" strokeDasharray="2 2" />

         {/* Site C (Database) */}
         <g transform="translate(185, 150)" onMouseEnter={() => setHovered('Site C')} onMouseLeave={() => setHovered(null)}>
            <path d="M0,5 Q15,0 30,5 V25 Q15,30 0,25 Z" fill="#1e293b" stroke="#60a5fa" strokeWidth="2" />
            <path d="M0,5 Q15,10 30,5" fill="none" stroke="#60a5fa" />
         </g>
         <path d="M200,150 L200,130" stroke="#475569" strokeDasharray="2 2" />

         {/* Animated Query */}
         {isPlaying && (
            <motion.circle r="3" fill="#f472b6"
               animate={{ cx: [200, 90, 200, 340, 200, 200], cy: [100, 80, 100, 80, 100, 150], opacity: [0,1,1,1,1,0] }}
               transition={{ duration: 4 / speed, repeat: Infinity, times: [0, 0.2, 0.4, 0.6, 0.8, 1] }}
            />
         )}
      </svg>
      <AnimatePresence>
         {hovered && <Tooltip x={50} y={20} content={`${hovered}: Resource Pool`} />}
      </AnimatePresence>
    </div>
  );
};

// --- Exported Diagram Components ---

export const HpcDiagram: React.FC = () => {
  return (
    <InteractiveDiagram
      title="HPC Architecture"
      caption="Tightly coupled nodes processing data in parallel."
      legendItems={[{ color: '#06b6d4', label: 'Compute Node' }, { color: '#ef4444', label: 'Job/Data' }]}
    >
      {(props) => <HpcContent {...props} />}
    </InteractiveDiagram>
  );
};

export const DistributedDiagram: React.FC = () => {
  return (
    <InteractiveDiagram
      title="Distributed System"
      caption="Autonomous nodes communicating via message passing."
      legendItems={[{ color: '#a855f7', label: 'Service' }, { color: '#fbbf24', label: 'Message' }]}
    >
      {(props) => <DistributedContent {...props} />}
    </InteractiveDiagram>
  );
};

export const ClusterDiagram: React.FC = () => {
  return (
    <InteractiveDiagram
      title="Cluster Computing"
      caption="Centralized management with a Head Node and Worker Nodes."
      legendItems={[{ color: '#22c55e', label: 'Head Node' }, { color: '#334155', label: 'Worker' }]}
    >
      {(props) => <ClusterContent {...props} />}
    </InteractiveDiagram>
  );
};

export const GridDiagram: React.FC = () => {
  return (
    <InteractiveDiagram
      title="Grid Computing"
      caption="Heterogeneous, dispersed resources (Virtual Organizations)."
      legendItems={[{ color: '#f472b6', label: 'Broker' }, { color: '#60a5fa', label: 'Resource' }]}
    >
      {(props) => <GridContent {...props} />}
    </InteractiveDiagram>
  );
};