import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X } from 'lucide-react';

interface Purchase {
  name: string;
  plan: string;
  time: string;
  location: string;
}

const purchaseData: Purchase[] = [
  { name: "Bruna V.", plan: "Plano Completo", time: "há 1min", location: "Florianópolis, SC" },
  { name: "Mariana S.", plan: "Plano Completo", time: "há 30s", location: "São Paulo, SP" },
  { name: "Alessandra M.", plan: "Só o Guia Básico", time: "há 2min", location: "Rio de Janeiro, RJ" },
  { name: "Juliana C.", plan: "Plano Completo", time: "há 45s", location: "Belo Horizonte, MG" },
  { name: "Camila R.", plan: "Plano Completo", time: "há 1min", location: "Porto Alegre, RS" },
  { name: "Letícia F.", plan: "Só o Guia Básico", time: "há 3min", location: "Curitiba, PR" },
  { name: "Amanda T.", plan: "Plano Completo", time: "há 5min", location: "Salvador, BA" },
  { name: "Priscila O.", plan: "Plano Completo", time: "há 7min", location: "Campinas, SP" },
  { name: "Gabriela G.", plan: "Plano Completo", time: "há 20s", location: "Goiânia, GO" },
  { name: "Patrícia B.", plan: "Plano Completo", time: "há 1min", location: "Recife, PE" },
];

export function PurchaseNotification() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    let timeoutId: NodeJS.Timeout;
    let nextTimeoutId: NodeJS.Timeout;

    // Elegant cycle: Stays visible for 5s, then hidden for 14s (Total 19s cycle)
    const runCycle = () => {
      setIsVisible(true);

      timeoutId = setTimeout(() => {
        setIsVisible(false);

        nextTimeoutId = setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % purchaseData.length);
          runCycle();
        }, 14000); // 14 seconds hidden (silence)
      }, 5000); // 5 seconds visible
    };

    // First one appears quickly after page resources settle
    const initialTimeout = setTimeout(() => {
      runCycle();
    }, 4000);

    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(timeoutId);
      clearTimeout(nextTimeoutId);
    };
  }, [isDismissed]);

  if (isDismissed) return null;

  const current = purchaseData[currentIndex];

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
    setTimeout(() => {
      setIsDismissed(true);
    }, 300);
  };

  return (
    <div className="fixed top-4 sm:top-6 right-4 sm:right-6 z-[200] pointer-events-none w-[calc(100%-2rem)] sm:w-[310px]">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, x: 80, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="pointer-events-auto bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-[0_8px_25px_rgba(227,107,60,0.12)] border border-[#F2ECE4] flex items-center gap-3 relative max-w-full overflow-hidden"
          >
            {/* Subtle light coral design glow on right corner */}
            <div className="absolute top-0 right-0 w-24 h-full bg-radial from-coral/5 to-transparent pointer-events-none" />

            {/* Micro close button */}
            <button
              onClick={handleClose}
              className="absolute top-1.5 right-2 text-stone-300 hover:text-stone-500 transition-colors cursor-pointer p-0.5 rounded-full hover:bg-stone-50 z-10"
              aria-label="Minimizar"
            >
              <X size={11} strokeWidth={3} />
            </button>

            {/* Micro Icon Badge */}
            <div className="w-8 h-8 rounded-full bg-coral flex items-center justify-center shrink-0 shadow-[0_3px_8px_rgba(227,107,60,0.2)] ring-4 ring-coral/5 relative z-10">
              <Check className="w-3.5 h-3.5 text-white stroke-[3.5]" />
            </div>

            {/* Extremely compact content */}
            <div className="flex-1 min-w-0 flex flex-col relative z-10 pr-6">
              {/* Header: Bullet + COMPRA RECENTE */}
              <div className="flex items-center gap-1 mb-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-coral shrink-0" />
                <span className="font-sans text-[9px] font-extrabold tracking-widest text-[#B26B54]/90 uppercase">
                  COMPRA RECENTE
                </span>
              </div>
              
              {/* Buyer & product text */}
              <p className="font-sans text-[12px] sm:text-[13px] text-stone-800 leading-tight">
                <strong>{current.name}</strong> garantiu o <span className="text-coral-dark font-extrabold">{current.plan}</span>
              </p>
              
              {/* Location */}
              <span className="font-sans text-[10.5px] text-stone-400 mt-0.5">
                {current.location}
              </span>
            </div>

            {/* Dynamic mini time pill positioned cleanly */}
            <div className="absolute bottom-2.5 right-2.5 z-10">
              <div className="border border-coral/10 bg-[#FCF7F3] px-2 py-0.5 rounded-full shadow-2xs">
                <span className="font-sans text-[9.5px] font-black text-[#C0603F]">
                  {current.time}
                </span>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
