<script lang="ts">
  import Hero from "./Hero.svelte";
  import ColorPalette from "./ColorPalette.svelte";
  import Typography from "./Typography.svelte";
  import LogoShowcase from "./LogoShowcase.svelte";
  import SpacingGuide from "./SpacingGuide.svelte";
  import type { BrandGuidelines } from "../../data/brand";

  export let brandData: BrandGuidelines;
</script>

<main class="relative z-20">
  <Hero />
  <ColorPalette colors={brandData.colors} />
  <Typography fonts={brandData.fonts} />
  <LogoShowcase logos={brandData.logos} />
  {#if brandData.spacing}
    <SpacingGuide spacing={brandData.spacing} />
  {/if}
</main>






