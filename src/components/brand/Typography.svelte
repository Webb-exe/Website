<script lang="ts">
  import type { BrandFont } from "../../data/brand";
  import { reveal } from "../../lib/reveal";
  import SectionHeader from "./SectionHeader.svelte";

  let { fonts }: { fonts: BrandFont[] } = $props();
</script>

<section id="typography" class="bg-dark relative section-wrapper py-20 sm:py-28">
  <div class="section-content">
    <SectionHeader eyebrow="type" title="Typography" />

    <div class="mt-4 divide-y divide-dashed divide-white/12" use:reveal={{ children: ".font-row", stagger: 0.1 }}>
      {#each fonts as font}
        <div class="font-row grid gap-8 py-10 lg:grid-cols-12" data-reveal>
          <div class="lg:col-span-4">
            <h3 class="text-3xl" style="font-family: {font.family}; font-weight: {font.weights.includes('600') ? 600 : font.weights[0]};">{font.name}</h3>
            {#if font.usage}<p class="mt-2 text-sm t-muted">{font.usage}</p>{/if}
          </div>
          <div class="lg:col-span-8 flex flex-col gap-3" style="font-family: {font.family};">
            <p class="text-4xl leading-tight sm:text-5xl">The quick brown fox jumps over the lazy dog</p>
            <p class="text-2xl t-muted">The quick brown fox jumps over the lazy dog</p>
            <p class="text-base t-faint">The quick brown fox jumps over the lazy dog</p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
