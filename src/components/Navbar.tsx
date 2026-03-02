import React from 'react';
import styled, { css } from 'styled-components';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageToggle } from './LanguageToggle';
import { animation, colors, mq, spacing, typography } from '../styles/theme';

export const NAVBAR_H = 56;

type Phase = 'welcome' | 'quiz' | 'result';

export interface NavbarProps {
  phase: Phase;
  onHome: () => void;
}

// ------------------------------------------------------------------
// Bar
// ------------------------------------------------------------------

const Bar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: ${NAVBAR_H}px;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${spacing[4]};
  background: rgba(243, 243, 233, 0.88);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(26, 26, 46, 0.07);

  ${mq.md} {
    padding: 0 ${spacing[8]};
  }
`;

// ------------------------------------------------------------------
// Logo button
// ------------------------------------------------------------------

const LogoBtn = styled.button<{ $isHome: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${spacing[2]};
  background: none;
  border: none;
  cursor: ${({ $isHome }) => ($isHome ? 'default' : 'pointer')};
  padding: ${spacing[1.5]} 0;
  color: ${colors.ink};
  transition: color ${animation.transitions.fast};

  /* Heart icon transitions always */
  svg {
    flex-shrink: 0;
    transition: transform ${animation.transitions.spring};
  }

  /* Hover effects only when not already on home */
  ${({ $isHome }) =>
    !$isHome &&
    css`
      &:hover {
        color: ${colors.cobalt};
      }
      &:hover svg {
        transform: scale(1.1);
      }
    `}

  &:focus-visible {
    outline: 2px solid ${colors.cobalt};
    outline-offset: 4px;
    border-radius: 4px;
  }
`;

const LogoText = styled.span`
  font-family: ${typography.fonts.display};
  font-style: italic;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: ${typography.letterSpacing.tight};
  color: inherit;
  line-height: 1;
  white-space: nowrap;

  /* Show title only on wider screens — on mobile just the heart */
  display: none;
  ${mq.sm} {
    display: block;
  }
`;

// ------------------------------------------------------------------
// Split-heart SVG (matches favicon exactly)
// ------------------------------------------------------------------

function SplitHeart() {
  return (
    <svg width="22" height="22" viewBox="0 0 32 32" aria-hidden="true">
      <defs>
        <clipPath id="rh-navbar">
          <rect x="16.5" y="0" width="16" height="32" />
        </clipPath>
      </defs>
      <path
        d="M16 28C7 21 2 16 2 11C2 6.8 5.4 4 9.5 4C12.1 4 14.3 5.4 16 7.8C17.7 5.4 19.9 4 22.5 4C26.6 4 30 6.8 30 11C30 16 25 21 16 28Z"
        fill="#0212EE"
      />
      <path
        clipPath="url(#rh-navbar)"
        d="M16 28C7 21 2 16 2 11C2 6.8 5.4 4 9.5 4C12.1 4 14.3 5.4 16 7.8C17.7 5.4 19.9 4 22.5 4C26.6 4 30 6.8 30 11C30 16 25 21 16 28Z"
        fill="#D20001"
      />
    </svg>
  );
}

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------

export function Navbar({ phase, onHome }: NavbarProps) {
  const { t } = useLanguage();
  const isHome = phase === 'welcome';

  return (
    <Bar>
      <LogoBtn
        $isHome={isHome}
        onClick={isHome ? undefined : onHome}
        aria-label={isHome ? t('ui.title') : t('ui.homeButton')}
        aria-current={isHome ? 'page' : undefined}
      >
        <SplitHeart />
        <LogoText>{t('ui.title')}</LogoText>
      </LogoBtn>

      <LanguageToggle position="inline" />
    </Bar>
  );
}
