import React from 'react';
import styled from 'styled-components';
import type { QuizResult } from '../../quiz';
import { useLanguage } from '../contexts/LanguageContext';
import { APP_URL } from '../utils/shareCard';

// ------------------------------------------------------------------
// Constants — all sizes relative to the 1080×1080 canvas.
// Rules: no box-shadow, no CSS variables, direct color values only.
// ------------------------------------------------------------------

const CARD_SIZE = 1080;

// ------------------------------------------------------------------
// Styled components
// ------------------------------------------------------------------

const CardRoot = styled.div`
  width: ${CARD_SIZE}px;
  height: ${CARD_SIZE}px;
  display: flex;
  flex-direction: column;
  padding: 80px;
  position: relative;
  overflow: hidden;
  will-change: transform;
  font-family: 'DM Sans', sans-serif;
  background: #ffffff;
`;

/* Soft pink radial glow — top-left corner */
const PinkGlowTopLeft = styled.div`
  position: absolute;
  top: -80px;
  left: -80px;
  width: 480px;
  height: 480px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(254, 198, 233, 0.55) 0%, transparent 70%);
  pointer-events: none;
`;

/* Soft pink radial glow — bottom-right corner */
const PinkGlowBottomRight = styled.div`
  position: absolute;
  bottom: -60px;
  right: -60px;
  width: 380px;
  height: 380px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(254, 198, 233, 0.4) 0%, transparent 70%);
  pointer-events: none;
`;

/* Inset cobalt frame */
const Frame = styled.div`
  position: absolute;
  inset: 32px;
  border: 2px solid rgba(2, 18, 238, 0.1);
  border-radius: 32px;
  pointer-events: none;
`;

// ── Top bar ────────────────────────────────────────────────────────

const TopBar = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
  z-index: 1;
`;

const AppIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: #0212EE;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" width="22" height="22">
    <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402C1 3.5 3.5 1 6.5 1c1.875 0 3.5.87 4.664 2.25C12.18 2.01 13.69 1 15.5 1 18.5 1 21 3.5 21 7.191c0 4.105-5.37 8.863-9 12.602L12 21.593z" />
  </svg>
);

const AppName = styled.div`
  display: flex;
  flex-direction: column;
`;

const AppNamePrimary = styled.span`
  font-size: 22px;
  font-weight: 700;
  color: #0212EE;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  line-height: 1.1;
`;

const AppNameSub = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: #888;
  line-height: 1.2;
`;

// ── Title block ────────────────────────────────────────────────────

const TitleBlock = styled.div`
  position: relative;
  z-index: 1;
  margin-top: 56px;
  margin-bottom: 44px;
`;

const CardTitle = styled.div`
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-size: 68px;
  font-weight: 700;
  color: #0212EE;
  line-height: 1.08;
  letter-spacing: 0.01em;
  margin-bottom: 16px;
`;

const LanguageLine = styled.div`
  font-size: 28px;
  font-weight: 400;
  color: #555;
  letter-spacing: 0.01em;
`;

const LanguageAccent = styled.span`
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-weight: 700;
  color: #D20001;
`;

const DividerLine = styled.div`
  width: 72px;
  height: 3px;
  background: #FEC6E9;
  border-radius: 2px;
  margin-top: 28px;
`;

// ── Tips list ──────────────────────────────────────────────────────

const TipsList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: relative;
  z-index: 1;
`;

const TipRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
`;

const TipHeart = styled.div`
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  margin-top: 4px;
`;

const HeartSmall = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
    <path
      d="M12 21c-5.63-5.54-11-10.3-11-14.4C1 3.5 3.5 1 6.5 1c1.88 0 3.5.87 4.66 2.25C12.18 2.01 13.69 1 15.5 1 18.5 1 21 3.5 21 6.6c0 4.1-5.37 8.86-9 12.4z"
      fill="#FEC6E9"
      stroke="#D20001"
      strokeWidth="1.5"
    />
  </svg>
);

const TipText = styled.div`
  font-size: 26px;
  color: #333;
  line-height: 1.55;
  flex: 1;
`;

// ── Footer ─────────────────────────────────────────────────────────

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding-top: 36px;
  position: relative;
  z-index: 1;
`;

const FooterText = styled.span`
  font-size: 20px;
  color: #999;
`;

const FooterUrl = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: #0212EE;
  letter-spacing: 0.02em;
`;

// ------------------------------------------------------------------
// Props & component
// ------------------------------------------------------------------

export interface PartnerGuideCardProps {
  result: QuizResult;
}

export const PartnerGuideCard = React.forwardRef<HTMLDivElement, PartnerGuideCardProps>(
  ({ result }, ref) => {
    const { tLang, language } = useLanguage();

    const data = tLang(result.primary);

    const appNameLine1 = language === 'pt' ? 'Cinco Linguagens' : 'Five Love Languages';
    const appNameLine2 = language === 'pt' ? 'do Amor' : 'by Gary Chapman';
    const cardTitle = language === 'pt' ? 'Como me amar 💕' : 'How to love me 💕';
    const subtitlePrefix = language === 'pt' ? 'Minha linguagem do amor é' : 'My love language is';
    const footerText = language === 'pt' ? 'Descubra a sua em' : 'Discover yours at';

    return (
      <div ref={ref} style={{ position: 'relative' }}>
        <CardRoot>
          <PinkGlowTopLeft aria-hidden="true" />
          <PinkGlowBottomRight aria-hidden="true" />
          <Frame aria-hidden="true" />

          {/* Top bar */}
          <TopBar>
            <AppIcon aria-hidden="true">
              <HeartIcon />
            </AppIcon>
            <AppName>
              <AppNamePrimary>{appNameLine1}</AppNamePrimary>
              <AppNameSub>{appNameLine2}</AppNameSub>
            </AppName>
          </TopBar>

          {/* Title */}
          <TitleBlock>
            <CardTitle>{cardTitle}</CardTitle>
            <LanguageLine>
              {subtitlePrefix}{' '}
              <LanguageAccent>{data.emoji} {data.name}</LanguageAccent>
            </LanguageLine>
            <DividerLine aria-hidden="true" />
          </TitleBlock>

          {/* Tips */}
          <TipsList aria-hidden="true">
            {data.tipsForPartner.map((tip, i) => (
              <TipRow key={i}>
                <TipHeart><HeartSmall /></TipHeart>
                <TipText>{tip}</TipText>
              </TipRow>
            ))}
          </TipsList>

          {/* Footer */}
          <Footer>
            <FooterText>{footerText}</FooterText>
            <FooterUrl>{APP_URL}</FooterUrl>
          </Footer>
        </CardRoot>
      </div>
    );
  },
);

PartnerGuideCard.displayName = 'PartnerGuideCard';
