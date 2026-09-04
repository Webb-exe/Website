<script lang="ts">
  import { reveal } from "../../lib/reveal";

  let { eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string } = $props();
</script>

<header class="flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-b border-dashed line pb-5" use:reveal data-reveal>
  <div>
    <span class="label">{eyebrow}</span>
    <h2 class="display mt-5 text-5xl sm:text-6xl">{title}</h2>
  </div>
  {#if subtitle}
    <p class="hand text-2xl">{subtitle}</p>
  {/if}
</header>
