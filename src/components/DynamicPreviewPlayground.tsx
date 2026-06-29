import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Clock, RotateCcw, AlertTriangle, Play,
  Smile, Frown, User, PenTool, Hand,
  MessageCircleOff, MessageSquare, Sparkles,
  ChevronLeft, ChevronRight,
} from 'lucide-react';
import { DINAMICAS_PREVIEWS } from '../data';
import { Dinamica } from '../types';

const IMAGES_MAP: Record<string, string> = {
  historia: 'https://i.ibb.co/jkyqd39g/3x4-continue-a-historia.webp',
  mao:      'https://i.ibb.co/6cYWPBBV/3x4-oq-tem-na-minha-m-o.webp',
  palavra:  'https://i.ibb.co/fVD0x0DL/3x4-n-o-pode-falar-essa-palavra.webp',
  emocao:   'https://i.ibb.co/qLHLZ0Pz/3-X4-que-emo-o-essa.webp',
  mensagem: 'https://i.ibb.co/9m53yqsp/3x4-mensagem-misteriosa.webp',
};

const getIcon = (id: string, size = 16) => {
  switch (id) {
    case 'historia': return <PenTool size={size} className="shrink-0" />;
    case 'mao':      return <Hand size={size} className="shrink-0" />;
    case 'palavra':  return <MessageCircleOff size={size} className="shrink-0" />;
    case 'emocao':   return <Smile size={size} className="shrink-0" />;
    case 'mensagem': return <MessageSquare size={size} className="shrink-0" />;
    default:         return <Sparkles size={size} className="shrink-0" />;
  }
};

export default function DynamicPreviewPlayground() {
  const [activeIndex, setActiveIndex]       = useState(0);
  const [activeDinamica, setActiveDinamica] = useState<Dinamica>(DINAMICAS_PREVIEWS[0]);
  const [imagesLoaded, setImagesLoaded]     = useState(false);

  const [storyPromptIndex, setStoryPromptIndex] = useState(0);
  const [handItemIndex, setHandItemIndex]       = useState(0);
  const [tabooTimer, setTabooTimer]             = useState<number | null>(null);
  const [tabooActive, setTabooActive]           = useState(false);
  const [emotionSelected, setEmotionSelected]   = useState<string | null>(null);

  const canvasRef  = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const total = DINAMICAS_PREVIEWS.length;

  // Pré-carregar todas as imagens
  useEffect(() => {
    const imagePromises = Object.values(IMAGES_MAP).map(src => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = src;
      });
    });

    Promise.all(imagePromises)
      .then(() => setImagesLoaded(true))
      .catch(() => setImagesLoaded(true)); // Mesmo com erro, mostra as imagens
  }, []);

  useEffect(() => {
    setActiveDinamica(DINAMICAS_PREVIEWS[activeIndex]);
    setEmotionSelected(null);
  }, [activeIndex]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (tabooActive && tabooTimer !== null && tabooTimer > 0) {
      interval = setInterval(() => setTabooTimer(t => (t !== null ? t - 1 : null)), 1000);
    } else if (tabooTimer === 0) {
      setTabooActive(false);
      setTabooTimer(null);
    }
    return () => clearInterval(interval);
  }, [tabooActive, tabooTimer]);

  const startTabooTimer = () => { setTabooTimer(60); setTabooActive(true); };
  const handlePrev = () => setActiveIndex(i => (i === 0 ? total - 1 : i - 1));
  const handleNext = () => setActiveIndex(i => (i === total - 1 ? 0 : i + 1));

  const getPos = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>,
    canvas: HTMLCanvasElement,
  ) => {
    const rect = canvas.getBoundingClientRect();
    const src = 'touches' in e ? e.touches[0] : e;
    return {
      x: (src.clientX - rect.left) * (canvas.width / rect.width),
      y: (src.clientY - rect.top)  * (canvas.height / rect.height),
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    setIsDrawing(true);
    const { x, y } = getPos(e, canvas);
    ctx.beginPath(); ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    const { x, y } = getPos(e, canvas);
    ctx.lineTo(x, y);
    ctx.strokeStyle = '#e36b3c'; ctx.lineWidth = 4; ctx.lineCap = 'round';
    ctx.stroke();
  };

  const stopDrawing = () => setIsDrawing(false);

  const clearCanvas = () => {
    const canvas = canvasRef.current; if (!canvas) return;
    canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="w-full max-w-5xl mx-auto rounded-2xl border border-petroleo/8 shadow-lg overflow-hidden bg-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col"
        >
          {/* Header simples */}
          <div className="px-4 sm:px-6 pt-5 pb-4 border-b border-petroleo/8">
            <div className="flex items-start gap-3">
              <span className="text-coral mt-0.5">{getIcon(activeDinamica.id, 20)}</span>
              <div className="flex-1">
                <h3 className="font-serif font-bold text-lg sm:text-xl text-petroleo leading-tight">
                  {activeDinamica.title}
                </h3>
                <p className="text-xs sm:text-sm text-terracotta/70 mt-1.5 leading-relaxed">
                  {activeDinamica.description}
                </p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0 text-[11px] text-terracotta/50 font-medium">
                <Clock size={13} className="text-coral/70" />
                <span className="hidden sm:inline">{activeDinamica.duration}</span>
              </div>
            </div>
          </div>

          {/* Corpo principal */}
          <div className="flex flex-col sm:flex-row flex-1">
            {/* Área da imagem com navegação limpa */}
            <div className="w-full sm:w-1/2 bg-gradient-to-br from-creme-alt/30 to-creme-warm/20 flex items-center justify-center py-6 sm:py-8 px-4 sm:border-r border-b sm:border-b-0 border-petroleo/8 relative">
              <div className="relative">
                {/* Container de imagens */}
                <div className="w-[82vw] max-w-[420px] sm:w-full sm:max-w-[340px] md:max-w-[380px] aspect-[7/10] rounded-xl shadow-xl border-2 border-white overflow-hidden relative bg-white">
                  {/* Renderizar todas as imagens de uma vez, invisíveis */}
                  {DINAMICAS_PREVIEWS.map((dinamica, idx) => (
                    <img
                      key={dinamica.id}
                      src={IMAGES_MAP[dinamica.id] ?? ''}
                      alt={`Página da dinâmica ${dinamica.title}`}
                      width="420"
                      height="600"
                      loading="lazy"
                      decoding="async"
                      className={`w-full h-full object-cover object-center ${
                        dinamica.id === 'emocao' ? 'scale-110' : ''
                      } ${
                        idx === activeIndex ? 'relative' : 'absolute inset-0 invisible'
                      }`}
                    />
                  ))}
                </div>

                {/* Navegação: setas horizontais nas laterais */}
                <button
                  onClick={handlePrev}
                  aria-label="Dinâmica anterior"
                  className="absolute left-[-16px] sm:left-[-20px] top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 backdrop-blur-sm border border-petroleo/10 shadow-lg flex items-center justify-center text-petroleo hover:bg-coral hover:text-white hover:border-coral transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                  disabled={activeIndex === 0}
                >
                  <ChevronLeft size={20} strokeWidth={2.5} />
                </button>

                <button
                  onClick={handleNext}
                  aria-label="Próxima dinâmica"
                  className="absolute right-[-16px] sm:right-[-20px] top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-petroleo/95 backdrop-blur-sm shadow-lg flex items-center justify-center text-white hover:bg-coral transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                  disabled={activeIndex === total - 1}
                >
                  <ChevronRight size={20} strokeWidth={2.5} />
                </button>

                {/* Indicadores discretos */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm shadow-md border border-petroleo/8">
                  {DINAMICAS_PREVIEWS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      aria-label={`Dinâmica ${i + 1}`}
                      className="rounded-full transition-all duration-200 cursor-pointer"
                      style={{
                        width: i === activeIndex ? '20px' : '6px',
                        height: '6px',
                        backgroundColor: i === activeIndex ? '#e36b3c' : 'rgba(61,43,41,0.2)',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Simulador interativo */}
            <div className="w-full sm:w-1/2 p-5 sm:p-6 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-coral animate-pulse shadow-sm shadow-coral/50" />
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-coral">
                  Experimente agora
                </span>
              </div>

              {/* GAME 1 - Continue a História */}
              {activeDinamica.id === 'historia' && (
                <div className="space-y-3.5">
                  <div className="p-4 bg-gradient-to-br from-creme-warm/50 to-creme-alt/30 rounded-xl text-petroleo border border-petroleo/5">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-terracotta/60 mb-2">Início sorteado</p>
                    <p className="font-serif italic text-sm sm:text-base leading-relaxed">
                      "{activeDinamica.prompts[storyPromptIndex] || 'Era uma vez...'}"
                    </p>
                  </div>
                  <button
                    onClick={() => setStoryPromptIndex((storyPromptIndex + 1) % activeDinamica.prompts.length)}
                    className="w-full py-3 px-4 bg-coral hover:bg-coral-dark text-white rounded-xl text-xs sm:text-sm font-bold transition-all hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <RotateCcw size={14} /> Sortear novo início
                  </button>
                </div>
              )}

              {/* GAME 2 - O que tem na minha mão */}
              {activeDinamica.id === 'mao' && (
                <div className="space-y-3.5">
                  <div className="p-4 bg-gradient-to-br from-creme-warm/50 to-creme-alt/30 rounded-xl border border-petroleo/5">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-terracotta/60 mb-2">Objeto da rodada</p>
                    <p className="text-sm sm:text-base font-bold text-petroleo">
                      {['Um pregador de plástico','Uma chave de casa','Colher de sobremesa','Uma meia enrolada'][handItemIndex]}
                    </p>
                    <p className="text-xs sm:text-sm italic text-terracotta/80 mt-3 pt-3 border-t border-petroleo/10">
                      "{['Mãe, é leve e serve pra segurar!','Dica: faz barulho de metal!','Serve para comer sopa!','A gente calça quando tá frio!'][handItemIndex]}"
                    </p>
                  </div>
                  <button
                    onClick={() => setHandItemIndex((handItemIndex + 1) % 4)}
                    className="w-full py-3 px-4 bg-sage hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold transition-all hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <RotateCcw size={14} /> Mudar objeto
                  </button>
                </div>
              )}

              {/* GAME 3 - Não pode falar essa palavra */}
              {activeDinamica.id === 'palavra' && (
                <div className="space-y-3.5">
                  <div className="p-4 bg-gradient-to-br from-creme-warm/50 to-creme-alt/30 rounded-xl border border-petroleo/5">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-terracotta/60 mb-2.5">Palavras banidas</p>
                    <div className="flex gap-2 flex-wrap">
                      {['SIM','NÃO','OK'].map(w => (
                        <span key={w} className="px-3 py-1.5 bg-coral/15 text-coral-dark text-xs sm:text-sm font-bold rounded-lg border border-coral/20">{w}</span>
                      ))}
                    </div>
                  </div>
                  <div className="p-5 bg-white border border-petroleo/10 rounded-xl flex flex-col items-center justify-center min-h-[100px]">
                    {tabooActive ? (
                      <>
                        <span className="text-[10px] text-terracotta/60 uppercase tracking-wider mb-2">Tempo restante</span>
                        <span className="text-4xl font-mono font-bold text-coral flex items-center gap-2.5">
                          <Clock size={20} className="animate-pulse" />{tabooTimer}s
                        </span>
                      </>
                    ) : (
                      <button
                        onClick={startTabooTimer}
                        className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold transition-all hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Play size={14} /> Iniciar desafio (1 min)
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* GAME 4 - Que emoção é essa */}
              {activeDinamica.id === 'emocao' && (
                <div className="space-y-3.5">
                  <p className="text-xs sm:text-sm text-petroleo/80 font-medium">Toque em uma emoção:</p>
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { name: 'Bravo',  icon: <Frown size={18} />,                        desc: 'O que você fez para acalmar o coração se bater forte?' },
                      { name: 'Calmo',  icon: <Smile size={18} />,                        desc: 'Sente o macio da almofada. Como fica o peso da cabeça?' },
                      { name: 'Medo',   icon: <AlertTriangle size={18} />,                desc: 'Qual brinquedo te daria coragem se coubesse no bolso?' },
                      { name: 'Triste', icon: <Frown size={18} className="opacity-60" />, desc: 'Um abraço apertado de pipoca ajuda a desatar o nó?' },
                    ].map((emo) => (
                      <button
                        key={emo.name}
                        onClick={() => setEmotionSelected(emo.desc)}
                        className={`p-3 rounded-xl text-center border transition-all cursor-pointer text-xs sm:text-sm font-semibold flex flex-col items-center gap-1.5 ${
                          emotionSelected === emo.desc
                            ? 'bg-coral border-coral text-white shadow-md'
                            : 'bg-white border-petroleo/15 hover:border-coral/40 text-petroleo hover:shadow-sm'
                        }`}
                      >
                        <span>{emo.icon}</span>{emo.name}
                      </button>
                    ))}
                  </div>
                  {emotionSelected && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3.5 bg-gradient-to-br from-creme-warm/60 to-creme-alt/40 rounded-xl text-xs sm:text-sm text-petroleo italic flex items-start gap-2.5 border border-petroleo/5"
                    >
                      <User size={14} className="text-coral mt-0.5 shrink-0" />
                      <span>"{emotionSelected}"</span>
                    </motion.div>
                  )}
                </div>
              )}

              {/* GAME 5 - Mensagem Misteriosa */}
              {activeDinamica.id === 'mensagem' && (
                <div className="space-y-3.5">
                  <p className="text-xs sm:text-sm text-terracotta/90">
                    <strong className="text-petroleo">Lousa virtual:</strong> desenhe e imagine sendo feito de leve nas suas costas
                  </p>
                  <div className="w-full h-36 sm:h-40 rounded-xl overflow-hidden border-2 border-petroleo/15 relative shadow-inner">
                    <canvas
                      ref={canvasRef}
                      width={320}
                      height={160}
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                      onTouchStart={startDrawing}
                      onTouchMove={draw}
                      onTouchEnd={stopDrawing}
                      className="w-full h-full cursor-crosshair bg-creme-alt/40 touch-none"
                    />
                    <span className="absolute top-2 left-2 pointer-events-none text-[9px] font-bold uppercase text-petroleo/30 bg-white/80 px-2 py-1 rounded">
                      Área de desenho
                    </span>
                  </div>
                  <button
                    onClick={clearCanvas}
                    className="w-full py-2.5 px-4 bg-white hover:bg-creme-warm/60 text-terracotta border border-petroleo/15 rounded-xl text-xs sm:text-sm font-semibold transition-all hover:shadow-sm cursor-pointer flex justify-center items-center gap-2"
                  >
                    <RotateCcw size={13} /> Apagar
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Footer discreto */}
          <div className="px-4 sm:px-6 py-3 border-t border-petroleo/8 flex justify-between items-center text-xs sm:text-sm">
            <span className="font-semibold text-coral">153 páginas de dinâmicas</span>
            <span className="text-[11px] text-terracotta/40">Acesso imediato</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
