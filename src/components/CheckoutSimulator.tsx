import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Check, Lock, CreditCard, Sparkles, ShieldCheck, 
  Copy, CheckCircle2, ArrowRight, Loader2, Download, 
  Smartphone, Mail, User, HelpCircle, BookOpen
} from 'lucide-react';
import { PurchaseState } from '../types';

interface CheckoutSimulatorProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlan: 'basic' | 'complete';
}

export default function CheckoutSimulator({ isOpen, onClose, initialPlan }: CheckoutSimulatorProps) {
  const [state, setState] = useState<PurchaseState>({
    isOpen: isOpen,
    step: 'select',
    selectedPlan: initialPlan,
    paymentMethod: 'pix',
    cardDetails: {
      number: '',
      name: '',
      expiry: '',
      cvv: ''
    },
    email: '',
    userName: ''
  });

  const [copied, setCopied] = useState(false);
  const [simulatedProgress, setSimulatedProgress] = useState(0);
  const [downloadProgress, setDownloadProgress] = useState<{[key: string]: number}>({});
  const [formErrors, setFormErrors] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      setState(prev => ({ 
        ...prev, 
        isOpen: true, 
        step: 'select', 
        selectedPlan: initialPlan,
        paymentMethod: 'pix'
      }));
      setFormErrors('');
      setSimulatedProgress(0);
    }
  }, [isOpen, initialPlan]);

  // Simulate copying the simulated Pix token
  const handleCopyPix = () => {
    setCopied(true);
    navigator.clipboard.writeText('00020126580014br.gov.bcb.pix0136dinamicasdesofa2490confirmacaoficticia053c035405.24');
    setTimeout(() => setCopied(false), 2000);
  };

  // Move to payment stage
  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.email || !state.userName) {
      setFormErrors('Por favor, digite seu nome e e-mail para receber o acesso.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(state.email)) {
      setFormErrors('Digite um e-mail válido.');
      return;
    }
    
    setFormErrors('');
    setState(prev => ({ ...prev, step: 'payment' }));
  };

  // Simulate payment processing
  const handleSimulatePayment = () => {
    if (state.paymentMethod === 'card') {
      const { number, name, expiry, cvv } = state.cardDetails;
      if (!number || !name || !expiry || !cvv) {
        setFormErrors('Por favor, preencha todos os dados do cartão fictício para simular.');
        return;
      }
    }

    setFormErrors('');
    setState(prev => ({ ...prev, step: 'processing' }));
    
    let current = 0;
    const interval = setInterval(() => {
      current += 20;
      setSimulatedProgress(current);
      if (current >= 100) {
        clearInterval(interval);
        setState(prev => ({ ...prev, step: 'success' }));
      }
    }, 400);
  };

  // Simulate downloading the resources
  const triggerDownload = (fileName: string) => {
    setDownloadProgress(prev => ({ ...prev, [fileName]: 1 }));
    let progress = 0;
    const interval = setInterval(() => {
      progress += 25;
      setDownloadProgress(prev => ({ ...prev, [fileName]: progress }));
      if (progress >= 100) {
        clearInterval(interval);
        
        // Simular o comportamento do download
        const element = document.createElement("a");
        const fileContent = `--- RECIBO DE ACESSO SIMULADO --- \nProduto: +120 Dinâmicas de Sofá (Plano ${state.selectedPlan === 'complete' ? 'Completo' : 'Básico'})\nStatus: Pago com sucesso por ${state.userName} (${state.email})\nCódigo de Transação: TX-${Math.floor(Math.random() * 900000) + 100000}\n\nObrigado por simular nossa página de vendas de alta performance! Este arquivo confirma o sucesso da integração.`;
        const file = new Blob([fileContent], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = `${fileName.toLowerCase().replace(/ /g, '_')}_Guia_Demo.txt`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      }
    }, 300);
  };

  if (!isOpen) return null;

  const PRICE = state.selectedPlan === 'complete' ? 24.90 : 14.90;

  return (
    <AnimatePresence>
      <div id="checkout-modal-overlay" className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div 
          id="checkout-modal-card"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-creme border border-petroleo/15 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="bg-petroleo p-6 text-creme flex justify-between items-center relative">
            <div>
              <span className="text-xs font-semibold tracking-wider text-coral font-sans uppercase">
                Ambiente de Compra Seguro
              </span>
              <h3 className="font-serif text-xl font-semibold mt-1">Concluir Compra</h3>
            </div>
            <button 
              id="close-checkout"
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors text-creme/80 hover:text-creme"
            >
              <X size={20} />
            </button>
            <div className="absolute bottom-0 left-0 h-[2px] bg-coral w-full"></div>
          </div>

          <div className="overflow-y-auto p-6 space-y-6 flex-1">
            
            {/* Step 1: Select Plan & User Data */}
            {state.step === 'select' && (
              <form onSubmit={handleProceedToPayment} className="space-y-6">
                <div>
                  <label className="block text-xs font-semibold uppercase text-petroleo/60 mb-2 font-sans">
                    1. Plano Escolhido
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setState(prev => ({ ...prev, selectedPlan: 'basic' }))}
                      className={`p-3 text-left rounded-xl border flex flex-col justify-between transition-all ${
                        state.selectedPlan === 'basic' 
                          ? 'bg-creme-warm/50 border-coral ring-2 ring-coral/20' 
                          : 'bg-white border-petroleo/10 hover:border-petroleo/30'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="font-semibold text-sm">Plano Básico</span>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${state.selectedPlan === 'basic' ? 'border-coral bg-coral text-white' : 'border-petroleo/20'}`}>
                          {state.selectedPlan === 'basic' && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                        </div>
                      </div>
                      <span className="text-xs text-petroleo/60 mt-1">Só o Guia Digital</span>
                      <span className="font-serif font-bold text-base mt-2 text-petroleo">R$ 14,90</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setState(prev => ({ ...prev, selectedPlan: 'complete' }))}
                      className={`p-3 text-left rounded-xl border flex flex-col justify-between transition-all relative overflow-hidden ${
                        state.selectedPlan === 'complete' 
                          ? 'bg-coral/5 border-coral ring-2 ring-coral/20' 
                          : 'bg-white border-petroleo/10 hover:border-petroleo/30'
                      }`}
                    >
                      <div className="absolute top-0 right-0 bg-coral text-white text-[9px] font-bold px-1.5 py-0.5 rounded-bl-lg">
                        MELHOR
                      </div>
                      <div className="flex items-center justify-between w-full">
                        <span className="font-semibold text-sm">Guia + Bônus</span>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${state.selectedPlan === 'complete' ? 'border-coral bg-coral text-white' : 'border-petroleo/20'}`}>
                          {state.selectedPlan === 'complete' && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                        </div>
                      </div>
                      <span className="text-xs text-petroleo/60 mt-1">Guia + 4 Bônus Exclusivos</span>
                      <span className="font-serif font-bold text-base mt-2 text-coral-dark">R$ 24,90</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-xs font-semibold uppercase text-petroleo/60 font-sans">
                    2. Seus Dados de Acesso
                  </label>
                  
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-petroleo/40">
                      <User size={16} />
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="Seu Nome Completo"
                      value={state.userName}
                      onChange={e => setState(prev => ({ ...prev, userName: e.target.value }))}
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-white border border-petroleo/10 text-petroleo font-sans placeholder-petroleo/40 focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral text-sm"
                    />
                  </div>

                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-petroleo/40">
                      <Mail size={16} />
                    </span>
                    <input
                      type="email"
                      required
                      placeholder="Seu Melhor E-mail (Enviaremos o PDF aqui)"
                      value={state.email}
                      onChange={e => setState(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-white border border-petroleo/10 text-petroleo font-sans placeholder-petroleo/40 focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral text-sm"
                    />
                  </div>
                  <span className="text-[11px] text-terracotta leading-snug flex items-start gap-1 py-1">
                    <span className="inline-block mt-0.5 text-coral font-bold">•</span>
                    O acesso ao conteúdo digital de 153 páginas é enviado imediatamente após a confirmação.
                  </span>
                </div>

                {formErrors && (
                  <div className="p-3 bg-red-50 text-red-600 rounded-lg text-xs leading-relaxed border border-red-100">
                    ⚠️ {formErrors}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 bg-coral hover:bg-coral-dark text-white font-sans font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-coral/20 group hover:translate-y-[-1px]"
                >
                  Continuar para Pagamento
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}

            {/* Step 2: Payment Simulation */}
            {state.step === 'payment' && (
              <div className="space-y-6">
                <div className="bg-creme-alt/40 p-4 rounded-xl border border-petroleo/5 flex justify-between items-center">
                  <div>
                    <span className="text-xs text-petroleo/60">Destinatário: Conexão em Casa LTDA</span>
                    <p className="font-semibold text-sm mt-0.5">
                      {state.selectedPlan === 'complete' ? 'Guia Completo + 4 Bônus' : 'Plano Básico — Só o Guia'}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-petroleo/60">Total</span>
                    <p className="font-serif font-bold text-lg text-coral-dark">R$ {PRICE.toFixed(2).replace('.', ',')}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-petroleo/60 mb-2 font-sans">
                    Escolha a Forma de Pagamento Simulada
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setState(prev => ({ ...prev, paymentMethod: 'pix' }))}
                      className={`py-3 px-4 rounded-xl border flex items-center justify-center gap-2 transition-all font-semibold text-sm ${
                        state.paymentMethod === 'pix'
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                          : 'bg-white border-petroleo/10 hover:border-petroleo/20 text-petroleo'
                      }`}
                    >
                      <Smartphone size={16} />
                      Pix (Imediato)
                    </button>

                    <button
                      type="button"
                      onClick={() => setState(prev => ({ ...prev, paymentMethod: 'card' }))}
                      className={`py-3 px-4 rounded-xl border flex items-center justify-center gap-2 transition-all font-semibold text-sm ${
                        state.paymentMethod === 'card'
                          ? 'bg-blue-50 border-blue-500 text-blue-800'
                          : 'bg-white border-petroleo/10 hover:border-petroleo/20 text-petroleo'
                      }`}
                    >
                      <CreditCard size={16} />
                      Cartão de Crédito
                    </button>
                  </div>
                </div>

                {state.paymentMethod === 'pix' ? (
                  <div className="space-y-4 text-center bg-white p-5 rounded-2xl border border-emerald-100">
                    <div className="flex flex-col items-center justify-center">
                      <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-semibold mb-3 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                        Aguardando confirmação do Pix simulado
                      </div>
                      
                      {/* Generates a stylized QR code using CSS instead of external library to keep things highly portable */}
                      <div className="w-40 h-40 bg-zinc-100 p-2 border border-zinc-200 rounded-lg flex flex-col justify-between relative mb-3">
                        <div className="grid grid-cols-4 gap-1 h-full w-full opacity-80">
                          {Array.from({ length: 16 }).map((_, i) => (
                            <div 
                              key={i} 
                              className={`rounded-xs ${
                                (i * 3 + 7) % 5 === 0 || (i % 3 === 0 && i > 4) || i === 0 || i === 3 || i === 12 || i === 15
                                  ? 'bg-petroleo' 
                                  : 'bg-white'
                              }`}
                            ></div>
                          ))}
                        </div>
                        <div className="absolute inset-0 m-auto w-10 h-10 bg-white border-2 border-emerald-500 rounded-md flex items-center justify-center font-bold text-[10px] text-emerald-600">
                          PIX
                        </div>
                      </div>

                      <p className="text-xs text-petroleo/60 max-w-xs leading-relaxed">
                        Copie a chave Pix Copie e Cole abaixo para simular o pagamento ou clique em "Importar e Confirmar".
                      </p>
                    </div>

                    <div className="flex items-center gap-2 bg-creme-alt/30 p-2 rounded-xl text-xs font-mono select-all overflow-hidden border border-petroleo/5">
                      <span className="truncate flex-1 text-left text-petroleo/70 px-2 font-mono">
                        00020126580014br.gov.bcb.pix0136dinamicasdesofa2490confirmacaoficticia
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyPix}
                        className={`p-2 rounded-lg transition-all flex items-center gap-1 shrink-0 ${
                          copied ? 'bg-emerald-100 text-emerald-700' : 'bg-coral text-white hover:bg-coral-dark'
                        }`}
                      >
                        {copied ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                        <span className="text-[10px] font-sans font-bold">{copied ? 'Copiado!' : 'Copiar'}</span>
                      </button>
                    </div>

                    <div className="pt-2 border-t border-petroleo/5 flex gap-2">
                      <button
                        type="button"
                        onClick={() => setState(prev => ({ ...prev, step: 'select' }))}
                        className="flex-1 py-2.5 border border-petroleo/10 hover:bg-neutral-50 rounded-xl text-xs font-semibold text-petroleo transition-all"
                      >
                        Voltar
                      </button>
                      
                      <button
                        type="button"
                        onClick={handleSimulatePayment}
                        className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1"
                      >
                        Simular Confirmação Pix
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 text-left">
                    <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 text-xs text-blue-800 leading-relaxed">
                      💡 <strong>Ambiente de Testes:</strong> Digite qualquer número de cartão simulado para avançar com segurança.
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-petroleo/70 mb-1">
                          Número do Cartão (Simulado)
                        </label>
                        <input
                          type="text"
                          placeholder="4444 4444 4444 4444"
                          value={state.cardDetails.number}
                          onChange={e => {
                            let value = e.target.value.replace(/\D/g, '').substring(0, 16);
                            value = value.match(/.{1,4}/g)?.join(' ') || value;
                            setState(prev => ({ ...prev, cardDetails: { ...prev.cardDetails, number: value } }));
                          }}
                          className="w-full px-3 py-2.5 rounded-xl bg-white border border-petroleo/10 text-petroleo font-mono placeholder-petroleo/30 text-sm focus:outline-none focus:border-coral"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-petroleo/70 mb-1">
                          Titular do Cartão
                        </label>
                        <input
                          type="text"
                          placeholder="MÃE DO ANO LTDA"
                          value={state.cardDetails.name}
                          onChange={e => setState(prev => ({ ...prev, cardDetails: { ...prev.cardDetails, name: e.target.value.toUpperCase() } }))}
                          className="w-full px-3 py-2.5 rounded-xl bg-white border border-petroleo/10 text-petroleo font-sans placeholder-petroleo/30 text-sm focus:outline-none focus:border-coral"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-petroleo/70 mb-1">
                            Validade
                          </label>
                          <input
                            type="text"
                            placeholder="MM/AA"
                            maxLength={5}
                            value={state.cardDetails.expiry}
                            onChange={e => {
                              let value = e.target.value.replace(/\D/g, '').substring(0, 4);
                              if (value.length > 2) {
                                value = value.substring(0, 2) + '/' + value.substring(2);
                              }
                              setState(prev => ({ ...prev, cardDetails: { ...prev.cardDetails, expiry: value } }));
                            }}
                            className="w-full px-3 py-2.5 rounded-xl bg-white border border-petroleo/10 text-petroleo font-mono placeholder-petroleo/30 text-sm text-center focus:outline-none focus:border-coral"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-petroleo/70 mb-1">
                            CVV
                          </label>
                          <input
                            type="password"
                            placeholder="123"
                            maxLength={3}
                            value={state.cardDetails.cvv}
                            onChange={e => setState(prev => ({ ...prev, cardDetails: { ...prev.cardDetails, cvv: e.target.value.replace(/\D/g, '') } }))}
                            className="w-full px-3 py-2.5 rounded-xl bg-white border border-petroleo/10 text-petroleo font-mono placeholder-petroleo/30 text-sm text-center focus:outline-none focus:border-coral"
                          />
                        </div>
                      </div>
                    </div>

                    {formErrors && (
                      <div className="p-3 bg-red-50 text-red-600 rounded-lg text-xs leading-relaxed border border-red-100">
                        ⚠️ {formErrors}
                      </div>
                    )}

                    <div className="pt-2 border-t border-petroleo/5 flex gap-2">
                      <button
                        type="button"
                        onClick={() => setState(prev => ({ ...prev, step: 'select' }))}
                        className="flex-1 py-2.5 border border-petroleo/10 hover:bg-neutral-50 rounded-xl text-sm font-semibold text-petroleo transition-all"
                      >
                        Voltar
                      </button>
                      
                      <button
                        type="button"
                        onClick={handleSimulatePayment}
                        className="flex-1 py-2.5 bg-coral hover:bg-coral-dark text-white rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-1"
                      >
                        Simular Pagar R$ {PRICE.toFixed(2).replace('.', ',')}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Processing Simulation */}
            {state.step === 'processing' && (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                <Loader2 size={40} className="text-coral animate-spin" />
                <div>
                  <h4 className="font-serif text-lg font-bold">Processando Transação</h4>
                  <p className="text-xs text-petroleo/60 mt-1">Criptografando dados e simulando repasse...</p>
                </div>
                
                <div className="w-full max-w-xs bg-petroleo/10 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-coral h-full rounded-full transition-all duration-300"
                    style={{ width: `${simulatedProgress}%` }}
                  ></div>
                </div>
                <span className="text-xs font-semibold text-coral">{simulatedProgress}%</span>
              </div>
            )}

            {/* Step 4: Success Display & Guide Downloads */}
            {state.step === 'success' && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6 py-4"
              >
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
                  <Check size={36} strokeWidth={2.5} />
                </div>

                <div>
                  <h4 className="font-serif text-2xl font-bold text-emerald-800">Parabéns, {state.userName}!</h4>
                  <p className="font-sans text-sm text-petroleo/80 font-medium mt-1">
                    Seu pagamento simulado foi confirmado e seu acesso já foi liberado!
                  </p>
                  <div className="mt-2 bg-emerald-50 text-emerald-800 inline-block px-3 py-1 rounded-full text-xs font-medium border border-emerald-100">
                    E-mail enviado para: {state.email}
                  </div>
                </div>

                <div className="bg-creme-warm/50 border border-coral/10 p-4 rounded-2xl text-left space-y-3">
                  <span className="text-[11px] font-bold text-coral uppercase tracking-wider font-sans block mb-1">
                    📚 Downloads Disponíveis Abaixo
                  </span>

                  {/* Principal Asset */}
                  <div className="p-3 bg-white border border-petroleo/5 rounded-xl flex items-center justify-between shadow-sm">
                    <div className="min-w-0 flex-1 pr-3">
                      <p className="font-semibold text-xs text-petroleo truncate flex items-center gap-1.5">
                        <BookOpen size={14} className="text-coral shrink-0" /> +120 Dinâmicas de Sofá para Mães Cansadas
                      </p>
                      <p className="text-[10px] text-zinc-400 mt-0.5">PDF • 153 páginas • Acesso Vitalício</p>
                    </div>
                    <button
                      onClick={() => triggerDownload('Guia principal +120 Dianmicas de Sofa')}
                      disabled={downloadProgress['Guia principal +120 Dianmicas de Sofa'] > 0}
                      className="p-2 bg-coral hover:bg-coral-dark text-white rounded-lg transition-all text-xs flex items-center gap-1.5 font-sans font-medium"
                    >
                      {downloadProgress['Guia principal +120 Dianmicas de Sofa'] === 100 ? (
                        <>
                          <CheckCircle2 size={14} className="text-white" />
                          Salvo
                        </>
                      ) : downloadProgress['Guia principal +120 Dianmicas de Sofa'] > 0 ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          {downloadProgress['Guia principal +120 Dianmicas de Sofa']}%
                        </>
                      ) : (
                        <>
                          <Download size={14} />
                          Baixar PDF
                        </>
                      )}
                    </button>
                  </div>

                  {/* Complete items if selected */}
                  {state.selectedPlan === 'complete' && (
                    <div className="space-y-2 pt-1 border-t border-petroleo/5">
                      <p className="text-[10px] font-semibold text-petroleo/60 uppercase">Pacote Completo de 4 Bônus Exclusivos:</p>
                      
                      {[
                        'Bônus 1 - 20 Posterese de Colorir Gigantes',
                        'Bônus 2 - 20 Jogos da Memoria Tematicos',
                        'Bônus 3 - 30 Atividades de Colorir Guiadas',
                        'Bônus 4 - +80 Fantoches de Dedo'
                      ].map((bonusName) => (
                        <div key={bonusName} className="p-2.5 bg-creme border border-teal-100 rounded-lg flex items-center justify-between">
                          <span className="text-[11px] font-medium text-petroleo/80 truncate pr-3">{bonusName}</span>
                          <button
                            onClick={() => triggerDownload(bonusName)}
                            disabled={downloadProgress[bonusName] > 0}
                            className="p-1 px-2.5 bg-sage text-white rounded-md transition-all text-[10px] flex items-center gap-1 cursor-pointer font-medium"
                          >
                            {downloadProgress[bonusName] === 100 ? (
                              <Check size={12} />
                            ) : downloadProgress[bonusName] > 0 ? (
                              <Loader2 size={10} className="animate-spin" />
                            ) : (
                              <Download size={10} />
                            )}
                            {downloadProgress[bonusName] === 100 ? 'Salvo' : 'Baixar'}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    onClick={onClose}
                    className="py-2.5 px-6 bg-petroleo hover:bg-neutral-800 text-creme rounded-xl text-xs font-semibold tracking-wide transition-all shadow-md"
                  >
                    Voltar para a Página de Vendas
                  </button>
                </div>
              </motion.div>
            )}

          </div>

          {/* Footer Security Badges */}
          <div className="bg-creme-alt/60 p-4 border-t border-petroleo/10 text-center flex flex-col items-center justify-center space-y-1 text-xs">
            <div className="flex justify-center items-center gap-2 text-petroleo/60 text-[10px] font-sans font-medium uppercase tracking-wider">
              <span className="flex items-center gap-1">
                <Lock size={12} className="text-emerald-600" />
                Seguro SSL 256-bit
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck size={12} className="text-emerald-600" />
                Garantia de 7 Dias
              </span>
            </div>
            <p className="text-[10px] text-terracotta/70 mt-1 max-w-[280px] leading-relaxed">
              Ambiente de teste certificado por Heitor Nogueira para a Conexão em Casa Ltda.
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
