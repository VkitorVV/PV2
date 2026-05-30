import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check } from 'lucide-react';

export default function RecoveryPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // 3. Se a pessoa comprou, nunca mostrar
    const alreadyBought = localStorage.getItem('comprou_1790');
    if (alreadyBought === 'true') {
      return;
    }

    const firstVisitTime = localStorage.getItem('dinamicas_visitou_pv');
    const now = Date.now();

    // 1. Primeira visita: Salvar timestamp e NÃO mostrar
    if (!firstVisitTime) {
      localStorage.setItem('dinamicas_visitou_pv', now.toString());
      return;
    }

    // 2. Visitas de retorno (2ª vez em diante)
    const lastSeenPopup = localStorage.getItem('dinamicas_popup_1790_visto');
    
    // Check if it's been more than 24h since we last showed the popup
    const isMoreThan24h = !lastSeenPopup || (now - parseInt(lastSeenPopup, 10)) > 24 * 60 * 60 * 1000;

    if (isMoreThan24h) {
      // Delay of 1.5 seconds (1500ms)
      const timer = setTimeout(() => {
        setIsOpen(true);
        localStorage.setItem('dinamicas_popup_1790_visto', Date.now().toString());
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, []);

  // Handle body scroll locking
  useEffect(() => {
    if (isOpen) {
      // Block scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Restore scroll
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // ESC key keypress close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleCTA = () => {
    localStorage.setItem('comprou_1790', 'true');
    window.location.href = 'https://checkout.compraseguracheckout.shop/VCCL1O8SD34O';
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div 
            className="fixed inset-0 bg-[#000000]/85 backdrop-blur-md flex justify-center items-center p-4 z-[99999]"
            style={{ zIndex: 99999 }}
            onClick={handleClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="bg-[#fbf6f1] w-full max-w-2xl rounded-[32px] shadow-[0_24px_60px_rgba(0,0,0,0.5)] border border-[#3d2b29]/15 relative my-auto flex flex-col max-h-[92vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header superior (faixa em azul petróleo/escuro #3d2b29) */}
              <div className="bg-[#3d2b29] text-white py-3.5 px-4 text-center text-[11px] sm:text-xs font-sans font-black tracking-wider uppercase flex items-center justify-center gap-1.5 relative z-10 select-none rounded-t-[30px] leading-snug">
                <span>⚠️ OPORTUNIDADE ÚNICA - SÓ APARECE UMA VEZ!</span>
              </div>

              {/* Botão fechar (X) no canto superior direito */}
              <button
                onClick={handleClose}
                className="absolute top-14 sm:top-16 right-4 sm:right-6 text-[#3d2b29]/40 hover:text-[#3d2b29] transition-colors p-2 rounded-full hover:bg-[#3d2b29]/5 z-50 cursor-pointer"
                aria-label="Fechar"
              >
                <X size={24} strokeWidth={2.5} />
              </button>

              {/* Content area: Clean, highly-polished single-column layout */}
              <div className="py-6 px-4 sm:p-10 flex flex-col justify-between">
                
                <div className="space-y-4 sm:space-y-5">
                  {/* TAG (pill pequena) */}
                  <div className="inline-block bg-[#e36b3c]/10 border border-[#e36b3c]/30 rounded-full px-3 py-1">
                    <span className="text-[#e36b3c] font-sans font-black text-xs sm:text-xs tracking-widest uppercase">
                      VOCÊ VOLTOU. NÃO É POR ACASO.
                    </span>
                  </div>

                  {/* HEADLINE PRINCIPAL (No mobile md:text-[26px]) */}
                  <h2 className="font-serif text-[26px] sm:text-3xl text-[#3d2b29] font-black leading-tight tracking-tight pr-8">
                    Tá bom. Você me ignorou uma vez. Não vou deixar você fazer isso de novo.
                  </h2>

                  {/* SUB-HEADLINE */}
                  <div className="font-sans text-[15px] sm:text-base text-[#4a3430] leading-relaxed font-normal space-y-3 sm:space-y-4">
                    <p>
                      Você voltou porque sabe a verdade: hoje às 19h você vai chegar destruída. Vai ligar a Peppa Pig pra ter 30 minutos de paz. E vai dormir se odiando por isso. <strong className="text-[#e36b3c] font-black">DE NOVO.</strong>
                    </p>
                    <p>
                      Eu não vou deixar você continuar nesse ciclo por R$17,90.
                    </p>
                    <p className="font-medium">
                      É menos que uma pizza. É menos que o remédio pra dor nas costas de carregar culpa.
                    </p>
                  </div>

                  {/* PRODUCT MOCKUP IMAGE (Placed exactly below the phrase as requested) */}
                  <div className="flex justify-center py-3 sm:py-5">
                    <img
                      src="https://i.ibb.co/0y7Sms19/Chat-GPT-Image-20-de-mai-de-2026-20-10-16-1.webp"
                      alt="Plano Completo"
                      referrerPolicy="no-referrer"
                      className="w-full max-w-[440px] sm:max-w-[480px] md:max-w-[540px] h-auto object-contain filter drop-shadow-[0_16px_32px_rgba(61,43,41,0.2)]"
                    />
                  </div>

                  {/* BOX DE BENEFÍCIOS (com checks verdes #7a9b7e) */}
                  <ul className="space-y-3.5 pt-5 border-t border-[#3d2b29]/10">
                    <li className="flex items-start gap-3 text-sm sm:text-base text-[#5d4642] font-semibold">
                      <span className="w-[22px] h-[22px] rounded-full bg-[#7a9b7e]/15 border border-[#7a9b7e]/30 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-[#7a9b7e] stroke-[3]" />
                      </span>
                      <span>Eu vi que você voltou. Então vou fazer o que NÃO faço pra ninguém</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm sm:text-base text-[#5d4642] font-semibold">
                      <span className="w-[22px] h-[22px] rounded-full bg-[#7a9b7e]/15 border border-[#7a9b7e]/30 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-[#7a9b7e] stroke-[3]" />
                      </span>
                      <span>Leve o <strong className="text-[#e36b3c]">PLANO COMPLETO</strong> (guia + 4 bônus) que era R$27,90</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm sm:text-base text-[#5d4642] font-semibold">
                      <span className="w-[22px] h-[22px] rounded-full bg-[#7a9b7e]/15 border border-[#7a9b7e]/30 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-[#7a9b7e] stroke-[3]" />
                      </span>
                      <span>Hoje por apenas <strong className="text-[#e36b3c]">R$17,90</strong> — desconto de despedida</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm sm:text-base text-[#5d4642] font-semibold">
                      <span className="w-[22px] h-[22px] rounded-full bg-[#7a9b7e]/15 border border-[#7a9b7e]/30 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-[#7a9b7e] stroke-[3]" />
                      </span>
                      <span>Acesso imediato. Use hoje ainda, deitada no sofá</span>
                    </li>
                  </ul>
                </div>

                {/* BLOCO DE PREÇO (centralizado) */}
                <div className="mt-8 mb-6 text-center bg-[#3d2b29]/5 p-5 rounded-2xl border border-[#3d2b29]/5">
                  <span className="text-[#5d4642]/75 text-sm sm:text-sm font-semibold line-through block">
                    De R$ 27,90 por apenas
                  </span>
                  <span className="text-[40px] sm:text-[52px] font-black text-[#e36b3c] leading-none block my-1">
                    R$ 17,90
                  </span>
                  <span className="text-stone-400 font-sans text-xs sm:text-xs font-bold tracking-wider uppercase block">
                    à vista no Pix • acesso imediato
                  </span>
                </div>

                {/* CTA & ACCENTS */}
                <div className="space-y-4">
                  <button
                    onClick={handleCTA}
                    className="w-full py-4 px-6 bg-gradient-to-r from-[#e36b3c] to-[#c44a1f] hover:from-[#c44a1f] hover:to-[#a83a15] text-white font-sans font-black text-[16px] sm:text-lg rounded-2xl shadow-[0_8px_20px_rgba(227,107,60,0.3)] transition-all cursor-pointer text-center outline-none border-b-4 border-[#a83a15] flex items-center justify-center gap-2 tracking-wide uppercase"
                  >
                    CHEGA DE CULPA - QUERO POR R$17,90
                  </button>
                  
                  <p className="text-center font-sans text-[11px] sm:text-sm text-[#5d4642]/60 font-semibold">
                    Liberação em 1 minuto • Garantia 7 dias
                  </p>

                  {/* AVISO DE URGÊNCIA */}
                  <p className="text-center font-sans text-xs sm:text-sm font-extrabold text-[#c44a1f] animate-pulse">
                    ⏳ Se fechar agora, essa oferta some para sempre. Não vou insistir.
                  </p>

                  {/* LINK DE REJEIÇÃO */}
                  <div className="text-center pt-1 sm:pt-2">
                    <button
                      onClick={handleClose}
                      className="font-sans text-xs sm:text-sm text-stone-400 hover:text-stone-600 underline font-medium transition-colors bg-transparent border-none cursor-pointer p-0"
                    >
                      Não, prefiro continuar ligando a TV e dormindo com culpa
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
