import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useLanguage } from '../contexts/LanguageContext';
import type { Language } from '../i18n/translations';
import {
  animation,
  borderRadius,
  colors,
  shadows,
  spacing,
  typography,
} from '../styles/theme';

const underlineExpand = keyframes`
  from { transform: scaleX(0); opacity: 0; }
  to   { transform: scaleX(1); opacity: 1; }
`;

const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0;
  background: ${colors.white};
  border: 1.5px solid ${colors.border};
  border-radius: ${borderRadius.pill};
  padding: ${spacing[0.5]};
  box-shadow: ${shadows.xs};
`;

const Separator = styled.span`
  width: 1px;
  height: 14px;
  background: ${colors.border};
  flex-shrink: 0;
  pointer-events: none;
`;

const OptionButton = styled.button<{ $active: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${spacing[1.5]} ${spacing[3]};
  min-width: 38px;
  cursor: pointer;
  border: none;
  background: none;
  border-radius: ${borderRadius.pill};
  overflow: hidden;

  font-family: ${typography.fonts.body};
  font-size: ${typography.sizes.xs};
  font-weight: ${({ $active }) =>
    $active ? typography.weights.semibold : typography.weights.regular};
  letter-spacing: ${typography.letterSpacing.widest};
  text-transform: uppercase;
  line-height: 1;

  color: ${({ $active }) => ($active ? colors.cobalt : colors.textMuted)};

  transition:
    color ${animation.transitions.normal},
    font-weight ${animation.transitions.fast};

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: ${colors.cobaltGhost};
    opacity: ${({ $active }) => ($active ? 1 : 0)};
    transition: opacity ${animation.transitions.normal};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 3px;
    left: 50%;
    transform: translateX(-50%) scaleX(${({ $active }) => ($active ? 1 : 0)});
    transform-origin: center;
    width: calc(100% - ${spacing[6]});
    height: 2px;
    border-radius: ${borderRadius.pill};
    background: ${colors.cobalt};
    transition: transform ${animation.transitions.spring};
  }

  & > span {
    position: relative;
    z-index: 1;
  }

  ${({ $active }) =>
    !$active &&
    css`
      &:hover {
        color: ${colors.cobaltLight};

        &::after {
          transform: translateX(-50%) scaleX(0.6);
          opacity: 0.4;
        }
      }
    `}

  &:focus-visible {
    outline: 2px solid ${colors.cobalt};
    outline-offset: 2px;
  }

  &:active {
    transform: scale(0.96);
  }
`;

type TogglePosition = 'inline' | 'fixed-top-right';

const FixedContainer = styled.div`
  position: fixed;
  top: ${spacing[4]};
  right: ${spacing[4]};
  z-index: 200;

  animation: fadeIn 0.4s ${animation.easings.easeOut} both;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

export interface LanguageToggleProps {
  /** 'inline' renders in document flow; 'fixed-top-right' uses position:fixed */
  position?: TogglePosition;
  className?: string;
}

export function LanguageToggle({
  position = 'inline',
  className,
}: LanguageToggleProps) {
  const { language, setLanguage, t } = useLanguage();

  const options: Array<{ lang: Language; label: string }> = [
    { lang: 'pt', label: t('ui.ptLabel') },
    { lang: 'en', label: t('ui.enLabel') },
  ];

  const toggle = (
    <Wrapper
      className={className}
      role="group"
      aria-label={t('ui.languageToggleLabel')}
    >
      {options.map(({ lang, label }, i) => (
        <React.Fragment key={lang}>
          {i > 0 && <Separator aria-hidden="true" />}
          <OptionButton
            $active={language === lang}
            onClick={() => setLanguage(lang)}
            aria-pressed={language === lang}
            aria-label={`${t('ui.languageToggleLabel')}: ${label}`}
          >
            <span>{label}</span>
          </OptionButton>
        </React.Fragment>
      ))}
    </Wrapper>
  );

  if (position === 'fixed-top-right') {
    return <FixedContainer>{toggle}</FixedContainer>;
  }

  return toggle;
}
