/**
 * Re-exports the result calculation algorithm from quiz.ts into
 * the expected `src/logic/` folder structure.
 *
 * Algorithm:
 *  - Score each language from 30 binary answers
 *  - Primary: language with highest score
 *  - Secondary: shown if within 2 pts of primary, or primary < 10
 *  - Never more than 2 languages returned
 */
export { calculateResult } from '../../quiz';
export type { QuizResult } from '../../quiz';
