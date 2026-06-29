import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { 
  Check, Play, Heart, Star, LogIn, ChevronDown, ChevronRight, 
  HelpCircle, Clock, BookOpen, Smartphone, ShieldCheck, Mail, 
  Tv, Lock, Activity, ArrowRight, UserCheck, AlertCircle, 
  ArrowUpRight, Info, Phone, MessageSquare, Eye,
  BatteryWarning, MonitorOff, SmilePlus, CreditCard, Sparkles, XCircle, CheckCircle2, Search
} from 'lucide-react';

import { REVIEWS, BONUSES, FAQS } from './data';
import CheckoutSimulator from './components/CheckoutSimulator';
import DynamicPreviewPlayground from './components/DynamicPreviewPlayground';
import EbookCover from './components/EbookCover';
import HeroBundleMockup from './components/HeroBundleMockup';
import OfferInterceptionModal from './components/OfferInterceptionModal';
import { PurchaseNotification } from './components/PurchaseNotification';
import RecoveryPopup from './components/RecoveryPopup';
import TestimonialsCarousel from './components/TestimonialsCarousel';
import { useFunnelTracking } from './hooks/useFunnelTracking';
import {
  trackCTA1,
  trackCTA2,
  trackCTA3,
  trackSelectBasic,
  trackSelectCompleteAndRedirect,
  trackInterceptPopupShow,
} from './analytics';

export default function App() {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [interceptModalOpen, setInterceptModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'complete'>('complete');
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  // Rastreamento automático das seções do funil via IntersectionObserver
  useFunnelTracking();

  // Smooth scroll handler
  const scrollWithId = (selectorId: string) => {
    const targetElement = document.getElementById(selectorId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Open Checkout — com rastreamento de plano selecionado
  const handleCheckoutOpen = (plan: 'basic' | 'complete') => {
    if (plan === 'basic') {
      trackSelectBasic();
      trackInterceptPopupShow();
      setInterceptModalOpen(true);
    } else {
      trackSelectCompleteAndRedirect('https://checkout.compraseguracheckout.shop/VCCL1O8SD26X');
    }
  };

  return (
    <div id="sales-page-container" className="min-h-screen flex flex-col font-sans selection:bg-coral/20 selection:text-coral-dark bg-creme relative overflow-x-hidden">
      
      {/* Decorative top watercolor wash */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] watercolor-wash-pink rounded-full -z-10 pointer-events-none opacity-40"></div>
      <div className="absolute top-1/4 left-0 w-[35vw] h-[35vw] watercolor-wash-sage rounded-full -z-10 pointer-events-none opacity-30"></div>

      {/* BLOCK 01 — VENDA IMEDIATA (Hero section/first fold) */}
      <section id="venda-imediata" className="pt-10 pb-16 md:pt-16 md:pb-24 px-4 max-w-7xl mx-auto w-full">

        {/* Selo — texto curto, não quebra */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 bg-coral/10 text-coral-dark text-[11px] font-bold px-4 py-2 rounded-full uppercase tracking-wider border border-coral/15 shadow-sm whitespace-nowrap">
            <Heart size={11} className="shrink-0" /> Para mães que amam, mas chegam exaustas
          </div>
        </div>

        {/* Headline — 2 linhas */}
        <div className="text-center max-w-2xl mx-auto mb-5">
          <h1 className="font-serif leading-tight tracking-tight">
            <span className="block text-xl sm:text-2xl md:text-4xl font-normal text-petroleo/70 mb-3">
              Seu filho não precisa de uma mãe com mais energia.
            </span>
            <span className="block text-xl sm:text-2xl md:text-4xl font-extrabold text-coral-dark mb-3">
              Ele só precisa de alguns minutos em que sinta que você esteve realmente com ele.
            </span>
          </h1>
        </div>

        {/* Divider sutil */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-px bg-coral/30 rounded-full"></div>
        </div>

        {/* Subheadline */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <p className="font-sans text-sm sm:text-base text-terracotta/80 leading-relaxed">
            Você não precisa correr pela casa, inventar brincadeiras ou fingir disposição depois de um dia exaustivo.
          </p>

        </div>

        {/* Mockup + bullets + CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center max-w-5xl mx-auto">
          <div className="lg:col-span-6 flex justify-center relative py-4 px-1">
            <HeroBundleMockup />
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-sage/20 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0 mt-1">✓</div>
                <p className="text-sm text-terracotta leading-relaxed">
                  O guia foi criado para mães que chegam no fim do dia sem forças, mas ainda querem dar ao filho algo que ele vai levar pra vida: <strong className="font-bold text-petroleo">atenção, presença e memória afetiva de verdade.</strong>
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-sage/20 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0 mt-1">✓</div>
                <p className="text-sm text-terracotta leading-relaxed">
                  Acesso imediato — use hoje mesmo, no celular, no sofá ou na cama. Porque às vezes é justamente nos dias mais cansados que <strong className="font-bold text-petroleo">um momento simples vira a lembrança mais bonita.</strong>
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="space-y-3 pt-2">
              <button
                id="main-cta-hero"
                onClick={() => { trackCTA1(); scrollWithId('oferta-valores'); }}
                className="w-full py-4 px-6 bg-gradient-to-r from-coral to-coral-dark hover:from-coral-dark hover:to-coral-dark text-white font-sans font-bold text-base rounded-2xl shadow-lg hover:shadow-xl hover:shadow-coral/20 transition-all cursor-pointer transform active:scale-[0.99] text-center"
              >
                QUERO VIVER ESSE MOMENTO HOJE
              </button>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-2 text-xs text-terracotta/60 font-medium">
                <span className="flex items-center gap-1.5"><ArrowRight size={14} className="text-coral-dark" /> Acesso imediato</span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-coral-dark" /> Garantia de 7 dias</span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-1.5"><Check size={14} className="text-coral-dark" /> Pix ou Cartão</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCK 02 — DEMONSTRATIVO / PROVA VISUAL DO PRODUTO (Interactive Preview) */}
      <section id="demonstrativo-visual" className="bg-creme-alt/30 border-y border-petroleo/5 py-16 px-4">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
            <span className="text-xs bg-coral/10 text-coral-dark font-bold font-sans uppercase px-3 py-1 rounded-full">
              VEJA POR DENTRO
            </span>
            <h2 className="font-serif text-xl sm:text-3xl md:text-4xl text-petroleo font-bold">
              Veja como o guia transforma minutos cansados em momentos que aproximam vocês
            </h2>
            <p className="font-sans text-xs sm:text-sm md:text-base text-terracotta/90 leading-relaxed max-w-lg mx-auto">
              Cada dinâmica vem pronta para usar, com explicação simples, exemplo, perguntas para estimular conversa e variações rápidas. Tudo pensado para que você não precise inventar nada — só abrir e viver um momento gostoso com seu filho.
            </p>
          </div>

          {/* Interactive Lab Dashboard Component */}
          <DynamicPreviewPlayground />

          <p className="text-center text-xs text-terracotta/50 mt-4 italic">
            ↑ Páginas reais do guia simuladas de forma interativa (153 páginas no total escritas em português brasileiro)
          </p>
        </div>
      </section>

      {/* BLOCK 03 — BENEFÍCIOS DO PRODUTO */}
      <section id="beneficios" className="py-20 px-4 max-w-5xl mx-auto w-full">
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs bg-sage/10 text-emerald-800 font-bold font-sans uppercase px-3 py-1 rounded-full">
            POR QUE FUNCIONA
          </span>
          <h2 className="font-serif text-xl sm:text-3xl md:text-4xl text-petroleo font-bold">
            A conexão que seu filho merece, sem esgotar você
          </h2>
        </div>

        {/* Bloco emocional otimizado */}
        <div className="max-w-2xl mx-auto mb-14 text-center space-y-6">
          <p className="font-serif text-lg sm:text-2xl text-petroleo leading-relaxed">
            Mais do que brinquedos, seu filho lembrará dos momentos que vocês viveram juntos.{' '}
            <span className="text-coral-dark font-semibold">Este guia torna isso possível, mesmo quando você está exausta.</span>
          </p>

          <div className="pt-5 pb-2 space-y-2 border-t border-petroleo/8">
            <p className="font-sans text-sm sm:text-base text-petroleo font-semibold">
              Nenhuma dessas lembranças exige uma mãe perfeita.
            </p>
            <p className="font-sans text-sm sm:text-base text-terracotta/90">
              Só exige que ela esteja ali.{' '}
              <span className="font-semibold text-coral-dark">Mesmo cansada.</span>
            </p>
          </div>
        </div>

        {/* Graded Benefits Grid (No long paragraphs) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: <BatteryWarning size={15} className="stroke-[2.5]" />,
              title: "Você preserva sua energia sem abrir mão da presença",
              text: "Mesmo descansando, seu filho sente que vocês estão juntos de verdade."
            },
            {
              icon: <MonitorOff size={15} className="stroke-[2.5]" />,
              title: "A tela deixa de ser a única saída",
              text: "Em vez de proibir, você oferece algo mais forte: atenção com vínculo."
            },
            {
              icon: <Search size={15} className="stroke-[2.5]" />,
              title: "Você encontra o tipo certo de conexão para cada noite",
              text: "Seja para rir, acalmar, conversar ou gastar energia — tem dinâmica pronta para cada momento."
            },
            {
              icon: <Activity size={15} className="stroke-[2.5]" />,
              title: "As dinâmicas acompanham a fase do seu filho",
              text: "Sem ficar infantil demais para um, nem difícil demais para outro."
            },
            {
              icon: <Heart size={15} className="stroke-[2.5]" />,
              title: "Você cria memória com o que já existe na sua casa",
              text: "Porque o que marca a infância não é produção; é presença."
            },
            {
              icon: <Clock size={15} className="stroke-[2.5]" />,
              title: "Até poucos minutos já mudam o clima da noite",
              text: "Às vezes, o que faltava não era mais tempo — era a ideia certa."
            },
            {
              icon: <SmilePlus size={15} className="stroke-[2.5]" />,
              title: "Você termina a noite mais leve, não mais sobrecarregada",
              text: "A conexão acontece sem virar mais uma fonte de estresse."
            },
            {
              icon: <CheckCircle2 size={15} className="stroke-[2.5]" />,
              title: "O guia cabe na vida real",
              text: "Ele funciona no lugar e no horário em que a maternidade acontece de verdade."
            }
          ].map((bene, idx) => (
            <div key={idx} className="bg-white border border-petroleo/10 rounded-2xl p-5 shadow-sm flex gap-4 transition-all hover:border-coral/20 hover:shadow-md">
              <span className="w-9 h-9 rounded-xl bg-sage/15 text-emerald-700 flex items-center justify-center shrink-0">
                {bene.icon}
              </span>
              <div>
                <h4 className="font-sans font-bold text-petroleo text-sm mb-1.5 leading-snug">
                  {bene.title}
                </h4>
                <p className="text-xs text-terracotta/80 leading-relaxed">
                  {bene.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>



      {/* BLOCK 05 — IDEAL PARA VOCÊ QUE… */}
      <section id="ideal-para" className="py-20 px-4 max-w-5xl mx-auto w-full">
        <div className="text-center space-y-2 mb-12">
          <span className="text-xs bg-coral/10 text-coral-dark font-sans font-bold uppercase px-3 py-1 rounded-full">
            IDEAL PARA VOCÊ QUE…
          </span>
          <h2 className="font-serif text-xl sm:text-3xl md:text-4xl text-petroleo font-bold">
            Esse guia foi feito para você que ama profundamente, mas chega no fim do dia sem mais nada para entregar
          </h2>
        </div>

        <div className="max-w-2xl mx-auto space-y-8">
          {[
            {
              linha1: "termina o dia completamente esgotada…",
              linha2: "…mas ainda sente culpa por dizer \"agora não\".",
            },
            {
              linha1: "entrega o celular porque simplesmente não sobra energia…",
              linha2: "…e depois vai dormir se perguntando se está fazendo o suficiente.",
            },
            {
              linha1: "olha para o filho brincando sozinho…",
              linha2: "…e sente que queria conseguir participar mais.",
            },
            {
              linha1: "ama ser mãe…",
              linha2: "…mas às vezes sente que o cansaço está roubando momentos que nunca mais voltam.",
            },
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-4 bg-white border border-petroleo/8 rounded-2xl p-5 shadow-sm hover:border-coral/20 transition-all">
              <div className="w-6 h-6 rounded-full bg-coral/10 flex items-center justify-center shrink-0 mt-0.5">
                <Check size={13} className="text-coral stroke-[3]" />
              </div>
              <div className="space-y-1">
                <p className="font-sans font-semibold text-petroleo text-xs sm:text-base leading-snug">
                  {item.linha1}
                </p>
                <p className="font-sans text-terracotta/70 text-sm leading-relaxed">
                  {item.linha2}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BLOCK 06 — COMPARATIVO DE VIDA (Antes / Depois) [OPTIONAL CHOSEN] */}
      <section id="comparativo-vida" className="bg-white border-y border-petroleo/10 py-16 px-4">
        <div className="max-w-4xl mx-auto w-full">
          <div className="text-center space-y-2 mb-10">
            <span className="text-xs bg-sage/10 text-emerald-800 font-bold font-sans uppercase px-3 py-1 rounded-full">
              COMO SUA NOITE MUDA
            </span>
            <h2 className="font-serif text-xl sm:text-3xl md:text-4xl text-petroleo font-bold">
              A diferença entre terminar a noite em culpa e terminar a noite sentindo que você esteve de verdade com ele
            </h2>
          </div>

          {/* Skeuomorphic visual comparison grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* NOITE HOJE (Negative) */}
            <div className="bg-creme-warm/30 border border-petroleo/5 rounded-2xl p-6 lg:p-8 flex flex-col opacity-80 backdrop-blur-sm transition-all hover:opacity-100">
              <h4 className="font-sans font-extrabold text-terracotta/60 text-[13px] flex items-center gap-2 mb-6 uppercase tracking-wider">
                <XCircle className="w-5 h-5 text-terracotta/50" strokeWidth={2.5} />
                SUAS NOITES HOJE
              </h4>
              <ul className="space-y-6 text-[13px] md:text-sm text-terracotta/80 list-none">
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-terracotta/40 shrink-0 mt-0.5" strokeWidth={2} />
                  <span className="leading-relaxed">Você chega moída, entrega a tela para sobreviver e passa a noite com aquela <strong>sensação silenciosa de que a infância está escorrendo pelos dedos.</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-terracotta/40 shrink-0 mt-0.5" strokeWidth={2} />
                  <span className="leading-relaxed">Tenta brincar do jeito tradicional, se irrita rápido porque o corpo não acompanha e vai dormir <strong>sentindo que falhou de novo.</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-terracotta/40 shrink-0 mt-0.5" strokeWidth={2} />
                  <span className="leading-relaxed">Repete para si mesma que é só uma fase, mas lá no fundo <strong>morre de medo de que seu filho se acostume a não esperar mais por você.</strong></span>
                </li>
              </ul>
            </div>

            {/* NOITE COM O GUIA (Positive) */}
            <div className="bg-white border-[3px] border-sage/80 rounded-2xl p-6 lg:p-8 flex flex-col shadow-xl shadow-sage/10 relative z-10 scale-[1.02] md:scale-105">
              <h4 className="font-sans font-extrabold text-petroleo text-sm md:text-base flex items-center gap-2.5 mb-6 uppercase tracking-wider">
                <CheckCircle2 className="w-6 h-6 text-sage" strokeWidth={2.5} />
                SUAS NOITES COM O GUIA
              </h4>
              <ul className="space-y-6 text-[13px] md:text-sm text-petroleo/90 list-none font-medium">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-sage shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="leading-relaxed">Você abre o guia, escolhe uma dinâmica simples e em poucos minutos <strong>a tela perde espaço para um momento leve entre vocês.</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-sage shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="leading-relaxed">Seu filho ri, participa, se aproxima e vai dormir depois de ter <strong>sentido a sua presença — não a sua culpa.</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-sage shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="leading-relaxed">Você termina a noite mais tranquila, com a sensação de que <strong>não precisa ser perfeita nem incansável para construir memórias bonitas com ele.</strong></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCK 07 — CARTA */}
      <section
        id="missao-propósito"
        className="relative py-16 md:py-20 px-4"
      >
        {/* Card da carta - design leve */}
        <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-petroleo/8 shadow-lg p-8 md:p-12">
          
          {/* Etiqueta */}
          <div className="flex justify-center mb-6">
            <span className="text-[10px] bg-coral/10 text-coral-dark font-bold uppercase px-3 py-1.5 rounded-full tracking-widest">
              Uma mensagem pra você
            </span>
          </div>

          {/* Título */}
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-petroleo text-center mb-8">
            Antes de você decidir...
          </h2>

          {/* Divider simples */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-px bg-coral/30 rounded-full"></div>
          </div>

          {/* Corpo da carta */}
          <div className="font-sans text-sm sm:text-base text-terracotta/90 leading-relaxed space-y-4 max-w-2xl mx-auto">
            <p>Talvez ninguém tenha te dito isso nos últimos tempos.</p>
            <p><strong className="text-petroleo font-semibold">Estar cansada não significa amar menos.</strong></p>
            <p>Você não precisa competir com mães da internet, inventar brincadeiras mirabolantes ou encontrar energia onde ela simplesmente não existe.</p>
            <p>Seu filho não vai lembrar de quantas vezes você correu pela casa.</p>
            <p><strong className="text-petroleo font-semibold">Ele vai lembrar da sensação de ter você por perto.</strong></p>
            <p>Mesmo de pijama. Mesmo deitada. Mesmo depois de um dia difícil.</p>
            <p>Foi por isso que este guia nasceu.</p>
            <p>Para ajudar mães reais a viverem momentos reais.</p>
            <p><strong className="text-petroleo font-semibold">Sem culpa. Sem performance. Só presença.</strong></p>
            <p className="italic text-coral-dark pt-2">
              Porque, no fim, a infância quase nunca guarda o brinquedo. Ela guarda quem estava ali.
            </p>
          </div>

          {/* Assinatura */}
          <div className="mt-10 pt-6 border-t border-petroleo/8 text-center">
            <p className="font-serif text-lg text-petroleo italic">
              Com carinho,
            </p>
            <p className="font-serif text-xl text-coral-dark font-semibold mt-1">
              Uma mãe que te entende
            </p>
          </div>
        </div>
      </section>

      {/* BLOCK 11 — PROVA SOCIAL (carrossel) */}
      <section id="prova-social" className="py-16 px-4 bg-creme">
        <div className="max-w-2xl mx-auto w-full">

          {/* Header */}
          <div className="text-center space-y-2 mb-10">
            <span className="text-xs bg-sage/10 text-emerald-800 font-bold font-sans uppercase px-3 py-1 rounded-full tracking-wider">
              MÃES QUE JÁ TESTARAM
            </span>
            <h2 className="font-serif text-xl sm:text-3xl md:text-4xl text-petroleo font-bold">
              Mães que também achavam que nada resolveria
            </h2>
            <p className="font-sans text-sm sm:text-base text-terracotta/80 leading-relaxed max-w-lg mx-auto">
              Antes de decidir, leia algumas mensagens que recebi de mães que estavam exatamente onde você está hoje.
            </p>
          </div>

          {/* Carrossel */}
          <TestimonialsCarousel items={[
            {
              name: 'Camila',
              title: '"Eu não precisava de mais disposição. Eu precisava de um caminho."',
              img: 'https://i.ibb.co/q3q4vCYS/1.webp',
            },
            {
              name: 'Priscila',
              title: '"Pela primeira vez consegui brincar exatamente do jeito que meu corpo permitia."',
              img: 'https://i.ibb.co/7wJ2V0j/5.webp',
            },
            {
              name: 'Amanda',
              title: '"Meu filho largou o celular... e eu parei de terminar todas as noites me culpando."',
              img: 'https://i.ibb.co/NMwMn6M/2.webp',
            },
            {
              name: 'Carolina',
              title: '"Achei que ia ganhar algumas brincadeiras. Acabei recuperando minhas noites."',
              img: 'https://i.ibb.co/84jhd5Fx/3.webp',
            },
            {
              name: 'Juliana',
              title: '"A frase da minha filha valeu muito mais do que qualquer elogio ao guia."',
              img: 'https://i.ibb.co/GQJK6t3j/4.webp',
            },
          ]} />

          {/* Bloco de fechamento */}
          <div className="mt-12 text-center space-y-4 max-w-lg mx-auto">
            <p className="font-sans text-xs uppercase tracking-widest text-terracotta/50 font-semibold">
              Percebe uma coisa?
            </p>
            <p className="font-serif text-lg sm:text-xl text-petroleo leading-relaxed">
              Nenhuma dessas mães disse que ficou menos cansada.
            </p>
            <div className="space-y-2 font-sans text-sm sm:text-base text-terracotta/80 leading-relaxed">
              <p>O cansaço continua existindo.</p>
              <p>O que mudou foi que ele deixou de impedir os momentos que realmente importam.</p>
              <p className="font-semibold text-petroleo">Foi exatamente para isso que esse guia foi criado.</p>
            </div>
            <div className="pt-4">
              <button
                onClick={() => { trackCTA2(); scrollWithId('oferta-valores'); }}
                className="w-full py-4 px-6 bg-gradient-to-r from-coral to-coral-dark hover:from-coral-dark hover:to-coral-dark text-white font-sans font-bold text-sm rounded-2xl shadow-lg hover:shadow-xl hover:shadow-coral/20 transition-all cursor-pointer transform active:scale-[0.99] uppercase tracking-wider"
              >
                Quero viver noites assim também
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* BLOCK 08 — TUDO QUE VOCÊ VAI RECEBER (PRODUTO PRINCIPAL) */}
      <section id="produto-principal" className="bg-creme-alt/30 border-y border-petroleo/5 py-16 px-4">
        <div className="max-w-4xl mx-auto w-full">
          <div className="text-center space-y-2 mb-10">
            <span className="text-xs bg-coral/10 text-coral-dark font-sans font-bold uppercase px-3 py-1 rounded-full">
              O PRODUTO PRINCIPAL
            </span>
            <h2 className="font-serif text-xl sm:text-3xl md:text-4xl text-petroleo font-bold">
              Tudo que você vai receber ao adquirir hoje
            </h2>
          </div>

          {/* Featured detailed Card matching Item 01 */}
          <div className="bg-white border border-petroleo/10 rounded-[32px] p-6 sm:p-10 shadow-xl shadow-petroleo/5 hover:shadow-2xl hover:border-coral/20 transition-all duration-300 relative overflow-hidden group">
            <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
              <div className="w-full max-w-[340px] xs:max-w-[380px] sm:max-w-[420px] md:w-72 lg:w-80 xl:w-96 shrink-0 relative">
                <img src="https://i.ibb.co/TBGh2LBS/Chat-GPT-Image-30-de-mai-de-2026-12-21-23-1.webp" alt="Guia Base +120 Dinâmicas" className="w-full h-auto object-contain rounded-2xl animate-fade-in transition-transform duration-500 group-hover:scale-[1.01]" />
                <div className="absolute inset-0 bg-[#3d2b29]/85 opacity-0 hover:opacity-100 transition-all flex flex-col items-center justify-center text-white text-xs font-bold gap-1 cursor-pointer rounded-2xl" onClick={() => scrollWithId('demonstrativo-visual')}>
                  <Eye size={14} className="text-[#e36b3c]" /> 
                  <span className="mt-1">Ver Prévias</span>
                </div>
              </div>

              <div className="space-y-4 flex-1">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-[10px] bg-coral/10 text-coral-dark font-sans font-bold uppercase px-3 py-1 rounded-full border border-coral/20 tracking-wider">
                      ITEM 01 • PRODUTO PRINCIPAL
                    </span>
                    <span className="text-[10px] bg-sage/10 text-emerald-800 font-sans font-bold uppercase px-3 py-1 rounded-full border border-sage/20 tracking-wider">
                      O GUIA BASE
                    </span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-3xl font-bold text-petroleo leading-tight">
                    +120 Dinâmicas de Sofá para Mães Cansadas
                  </h3>
                  <p className="font-sans text-sm text-terracotta/80 mt-1 leading-relaxed">
                    O guia mais vendido em PDF com 153 páginas estruturadas nos seguintes 6 módulos principais prontos:
                  </p>
                </div>

                <ul className="text-xs sm:text-sm text-petroleo/90 space-y-2.5 leading-relaxed font-normal">
                  <li className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-coral/10 flex items-center justify-center shrink-0 mt-0.5">
                      <BookOpen className="text-coral" size={11} />
                    </div>
                    <span><strong>Módulo 01 — Conexão Rápida:</strong> (26 páginas do PDF, 6 a 10 anos)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-coral/10 flex items-center justify-center shrink-0 mt-0.5">
                      <BookOpen className="text-coral" size={11} />
                    </div>
                    <span><strong>Módulo 02 — Crianças Agitadas:</strong> (26 páginas das melhores dinâmicas descompressivas)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-coral/10 flex items-center justify-center shrink-0 mt-0.5">
                      <BookOpen className="text-coral" size={11} />
                    </div>
                    <span><strong>Módulo 03 — Educativas e Criativas:</strong> (26 páginas estimulando a imaginação)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-coral/10 flex items-center justify-center shrink-0 mt-0.5">
                      <BookOpen className="text-coral" size={11} />
                    </div>
                    <span><strong>Módulo 04 — Afeto e Desenvolvimento Emocional:</strong> (26 páginas reforçando a autoconfiança de deitados)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-coral/10 flex items-center justify-center shrink-0 mt-0.5">
                      <BookOpen className="text-coral" size={11} />
                    </div>
                    <span><strong>Módulo 05 — Para Crianças Pequenas (3-5 anos):</strong> (31 páginas dedicadas à fase inicial)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-coral/10 flex items-center justify-center shrink-0 mt-0.5">
                      <BookOpen className="text-coral" size={11} />
                    </div>
                    <span><strong>Módulo 06 — Conclusões e Rituais Noturnos:</strong> (15 páginas complementares)</span>
                  </li>
                </ul>

                <div className="text-xs sm:text-sm text-terracotta leading-relaxed bg-creme-warm/40 p-4 rounded-2xl border border-coral/10 flex items-start gap-2.5 mt-2">
                  <Sparkles className="text-coral shrink-0 mt-0.5" size={14} />
                  <span>
                    <strong>Cada página do PDF ensina de imediato:</strong> Como brincar, exemplo pronto ilustrado, perguntas disparadoras para engajar a imaginação dele e adaptações rápidas de tempo.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCK 09 — BÔNUS */}
      <section id="bonus" className="py-20 px-4">
        <div className="max-w-6xl mx-auto w-full bg-creme-warm/30 border border-petroleo/10 rounded-[32px] sm:rounded-[48px] p-6 sm:p-12 md:p-16 shadow-xl shadow-petroleo/5 relative overflow-hidden">
          {/* Decorative watercolor wash */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] watercolor-wash-pink pointer-events-none opacity-40"></div>
          
          <div className="text-center space-y-3 mb-12 relative z-10">
            <span className="text-[11px] bg-sage/15 text-emerald-800 font-extrabold font-sans uppercase px-3.5 py-1.5 rounded-full border border-sage/25 tracking-wider">
              E NÃO PARA POR AÍ…
            </span>
            <h2 className="font-serif text-xl sm:text-4xl text-petroleo font-bold tracking-tight">
              Você também vai receber 4 bônus exclusivos gratuitamente
            </h2>
            <p className="font-sans text-xs sm:text-sm text-terracotta/90 max-w-lg mx-auto leading-relaxed">
              Material extra digital de download, pronto para imprimir e preencher a semana inteira — sem que você precise bolar nada difícil.
            </p>
          </div>

          {/* 4 Cards representation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {BONUSES.map((bonus, idx) => (
              <div key={bonus.id} className="bg-white border border-petroleo/10 rounded-2xl p-5 shadow-sm hover:shadow-xl hover:border-coral/25 hover:translate-y-[-2px] transition-all duration-300 flex flex-col justify-between group/card">
                <div className="space-y-4">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-coral-dark bg-coral/10 border border-coral/20 px-2.5 py-1 rounded-full uppercase font-sans tracking-wide">
                    <Sparkles size={11} className="text-coral" /> {bonus.tag}
                  </span>
                  
                  {/* Visual Representation of Printable sheets or Image */}
                  {bonus.mockImage && !bonus.mockImage.includes("picsum.photos") ? (
                    <div className="aspect-square bg-linear-to-b from-white to-creme-warm/20 rounded-2xl border border-petroleo/10 overflow-hidden relative flex items-center justify-center p-3 shadow-inner group-hover/card:border-coral/20 transition-all duration-300">
                      <img
                        src={bonus.mockImage}
                        alt={bonus.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain rounded-xl transition-transform duration-500 group-hover/card:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="aspect-square rounded-2xl overflow-hidden relative border border-neutral-100 shadow-inner bg-creme font-sans text-[10px] text-zinc-400 p-3 flex items-center justify-center">
                      <div className="w-full h-full bg-linear-to-b from-white to-stone-50 border border-zinc-200 shadow-xs rounded-xl p-2.5 flex flex-col justify-between">
                        <div className="flex justify-between items-center pb-1 border-b border-zinc-100">
                          <span className="font-bold text-[8px] text-petroleo">Módulo Extra</span>
                          <span className="text-[7px]">Doc. PDF</span>
                        </div>
                        <div className="flex-1 py-1 flex items-center justify-center text-center font-serif italic text-[11px] text-coral font-bold leading-tight">
                          {bonus.name}
                        </div>
                        <div className="h-1 bg-coral/20 rounded-full w-2/3"></div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <h4 className="font-sans font-bold text-petroleo text-xs sm:text-base leading-snug">
                      {bonus.name}
                    </h4>
                    <p className="text-xs text-terracotta/80 leading-relaxed font-sans">
                      {bonus.description}
                    </p>
                  </div>
                </div>

                <div className="border-t border-emerald-100/50 pt-4 mt-6 text-[11px] font-bold text-emerald-800 bg-emerald-50/50 border border-emerald-100/30 rounded-xl px-3 py-2 flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-[9px] shrink-0">✓</span>
                  <span>Incluso Gratuitamente</span>
                </div>
              </div>
            ))}
          </div>

          {/* Value Anchor Clarification (According to Heitor's rules: No false value anchoring) */}
          <p className="text-center text-xs text-terracotta/50 mt-10 relative z-10 font-sans italic">
            *Bônus sem truques ou taxas de renovação falsas. São seus para sempre.
          </p>
        </div>
      </section>

      {/* BLOCK 10 — OFERTA E VALORES (DUPLO PLANO COM ANCORAGEM LEGAL) */}
      <section id="oferta-valores" className="bg-[#FAF6F1] border-y border-petroleo/10 py-20 px-4 relative overflow-hidden">
        {/* Subtle decorative elements matching the visual layout of the rest of the page */}
        <div className="absolute top-0 left-0 w-80 h-80 watercolor-wash-pink pointer-events-none opacity-30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 watercolor-wash-sage pointer-events-none opacity-20 rounded-full blur-3xl" />

        <div className="max-w-5xl mx-auto w-full relative z-10">
          <div className="text-center space-y-3 mb-14">
            <span className="inline-flex items-center gap-1.5 text-xs bg-coral/10 text-coral-dark font-sans font-bold uppercase px-3.5 py-1.5 rounded-full border border-coral/15 tracking-wide">
              <Sparkles className="w-3.5 h-3.5" /> ESCOLHA SEU PLANO DE ACESSO
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-petroleo font-bold tracking-tight max-w-2xl mx-auto leading-tight">
              Quanto vale parar de ir dormir com culpa?
            </h2>
            <p className="font-sans text-xs sm:text-sm md:text-base text-terracotta max-w-lg mx-auto leading-relaxed">
              Você pode selecionar apenas o livro digital básico ou garantir o kit lúdico inteiro com todos os bônus imprimíveis inclusos. Escolha o ideal para sua família:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-stretch max-w-4xl mx-auto">
            
            {/* PLANO BÁSICO (Elegant, warm-neutral, humble discrete card) */}
            <div className="md:col-span-5 bg-[#F6EFE9]/40 border border-petroleo/10 rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:border-petroleo/20 hover:bg-[#F6EFE9]/60 transition-all self-center h-fit group shadow-xs">
              <div className="space-y-5">
                <div className="flex justify-between items-center">
                  <span className="inline-block text-xs font-extrabold text-terracotta/70 bg-[#FAF4ED] border border-terracotta/10 px-3 py-1 rounded-md font-sans uppercase tracking-wider">
                    Opção Simplificada
                  </span>
                </div>
                
                <div>
                  <h4 className="font-serif text-xl font-extrabold text-petroleo leading-tight">
                    Só o Guia Básico
                  </h4>
                  <p className="text-sm text-terracotta/80 mt-1.5">Manual completo com as 120 dinâmicas de sofá principais no formato PDF.</p>
                </div>

                <hr className="border-petroleo/5" />

                <ul className="text-sm text-[#524442] space-y-4 font-medium">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Guia +120 Dinâmicas de Sofá</strong> (153 págs em PDF)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Acesso vitalício seguro para ler onde quiser</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Atualizações gratuitas do manual</span>
                  </li>
                  <li className="flex items-start gap-2 text-stone-400 font-medium line-through decoration-terracotta/20">
                    <span className="w-4 text-center text-red-400 shrink-0 font-bold">×</span>
                    <span>Nenhum dos 4 bônus de impressão</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4 pt-6 border-t border-petroleo/5 mt-8">
                <div>
                  <span className="text-[11px] text-stone-400 font-mono uppercase tracking-wide">Valor do Investimento</span>
                  <div className="font-serif text-3xl font-extrabold text-petroleo mt-1">
                    R$ 14,90 <span className="text-xs font-sans font-normal text-terracotta">à vista</span>
                  </div>
                </div>

                <button
                  onClick={() => handleCheckoutOpen('basic')}
                  className="w-full py-3.5 px-4 bg-[#EDE3D9] hover:bg-[#E5D7CA] text-petroleo font-sans font-black text-xs rounded-2xl transition-all cursor-pointer text-center uppercase tracking-wider border border-petroleo/5 shadow-xs"
                >
                  COMPRAR APENAS O BÁSICO
                </button>

                {/* VISUAL INTERCEPTION WARNING ALERT INTEGRATED RIGHT BELOW THE BUTTON WITH ANIMATED DOUBLE ARROWS */}
                <div className="pt-6 pb-14 relative flex flex-col items-center justify-center gap-1.5 overflow-visible">
                  <span className="text-coral font-sans font-black text-xs sm:text-sm tracking-widest uppercase animate-pulse">
                     ATENÇÃO!!
                  </span>
                  <span className="text-coral-dark font-sans font-black text-sm sm:text-base tracking-widest text-center uppercase leading-tight block max-w-[280px] sm:max-w-xs">
                    TEMOS UMA OFERTA MAIS VANTAJOSA ABAIXO
                  </span>
                  
                  {/* Pulsing and bouncing giant EXTRA-WIDE double downwards arrows positioned perfectly below */}
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                    <svg className="w-24 h-14 text-coral animate-bounce filter drop-shadow-[0_4px_8px_rgba(227,107,60,0.45)]" viewBox="0 0 24 16" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 2l10 5 10-5" />
                      <path d="M2 7l10 5 10-5" />
                    </svg>
                  </div>
                </div>

              </div>
            </div>

            {/* PLANO COMPLETO (Highly Converting Masterpiece, thick coral borders, organic cozy glow) */}
            <div className="md:col-span-7 bg-white border-3 border-coral rounded-[32px] p-6 sm:p-8 flex flex-col justify-between shadow-[0_20px_45px_rgba(227,107,60,0.12)] relative transform hover:scale-[1.01] transition-all overflow-hidden">
              {/* Luxury Ribbon/Badge matching page look */}
              <div className="absolute top-0 right-0 bg-coral text-white text-[10px] sm:text-xs font-bold px-5 py-1.5 rounded-bl-3xl uppercase tracking-widest font-sans flex items-center gap-1 shadow-sm">
                <Star className="w-3.5 h-3.5 fill-white text-white" /> MAIS ADQUIRIDO
              </div>

              <div className="space-y-5">
                <div>
                  <span className="inline-block text-xs font-extrabold text-coral-dark-accent bg-coral/10 px-3 py-1 rounded-md font-sans uppercase tracking-wider border border-coral/10">
                    Combo Recomendado
                  </span>
                  <h4 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#312523] leading-tight mt-2.5">
                    Kit Completo + 4 Bônus
                  </h4>
                  <p className="text-xs sm:text-base text-terracotta/90 mt-1.5">O arsenal lúdico definitivo de descompressão e educação tranquila para o seu lar.</p>
                </div>

                <hr className="border-coral/10" />

                <div className="space-y-4">
                  <p className="text-xs sm:text-sm font-extrabold text-coral-dark uppercase tracking-wide">O QUE VOCÊ VAI RECEBER hoje:</p>
                  <ul className="text-sm sm:text-base text-petroleo space-y-4">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Guia +120 Dinâmicas de Sofá</strong> (153 págs em PDF)</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-stone-700 bg-coral/5 p-3 rounded-2xl border border-coral/5">
                      <Sparkles className="w-5 h-5 text-coral shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-coral-dark block text-xs sm:text-sm">4 BÔNUS ESPECIAIS INCLUSOS NO COMBO:</span>
                        <div className="text-xs sm:text-sm text-terracotta/90 space-y-1.5 mt-2 font-medium">
                          <div>• 20 Pôsteres de Colorir Gigantes para Imprimir</div>
                          <div>• 20 Jogos da Memória Temáticos de Descompressão</div>
                          <div>• 30 Atividades de Resolução Guiadas de Calma</div>
                          <div>• +80 Fantoches de Dedo prontos para Recortar</div>
                        </div>
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Garantia de Satisfação de 7 dias</strong> (risco zero!)</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-stone-100 mt-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                  <div>
                    <span className="text-xs sm:text-sm text-zinc-400 line-through">De R$ 168,00 por apenas</span>
                    <div className="font-serif text-3xl sm:text-5xl font-black text-coral-dark mt-1 flex items-baseline gap-1">
                      R$ 24,90
                      <span className="text-xs font-sans font-medium text-terracotta">à vista</span>
                    </div>
                    <span className="text-xs sm:text-sm text-terracotta/80 block mt-1 font-medium">Ou em até 2x de R$ 12,82 no cartão sem complicação</span>
                  </div>

                  <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-3 py-1.5 rounded-lg border border-emerald-100 uppercase tracking-wider self-start sm:self-auto shrink-0 shadow-xs flex items-center">
                    <Check className="w-3.5 h-3.5 mr-1" /> Economia de R$ 143,10
                  </span>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => handleCheckoutOpen('complete')}
                    className="w-full py-4.5 px-6 bg-coral hover:bg-coral-dark text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider rounded-2xl transition-all shadow-lg shadow-coral/15 hover:shadow-coral/25 cursor-pointer transform active:scale-[0.99] block text-center"
                  >
                    GARANTIR O KIT COMPLETO POR R$ 24,90
                  </button>
                  <p className="text-center text-[10px] text-coral-dark font-bold flex items-center justify-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 animate-pulse" /> Oferta única válida para hoje. Aproveite esta oportunidade!
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Clean elegant recommendation banner under the grid, desktop only */}
          <div className="hidden md:flex justify-center mt-10">
            <div className="inline-flex items-center gap-2.5 bg-coral/5 text-coral-dark px-5 py-3 rounded-full border border-coral/10 text-xs shadow-xs font-medium max-w-2xl text-center">
              <span className="w-2 h-2 rounded-full bg-coral animate-ping shrink-0" />
              <span>
                <strong>Atenção recomendada:</strong> O plano completo custa somente R$ 10,00 a mais e acompanha todos os 4 bônus completos de impressão. Converte mais de 93% dos acessos!
              </span>
            </div>
          </div>

          {/* Elegant trust indicators beneath the comparison area */}
          <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-3 text-[10px] sm:text-xs text-stone-500 mt-14 border-t border-petroleo/5 pt-8 font-bold tracking-wider uppercase text-center">
            <span className="flex items-center justify-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-600" /> COMPRA 100% SEGURA</span>
            <span className="text-stone-300">|</span>
            <span className="flex items-center justify-center gap-1.5"><CreditCard className="w-4 h-4 text-emerald-600" /> PIX OU EM ATÉ 2X NO CARTÃO</span>
            <span className="hidden md:inline text-stone-300">|</span>
            <span className="flex items-center justify-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> GARANTIA INCONDICIONAL DE 7 DIAS</span>
            <span className="text-stone-300">|</span>
            <span className="flex items-center justify-center gap-1.5"><ArrowRight className="w-4 h-4 text-[#e36b3c]" /> LIBERAÇÃO IMEDIATA POR E-MAIL</span>
          </div>

        </div>
      </section>

      {/* BLOCK 12 — GARANTIA [OPTIONAL CHOSEN] */}
      <section id="garantia" className="bg-white border-y border-petroleo/10 py-16 px-4">
        <div className="max-w-4xl mx-auto w-full">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            
            {/* Stamp visual symbol */}
            <div className="shrink-0 relative">
              <div className="w-32 h-32 rounded-full border-2 border-dashed border-coral flex flex-col items-center justify-center text-center p-3 transform -rotate-12 select-none shadow-xs">
                <span className="font-serif text-3xl font-bold text-coral leading-none">7 dias</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-coral mt-1 font-sans">Garantia</span>
                <span className="text-[8px] text-stone-400 mt-1 uppercase">Incondicional</span>
              </div>
            </div>

            <div className="space-y-4 flex-1 text-center md:text-left">
              <h2 className="font-serif text-xl sm:text-3xl text-petroleo font-bold">
                Garantia incondicional de 7 dias
              </h2>
              <p className="font-sans text-xs sm:text-sm text-terracotta leading-relaxed font-light">
                Baixe o guia PDF hoje mesmo. Sinta os efeitos de testar qualquer uma das dinâmicas com seu filho no sofá essa semana. Se em até 7 dias você sentir por qualquer motivo que <strong className="text-coral-dark font-extrabold bg-coral/10 border border-coral/20 px-2 py-0.5 rounded-lg whitespace-nowrap inline-block mx-1">não foi a solução para você</strong> — sem precisar justificar nada, sem burocracia ou constrangimento — me mande um único e-mail ou mensagem e eu reembolso 100% de cada centavo pago de imediato.
              </p>
              <p className="text-xs font-semibold text-petroleo">
                O risco financeiro é totalmente meu. Você só precisa dar uma chance sincera para esse novo jeito de brincar e descansar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCK 13 — COMO É O ACESSO [OPTIONAL CHOSEN] */}
      <section id="como-recebe" className="py-20 px-4 max-w-5xl mx-auto w-full">
        <div className="text-center space-y-2 mb-12">
          <span className="text-xs bg-coral/10 text-coral-dark font-sans font-bold uppercase px-3 py-1 rounded-full">
            É SIMPLES ASSIM
          </span>
          <h2 className="font-serif text-xl sm:text-3xl md:text-4xl text-petroleo font-bold">
            Como você recebe o material após a compra
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          
          {[
            {
              number: "01",
              title: "Você finaliza a compra",
              desc: "Simule nosso checkout e pague com Pix do celular (cai em menos de 2 segundos) ou cartão de débito fictício. Tudo em ambiente seguro de testes."
            },
            {
              number: "02",
              title: "Recebe o e-mail de imediato",
              desc: "Em menos de 1 minuto em sua caixa de entrada. O login e link de acesso já vêm prontos para abrir e rolar direto pro manual."
            },
            {
              number: "03",
              title: "Baixa no celular e usa hoje",
              desc: "Abra onde e quando quiser, sem precisar instalar aplicativos chatos ou passar por cadastros pesados. Funciona até no WhatsApp."
            }
          ].map((step, idx) => (
            <div key={idx} className="bg-white border border-petroleo/10 rounded-2xl p-6 shadow-xs relative flex flex-col justify-between">
              <div className="space-y-3">
                <span className="font-serif text-4xl font-extrabold text-coral/20 block leading-none">
                  {step.number}
                </span>
                <h4 className="font-sans font-bold text-petroleo text-sm">
                  {step.title}
                </h4>
                <p className="text-xs text-terracotta leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BLOCK 14 — FAQ (Dúvidas Técnicas) */}
      <section id="faq" className="bg-creme-alt/30 border-t border-petroleo/15 py-20 px-4">
        <div className="max-w-3xl mx-auto w-full">
          <div className="text-center space-y-2 mb-10">
            <span className="text-xs bg-coral/10 text-coral-dark font-sans font-bold uppercase px-3 py-1 rounded-full">
              DÚVIDAS FREQUENTES
            </span>
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-petroleo font-bold">
              Perguntas que outras mães já fizeram
            </h2>
            <p className="font-sans text-xs text-terracotta/70 mt-1">
              Se você tiver outra dúvida técnica pendente, me envie um e-mail listado no suporte do rodapé.
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-2 mb-10">
            {FAQS.map((faq, idx) => (
              <div key={faq.id} className="bg-white border border-petroleo/10 rounded-2xl overflow-hidden transition-all">
                <button
                  onClick={() => setFaqOpen(faqOpen === faq.id ? null : faq.id)}
                  className="w-full p-4 text-left font-sans font-semibold text-xs sm:text-sm text-petroleo flex justify-between items-center bg-transparent cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <span className="text-coral-dark font-bold pl-2">
                    {faqOpen === faq.id ? '−' : '+'}
                  </span>
                </button>
                
                {faqOpen === faq.id && (
                  <div className="p-4 pt-0 border-t border-neutral-50 text-xs text-terracotta leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Final Call to Action 3 */}
          <div className="text-center space-y-3 max-w-sm mx-auto">
            <button
              onClick={() => { trackCTA3(); handleCheckoutOpen('complete'); }}
              className="w-full py-4 px-6 bg-coral hover:bg-coral-dark text-white font-sans font-bold text-sm rounded-xl transition-all cursor-pointer shadow-md shadow-coral/10 text-center uppercase tracking-wide"
            >
              QUERO COMEÇAR AGORA POR R$ 24,90
            </button>
            <p className="text-[10px] text-terracotta/60">
              Acesso imediato • Garantia de 7 dias
            </p>
          </div>
        </div>
      </section>

      {/* BLOCK 15 — RODAPÉ */}
      <footer id="rodape" className="bg-petroleo text-creme py-12 px-4 border-t border-white/5 relative z-10">
        <div className="max-w-5xl mx-auto w-full text-center space-y-4">
          <h4 className="font-serif text-base sm:text-lg font-bold">
            +120 Dinâmicas de Sofá para Mães Cansadas
          </h4>
          
          <div className="text-[11px] text-creme/60 space-y-1">
            <p>
              Suporte para Dúvidas ou Acesso: <span className="font-semibold underline text-creme">contatoconexaoemcasa@gmail.com</span>
            </p>
            <p className="pt-2 text-[10px] leading-relaxed max-w-2xl mx-auto">
              Este produto é um guia de atividades lúdicas criativas e não substitui de forma alguma o acompanhamento pediátrico médico ou psicológico profissional. Os resultados dependem de cada interação e as dinâmicas devem ser praticadas com carinho mútuo.
            </p>
            <p className="pt-4 text-[9px] text-creme/40 uppercase tracking-widest font-mono">
              Conexão Em Casa S.A. • Todos os direitos reservados © 2026
            </p>
          </div>
        </div>
      </footer>



      {/* CORE SANDBOX CHECKOUT DRAWER / MODAL */}
      <CheckoutSimulator 
        isOpen={checkoutOpen} 
        onClose={() => setCheckoutOpen(false)} 
        initialPlan={selectedPlan} 
      />

      {/* SPECIAL INTERCEPTION POPUP / MODAL AS REQUESTED */}
      <OfferInterceptionModal
        isOpen={interceptModalOpen}
        onClose={() => setInterceptModalOpen(false)}
        onAcceptUrl="https://checkout.compraseguracheckout.shop/VCCL1O8SD2HL"
        onRefuseBasicUrl="https://checkout.compraseguracheckout.shop/VCCL1O8SD2HJ"
      />

      {/* SALES PROOF NOTIFICATION POPUP */}
      <PurchaseNotification />

      {/* RECOVERY POPUP (FOR RETURNING VISITORS) */}
      <RecoveryPopup />

    </div>
  );
}
