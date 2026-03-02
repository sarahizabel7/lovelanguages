import type { LoveLanguage } from '../../quiz';

export type Language = 'pt' | 'en';

export interface LoveLanguageData {
  name: string;
  emoji: string;
  /** One-line headline shown under the result card header */
  shortDescription: string;
  /** Two-sentence body copy for the result detail section */
  description: string;
  /** Exactly three actionable tips */
  tips: readonly [string, string, string];
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
  practicalTipsLabel: string;
  primaryBadge: string;
  secondaryBadge: string;
  scoreLabel: string;
  pointsLabel: string;
  shareButton: string;
  allScoresLabel: string;

  languageToggleLabel: string;
  ptLabel: string;
  enLabel: string;
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
    practicalTipsLabel: 'Dicas práticas',
    primaryBadge: 'Primária',
    secondaryBadge: 'Secundária',
    scoreLabel: 'Pontuação',
    pointsLabel: 'pts',
    shareButton: 'Compartilhar',
    allScoresLabel: 'Todas as pontuações',

    // Language toggle
    languageToggleLabel: 'Idioma',
    ptLabel: 'PT',
    enLabel: 'EN',
  },

  loveLanguages: {
    WORDS: {
      name: 'Palavras de Afirmação',
      emoji: '💬',
      shortDescription:
        'Você se sente amado(a) por meio de palavras sinceras, elogios e encorajamento verbal.',
      description:
        'Para quem tem as Palavras de Afirmação como linguagem primária, o que é dito — e como é dito — ecoa por muito tempo. Críticas ferem fundo; palavras gentis têm o poder de renovar e restaurar.',
      tips: [
        'Seja específico(a): não apenas "te amo", mas o que você admira, hoje, nessa pessoa.',
        'Deixe um bilhete manuscrito onde ela vai encontrar — na bolsa, no espelho, na geladeira.',
        'Reconheça conquistas em voz alta, na hora — não espere o momento "certo".',
      ],
    },

    ACTS: {
      name: 'Atos de Serviço',
      emoji: '🤝',
      shortDescription:
        'Você se sente amado(a) quando alguém alivia sua carga e cuida das coisas sem que você precise pedir.',
      description:
        'Para quem fala esta linguagem, ações valem mais do que qualquer palavra. A ajuda proativa — antecipar uma necessidade antes de ela ser verbalizada — é a forma mais alta de amor.',
      tips: [
        'Resolva uma tarefa que ele(a) tem adiado sem esperar ser pedido(a) — e sem comentar depois.',
        'Antecipe: prepare o café, organize a mala, abasteça o carro — antes de precisar.',
        'Na semana mais difícil, assuma responsabilidades extras sem fazer disso um favor.',
      ],
    },

    GIFTS: {
      name: 'Receber Presentes',
      emoji: '🎁',
      shortDescription:
        'Você se sente amado(a) por gestos simbólicos e presentes escolhidos com atenção e cuidado.',
      description:
        'Não é sobre preço — é sobre o pensamento por trás. Presentes são símbolos visíveis de amor; cada um conta a história de "eu pensei em você". A ausência deles pode ser sentida como descaso.',
      tips: [
        'Traga algo pequeno de cada viagem — o valor está no gesto, não no custo.',
        'Guarde em segredo o que ele(a) menciona querer e surpreenda meses depois.',
        'Celebre marcos com uma lembrança física: algo que dure além do momento.',
      ],
    },

    TIME: {
      name: 'Tempo de Qualidade',
      emoji: '⏱️',
      shortDescription:
        'Você se sente amado(a) quando alguém dedica presença total e atenção indivisa a você.',
      description:
        'Atenção plena é o presente mais raro do nosso tempo. Distrações são traições sutis — quando alguém realmente para tudo para estar com você, isso se chama amor na sua forma mais pura.',
      tips: [
        'Crie um ritual semanal sem telas: uma refeição, um passeio, um jogo de tabuleiro.',
        'Ao conversar, olhe nos olhos, faça perguntas que aprofundam e ouça sem interromper.',
        'Esteja presente de corpo e mente — celular no bolso, mente no momento.',
      ],
    },

    TOUCH: {
      name: 'Toque Físico',
      emoji: '🤗',
      shortDescription:
        'Você se sente amado(a) por meio do toque físico, da proximidade e do contato corporal.',
      description:
        'O corpo comunica o que as palavras não alcançam. Para quem fala esta linguagem, um abraço no momento exato diz mais do que qualquer discurso — e a ausência de toque pode ser profundamente dolorosa.',
      tips: [
        'Cumprimente com um abraço longo e presente — não o abraço rápido de passagem.',
        'Toque os pequenos momentos do dia: mão no ombro, beijo ao sair, pé encostado no sofá.',
        'Nos momentos difíceis, não tente consertar nada — apenas segure.',
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
    practicalTipsLabel: 'Practical tips',
    primaryBadge: 'Primary',
    secondaryBadge: 'Secondary',
    scoreLabel: 'Score',
    pointsLabel: 'pts',
    shareButton: 'Share',
    allScoresLabel: 'All scores',

    // Language toggle
    languageToggleLabel: 'Language',
    ptLabel: 'PT',
    enLabel: 'EN',
  },

  loveLanguages: {
    WORDS: {
      name: 'Words of Affirmation',
      emoji: '💬',
      shortDescription:
        'You feel most loved through sincere words, compliments, and verbal encouragement.',
      description:
        "For those whose primary language is Words of Affirmation, what is said — and how it's said — echoes for a long time. Harsh words wound deeply; kind, specific words have the power to renew and restore.",
      tips: [
        'Be specific: not just "I love you", but what you admire about them, today, in this moment.',
        "Leave a handwritten note where they'll find it — in their bag, on the mirror, on the fridge.",
        `Acknowledge achievements out loud, in the moment — don't wait for the "right" time.`,
      ],
    },

    ACTS: {
      name: 'Acts of Service',
      emoji: '🤝',
      shortDescription:
        'You feel most loved when someone eases your burden and takes care of things without being asked.',
      description:
        "For those who speak this language, actions speak louder than any word. Proactive help — anticipating a need before it's spoken — is the highest form of love.",
      tips: [
        "Handle a task they've been putting off without waiting to be asked — and don't mention it after.",
        'Anticipate: make the coffee, pack the bag, fill the gas tank — before they need it.',
        'During their hardest week, take on extra responsibilities without making it a favour.',
      ],
    },

    GIFTS: {
      name: 'Receiving Gifts',
      emoji: '🎁',
      shortDescription:
        'You feel most loved through thoughtful, symbolic gestures and carefully chosen gifts.',
      description:
        `It's not about the price — it's about the thought behind it. Gifts are visible symbols of love; each one tells the story of "I was thinking of you." Their absence can feel like indifference.`,
      tips: [
        'Bring something small from every trip — the value is in the gesture, not the cost.',
        'Secretly note what they mention wanting and surprise them months later.',
        'Mark milestones with a physical keepsake: something that outlasts the moment.',
      ],
    },

    TIME: {
      name: 'Quality Time',
      emoji: '⏱️',
      shortDescription:
        'You feel most loved when someone gives you their complete presence and undivided attention.',
      description:
        'Full attention is the rarest gift of our time. Distractions feel like subtle betrayals — when someone truly stops everything to be with you, that is love in its purest form.',
      tips: [
        'Create a weekly screen-free ritual: a meal, a walk, a board game.',
        'When talking, hold eye contact, ask questions that go deeper, and listen without interrupting.',
        'Be present in body and mind — phone in your pocket, mind in the moment.',
      ],
    },

    TOUCH: {
      name: 'Physical Touch',
      emoji: '🤗',
      shortDescription:
        'You feel most loved through physical touch, closeness, and bodily contact.',
      description:
        'The body communicates what words cannot reach. For those who speak this language, a hug at exactly the right moment says more than any speech — and the absence of touch can be deeply painful.',
      tips: [
        'Greet with a long, present hug — not the quick passing one.',
        'Touch the small moments of the day: hand on the shoulder, kiss goodbye, foot against theirs on the couch.',
        "In hard moments, don't try to fix anything — just hold them.",
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
