import React from 'react';
import { motion } from 'framer-motion';

export const ClusterDiagram: React.FC = () => {
  return (
    <div className="relative w-full h-64 flex items-center justify-center">
      {/* Central Switch */}
      <motion.div
        className="absolute w-24 h-12 bg-slate-700 rounded-lg border border-cyan-500 flex items-center justify-center z-20 shadow-[0_0_15px_rgba(6,182,212,0.5)]"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-xs font-bold text-cyan-100">SWITCH</span>
      </motion.div>

      {/* Nodes */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i * 60 * Math.PI) / 180;
        const radius = 120;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <motion.div
            key={i}
            className="absolute z-10"
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{ opacity: 1, x, y }}
            transition={{ delay: 0.5 + i * 0.1, duration: 0.5, type: 'spring' }}
          >
            {/* Connection Line */}
            <svg className="absolute top-1/2 left-1/2 w-0 h-0 overflow-visible">
               <motion.line
                 x1={-x} y1={-y} x2={0} y2={0}
                 stroke="#475569" strokeWidth="2"
                 initial={{ pathLength: 0 }}
                 animate={{ pathLength: 1 }}
                 transition={{ delay: 1 + i * 0.1, duration: 0.5 }}
               />
            </svg>
            {/* Node Box */}
            <div className="w-12 h-12 bg-slate-800 border border-slate-600 rounded flex flex-col items-center justify-center transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-8 h-6 bg-slate-900 mb-1 border-b border-slate-600"></div>
                <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </motion.div>
        );
      })}
      <div className="absolute bottom-[-40px] text-slate-400 text-sm">Tight Coupling via LAN</div>
    </div>
  );
};

export const GridDiagram: React.FC = () => {
  return (
    <div className="relative w-full h-64 flex items-center justify-center">
      {/* Internet Cloud */}
      <motion.div
        className="absolute z-10 opacity-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1 }}
      >
        <svg viewBox="0 0 100 100" width="300" height="200" fill="white">
            <path d="M25,60 Q10,60 10,45 Q10,30 25,30 Q30,10 50,10 Q70,10 75,30 Q90,30 90,45 Q90,60 75,60 Q70,80 50,80 Q30,80 25,60 Z" />
        </svg>
      </motion.div>

      {/* Sites */}
      {['Site A', 'Site B', 'Site C'].map((site, i) => {
        const xOffset = (i - 1) * 160;
        return (
            <motion.div
                key={site}
                className="absolute flex flex-col items-center"
                style={{ x: xOffset }}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.3 }}
            >
                <div className="w-20 h-20 rounded-full border-2 border-dashed border-purple-500 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm z-20">
                    <span className="text-xs text-purple-300 font-bold">{site}</span>
                </div>
                <div className="mt-2 text-[10px] text-slate-500">Resource Domain</div>
            </motion.div>
        )
      })}

      {/* Connection Arcs */}
      <svg className="absolute w-full h-full pointer-events-none z-15">
        <motion.path
            d="M 170 128 Q 250 80 330 128" /* Hardcoded approximation for 160px spacing centered */
            fill="none"
            stroke="#a855f7"
            strokeWidth="2"
            strokeDasharray="5,5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </svg>
      <div className="absolute bottom-[-40px] text-slate-400 text-sm">Loose Coupling via WAN / Middleware</div>
    </div>
  );
};