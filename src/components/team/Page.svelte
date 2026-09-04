<script lang="ts">
  import type { GetImageResult } from "astro";
  import type { TeamSubteamComponent } from "../../data/team";
  import Hero from "./Hero.svelte";
  import Subteam from "./Subteam.svelte";
  import CTA from "./CTA.svelte";

  let { teams, HeroImage }: { teams: TeamSubteamComponent[]; HeroImage: GetImageResult } = $props();
</script>

<Hero image={HeroImage} />
{#each teams as team}
  <Subteam {team} />
{/each}
<CTA />
