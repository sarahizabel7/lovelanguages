import { createGlobalStyle } from 'styled-components';
import { colors, gradients, typography, animation } from './theme';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,400&display=swap');

  :root {
    --color-pink:    ${colors.pink};
    --color-cobalt:  ${colors.cobalt};
    --color-cherry:  ${colors.cherry};
    --color-sand:    ${colors.sand};
    --color-white:   ${colors.white};
    --color-ink:     ${colors.ink};

    --color-bg:      ${colors.background};
    --color-surface: ${colors.surface};
    --color-text:    ${colors.text};
    --color-muted:   ${colors.textMuted};
    --color-border:  ${colors.border};

    --font-display:  ${typography.fonts.display};
    --font-body:     ${typography.fonts.body};

    --t-fast:    ${animation.transitions.fast};
    --t-normal:  ${animation.transitions.normal};
    --t-slow:    ${animation.transitions.slow};
    --t-spring:  ${animation.transitions.spring};
    --t-smooth:  ${animation.transitions.smooth};
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    -webkit-text-size-adjust: 100%;
    text-size-adjust: 100%;
    scroll-behavior: smooth;
    tab-size: 4;
  }

  body {
    font-family: ${typography.fonts.body};
    font-size: 1rem;
    font-weight: ${typography.weights.regular};
    line-height: 1.5;
    color: ${colors.text};
    background-color: ${colors.background};
    background-image: ${gradients.heroBackground};
    background-attachment: fixed;
    min-height: 100dvh;
    overflow-x: hidden;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${typography.fonts.display};
    font-weight: 700;
    line-height: 1.15;
    letter-spacing: -0.02em;
    color: ${colors.ink};
  }

  h1 { font-size: clamp(2.25rem, 5vw, 4rem); }
  h2 { font-size: clamp(1.75rem, 4vw, 3rem); }
  h3 { font-size: clamp(1.375rem, 3vw, 2.25rem); }
  h4 { font-size: clamp(1.125rem, 2.5vw, 1.75rem); }
  h5 { font-size: 1.125rem; }
  h6 { font-size: 1rem; }

  p {
    line-height: 1.65;
    max-width: 68ch;
  }

  strong, b {
    font-weight: ${typography.weights.semibold};
  }

  em, i {
    font-style: italic;
  }

  a {
    color: ${colors.cobalt};
    text-decoration: none;
    transition: opacity var(--t-fast), color var(--t-fast);

    &:hover {
      opacity: 0.75;
    }
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font: inherit;
    color: inherit;
    -webkit-appearance: none;
    appearance: none;
  }

  input, select, textarea {
    font: inherit;
    color: inherit;
  }

  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
    height: auto;
  }

  ul, ol {
    list-style: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  ::selection {
    background-color: ${colors.pink};
    color: ${colors.ink};
  }

  ::-moz-selection {
    background-color: ${colors.pink};
    color: ${colors.ink};
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${colors.sandWarm};
  }

  ::-webkit-scrollbar-thumb {
    background: ${colors.pink};
    border-radius: 9999px;
    border: 2px solid ${colors.sandWarm};
    transition: background var(--t-fast);
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${colors.cobalt};
  }

  :focus {
    outline: none;
  }

  :focus-visible {
    outline: 2px solid ${colors.cobalt};
    outline-offset: 3px;
    border-radius: 4px;
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  @keyframes fadeSlideUp {
    from {
      opacity: 0;
      transform: translateY(24px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.96) translateY(12px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  @keyframes revealResult {
    0% {
      opacity: 0;
      transform: translateY(40px) scale(0.94);
      filter: blur(12px);
    }
    60% {
      filter: blur(0px);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
      filter: blur(0px);
    }
  }

  @keyframes shimmer {
    0%   { background-position: -300% 0; }
    100% { background-position: 300% 0; }
  }

  @keyframes pulseGlow {
    0%, 100% { box-shadow: 0 0 0 0 rgba(2, 18, 238, 0.0); }
    50%       { box-shadow: 0 0 0 6px rgba(2, 18, 238, 0.12); }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(-1deg); }
    50%       { transform: translateY(-10px) rotate(1deg); }
  }

  @keyframes heartbeat {
    0%, 100% { transform: scale(1); }
    15%       { transform: scale(1.18); }
    30%       { transform: scale(0.95); }
    45%       { transform: scale(1.08); }
    60%       { transform: scale(0.98); }
  }

  @keyframes skeletonShimmer {
    0%   { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }

  .animate-in {
    animation: fadeSlideUp 0.55s ${animation.easings.smooth} both;
  }

  .animate-in-scale {
    animation: scaleIn 0.45s ${animation.easings.spring} both;
  }

  .delay-1  { animation-delay: 0.05s; }
  .delay-2  { animation-delay: 0.10s; }
  .delay-3  { animation-delay: 0.15s; }
  .delay-4  { animation-delay: 0.20s; }
  .delay-5  { animation-delay: 0.25s; }
  .delay-6  { animation-delay: 0.30s; }
`;
