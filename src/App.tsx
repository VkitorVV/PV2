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
      <section id="venda-imediata" className="pt-8 pb-16 md:pt-12 md:pb-24 px-4 max-w-7xl mx-auto w-full">
        {/* Top bar with micro branding (Anti-AI-slop: clean, zero fake ports or logs) */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 bg-coral/10 hover:bg-coral/15 transition-all text-coral-dark text-xs sm:text-xs font-bold leading-none px-4 py-2 rounded-full uppercase tracking-widest border border-coral/15 shadow-sm">
            <Heart size={12} className="shrink-0" /> PARA MÃES CANSADAS DE VERDADE
          </div>
        </div>

        {/* Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-4 mb-10">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-petroleo leading-tight tracking-tight font-bold">
            Brinque <span className="relative inline-block text-coral-dark font-extrabold px-1">DEITADA<span className="absolute bottom-1.5 left-0 w-full h-1 sm:h-2 bg-coral/15 -z-10 rounded"></span></span> no sofá — e ainda assim seja a mãe que ele vai lembrar pra sempre
          </h1>
          
          <p className="font-sans text-base sm:text-lg md:text-xl text-terracotta/90 leading-relaxed max-w-3xl mx-auto font-light">
            <strong className="font-semibold text-petroleo font-sans">+120 dinâmicas leves, acolhedoras e simples</strong> para criar conexão real com seu filho <span className="font-medium text-coral-dark-accent bg-coral/10 px-1 py-0.5 rounded">mesmo nos dias em que sua bateria está no 1%</span> — sem precisar pular, suar ou fingir que tem energia que você não tem.
          </p>
        </div>

        {/* Content Layout: Mockup + Core Features */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center mb-10 max-w-5xl mx-auto">
          {/* Mockup visualization (Visual tangibility) - High-end Bespoke Interactive Bundle Canvas */}
          <div className="lg:col-span-6 flex justify-center relative py-4 px-1">
            <HeroBundleMockup />
          </div>

          {/* Copy description and immediate Action */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-sage/20 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0 mt-1">✓</div>
                <p className="text-sm text-terracotta leading-relaxed">
                  O guia digital para mães que chegam em casa às 19h em colapso, e ainda assim querem <strong className="font-bold text-petroleo">tirar o filho da tela sem precisar virar a versão "mais animada" delas mesmas.</strong>
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-sage/20 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0 mt-1">✓</div>
                <p className="text-sm text-terracotta leading-relaxed">
                  Acesso imediato enviado para o seu e-mail ou WhatsApp. Rápido, fácil e vitalício. <strong className="font-bold text-petroleo">Use ainda hoje à noite.</strong>
                </p>
              </div>
            </div>

            {/* Main Call to Action 1 */}
            <div className="space-y-3 pt-2">
              <button
                id="main-cta-hero"
                onClick={() => { trackCTA1(); scrollWithId('oferta-valores'); }}
                className="w-full py-4 px-6 bg-gradient-to-r from-coral to-coral-dark hover:from-coral-dark hover:to-coral-dark text-white font-sans font-bold text-base rounded-2xl shadow-lg hover:shadow-xl hover:shadow-coral/20 transition-all cursor-pointer transform active:scale-[0.99] text-center"
              >
                QUERO BRINCAR SEM ME ESGOTAR
              </button>
              
              <div className="flex flex-col sm:flex-row justify-center items-center gap-2 text-xs text-terracotta/60 font-medium">
                <span className="flex items-center gap-1.5"><ArrowRight size={14} className="text-coral-dark" /> Acesso imediato</span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-coral-dark" /> Garantia incondicional de 7 dias</span>
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
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-petroleo font-bold">
              Veja um pedacinho do material que você vai receber na prática
            </h2>
            <p className="font-sans text-sm md:text-base text-terracotta/90 leading-relaxed max-w-lg mx-auto">
              Cada dinâmica é apresentada em 1 página visual, com: passo a passo, exemplo pronto, perguntas para estimular, variações rápidas e duração média. Sem teoria pesada. Sem enrolação.
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
        <div className="text-center space-y-2 mb-12">
          <span className="text-xs bg-sage/10 text-emerald-800 font-bold font-sans uppercase px-3 py-1 rounded-full">
            POR QUE FUNCIONA
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-petroleo font-bold">
            O que esse guia faz por você que outros guias de "atividades pra criança" não fazem
          </h2>
        </div>

        {/* Graded Benefits Grid (No long paragraphs) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "Você fica parada totalmente.",
              text: "Todas as dinâmicas foram pensadas para você gastar de 0 a 5% de sua energia física — enquanto seu filho gasta 100% da dele."
            },
            {
              title: "Tira o filho da tela em segundos.",
              text: "Você não precisa implorar ou gritar. É só puxar uma dinâmica rápida e ele larga o tablet ou celular sozinho voluntariamente."
            },
            {
              title: "Organizadas em 6 módulos prontos.",
              text: "Conexão Rápida, Crianças Agitadas, Educativas e Criativas, Afeto e Desenvolvimento Emocional, e um módulo só para crianças de 3 a 5 anos."
            },
            {
              title: "Funciona para crianças de 3 a 10 anos.",
              text: "Qualquer dinâmica vem com recomendações de adaptação por idade para que o jogo não fique bobo para o mais velho, nem difícil para o menor."
            },
            {
              title: "Zero material complicado ou caro.",
              text: "Usa o que você já tem espalhado em casa: almofadas, lençol mole, papel simples, lápis de cor ou pequenos objetos do dia a dia."
            },
            {
              title: "Cada dinâmica em 5 minutos ou menos.",
              text: "Você não precisa de horas extras de planejamento — basta abrir o PDF no celular e começar enquanto descansa o pescoço."
            },
            {
              title: "Sem bagunça absurda para arrumar.",
              text: "Nada de massinha grudada na mesa inteira ou tinta esparramada nas roupas. Você não vai dormir mais estressada do que começou."
            },
            {
              title: "No celular, na cama ou no banheiro.",
              text: "Formato digital em PDF responsivo acessível em qualquer dispositivo onde e quando você mais precisar."
            }
          ].map((bene, idx) => (
            <div key={idx} className="bg-white border border-petroleo/10 rounded-2xl p-5 shadow-sm flex gap-4 transition-all hover:border-coral/20">
              <span className="w-6 h-6 rounded-full bg-sage/20 text-emerald-800 flex items-center justify-center shrink-0 mt-1">
                <Check size={14} className="stroke-[3]" />
              </span>
              <div>
                <h4 className="font-sans font-bold text-petroleo text-sm mb-1">
                  {bene.title}
                </h4>
                <p className="text-xs text-terracotta leading-relaxed">
                  {bene.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BLOCK 04 — HEADLINE DE URGÊNCIA + BOTÃO (CTA 2) */}
      <section id="urgencia-cta" className="bg-petroleo text-creme py-16 px-4 relative overflow-hidden">
        {/* Watercolor texture inside dark container */}
        <div className="absolute inset-0 bg-coral/5 rounded-full blur-3xl -z-10"></div>
        
        <div className="max-w-4xl mx-auto w-full text-center space-y-6">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-bold max-w-2xl mx-auto leading-tight">
            Ainda hoje à noite, você pode trocar a Netflix por 30 minutos de conexão real
          </h2>
          
          <p className="font-sans text-xs sm:text-sm md:text-base text-creme/80 max-w-2xl mx-auto leading-relaxed font-light">
            Acesso liberado imediatamente após o pagamento. Pague agora, baixe no celular em 1 minuto e use hoje mesmo, jogada no sofá ou na cama, logo antes de dormir. Sem espera. Sem complicação.
          </p>

          <div className="pt-2 max-w-sm mx-auto space-y-3">
            <button
              onClick={() => { trackCTA2(); scrollWithId('oferta-valores'); }}
              className="w-full py-4 px-6 bg-coral hover:bg-coral-dark text-white font-sans font-bold text-sm rounded-xl transition-all cursor-pointer shadow-lg shadow-coral/10 hover:shadow-coral/20 transform active:scale-[0.99] text-center uppercase tracking-wider"
            >
              QUERO ACESSO IMEDIATO
            </button>
            <p className="text-[10px] text-creme/50">
              Liberação na hora • Pix ou cartão
            </p>
          </div>
        </div>
      </section>

      {/* BLOCK 05 — IDEAL PARA VOCÊ QUE… */}
      <section id="ideal-para" className="py-20 px-4 max-w-5xl mx-auto w-full">
        <div className="text-center space-y-2 mb-12">
          <span className="text-xs bg-coral/10 text-coral-dark font-sans font-bold uppercase px-3 py-1 rounded-full">
            IDEAL PARA VOCÊ QUE…
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-petroleo font-bold">
            Esse guia foi feito exatamente pra você se…
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            {
              icon: <BatteryWarning size={24} className="text-coral" />,
              title: "Chega em casa às 19h em colapso",
              desc: "Sua bateria corporal e mental encerrou por completo às 17h, mas a do seu filho pequeno só acaba às 22h. Você simplesmente não sabe de onde tirar força — e sente uma pesada culpa por isso."
            },
            {
              icon: <MonitorOff size={24} className="text-coral" />,
              title: "Sente aperto no peito quando liga a TV",
              desc: "Toda vez que vê a tela brilhando na sala com algum desenho bobo repetido, sente um nó no estômago. Você sabe que devia estar com ele, mas o corpo só pede para deitar longe dali."
            },
            {
              icon: <SmilePlus size={24} className="text-coral" />,
              title: "Não aguenta mais rolar no tapete da sala",
              desc: "Suas costas, pescoço e joelhos doem só de imaginar. Você desejava amar brincar de blocos ajoelhada no chão, mas seu corpo adulto implora por uma desculpa para ficar de pé ou deitada e quieta."
            },
            {
              icon: <Sparkles size={24} className="text-coral" />,
              title: "Quer memórias limpas com seu filho na infância",
              desc: "Você anseia lembrar do sorriso maroto dele e das conversas ingênuas, sem que haja uma luz fria de tela fria entre você e ele o tempo todo — mesmo nos piores dias de estresse de trabalho."
            }
          ].map((card, idx) => (
            <div key={idx} className="bg-white border border-petroleo/10 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-creme-warm/60 flex items-center justify-center shrink-0">
                  {card.icon}
                </div>
                <h4 className="font-sans font-bold text-petroleo text-sm leading-tight">
                  {card.title}
                </h4>
                <p className="text-xs text-terracotta leading-relaxed">
                  {card.desc}
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
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-petroleo font-bold">
              A diferença entre uma noite "normal" e uma noite com o guia
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
                  <span className="leading-relaxed">Chega em casa totalmente esgotada do serviço e o tablet da sala vira um <strong>"vilão necessário"</strong> para você respirar.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-terracotta/40 shrink-0 mt-0.5" strokeWidth={2} />
                  <span className="leading-relaxed">Tenta brincar de carrinho ajoelhada no chão áspero e o corpo grita logo com menos de 5 minutos: <strong>"chega"</strong>.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-terracotta/40 shrink-0 mt-0.5" strokeWidth={2} />
                  <span className="leading-relaxed">Vai dormir com dor no peito e culpa, repetindo no escuro do quarto: <strong>"hoje a mamãe não brincou porque trabalhou demais"</strong>.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-terracotta/40 shrink-0 mt-0.5" strokeWidth={2} />
                  <span className="leading-relaxed">Fica rolando o Instagram olhando fotos de mães modelo que brincam o dia todo e <strong>se sente uma farsa pior</strong>.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-terracotta/40 shrink-0 mt-0.5" strokeWidth={2} />
                  <span className="leading-relaxed">Alimenta o medo de que ele lembre da primeira infância como <strong>"minha mãe estava sempre exausta ou doente"</strong>.</span>
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
                  <span className="leading-relaxed">Abre o PDF no celular deitada de pijama, escolhe um jogo de 5 min e <strong>seu filho joga o celular ou tablet pra lá voluntariamente em 30 segundos</strong>.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-sage shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="leading-relaxed"><strong>Brinca deitada ou recostada de forma relaxada por 30 minutos</strong> enquanto descansa fisicamente o seu esqueleto cansado.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-sage shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="leading-relaxed">Adormece com o coração em paz e quentinho, lembrando das <strong>risadas sinceras e bobas dele</strong> minutos atrás.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-sage shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="leading-relaxed">Abençoa sua própria realidade e <strong>percebe que conexão real não exige energia absurda</strong> de animadores de buffet infantil.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-sage shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="leading-relaxed">Ele te guarda na memória afetiva dele como <strong>a melhor mãe do universo que sempre tinha uma brincadeira incrível de sofá</strong>.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCK 07 — MISSÃO E PROPÓSITO (Carta de Mãe pra Mãe) [OPTIONAL CHOSEN] */}
      <section id="missao-propósito" className="py-20 px-4 watercolor-wash-pink">
        <div className="max-w-3xl mx-auto w-full bg-white/60 border border-coral/10 rounded-3xl p-6 md:p-10 shadow-sm relative space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs bg-coral/10 text-coral-dark font-sans font-bold uppercase px-3 py-1 rounded-full">
              POR QUE ESSE GUIA EXISTE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-petroleo font-bold">
              De mãe pra mãe — uma carta antes de você decidir
            </h2>
          </div>

          {/* Letter text with proper typesetting */}
          <div className="font-sans text-base md:text-lg text-petroleo leading-relaxed md:leading-[1.7] space-y-6 font-normal">
            <p>
              Esse guia não nasceu de uma pedagoga fardada de teoria querendo te ensinar a brincar "do jeito politicamente correto".
            </p>
            <p>
              Ele nasceu na verdade de uma frase sincera que dezenas de mães já disseram (e eu mesma já confessei pra mim) — em voz baixa, sentada na tampa do vaso sanitário trancada no banheiro:
            </p>
            
            <blockquote className="border-l-4 border-coral pl-5 italic text-petroleo bg-white/40 p-5 rounded-r-xl my-6 text-[17px] md:text-lg leading-relaxed shadow-sm">
              "Gritei com ele hoje por uma total tolice. Mas a verdade é que eu nem estava brava de verdade — eu só estava no meu limite físico, eu não queria ter que rolar no tapete e não sabia como ter paz de espírito. Fui dormir me sentindo o pior ser humano na face da terra."
            </blockquote>

            <p>
              A gente necessita urgentemente parar de fantasiar que ser "uma excelente mãe de referência" exige que você tenha energia inesgotável de palhaço ou animadora de festa de condomínio às 20h da noite após vencer desafios reais de trabalho.
            </p>
            <p>
              Você de forma alguma tem que virar uma cópia barulhenta de vídeo de internet. Você só precisa de <strong className="font-bold">soluções práticas que respeitem o seu cansaço legítimo</strong> do dia.
            </p>
            <p>
              Esse manual em PDF é exatamente esse atalho. Um meio testado de você se manter presente na vida dele sendo exatamente quem você é — exausta, escorada, de moletom, e deitada no sofá da sala, e ainda ser <strong className="font-bold">a mãe maravilhosa de quem ele vai se orgulhar pra sempre</strong>.
            </p>
          </div>

          <div className="text-right pt-4 border-t border-petroleo/5">
            <span className="cursive-highlight">Feito com carinho para mães reais, em dias reais. 💛</span>
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
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-petroleo font-bold">
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
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-petroleo leading-tight">
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
            <h2 className="font-serif text-3xl sm:text-4xl text-petroleo font-bold tracking-tight">
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
                    <h4 className="font-sans font-bold text-petroleo text-sm sm:text-base leading-snug">
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
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-petroleo font-bold tracking-tight max-w-2xl mx-auto leading-tight">
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
                  <h4 className="font-serif text-2xl font-extrabold text-petroleo leading-tight">
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
                  <h4 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#312523] leading-tight mt-2.5">
                    Kit Completo + 4 Bônus
                  </h4>
                  <p className="text-sm sm:text-base text-terracotta/90 mt-1.5">O arsenal lúdico definitivo de descompressão e educação tranquila para o seu lar.</p>
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
                    <div className="font-serif text-4xl sm:text-5xl font-black text-coral-dark mt-1 flex items-baseline gap-1">
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

      {/* BLOCK 11 — PROVA SOCIAL [OPTIONAL CHOSEN] */}
      <section id="prova-social" className="py-20 px-4 max-w-5xl mx-auto w-full">
        <div className="text-center space-y-2 mb-12">
          <span className="text-xs bg-sage/10 text-emerald-800 font-bold font-sans uppercase px-3 py-1 rounded-full">
            MÃES QUE JÁ TESTARAM
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-petroleo font-bold">
            O que outras mães cansadas estão dizendo
          </h2>
        </div>

        {/* Testimonials 2-column or 3-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REVIEWS.map((review) => (
            <div key={review.id} className="bg-white border border-petroleo/10 rounded-2xl p-6 shadow-xs relative flex flex-col justify-between hover:border-coral/20">
              <div className="space-y-4">
                {/* Visual Stars */}
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: review.stars }).map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" />
                  ))}
                </div>

                <blockquote className="text-xs sm:text-sm text-petroleo leading-relaxed italic">
                  "{review.text}"
                </blockquote>
              </div>

              <div className="border-t border-neutral-100 pt-4 mt-6 flex justify-between items-center text-xs">
                <div>
                  <p className="font-semibold text-petroleo">{review.author}</p>
                  <p className="text-[11px] text-terracotta/60 mt-0.5">{review.details}</p>
                </div>
                <span className="font-serif text-[11px] font-bold text-coral-dark bg-coral/5 px-2.5 py-1 rounded">
                  Compra Confirmada
                </span>
              </div>
            </div>
          ))}
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
              <h2 className="font-serif text-2xl sm:text-3xl text-petroleo font-bold">
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
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-petroleo font-bold">
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
