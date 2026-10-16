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
    },
    "/herizon-stem/2026/workshop-apply": {
      destination: 'https://forms.cloud.microsoft/r/h56VKt8m0s',
      status: 301
    },
    "/herizon-stem/2026/tickets": {
      destination: 'https://www.eventbrite.com/e/herizon-2026-tickets-2003477250388?aff=oddtdtcreator',
      status: 301
    }
  },
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Instrument Sans",
      cssVariable: "--font-body",
      weights: [400, 500, 600, 700],
      styles: ["normal"],
      fallbacks: ["sans-serif"]
    },
    {
      provider: fontProviders.google(),
      name: "Caveat",
      cssVariable: "--font-hand",
      weights: [500],
      styles: ["normal"],
      fallbacks: ["cursive"]
    },
  ]
});