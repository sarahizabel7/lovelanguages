import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled, { keyframes } from 'styled-components';
import type { RefObject } from 'react';
import type { QuizResult } from '../../quiz';
import { useLanguage } from '../contexts/LanguageContext';
import { interpolate } from '../i18n/translations';
import {
  animation,
  borderRadius,
  colors,
  mq,
  shadows,
  spacing,
  typography,
} from '../styles/theme';
import {
  copyAppLink,
  downloadCard,
  shareCardImage,
} from '../utils/shareCard';

// ------------------------------------------------------------------
// Types
// ------------------------------------------------------------------

type ActionState = 'idle' | 'generating' | 'success' | 'error';

// ------------------------------------------------------------------
// Toast
// ------------------------------------------------------------------

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const slideDown = keyframes`
  from { opacity: 1; transform: translateY(0); }
  to   { opacity: 0; transform: translateY(16px); }
`;

const ToastWrapper = styled.div<{ $visible: boolean }>`
  position: fixed;
  bottom: ${spacing[8]};
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  animation: ${({ $visible }) => ($visible ? slideUp : slideDown)} 0.3s
    ${animation.easings.spring} both;
  pointer-events: none;
`;

const ToastBubble = styled.div`
  background: ${colors.ink};
  color: ${colors.white};
  font-family: ${typography.fonts.body};
  font-size: ${typography.sizes.sm};
  font-weight: ${typography.weights.medium};
  padding: ${spacing[3]} ${spacing[6]};
  border-radius: ${borderRadius.pill};
  white-space: nowrap;
  filter: drop-shadow(0 4px 16px rgba(0, 0, 0, 0.24));
`;

interface ToastProps {
  message: string;
  visible: boolean;
}

function Toast({ message, visible }: ToastProps) {
  return (
    <ToastWrapper $visible={visible} role="status" aria-live="polite">
      <ToastBubble>{message}</ToastBubble>
    </ToastWrapper>
  );
}

// ------------------------------------------------------------------
// Individual action button
// ------------------------------------------------------------------

const ActionBtn = styled.button<{ $state: ActionState }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing[2]};
  padding: ${spacing[3]} ${spacing[5]};
  border-radius: ${borderRadius.pill};
  font-family: ${typography.fonts.body};
  font-size: ${typography.sizes.sm};
  font-weight: ${typography.weights.medium};
  letter-spacing: ${typography.letterSpacing.wide};
  text-transform: uppercase;
  cursor: ${({ $state }) => ($state === 'generating' ? 'wait' : 'pointer')};
  min-height: 48px;
  width: 100%;

  transition:
    background ${animation.transitions.normal},
    border-color ${animation.transitions.normal},
    color ${animation.transitions.normal},
    transform ${animation.transitions.spring},
    box-shadow ${animation.transitions.slow};

  /* State-based colours */
  border: 2px solid
    ${({ $state }) => {
      if ($state === 'success') return colors.cherry;
      if ($state === 'error') return '#999';
      return colors.cobalt;
    }};
  background: ${({ $state }) => {
    if ($state === 'success') return colors.cherryGhost;
    if ($state === 'error') return 'rgba(0,0,0,0.04)';
    if ($state === 'generating') return 'rgba(2,18,238,0.06)';
    return 'transparent';
  }};
  color: ${({ $state }) => {
    if ($state === 'success') return colors.cherry;
    if ($state === 'error') return '#999';
    return colors.cobalt;
  }};
  opacity: ${({ $state }) => ($state === 'generating' ? 0.7 : 1)};

  &:hover:not(:disabled) {
    background: ${colors.cobaltGhost};
    border-color: ${colors.cobalt};
    color: ${colors.cobalt};
    transform: translateY(-2px);
    box-shadow: ${shadows.cobaltXs};
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

  ${mq.sm} {
    width: auto;
    flex: 1;
    padding: ${spacing[3]} ${spacing[6]};
  }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

const Spinner = styled.span`
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: ${spin} 0.6s linear infinite;
  flex-shrink: 0;
`;

// ------------------------------------------------------------------
// Icons (inline SVG — no extra dependencies)
// ------------------------------------------------------------------

const IconDownload = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
    <path d="M7.5 1v9M4 7l3.5 3.5L11 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 12h11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const IconShare = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
    <path d="M7.5 1v8M4.5 4L7.5 1l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 6H3a1 1 0 00-1 1v6a1 1 0 001 1h9a1 1 0 001-1V7a1 1 0 00-1-1h-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const IconLink = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
    <path d="M5.5 9.5l4-4M8 4.5l1.5-1.5a2.828 2.828 0 014 4L12 8.5M7 10.5l-1.5 1.5a2.828 2.828 0 01-4-4L3 6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const IconCheck = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
    <path d="M2.5 7.5l3.5 3.5 6.5-6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconX = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
    <path d="M3 3l9 9M12 3l-9 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

// ------------------------------------------------------------------
// Button group container
// ------------------------------------------------------------------

const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[3]};
  width: 100%;

  ${mq.sm} {
    flex-direction: row;
  }
`;

// ------------------------------------------------------------------
// Props
// ------------------------------------------------------------------

export interface ShareButtonGroupProps {
  result: QuizResult;
  cardRef: RefObject<HTMLDivElement | null>;
}

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------

export function ShareButtonGroup({ result, cardRef }: ShareButtonGroupProps) {
  const { t, tLang, language } = useLanguage();

  const [downloadState, setDownloadState] = useState<ActionState>('idle');
  const [shareState, setShareState] = useState<ActionState>('idle');
  const [copyState, setCopyState] = useState<ActionState>('idle');

  // Toast
  const [toastMsg, setToastMsg] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((msg: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToastMsg(msg);
    setToastVisible(true);
    toastTimer.current = setTimeout(() => setToastVisible(false), 3000);
  }, []);

  useEffect(() => () => { if (toastTimer.current) clearTimeout(toastTimer.current); }, []);

  // Reset a button state back to idle after a delay
  const resetAfter = (setter: React.Dispatch<React.SetStateAction<ActionState>>, ms = 2500) => {
    setTimeout(() => setter('idle'), ms);
  };

  // ── Download ─────────────────────────────────────────────────────
  const handleDownload = async () => {
    if (downloadState !== 'idle') return;
    setDownloadState('generating');
    try {
      await downloadCard(cardRef, result.primary);
      setDownloadState('success');
      showToast(t('ui.imageSaved'));
      resetAfter(setDownloadState);
    } catch {
      setDownloadState('error');
      resetAfter(setDownloadState, 3000);
    }
  };

  // ── Share ─────────────────────────────────────────────────────────
  const handleShare = async () => {
    if (shareState !== 'idle') return;
    setShareState('generating');
    const primaryData = tLang(result.primary);
    const shareText = interpolate(t('ui.shareText'), { language: primaryData.name });
    try {
      const outcome = await shareCardImage(cardRef, shareText, result.primary);
      setShareState('success');
      if (outcome === 'downloaded') showToast(t('ui.imageSaved'));
      resetAfter(setShareState);
    } catch {
      setShareState('error');
      resetAfter(setShareState, 3000);
    }
  };

  // ── Copy link ─────────────────────────────────────────────────────
  const handleCopyLink = async () => {
    if (copyState !== 'idle') return;
    setCopyState('generating');
    try {
      await copyAppLink();
      setCopyState('success');
      showToast(t('ui.linkCopied'));
      resetAfter(setCopyState);
    } catch {
      setCopyState('error');
      resetAfter(setCopyState, 3000);
    }
  };

  // ── Label helpers ─────────────────────────────────────────────────
  const label = (state: ActionState, idle: string) => {
    if (state === 'generating') return t('ui.generating');
    if (state === 'success') return language === 'pt' ? '✓ Pronto' : '✓ Done';
    if (state === 'error') return t('ui.tryAgain');
    return idle;
  };

  const icon = (state: ActionState, idleIcon: React.ReactElement) => {
    if (state === 'generating') return <Spinner />;
    if (state === 'success') return <IconCheck />;
    if (state === 'error') return <IconX />;
    return idleIcon;
  };

  return (
    <>
      <Group>
        {/* Download */}
        <ActionBtn
          $state={downloadState}
          onClick={handleDownload}
          disabled={downloadState === 'generating'}
          aria-label={t('ui.downloadButton')}
        >
          {icon(downloadState, <IconDownload />)}
          {label(downloadState, t('ui.downloadButton'))}
        </ActionBtn>

        {/* Share */}
        <ActionBtn
          $state={shareState}
          onClick={handleShare}
          disabled={shareState === 'generating'}
          aria-label={t('ui.shareButton')}
        >
          {icon(shareState, <IconShare />)}
          {label(shareState, t('ui.shareButton'))}
        </ActionBtn>

        {/* Copy link */}
        <ActionBtn
          $state={copyState}
          onClick={handleCopyLink}
          disabled={copyState === 'generating'}
          aria-label={t('ui.copyLink')}
        >
          {icon(copyState, <IconLink />)}
          {label(copyState, t('ui.copyLink'))}
        </ActionBtn>
      </Group>

      <Toast message={toastMsg} visible={toastVisible} />
    </>
  );
}
