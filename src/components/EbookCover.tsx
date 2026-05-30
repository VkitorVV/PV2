import React from 'react';
import { BookOpen, Sparkles } from 'lucide-react';

interface EbookCoverProps {
  className?: string;
  badge?: string;
}

export default function EbookCover({ className = "", badge = "Guia Digital" }: EbookCoverProps) {
  return (
    <div 
      className={`aspect-[3/4] w-full rounded-2xl bg-[#fbf6f1] border-3 border-[#3d2b29]/15 flex flex-col justify-between overflow-hidden relative shadow-2xl ${className} select-none`}
      style={{ boxShadow: '0 25px 50px -12px rgba(61,43,41,0.18), inset 0 1px 0 rgba(255,255,255,0.6)' }}
    >
      {/* Editorial Decorative Watercolor Background Wash */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#e36b3c]/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-28 h-28 bg-[#7a9b7e]/10 rounded-full blur-2xl pointer-events-none" />
      
      {/* Skeuomorphic book spine depth indicators */}
      <div className="absolute top-0 left-0 bottom-0 w-3 bg-gradient-to-r from-black/15 via-black/5 to-transparent z-20" />
      <div className="absolute top-0 left-3 bottom-0 w-1 bg-white/30 z-20" />
      <div className="absolute top-0 left-4 bottom-0 w-[1px] bg-[#3d2b29]/10 z-20" />

      {/* Decorative floral or organic thin grid accent line */}
      <div className="absolute inset-x-6 top-8 bottom-8 border border-[#3d2b29]/5 pointer-events-none rounded-lg" />

      {/* Header Info */}
      <div className="p-5 pt-7 text-center relative z-10">
        <span className="text-[9px] tracking-[0.25em] uppercase font-bold text-[#e36b3c] bg-[#e36b3c]/8 px-2.5 py-1 rounded-full font-sans">
          {badge}
        </span>
      </div>

      {/* Core Book Title */}
      <div className="flex-1 flex flex-col justify-center items-center text-center px-6 relative z-10 space-y-2">
        <div className="text-[#e36b3c] font-serif italic text-4xl sm:text-5xl font-extrabold leading-none drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
          +120
        </div>
        
        <div className="w-8 h-0.5 bg-[#e36b3c]/40 rounded-full my-1" />
        
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#3d2b29] leading-tight tracking-tight uppercase">
          Dinâmicas
          <span className="block italic text-[#e36b3c] normal-case mt-1 font-serif tracking-normal text-lg sm:text-xl">
            de Sofá
          </span>
        </h3>
        
        <div className="w-12 h-0.5 bg-[#3d2b29]/15 rounded-full my-1" />
        
        <p className="text-[10px] font-sans uppercase tracking-widest text-[#3d2b29]/75 font-semibold">
          Para Mães Cansadas
        </p>
      </div>

      {/* Footer Strap block */}
      <div className="bg-[#3d2b29] py-3.5 px-4 flex items-center justify-center relative z-10 shadow-md">
        <div className="text-[8px] sm:text-[9px] text-[#fbf6f1] tracking-[0.22em] font-extrabold uppercase flex items-center gap-1.5 font-sans">
          <BookOpen size={9} className="text-[#7a9b7e]" />
          <span>GUIA EM PDF</span>
          <span className="text-[#e36b3c]/50">•</span>
          <span>153 PÁGINAS</span>
        </div>
      </div>
      
      {/* Highlight glow layer */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none mix-blend-overlay z-10" />
    </div>
  );
}
