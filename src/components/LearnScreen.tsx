import React from 'react';
import styled, { keyframes } from 'styled-components';
import type { LoveLanguage } from '../../quiz';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/Button';
import {
  animation,
  borderRadius,
  colors,
  mq,
  shadows,
  spacing,
  typography,
} from '../styles/theme';

const LANGUAGE_ORDER: LoveLanguage[] = ['WORDS', 'ACTS', 'GIFTS', 'TIME', 'TOUCH'];

const ACCENT_COLORS: Record<LoveLanguage, { bar: string; orb: string }> = {
  WORDS: {
    bar: `linear-gradient(180deg, #FEC6E9 0%, #0212EE 100%)`,
    orb: 'rgba(2, 18, 238, 0.05)',
  },
  ACTS: {
    bar: `linear-gradient(180deg, #0212EE 0%, #FEC6E9 100%)`,
    orb: 'rgba(254, 198, 233, 0.15)',
  },
  GIFTS: {
    bar: `linear-gradient(180deg, #FEC6E9 0%, #D20001 100%)`,
    orb: 'rgba(210, 0, 1, 0.04)',
  },
  TIME: {
    bar: `linear-gradient(180deg, #0212EE 0%, #3344F2 100%)`,
    orb: 'rgba(2, 18, 238, 0.04)',
  },
  TOUCH: {
    bar: `linear-gradient(180deg, #FDA8DE 0%, #FEC6E9 100%)`,
    orb: 'rgba(254, 198, 233, 0.2)',
  },
};

// ------------------------------------------------------------------
// Animations
// ------------------------------------------------------------------

const screenIn = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const fadeSlideUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// ------------------------------------------------------------------
// Layout
// ------------------------------------------------------------------

const Screen = styled.main`
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: calc(${spacing[8]} + 56px) ${spacing[4]} ${spacing[16]};
  background: var(--color-bg);
  animation: ${screenIn} 0.6s ${animation.easings.smooth} both;

  ${mq.sm} {
    padding: calc(${spacing[12]} + 56px) ${spacing[6]} ${spacing[20]};
  }

  ${mq.md} {
    padding: calc(${spacing[16]} + 56px) ${spacing[8]} ${spacing[20]};
  }
`;

const Inner = styled.div`
  width: 100%;
  max-width: 640px;
  display: flex;
  flex-direction: column;
  gap: ${spacing[8]};
`;

// ------------------------------------------------------------------
// Header
// ------------------------------------------------------------------

const Header = styled.header`
  text-align: center;
  animation: ${fadeSlideUp} 0.5s ${animation.easings.smooth} 0.1s both;
`;

const Title = styled.h1`
  font-family: ${typography.fonts.display};
  font-style: italic;
  font-size: clamp(1.8rem, 6vw, 2.8rem);
  font-weight: 700;
  letter-spacing: ${typography.letterSpacing.tightest};
  color: ${colors.ink};
  line-height: 1.1;
  margin-bottom: ${spacing[4]};
`;

const Subtitle = styled.p`
  font-family: ${typography.fonts.body};
  font-size: ${typography.sizes.sm};
  color: ${colors.textMuted};
  line-height: ${typography.lineHeights.relaxed};
  max-width: 520px;
  margin: 0 auto;

  ${mq.sm} {
    font-size: ${typography.sizes.base};
  }
`;

// ------------------------------------------------------------------
// Language card
// ------------------------------------------------------------------

const Card = styled.article<{ $delay: number; $accentBar: string; $orbColor: string }>`
  position: relative;
  background: ${colors.white};
  border-radius: ${borderRadius['2xl']};
  overflow: hidden;
  box-shadow: ${shadows.lg};
  animation: ${fadeSlideUp} 0.55s ${animation.easings.smooth} both;
  animation-delay: ${({ $delay }) => $delay}s;

  background-image: ${({ $orbColor }) =>
    `radial-gradient(ellipse 60% 50% at 90% 10%, ${$orbColor} 0%, transparent 60%)`};

  /* Left accent bar */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${({ $accentBar }) => $accentBar};
  }
`;

const CardContent = styled.div`
  padding: ${spacing[6]} ${spacing[6]};

  ${mq.sm} {
    padding: ${spacing[7]} ${spacing[8]};
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${spacing[3]};
  margin-bottom: ${spacing[5]};
`;

const EmojiBlock = styled.div`
  font-size: 2.4rem;
  line-height: 1;
  flex-shrink: 0;

  ${mq.sm} {
    font-size: 2.8rem;
  }
`;

const NameBlock = styled.div`
  flex: 1;
`;

const LanguageName = styled.h2`
  font-family: ${typography.fonts.display};
  font-style: italic;
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: ${typography.letterSpacing.tight};
  color: ${colors.ink};
  line-height: 1.2;

  ${mq.sm} {
    font-size: 1.5rem;
  }
`;

const ShortLine = styled.p`
  font-family: ${typography.fonts.body};
  font-size: ${typography.sizes.xs};
  color: ${colors.textMuted};
  margin-top: ${spacing[1]};
  line-height: ${typography.lineHeights.relaxed};

  ${mq.sm} {
    font-size: ${typography.sizes.sm};
  }
`;

const DescriptionBlock = styled.div`
  font-family: ${typography.fonts.body};
  font-size: ${typography.sizes.sm};
  color: ${colors.textSoft};
  line-height: ${typography.lineHeights.relaxed};
  white-space: pre-line;

  ${mq.sm} {
    font-size: ${typography.sizes.base};
  }
`;

const ExamplesTitle = styled.h3`
  font-family: ${typography.fonts.body};
  font-size: ${typography.sizes.xs};
  font-weight: ${typography.weights.semibold};
  letter-spacing: ${typography.letterSpacing.widest};
  text-transform: uppercase;
  color: ${colors.textMuted};
  margin-top: ${spacing[6]};
  margin-bottom: ${spacing[3]};
`;

const ExampleList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${spacing[2.5]};
`;

const ExampleItem = styled.li`
  font-family: ${typography.fonts.body};
  font-size: ${typography.sizes.sm};
  color: ${colors.textSoft};
  line-height: ${typography.lineHeights.relaxed};
  padding-left: ${spacing[5]};
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.55em;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${colors.pink};
  }

  ${mq.sm} {
    font-size: ${typography.sizes.base};
  }
`;

// ------------------------------------------------------------------
// CTA
// ------------------------------------------------------------------

const CtaSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing[3]};
  animation: ${fadeSlideUp} 0.5s ${animation.easings.smooth} 1.2s both;
`;

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------

export interface LearnScreenProps {
  onStart: () => void;
}

export function LearnScreen({ onStart }: LearnScreenProps) {
  const { t, tLang } = useLanguage();

  return (
    <Screen>
      <Inner>
        <Header>
          <Title>{t('ui.learnTitle')}</Title>
          <Subtitle>{t('ui.learnSubtitle')}</Subtitle>
        </Header>

        {LANGUAGE_ORDER.map((lang, i) => {
          const data = tLang(lang);
          const accent = ACCENT_COLORS[lang];

          return (
            <Card
              key={lang}
              $delay={0.2 + i * 0.12}
              $accentBar={accent.bar}
              $orbColor={accent.orb}
            >
              <CardContent>
                <CardHeader>
                  <NameBlock>
                    <LanguageName>{data.name}</LanguageName>
                    <ShortLine>{data.shortDescription}</ShortLine>
                  </NameBlock>
                  <EmojiBlock aria-hidden="true">{data.emoji}</EmojiBlock>
                </CardHeader>

                <DescriptionBlock>{data.learnDescription}</DescriptionBlock>

                <ExamplesTitle>{t('ui.learnExamplesTitle')}</ExamplesTitle>
                <ExampleList>
                  {data.learnExamples.map((example, j) => (
                    <ExampleItem key={j}>{example}</ExampleItem>
                  ))}
                </ExampleList>
              </CardContent>
            </Card>
          );
        })}

        <CtaSection>
          <Button variant="primary" size="lg" onClick={onStart}>
            {t('ui.learnCta')} →
          </Button>
        </CtaSection>
      </Inner>
    </Screen>
  );
}
