<script lang="ts">
  import type { BrandColor, BrandPalette } from "../../data/brand";
  import { reveal } from "../../lib/reveal";
  import SectionHeader from "./SectionHeader.svelte";
  import CopyButton from "./CopyButton.svelte";

  let { colors, palettes }: { colors: BrandColor[]; palettes: BrandPalette[] } = $props();

  const groups = ["Core", "Supporting", "Accents", "Neutrals"] as const;
  const hexOf = (name: string) => colors.find((c) => c.name === name)?.hex ?? "#000";
  const inkOn = (hex: string) => {
    const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
    return 0.299 * r + 0.587 * g + 0.114 * b > 150 ? "rgb(0 0 0 / 0.6)" : "rgb(255 255 255 / 0.7)";
  };
</script>

<section id="colors" class="bg-dark relative section-wrapper py-20 sm:py-28">
  <div class="section-content">
    <SectionHeader eyebrow="colors" title="Palette" subtitle="click a value to copy it" />

    {#each groups as group}
      <h3 class="label mt-14">{group}</h3>
      <ul class="mt-5 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-4" use:reveal={{ children: "li", stagger: 0.04 }}>
        {#each colors.filter((c) => c.group === group) as color}
          <li data-reveal>
            <div class="aspect-[4/3] rounded-lg outline outline-white/15 -outline-offset-1" style="background-color: {color.hex};"></div>
            <p class="mt-3 text-lg font-semibold">{color.name}</p>
            <div class="mt-1 flex flex-col gap-0.5">
              <CopyButton value={color.hex} />
              {#if color.rgb}<CopyButton value={color.rgb} label={color.rgb.replace(/^rgb\(|\)$/g, "")} />{/if}
            </div>
          </li>
        {/each}
      </ul>
    {/each}

    <div class="mt-24">
      <SectionHeader eyebrow="combinations" title="Palettes" subtitle="pick one per piece" />
      <ul class="mt-10 grid gap-8 sm:grid-cols-2" use:reveal={{ children: "li", stagger: 0.06 }}>
        {#each palettes as palette}
          <li data-reveal>
            <div class="flex h-28 overflow-hidden rounded-lg outline outline-white/15 -outline-offset-1">
              {#each palette.colors as name, i}
                <div class="flex items-end p-3" style="background-color: {hexOf(name)}; flex: {i === 0 ? 2 : 1};">
                  <span class="font-mono text-[0.65rem]" style="color: {inkOn(hexOf(name))};">{name}</span>
                </div>
              {/each}
            </div>
            <div class="mt-3 flex flex-wrap items-baseline justify-between gap-x-4">
              <p class="text-lg font-semibold">{palette.name}</p>
              <p class="hand text-xl">{palette.use}</p>
            </div>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</section>
