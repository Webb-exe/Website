// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import svelte from '@astrojs/svelte';

import tailwindcss from '@tailwindcss/vite';

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), sitemap()],
  site: 'https://www.ftc359.org',
  
  // Enable prefetching for smoother navigation
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover'
  },
  
  vite: {
    plugins: [tailwindcss()]
  },
  redirects: {
    "/instagram": {
      destination: 'https://www.instagram.com/359webb.exe/',
      status: 301
    },
    "/youtube": {
      destination: 'https://www.youtube.com/@ftc359',
      status: 301
    },
    "/github": {
      destination: 'https://www.github.com/Webb-exe',
      status: 301
    }
  },
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
      name: "Caveat",
      cssVariable: "--font-hand",
      weights: [500, 700],
      styles: ["normal"],
      fallbacks: ["cursive"]
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
});