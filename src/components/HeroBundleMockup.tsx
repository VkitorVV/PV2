import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, Layers, Eye, Smartphone, MousePointer, 
  Sparkles, CheckCircle, ChevronRight, Bookmark, ChevronLeft, ArrowRight
} from 'lucide-react';

const IMAGES = {
  capa: "https://i.ibb.co/SwHLkMG6/capa.webp",
  modulo1: "https://i.ibb.co/HLb1WsQq/modulo-1.webp",
  modulo2: "https://i.ibb.co/m5WPHNRf/modulo-2.webp",
  modulo3: "https://i.ibb.co/Mk2tmw96/modulo-3.webp",
  modulo4: "https://i.ibb.co/wF6Zf4jr/Modulo-4.webp",
  modulo5: "https://i.ibb.co/23Nw8bpc/Modulo-5.webp",
  continua: "https://i.ibb.co/YBSb0JCZ/Continue-a-historia.webp",
  mao: "https://i.ibb.co/KpTPn5fW/O-que-tem-na-minha-m-o.webp",
  palavra: "https://i.ibb.co/xKkBMXpn/N-o-pode-falar-essa-palavra.webp",
  emocao: "https://i.ibb.co/XxZDJ1TK/Que-emo-o-essa.webp",
  mensagem: "https://i.ibb.co/5xcXYXvQ/Mensagem-Misteriosa.webp"
};

type ItemId = 'capa' | 'modulo1' | 'modulo2' | 'modulo3' | 'modulo4' | 'modulo5' | 'continua' | 'mao' | 'palavra' | 'emocao' | 'mensagem';

interface MockupItem {
  id: ItemId;
  title: string;
  category: 'capa' | 'modulo' | 'pagina';
  url: string;
  badge?: string;
  description: string;
}

const ITEMS: MockupItem[] = [
  {
    id: 'capa',
    title: 'Guia Oficial Principal',
    category: 'capa',
    url: IMAGES.capa,
    badge: 'Livro Base',
    description: 'O livro digital de cabeceira com +120 dinâmicas leves de sofá.'
  },
  {
    id: 'modulo1',
    title: 'Módulo 1: Conexão Rápida',
    category: 'modulo',
    url: IMAGES.modulo1,
    badge: 'Módulo 01',
    description: 'Jogos rápidos para gerar sorrisos logo na primeira hora em casa.'
  },
  {
    id: 'modulo2',
    title: 'Módulo 2: Dias Muito Cansativos',
    category: 'modulo',
    url: IMAGES.modulo2,
    badge: 'Módulo 02',
    description: 'Para quando a sua bateria mental está no limite absoluto.'
  },
  {
    id: 'modulo3',
    title: 'Módulo 3: Dias de Agitação',
    category: 'modulo',
    url: IMAGES.modulo3,
    badge: 'Módulo 03',
    description: 'Direcione a energia das crianças sem precisar levantar do sofá.'
  },
  {
    id: 'modulo4',
    title: 'Módulo 4: Conversas Afetivas',
    category: 'modulo',
    url: IMAGES.modulo4,
    badge: 'Módulo 04',
    description: 'Para fortalecer o diálogo saudável e a expressividade emocional.'
  },
  {
    id: 'modulo5',
    title: 'Módulo 5: Desafios Silenciosos',
    category: 'modulo',
    url: IMAGES.modulo5,
    badge: 'Módulo 05',
    description: 'Estimule a imaginação profunda das crianças enquanto relaxa.'
  },
  {
    id: 'continua',
    title: 'Página: Continue a História',
    category: 'pagina',
    url: IMAGES.continua,
    badge: 'Pág. Amostra',
    description: 'Deitada no sofá, inicie a história e deixe o seu filho guiar a aventura.'
  },
  {
    id: 'mao',
    title: 'Página: O Que Tem Na Minha Mão',
    category: 'pagina',
    url: IMAGES.mao,
    badge: 'Pág. Amostra',
    description: 'Seu filho busca objetos misteriosos para você adivinhar de olhos fechados.'
  },
  {
    id: 'palavra',
    title: 'Página: Não Pode Falar Essa Palavra',
    category: 'pagina',
    url: IMAGES.palavra,
    badge: 'Pág. Amostra',
    description: 'Desafio lúdico de perguntas proibindo termos fáceis.'
  },
  {
    id: 'emocao',
    title: 'Página: Que Emoção é Essa?',
    category: 'pagina',
    url: IMAGES.emocao,
    badge: 'Pág. Amostra',
    description: 'Caretas deitados para falar de sentimentos sem pressões.'
  },
  {
    id: 'mensagem',
    title: 'Página: Mensagem Misteriosa',
    category: 'pagina',
    url: IMAGES.mensagem,
    badge: 'Pág. Amostra',
    description: 'O seu filho escreve suavemente nas suas costas. Relaxamento e carinho.'
  }
];

export default function HeroBundleMockup() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);

  // Auto-pass carousel images every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % ITEMS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const selectedItem = ITEMS[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % ITEMS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? ITEMS.length - 1 : prev - 1));
  };

  return (
    <div className="w-full flex flex-col space-y-6 lg:-mx-8">
      {/* Visual Content Section */}
      <div className="relative w-full flex flex-col items-center justify-center mt-4">
        {/* Soft atmospheric radial gradient background */}
        <div className="absolute inset-0 bg-radial-gradient from-[#7a9b7e]/10 to-transparent pointer-events-none rounded-full blur-3xl scale-125 opacity-60" />
        
        {/* Main Image Carousel Container */}
        <div className="relative w-full h-[75vh] max-h-[720px] z-40 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedItem.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 w-full h-full flex items-center justify-center cursor-pointer p-2 sm:p-4"
              onClick={() => setZoomOpen(true)}
            >
              <img 
                src={selectedItem.url} 
                alt={selectedItem.title} 
                className="max-w-full max-h-full w-auto h-auto object-contain shadow-[0_30px_60px_-15px_rgba(61,43,41,0.5)] border-[3px] border-white transition-all rounded-xl ring-4 ring-[#e36b3c]/20" 
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center gap-4 z-40 mt-6 mb-2">
          <button 
            onClick={handlePrev}
            className="w-12 h-12 rounded-full bg-white border border-[#3d2b29]/15 shadow-sm flex items-center justify-center text-[#3d2b29] hover:bg-[#fbf6f1] hover:scale-105 active:scale-95 transition-all cursor-pointer group"
            aria-label="Anterior"
          >
            <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
          </button>
          
          <div className="text-xs font-bold text-[#3d2b29]/60 font-mono tracking-normal uppercase px-2 w-[90px] whitespace-nowrap text-center flex items-center justify-center gap-1">
            <span>{currentIndex + 1}</span>
            <span className="opacity-40">/</span>
            <span>{ITEMS.length}</span>
          </div>

          <button 
            onClick={handleNext}
            className="w-12 h-12 rounded-full bg-[#3d2b29] border-2 border-[#3d2b29] shadow-sm flex items-center justify-center text-white hover:bg-[#4a3634] hover:scale-105 active:scale-95 transition-all cursor-pointer group"
            aria-label="Próxima"
          >
            <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Trust benefits under mockup */}
      <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center text-[10px] sm:text-xs font-sans font-bold text-[#3d2b29]/65 uppercase tracking-wider text-center pt-2">
        <span className="flex items-center gap-1.5"><BookOpen size={14} className="text-[#e36b3c]" /> 153 páginas reais</span>
        <span className="hidden sm:inline">•</span>
        <span className="flex items-center gap-1.5"><Smartphone size={14} className="text-[#e36b3c]" /> PDF de Alta Resolução</span>
        <span className="hidden sm:inline">•</span>
        <span className="flex items-center gap-1.5"><ArrowRight size={14} className="text-[#e36b3c]" /> download imediato</span>
      </div>

      {/* Lightbox Modal for Zooming Pages / Covers */}
      <AnimatePresence>
        {zoomOpen && (
          <div 
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-[100] flex flex-col items-center justify-center p-3 sm:p-6"
            onClick={() => setZoomOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative max-w-lg w-full bg-white rounded-3xl p-4 sm:p-5 flex flex-col items-center space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header inside Modal */}
              <div className="w-full flex justify-between items-center pb-2 border-b border-[#3d2b29]/8">
                <div className="flex items-center gap-2">
                  <Bookmark size={14} className="text-[#e36b3c]" />
                  <span className="text-xs uppercase font-extrabold tracking-widest text-[#3d2b29]">
                    visualizando página ampliada
                  </span>
                </div>
                <button 
                  onClick={() => setZoomOpen(false)}
                  className="w-7 h-7 rounded-full bg-[#fbf6f1] text-[#3d2b29] font-bold text-xs flex items-center justify-center cursor-pointer hover:bg-red-50"
                >
                  ✕
                </button>
              </div>

              {/* Main Image content */}
              <div className="w-full rounded-2xl overflow-hidden border border-[#3d2b29]/10 bg-[#fbf6f1] max-h-[70vh] flex items-center justify-center select-none shadow-md">
                <img 
                  src={selectedItem.url} 
                  alt={selectedItem.title} 
                  className="w-auto h-auto max-h-[60vh] object-contain"
                />
              </div>

              {/* Description inside Modal */}
              <div className="text-center space-y-1">
                <h5 className="font-serif font-black text-base text-[#3d2b29]">
                  {selectedItem.title}
                </h5>
                <p className="text-xs text-[#3d2b29]/80">
                  {selectedItem.description}
                </p>
              </div>

              {/* Action buttons inside Modal */}
              <div className="w-full grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => setZoomOpen(false)}
                  className="py-3 px-4 bg-[#fbf6f1] hover:bg-[#f2e7dc] text-[#3d2b29] font-bold rounded-xl text-xs uppercase tracking-wider cursor-pointer"
                >
                  Fechar janela
                </button>
                <button
                  onClick={() => {
                    setZoomOpen(false);
                    const element = document.getElementById('oferta-valores');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="py-3 px-4 bg-[#e36b3c] hover:bg-[#c44a1f] text-white font-bold rounded-xl text-xs uppercase tracking-wider cursor-pointer shadow-md shadow-[#e36b3c]/20"
                >
                  Garantir Meu Acesso
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
