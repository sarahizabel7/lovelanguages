import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      // Enables displayName + fileName for styled-components in dev
      // (class names become meaningful like `WelcomeScreen__Heart-abc123`)
      babel: {
        plugins: ['babel-plugin-styled-components'],
      },
    }),
  ],
});
