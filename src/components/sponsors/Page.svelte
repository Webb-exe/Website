<script lang="ts">
  import type { SponsorsDataComponent } from "../../data/sponsors";
  import Hero from "./Hero.svelte";
  import SponsorTiers from "./SponsorTiers.svelte";
  import CTA from "./CTA.svelte";

  let { sponsors }: { sponsors: SponsorsDataComponent } = $props();
</script>

<Hero />
<SponsorTiers {sponsors} />
<CTA />
