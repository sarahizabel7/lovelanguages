import React, { useEffect, useRef } from 'react';
import styled, { css, keyframes } from 'styled-components';
import {
  colors,
  gradients,
  typography,
  borderRadius,
  animation,
  spacing,
  mq,
} from '../../styles/theme';

export interface ProgressBarProps {
  /** Current question number (1-based) */
  current: number;
  /** Total number of questions */
  total: number;
  /** Show "Question X of Y" label */
  showLabel?: boolean;
  /** Show percentage on the right */
  showPercentage?: boolean;
  /** Show the shimmer bar + tip dot */
  showBar?: boolean;
  /** Show the individual question dots below the bar */
  showDots?: boolean;
  className?: string;
}

const shimmer = keyframes`
  0%   { background-position: -300% 0; }
  100% { background-position: 300% 0; }
`;

const dotPop = keyframes`
  0%   { transform: scaleY(1) scaleX(1); }
  40%  { transform: scaleY(2.2) scaleX(0.8); }
  70%  { transform: scaleY(0.9) scaleX(1.1); }
  100% { transform: scaleY(1.5) scaleX(1); }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(2, 18, 238, 0.0); }
  50%       { box-shadow: 0 0 0 5px rgba(2, 18, 238, 0.12); }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[2]};
  width: 100%;
`;

const LabelRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: ${spacing[2]};
`;

const QuestionLabel = styled.span`
  font-family: ${typography.fonts.body};
  font-size: ${typography.sizes['2xs']};
  font-weight: ${typography.weights.medium};
  letter-spacing: ${typography.letterSpacing.widest};
  text-transform: uppercase;
  color: ${colors.textMuted};

  ${mq.sm} {
    font-size: ${typography.sizes.xs};
  }
`;

const PercentLabel = styled.span`
  font-family: ${typography.fonts.display};
  font-size: ${typography.sizes.sm};
  font-weight: ${typography.weights.regular};
  font-style: italic;
  color: ${colors.cobalt};
  line-height: 1;
  letter-spacing: ${typography.letterSpacing.snug};
  transition: color ${animation.transitions.fast};
`;

const Track = styled.div`
  position: relative;
  width: 100%;
  height: 5px;
  background: rgba(254, 198, 233, 0.35);
  border-radius: ${borderRadius.pill};
  overflow: visible; /* allow dot to overflow */

  ${mq.sm} {
    height: 6px;
  }
`;

const Fill = styled.div<{ $pct: number }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${({ $pct }) => $pct}%;
  border-radius: ${borderRadius.pill};
  background: ${gradients.progressFill};
  background-size: 300% 100%;
  transition: width ${animation.transitions.smooth};
  overflow: hidden;

  /* Shimmer sweep */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.45) 50%,
      transparent 100%
    );
    background-size: 300% 100%;
    animation: ${shimmer} 2.4s linear infinite;
    border-radius: inherit;
  }
`;

const TipDot = styled.div<{ $pct: number; $visible: boolean }>`
  position: absolute;
  top: 50%;
  left: ${({ $pct }) => $pct}%;
  transform: translate(-50%, -50%);
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: ${colors.cobalt};
  border: 2.5px solid ${colors.white};
  box-shadow: 0 0 0 3px rgba(2, 18, 238, 0.18);
  transition: left ${animation.transitions.smooth};
  z-index: 2;
  animation: ${glow} 2s ease-in-out infinite;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  pointer-events: none;
`;

const DotsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  width: 100%;
`;

type DotState = 'completed' | 'current' | 'upcoming';

const Dot = styled.span<{ $state: DotState }>`
  flex: 1;
  border-radius: ${borderRadius.pill};
  transition:
    background ${animation.transitions.normal},
    transform ${animation.transitions.spring},
    height ${animation.transitions.spring};

  ${({ $state }) => {
    switch ($state) {
      case 'completed':
        return css`
          height: 3px;
          background: ${colors.cobalt};
          transform: scaleY(1);
          opacity: 0.9;
        `;
      case 'current':
        return css`
          height: 3px;
          background: ${colors.cherry};
          transform: scaleY(1.8);
          animation: ${dotPop} 0.35s ${animation.easings.spring} both;
        `;
      case 'upcoming':
      default:
        return css`
          height: 3px;
          background: rgba(254, 198, 233, 0.55);
          transform: scaleY(1);
        `;
    }
  }}
`;

export function ProgressBar({
  current,
  total,
  showLabel = true,
  showPercentage = true,
  showBar = true,
  showDots = true,
  className,
}: ProgressBarProps) {
  const answered = Math.max(0, Math.min(current - 1, total));
  const pct = total > 0 ? Math.round((answered / total) * 100) : 0;

  return (
    <Wrapper className={className} aria-label={`Progress: question ${current} of ${total}`}>
      {(showLabel || showPercentage) && (
        <LabelRow>
          {showLabel && (
            <QuestionLabel aria-live="polite">
              Pergunta {current} de {total}
            </QuestionLabel>
          )}
          {showPercentage && pct > 0 && (
            <PercentLabel aria-hidden="true">{pct}%</PercentLabel>
          )}
        </LabelRow>
      )}

      {showBar && (
        <Track
          role="progressbar"
          aria-valuenow={answered}
          aria-valuemin={0}
          aria-valuemax={total}
          aria-label={`${pct}% complete`}
        >
          <Fill $pct={pct} />
          <TipDot $pct={pct} $visible={pct > 0} aria-hidden="true" />
        </Track>
      )}

      {showDots && (
        <DotsRow
          role="progressbar"
          aria-valuenow={answered}
          aria-valuemin={0}
          aria-valuemax={total}
          aria-label={`${pct}% complete`}
        >
          {Array.from({ length: total }, (_, i) => {
            const q = i + 1;
            const state: DotState =
              q < current ? 'completed' : q === current ? 'current' : 'upcoming';
            return <Dot key={q} $state={state} />;
          })}
        </DotsRow>
      )}
    </Wrapper>
  );
}
