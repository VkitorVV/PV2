import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Clock, Sparkles } from 'lucide-react';

interface OfferInterceptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  onRefuseBasic: () => void;
}

export default function OfferInterceptionModal({
  isOpen,
  onClose,
  onAccept,
  onRefuseBasic,
}: OfferInterceptionModalProps) {
  const [secondsLeft, setSecondsLeft] = useState(300); // 5 minutes

  // Reset or run countdown when modal opens
  useEffect(() => {
    if (isOpen) {
      setSecondsLeft(300);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, secondsLeft]);

  if (!isOpen) return null;

  // Format time (MM:SS)
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <AnimatePresence>
      <div 
        id="offer-intercept-overlay"
        className="fixed inset-0 bg-neutral-900/85 backdrop-blur-md z-150 flex items-center justify-center p-4 overflow-y-auto"
      >
        <motion.div
          id="offer-intercept-modal"
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="bg-stone-50 border border-petroleo/10 rounded-[32px] w-full max-w-xl p-5 sm:p-8 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.4)] relative overflow-hidden my-auto"
        >
          {/* Subtle warm wash matches the main landing design styles */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-coral/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-terracotta/10 rounded-full blur-2xl pointer-events-none" />

          {/* Top Progress bar */}
          <div className="space-y-2 mb-6 relative z-10">
            <div className="w-full bg-stone-200 rounded-full h-2 overflow-hidden shadow-inner">
              <motion.div 
                initial={{ width: "0%" }}
                animate={{ width: "85%" }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="bg-emerald-500 h-full rounded-full"
              />
            </div>
            <div className="flex justify-between items-center text-[10px] font-sans font-bold text-emerald-700 uppercase tracking-widest">
              <span>Etapa 1 de 2: Confirmação do Pedido</span>
              <span>85% CONCLUÍDO</span>
            </div>
          </div>

          {/* Close button */}
          <button
            id="offer-intercept-close-btn"
            onClick={onClose}
            className="absolute top-4 right-4 text-petroleo/40 hover:text-petroleo/80 transition-colors p-2 rounded-full hover:bg-stone-200/50 z-20"
            aria-label="Voltar"
          >
            <X size={20} />
          </button>

          {/* High Urgency countdown custom pill container */}
          <div className="text-center relative z-10 space-y-4">
            
            <div className="inline-flex items-center gap-3 bg-[#3d2b29]/5 text-[#3d2b29] text-xs font-bold uppercase px-4 py-2 rounded-full border border-[#3d2b29]/10">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#e36b3c]" />
                <span className="tracking-wider">OFERTA EXPIRA EM:</span>
              </span>
              <span className="w-[1px] h-3.5 bg-[#3d2b29]/20"></span>
              <span className="font-mono bg-white text-[#e36b3c] px-2.5 py-0.5 rounded-md border border-[#3d2b29]/10 font-bold tracking-widest">{formatTime(secondsLeft)}</span>
            </div>

            {/* Headline Urgencia */}
            <h2 id="offer-intercept-headline" className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#3d2b29] font-black leading-tight tracking-tight text-center max-w-lg mx-auto">
              PARE! Você está prestes a cometer um erro...
            </h2>

            {/* Sub-headline matches editorial card style */}
            <div id="offer-intercept-subheadline" className="font-sans text-xs sm:text-sm text-petroleo font-semibold leading-relaxed bg-[#F5ECE2] border border-coral/15 p-4 rounded-2xl text-center shadow-xs max-w-lg mx-auto">
              Eu vi que você escolheu levar APENAS o Guia Básico por R$ 14,90. Mas preste muita atenção, porque esta mensagem não vai aparecer de novo.
            </div>

            {/* Loose Image Mockup - WITHOUT enclosing boxed border/background wrappers - "SOLTA" and LARGER styled with drop-shadow */}
            <div id="offer-intercept-image-container" className="my-6 flex justify-center w-full">
              <img
                id="offer-intercept-mockup"
                src="https://i.ibb.co/0y7Sms19/Chat-GPT-Image-20-de-mai-de-2026-20-10-16-1.webp"
                alt="Plano Completo Oferta Interceptação"
                referrerPolicy="no-referrer"
                className="w-full max-w-[420px] sm:max-w-[480px] h-auto object-contain transition-transform duration-300 hover:scale-[1.03] filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.18)] bg-transparent"
              />
            </div>

            {/* Offers Text styled with beautiful readable fonts */}
            <div id="offer-intercept-copy" className="font-sans text-xs sm:text-sm text-[#5C534D] leading-relaxed text-left space-y-4 font-normal max-w-lg mx-auto">
              <p>
                O Plano Completo (Guia + TODOS os 4 Bônus) custa R$ 24,90 na página oficial. Porém, como você já tomou a decisão de comprar hoje, vou fazer uma loucura:
              </p>
              
              <div className="bg-[#FAF6F2] p-4.5 border-l-4 border-coral rounded-r-2xl font-medium text-petroleo shadow-xs">
                Se você clicar no botão abaixo agora, eu adiciono os 4 bônus completos no seu pacote por um acréscimo ridículo de <strong className="font-bold text-coral-dark underline decoration-coral decoration-2">APENAS R$ 5,00</strong>.
              </div>
              
              <p className="text-center font-bold text-sm sm:text-base text-petroleo pt-1 leading-snug">
                Ou seja: Você leva absolutamente <span className="text-coral-dark font-extrabold bg-coral/10 px-2 py-1 rounded inline-block leading-none">TUDO por apenas R$ 19,90</span>. Essa é a sua única chance de ter o arsenal completo para os próximos meses.
              </p>
            </div>

            {/* BLOCO DE PREÇO HIGHLIGHT (Altamente Visível e Explícito R$ 19,90) */}
            <div className="my-6 text-center bg-[#FAF6F2] p-5 rounded-2xl border-2 border-[#e36b3c]/20 max-w-lg mx-auto relative overflow-hidden shadow-xs">
              <div className="absolute top-0 right-0 bg-[#e36b3c] text-white font-sans font-black text-[9px] uppercase px-3 py-1 rounded-bl-xl tracking-wider">
                MELHOR OPÇÃO
              </div>
              <span className="text-stone-500 text-xs sm:text-sm font-semibold line-through block">
                De R$ 24,90 por apenas
              </span>
              <span className="text-[44px] sm:text-[54px] font-black text-[#e36b3c] leading-none block my-1">
                R$ 19,90
              </span>
              <span className="text-[#3d2b29] font-sans text-xs font-bold tracking-wider uppercase block">
                GUIA COMPLETO + TODOS OS 4 BÔNUS INCLUSOS
              </span>
            </div>

            {/* Action buttons (Direct Response high priority focus) */}
            <div className="pt-4 space-y-4 max-w-lg mx-auto w-full">
              <motion.button
                id="offer-intercept-cta-upgrade"
                onClick={onAccept}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                animate={{ 
                  boxShadow: ["0 0 0 0 rgba(16, 185, 129, 0.4)", "0 0 0 15px rgba(16, 185, 129, 0)", "0 0 0 0 rgba(16, 185, 129, 0)"]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-full py-4.5 px-6 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-sans font-black text-xs sm:text-sm md:text-base rounded-2xl shadow-xl border-b-4 border-emerald-700 cursor-pointer text-center flex items-center justify-center gap-2 transition-all outline-none"
              >
                <span>👉</span> SIM! QUERO ADICIONAR TUDO POR APENAS R$ 19,90
              </motion.button>

              {/* Refuse downsell link */}
              <div className="text-center pt-2">
                <button
                  id="offer-intercept-refuse-btn"
                  onClick={onRefuseBasic}
                  className="font-sans text-[10.5px] sm:text-xs text-stone-400 hover:text-stone-600 underline font-medium transition-colors max-w-md mx-auto leading-relaxed cursor-pointer block bg-transparent border-0 w-full"
                >
                  Não, obrigado. Eu prefiro pagar mais caro depois e quero seguir apenas com o básico por R$ 14,90.
                </button>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

