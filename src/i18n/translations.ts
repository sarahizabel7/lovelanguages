import type { LoveLanguage } from '../../quiz';

export type Language = 'pt' | 'en';

export interface LoveLanguageData {
  name: string;
  emoji: string;
  /** One-line headline shown under the result card header */
  shortDescription: string;
  /** Two-sentence body copy for the result detail section */
  description: string;
  /** Tips for the person who HAS this love language — self-awareness & communication */
  tipsForMe: readonly [string, string, string, string];
  /** Tips for people who want to LOVE someone with this language — concrete partner behaviours */
  tipsForPartner: readonly [string, string, string, string];
}

export interface UIStrings {
  title: string;
  heroTitle: string;
  subtitle: string;
  introParagraph: string;
  startButton: string;
  basedOn: string;

  nextButton: string;
  prevButton: string;
  seeResultButton: string;
  retakeButton: string;
  homeButton: string;

  questionOf: string;
  progressLabel: string;
  complete: string;

  chooseOption: string;
  optionALabel: string;
  optionBLabel: string;

  resultTitle: string;
  resultSubtitle: string;
  primaryLanguageLabel: string;
  secondaryLanguageLabel: string;
  primaryBadge: string;
  secondaryBadge: string;
  scoreLabel: string;
  pointsLabel: string;
  shareButton: string;
  allScoresLabel: string;

  // ── Tips for me ─────────────────────────────────────────────────
  tipsForMe_title: string;
  tipsForMe_subtitle: string;

  // ── Partner guide ────────────────────────────────────────────────
  partnerGuide_title: string;
  partnerGuide_subtitle: string;
  partnerGuide_share_divider: string;
  partnerGuide_copy: string;
  partnerGuide_share: string;
  partnerGuide_generate: string;
  partnerGuide_copied: string;
  partnerGuide_clipboard_intro: string;    // {{language}}
  partnerGuide_clipboard_footer: string;   // {{url}}

  // ── Language toggle ──────────────────────────────────────────────
  languageToggleLabel: string;
  ptLabel: string;
  enLabel: string;

  // ── Share card ──────────────────────────────────────────────────
  shareTitle: string;
  shareText: string;         // interpolation: {{language}}
  downloadButton: string;
  copyLink: string;
  imageSaved: string;
  linkCopied: string;
  generating: string;
  tryAgain: string;
}

export interface Translations {
  ui: UIStrings;
  loveLanguages: Record<LoveLanguage, LoveLanguageData>;
}

const pt: Translations = {
  ui: {
    // Intro
    title: 'As Cinco Linguagens do Amor',
    heroTitle: 'Descubra sua Linguagem do Amor',
    subtitle: 'Descubra como você se conecta.',
    introParagraph:
      'Cada pessoa expressa e recebe amor de uma forma diferente. Este quiz, baseado na obra de Gary Chapman, revela sua linguagem primária — e como cultivá-la nos seus relacionamentos.',
    startButton: 'Começar Quiz',
    basedOn: 'Baseado no livro de Gary Chapman',

    // Navigation
    nextButton: 'Próxima',
    prevButton: 'Anterior',
    seeResultButton: 'Ver Resultado',
    retakeButton: 'Refazer Quiz',
    homeButton: 'Voltar ao início',

    // Progress
    questionOf: 'Pergunta {{current}} de {{total}}',
    progressLabel: 'Progresso',
    complete: 'Completo',

    // Option card
    chooseOption: 'Escolha a opção que mais ressoa com você',
    optionALabel: 'A',
    optionBLabel: 'B',

    // Result
    resultTitle: 'Seu resultado',
    resultSubtitle: 'Sua linguagem do amor revela como você mais se sente amado(a) e como naturalmente expressa afeto.',
    primaryLanguageLabel: 'Sua linguagem primária',
    secondaryLanguageLabel: 'Também muito presente',
    primaryBadge: 'Primária',
    secondaryBadge: 'Secundária',
    scoreLabel: 'Pontuação',
    pointsLabel: 'pts',
    shareButton: 'Compartilhar',
    allScoresLabel: 'Todas as pontuações',

    // Tips for me
    tipsForMe_title: 'Para você',
    tipsForMe_subtitle: 'Como reconhecer e comunicar sua linguagem',

    // Partner guide
    partnerGuide_title: 'Como me amar',
    partnerGuide_subtitle: 'Compartilhe com seu parceiro(a), família ou amigos próximos',
    partnerGuide_share_divider: 'Compartilhe com quem você ama',
    partnerGuide_copy: 'Copiar dicas',
    partnerGuide_share: 'Compartilhar',
    partnerGuide_generate: 'Gerar imagem',
    partnerGuide_copied: 'Copiado!',
    partnerGuide_clipboard_intro: '💕 Como me amar — {{language}}\n\nEu me sinto amado(a) quando:\n\n',
    partnerGuide_clipboard_footer: '\n\nDescubra sua linguagem em: {{url}}',

    // Language toggle
    languageToggleLabel: 'Idioma',
    ptLabel: 'PT',
    enLabel: 'EN',

    // Share card
    shareTitle: 'Minha Linguagem do Amor',
    shareText: 'Descobri que minha linguagem do amor é {{language}}! Faça o quiz também 💕',
    downloadButton: 'Baixar imagem',
    copyLink: 'Copiar link',
    imageSaved: 'Imagem salva!',
    linkCopied: 'Link copiado!',
    generating: 'Gerando...',
    tryAgain: 'Tente novamente',
  },

  loveLanguages: {
    WORDS: {
      name: 'Palavras de Afirmação',
      emoji: '💬',
      shortDescription:
        'Você se sente amado(a) por meio de palavras sinceras, elogios e encorajamento verbal.',
      description:
        'Para quem tem as Palavras de Afirmação como linguagem primária, o que é dito — e como é dito — ecoa por muito tempo. Críticas ferem fundo; palavras gentis têm o poder de renovar e restaurar.',
      tipsForMe: [
        'Diga claramente às pessoas próximas que palavras de reconhecimento significam muito para você — não presuma que elas sabem.',
        "Quando receber um elogio ou mensagem carinhosa, permita-se sentir plenamente — não minimize com 'ah, não precisava'.",
        'Guarde mensagens e bilhetes especiais que receber. Relê-los nos momentos difíceis alimenta seu tanque emocional.',
        'Identifique quais palavras específicas mais te movem: elogios de caráter, agradecimentos ou declarações de amor?',
      ],
      tipsForPartner: [
        'Deixe bilhetes inesperados — no bolso, na tela do computador, no espelho do banheiro.',
        "Diga em voz alta o que admira nessa pessoa. Seja específico: não 'você é incrível', mas 'admiro como você lida com pressão'.",
        'Envie uma mensagem de texto sem motivo, só para dizer que está pensando nela.',
        'Elogie essa pessoa na frente de outras — e deixe que ela ouça ou saiba.',
      ],
    },

    ACTS: {
      name: 'Atos de Serviço',
      emoji: '🤝',
      shortDescription:
        'Você se sente amado(a) quando alguém alivia sua carga e cuida das coisas sem que você precise pedir.',
      description:
        'Para quem fala esta linguagem, ações valem mais do que qualquer palavra. A ajuda proativa — antecipar uma necessidade antes de ela ser verbalizada — é a forma mais alta de amor.',
      tipsForMe: [
        'Comunique às pessoas próximas que ações práticas falam mais alto que palavras para você — ajuda concreta é sua forma de sentir amor.',
        'Observe quando alguém faz algo por você sem ser pedido — isso é amor em ação. Reconheça e agradeça explicitamente.',
        "Quando precisar de apoio, peça de forma específica: 'Você poderia fazer o jantar hoje?' funciona muito melhor do que esperar que a pessoa adivinhe.",
        'Identifique quais tarefas te sobrecarregam mais — compartilhar isso abertamente permite que quem te ama ajude de verdade.',
      ],
      tipsForPartner: [
        'Antecipe uma necessidade antes que ela seja dita — prepare o café, organize a mala, abasteça o carro. A proatividade é a chave.',
        'Resolva uma tarefa que essa pessoa tem adiado sem esperar ser pedido — e não mencione depois como se fosse um favor.',
        'Na semana mais difícil, assuma responsabilidades extras silenciosamente. Para ela, isso vale mais do que qualquer presente.',
        "Pergunte 'Como posso facilitar o seu dia hoje?' e cumpra o que for dito — ações concretas são a linguagem do amor dela.",
      ],
    },

    GIFTS: {
      name: 'Receber Presentes',
      emoji: '🎁',
      shortDescription:
        'Você se sente amado(a) por gestos simbólicos e presentes escolhidos com atenção e cuidado.',
      description:
        'Não é sobre preço — é sobre o pensamento por trás. Presentes são símbolos visíveis de amor; cada um conta a história de "eu pensei em você". A ausência deles pode ser sentida como descaso.',
      tipsForMe: [
        'Explique às pessoas próximas que gestos simbólicos — mesmo simples — significam que você foi lembrado(a). Isso não é materialismo, é linguagem.',
        'Quando receber um presente ou gesto, foque na intenção por trás, não no valor. A pergunta central é: a pessoa pensou em mim?',
        'Guarde os presentes com significado especial — eles são provas físicas de amor que podem reconfortá-lo(a) nos momentos vazios.',
        'Reflita sobre quais tipos de gestos te impactam mais: surpresas inesperadas, presentes ligados a memórias ou itens que você mencionou querer?',
      ],
      tipsForPartner: [
        "Traga algo pequeno de cada viagem ou experiência — um cartão postal, um doce local, qualquer coisa que diga 'pensei em você'.",
        'Guarde em segredo o que essa pessoa menciona querer e surpreenda semanas ou meses depois. A memória do gesto vale tanto quanto o item.',
        'Marque datas importantes com uma lembrança física — a ausência de um gesto nessas ocasiões é sentida como descuido.',
        'Não espere uma ocasião especial — presenteie sem motivo. Para essa pessoa, o presente sem motivo é o mais significativo de todos.',
      ],
    },

    TIME: {
      name: 'Tempo de Qualidade',
      emoji: '⏱️',
      shortDescription:
        'Você se sente amado(a) quando alguém dedica presença total e atenção indivisa a você.',
      description:
        'Atenção plena é o presente mais raro do nosso tempo. Distrações são traições sutis — quando alguém realmente para tudo para estar com você, isso se chama amor na sua forma mais pura.',
      tipsForMe: [
        'Comunique claramente que sua maior necessidade é presença real — não tempo físico, mas atenção indivisa. Explique a diferença para quem você ama.',
        "Quando se sentir ignorado(a) por distrações, nomeie isso com calma: 'Preciso de presença, não de companhia distraída' — é uma necessidade legítima.",
        'Proponha rituais de conexão: uma refeição semanal sem celular, um passeio regular — qualquer atividade que crie espaço para conversas reais.',
        'Aprenda a expressar quando você se sente solitário(a) mesmo com pessoas ao redor — sua linguagem não é sobre quantidade de tempo, é sobre qualidade.',
      ],
      tipsForPartner: [
        'Desligue o celular e dedique atenção plena durante uma refeição — para essa pessoa, isso vale mais do que horas de presença distraída.',
        'Ao conversar, mantenha contato visual, faça perguntas que aprofundam e ouça sem interromper ou oferecer soluções imediatas.',
        'Crie um ritual semanal só para vocês dois — sem outros planos, sem telas. A consistência cria a segurança que essa pessoa precisa.',
        'Uma hora de presença total vale mais do que um dia inteiro de companhia distraída — qualidade sempre vence quantidade para ela.',
      ],
    },

    TOUCH: {
      name: 'Toque Físico',
      emoji: '🤗',
      shortDescription:
        'Você se sente amado(a) por meio do toque físico, da proximidade e do contato corporal.',
      description:
        'O corpo comunica o que as palavras não alcançam. Para quem fala esta linguagem, um abraço no momento exato diz mais do que qualquer discurso — e a ausência de toque pode ser profundamente dolorosa.',
      tipsForMe: [
        'Compartilhe com as pessoas próximas que toque físico é como você sente amor — muitas pessoas simplesmente não sabem a diferença que um abraço faz.',
        'Observe como você se sente quando há ausência de toque por vários dias: irritabilidade, distância emocional, solidão. Esses são sinais da sua linguagem.',
        'Expresse quando precisar de um abraço ou de proximidade física — pedir não diminui o significado; ao contrário, torna o gesto mais intencional.',
        'Reconheça também os pequenos toques do dia a dia: uma mão no ombro, um beijo rápido, sentar próximo. Eles alimentam seu tanque emocional continuamente.',
      ],
      tipsForPartner: [
        "Chegue com um abraço longo e presente — não o abraço rápido de passagem, mas um que diga 'estou aqui, com você'.",
        'Toque os pequenos momentos do dia: mão no ombro ao passar, beijo ao sair de casa, pé encostado no sofá enquanto assistem TV.',
        'Nos momentos difíceis, não tente consertar nada com palavras — apenas segure essa pessoa. O contato físico é a linguagem do consolo dela.',
        'Um toque com atenção plena — olhar, pausar, tocar — comunica muito mais do que o mesmo gesto feito distraidamente.',
      ],
    },
  },
};

const en: Translations = {
  ui: {
    // Intro
    title: 'The Five Love Languages',
    heroTitle: 'Discover Your Love Language',
    subtitle: 'Discover how you connect.',
    introParagraph:
      "Every person expresses and receives love in a different way. This quiz, based on Gary Chapman's work, reveals your primary language — and how to nurture it in your relationships.",
    startButton: 'Start Quiz',
    basedOn: 'Based on the book by Gary Chapman',

    // Navigation
    nextButton: 'Next',
    prevButton: 'Back',
    seeResultButton: 'See Result',
    retakeButton: 'Retake Quiz',
    homeButton: 'Back to home',

    // Progress
    questionOf: 'Question {{current}} of {{total}}',
    progressLabel: 'Progress',
    complete: 'Complete',

    // Option card
    chooseOption: 'Choose the option that resonates most with you',
    optionALabel: 'A',
    optionBLabel: 'B',

    // Result
    resultTitle: 'Your result',
    resultSubtitle: 'Your love language reveals how you most feel loved — and how you naturally express affection.',
    primaryLanguageLabel: 'Your primary language',
    secondaryLanguageLabel: 'Also strongly present',
    primaryBadge: 'Primary',
    secondaryBadge: 'Secondary',
    scoreLabel: 'Score',
    pointsLabel: 'pts',
    shareButton: 'Share',
    allScoresLabel: 'All scores',

    // Tips for me
    tipsForMe_title: 'For you',
    tipsForMe_subtitle: 'How to recognise and communicate your language',

    // Partner guide
    partnerGuide_title: 'How to love me',
    partnerGuide_subtitle: 'Share this with your partner, family, or close friends',
    partnerGuide_share_divider: 'Share with someone you love',
    partnerGuide_copy: 'Copy tips',
    partnerGuide_share: 'Share',
    partnerGuide_generate: 'Save image',
    partnerGuide_copied: 'Copied!',
    partnerGuide_clipboard_intro: '💕 How to love me — {{language}}\n\nI feel loved when:\n\n',
    partnerGuide_clipboard_footer: '\n\nDiscover yours at: {{url}}',

    // Language toggle
    languageToggleLabel: 'Language',
    ptLabel: 'PT',
    enLabel: 'EN',

    // Share card
    shareTitle: 'My Love Language',
    shareText: 'I discovered my love language is {{language}}! Take the quiz too 💕',
    downloadButton: 'Download image',
    copyLink: 'Copy link',
    imageSaved: 'Image saved!',
    linkCopied: 'Link copied!',
    generating: 'Generating...',
    tryAgain: 'Try again',
  },

  loveLanguages: {
    WORDS: {
      name: 'Words of Affirmation',
      emoji: '💬',
      shortDescription:
        'You feel most loved through sincere words, compliments, and verbal encouragement.',
      description:
        "For those whose primary language is Words of Affirmation, what is said — and how it's said — echoes for a long time. Harsh words wound deeply; kind, specific words have the power to renew and restore.",
      tipsForMe: [
        "Tell the people close to you that words of recognition matter deeply — don't assume they already know.",
        "When you receive a compliment or kind message, let yourself feel it fully — don't brush it off with 'oh, you didn't have to'.",
        'Save special messages and notes you receive. Re-reading them in hard moments refills your emotional tank.',
        'Identify which words move you most: character compliments, expressions of gratitude, or declarations of love?',
      ],
      tipsForPartner: [
        'Leave unexpected notes — in their pocket, on their laptop screen, on the bathroom mirror.',
        "Say out loud what you admire about them. Be specific: not 'you're amazing', but 'I admire how you handle pressure'.",
        'Send a text for no reason — just to say you\'re thinking of them.',
        'Praise this person to others — and let them hear or know about it.',
      ],
    },

    ACTS: {
      name: 'Acts of Service',
      emoji: '🤝',
      shortDescription:
        'You feel most loved when someone eases your burden and takes care of things without being asked.',
      description:
        "For those who speak this language, actions speak louder than any word. Proactive help — anticipating a need before it's spoken — is the highest form of love.",
      tipsForMe: [
        "Let the people close to you know that practical actions speak louder than words — concrete help is how you feel loved.",
        "Notice when someone does something for you without being asked — that's love in action. Acknowledge and thank them explicitly.",
        "When you need support, ask specifically: 'Could you make dinner tonight?' works far better than waiting for someone to guess.",
        'Identify which tasks overwhelm you most — sharing this openly lets the people who love you actually help.',
      ],
      tipsForPartner: [
        'Anticipate a need before it\'s spoken — make the coffee, pack the bag, fill the tank. Proactivity is the key.',
        "Handle a task they've been putting off without waiting to be asked — and don't bring it up afterward as if it were a favour.",
        'During their hardest week, quietly take on extra responsibilities. For this person, that matters more than any gift.',
        "Ask 'How can I make your day easier today?' and follow through — concrete action is their love language.",
      ],
    },

    GIFTS: {
      name: 'Receiving Gifts',
      emoji: '🎁',
      shortDescription:
        'You feel most loved through thoughtful, symbolic gestures and carefully chosen gifts.',
      description:
        `It's not about the price — it's about the thought behind it. Gifts are visible symbols of love; each one tells the story of "I was thinking of you." Their absence can feel like indifference.`,
      tipsForMe: [
        "Explain to the people close to you that symbolic gestures — even simple ones — mean you were thought of. This isn't materialism; it's language.",
        'When you receive a gift or gesture, focus on the intention behind it, not the value. The central question is: did this person think of me?',
        'Keep gifts with special meaning — they are physical proof of love that can comfort you in empty moments.',
        'Reflect on which types of gestures impact you most: unexpected surprises, gifts tied to memories, or items you mentioned wanting?',
      ],
      tipsForPartner: [
        "Bring something small from every trip — a postcard, a local treat, anything that says 'I thought of you'.",
        'Secretly note what they mention wanting and surprise them weeks or months later. The memory of the gesture matters as much as the item.',
        'Mark important dates with a physical keepsake — the absence of a gesture on those occasions is felt as carelessness.',
        'Don\'t wait for a special occasion — give for no reason at all. For this person, the unreasoned gift is the most meaningful of all.',
      ],
    },

    TIME: {
      name: 'Quality Time',
      emoji: '⏱️',
      shortDescription:
        'You feel most loved when someone gives you their complete presence and undivided attention.',
      description:
        'Full attention is the rarest gift of our time. Distractions feel like subtle betrayals — when someone truly stops everything to be with you, that is love in its purest form.',
      tipsForMe: [
        "Communicate clearly that your greatest need is real presence — not physical time, but undivided attention. Explain the difference to the people you love.",
        "When you feel overlooked by distractions, name it calmly: 'I need presence, not distracted company' — it's a legitimate need.",
        'Propose connection rituals: a screen-free weekly meal, a regular walk — any activity that creates space for real conversation.',
        "Learn to express when you feel lonely even around people — your language is not about quantity of time, it's about quality.",
      ],
      tipsForPartner: [
        'Put your phone away and give full attention during a meal — for this person, that is worth more than hours of distracted presence.',
        'When talking, keep eye contact, ask questions that go deeper, and listen without interrupting or jumping to solutions.',
        'Create a weekly ritual just for the two of you — no other plans, no screens. Consistency builds the security this person needs.',
        'One hour of complete presence is worth more than a full day of distracted company — quality always beats quantity for them.',
      ],
    },

    TOUCH: {
      name: 'Physical Touch',
      emoji: '🤗',
      shortDescription:
        'You feel most loved through physical touch, closeness, and bodily contact.',
      description:
        'The body communicates what words cannot reach. For those who speak this language, a hug at exactly the right moment says more than any speech — and the absence of touch can be deeply painful.',
      tipsForMe: [
        "Share with the people close to you that physical touch is how you feel love — many people simply don't know what a difference a hug makes.",
        'Notice how you feel when touch is absent for several days: irritability, emotional distance, loneliness. These are signals from your language.',
        "Express when you need a hug or physical closeness — asking doesn't diminish the meaning; it actually makes the gesture more intentional.",
        'Acknowledge the small daily touches too: a hand on the shoulder, a quick kiss, sitting close. They continuously refill your emotional tank.',
      ],
      tipsForPartner: [
        "Greet them with a long, present hug — not the quick passing one, but one that says 'I'm here, with you'.",
        'Touch the small moments of the day: hand on the shoulder as you pass, a kiss goodbye, foot against theirs on the couch.',
        "In their difficult moments, don't try to fix anything with words — just hold them. Physical contact is their language of comfort.",
        'A touch with full attention — eye contact, pause, touch — communicates far more than the same gesture done distractedly.',
      ],
    },
  },
};

export const translations: Record<Language, Translations> = { pt, en };

type StringLeaves<T, Path extends string = ''> =
  T extends string
    ? Path
    : T extends ReadonlyArray<unknown>
    ? never
    : T extends object
    ? {
        [K in keyof T & string]: StringLeaves<
          T[K],
          Path extends '' ? K : `${Path}.${K}`
        >;
      }[keyof T & string]
    : never;

export type TranslationKey = StringLeaves<typeof pt>;

// ------------------------------------------------------------------
// Runtime path resolver (supports {{variable}} interpolation)
// ------------------------------------------------------------------

export function resolvePath(
  obj: Record<string, unknown>,
  path: string,
): string {
  const value = path
    .split('.')
    .reduce<unknown>((acc, key) => {
      if (acc && typeof acc === 'object') {
        return (acc as Record<string, unknown>)[key];
      }
      return undefined;
    }, obj);

  return typeof value === 'string' ? value : path;
}

export function interpolate(
  template: string,
  params: Record<string, string | number>,
): string {
  return Object.entries(params).reduce(
    (str, [key, val]) => str.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), String(val)),
    template,
  );
}
