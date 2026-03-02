import React from 'react';
import styled from 'styled-components';
import type { LoveLanguage, QuizResult } from '../../quiz';
import { useLanguage } from '../contexts/LanguageContext';
import { APP_URL } from '../utils/shareCard';

// ------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------

const CARD_SIZE = 1080;
const MAX_SCORE = 12;
const LANGUAGE_ORDER: LoveLanguage[] = ['WORDS', 'ACTS', 'GIFTS', 'TIME', 'TOUCH'];

// ------------------------------------------------------------------
// Per-language visual theme
// ------------------------------------------------------------------

interface LangTheme {
  background: string;
  /** Soft overlay gradient on top of background */
  overlay: string;
  accentBg: string;
}

const LANG_THEMES: Record<LoveLanguage, LangTheme> = {
  WORDS: {
    background: 'linear-gradient(150deg, #FEC6E9 0%, #F9EAF6 55%, #F3F3E9 100%)',
    overlay: 'radial-gradient(ellipse 70% 60% at 80% 20%, rgba(254,198,233,0.5) 0%, transparent 70%)',
    accentBg: '#FEC6E9',
  },
  ACTS: {
    background: 'linear-gradient(150deg, #FEC6E9 0%, #FFE8EF 55%, #FFFFFF 100%)',
    overlay: 'radial-gradient(ellipse 60% 50% at 85% 15%, rgba(254,198,233,0.4) 0%, transparent 65%)',
    accentBg: '#FFD6E8',
  },
  GIFTS: {
    background: 'linear-gradient(150deg, #F3F3E9 0%, #FDE8F5 55%, #FEC6E9 100%)',
    overlay: 'radial-gradient(ellipse 60% 50% at 20% 80%, rgba(254,198,233,0.45) 0%, transparent 65%)',
    accentBg: '#FDE8F5',
  },
  TIME: {
    background: 'linear-gradient(150deg, #F3F3E9 0%, #EBF0FF 55%, #F0EEFF 100%)',
    overlay: 'radial-gradient(ellipse 65% 55% at 85% 15%, rgba(2,18,238,0.05) 0%, transparent 70%)',
    accentBg: '#EBF0FF',
  },
  TOUCH: {
    background: 'linear-gradient(150deg, #FFB3D9 0%, #FEC6E9 50%, #F3F3E9 100%)',
    overlay: 'radial-gradient(ellipse 70% 60% at 75% 25%, rgba(255,179,217,0.5) 0%, transparent 70%)',
    accentBg: '#FFD6EC',
  },
};

// ------------------------------------------------------------------
// Decorative SVG elements (per language, top-right corner)
// All use simple paths — safe for html2canvas
// ------------------------------------------------------------------

function DecoQuotes() {
  // Two overlapping rounded speech-bubble-like shapes for WORDS
  return (
    <svg viewBox="0 0 200 180" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect x="8" y="8" width="80" height="80" rx="40" fill="#0212EE" />
      <rect x="0" y="0" width="80" height="80" rx="40" fill="#0212EE" />
      <rect x="90" y="40" width="90" height="90" rx="45" fill="#0212EE" />
      <rect x="82" y="32" width="90" height="90" rx="45" fill="#0212EE" opacity="0.6" />
      <circle cx="40" cy="40" r="10" fill="#F3F3E9" />
      <circle cx="68" cy="40" r="10" fill="#F3F3E9" />
      <circle cx="112" cy="77" r="11" fill="#F3F3E9" />
      <circle cx="142" cy="77" r="11" fill="#F3F3E9" />
    </svg>
  );
}

function DecoStar() {
  // 8-pointed geometric star for ACTS
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <polygon
        points="100,0 118,72 190,55 138,110 190,145 118,128 100,200 82,128 10,145 62,110 10,55 82,72"
        fill="#0212EE"
      />
      <polygon
        points="100,30 112,82 165,70 128,105 165,130 112,118 100,170 88,118 35,130 72,105 35,70 88,82"
        fill="#F3F3E9"
        opacity="0.25"
      />
    </svg>
  );
}

function DecoDiamond() {
  // Layered diamond for GIFTS
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <polygon points="100,0 200,100 100,200 0,100" fill="#0212EE" />
      <polygon points="100,25 175,100 100,175 25,100" fill="#F3F3E9" opacity="0.2" />
      <polygon points="100,50 150,100 100,150 50,100" fill="#0212EE" opacity="0.5" />
    </svg>
  );
}

function DecoClock() {
  // Abstract arcs / concentric circles for TIME
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <circle cx="100" cy="100" r="94" stroke="#0212EE" strokeWidth="12" fill="none" />
      <circle cx="100" cy="100" r="60" stroke="#0212EE" strokeWidth="8" fill="none" opacity="0.5" />
      <circle cx="100" cy="100" r="26" fill="#0212EE" />
      <line x1="100" y1="100" x2="100" y2="20" stroke="#0212EE" strokeWidth="10" strokeLinecap="round" />
      <line x1="100" y1="100" x2="158" y2="100" stroke="#0212EE" strokeWidth="10" strokeLinecap="round" />
    </svg>
  );
}

function DecoWaves() {
  // Three organic wave paths for TOUCH
  return (
    <svg viewBox="0 0 200 180" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <path d="M0,40 C40,0 80,80 120,40 C160,0 180,60 200,40" stroke="#0212EE" strokeWidth="14" strokeLinecap="round" fill="none" />
      <path d="M0,90 C40,50 80,130 120,90 C160,50 180,110 200,90" stroke="#0212EE" strokeWidth="14" strokeLinecap="round" fill="none" opacity="0.7" />
      <path d="M0,140 C40,100 80,180 120,140 C160,100 180,160 200,140" stroke="#0212EE" strokeWidth="14" strokeLinecap="round" fill="none" opacity="0.4" />
    </svg>
  );
}

const DECO_MAP: Record<LoveLanguage, React.ReactElement> = {
  WORDS: <DecoQuotes />,
  ACTS: <DecoStar />,
  GIFTS: <DecoDiamond />,
  TIME: <DecoClock />,
  TOUCH: <DecoWaves />,
};

// ------------------------------------------------------------------
// Styled components
// All sizes in px relative to the 1080x1080 canvas.
// No box-shadow (html2canvas bug) — use filter: drop-shadow() instead.
// No CSS variables — use direct values for html2canvas compatibility.
// ------------------------------------------------------------------

const CardRoot = styled.div<{ $lang: LoveLanguage }>`
  width: ${CARD_SIZE}px;
  height: ${CARD_SIZE}px;
  display: flex;
  flex-direction: column;
  padding: 80px;
  position: relative;
  overflow: hidden;
  will-change: transform;
  font-family: 'DM Sans', sans-serif;
  background: ${({ $lang }) => LANG_THEMES[$lang].background};

  /* Soft radial highlight overlay */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ $lang }) => LANG_THEMES[$lang].overlay};
    pointer-events: none;
  }
`;

const DecoWrapper = styled.div`
  position: absolute;
  top: 56px;
  right: 56px;
  width: 200px;
  height: 200px;
  opacity: 0.14;
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
  <svg viewBox="0 0 24 24" fill="white" width="22" height="22" xmlns="http://www.w3.org/2000/svg">
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
  color: #555;
  letter-spacing: 0.01em;
  line-height: 1.2;
`;

// ── Main content ───────────────────────────────────────────────────

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 0;
  position: relative;
  z-index: 1;
  padding: 20px 0;
`;

const EmojiDisplay = styled.div`
  font-size: 108px;
  line-height: 1;
  margin-bottom: 32px;
`;

const LanguageName = styled.div`
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-size: 82px;
  font-weight: 700;
  color: #D20001;
  letter-spacing: 0.01em;
  line-height: 1.08;
  margin-bottom: 32px;
`;

const DecorativeLine = styled.div`
  width: 100px;
  height: 3px;
  background: #0212EE;
  margin: 0 auto 36px;
  border-radius: 2px;
`;

const ShortDesc = styled.div`
  font-size: 30px;
  font-weight: 400;
  color: #444;
  line-height: 1.5;
  max-width: 820px;
  text-align: center;
`;

// ── Mini chart ─────────────────────────────────────────────────────

const ChartSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 14px;
  position: relative;
  z-index: 1;
`;

const ChartRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  height: 38px;
`;

const ChartEmoji = styled.span`
  font-size: 26px;
  width: 36px;
  text-align: center;
  flex-shrink: 0;
  line-height: 1;
`;

const ChartLabel = styled.span<{ $isPrimary: boolean }>`
  font-size: 20px;
  font-weight: ${({ $isPrimary }) => ($isPrimary ? 700 : 400)};
  color: ${({ $isPrimary }) => ($isPrimary ? '#0212EE' : '#666')};
  width: 250px;
  flex-shrink: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ChartTrack = styled.div`
  flex: 1;
  height: 12px;
  background: rgba(254, 198, 233, 0.3);
  border-radius: 6px;
  overflow: hidden;
`;

const ChartFill = styled.div<{ $pct: number; $isPrimary: boolean; $isSecondary: boolean }>`
  height: 100%;
  width: ${({ $pct }) => $pct}%;
  border-radius: 6px;
  background: ${({ $isPrimary, $isSecondary }) =>
    $isPrimary
      ? 'linear-gradient(90deg, #FDA8DE 0%, #0212EE 100%)'
      : $isSecondary
      ? '#FDA8DE'
      : 'rgba(254, 198, 233, 0.6)'};
`;

const ChartScore = styled.span<{ $isPrimary: boolean }>`
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-size: 22px;
  color: ${({ $isPrimary }) => ($isPrimary ? '#0212EE' : '#999')};
  font-weight: ${({ $isPrimary }) => ($isPrimary ? 700 : 400)};
  width: 52px;
  text-align: right;
  flex-shrink: 0;
`;

// ── Footer ─────────────────────────────────────────────────────────

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding-top: 40px;
  position: relative;
  z-index: 1;
`;

const FooterText = styled.span`
  font-size: 22px;
  font-style: italic;
  color: #0212EE;
  letter-spacing: 0.01em;
`;

const FooterUrl = styled.span`
  font-size: 22px;
  font-weight: 700;
  color: #0212EE;
  letter-spacing: 0.02em;
`;

// ------------------------------------------------------------------
// Props
// ------------------------------------------------------------------

export interface ShareCardProps {
  result: QuizResult;
}

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------

export const ShareCard = React.forwardRef<HTMLDivElement, ShareCardProps>(
  ({ result }, ref) => {
    const { tLang, language } = useLanguage();

    const primaryData = tLang(result.primary);

    // Sort by score desc for the mini chart
    const sortedLanguages = LANGUAGE_ORDER.map((lang) => ({
      lang,
      score: result.scores[lang],
      isPrimary: lang === result.primary,
      isSecondary: lang === result.secondary,
      data: tLang(lang),
    })).sort((a, b) => b.score - a.score);

    const appNameLine1 = language === 'pt' ? 'Cinco Linguagens' : 'Five Love Languages';
    const appNameLine2 = language === 'pt' ? 'do Amor' : 'by Gary Chapman';
    const footerLabel = language === 'pt' ? 'Descubra a sua em' : 'Discover yours at';

    return (
      <CardRoot ref={ref} $lang={result.primary}>
        {/* Decorative element — top right, absolute */}
        <DecoWrapper aria-hidden="true">
          {DECO_MAP[result.primary]}
        </DecoWrapper>

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

        {/* Main content */}
        <MainContent>
          <EmojiDisplay aria-hidden="true">{primaryData.emoji}</EmojiDisplay>
          <LanguageName>{primaryData.name}</LanguageName>
          <DecorativeLine aria-hidden="true" />
          <ShortDesc>{primaryData.shortDescription}</ShortDesc>
        </MainContent>

        {/* Mini bar chart */}
        <ChartSection aria-hidden="true">
          {sortedLanguages.map(({ lang, score, isPrimary, isSecondary, data }) => (
            <ChartRow key={lang}>
              <ChartEmoji>{data.emoji}</ChartEmoji>
              <ChartLabel $isPrimary={isPrimary}>{data.name}</ChartLabel>
              <ChartTrack>
                <ChartFill
                  $pct={(score / MAX_SCORE) * 100}
                  $isPrimary={isPrimary}
                  $isSecondary={isSecondary}
                />
              </ChartTrack>
              <ChartScore $isPrimary={isPrimary}>{score}</ChartScore>
            </ChartRow>
          ))}
        </ChartSection>

        {/* Footer */}
        <Footer>
          <FooterText>{footerLabel}</FooterText>
          <FooterUrl>{APP_URL}</FooterUrl>
        </Footer>
      </CardRoot>
    );
  },
);

ShareCard.displayName = 'ShareCard';
