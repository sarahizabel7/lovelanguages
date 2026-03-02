/**
 * Re-exports from the root quiz.ts module into the expected
 * `src/data/` folder structure.
 *
 * All question content (text, options, language mapping) lives in
 * quiz.ts. Import from here to keep the src/ tree self-contained.
 */
export { questions } from '../../quiz';
export type { Question, QuizAnswer, LoveLanguage } from '../../quiz';
