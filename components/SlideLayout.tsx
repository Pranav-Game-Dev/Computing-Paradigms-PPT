import React from 'react';
import { motion } from 'framer-motion';

interface SlideLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const SlideLayout: React.FC<SlideLayoutProps> = ({ title, subtitle, children }) => {
  return (
    <div className="flex flex-col h-full w-full p-12 md:p-16 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-8 z-10"
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 mb-2">
          {title}
        </h1>
        {subtitle && (
          <h2 className="text-xl text-slate-400 font-light tracking-wide border-l-4 border-cyan-500 pl-4">
            {subtitle}
          </h2>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className="flex-1 flex flex-col justify-center z-10"
      >
        {children}
      </motion.div>
    </div>
  );
};