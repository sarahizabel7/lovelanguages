import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useLanguage } from '../contexts/LanguageContext';
import { animation, colors, borderRadius, spacing, typography, mq } from '../styles/theme';

const fadeSlideUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// ------------------------------------------------------------------
// Section header
// ------------------------------------------------------------------

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing[3]};
  margin-bottom: ${spacing[5]};
`;

const HeaderIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${colors.cherry};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: ${colors.white};
  font-size: 1rem;
`;

const HeaderText = styled.div``;

const Title = styled.h3`
  font-family: ${typography.fonts.body};
  font-size: ${typography.sizes.sm};
  font-weight: ${typography.weights.semibold};
  letter-spacing: ${typography.letterSpacing.widest};
  text-transform: uppercase;
  color: ${colors.cherry};
  line-height: 1;
  margin-bottom: ${spacing[1]};

  ${mq.sm} {
    font-size: ${typography.sizes.base};
  }
`;

const Subtitle = styled.p`
  font-family: ${typography.fonts.body};
  font-size: ${typography.sizes.xs};
  color: ${colors.textMuted};
  letter-spacing: ${typography.letterSpacing.wide};

  ${mq.sm} {
    font-size: ${typography.sizes.sm};
  }
`;

// ------------------------------------------------------------------
// Tip cards
// ------------------------------------------------------------------

const CardList = styled.ol`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: ${spacing[3]};
`;

const Card = styled.li<{ $delay: number }>`
  display: flex;
  align-items: flex-start;
  gap: ${spacing[4]};
  padding: ${spacing[4]} ${spacing[5]};
  background: ${colors.sand};
  border-radius: ${borderRadius.xl};
  border-left: 3px solid ${colors.cherry};
  animation: ${fadeSlideUp} 0.45s ${animation.easings.smooth} both;
  animation-delay: ${({ $delay }) => $delay}s;
`;

const Number = styled.span`
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1.5px solid rgba(210, 0, 1, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${typography.fonts.body};
  font-size: ${typography.sizes['2xs']};
  font-weight: ${typography.weights.semibold};
  color: ${colors.cherry};
  margin-top: 1px;
`;

const Text = styled.p`
  font-family: ${typography.fonts.body};
  font-size: ${typography.sizes.sm};
  color: ${colors.textSoft};
  line-height: ${typography.lineHeights.relaxed};
  flex: 1;

  ${mq.sm} {
    font-size: ${typography.sizes.base};
  }
`;

// ------------------------------------------------------------------
// Props & component
// ------------------------------------------------------------------

export interface TipsForMeProps {
  tips: readonly string[];
}

export function TipsForMe({ tips }: TipsForMeProps) {
  const { t } = useLanguage();

  return (
    <section aria-label={t('ui.tipsForMe_title')}>
      <Header>
        <HeaderIcon aria-hidden="true">✦</HeaderIcon>
        <HeaderText>
          <Title>{t('ui.tipsForMe_title')}</Title>
          <Subtitle>{t('ui.tipsForMe_subtitle')}</Subtitle>
        </HeaderText>
      </Header>

      <CardList>
        {tips.map((tip, i) => (
          <Card key={i} $delay={0.05 * i}>
            <Number aria-hidden="true">{i + 1}</Number>
            <Text>{tip}</Text>
          </Card>
        ))}
      </CardList>
    </section>
  );
}
