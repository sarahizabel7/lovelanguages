// ============================================================
// Love Languages Quiz — Core Logic
// Based on "The Five Love Languages" by Gary Chapman
// ============================================================

// ------------------------------------------------------------------
// Types
// ------------------------------------------------------------------

export type LoveLanguage = 'WORDS' | 'ACTS' | 'GIFTS' | 'TIME' | 'TOUCH';

export interface QuizOption {
  textPT: string;
  textEN: string;
  language: LoveLanguage;
}

export interface Question {
  id: number;
  textPT: string;
  textEN: string;
  optionA: QuizOption;
  optionB: QuizOption;
}

export interface QuizAnswer {
  questionId: number;
  chosen: 'A' | 'B';
}

export interface QuizResult {
  primary: LoveLanguage;
  secondary: LoveLanguage | null;
  scores: Record<LoveLanguage, number>;
}

// ------------------------------------------------------------------
// Questions
//
// Distribution: 10 language-pairs × 3 questions = 30 total
// Pairs covered (A vs B):
//   Q01–03  WORDS  vs ACTS
//   Q04–06  WORDS  vs GIFTS
//   Q07–09  WORDS  vs TIME
//   Q10–12  WORDS  vs TOUCH
//   Q13–15  ACTS   vs GIFTS
//   Q16–18  ACTS   vs TIME
//   Q19–21  ACTS   vs TOUCH
//   Q22–24  GIFTS  vs TIME
//   Q25–27  GIFTS  vs TOUCH
//   Q28–30  TIME   vs TOUCH
// ------------------------------------------------------------------

export const questions: Question[] = [
  // ── WORDS vs ACTS ────────────────────────────────────────────────
  {
    id: 1,
    textPT:
      'Depois de uma semana difícil, o que mais te faria sentir amado(a)?',
    textEN: 'After a tough week, what would make you feel most loved?',
    optionA: {
      textPT:
        'Seu parceiro(a) sentar com você e dizer o quanto te aprecia e admira.',
      textEN: 'Your partner sitting with you and saying how much they appreciate and admire you.',
      language: 'WORDS',
    },
    optionB: {
      textPT:
        'Seu parceiro(a) cuidar da casa, cozinhar ou resolver algo que estava te pesando.',
      textEN: 'Your partner handling chores, cooking dinner, or tackling something you were stressed about.',
      language: 'ACTS',
    },
  },
  {
    id: 2,
    textPT:
      'Numa amizade, o que demonstra que você realmente importa para alguém?',
    textEN: 'In a friendship, what shows you truly matter to someone?',
    optionA: {
      textPT:
        'Eles mandam mensagens frequentes com palavras de encorajamento e carinho.',
      textEN: 'They regularly send encouraging and heartfelt messages.',
      language: 'WORDS',
    },
    optionB: {
      textPT:
        'Eles aparecem para te ajudar a se mudar, consertar algo ou resolver um problema prático.',
      textEN: 'They show up to help you move, fix something, or sort out a practical problem.',
      language: 'ACTS',
    },
  },
  {
    id: 3,
    textPT:
      'Quando você conquista algo importante, o que mais te emociona receber?',
    textEN: 'When you achieve something important, what moves you the most?',
    optionA: {
      textPT:
        'Um discurso, mensagem ou carta em que alguém expressa orgulho e admiração por você.',
      textEN: 'A speech, message, or letter where someone expresses pride and admiration for you.',
      language: 'WORDS',
    },
    optionB: {
      textPT:
        'Alguém que preparou algo em seu nome — organizou um evento, cuidou dos detalhes por você.',
      textEN: 'Someone who prepared something on your behalf — organized an event, handled the details for you.',
      language: 'ACTS',
    },
  },

  // ── WORDS vs GIFTS ───────────────────────────────────────────────
  {
    id: 4,
    textPT: 'No seu aniversário, o que te faria sentir mais especial?',
    textEN: 'On your birthday, what would make you feel most special?',
    optionA: {
      textPT:
        'Palavras sinceras num cartão ou uma mensagem longa e significativa.',
      textEN: 'Sincere words in a card or a long, meaningful message.',
      language: 'WORDS',
    },
    optionB: {
      textPT:
        'Um presente cuidadosamente escolhido que mostra que a pessoa te conhece de verdade.',
      textEN: 'A thoughtfully chosen gift that shows the person truly knows you.',
      language: 'GIFTS',
    },
  },
  {
    id: 5,
    textPT:
      'Quando alguém retorna de uma viagem, o que você prefere receber?',
    textEN: 'When someone returns from a trip, what do you prefer to receive?',
    optionA: {
      textPT:
        'Uma ligação para dizer que sentiu sua falta e o que mais gosta em você.',
      textEN: 'A call saying they missed you and sharing what they love about you.',
      language: 'WORDS',
    },
    optionB: {
      textPT:
        'Algo que trouxeram de lá e escolheram pensando especificamente em você.',
      textEN: 'Something they brought back that they specifically chose with you in mind.',
      language: 'GIFTS',
    },
  },
  {
    id: 6,
    textPT:
      'Em momentos de reconciliação após um desentendimento, o que toca mais seu coração?',
    textEN: 'After a disagreement, what touches your heart the most in reconciliation?',
    optionA: {
      textPT:
        'Palavras honestas de arrependimento e afirmação de quanto você é amado(a).',
      textEN: 'Honest words of remorse and affirmation of how much you are loved.',
      language: 'WORDS',
    },
    optionB: {
      textPT:
        'Um gesto surpresa — flores, um objeto que tem significado, algo inesperado.',
      textEN: 'A surprise gesture — flowers, a meaningful object, something unexpected.',
      language: 'GIFTS',
    },
  },

  // ── WORDS vs TIME ────────────────────────────────────────────────
  {
    id: 7,
    textPT:
      'O que faz você se sentir mais conectado(a) a alguém que ama?',
    textEN: 'What makes you feel most connected to someone you love?',
    optionA: {
      textPT:
        'Conversas profundas em que a pessoa se abre, elogia e exprime o que sente por você.',
      textEN: 'Deep conversations where the person opens up, affirms, and expresses their feelings for you.',
      language: 'WORDS',
    },
    optionB: {
      textPT:
        'Momentos em que a pessoa deixa o celular de lado e dedica atenção total a você.',
      textEN: 'Moments when the person puts the phone away and gives you their complete attention.',
      language: 'TIME',
    },
  },
  {
    id: 8,
    textPT:
      'Quando você está passando por algo difícil, do que você mais precisa?',
    textEN: 'When you are going through something hard, what do you need the most?',
    optionA: {
      textPT: 'Ouvir "Eu acredito em você" e palavras de encorajamento genuíno.',
      textEN: 'Hearing "I believe in you" and genuinely encouraging words.',
      language: 'WORDS',
    },
    optionB: {
      textPT:
        'Alguém que reorganiza a agenda só para estar disponível e presente com você.',
      textEN: 'Someone who rearranges their schedule just to be available and present with you.',
      language: 'TIME',
    },
  },
  {
    id: 9,
    textPT: 'Num momento de comemoração, o que tornaria a experiência mais significativa?',
    textEN: 'In a moment of celebration, what would make the experience most meaningful?',
    optionA: {
      textPT:
        'Um brinde ou discurso em que alguém compartilha o que você representa para ele(a).',
      textEN: 'A toast or speech where someone shares what you mean to them.',
      language: 'WORDS',
    },
    optionB: {
      textPT:
        'Um passeio especial em que todos estão completamente presentes, sem distrações.',
      textEN: 'A special outing where everyone is fully present, with no distractions.',
      language: 'TIME',
    },
  },

  // ── WORDS vs TOUCH ───────────────────────────────────────────────
  {
    id: 10,
    textPT: 'Quando você está se sentindo para baixo, o que te conforta mais?',
    textEN: 'When you are feeling down, what comforts you the most?',
    optionA: {
      textPT: 'Palavras de reasseguramento de alguém que te ama.',
      textEN: 'Words of reassurance from someone who loves you.',
      language: 'WORDS',
    },
    optionB: {
      textPT: 'Um abraço longo ou alguém segurando sua mão.',
      textEN: 'A long hug or someone holding your hand.',
      language: 'TOUCH',
    },
  },
  {
    id: 11,
    textPT:
      'Num relacionamento romântico, o que sinaliza mais claramente que você é desejado(a)?',
    textEN: 'In a romantic relationship, what most clearly signals that you are desired?',
    optionA: {
      textPT:
        'Seu parceiro(a) verbalizar com frequência o quanto te ama e admira.',
      textEN: 'Your partner frequently verbalizing how much they love and admire you.',
      language: 'WORDS',
    },
    optionB: {
      textPT:
        'Toques espontâneos — uma mão no ombro, um beijo ao passar, um abraço por trás.',
      textEN: 'Spontaneous touches — a hand on the shoulder, a passing kiss, an embrace from behind.',
      language: 'TOUCH',
    },
  },
  {
    id: 12,
    textPT:
      'Ao se reencontrar com alguém querido depois de muito tempo, o que mais importa?',
    textEN: 'When reuniting with a loved one after a long time apart, what matters most?',
    optionA: {
      textPT:
        'A primeira coisa que dizem e com quanta emoção expressam o quanto sentiram sua falta.',
      textEN: 'The first thing they say and how emotionally they express how much they missed you.',
      language: 'WORDS',
    },
    optionB: {
      textPT:
        'A saudação física — o abraço, o beijo, o contato que marca o reencontro.',
      textEN: 'The physical greeting — the hug, the kiss, the touch that marks the reunion.',
      language: 'TOUCH',
    },
  },

  // ── ACTS vs GIFTS ────────────────────────────────────────────────
  {
    id: 13,
    textPT:
      'Qual gesto de um parceiro(a) ocupado(a) você valorizaria mais?',
    textEN: 'Which gesture from a busy partner would you value more?',
    optionA: {
      textPT:
        'Eles resolvem silenciosamente aquela tarefa que você adiou por semanas.',
      textEN: 'They quietly take care of that task you have been putting off for weeks.',
      language: 'ACTS',
    },
    optionB: {
      textPT:
        'Eles chegam em casa com flores ou uma pequena surpresa sem motivo especial.',
      textEN: 'They come home with flowers or a small surprise for no particular reason.',
      language: 'GIFTS',
    },
  },
  {
    id: 14,
    textPT:
      'Como você prefere que alguém demonstre que se lembrou de algo importante para você?',
    textEN: 'How do you prefer someone to show they remembered something important to you?',
    optionA: {
      textPT:
        'Tomando uma atitude relacionada a isso — planejando, organizando, facilitando.',
      textEN: 'Taking action related to it — planning, organizing, making it easier for you.',
      language: 'ACTS',
    },
    optionB: {
      textPT:
        'Trazendo algo que representa esse momento — um objeto, uma lembrança, um presente temático.',
      textEN: 'Bringing something that represents that moment — an object, a keepsake, a themed gift.',
      language: 'GIFTS',
    },
  },
  {
    id: 15,
    textPT: 'Quando você está doente, o que mais te faz sentir cuidado(a)?',
    textEN: 'When you are sick, what makes you feel most cared for?',
    optionA: {
      textPT:
        'Alguém que prepara sopa, busca o remédio e cuida de tudo sem precisar ser pedido.',
      textEN: 'Someone who makes soup, picks up medicine, and handles everything without being asked.',
      language: 'ACTS',
    },
    optionB: {
      textPT: 'Alguém que traz flores ou monta um kit de cuidados especial para você.',
      textEN: 'Someone who brings flowers or puts together a special care package for you.',
      language: 'GIFTS',
    },
  },

  // ── ACTS vs TIME ─────────────────────────────────────────────────
  {
    id: 16,
    textPT:
      'Num dia em que você está sobrecarregado(a), o que preferiria receber?',
    textEN: 'On a day when you are overwhelmed, what would you prefer to receive?',
    optionA: {
      textPT:
        'Alguém que assume suas tarefas e resolve pendências para aliviar sua carga.',
      textEN: 'Someone who takes over your tasks and resolves pending things to lighten your load.',
      language: 'ACTS',
    },
    optionB: {
      textPT: 'Alguém que senta com você, ouve tudo e simplesmente faz companhia.',
      textEN: 'Someone who sits with you, listens to everything, and simply keeps you company.',
      language: 'TIME',
    },
  },
  {
    id: 17,
    textPT: 'O que demonstra mais dedicação num relacionamento de longo prazo?',
    textEN: 'What shows more dedication in a long-term relationship?',
    optionA: {
      textPT:
        'Seu parceiro(a) que consistentemente cuida de coisas sem precisar ser lembrado(a).',
      textEN: 'Your partner who consistently takes care of things without needing to be reminded.',
      language: 'ACTS',
    },
    optionB: {
      textPT:
        'Seu parceiro(a) que reserva tempo semanal para programas exclusivos com você.',
      textEN: 'Your partner who sets aside weekly time for activities dedicated exclusively to you.',
      language: 'TIME',
    },
  },
  {
    id: 18,
    textPT: 'Qual ato de amor ficaria mais gravado na sua memória?',
    textEN: 'Which act of love would stay with you the longest?',
    optionA: {
      textPT:
        'Alguém que consertou algo que te incomodava há meses sem você pedir.',
      textEN: 'Someone who fixed something that had been bothering you for months, unprompted.',
      language: 'ACTS',
    },
    optionB: {
      textPT:
        'Alguém que planejou um dia inteiro dedicado exclusivamente a você.',
      textEN: 'Someone who planned an entire day dedicated exclusively to you.',
      language: 'TIME',
    },
  },

  // ── ACTS vs TOUCH ────────────────────────────────────────────────
  {
    id: 19,
    textPT: 'Quando você chega em casa estressado(a), o que mais precisa primeiro?',
    textEN: 'When you come home stressed, what do you need first?',
    optionA: {
      textPT:
        'Descobrir que alguém já cuidou do jantar ou organizou o ambiente para você.',
      textEN: 'To find that someone already handled dinner or organized the space for you.',
      language: 'ACTS',
    },
    optionB: {
      textPT: 'Um abraço caloroso logo na entrada.',
      textEN: 'A warm hug the moment you walk in.',
      language: 'TOUCH',
    },
  },
  {
    id: 20,
    textPT: 'Durante uma doença, o que faz você se sentir mais acompanhado(a)?',
    textEN: 'During an illness, what makes you feel most accompanied?',
    optionA: {
      textPT:
        'Alguém que atende ativamente suas necessidades — remédio, comida, conforto logístico.',
      textEN: 'Someone who actively tends to your needs — medicine, food, logistical comfort.',
      language: 'ACTS',
    },
    optionB: {
      textPT:
        'Alguém que deita do seu lado, passa a mão nas suas costas ou segura sua mão.',
      textEN: 'Someone who lies beside you, rubs your back, or holds your hand.',
      language: 'TOUCH',
    },
  },
  {
    id: 21,
    textPT:
      'No dia a dia de um relacionamento romântico, o que mantém sua sensação de conexão?',
    textEN: 'Day-to-day in a romantic relationship, what keeps you feeling connected?',
    optionA: {
      textPT:
        'Seu parceiro(a) que ajuda a navegar os desafios cotidianos sem hesitar.',
      textEN: 'Your partner who helps navigate daily challenges without hesitation.',
      language: 'ACTS',
    },
    optionB: {
      textPT:
        'Pequenos momentos físicos — mão no ombro, beijo bom-dia, toque ao passar.',
      textEN: 'Small physical moments — a hand on the shoulder, a good-morning kiss, a touch in passing.',
      language: 'TOUCH',
    },
  },

  // ── GIFTS vs TIME ────────────────────────────────────────────────
  {
    id: 22,
    textPT: 'Quando alguém quer demonstrar que te valoriza, o que significa mais?',
    textEN: 'When someone wants to show they value you, what means more?',
    optionA: {
      textPT:
        'Um presente cuidadosamente escolhido que reflete quem você é como pessoa.',
      textEN: 'A carefully chosen gift that reflects who you are as a person.',
      language: 'GIFTS',
    },
    optionB: {
      textPT: 'Uma tarde reservada exclusivamente para estar com você.',
      textEN: 'An afternoon set aside exclusively to be with you.',
      language: 'TIME',
    },
  },
  {
    id: 23,
    textPT: 'Qual surpresa te deixaria mais feliz?',
    textEN: 'Which surprise would make you happiest?',
    optionA: {
      textPT:
        'Descobrir que alguém comprou algo que você queria há tempo e nunca disse.',
      textEN: 'Finding out someone bought something you had wanted for a long time but never mentioned.',
      language: 'GIFTS',
    },
    optionB: {
      textPT:
        'Descobrir que alguém cancelou tudo na agenda para passar o dia com você.',
      textEN: 'Finding out someone cleared their entire schedule to spend the day with you.',
      language: 'TIME',
    },
  },
  {
    id: 24,
    textPT:
      'Quando você está viajando a trabalho, o que prefere receber do seu parceiro(a)?',
    textEN: 'When you are traveling for work, what do you prefer to receive from your partner?',
    optionA: {
      textPT:
        'Eles escondem um presentinho na sua mala para você encontrar durante a viagem.',
      textEN: 'They hide a small gift in your bag for you to find during the trip.',
      language: 'GIFTS',
    },
    optionB: {
      textPT: 'Eles ligam todos os dias para compartilhar o dia e estar presente mesmo à distância.',
      textEN: 'They call every day to share their day and stay present even from a distance.',
      language: 'TIME',
    },
  },

  // ── GIFTS vs TOUCH ───────────────────────────────────────────────
  {
    id: 25,
    textPT: 'Num momento de celebração com as pessoas que ama, o que mais te emociona?',
    textEN: 'In a moment of celebration with loved ones, what moves you most?',
    optionA: {
      textPT: 'Receber um presente inesperado e cheio de significado.',
      textEN: 'Receiving an unexpected and meaningful gift.',
      language: 'GIFTS',
    },
    optionB: {
      textPT: 'Ser envolvido(a) num abraço caloroso pelas pessoas que você ama.',
      textEN: 'Being wrapped in a warm embrace by the people you love.',
      language: 'TOUCH',
    },
  },
  {
    id: 26,
    textPT:
      'Como você prefere receber conforto de um amigo próximo num momento difícil?',
    textEN: 'How do you prefer to receive comfort from a close friend during a hard time?',
    optionA: {
      textPT:
        'Um kit de cuidados ou gesto atencioso enviado à sua porta.',
      textEN: 'A care package or thoughtful gesture delivered to your door.',
      language: 'GIFTS',
    },
    optionB: {
      textPT: 'Um abraço longo e caloroso quando vocês se encontram.',
      textEN: 'A long, warm hug when you see each other.',
      language: 'TOUCH',
    },
  },
  {
    id: 27,
    textPT: 'Qual gesto romântico você acharia mais tocante?',
    textEN: 'Which romantic gesture would you find most touching?',
    optionA: {
      textPT:
        'Seu parceiro(a) esconde um presente no lugar certo para você encontrar num dia difícil.',
      textEN: 'Your partner hides a gift in the right place for you to find on a hard day.',
      language: 'GIFTS',
    },
    optionB: {
      textPT:
        'Seu parceiro(a) alcança sua mão e aperta no momento exato em que você precisava.',
      textEN: 'Your partner reaches over and squeezes your hand at exactly the right moment.',
      language: 'TOUCH',
    },
  },

  // ── TIME vs TOUCH ────────────────────────────────────────────────
  {
    id: 28,
    textPT:
      'O que te faz sentir mais intimidade num relacionamento próximo?',
    textEN: 'What makes you feel most intimate in a close relationship?',
    optionA: {
      textPT:
        'Longas noites conversando, fazendo atividades juntos, completamente presentes um para o outro.',
      textEN: 'Long evenings talking, doing activities together, fully present for each other.',
      language: 'TIME',
    },
    optionB: {
      textPT:
        'Proximidade física — encostar, segurar as mãos, sentar colado(a).',
      textEN: 'Physical proximity — leaning close, holding hands, sitting right next to each other.',
      language: 'TOUCH',
    },
  },
  {
    id: 29,
    textPT: 'Durante um período difícil, o que você mais precisa do seu parceiro(a)?',
    textEN: 'During a difficult period, what do you need most from your partner?',
    optionA: {
      textPT: 'A presença e atenção total e indivisa dele(a).',
      textEN: 'Their total and undivided presence and attention.',
      language: 'TIME',
    },
    optionB: {
      textPT: 'Ser abraçado(a), tocado(a) ou ter o conforto do contato físico.',
      textEN: 'Being held, touched, or having the comfort of physical closeness.',
      language: 'TOUCH',
    },
  },
  {
    id: 30,
    textPT: 'Num domingo tranquilo, o que se parece mais com amor pra você?',
    textEN: 'On a quiet Sunday, what feels most like love to you?',
    optionA: {
      textPT:
        'Passar horas fazendo algo juntos — cozinhando, lendo, explorando um lugar novo.',
      textEN: 'Spending hours doing something together — cooking, reading, exploring somewhere new.',
      language: 'TIME',
    },
    optionB: {
      textPT:
        'Uma manhã preguiçosa com proximidade física — toque suave, abraço confortável, presença calma.',
      textEN: 'A lazy morning with physical closeness — gentle touch, comfortable embrace, calm presence.',
      language: 'TOUCH',
    },
  },
];

// ------------------------------------------------------------------
// Result Calculation
// ------------------------------------------------------------------

const THRESHOLD_PRIMARY = 10;
const THRESHOLD_TIE = 2;

export function calculateResult(answers: QuizAnswer[]): QuizResult {
  const scores: Record<LoveLanguage, number> = {
    WORDS: 0,
    ACTS: 0,
    GIFTS: 0,
    TIME: 0,
    TOUCH: 0,
  };

  for (const answer of answers) {
    const question = questions.find((q) => q.id === answer.questionId);
    if (!question) continue;

    const option = answer.chosen === 'A' ? question.optionA : question.optionB;
    scores[option.language]++;
  }

  // Sort descending by score
  const sorted = (Object.entries(scores) as [LoveLanguage, number][]).sort(
    ([, a], [, b]) => b - a,
  );

  const [primaryLang, primaryScore] = sorted[0];
  const [secondaryLang, secondaryScore] = sorted[1];

  // Show secondary if:
  //  • it is a tie, OR
  //  • it is within THRESHOLD_TIE points of the primary, OR
  //  • primary did not reach THRESHOLD_PRIMARY (no strong dominant)
  const showSecondary =
    primaryScore - secondaryScore <= THRESHOLD_TIE ||
    primaryScore < THRESHOLD_PRIMARY;

  return {
    primary: primaryLang,
    secondary: showSecondary ? secondaryLang : null,
    scores,
  };
}

// ------------------------------------------------------------------
// Metadata helpers (optional — useful for UI rendering)
// ------------------------------------------------------------------

export const loveLanguageMeta: Record<
  LoveLanguage,
  { labelPT: string; labelEN: string; descriptionPT: string; descriptionEN: string }
> = {
  WORDS: {
    labelPT: 'Palavras de Afirmação',
    labelEN: 'Words of Affirmation',
    descriptionPT:
      'Você se sente mais amado(a) quando recebe elogios, encorajamento e expressões verbais de afeto.',
    descriptionEN:
      'You feel most loved when you receive compliments, encouragement, and verbal expressions of affection.',
  },
  ACTS: {
    labelPT: 'Atos de Serviço',
    labelEN: 'Acts of Service',
    descriptionPT:
      'Você se sente mais amado(a) quando alguém alivia sua carga realizando tarefas e cuidados práticos.',
    descriptionEN:
      'You feel most loved when someone eases your burden by taking care of practical tasks.',
  },
  GIFTS: {
    labelPT: 'Receber Presentes',
    labelEN: 'Receiving Gifts',
    descriptionPT:
      'Você se sente mais amado(a) quando recebe presentes simbólicos que mostram que a pessoa pensou em você.',
    descriptionEN:
      'You feel most loved when you receive symbolic gifts that show the person was thinking of you.',
  },
  TIME: {
    labelPT: 'Tempo de Qualidade',
    labelEN: 'Quality Time',
    descriptionPT:
      'Você se sente mais amado(a) quando alguém dedica atenção total e exclusiva a você.',
    descriptionEN:
      'You feel most loved when someone gives you their complete and undivided attention.',
  },
  TOUCH: {
    labelPT: 'Toque Físico',
    labelEN: 'Physical Touch',
    descriptionPT:
      'Você se sente mais amado(a) por meio do contato físico — abraços, toque e proximidade corporal.',
    descriptionEN:
      'You feel most loved through physical contact — hugs, touch, and bodily closeness.',
  },
};
