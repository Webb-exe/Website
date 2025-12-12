// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import svelte from '@astrojs/svelte';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [svelte()],
  site: 'https://www.ftc359.org',
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