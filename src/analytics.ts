/**
 * analytics.ts
 * Centraliza todos os eventos de rastreamento GA4 da landing page.
 * Usa gtag() injetado via index.html.
 */

declare function gtag(...args: unknown[]): void;

const safeGtag = (...args: unknown[]) => {
  if (typeof gtag !== 'undefined') {
    gtag(...args);
  }
};

/**
 * Redireciona para uma URL garantindo que o evento GA4 seja enviado antes.
 * Usa event_callback do gtag (máx 500ms de fallback para não travar o usuário).
 */
export const trackAndRedirect = (
  eventName: string,
  params: Record<string, string>,
  url: string
) => {
  let redirected = false;
  const doRedirect = () => {
    if (!redirected) {
      redirected = true;
      window.location.href = url;
    }
  };

  const fallback = setTimeout(doRedirect, 500);

  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, {
      ...params,
      event_callback: () => {
        clearTimeout(fallback);
        doRedirect();
      },
    });
  } else {
    clearTimeout(fallback);
    doRedirect();
  }
};

// ─────────────────────────────────────────────
// FUNIL — Pageview virtual por seção
// Dispara quando o lead chega em cada bloco
// ─────────────────────────────────────────────
export const FUNNEL_SECTIONS: Record<string, string> = {
  'venda-imediata':       '1 - HERO',
  'demonstrativo-visual': '2 - VEJA POR DENTRO',
  'beneficios':           '3 - POR QUE FUNCIONA',
  'ideal-para':           '4 - IDEAL PARA VOCÊ QUE',
  'comparativo-vida':     '5 - COMO SUA NOITE MUDA',
  'missao-propósito':     '6 - CARTA',
  'prova-social':         '7 - DEPOIMENTOS',
  'produto-principal':    '8 - O PRODUTO PRINCIPAL',
  'bonus':                '9 - BÔNUS',
  'oferta-valores':       '10 - OFERTA',
  'garantia':             '11 - GARANTIA INCONDICIONAL',
  'como-recebe':          '12 - COMO RECEBER',
  'faq':                  '13 - FAQ',
  'rodape':               '14 - RODAPÉ',
};

/** Dispara um pageview virtual quando o lead entra em uma seção do funil */
export const trackSectionView = (sectionId: string) => {
  const label = FUNNEL_SECTIONS[sectionId];
  if (!label) return;
  safeGtag('event', 'page_view', {
    page_title: label,
    page_location: `${window.location.origin}/#${sectionId}`,
    page_path: `/#${sectionId}`,
  });
  safeGtag('event', 'funil_secao', {
    event_category: 'Funil',
    event_label: label,
  });
};

// ─────────────────────────────────────────────
// CTAs — Botões que levam à seção de oferta
// Cada CTA tem event_name único para aparecer separado no GA4
// ─────────────────────────────────────────────

/** CTA 1 — Hero → scroll para oferta */
export const trackCTA1 = () => {
  safeGtag('event', 'cta_1_hero', {
    event_category: 'CTA',
    event_label: 'CTA 1 - HERO → OFERTA',
  });
};

/** CTA 2 — Seção de urgência → scroll para oferta */
export const trackCTA2 = () => {
  safeGtag('event', 'cta_2_urgencia', {
    event_category: 'CTA',
    event_label: 'CTA 2 - URGÊNCIA → OFERTA',
  });
};

/** CTA 3 — FAQ / final da página → checkout direto */
export const trackCTA3 = () => {
  safeGtag('event', 'cta_3_faq', {
    event_category: 'CTA',
    event_label: 'CTA 3 - FAQ → CHECKOUT',
  });
};

// ─────────────────────────────────────────────
// SELEÇÃO DE PLANO na seção de oferta
// ─────────────────────────────────────────────

/** Lead clicou no botão do Plano Básico (abre popup de interceptação) */
export const trackSelectBasic = () => {
  safeGtag('event', 'select_plan', {
    event_category: 'Oferta',
    event_label: 'P - BÁSICO',
  });
};

/**
 * Lead clicou no Plano Completo → redireciona pro checkout de R$24,90.
 * Usa trackAndRedirect para garantir que o evento seja enviado antes do redirect.
 */
export const trackSelectCompleteAndRedirect = (url: string) => {
  safeGtag('event', 'select_plan', {
    event_category: 'Oferta',
    event_label: 'AC - CPT',
  });
  trackAndRedirect('checkout_exit', {
    event_category: 'Checkout',
    event_label: 'CK - 24,90',
  }, url);
};

// ─────────────────────────────────────────────
// POPUP DE INTERCEPTAÇÃO (Order Bump — Básico)
// ─────────────────────────────────────────────

/** Popup de interceptação foi exibido */
export const trackInterceptPopupShow = () => {
  safeGtag('event', 'popup_show', {
    event_category: 'Popup Interceptação',
    event_label: 'POP - BÁSICO',
  });
};

/**
 * Lead aceitou o upgrade no popup → redireciona pro checkout de R$19,90.
 * Usa trackAndRedirect para garantir envio antes do redirect.
 */
export const trackInterceptAcceptAndRedirect = (url: string) => {
  safeGtag('event', 'popup_action', {
    event_category: 'Popup Interceptação',
    event_label: 'AC - PB',
  });
  trackAndRedirect('checkout_exit', {
    event_category: 'Checkout',
    event_label: 'CK - 19,90',
  }, url);
};

/** Lead fechou o popup clicando no X */
export const trackInterceptCloseX = () => {
  safeGtag('event', 'popup_action', {
    event_category: 'Popup Interceptação',
    event_label: 'RE - PB',
  });
};

/**
 * Lead recusou com "Não, obrigado..." → redireciona pro checkout de R$14,90.
 * Usa trackAndRedirect para garantir envio antes do redirect.
 */
export const trackInterceptRefuseAndRedirect = (url: string) => {
  safeGtag('event', 'popup_action', {
    event_category: 'Popup Interceptação',
    event_label: 'RE - SÓ AC BS',
  });
  trackAndRedirect('checkout_exit', {
    event_category: 'Checkout',
    event_label: 'CK - 14,90',
  }, url);
};

// ─────────────────────────────────────────────
// POPUP DE RECUPERAÇÃO (Retorno — R$17,90)
// ─────────────────────────────────────────────

/** Popup de recuperação foi exibido */
export const trackRecoveryPopupShow = () => {
  safeGtag('event', 'popup_show', {
    event_category: 'Popup Recuperação',
    event_label: 'POP - RECUP 17,90',
  });
};

/**
 * Lead aceitou a oferta de recuperação → redireciona pro checkout de R$17,90.
 * Usa trackAndRedirect para garantir envio antes do redirect.
 */
export const trackRecoveryAcceptAndRedirect = (url: string) => {
  safeGtag('event', 'popup_action', {
    event_category: 'Popup Recuperação',
    event_label: 'AC - RECUP',
  });
  trackAndRedirect('checkout_exit', {
    event_category: 'Checkout',
    event_label: 'CK - 17,90',
  }, url);
};

/** Lead fechou o popup de recuperação (X ou botão de recusa) */
export const trackRecoveryRefuse = () => {
  safeGtag('event', 'popup_action', {
    event_category: 'Popup Recuperação',
    event_label: 'RE - RECUP',
  });
};
