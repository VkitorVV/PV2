import { Dinamica, Review, FAQItem, Bonus } from './types';

export const REVIEWS: Review[] = [
  {
    id: 1,
    stars: 5,
    text: "Eu chorei lendo a primeira página. Era exatamente o que eu sentia e não conseguia colocar em palavras. Testei a 'Continue a História' ontem e meu filho ficou 25 minutos brincando enquanto eu descansei DE VERDADE. Não acreditei.",
    author: "Camila R.",
    details: "Mãe do Bento (5 anos), home office"
  },
  {
    id: 2,
    stars: 5,
    text: "Pela primeira vez em meses eu não liguei a TV depois do trabalho. Fizemos a 'Mensagem Misteriosa' e ele falou: 'mamãe, hoje foi o melhor dia'. Eu não tinha pulado, suado, nem inventado nada. Só estive lá.",
    author: "Juliana M.",
    details: "2 filhos (4 e 7 anos), analista"
  },
  {
    id: 3,
    stars: 5,
    text: "Eu achava que era uma péssima mãe por sempre estar exausta. Esse guia me deu PERMISSÃO pra ser mãe de verdade — com cansaço e tudo — e ainda assim criar memórias lindas. Os R$ 24,90 mais bem gastos da minha vida.",
    author: "Patrícia L.",
    details: "Enfermeira, mãe da Alice (6 anos)"
  },
  {
    id: 4,
    stars: 5,
    text: "A 'Que Emoção É Essa?' virou ritual de antes de dormir. Meu filho de 4 anos começou a falar sobre os sentimentos dele de um jeito que eu nunca tinha visto. E eu tudo isso... deitada. Salvou minhas noites.",
    author: "Fernanda T.",
    details: "Professora, 1 filho (4 anos)"
  }
];

export const BONUSES: Bonus[] = [
  {
    id: "bonus-01",
    tag: "BÔNUS 01 • HOJE",
    name: "20 Pôsteres de Colorir Gigantes",
    description: "Imprima, estenda no chão e seu filho mergulha por horas. Você só dá os comandos do sofá.",
    mockImage: "https://i.ibb.co/20Mr8hd7/Chat-GPT-Image-30-de-mai-de-2026-13-39-48-1.webp",
    icon: "Palette"
  },
  {
    id: "bonus-02",
    tag: "BÔNUS 02 • HOJE",
    name: "30 Jogos da Memória Temáticos",
    description: "Animais, profissões, frutas, dinossauros... imprima uma vez, recorte, e tem jogo novo toda semana.",
    mockImage: "https://i.ibb.co/qLhrtLW0/Chat-GPT-Image-30-de-mai-de-2026-14-07-47-Photoroom.webp",
    icon: "Grid3X3"
  },
  {
    id: "bonus-03",
    tag: "BÔNUS 03 • HOJE",
    name: "30 Atividades de Colorir Guiadas",
    description: "Vêm com roteiro pra mãe ler sentada enquanto a criança colore. Vira história + arte ao mesmo tempo.",
    mockImage: "https://i.ibb.co/8nJzzBPB/Chat-GPT-Image-30-de-mai-de-2026-14-19-50-Photoroom.webp",
    icon: "BookOpen"
  },
  {
    id: "bonus-04",
    tag: "BÔNUS 04 • HOJE",
    name: "+80 Fantoches de Dedo para Imprimir",
    description: "Recorte, encaixe no dedo da criança e deixe ela contar histórias enquanto você assiste deitada.",
    mockImage: "https://i.ibb.co/gbXzKb25/Sem-t-tulo.webp",
    icon: "Fingerprint"
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 1,
    question: "Em quanto tempo eu recebo o material?",
    answer: "Imediatamente após a confirmação do pagamento. O Pix cai em segundos. Você recebe o link por e-mail e jah pode baixar no celular para usar ainda hoje."
  },
  {
    id: 2,
    question: "É físico ou digital?",
    answer: "100% digital (PDF). Você baixa, lê no celular ou imprime as partes que quiser. Sem frete, sem espera, sem custo extra."
  },
  {
    id: 3,
    question: "Qual a forma de pagamento?",
    answer: "Pix (com liberação imediata) ou cartão de crédito (parcelado em até 3x no plano completo). Ambiente 100% seguro."
  },
  {
    id: 4,
    question: "As dinâmicas servem pra qual idade?",
    answer: "O guia é organizado para crianças de 3 a 10 anos. Tem um módulo específico só para 3-5 anos, e 4 módulos pensados para 6-10 anos (conexão rápida, agitadas, educativas e afetivas)."
  },
  {
    id: 5,
    question: "Preciso comprar materiais especiais?",
    answer: "Não. As dinâmicas usam o que você já tem em casa: almofada, lençol, papel, lápis, objetos do dia a dia. Os bônus imprimíveis só pedem folha A4 e tesoura."
  },
  {
    id: 6,
    question: "Funciona se eu tiver mais de um filho?",
    answer: "Sim. Várias dinâmicas funcionam com 2 ou 3 crianças juntas, e algumas viram 'time deles contra a mãe deitada' — vira a brincadeira favorita."
  },
  {
    id: 7,
    question: "Tem garantia? E se eu não gostar?",
    answer: "Sim. Você tem 7 dias pra testar. Se não for pra você, devolvo seu dinheiro integralmente. Sem perguntas, sem burocracia."
  }
];

export const DINAMICAS_PREVIEWS: Dinamica[] = [
  {
    id: "historia",
    title: "Continue a História",
    emoji: "✍️",
    description: "Uma história criada em parceria com seu filho, em que ele gasta energia imaginando mundos e personagens, enquanto você apenas direciona deitada.",
    duration: "10 - 20 minutos",
    materials: "Nenhum (0 material)",
    instructions: [
      "Deitada no sofá, comece a contar uma história curta: 'Era uma vez um coelho com botas vermelhas que morava dentro de um...'",
      "Aponte para o seu filho e diga: 'sua vez! Onde ele morava? Continua!'",
      "Deixe-o contar um pedaço livremente. Quando ele parar, dê um novo gancho preguiçoso: 'E de repente, o que apareceu na frente dele?'",
      "Revezem até dar gargalhadas e chegar a um final feliz ou absurdo!"
    ],
    example: "Mãe: 'O dragão azul tentou voar, mas as asas dele eram feitas de...' Filho: 'Gelatina! E aí quando ele bateu asas ele derreteu no sol...'",
    prompts: [
      "Como o coelho escapou do castelo assombrado?",
      "O robô descobriu que sua comida favorita era..."
    ],
    variations: [
      "Para crianças menores (3-5 anos): Use bonecos ou pelúcias pequenos para encenar sem você se mover.",
      "Para os mais velhos: Adicione a regra de que não pode usar a palavra 'então' ou 'aí'."
    ],
    tags: ["Conexão Rápida", "3-10 anos", "0 Material"]
  },
  {
    id: "mao",
    title: "O Que Tem na Minha Mão?",
    emoji: "✊",
    description: "Seu filho corre pela casa em busca de um objeto misterioso para você adivinhar usando apenas pistas sensoriais, mantendo você confortável.",
    duration: "5 - 15 minutos",
    materials: "Objetos pequenos de casa",
    instructions: [
      "Peça para o seu filho esconder um pequeno objeto qualquer da casa nas mãos, de olhos bem fechados ou atrás das costas, sem deixar você ver.",
      "Ele deve voltar até você e mantê-lo bem escondido.",
      "Você, relaxada no sofá, faz perguntas de sinta e adivinha ou pede para ele te dar características: 'É mais pesado que uma uva?', 'É macio?', 'Faz algum barulho?'",
      "Se preferir, estique a mão preguiçosamente para que ele passe o objeto pelos seus dedos de olhos fechados. Advinhe o que é!"
    ],
    example: "Filho: 'É duro, cabe no meu bolso e faz barulho de metal...' Mãe (deitada): 'É a chave que o papai esqueceu na mesa?'",
    prompts: [
      "Está no quarto ou na cozinha?",
      "Tem cheiro de alguma coisa que a gente come?"
    ],
    variations: [
      "Comando de Sofá: Diga 'Quero que você ache algo macio e verde' e ele vai correndo procurar enquanto você fecha os olhos."
    ],
    tags: ["Módulo Agitados", "3-5 anos", "Interativo"]
  },
  {
    id: "palavra",
    title: "Não Pode Falar Essa Palavra!",
    emoji: "🤫",
    description: "Um jogo estimulante de perguntas e respostas rápidas em que certa palavra comum é totalmente banida, testando o autocontrole dele.",
    duration: "5 - 10 minutos",
    materials: "Disposição para bater papo",
    instructions: [
      "Deitada, de pijama ou sob o cobertor, defina uma palavra comum proibida (ex: 'NÃO', 'SIM', ou 'OK').",
      "Agora, comece a entrevistar seu filho com perguntas capciosas para fazê-lo escorregar e dizer a palavra banida.",
      "O objetivo dele é responder sem usá-la de jeito nenhum. Se ele responder 'Com certeza!' em vez de 'Sim', ele marca ponto."
    ],
    example: "Mãe: 'Você comeu todo o seu almoço hoje?' Filho: 'Comi tudo!' Mãe: 'Você gosta de Peppa Pig?' Filho: 'Eu adoro!' (escorregou com um provável 'sim')",
    prompts: [
      "Qual é o seu desenho animado favorito?",
      "Você já escovou os dentes hoje?"
    ],
    variations: [
      "Regra da Mãe Preguiçosa: A mãe também joga! Mas se a mãe errar, o filho ganha o direito de escolher a próxima almofada deitado."
    ],
    tags: ["Módulo Criativa", "6-10 anos", "Falta Bateria 1%"]
  },
  {
    id: "emocao",
    title: "Que Emoção É Essa?",
    emoji: "🎭",
    description: "Deitados juntos, tirem um tempo para falar sobre grandes sentimentos encenando caretas e gestos simples para ensinar sobre Inteligência Emocional.",
    duration: "10 minutos",
    materials: "Nenhum",
    instructions: [
      "Enquanto você descansa a cabeça numa almofada confortável, diga: 'Agora vou fazer uma careta de preguiça e você adivinha.'",
      "Chame o seu filho para fazer diferentes expressões e diga como ele acha que as pessoas resolvem esse sentimento.",
      "Aproveite para perguntar: 'Qual foi o momento do seu dia que te deixou com essa cara?'"
    ],
    example: "Mãe: 'Olha a minha cara de coelho assustado... O que te deixa assustado, filho?' Filho: 'Acho que o escuro da garagem! E você?'",
    prompts: [
      "Faz uma expressão de orgulho gigante!",
      "Como fica o nosso corpo quando estamos calmos?"
    ],
    variations: [
      "Emocionômetro: Use almofadas como termômetro. Almofada macia para calmo, tapete para bravo, cobertor para acolhido."
    ],
    tags: ["Módulo Afeto", "3-10 anos", "Desenvolvimento"]
  },
  {
    id: "mensagem",
    title: "Mensagem Misteriosa",
    emoji: "✉️",
    description: "Você ganha uma massagem de graça! O filho desenha letras ou formas nas suas costas e você tenta descobrir o enigma secreto enquanto relaxa.",
    duration: "10 - 15 minutos",
    materials: "Suas costas + o dedinho dele",
    instructions: [
      "Deite-se de bruços no sofá de forma muito confortável.",
      "Explique que suas costas viraram uma lousa mágica ou uma tela de tablet.",
      "Seu filho deve desenhar ou escrever mensagens curtas nas suas costas usando a ponta do dedo indicador bem de leve.",
      "Sinta os movimentos e tente adivinhar: 'É um círculo?', 'É a letra A?' ou 'É um coração?'"
    ],
    example: "Filho fazendo cócegas de leve: 'Adivinha o que é!' Mãe: 'Hum, subiu, desceu, risquinho no meio... É a letra A!'",
    prompts: [
      "Desenha uma estrela no céu!",
      "Escreve a primeira letra do seu nome!"
    ],
    variations: [
      "Com crianças mais velhas, jogue 'Soletrando': soletrar palavras curtas de 3 a 4 letras."
    ],
    tags: ["Conexão Rápida", "3-10 anos", "Massagem Grátis"]
  }
];
