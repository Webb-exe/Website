<script lang="ts">
  import type { BrandGuidelines } from "../../data/brand";
  import Hero from "./Hero.svelte";
  import ColorPalette from "./ColorPalette.svelte";
  import Typography from "./Typography.svelte";
  import LogoShowcase from "./LogoShowcase.svelte";

  let { brandData }: { brandData: BrandGuidelines } = $props();
</script>

<Hero />
<ColorPalette colors={brandData.colors} palettes={brandData.palettes} />
<Typography fonts={brandData.fonts} />
<LogoShowcase logos={brandData.logos} />
