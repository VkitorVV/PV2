import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, Clock, Lightbulb, RotateCcw, AlertTriangle, 
  HelpCircle, CheckCircle2, Star, ArrowRight, Play, Eye, 
  Smile, Frown, Sparkles, User, Palette, PenTool, Hand,
  MessageCircleOff, MessageSquare, Smartphone
} from 'lucide-react';
import { DINAMICAS_PREVIEWS } from '../data';
import { Dinamica } from '../types';

const getIconForDinamica = (id: string, className: string = "w-5 h-5") => {
  switch (id) {
    case 'historia': return <PenTool className={className} />;
    case 'mao': return <Hand className={className} />;
    case 'palavra': return <MessageCircleOff className={className} />;
    case 'emocao': return <Smile className={className} />;
    case 'mensagem': return <MessageSquare className={className} />;
    default: return <Sparkles className={className} />;
  }
};

export default function DynamicPreviewPlayground() {
  const [activeDinamicaId, setActiveDinamicaId] = useState<string>('historia');
  const [activeDinamica, setActiveDinamica] = useState<Dinamica>(DINAMICAS_PREVIEWS[0]);

  // Game specific interactive states
  const [storyPromptIndex, setStoryPromptIndex] = useState(0);
  const [handItemIndex, setHandItemIndex] = useState(0);
  const [tabooTimer, setTabooTimer] = useState<number | null>(null);
  const [tabooActive, setTabooActive] = useState(false);
  const [emotionSelected, setEmotionSelected] = useState<string | null>(null);
  
  // Interactive drawing canvas for "Mensagem Misteriosa"
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const selected = DINAMICAS_PREVIEWS.find(d => d.id === activeDinamicaId);
    if (selected) {
      setActiveDinamica(selected);
    }
  }, [activeDinamicaId]);

  // Taboo Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (tabooActive && tabooTimer !== null && tabooTimer > 0) {
      interval = setInterval(() => {
        setTabooTimer(t => (t !== null ? t - 1 : null));
      }, 1000);
    } else if (tabooTimer === 0) {
      setTabooActive(false);
      setTabooTimer(null);
    }
    return () => clearInterval(interval);
  }, [tabooActive, tabooTimer]);

  const startTabooTimer = () => {
    setTabooTimer(60);
    setTabooActive(true);
  };

  // Canvas drawing handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    
    let clientX = 0;
    let clientY = 0;
    
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;
    
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);

    ctx.lineTo(x, y);
    ctx.strokeStyle = '#e36b3c';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-3xl border border-petroleo/10 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
      
      {/* List / Tabs */}
      <div className="lg:col-span-4 bg-creme-alt/40 border-r border-petroleo/10 p-6 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="text-coral" size={20} />
            <span className="text-sm md:text-xs font-bold font-sans uppercase tracking-wider text-petroleo/60">
              Escolha uma Dinâmica para Testar
            </span>
          </div>

          <div className="space-y-1.5">
            {DINAMICAS_PREVIEWS.map((d) => (
              <button
                key={d.id}
                onClick={() => setActiveDinamicaId(d.id)}
                className={`w-full p-3.5 rounded-2xl text-left border transition-all flex items-start gap-3 group relative cursor-pointer ${
                  activeDinamicaId === d.id
                    ? 'bg-white border-coral shadow-sm ring-1 ring-coral/10'
                    : 'bg-transparent border-transparent hover:bg-white/40 hover:border-petroleo/10'
                }`}
              >
                {activeDinamicaId === d.id && (
                  <motion.div 
                    layoutId="active-indicator" 
                    className="absolute left-0 top-1/4 bottom-1/4 w-[4px] bg-coral rounded-r-xl" 
                  />
                )}
                
                <span className="text-xl shrink-0 p-1.5 bg-creme rounded-xl text-coral">
                  {getIconForDinamica(d.id, "w-6 h-6")}
                </span>
                
                <div className="min-w-0">
                  <h4 className="font-sans font-bold text-base md:text-sm text-petroleo group-hover:text-coral transition-colors">
                    {d.title}
                  </h4>
                  <p className="text-sm md:text-xs text-terracotta/70 line-clamp-2 mt-0.5 leading-snug">
                    {d.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="hidden lg:block pt-6 border-t border-petroleo/10">
          <div className="p-3 bg-creme rounded-xl border border-petroleo/5 flex items-start gap-2.5">
            <Lightbulb className="text-amber-500 shrink-0 mt-0.5" size={18} />
            <p className="text-sm md:text-xs text-terracotta leading-snug">
              <strong>Como usar no celular:</strong> O material é 100% otimizado para abrir direto no navegador sem precisar instalar nada, bem do ladinho do travesseiro.
            </p>
          </div>
        </div>
      </div>

      {/* Main Preview Screen */}
      <div className="lg:col-span-8 p-6 lg:p-8 flex flex-col justify-between bg-creme/20 relative">
        <div className="absolute top-0 right-0 w-24 h-24 watercolor-wash-pink rounded-full -z-10 opacity-70"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 watercolor-wash-sage rounded-full -z-10 opacity-70"></div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeDinamicaId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* PDF Header Mockup */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-petroleo/10 pb-4">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm md:text-xs bg-coral/10 text-coral-dark font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider font-sans">
                    {activeDinamica.tags[0]}
                  </span>
                  <span className="text-sm md:text-xs bg-sage/10 text-emerald-800 font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider font-sans">
                    {activeDinamica.tags[1]}
                  </span>
                </div>
                <h3 className="font-serif text-3xl md:text-2xl font-bold mt-2 sm:mt-1.5 flex items-start sm:items-center gap-2 text-left">
                  <span className="text-coral shrink-0 mt-1 sm:mt-0">
                    {getIconForDinamica(activeDinamica.id, "w-8 h-8 md:w-7 md:h-7")}
                  </span>
                  <span>{activeDinamica.title}</span>
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm md:text-xs font-medium text-terracotta/70 shrink-0 w-full sm:w-auto mt-2 sm:mt-0">
                <span className="flex items-center gap-1">
                  <Clock size={16} className="text-coral shrink-0" />
                  Duração: {activeDinamica.duration}
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-1">
                  <Palette size={16} className="text-sage shrink-0" />
                  {activeDinamica.materials}
                </span>
              </div>
            </div>

            {/* Split layout: Image and Simulator */}
            <div className="flex flex-col md:flex-row gap-6 mt-8 items-stretch">
              {/* Image Column */}
              <div className="w-full md:w-1/2 flex justify-center">
                <div className="w-full max-w-[380px] aspect-[7/10] rounded-2xl shadow-xl border-4 border-white overflow-hidden relative">
                  <img
                    src={
                      activeDinamica.id === 'historia' ? 'https://i.ibb.co/jkyqd39g/3x4-continue-a-historia.webp' :
                      activeDinamica.id === 'mao' ? 'https://i.ibb.co/6cYWPBBV/3x4-oq-tem-na-minha-m-o.webp' :
                      activeDinamica.id === 'palavra' ? 'https://i.ibb.co/fVD0x0DL/3x4-n-o-pode-falar-essa-palavra.webp' :
                      activeDinamica.id === 'emocao' ? 'https://i.ibb.co/qLHLZ0Pz/3-X4-que-emo-o-essa.webp' :
                      activeDinamica.id === 'mensagem' ? 'https://i.ibb.co/9m53yqsp/3x4-mensagem-misteriosa.webp' :
                      ''
                    }
                    alt={`Página da dinâmica ${activeDinamica.title}`}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                </div>
              </div>

              {/* Interactive Simulator Section */}
              <div className="w-full md:w-1/2 bg-white rounded-2xl p-5 shadow-sm border border-petroleo/10 relative overflow-hidden flex-1 self-stretch flex flex-col">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-coral to-coral-light"></div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2h h-2 rounded-full bg-coral animate-pulse p-1"></span>
                  <span className="text-xs md:text-[10px] font-bold tracking-wider font-sans uppercase text-coral">
                    Mão na massa
                  </span>
                  <span className="text-xs md:text-[10px] text-terracotta/60">— Use o celular</span>
                </div>
                
                <div className="flex-1">
                  {/* GAME 1 */}
                  {activeDinamicaId === 'historia' && (
                    <div className="space-y-3">
                      <div className="p-4 bg-creme-warm/30 rounded-xl border border-petroleo/5 text-sm md:text-xs text-petroleo">
                        <p className="text-terracotta/60 uppercase text-[10px] md:text-[9px] font-bold mb-1">Início da História Sorteado:</p>
                        <p className="text-base md:text-sm font-serif italic font-medium leading-relaxed">
                          "{activeDinamica.prompts[storyPromptIndex] || "Era um..."}"
                        </p>
                      </div>
                      <button
                        onClick={() => setStoryPromptIndex((storyPromptIndex + 1) % activeDinamica.prompts.length)}
                        className="w-full py-2.5 px-4 bg-coral hover:bg-coral-dark text-white rounded-xl text-sm md:text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                      >
                        <RotateCcw size={14} />
                        Sortear Novo Início
                      </button>
                    </div>
                  )}

                  {/* GAME 2: WHAT'S IN MY HAND SIMULATOR */}
                  {activeDinamicaId === 'mao' && (
                    <div className="space-y-3">
                      <div className="p-4 bg-creme-warm/30 rounded-xl border border-petroleo/5 text-sm md:text-xs text-petroleo">
                        <p className="text-terracotta/60 uppercase text-[10px] md:text-[9px] font-bold mb-2">Objeto da rodada:</p>
                        <p className="text-base md:text-sm font-bold flex items-start gap-2 text-petroleo">
                          <span className="text-coral bg-white p-1.5 rounded-lg shadow-sm shrink-0 mt-0.5">
                             <BookOpen size={16} />
                          </span> 
                          <span>
                            {[
                              "Um pregador de plástico",
                              "Uma chave de casa",
                              "Colher de sobremesa",
                              "Uma meia enrolada"
                            ][handItemIndex]}
                          </span>
                        </p>
                        <div className="mt-3 pt-3 border-t border-petroleo/5">
                          <p className="text-terracotta/60 uppercase text-[10px] md:text-[9px] font-bold mb-1">Exemplo de pista:</p>
                          <p className="italic text-terracotta/90 text-sm md:text-[11px]">
                            "{[
                              "Mãe, é leve e serve pra segurar!",
                              "Dica: faz barulho de metal!",
                              "Serve para comer sopa!",
                              "A gente calça quando tá frio!"
                            ][handItemIndex]}"
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setHandItemIndex((handItemIndex + 1) % 4)}
                        className="w-full py-2.5 px-4 bg-sage hover:bg-emerald-700 text-white rounded-xl text-sm md:text-xs font-bold transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2"
                      >
                        <RotateCcw size={14} />
                        Mudar Objeto Misterioso
                      </button>
                    </div>
                  )}
                  
                  {/* GAME 3: TABOO WORDS BAN SIMULATOR */}
                  {activeDinamicaId === 'palavra' && (
                    <div className="space-y-4">
                      <div className="p-4 bg-creme-warm/30 rounded-xl border border-petroleo/5 text-sm md:text-xs">
                        <p className="text-terracotta/60 uppercase text-[10px] md:text-[9px] font-bold mb-2">Palavras Proibidas (Banidas):</p>
                        <div className="flex gap-2">
                          <span className="px-3 py-1 bg-coral/10 text-coral-dark font-bold rounded-lg border border-coral/20">SIM</span>
                          <span className="px-3 py-1 bg-coral/10 text-coral-dark font-bold rounded-lg border border-coral/20">NÃO</span>
                          <span className="px-3 py-1 bg-coral/10 text-coral-dark font-bold rounded-lg border border-coral/20">OK</span>
                        </div>
                      </div>

                      <div className="p-4 bg-white border border-petroleo/10 shadow-sm rounded-xl flex flex-col items-center justify-center">
                        {tabooActive ? (
                          <>
                            <span className="text-xs md:text-[10px] text-terracotta/60 uppercase font-mono tracking-wider mb-1">Tempo Restante</span>
                            <span className="text-4xl md:text-3xl font-mono font-bold text-coral flex items-center gap-2">
                              <Clock size={20} className="text-coral flex-shrink-0 animate-pulse" />
                              {tabooTimer}s
                            </span>
                          </>
                        ) : (
                          <button
                            onClick={startTabooTimer}
                            className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm md:text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                          >
                            <Play size={14} />
                            Iniciar Desafio (1 Minuto)
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* GAME 4: EMOTIONS GAME SIMULATOR */}
                  {activeDinamicaId === 'emocao' && (
                    <div className="space-y-3">
                      <p className="text-sm md:text-[11px] text-petroleo/80 font-medium">Toque em uma emoção para revelar a pergunta de suporte:</p>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { name: "Bravo", icon: <Frown className="w-5 h-5 mx-auto" />, desc: "O que você fez para acalmar o coração se bater forte?" },
                          { name: "Calmo", icon: <Smile className="w-5 h-5 mx-auto" />, desc: "Sente o macio da almofada. Como fica o peso da cabeça?" },
                          { name: "Medo", icon: <AlertTriangle className="w-5 h-5 mx-auto" />, desc: "Qual brinquedo te daria coragem se coubesse no bolso?" },
                          { name: "Triste", icon: <Frown className="w-5 h-5 mx-auto opacity-70" />, desc: "Um abraço apertado de pipoca ajuda a desatar o nó?" }
                        ].map((emo) => (
                          <button
                            key={emo.name}
                            onClick={() => setEmotionSelected(emo.desc)}
                            className={`p-2.5 rounded-xl text-center border transition-all cursor-pointer ${
                              emotionSelected === emo.desc
                                ? 'bg-coral border-coral text-white shadow-md'
                                : 'bg-white border-petroleo/10 hover:border-coral/30 hover:bg-creme-warm/30 text-petroleo'
                            }`}
                          >
                            <span className={`block mb-1 ${emotionSelected === emo.desc ? 'opacity-100' : 'opacity-80'}`}>{emo.icon}</span>
                            <span className="text-xs md:text-[10px] font-bold block">{emo.name}</span>
                          </button>
                        ))}
                      </div>

                      {emotionSelected && (
                        <motion.div 
                          initial={{ opacity: 0, y: 5 }} 
                          animate={{ opacity: 1, y: 0 }}
                          className="p-3 bg-creme-warm/50 border border-petroleo/5 rounded-xl text-sm md:text-xs text-petroleo italic flex items-start gap-2 shadow-inner mt-2"
                        >
                          <User className="w-4 h-4 shrink-0 mt-0.5 text-coral" />
                          <span className="leading-relaxed font-medium">"{emotionSelected}"</span>
                        </motion.div>
                      )}
                    </div>
                  )}

                  {/* GAME 5: MYSTERY MESSAGE INTERACTIVE CANVAS */}
                  {activeDinamicaId === 'mensagem' && (
                    <div className="space-y-4">
                      <div className="text-sm md:text-[11px] text-terracotta space-y-1">
                        <p>
                          <strong>Lousa Virtual:</strong> Desenhe abaixo e imagine isso sendo feito de leve nas suas costas na vida real:
                        </p>
                      </div>

                      <div className="w-full h-36 bg-white rounded-xl border border-petroleo/20 overflow-hidden relative shadow-inner">
                        <canvas
                          ref={canvasRef}
                          width={300}
                          height={144}
                          onMouseDown={startDrawing}
                          onMouseMove={draw}
                          onMouseUp={stopDrawing}
                          onMouseLeave={stopDrawing}
                          onTouchStart={startDrawing}
                          onTouchMove={draw}
                          onTouchEnd={stopDrawing}
                          className="w-full h-full cursor-crosshair bg-creme-alt/30 touch-none"
                        />
                        <div className="absolute top-2 left-2 pointer-events-none bg-white/90 text-petroleo border border-petroleo/10 text-[10px] md:text-[9px] font-bold px-2 py-0.5 rounded shadow-sm uppercase">
                          Área de Desenho
                        </div>
                      </div>
                      
                      <button
                        onClick={clearCanvas}
                        className="w-full py-2 px-4 bg-white hover:bg-creme-warm text-terracotta border border-petroleo/10 rounded-xl text-sm md:text-xs font-bold transition-all cursor-pointer shadow-sm flex justify-center items-center gap-2"
                      >
                        Apagar e Recomeçar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 pt-4 border-t border-petroleo/10 flex flex-col sm:flex-row justify-between items-center gap-2 text-sm md:text-xs text-terracotta/60">
          <span className="font-semibold text-coral text-center sm:text-left">↑ 153 páginas recheadas exatamente assim</span>
          <span className="text-center sm:text-right">Guia Oficial Digital • Use ainda hoje</span>
        </div>

      </div>
    </div>
  );
}
