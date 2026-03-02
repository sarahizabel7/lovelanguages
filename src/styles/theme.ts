export const palette = {
  pink: '#FEC6E9',
  pinkLight: '#FEE0F4',
  pinkDeep: '#FDA8DE',
  pinkGhost: '#FEF0FA',

  cobalt: '#0212EE',
  cobaltLight: '#3344F2',
  cobaltMid: '#1A28EF',
  cobaltDark: '#010CB8',
  cobaltGhost: '#F0F1FE',

  cherry: '#D20001',
  cherryLight: '#E83334',
  cherryDark: '#A60001',
  cherryGhost: '#FFF0F0',

  sand: '#F3F3E9',
  sandWarm: '#EAEADB',
  sandDeep: '#E1E1D0',
  sandLight: '#F9F9F5',

  white: '#FFFFFF',
  ink: '#0C0C0C',
  inkSoft: '#1C1C1C',
  inkMuted: '#6B6560',

  transparent: 'transparent',
} as const;

export const colors = {
  // Brand
  primary: palette.cobalt,
  primaryLight: palette.cobaltLight,
  primaryDark: palette.cobaltDark,
  primaryGhost: palette.cobaltGhost,

  accent: palette.cherry,
  accentLight: palette.cherryLight,
  accentDark: palette.cherryDark,
  accentGhost: palette.cherryGhost,

  highlight: palette.pink,
  highlightLight: palette.pinkLight,
  highlightDeep: palette.pinkDeep,
  highlightGhost: palette.pinkGhost,

  // Surfaces
  background: palette.sand,
  backgroundWarm: palette.sandWarm,
  backgroundLight: palette.sandLight,
  surface: palette.white,

  // Text
  text: palette.ink,
  textSoft: palette.inkSoft,
  textMuted: palette.inkMuted,
  textInverse: palette.white,
  textAccent: palette.cobalt,

  // Borders
  border: '#E5E5D8',
  borderSubtle: '#EDEDDF',
  borderStrong: palette.pinkDeep,
  borderFocus: palette.cobalt,

  // Raw access
  ...palette,
} as const;

export const gradients = {
  // Core brand gradients
  pinkToCobalt: `linear-gradient(135deg, ${palette.pink} 0%, ${palette.cobalt} 100%)`,
  cobaltToPink: `linear-gradient(135deg, ${palette.cobalt} 0%, ${palette.pink} 100%)`,
  pinkToCherry: `linear-gradient(135deg, ${palette.pink} 0%, ${palette.cherry} 100%)`,

  // Progress fill
  progressFill: `linear-gradient(90deg, ${palette.pinkDeep} 0%, ${palette.cobalt} 100%)`,
  progressFillWarm: `linear-gradient(90deg, ${palette.pink} 0%, ${palette.cobaltLight} 100%)`,

  // Backgrounds
  sandToWhite: `linear-gradient(180deg, ${palette.sand} 0%, ${palette.white} 100%)`,
  whiteToSand: `linear-gradient(180deg, ${palette.white} 0%, ${palette.sand} 100%)`,
  heroBackground: [
    `radial-gradient(ellipse 70% 60% at 15% 55%, ${palette.pinkLight} 0%, transparent 55%)`,
    `radial-gradient(ellipse 50% 40% at 85% 20%, rgba(2, 18, 238, 0.06) 0%, transparent 50%)`,
    `radial-gradient(ellipse 40% 50% at 60% 85%, ${palette.sandWarm} 0%, transparent 60%)`,
    palette.sand,
  ].join(', '),

  // Decorative / atmospheric
  pinkRadial: `radial-gradient(ellipse at center, ${palette.pinkLight} 0%, ${palette.pinkGhost} 50%, transparent 75%)`,
  cobaltRadial: `radial-gradient(ellipse at center, rgba(2, 18, 238, 0.10) 0%, transparent 70%)`,
  cherryRadial: `radial-gradient(ellipse at center, rgba(210, 0, 1, 0.10) 0%, transparent 70%)`,

  // Card textures
  cardSheen: `linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.0) 60%)`,
  cardMesh: `
    radial-gradient(ellipse 60% 40% at 20% 20%, ${palette.pinkGhost} 0%, transparent 60%),
    radial-gradient(ellipse 40% 60% at 80% 80%, ${palette.cobaltGhost} 0%, transparent 60%)
  `,

  // Button gloss
  buttonGloss: `linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.0) 100%)`,
} as const;

export const typography = {
  fonts: {
    display: '"Playfair Display", Georgia, "Times New Roman", serif',
    body: '"DM Sans", system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
  },

  sizes: {
    '2xs': '0.625rem',   //  10px
    xs:    '0.75rem',    //  12px
    sm:    '0.875rem',   //  14px
    base:  '1rem',       //  16px
    md:    '1.125rem',   //  18px
    lg:    '1.25rem',    //  20px
    xl:    '1.5rem',     //  24px
    '2xl': '1.875rem',   //  30px
    '3xl': '2.25rem',    //  36px
    '4xl': '3rem',       //  48px
    '5xl': '3.75rem',    //  60px
    '6xl': '4.5rem',     //  72px
    '7xl': '6rem',       //  96px
  },

  weights: {
    light:    300,
    regular:  400,
    medium:   500,
    semibold: 600,
    bold:     700,
    black:    900,
  },

  lineHeights: {
    none:    1,
    tight:   1.15,
    snug:    1.3,
    normal:  1.5,
    relaxed: 1.65,
    loose:   1.85,
  },

  letterSpacing: {
    tightest: '-0.04em',
    tight:    '-0.02em',
    snug:     '-0.01em',
    normal:    '0em',
    wide:      '0.04em',
    wider:     '0.08em',
    widest:    '0.16em',
    label:     '0.12em',
    display:   '-0.03em',
  },
} as const;

export const spacing = {
  0:    '0',
  px:   '1px',
  0.5:  '0.125rem',  //  2px
  1:    '0.25rem',   //  4px
  1.5:  '0.375rem',  //  6px
  2:    '0.5rem',    //  8px
  2.5:  '0.625rem',  // 10px
  3:    '0.75rem',   // 12px
  3.5:  '0.875rem',  // 14px
  4:    '1rem',      // 16px
  5:    '1.25rem',   // 20px
  6:    '1.5rem',    // 24px
  7:    '1.75rem',   // 28px
  8:    '2rem',      // 32px
  9:    '2.25rem',   // 36px
  10:   '2.5rem',    // 40px
  11:   '2.75rem',   // 44px
  12:   '3rem',      // 48px
  14:   '3.5rem',    // 56px
  16:   '4rem',      // 64px
  18:   '4.5rem',    // 72px
  20:   '5rem',      // 80px
  24:   '6rem',      // 96px
  28:   '7rem',      // 112px
  32:   '8rem',      // 128px
  36:   '9rem',      // 144px
  40:   '10rem',     // 160px
  48:   '12rem',     // 192px
  56:   '14rem',     // 224px
  64:   '16rem',     // 256px
} as const;

export const borderRadius = {
  none:  '0',
  xs:    '4px',
  sm:    '8px',
  md:    '12px',
  lg:    '16px',
  xl:    '20px',
  '2xl': '28px',
  '3xl': '40px',
  pill:  '9999px',
  full:  '50%',
} as const;

export const shadows = {
  none: 'none',

  // Neutral (depth-based)
  xs:   '0 1px 2px rgba(12, 12, 12, 0.04)',
  sm:   '0 2px 8px rgba(12, 12, 12, 0.06), 0 1px 3px rgba(12, 12, 12, 0.04)',
  md:   '0 4px 16px rgba(12, 12, 12, 0.08), 0 2px 6px rgba(12, 12, 12, 0.05)',
  lg:   '0 8px 32px rgba(12, 12, 12, 0.10), 0 4px 12px rgba(12, 12, 12, 0.06)',
  xl:   '0 16px 48px rgba(12, 12, 12, 0.12), 0 8px 20px rgba(12, 12, 12, 0.07)',
  '2xl':'0 24px 64px rgba(12, 12, 12, 0.14), 0 12px 28px rgba(12, 12, 12, 0.08)',

  // Cobalt brand shadows
  cobalt:    '0 8px 32px rgba(2, 18, 238, 0.28), 0 4px 12px rgba(2, 18, 238, 0.16)',
  cobaltSm:  '0 4px 16px rgba(2, 18, 238, 0.22), 0 2px 6px rgba(2, 18, 238, 0.12)',
  cobaltXs:  '0 2px 8px rgba(2, 18, 238, 0.16)',

  // Cherry accent shadows
  cherry:    '0 8px 32px rgba(210, 0, 1, 0.28), 0 4px 12px rgba(210, 0, 1, 0.16)',
  cherrySm:  '0 4px 16px rgba(210, 0, 1, 0.22), 0 2px 6px rgba(210, 0, 1, 0.12)',

  // Pink highlight shadows
  pink:      '0 8px 32px rgba(254, 198, 233, 0.70), 0 4px 16px rgba(254, 198, 233, 0.50)',
  pinkSm:    '0 4px 16px rgba(254, 198, 233, 0.60), 0 2px 8px rgba(254, 198, 233, 0.40)',

  // Inset / inner
  insetPink:   'inset 0 0 0 1.5px rgba(254, 198, 233, 0.50)',
  insetCobalt: 'inset 0 0 0 1.5px rgba(2, 18, 238, 0.20)',
} as const;

export const animation = {
  durations: {
    instant:  '50ms',
    fast:     '150ms',
    normal:   '250ms',
    slow:     '400ms',
    slower:   '600ms',
    slowest:  '900ms',
    dramatic: '1200ms',
  },

  easings: {
    linear:    'linear',
    easeIn:    'cubic-bezier(0.4, 0, 1, 1)',
    easeOut:   'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring:    'cubic-bezier(0.34, 1.56, 0.64, 1)',
    smooth:    'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    dramatic:  'cubic-bezier(0.76, 0, 0.24, 1)',
    bounce:    'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },

  transitions: {
    fast:    '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal:  '250ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow:    '400ms cubic-bezier(0.4, 0, 0.2, 1)',
    spring:  '500ms cubic-bezier(0.34, 1.56, 0.64, 1)',
    smooth:  '600ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    snappy:  '300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
} as const;

export const breakpoints = {
  xs: '375px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const mq = {
  xs:  `@media (min-width: ${breakpoints.xs})`,
  sm:  `@media (min-width: ${breakpoints.sm})`,
  md:  `@media (min-width: ${breakpoints.md})`,
  lg:  `@media (min-width: ${breakpoints.lg})`,
  xl:  `@media (min-width: ${breakpoints.xl})`,
  '2xl': `@media (min-width: ${breakpoints['2xl']})`,
} as const;

export const zIndices = {
  below:   -1,
  base:     0,
  raised:   1,
  dropdown: 10,
  sticky:   20,
  overlay:  30,
  modal:   100,
  toast:   200,
  tooltip: 300,
} as const;

const theme = {
  palette,
  colors,
  gradients,
  typography,
  spacing,
  borderRadius,
  shadows,
  animation,
  breakpoints,
  mq,
  zIndices,
} as const;

export type Theme = typeof theme;
export type Colors = typeof colors;
export type Typography = typeof typography;

export default theme;
