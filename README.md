# As Cinco Linguagens do Amor

A bilingual (PT/EN) quiz app based on Gary Chapman's *The Five Love Languages*. Built with React 19, TypeScript, and styled-components.

## Features

- 30 A/B questions covering all 5 love languages
- Primary and secondary language results with descriptions and practical tips
- Smooth slide and reveal animations (CSS-only)
- PT/EN toggle with localStorage persistence
- Session persistence via sessionStorage (survives accidental refresh)
- Fully responsive, mobile-first layout

## Tech Stack

- **React 19** + **TypeScript**
- **styled-components v6**
- **Vite 6**
- **pnpm**

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173).

## Project Structure

```
lovelanguages/
├── quiz.ts                  # Core types, 30 questions, calculateResult()
├── src/
│   ├── main.tsx
│   ├── App.tsx              # State machine: welcome → quiz → result
│   ├── components/
│   │   ├── WelcomeScreen.tsx
│   │   ├── QuestionCard.tsx
│   │   ├── ResultScreen.tsx
│   │   ├── LanguageToggle.tsx
│   │   └── ui/              # Button, ProgressBar, Card
│   ├── contexts/
│   │   └── LanguageContext.tsx
│   ├── i18n/
│   │   └── translations.ts  # PT + EN strings
│   ├── styles/
│   │   ├── theme.ts         # Design tokens
│   │   └── GlobalStyles.tsx
│   ├── data/                # Re-exports from quiz.ts
│   └── logic/               # Re-exports from quiz.ts
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
