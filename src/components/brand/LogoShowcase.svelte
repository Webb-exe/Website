<script lang="ts">
  import type { BrandLogo } from "../../data/brand";
  import { reveal } from "../../lib/reveal";
  import SectionHeader from "./SectionHeader.svelte";
  import CopyButton from "./CopyButton.svelte";

  let { logos }: { logos: BrandLogo[] } = $props();
</script>

<section id="logos" class="bg-dark relative section-wrapper py-20 sm:py-28">
  <div class="section-content">
    <SectionHeader eyebrow="assets" title="Logos" subtitle="svg, ready to download" />

    <ul class="mt-12 grid gap-8 md:grid-cols-2" use:reveal={{ children: "li", stagger: 0.1 }}>
      {#each logos as logo, i}
        <li class="pt-3" data-reveal>
          <div class="polaroid {i % 2 === 0 ? 'tilt-l' : 'tilt-r'}">
            <span class="tape"></span>
            <div class="photo aspect-[4/3]! flex items-center justify-center bg-dark! p-10">
              <img src={logo.filePath} alt={logo.name} class="max-h-28 max-w-full object-contain" />
            </div>
            <div class="caption flex flex-wrap items-end justify-between gap-3">
              <div>
                <p class="text-xl">{logo.name}</p>
                <p class="mt-1 font-display text-xs text-ink/60">{logo.description}</p>
              </div>
              <a href={logo.filePath} download class="link font-display text-sm">Download</a>
            </div>
            <div class="mt-3 border-t border-dashed border-ink/15 pt-3 text-ink">
              <CopyButton value={logo.filePath} />
            </div>
          </div>
        </li>
      {/each}
    </ul>
  </div>
</section>
