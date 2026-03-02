import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/Button';
import {
  animation,
  colors,
  gradients,
  mq,
  shadows,
  spacing,
  typography,
} from '../styles/theme';

const heartbeat = keyframes`
  0%, 100% { transform: scale(1); }
  15%       { transform: scale(1.20); }
  30%       { transform: scale(0.94); }
  45%       { transform: scale(1.10); }
  60%       { transform: scale(0.98); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-10px); }
`;

const screenIn = keyframes`
  from { opacity: 0; transform: scale(0.97) translateY(12px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
`;

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const Screen = styled.main`
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: calc(${spacing[10]} + 56px) ${spacing[5]} ${spacing[12]};
  background: ${gradients.heroBackground};
  background-attachment: fixed;
  overflow: hidden;
  animation: ${screenIn} 0.7s ${animation.easings.smooth} both;

  ${mq.md} {
    padding: calc(${spacing[16]} + 56px) ${spacing[8]} ${spacing[16]};
  }
`;

const OrbTopRight = styled.div`
  position: fixed;
  top: -80px;
  right: -80px;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(2, 18, 238, 0.05) 0%,
    transparent 70%
  );
  pointer-events: none;
  z-index: 0;

  ${mq.md} {
    width: 500px;
    height: 500px;
  }
`;

const OrbBottomLeft = styled.div`
  position: fixed;
  bottom: -100px;
  left: -60px;
  width: 280px;
  height: 280px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(254, 198, 233, 0.6) 0%,
    transparent 70%
  );
  pointer-events: none;
  z-index: 0;

  ${mq.md} {
    width: 400px;
    height: 400px;
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 520px;
  width: 100%;
  gap: ${spacing[7]};
`;

const HeartWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${float} 3.5s ease-in-out infinite;
  /* Pink glow via drop-shadow on the wrapper, not the heart itself */
  filter: drop-shadow(0 8px 24px rgba(254, 198, 233, 0.8))
    drop-shadow(0 2px 6px rgba(210, 0, 1, 0.12));
  animation: ${fadeUp} 0.6s ${animation.easings.smooth} 0.1s both,
    ${float} 3.8s ease-in-out 0.7s infinite;
`;

const Heart = styled.div`
  position: relative;
  width: 64px;
  height: 58px;
  /* The heartbeat runs on this element */
  animation: ${heartbeat} 1.5s ease-in-out infinite;
  transform-origin: center 80%;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    width: 32px;
    height: 52px;
    border-radius: 16px 16px 0 0;
    background: ${colors.pink};
  }

  /* Right lobe — rotates -45° around its bottom-left corner */
  &::before {
    left: 32px;
    transform-origin: 0 100%;
    transform: rotate(-45deg);
  }

  /* Left lobe — rotates +45° around its bottom-right corner */
  &::after {
    left: 0;
    transform-origin: 100% 100%;
    transform: rotate(45deg);
  }
`;

const Eyebrow = styled.p`
  font-family: ${typography.fonts.body};
  font-size: ${typography.sizes['2xs']};
  font-weight: ${typography.weights.medium};
  letter-spacing: ${typography.letterSpacing.widest};
  text-transform: uppercase;
  color: ${colors.textMuted};
  animation: ${fadeUp} 0.5s ${animation.easings.smooth} 0.2s both;

  ${mq.sm} {
    font-size: ${typography.sizes.xs};
  }
`;

const HeroTitle = styled.h1`
  font-family: ${typography.fonts.display};
  font-style: italic;
  font-size: clamp(2.1rem, 8vw, 3.6rem);
  font-weight: 700;
  line-height: 1.08;
  letter-spacing: ${typography.letterSpacing.tightest};
  color: ${colors.ink};
  animation: ${fadeUp} 0.6s ${animation.easings.smooth} 0.3s both;

  em {
    color: ${colors.cobalt};
    font-style: italic;
  }
`;

const Description = styled.p`
  font-family: ${typography.fonts.body};
  font-size: ${typography.sizes.base};
  color: ${colors.textSoft};
  line-height: ${typography.lineHeights.relaxed};
  max-width: 420px;
  animation: ${fadeUp} 0.6s ${animation.easings.smooth} 0.4s both;

  ${mq.md} {
    font-size: ${typography.sizes.md};
  }
`;

const MetaRow = styled.p`
  font-family: ${typography.fonts.body};
  font-size: ${typography.sizes.xs};
  color: ${colors.textMuted};
  letter-spacing: ${typography.letterSpacing.wide};
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
  animation: ${fadeUp} 0.5s ${animation.easings.smooth} 0.5s both;

  &::before,
  &::after {
    content: '';
    width: 20px;
    height: 1px;
    background: currentColor;
    opacity: 0.4;
    flex-shrink: 0;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  animation: ${fadeUp} 0.55s ${animation.easings.smooth} 0.55s both;

  ${mq.sm} {
    width: auto;
  }
`;

const Credit = styled.p`
  font-family: ${typography.fonts.body};
  font-size: ${typography.sizes['2xs']};
  color: ${colors.textMuted};
  letter-spacing: ${typography.letterSpacing.wide};
  opacity: 0.6;
  animation: ${fadeUp} 0.5s ${animation.easings.smooth} 0.65s both;

  ${mq.sm} {
    font-size: ${typography.sizes.xs};
  }
`;

function splitHeroTitle(title: string) {
  const words = title.split(' ');
  if (words.length <= 2) return { prefix: '', accent: title };
  const accentWords = words.slice(-2).join(' ');
  const prefix = words.slice(0, -2).join(' ') + ' ';
  return { prefix, accent: accentWords };
}

export interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const { t } = useLanguage();
  const { prefix, accent } = splitHeroTitle(t('ui.heroTitle'));

  return (
    <Screen>
      <OrbTopRight aria-hidden="true" />
      <OrbBottomLeft aria-hidden="true" />

      <Content>
        <HeartWrapper aria-hidden="true">
          <Heart />
        </HeartWrapper>

        <Eyebrow>{t('ui.title')}</Eyebrow>

        <HeroTitle>
          {prefix}
          <em>{accent}</em>
        </HeroTitle>

        <Description>{t('ui.introParagraph')}</Description>

        <MetaRow>30 questões · ~5 min</MetaRow>

        <ButtonWrapper>
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={onStart}
            aria-label={t('ui.startButton')}
          >
            {t('ui.startButton')}
          </Button>
        </ButtonWrapper>

        <Credit>{t('ui.basedOn')}</Credit>
      </Content>
    </Screen>
  );
}
