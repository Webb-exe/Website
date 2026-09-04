<script lang="ts">
  import type { BrandColor } from "../../data/brand";
  import { reveal } from "../../lib/reveal";
  import SectionHeader from "./SectionHeader.svelte";
  import CopyButton from "./CopyButton.svelte";

  let { colors }: { colors: BrandColor[] } = $props();
</script>

<section id="colors" class="bg-dark relative section-wrapper py-20 sm:py-28">
  <div class="section-content">
    <SectionHeader eyebrow="colors" title="Palette" subtitle="click a value to copy it" />

    <ul class="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3" use:reveal={{ children: "li", stagger: 0.06 }}>
      {#each colors as color, i}
        <li class="pt-3" data-reveal>
          <div class="polaroid {i % 2 === 0 ? 'tilt-l' : 'tilt-r'}">
            {#if i % 3 === 0}<span class="tape"></span>{/if}
            <div class="photo aspect-[4/3]!" style="background-color: {color.hex};"></div>
            <div class="caption">
              <p class="text-xl">{color.name}</p>
              <div class="mt-2 flex flex-col gap-0.5 font-display">
                <CopyButton value={color.hex} />
                {#if color.rgb}<CopyButton value={color.rgb} />{/if}
              </div>
              {#if color.usage}<p class="mt-3 font-display text-xs leading-relaxed text-ink/60">{color.usage}</p>{/if}
            </div>
          </div>
        </li>
      {/each}
    </ul>
  </div>
</section>
