<script lang="ts">
  import type { BrandGuidelines } from "../../data/brand";
  import Hero from "./Hero.svelte";
  import ColorPalette from "./ColorPalette.svelte";
  import Typography from "./Typography.svelte";
  import LogoShowcase from "./LogoShowcase.svelte";
  import SpacingGuide from "./SpacingGuide.svelte";

  let { brandData }: { brandData: BrandGuidelines } = $props();
</script>

<Hero />
<ColorPalette colors={brandData.colors} />
<Typography fonts={brandData.fonts} />
<LogoShowcase logos={brandData.logos} />
{#if brandData.spacing}
  <SpacingGuide spacing={brandData.spacing} />
{/if}
