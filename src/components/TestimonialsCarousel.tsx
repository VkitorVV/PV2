import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface TestimonialItem {
  name: string;
  title: string;
  img: string;
}

interface Props {
  items: TestimonialItem[];
}

export default function TestimonialsCarousel({ items }: Props) {
  const [current, setCurrent] = useState(0);

  const handlePrev = () =>
    setCurrent((c) => (c === 0 ? items.length - 1 : c - 1));

  const handleNext = () =>
    setCurrent((c) => (c === items.length - 1 ? 0 : c + 1));

  const item = items[current];

  return (
    /* Wrapper com overflow visible para as setas saírem nas laterais */
    <div className="relative w-full" style={{ paddingLeft: '20px', paddingRight: '20px' }}>

      {/* Seta esquerda — fora da imagem, na borda lateral do wrapper */}
      <button
        onClick={handlePrev}
        aria-label="Depoimento anterior"
        className="absolute left-0 top-1/2 z-20 flex items-center justify-center cursor-pointer"
        style={{
          width: '36px',
          height: '36px',
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: '#fff',
          borderRadius: '50%',
          boxShadow: '0 2px 8px rgba(0,0,0,0.14)',
          border: '1px solid rgba(61,43,41,0.10)',
        }}
      >
        <ChevronLeft size={20} style={{ color: '#3d2b29' }} />
      </button>

      {/* Seta direita */}
      <button
        onClick={handleNext}
        aria-label="Próximo depoimento"
        className="absolute right-0 top-1/2 z-20 flex items-center justify-center cursor-pointer"
        style={{
          width: '36px',
          height: '36px',
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: '#3d2b29',
          borderRadius: '50%',
          boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
          border: 'none',
        }}
      >
        <ChevronRight size={20} style={{ color: '#fff' }} />
      </button>

      {/* Card */}
      <div
        className="w-full bg-white rounded-2xl overflow-hidden"
        style={{
          border: '1px solid rgba(61,43,41,0.09)',
          boxShadow: '0 4px 32px rgba(61,43,41,0.08), 0 1px 4px rgba(61,43,41,0.04)',
        }}
      >
        {/* Cabeçalho */}
        <div className="flex items-center justify-between gap-3 px-5 pt-5 pb-3">
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
              style={{ backgroundColor: '#C44A1F' }}
            >
              {item.name[0]}
            </div>
            <div>
              <p className="font-sans font-bold text-sm text-petroleo leading-none">{item.name}</p>
              <p className="text-[10px] text-terracotta/60 mt-0.5 font-medium uppercase tracking-wide">
                Compra confirmada ✓
              </p>
            </div>
          </div>
          <div className="flex items-center gap-0.5 shrink-0">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={13} className="text-amber-400 fill-amber-400" />
            ))}
          </div>
        </div>

        {/* Título */}
        <div className="px-5 pb-4">
          <h3
            className="font-serif leading-snug"
            style={{ fontSize: 'clamp(15px, 3vw, 18px)', color: '#3A2D28', fontWeight: 600 }}
          >
            {item.title}
          </h3>
        </div>

        {/* Área da imagem — todas renderizadas no DOM simultaneamente */}
        {/* A ativa ocupa espaço (position relative/static), as outras ficam
            sobrepostas invisíveis (position absolute, visibility hidden)
            para o browser baixar tudo em paralelo sem ocupar altura */}
        <div className="relative w-full bg-[#F8F4EE]">
          {items.map((t, i) => (
            <img
              key={t.img}
              src={t.img}
              alt={i === current ? `Depoimento de ${t.name}` : ''}
              width="600"
              height="800"
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
              className="w-full h-auto block"
              style={
                i === current
                  ? { position: 'relative' }
                  : { position: 'absolute', top: 0, left: 0, width: '100%', visibility: 'hidden', pointerEvents: 'none' }
              }
            />
          ))}

          {/* Dots flutuantes sobre a imagem — sem fundo branco */}
          <div
            className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full z-10"
            style={{
              backdropFilter: 'blur(6px)',
              backgroundColor: 'rgba(0,0,0,0.18)',
            }}
          >
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Ir para depoimento ${i + 1}`}
                className="rounded-full cursor-pointer transition-all duration-150"
                style={{
                  width: i === current ? '18px' : '6px',
                  height: '6px',
                  backgroundColor: i === current ? '#fff' : 'rgba(255,255,255,0.5)',
                  border: 'none',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
