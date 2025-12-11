// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.359webb.exe',
  vite: {
    plugins: [tailwindcss()]
  },
  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: "Syne",
        cssVariable: "--font-display",
        weights: [400, 500, 600, 700, 800],
        styles: ["normal"],
        fallbacks: ["sans-serif"]
      },
      {
        provider: fontProviders.google(),
        name: "Instrument Serif",
        cssVariable: "--font-serif-custom",
        weights: [400],
        styles: ["normal", "italic"],
        fallbacks: ["serif"]
      }
    ]
  }
});