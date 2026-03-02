import React, { useEffect, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import type { LoveLanguage, QuizResult } from '../../quiz';
import type { LoveLanguageData } from '../i18n/translations';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/Button';
import { ShareCard } from './ShareCard';
import { ShareButtonGroup } from './ShareButton';
import { TipsForMe } from './TipsForMe';
import { PartnerGuide } from './PartnerGuide';
import {
  animation,
  borderRadius,
  colors,
  mq,
  shadows,
  spacing,
  typography,
} from '../styles/theme';

const MAX_SCORE = 12;

const LANGUAGE_ORDER: LoveLanguage[] = ['WORDS', 'ACTS', 'GIFTS', 'TIME', 'TOUCH'];

const revealResult = keyframes`
  0% {
    opacity: 0;
    transform: translateY(44px) scale(0.93);
    filter: blur(12px);
  }
  55% { filter: blur(0px); }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0px);
  }
`;

const fadeSlideUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const barGrow = keyframes`
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
`;

const heartbeat = keyframes`
  0%, 100% { transform: scale(1); }
  15%       { transform: scale(1.22); }
  30%       { transform: scale(0.94); }
  45%       { transform: scale(1.10); }
`;

const checkPop = keyframes`
  0%   { transform: scale(0) rotate(-30deg); opacity: 0; }
  60%  { transform: scale(1.2) rotate(5deg); opacity: 1; }
  100% { transform: scale(1) rotate(0deg);  opacity: 1; }
`;

const Screen = styled.main`
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: calc(${spacing[8]} + 56px) ${spacing[4]} ${spacing[16]};
  background: var(--color-bg);

  ${mq.sm} {
    padding: calc(${spacing[12]} + 56px) ${spacing[6]} ${spacing[20]};
  }

  ${mq.md} {
    padding: calc(${spacing[16]} + 56px) ${spacing[8]};
  }
`;

const Inner = styled.div`
  width: 100%;
  max-width: 640px;
  display: flex;
  flex-direction: column;
  gap: ${spacing[8]};
`;

const Header = styled.header`
  text-align: center;
  animation: ${fadeSlideUp} 0.5s ${animation.easings.smooth} 0.1s both;
`;

const ResultEyebrow = styled.p`
  font-family: ${typography.fonts.body};
  font-size: ${typography.sizes.xs};
  font-weight: ${typography.weights.medium};
  letter-spacing: ${typography.letterSpacing.widest};
  text-transform: uppercase;
  color: ${colors.textMuted};
  margin-bottom: ${spacing[2]};

  ${mq.sm} {
    font-size: ${typography.sizes.sm};
  }
`;

const ResultTitle = styled.h1`
  font-family: ${typography.fonts.display};
  font-style: italic;
  font-size: clamp(1.8rem, 6vw, 2.8rem);
  font-weight: 700;
  letter-spacing: ${typography.letterSpacing.tightest};
  color: ${colors.ink};
  line-height: 1.1;
  margin-bottom: ${spacing[3]};
`;

const ResultSubtitle = styled.p`
  font-family: ${typography.fonts.body};
  font-size: ${typography.sizes.sm};
  color: ${colors.textMuted};
  line-height: ${typography.lineHeights.relaxed};
  max-width: 480px;
  margin: 0 auto;

  ${mq.sm} {
    font-size: ${typography.sizes.base};
  }
`;

const LanguageCard = styled.article<{ $isPrimary: boolean }>`
  position: relative;
  background: ${colors.white};
  border-radius: ${borderRadius['2xl']};
  overflow: hidden;
  animation: ${revealResult} 0.9s ${animation.easings.smooth} both;
  animation-delay: ${({ $isPrimary }) => ($isPrimary ? '0.25s' : '0.55s')};

  /* Gradient background mesh */
  background-image: ${({ $isPrimary }) =>
    $isPrimary
      ? `radial-gradient(ellipse 60% 50% at 90% 10%, rgba(254,198,233,0.35) 0%, transparent 60%),
         radial-gradient(ellipse 40% 40% at 10% 90%, rgba(2,18,238,0.04) 0%, transparent 55%)`
      : `radial-gradient(ellipse 50% 40% at 85% 15%, rgba(254,198,233,0.25) 0%, transparent 60%)`};

  box-shadow: ${({ $isPrimary }) =>
    $isPrimary ? shadows['2xl'] : shadows.md};

  /* Left accent bar */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${({ $isPrimary }) =>
      $isPrimary
        ? `linear-gradient(180deg, #FEC6E9 0%, #0212EE 100%)`
        : `linear-gradient(180deg, #FEC6E9 0%, #FDA8DE 100%)`};
  }
`;

const CardInner = styled.div<{ $isPrimary: boolean }>`
  padding: ${({ $isPrimary }) => ($isPrimary ? `${spacing[7]} ${spacing[7]}` : `${spacing[5]} ${spacing[6]}`)};

  ${mq.sm} {
    padding: ${({ $isPrimary }) => ($isPrimary ? `${spacing[8]} ${spacing[8]}` : `${spacing[6]} ${spacing[7]}`)};
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${spacing[3]};
  margin-bottom: ${spacing[5]};
`;

const EmojiWrapper = styled.div<{ $isPrimary: boolean }>`
  font-size: ${({ $isPrimary }) => ($isPrimary ? '2.8rem' : '2rem')};
  line-height: 1;
  animation: ${heartbeat} 1.8s ease-in-out 1.2s infinite;
  transform-origin: center;
  flex-shrink: 0;
`;

const NameBlock = styled.div`
  flex: 1;
`;

const Badge = styled.span<{ $isPrimary: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${spacing[1]};
  padding: ${spacing[0.5]} ${spacing[3]};
  border-radius: ${borderRadius.pill};
  font-family: ${typography.fonts.body};
  font-size: ${typography.sizes['2xs']};
  font-weight: ${typography.weights.semibold};
  letter-spacing: ${typography.letterSpacing.widest};
  text-transform: uppercase;
  background: ${({ $isPrimary }) => ($isPrimary ? colors.cobalt : colors.pink)};
  color: ${({ $isPrimary }) => ($isPrimary ? colors.white : colors.ink)};
  margin-bottom: ${spacing[2]};

  /* Checkmark pop for primary */
  ${({ $isPrimary }) =>
    $isPrimary &&
    css`
      &::before {
        content: '✓';
        font-size: 0.75em;
        animation: ${checkPop} 0.5s ${animation.easings.spring} 0.9s both;
        display: inline-block;
      }
    `}
`;

const LanguageName = styled.h2<{ $isPrimary: boolean }>`
  font-family: ${typography.fonts.display};
  font-style: italic;
  font-size: ${({ $isPrimary }) => ($isPrimary ? '1.5rem' : '1.15rem')};
  font-weight: 700;
  letter-spacing: ${typography.letterSpacing.tight};
  color: ${colors.ink};
  line-height: 1.2;

  ${mq.sm} {
    font-size: ${({ $isPrimary }) => ($isPrimary ? '1.75rem' : '1.3rem')};
  }
`;

const ShortDescription = styled.p`
  font-family: ${typography.fonts.body};
  font-size: ${typography.sizes.sm};
  color: ${colors.textSoft};
  line-height: ${typography.lineHeights.relaxed};
  margin-top: ${spacing[4]};

  ${mq.sm} {
    font-size: ${typography.sizes.base};
  }
`;

const Description = styled.p`
  font-family: ${typography.fonts.body};
  font-size: ${typography.sizes.sm};
  color: ${colors.textMuted};
  line-height: ${typography.lineHeights.relaxed};
  margin-top: ${spacing[2]};

  ${mq.sm} {
    font-size: ${typography.sizes.base};
  }
`;

const SectionDivider = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing[4]};
  animation: ${fadeSlideUp} 0.5s ${animation.easings.smooth} 0.8s both;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${colors.border};
  }
`;

const DividerText = styled.span`
  font-family: ${typography.fonts.body};
  font-size: ${typography.sizes.xs};
  font-weight: ${typography.weights.medium};
  letter-spacing: ${typography.letterSpacing.widest};
  text-transform: uppercase;
  color: ${colors.textMuted};
  white-space: nowrap;
`;

const ChartSection = styled.section`
  animation: ${fadeSlideUp} 0.55s ${animation.easings.smooth} 0.7s both;
`;

const ChartTitle = styled.h3`
  font-family: ${typography.fonts.body};
  font-size: ${typography.sizes.xs};
  font-weight: ${typography.weights.medium};
  letter-spacing: ${typography.letterSpacing.widest};
  text-transform: uppercase;
  color: ${colors.textMuted};
  margin-bottom: ${spacing[5]};
`;

const ChartRows = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[3]};
`;

const ChartRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing[3]};
`;

const ChartLabel = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
  width: 160px;
  flex-shrink: 0;

  ${mq.sm} {
    width: 200px;
  }
`;

const ChartEmoji = styled.span`
  font-size: 1rem;
  line-height: 1;
  flex-shrink: 0;
`;

const ChartName = styled.span`
  font-family: ${typography.fonts.body};
  font-size: ${typography.sizes.xs};
  color: ${colors.textSoft};
  font-weight: ${typography.weights.medium};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${mq.sm} {
    font-size: ${typography.sizes.sm};
  }
`;

const ChartTrack = styled.div`
  flex: 1;
  height: 8px;
  background: rgba(254, 198, 233, 0.25);
  border-radius: ${borderRadius.pill};
  overflow: hidden;

  ${mq.sm} {
    height: 10px;
  }
`;

const ChartFill = styled.div<{
  $pct: number;
  $isPrimary: boolean;
  $isSecondary: boolean;
  $animated: boolean;
  $delay: number;
}>`
  height: 100%;
  border-radius: ${borderRadius.pill};
  transform-origin: left center;
  background: ${({ $isPrimary, $isSecondary }) =>
    $isPrimary
      ? `linear-gradient(90deg, #FDA8DE 0%, #0212EE 100%)`
      : $isSecondary
      ? colors.pink
      : colors.sandDeep};
  width: ${({ $pct }) => $pct}%;
  transform: ${({ $animated }) => ($animated ? 'scaleX(1)' : 'scaleX(0)')};
  transform-origin: left center;
  transition: transform 0.75s ${animation.easings.smooth};
  transition-delay: ${({ $delay }) => $delay}s;
`;

const ChartScore = styled.span<{ $isPrimary: boolean }>`
  font-family: ${typography.fonts.display};
  font-size: ${typography.sizes.sm};
  font-style: italic;
  color: ${({ $isPrimary }) => ($isPrimary ? colors.cobalt : colors.textMuted)};
  font-weight: ${({ $isPrimary }) => ($isPrimary ? typography.weights.bold : typography.weights.regular)};
  width: 32px;
  text-align: right;
  flex-shrink: 0;
`;

const ActionsRow = styled.div`
  display: flex;
  justify-content: center;
  animation: ${fadeSlideUp} 0.5s ${animation.easings.smooth} 1s both;
`;


// ------------------------------------------------------------------
// Share card containers
// ------------------------------------------------------------------

/** Hidden at full 1080x1080 for html2canvas capture */
const HiddenCapture = styled.div`
  position: absolute;
  left: -9999px;
  top: 0;
  width: 1080px;
  height: 1080px;
  pointer-events: none;
  user-select: none;
`;

/** Visible scaled-down preview (~300px) */
const CardPreviewOuter = styled.div`
  width: 300px;
  height: 300px;
  overflow: hidden;
  border-radius: 16px;
  margin: 0 auto;
  position: relative;
  filter: drop-shadow(0 8px 32px rgba(2,18,238,0.12)) drop-shadow(0 2px 8px rgba(0,0,0,0.08));
  animation: ${fadeSlideUp} 0.55s ease 0.6s both;
`;

const CardPreviewInner = styled.div`
  width: 1080px;
  height: 1080px;
  transform: scale(${300 / 1080});
  transform-origin: top left;
  pointer-events: none;
`;

interface LangCardProps {
  data: LoveLanguageData;
  isPrimary: boolean;
  primaryBadge: string;
  secondaryBadge: string;
}

function LangCard({
  data,
  isPrimary,
  primaryBadge,
  secondaryBadge,
}: LangCardProps) {
  return (
    <LanguageCard $isPrimary={isPrimary}>
      <CardInner $isPrimary={isPrimary}>
        <CardHeader>
          <NameBlock>
            <Badge $isPrimary={isPrimary}>
              {isPrimary ? primaryBadge : secondaryBadge}
            </Badge>
            <LanguageName $isPrimary={isPrimary}>{data.name}</LanguageName>
          </NameBlock>
          <EmojiWrapper $isPrimary={isPrimary} aria-hidden="true">
            {data.emoji}
          </EmojiWrapper>
        </CardHeader>

        <ShortDescription>{data.shortDescription}</ShortDescription>

        {isPrimary && (
          <Description>{data.description}</Description>
        )}
      </CardInner>
    </LanguageCard>
  );
}

export interface ResultScreenProps {
  result: QuizResult;
  onRetake: () => void;
}

export function ResultScreen({ result, onRetake }: ResultScreenProps) {
  const { t, tLang } = useLanguage();

  const cardRef = useRef<HTMLDivElement>(null);
  const [barsAnimated, setBarsAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setBarsAnimated(true), 1100);
    return () => clearTimeout(timer);
  }, []);

  const sortedLanguages = LANGUAGE_ORDER.map((lang) => ({
    lang,
    score: result.scores[lang],
    isPrimary: lang === result.primary,
    isSecondary: lang === result.secondary,
    data: tLang(lang),
  })).sort((a, b) => b.score - a.score);

  // ── Render ────────────────────────────────────────────────────────
  const primaryData = tLang(result.primary);
  const secondaryData = result.secondary ? tLang(result.secondary) : null;

  return (
    <Screen>
      <Inner>
        {/* Header */}
        <Header>
          <ResultEyebrow>{t('ui.resultTitle')}</ResultEyebrow>
          <ResultTitle>{primaryData.name}</ResultTitle>
          <ResultSubtitle>{t('ui.resultSubtitle')}</ResultSubtitle>
        </Header>

        {/* Primary language card */}
        <LangCard
          data={primaryData}
          isPrimary
          primaryBadge={t('ui.primaryBadge')}
          secondaryBadge={t('ui.secondaryBadge')}
        />

        {/* Secondary language card (conditional) */}
        {secondaryData && (
          <>
            <ResultEyebrow style={{ textAlign: 'center', marginBottom: `-${spacing[4]}` }}>
              {t('ui.secondaryLanguageLabel')}
            </ResultEyebrow>
            <LangCard
              data={secondaryData}
              isPrimary={false}
              primaryBadge={t('ui.primaryBadge')}
              secondaryBadge={t('ui.secondaryBadge')}
            />
          </>
        )}

        {/* Tips for me */}
        <TipsForMe tips={primaryData.tipsForMe} />

        {/* Score Chart */}
        <ChartSection aria-label={t('ui.allScoresLabel')}>
          <ChartTitle>{t('ui.allScoresLabel')}</ChartTitle>
          <ChartRows>
            {sortedLanguages.map(({ lang, score, isPrimary, isSecondary, data }, i) => (
              <ChartRow key={lang}>
                <ChartLabel>
                  <ChartEmoji aria-hidden="true">{data.emoji}</ChartEmoji>
                  <ChartName>{data.name}</ChartName>
                </ChartLabel>
                <ChartTrack>
                  <ChartFill
                    $pct={(score / MAX_SCORE) * 100}
                    $isPrimary={isPrimary}
                    $isSecondary={isSecondary}
                    $animated={barsAnimated}
                    $delay={i * 0.1}
                    role="meter"
                    aria-label={`${data.name}: ${score} ${t('ui.pointsLabel')}`}
                    aria-valuenow={score}
                    aria-valuemin={0}
                    aria-valuemax={MAX_SCORE}
                  />
                </ChartTrack>
                <ChartScore $isPrimary={isPrimary}>
                  {score}
                  <span
                    style={{
                      fontSize: typography.sizes['2xs'],
                      opacity: 0.5,
                      marginLeft: '2px',
                    }}
                  >
                    {t('ui.pointsLabel')}
                  </span>
                </ChartScore>
              </ChartRow>
            ))}
          </ChartRows>
        </ChartSection>

        {/* Partner guide divider + section */}
        <SectionDivider aria-hidden="true">
          <DividerText>{t('ui.partnerGuide_share_divider')}</DividerText>
        </SectionDivider>

        <PartnerGuide result={result} />

        {/* Share card preview */}
        <CardPreviewOuter aria-hidden="true">
          <CardPreviewInner>
            <ShareCard result={result} />
          </CardPreviewInner>
        </CardPreviewOuter>

        {/* Share action buttons */}
        <ShareButtonGroup result={result} cardRef={cardRef} />

        {/* Retake */}
        <ActionsRow>
          <Button
            variant="outline"
            size="md"
            onClick={onRetake}
            aria-label={t('ui.retakeButton')}
          >
            {t('ui.retakeButton')}
          </Button>
        </ActionsRow>
      </Inner>

      {/* Hidden 1080x1080 card for html2canvas capture */}
      <HiddenCapture aria-hidden="true">
        <ShareCard ref={cardRef} result={result} />
      </HiddenCapture>
    </Screen>
  );
}
