# As Cinco Linguagens do Amor

A bilingual (PT/EN) quiz app based on Gary Chapman's *The Five Love Languages*. Discover your primary love language and get a shareable guide for the people who love you.

**Live app:** [lovelanguages-liard.vercel.app](https://lovelanguages-liard.vercel.app/)

---

## Features

- 30 A/B questions covering all 5 love languages
- Detailed results with primary and secondary language cards
- Personal tips — self-awareness insights for your own love language
- Partner guide — a shareable "How to love me" card with tips for your partner
- Share options: copy text, native share sheet, or download a 1080×1080 image card
- Score chart comparing all 5 languages
- PT/EN toggle with localStorage persistence
- Session persistence via sessionStorage (survives accidental refresh)
- Smooth CSS-only animations throughout
- Fully responsive, mobile-first layout
- Fixed navbar with home navigation on all screens

## Tech Stack

- **React 19** + **TypeScript**
- **styled-components v6**
- **Vite 6**
- **html2canvas** (share card image generation)
- **pnpm**

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173).

## Commands

```bash
pnpm dev        # Vite dev server
pnpm build      # tsc -b && vite build
pnpm typecheck  # tsc --noEmit
pnpm preview    # Preview production build
```

## Project Structure

```
lovelanguages/
├── quiz.ts                      # Core types, 30 questions, calculateResult()
├── src/
│   ├── main.tsx
│   ├── App.tsx                  # State machine: welcome → quiz → result
│   ├── components/
│   │   ├── Navbar.tsx           # Fixed top bar with logo + language toggle
│   │   ├── WelcomeScreen.tsx
│   │   ├── QuestionCard.tsx
│   │   ├── ResultScreen.tsx
│   │   ├── TipsForMe.tsx        # Self-awareness tips section
│   │   ├── PartnerGuide.tsx     # "How to love me" card + share actions
│   │   ├── PartnerGuideCard.tsx # 1080×1080 image card for html2canvas
│   │   ├── ShareCard.tsx        # 1080×1080 result image card
│   │   ├── ShareButton.tsx      # Download / share / copy-link buttons
│   │   ├── LanguageToggle.tsx
│   │   └── ui/                  # Button, ProgressBar, Card
│   ├── contexts/
│   │   └── LanguageContext.tsx
│   ├── i18n/
│   │   └── translations.ts      # PT + EN strings + interpolate()
│   ├── styles/
│   │   ├── theme.ts             # Design tokens (colors, typography, spacing)
│   │   └── GlobalStyles.tsx
│   ├── utils/
│   │   └── shareCard.ts         # html2canvas helpers, clipboard, Web Share API
│   ├── data/                    # Re-exports from quiz.ts
│   └── logic/                   # Re-exports from quiz.ts
└── index.html
```

## Love Languages

| Key | Language |
|-----|----------|
| `WORDS` | Words of Affirmation |
| `ACTS` | Acts of Service |
| `GIFTS` | Receiving Gifts |
| `TIME` | Quality Time |
| `TOUCH` | Physical Touch |

## Based on

*The Five Love Languages* by Gary Chapman.
