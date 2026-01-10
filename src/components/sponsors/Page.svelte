<script lang="ts">
  import Hero from "./Hero.svelte";
  import SponsorTiers from "./SponsorTiers.svelte";
  import CTA from "./CTA.svelte";
  import ScrollProgress from "../shared/ScrollProgress.svelte";
  import type { SponsorsDataComponent } from "../../data/sponsors";

  export let sponsors: SponsorsDataComponent;
</script>

<ScrollProgress />

<Hero />
<SponsorTiers {sponsors} />
<CTA />
