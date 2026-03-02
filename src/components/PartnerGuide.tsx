import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import type { QuizResult } from '../../quiz';
import { useLanguage } from '../contexts/LanguageContext';
import { interpolate } from '../i18n/translations';
import {
  animation,
  borderRadius,
  colors,
  mq,
  spacing,
  typography,
} from '../styles/theme';
import { APP_URL, exportCardAsImage } from '../utils/shareCard';
import { PartnerGuideCard } from './PartnerGuideCard';

// ------------------------------------------------------------------
// Types
// ------------------------------------------------------------------

type ActionState = 'idle' | 'generating' | 'success' | 'error';

// ------------------------------------------------------------------
// Keyframes
// ------------------------------------------------------------------

const fadeSlideUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50%       { transform: scale(1.12); }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

// ------------------------------------------------------------------
// Section divider
// ------------------------------------------------------------------

const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing[4]};
`;

const DividerLine = styled.div`
  flex: 1;
  height: 1px;
  background: ${colors.border};
`;

const DividerLabel = styled.span`
  font-family: ${typography.fonts.body};
  font-size: ${typography.sizes.xs};
  font-weight: ${typography.weights.medium};
  letter-spacing: ${typography.letterSpacing.widest};
  text-transform: uppercase;
  color: ${colors.cobalt};
  white-space: nowrap;
`;

// ------------------------------------------------------------------
// Card container
// ------------------------------------------------------------------

const CardOuter = styled.div`
  background: linear-gradient(160deg, #FEC6E9 0%, #ffffff 55%);
  border: 1.5px solid rgba(2, 18, 238, 0.18);
  border-radius: 20px;
  filter: drop-shadow(0 4px 24px rgba(2, 18, 238, 0.08));
  animation: ${fadeSlideUp} 0.5s ${animation.easings.smooth} 0.1s both;
  overflow: hidden;
  position: relative;
`;

/* Soft pink corner orb — decorative, bottom-right */
const CornerOrb = styled.div`
  position: absolute;
  bottom: -40px;
  right: -40px;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(254, 198, 233, 0.6) 0%, transparent 70%);
  pointer-events: none;
`;

const CardInner = styled.div`
  padding: ${spacing[6]} ${spacing[6]} ${spacing[5]};
  position: relative;
  z-index: 1;

  ${mq.sm} {
    padding: ${spacing[7]} ${spacing[8]} ${spacing[6]};
  }
`;

// ── Card header ─────────────────────────────────────────────────────

const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${spacing[3]};
  margin-bottom: ${spacing[5]};
`;

const CardTitleBlock = styled.div``;

const CardTitle = styled.h2`
  font-family: ${typography.fonts.display};
  font-style: italic;
  font-size: clamp(1.25rem, 4vw, 1.6rem);
  font-weight: 700;
  color: ${colors.cobalt};
  letter-spacing: ${typography.letterSpacing.tight};
  line-height: 1.15;
  margin-bottom: ${spacing[1]};
`;

const CardSubtitle = styled.p`
  font-family: ${typography.fonts.body};
  font-size: ${typography.sizes.xs};
  color: ${colors.textMuted};
  line-height: ${typography.lineHeights.relaxed};
  max-width: 340px;

  ${mq.sm} {
    font-size: ${typography.sizes.sm};
  }
`;

const PulsingHeart = styled.div`
  font-size: 1.6rem;
  line-height: 1;
  animation: ${pulse} 2.2s ease-in-out infinite;
  flex-shrink: 0;
`;

// ── Separator ───────────────────────────────────────────────────────

const InnerSeparator = styled.div`
  height: 1px;
  background: linear-gradient(to right, rgba(2, 18, 238, 0.12), rgba(254, 198, 233, 0.4), transparent);
  margin-bottom: ${spacing[5]};
`;

// ── Tips list ───────────────────────────────────────────────────────

const TipsList = styled.ol`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: ${spacing[4]};
`;

const TipItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: ${spacing[3]};
`;

const TipHeart = styled.span`
  flex-shrink: 0;
  color: ${colors.cobalt};
  font-size: 0.875rem;
  margin-top: 3px;
  line-height: 1;
`;

const TipText = styled.p`
  font-family: ${typography.fonts.body};
  font-size: ${typography.sizes.base};
  color: ${colors.textSoft};
  line-height: ${typography.lineHeights.relaxed};
  flex: 1;

  ${mq.sm} {
    font-size: ${typography.sizes.md};
  }
`;

// ------------------------------------------------------------------
// Action buttons
// ------------------------------------------------------------------

const ActionsBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[3]};
  padding: ${spacing[5]} ${spacing[6]} ${spacing[6]};
  border-top: 1px solid rgba(2, 18, 238, 0.07);
  background: rgba(255, 255, 255, 0.6);

  ${mq.sm} {
    flex-direction: row;
    padding: ${spacing[4]} ${spacing[8]} ${spacing[5]};
  }
`;

const ActionBtn = styled.button<{ $state: ActionState; $variant?: 'primary' | 'default' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing[2]};
  flex: 1;
  padding: ${spacing[3]} ${spacing[4]};
  border-radius: ${borderRadius.pill};
  font-family: ${typography.fonts.body};
  font-size: ${typography.sizes.xs};
  font-weight: ${typography.weights.semibold};
  letter-spacing: ${typography.letterSpacing.wider};
  text-transform: uppercase;
  cursor: ${({ $state }) => ($state === 'generating' ? 'wait' : 'pointer')};
  min-height: 44px;
  transition:
    background ${animation.transitions.normal},
    border-color ${animation.transitions.normal},
    color ${animation.transitions.normal},
    transform ${animation.transitions.spring},
    filter ${animation.transitions.slow};

  border: 1.5px solid ${({ $state, $variant }) => {
    if ($state === 'success') return colors.cherry;
    if ($state === 'error') return '#bbb';
    return $variant === 'primary' ? colors.cobalt : colors.cobalt;
  }};

  background: ${({ $state, $variant }) => {
    if ($state === 'success') return 'rgba(210,0,1,0.06)';
    if ($state === 'error') return 'rgba(0,0,0,0.03)';
    if ($state === 'generating') return 'rgba(2,18,238,0.06)';
    return $variant === 'primary' ? colors.cobalt : 'transparent';
  }};

  color: ${({ $state, $variant }) => {
    if ($state === 'success') return colors.cherry;
    if ($state === 'error') return '#aaa';
    return $variant === 'primary' ? colors.white : colors.cobalt;
  }};

  opacity: ${({ $state }) => ($state === 'generating' ? 0.7 : 1)};

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    filter: ${({ $variant }) =>
      $variant === 'primary'
        ? 'drop-shadow(0 4px 12px rgba(2,18,238,0.22))'
        : 'drop-shadow(0 4px 12px rgba(2,18,238,0.14))'};
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    cursor: not-allowed;
    pointer-events: none;
  }

  &:focus-visible {
    outline: 2px solid ${colors.cobalt};
    outline-offset: 3px;
  }
`;

const Spinner = styled.span`
  display: inline-block;
  width: 13px;
  height: 13px;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: ${spin} 0.6s linear infinite;
  flex-shrink: 0;
`;

// ------------------------------------------------------------------
// Inline SVG icons
// ------------------------------------------------------------------

const IconCopy = () => (
  <svg width="14" height="14" viewBox="0 0 15 15" fill="none" aria-hidden="true">
    <rect x="4" y="4" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M2 11V2h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const IconShare = () => (
  <svg width="14" height="14" viewBox="0 0 15 15" fill="none" aria-hidden="true">
    <path d="M7.5 1v8M4.5 4L7.5 1l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5 6H3a1 1 0 00-1 1v6a1 1 0 001 1h9a1 1 0 001-1V7a1 1 0 00-1-1h-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

const IconImage = () => (
  <svg width="14" height="14" viewBox="0 0 15 15" fill="none" aria-hidden="true">
    <rect x="1" y="2" width="13" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="5" cy="6" r="1.2" fill="currentColor"/>
    <path d="M1 10l4-3 3 3 2-2 4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 15 15" fill="none" aria-hidden="true">
    <path d="M2.5 7.5l3.5 3.5 6.5-6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconX = () => (
  <svg width="14" height="14" viewBox="0 0 15 15" fill="none" aria-hidden="true">
    <path d="M3 3l9 9M12 3l-9 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

// ------------------------------------------------------------------
// Hidden capture container (1080×1080, off-screen)
// ------------------------------------------------------------------

const HiddenCapture = styled.div`
  position: absolute;
  left: -9999px;
  top: 0;
  width: 1080px;
  height: 1080px;
  pointer-events: none;
  user-select: none;
`;

// ------------------------------------------------------------------
// Props & component
// ------------------------------------------------------------------

export interface PartnerGuideProps {
  result: QuizResult;
}

export function PartnerGuide({ result }: PartnerGuideProps) {
  const { t, tLang, language } = useLanguage();

  const data = tLang(result.primary);

  const cardRef = useRef<HTMLDivElement>(null);

  const [copyState, setCopyState] = useState<ActionState>('idle');
  const [shareState, setShareState] = useState<ActionState>('idle');
  const [genState, setGenState] = useState<ActionState>('idle');

  const resetAfter = (setter: React.Dispatch<React.SetStateAction<ActionState>>, ms = 2500) => {
    setTimeout(() => setter('idle'), ms);
  };

  // Cleanup timers
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => () => { timers.current.forEach(clearTimeout); }, []);

  // -- Format text for clipboard / share --
  const formatText = useCallback((): string => {
    const intro = interpolate(t('ui.partnerGuide_clipboard_intro'), { language: data.name });
    const footer = interpolate(t('ui.partnerGuide_clipboard_footer'), { url: APP_URL });
    const tipsText = data.tipsForPartner.map((tip, i) => `${i + 1}. ${tip}`).join('\n\n');
    return `${intro}${tipsText}${footer}`;
  }, [t, data]);

  // -- Copy --
  const handleCopy = async () => {
    if (copyState !== 'idle') return;
    setCopyState('generating');
    try {
      await navigator.clipboard.writeText(formatText());
      setCopyState('success');
      resetAfter(setCopyState);
    } catch {
      setCopyState('error');
      resetAfter(setCopyState, 3000);
    }
  };

  // -- Share --
  const handleShare = async () => {
    if (shareState !== 'idle') return;
    setShareState('generating');
    const text = formatText();
    try {
      if (typeof navigator.share === 'function') {
        await navigator.share({ text, title: t('ui.partnerGuide_title') });
      } else {
        await navigator.clipboard.writeText(text);
      }
      setShareState('success');
      resetAfter(setShareState);
    } catch (err) {
      // AbortError = user cancelled — treat as idle
      if (err instanceof Error && err.name === 'AbortError') {
        setShareState('idle');
      } else {
        setShareState('error');
        resetAfter(setShareState, 3000);
      }
    }
  };

  // -- Generate image --
  const handleGenerateImage = async () => {
    if (genState !== 'idle') return;
    setGenState('generating');
    try {
      await document.fonts.ready;
      const blob = await exportCardAsImage(cardRef);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `como-me-amar-${result.primary.toLowerCase()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setGenState('success');
      resetAfter(setGenState);
    } catch {
      setGenState('error');
      resetAfter(setGenState, 3000);
    }
  };

  // -- Label / icon helpers --
  const btnLabel = (state: ActionState, idle: string) => {
    if (state === 'generating') return t('ui.generating');
    if (state === 'success') return language === 'pt' ? '✓ Pronto' : '✓ Done';
    if (state === 'error') return t('ui.tryAgain');
    return idle;
  };

  const btnIcon = (state: ActionState, idleIcon: React.ReactElement) => {
    if (state === 'generating') return <Spinner />;
    if (state === 'success') return <IconCheck />;
    if (state === 'error') return <IconX />;
    return idleIcon;
  };

  return (
    <>
      {/* Visible card */}
      <CardOuter>
        <CornerOrb aria-hidden="true" />

        <CardInner>
          <CardHeader>
            <CardTitleBlock>
              <CardTitle>{t('ui.partnerGuide_title')}</CardTitle>
              <CardSubtitle>{t('ui.partnerGuide_subtitle')}</CardSubtitle>
            </CardTitleBlock>
            <PulsingHeart aria-hidden="true">💕</PulsingHeart>
          </CardHeader>

          <InnerSeparator aria-hidden="true" />

          <TipsList>
            {data.tipsForPartner.map((tip, i) => (
              <TipItem key={i}>
                <TipHeart aria-hidden="true">♡</TipHeart>
                <TipText>{tip}</TipText>
              </TipItem>
            ))}
          </TipsList>
        </CardInner>

        <ActionsBar>
          <ActionBtn
            $state={copyState}
            onClick={handleCopy}
            disabled={copyState === 'generating'}
            aria-label={t('ui.partnerGuide_copy')}
          >
            {btnIcon(copyState, <IconCopy />)}
            {btnLabel(copyState, t('ui.partnerGuide_copy'))}
          </ActionBtn>

          <ActionBtn
            $state={shareState}
            onClick={handleShare}
            disabled={shareState === 'generating'}
            aria-label={t('ui.partnerGuide_share')}
          >
            {btnIcon(shareState, <IconShare />)}
            {btnLabel(shareState, t('ui.partnerGuide_share'))}
          </ActionBtn>

          <ActionBtn
            $state={genState}
            $variant="primary"
            onClick={handleGenerateImage}
            disabled={genState === 'generating'}
            aria-label={t('ui.partnerGuide_generate')}
          >
            {btnIcon(genState, <IconImage />)}
            {btnLabel(genState, t('ui.partnerGuide_generate'))}
          </ActionBtn>
        </ActionsBar>
      </CardOuter>

      {/* Hidden 1080×1080 card for html2canvas capture */}
      <HiddenCapture aria-hidden="true">
        <PartnerGuideCard ref={cardRef} result={result} />
      </HiddenCapture>
    </>
  );
}
