import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import type { Question } from '../../quiz';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/Button';
import { ProgressBar } from './ui/ProgressBar';
import {
  animation,
  borderRadius,
  colors,
  mq,
  shadows,
  spacing,
  typography,
} from '../styles/theme';

type SlideDirection = 'left' | 'right';
type Phase = 'entering' | 'idle' | 'exiting';

export interface QuestionCardProps {
  question: Question;
  /** 0-based index */
  questionIndex: number;
  totalQuestions: number;
  selectedOption: 'A' | 'B' | null;
  onSelect: (option: 'A' | 'B') => void;
  /** Called after exit animation completes — parent should advance index */
  onNext: () => void;
  /** Called after exit animation completes — parent should go back */
  onPrev?: () => void;
}

const slideInRight = keyframes`
  from { opacity: 0; transform: translateX(48px); }
  to   { opacity: 1; transform: translateX(0); }
`;

const slideInLeft = keyframes`
  from { opacity: 0; transform: translateX(-48px); }
  to   { opacity: 1; transform: translateX(0); }
`;

const slideOutLeft = keyframes`
  from { opacity: 1; transform: translateX(0); }
  to   { opacity: 0; transform: translateX(-48px); }
`;

const slideOutRight = keyframes`
  from { opacity: 1; transform: translateX(0); }
  to   { opacity: 0; transform: translateX(48px); }
`;

const checkIn = keyframes`
  from { transform: scale(0) rotate(-20deg); opacity: 0; }
  to   { transform: scale(1) rotate(0deg);  opacity: 1; }
`;

const buttonReveal = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const ENTER_DURATION_MS = 420;
const EXIT_DURATION_MS = 280;

const Screen = styled.div`
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: calc(${spacing[5]} + 56px) ${spacing[4]} ${spacing[10]};
  background: var(--color-bg);

  ${mq.sm} {
    padding: calc(${spacing[8]} + 56px) ${spacing[6]} ${spacing[12]};
  }

  ${mq.md} {
    padding: calc(${spacing[10]} + 56px) ${spacing[8]} ${spacing[16]};
  }
`;

const ProgressWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  margin-bottom: ${spacing[8]};

  ${mq.md} {
    margin-bottom: ${spacing[12]};
  }
`;

const SlideContainer = styled.div`
  width: 100%;
  max-width: 600px;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Slide = styled.div<{
  $phase: Phase;
  $enterDir: SlideDirection;
  $exitDir: SlideDirection;
}>`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${spacing[6]};

  ${({ $phase, $enterDir, $exitDir }) => {
    if ($phase === 'entering') {
      const anim = $enterDir === 'right' ? slideInRight : slideInLeft;
      return css`
        animation: ${anim} ${ENTER_DURATION_MS}ms ${animation.easings.smooth} both;
      `;
    }
    if ($phase === 'exiting') {
      const anim = $exitDir === 'left' ? slideOutLeft : slideOutRight;
      return css`
        animation: ${anim} ${EXIT_DURATION_MS}ms ${animation.easings.dramatic} both;
        pointer-events: none;
      `;
    }
    return '';
  }}
`;

const QuestionMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing[3]};
`;

const QuestionNumber = styled.span`
  font-family: ${typography.fonts.body};
  font-size: ${typography.sizes.xs};
  font-weight: ${typography.weights.medium};
  letter-spacing: ${typography.letterSpacing.widest};
  text-transform: uppercase;
  color: ${colors.textMuted};

  ${mq.sm} {
    font-size: ${typography.sizes.sm};
  }
`;

const Divider = styled.span`
  flex: 1;
  height: 1px;
  background: ${colors.border};
`;

const QuestionText = styled.h2`
  font-family: ${typography.fonts.display};
  font-style: italic;
  font-size: clamp(1.2rem, 4vw, 1.6rem);
  font-weight: 600;
  line-height: ${typography.lineHeights.snug};
  letter-spacing: ${typography.letterSpacing.snug};
  color: ${colors.ink};
`;

const ChooseHint = styled.p`
  font-family: ${typography.fonts.body};
  font-size: ${typography.sizes.xs};
  color: ${colors.textMuted};
  letter-spacing: ${typography.letterSpacing.wide};
  text-transform: uppercase;

  ${mq.sm} {
    font-size: ${typography.sizes.sm};
    letter-spacing: ${typography.letterSpacing.wider};
  }
`;

const gradients_pinkToCobalt = `linear-gradient(180deg, #FEC6E9 0%, #0212EE 100%)`;

const OptionsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[3]};

  ${mq.sm} {
    gap: ${spacing[4]};
  }
`;

const OptionButton = styled.button<{ $selected: boolean; $dim: boolean }>`
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: ${spacing[3]};
  padding: ${spacing[4]} ${spacing[5]};
  border-radius: ${borderRadius.xl};
  text-align: left;
  cursor: pointer;
  position: relative;

  border: 2px solid
    ${({ $selected }) => ($selected ? colors.cobalt : colors.border)};
  background: ${({ $selected, $dim }) =>
    $selected ? colors.cobaltGhost : $dim ? 'rgba(255,255,255,0.5)' : colors.white};

  opacity: ${({ $dim }) => ($dim ? 0.65 : 1)};

  transition:
    border-color ${animation.transitions.normal},
    background ${animation.transitions.normal},
    box-shadow ${animation.transitions.slow},
    transform ${animation.transitions.spring},
    opacity ${animation.transitions.slow};

  box-shadow: ${({ $selected }) => ($selected ? shadows.cobaltXs : shadows.xs)};

  &:hover:not(:disabled) {
    border-color: ${({ $selected }) => ($selected ? colors.cobalt : colors.pinkDeep)};
    background: ${({ $selected }) => ($selected ? colors.cobaltGhost : colors.pinkGhost)};
    box-shadow: ${({ $selected }) => ($selected ? shadows.cobaltXs : shadows.pinkSm)};
    transform: translateY(-3px);
    opacity: 1;
  }

  &:active:not(:disabled) {
    transform: translateY(-1px);
    transition-duration: 100ms;
  }

  &:focus-visible {
    outline: 2px solid ${colors.cobalt};
    outline-offset: 3px;
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: ${spacing[3]};
    bottom: ${spacing[3]};
    width: 3px;
    border-radius: 0 2px 2px 0;
    background: ${gradients_pinkToCobalt};
    opacity: ${({ $selected }) => ($selected ? 1 : 0)};
    transform: scaleY(${({ $selected }) => ($selected ? 1 : 0.4)});
    transform-origin: center;
    transition: opacity ${animation.transitions.normal},
      transform ${animation.transitions.spring};
  }

  ${mq.sm} {
    padding: ${spacing[5]} ${spacing[6]};
    gap: ${spacing[4]};
  }
`;

const Badge = styled.span<{ $selected: boolean }>`
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: ${typography.fonts.body};
  font-size: ${typography.sizes.xs};
  font-weight: ${typography.weights.semibold};
  letter-spacing: 0;
  border: 2px solid ${({ $selected }) => ($selected ? colors.cobalt : colors.border)};
  background: ${({ $selected }) => ($selected ? colors.cobalt : 'transparent')};
  color: ${({ $selected }) => ($selected ? colors.white : colors.textMuted)};
  transition:
    border-color ${animation.transitions.normal},
    background ${animation.transitions.normal},
    color ${animation.transitions.fast};
  position: relative;
`;

const Checkmark = styled.span`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${checkIn} 0.25s ${animation.easings.spring} both;
  font-size: 10px;
  line-height: 1;
`;

const OptionText = styled.p`
  font-family: ${typography.fonts.body};
  font-size: ${typography.sizes.sm};
  color: ${colors.textSoft};
  line-height: ${typography.lineHeights.relaxed};
  flex: 1;

  ${mq.sm} {
    font-size: ${typography.sizes.base};
  }
`;

const NavRow = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${spacing[3]};
  padding-top: ${spacing[6]};
`;

const NextWrapper = styled.div<{ $visible: boolean }>`
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  pointer-events: ${({ $visible }) => ($visible ? 'auto' : 'none')};
  transform: translateY(${({ $visible }) => ($visible ? '0' : '8px')});
  transition:
    opacity ${animation.transitions.slow},
    transform ${animation.transitions.spring};
  ${({ $visible }) =>
    $visible &&
    css`
      animation: ${buttonReveal} 0.35s ${animation.easings.spring} both;
    `}
`;

const BackButton = styled.button<{ $visible: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${spacing[1.5]};
  font-family: ${typography.fonts.body};
  font-size: ${typography.sizes.sm};
  font-weight: ${typography.weights.medium};
  letter-spacing: ${typography.letterSpacing.wide};
  text-transform: uppercase;
  color: ${colors.textMuted};
  background: none;
  border: none;
  cursor: pointer;
  padding: ${spacing[2]} 0;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  pointer-events: ${({ $visible }) => ($visible ? 'auto' : 'none')};
  transition: color ${animation.transitions.fast}, opacity ${animation.transitions.normal};

  &:hover {
    color: ${colors.cobalt};
  }

  &:focus-visible {
    outline: 2px solid ${colors.cobalt};
    outline-offset: 3px;
    border-radius: 4px;
  }

  &::before {
    content: '←';
    font-size: 1.1em;
    line-height: 1;
  }
`;

export function QuestionCard({
  question,
  questionIndex,
  totalQuestions,
  selectedOption,
  onSelect,
  onNext,
  onPrev,
}: QuestionCardProps) {
  const { t, tQuestion } = useLanguage();

  const [phase, setPhase] = useState<Phase>('entering');
  const [enterDir, setEnterDir] = useState<SlideDirection>('right');
  const [exitDir, setExitDir] = useState<SlideDirection>('left');

  // Displayed content — stays stable during exit animation
  const [displayedQuestion, setDisplayedQuestion] = useState(question);
  const [displayedIndex, setDisplayedIndex] = useState(questionIndex);
  const [displayedSelected, setDisplayedSelected] = useState(selectedOption);

  const prevIdRef = useRef(question.id);

  useEffect(() => {
    if (question.id !== prevIdRef.current) {
      prevIdRef.current = question.id;
      setDisplayedQuestion(question);
      setDisplayedIndex(questionIndex);
      setDisplayedSelected(null); // fresh selection state
      setPhase('entering');
    }
  }, [question.id, question, questionIndex]);

  useEffect(() => {
    if (phase !== 'exiting') {
      setDisplayedSelected(selectedOption);
    }
  }, [selectedOption, phase]);

  useEffect(() => {
    if (phase !== 'entering') return;
    const timer = setTimeout(() => setPhase('idle'), ENTER_DURATION_MS + 50);
    return () => clearTimeout(timer);
  }, [phase]);

  const localized = tQuestion(displayedQuestion);
  const isLast = displayedIndex === totalQuestions - 1;
  const nextLabel = isLast ? t('ui.seeResultButton') : t('ui.nextButton');

  const handleNext = useCallback(() => {
    if (!displayedSelected) return;
    setExitDir('left');
    setEnterDir('right');
    setPhase('exiting');
    setTimeout(onNext, EXIT_DURATION_MS);
  }, [displayedSelected, onNext]);

  const handlePrev = useCallback(() => {
    if (!onPrev) return;
    setExitDir('right');
    setEnterDir('left');
    setPhase('exiting');
    setTimeout(onPrev, EXIT_DURATION_MS);
  }, [onPrev]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowRight' && displayedSelected) handleNext();
      if (e.key === 'ArrowLeft' && onPrev) handlePrev();
    },
    [displayedSelected, handleNext, handlePrev, onPrev],
  );

  return (
    <Screen onKeyDown={handleKeyDown}>
      <ProgressWrapper>
        <ProgressBar
          current={displayedIndex + 1}
          total={totalQuestions}
          showLabel
          showPercentage
          showBar={false}
          showDots
        />
      </ProgressWrapper>

      <SlideContainer>
        <Slide $phase={phase} $enterDir={enterDir} $exitDir={exitDir}>
          <QuestionMeta>
            <QuestionNumber>
              {t('ui.questionOf', {
                current: displayedIndex + 1,
                total: totalQuestions,
              })}
            </QuestionNumber>
            <Divider aria-hidden="true" />
          </QuestionMeta>

          <QuestionText>{localized.text}</QuestionText>

          <ChooseHint aria-hidden="true">{t('ui.chooseOption')}</ChooseHint>

          <OptionsGrid role="radiogroup" aria-label={localized.text}>
            {(
              [
                { key: 'A', label: t('ui.optionALabel'), text: localized.optionA },
                { key: 'B', label: t('ui.optionBLabel'), text: localized.optionB },
              ] as const
            ).map(({ key, label, text }) => {
              const isSelected = displayedSelected === key;
              const isDimmed = !!displayedSelected && !isSelected;

              return (
                <OptionButton
                  key={key}
                  $selected={isSelected}
                  $dim={isDimmed}
                  onClick={() => onSelect(key)}
                  role="radio"
                  aria-checked={isSelected}
                  aria-label={`${label}: ${text}`}
                  disabled={phase === 'exiting'}
                >
                  <Badge $selected={isSelected} aria-hidden="true">
                    {isSelected ? <Checkmark>✓</Checkmark> : label}
                  </Badge>
                  <OptionText>{text}</OptionText>
                </OptionButton>
              );
            })}
          </OptionsGrid>
        </Slide>
      </SlideContainer>

      <NavRow>
        <BackButton
          $visible={displayedIndex > 0}
          onClick={handlePrev}
          aria-label={t('ui.prevButton')}
          tabIndex={displayedIndex > 0 ? 0 : -1}
        >
          {t('ui.prevButton')}
        </BackButton>

        <NextWrapper $visible={!!displayedSelected}>
          <Button
            variant="primary"
            size="md"
            onClick={handleNext}
            disabled={!displayedSelected}
            aria-label={nextLabel}
          >
            {nextLabel} →
          </Button>
        </NextWrapper>
      </NavRow>
    </Screen>
  );
}
