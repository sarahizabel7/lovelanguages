import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import styled, { keyframes } from 'styled-components';

// Core logic
import type { QuizAnswer } from '../quiz';
import { questions } from './data/questions';
import { calculateResult } from './logic/calculateResult';

// Providers + global styles
import { GlobalStyles } from './styles/GlobalStyles';
import { LanguageProvider } from './contexts/LanguageContext';

// Components
import { LanguageToggle } from './components/LanguageToggle';
import { WelcomeScreen } from './components/WelcomeScreen';
import { QuestionCard } from './components/QuestionCard';
import { ResultScreen } from './components/ResultScreen';

import type { QuizResult } from './logic/calculateResult';

type Phase = 'welcome' | 'quiz' | 'result';

interface QuizState {
  phase: Phase;
  /** 0-based index into `questions` array */
  currentQuestion: number;
  answers: QuizAnswer[];
}

type QuizAction =
  | { type: 'START' }
  | { type: 'SELECT'; questionId: number; chosen: 'A' | 'B' }
  | { type: 'NEXT' }
  | { type: 'PREV' }
  | { type: 'FINISH' }
  | { type: 'RESET' };

const STORAGE_KEY = 'll-quiz-v1';

function loadState(): QuizState {
  const INITIAL: QuizState = { phase: 'welcome', currentQuestion: 0, answers: [] };

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL;

    const parsed = JSON.parse(raw) as Partial<QuizState>;

    if (
      (parsed.phase === 'welcome' || parsed.phase === 'quiz' || parsed.phase === 'result') &&
      typeof parsed.currentQuestion === 'number' &&
      Array.isArray(parsed.answers)
    ) {
      const safeCurrent = Math.min(
        Math.max(0, parsed.currentQuestion),
        questions.length - 1,
      );
      return { ...parsed, currentQuestion: safeCurrent } as QuizState;
    }
  } catch {
  }

  return INITIAL;
}

function saveState(state: QuizState): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Quota exceeded or storage unavailable — silently ignore
  }
}

function clearState(): void {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // noop
  }
}

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'START':
      return { phase: 'quiz', currentQuestion: 0, answers: [] };

    case 'SELECT': {
      const rest = state.answers.filter((a) => a.questionId !== action.questionId);
      return {
        ...state,
        answers: [...rest, { questionId: action.questionId, chosen: action.chosen }],
      };
    }

    case 'NEXT':
      return {
        ...state,
        currentQuestion: Math.min(state.currentQuestion + 1, questions.length - 1),
      };

    case 'PREV':
      return {
        ...state,
        currentQuestion: Math.max(0, state.currentQuestion - 1),
      };

    case 'FINISH':
      return { ...state, phase: 'result' };

    case 'RESET':
      return { phase: 'welcome', currentQuestion: 0, answers: [] };

    default:
      return state;
  }
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const TransitionWrapper = styled.div`
  animation: ${fadeIn} 0.2s ease both;
  min-height: 100dvh;
`;

export default function App() {
  const [state, dispatch] = useReducer(
    quizReducer,
    undefined,
    // Lazy initialiser: runs once on mount, reads from sessionStorage
    loadState,
  );

  useEffect(() => {
    saveState(state);
  }, [state]);

  useEffect(() => {
    if (state.phase !== 'welcome') {
      window.history.pushState({ phase: state.phase }, '');
    }
  }, [state.phase]);

  useEffect(() => {
    const onPopState = () => {
      if (state.phase === 'result') {
        dispatch({ type: 'RESET' });
      } else if (state.phase === 'quiz') {
        dispatch({ type: 'RESET' });
      }
      window.history.pushState({ phase: state.phase }, '');
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [state.phase]);

  const currentQ = questions[state.currentQuestion];

  const selectedOption = useMemo<'A' | 'B' | null>(
    () =>
      state.answers.find((a) => a.questionId === currentQ?.id)?.chosen ?? null,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.answers, currentQ?.id],
  );

  const result = useMemo<QuizResult | null>(
    () => (state.phase === 'result' ? calculateResult(state.answers) : null),
    [state.phase, state.answers],
  );

  const handleStart = useCallback(() => {
    dispatch({ type: 'START' });
  }, []);

  const handleSelect = useCallback(
    (chosen: 'A' | 'B') => {
      if (!currentQ) return;
      dispatch({ type: 'SELECT', questionId: currentQ.id, chosen });
    },
    [currentQ],
  );

  const handleNext = useCallback(() => {
    if (state.currentQuestion === questions.length - 1) {
      dispatch({ type: 'FINISH' });
    } else {
      dispatch({ type: 'NEXT' });
    }
  }, [state.currentQuestion]);

  const handlePrev = useCallback(() => {
    dispatch({ type: 'PREV' });
  }, []);

  const handleRetake = useCallback(() => {
    clearState();
    dispatch({ type: 'RESET' });
  }, []);

  return (
    <LanguageProvider>
      <GlobalStyles />

      <LanguageToggle position="fixed-top-right" />

      <TransitionWrapper key={state.phase}>
        {state.phase === 'welcome' && (
          <WelcomeScreen onStart={handleStart} />
        )}

        {state.phase === 'quiz' && currentQ && (
          <QuestionCard
            question={currentQ}
            questionIndex={state.currentQuestion}
            totalQuestions={questions.length}
            selectedOption={selectedOption}
            onSelect={handleSelect}
            onNext={handleNext}
            onPrev={state.currentQuestion > 0 ? handlePrev : undefined}
          />
        )}

        {state.phase === 'result' && result && (
          <ResultScreen result={result} onRetake={handleRetake} />
        )}
      </TransitionWrapper>
    </LanguageProvider>
  );
}
