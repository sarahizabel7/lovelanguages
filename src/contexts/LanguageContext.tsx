import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { LoveLanguage, Question } from '../../quiz';
import {
  interpolate,
  Language,
  LoveLanguageData,
  resolvePath,
  translations,
  TranslationKey,
  Translations,
} from '../i18n/translations';

export interface LocalizedQuestion {
  text: string;
  optionA: string;
  optionB: string;
}

export interface LanguageContextValue {
  /** Active language code */
  language: Language;
  /** Change the active language (persisted to localStorage) */
  setLanguage: (lang: Language) => void;
  /**
   * Translate a dot-notation key.
   * Supports {{variable}} interpolation via the params object.
   *
   * @example
   * t('ui.startButton')                            // 'Começar Quiz'
   * t('ui.questionOf', { current: 3, total: 30 }) // 'Pergunta 3 de 30'
   * t('loveLanguages.WORDS.name')                 // 'Palavras de Afirmação'
   */
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
  /**
   * Extract the localized text from a Question object.
   * Questions are bilingual by design (textPT / textEN fields in quiz.ts).
   *
   * @example
   * const { text, optionA, optionB } = tQuestion(question);
   */
  tQuestion: (question: Question) => LocalizedQuestion;
  /**
   * Convenience: get the full LoveLanguageData for a given language key.
   * Includes tips array.
   *
   * @example
   * const { name, emoji, tips } = tLang('WORDS');
   */
  tLang: (lang: LoveLanguage) => LoveLanguageData;
  /** Full typed translations object for the current language */
  translations: Translations;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

LanguageContext.displayName = 'LanguageContext';

const STORAGE_KEY = 'll-quiz-language';

function readStoredLanguage(): Language {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'pt' || stored === 'en') return stored;
  } catch {
    // SSR / localStorage unavailable
  }
  try {
    const browserLang = navigator.language?.slice(0, 2).toLowerCase();
    if (browserLang === 'en') return 'en';
  } catch {
    // noop
  }
  return 'pt';
}

interface LanguageProviderProps {
  children: React.ReactNode;
  /** Override the initial language (useful for SSR / testing) */
  defaultLanguage?: Language;
}

export function LanguageProvider({
  children,
  defaultLanguage,
}: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(
    () => defaultLanguage ?? readStoredLanguage(),
  );

  // Persist preference
  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // noop
    }
  }, []);

  // Keep <html lang> in sync for accessibility
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const currentTranslations = translations[language];

  const t = useCallback(
    (key: TranslationKey, params?: Record<string, string | number>): string => {
      const raw = resolvePath(
        currentTranslations as unknown as Record<string, unknown>,
        key,
      );
      return params ? interpolate(raw, params) : raw;
    },
    [currentTranslations],
  );

  const tQuestion = useCallback(
    (question: Question): LocalizedQuestion => {
      const isEN = language === 'en';
      return {
        text:    isEN ? question.textEN    : question.textPT,
        optionA: isEN ? question.optionA.textEN : question.optionA.textPT,
        optionB: isEN ? question.optionB.textEN : question.optionB.textPT,
      };
    },
    [language],
  );

  const tLang = useCallback(
    (lang: LoveLanguage): LoveLanguageData =>
      currentTranslations.loveLanguages[lang],
    [currentTranslations],
  );

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      t,
      tQuestion,
      tLang,
      translations: currentTranslations,
    }),
    [language, setLanguage, t, tQuestion, tLang, currentTranslations],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used inside <LanguageProvider>');
  }
  return ctx;
}
